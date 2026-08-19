/* 事件总池：由各数据文件汇聚 */
var ALL_EVENTS = [].concat(
  typeof EVENTS_REALITY !== 'undefined' ? EVENTS_REALITY : [],
  typeof EVENTS_CULTIVATION !== 'undefined' ? EVENTS_CULTIVATION : [],
  typeof EVENTS_NOVEL !== 'undefined' ? EVENTS_NOVEL : [],
  typeof EVENTS_HIDDEN !== 'undefined' ? EVENTS_HIDDEN : [],
  typeof EVENTS_SOCIAL !== 'undefined' ? EVENTS_SOCIAL : [],
  typeof EVENTS_SUDDEN !== 'undefined' ? EVENTS_SUDDEN : []
);

/* 引擎：条件判定 / 事件抽取 / 效果结算 / 死亡判定
   数据契约见 js/data/_schema.md */
var Engine = (function () {

  var ATTR_NAMES = { chr: '颜值', int: '智力', str: '体质', mny: '家境', spr: '快乐', luk: '气运' };
  var ATTR_KEYS = ['chr', 'int', 'str', 'mny', 'spr', 'luk'];

  function rnd(n) { return Math.floor(Math.random() * n); }

  /* ---------- 条件判定 ---------- */
  function attrPass(attrCond, life) {
    if (!attrCond) return true;
    for (var k in attrCond) {
      var v = life.attr[k] || 0;
      var c = attrCond[k];
      if (typeof c === 'number') { if (v !== c) return false; continue; }
      if (c.gte !== undefined && !(v >= c.gte)) return false;
      if (c.gt !== undefined && !(v > c.gt)) return false;
      if (c.lte !== undefined && !(v <= c.lte)) return false;
      if (c.lt !== undefined && !(v < c.lt)) return false;
      if (c.eq !== undefined && !(v === c.eq)) return false;
    }
    return true;
  }

  function hasTalent(life, t) {
    for (var i = 0; i < life.talents.length; i++) if (life.talents[i].id === t) return true;
    return false;
  }

  function condPass(cond, life) {
    if (!cond) return true;
    if (cond.attr && !attrPass(cond.attr, life)) return false;
    if (cond.talent) {
      var ts = Array.isArray(cond.talent) ? cond.talent : [cond.talent];
      var ok = false;
      for (var i = 0; i < ts.length; i++) if (hasTalent(life, ts[i])) { ok = true; break; }
      if (!ok) return false;
    }
    if (cond.notTalent) {
      var nts = Array.isArray(cond.notTalent) ? cond.notTalent : [cond.notTalent];
      for (var j = 0; j < nts.length; j++) if (hasTalent(life, nts[j])) return false;
    }
    if (cond.flags) for (var f = 0; f < cond.flags.length; f++) if (!life.flags[cond.flags[f]]) return false;
    if (cond.anyFlag) {
      var any = false;
      for (var a = 0; a < cond.anyFlag.length; a++) if (life.flags[cond.anyFlag[a]]) { any = true; break; }
      if (!any) return false;
    }
    if (cond.notFlags) for (var nf = 0; nf < cond.notFlags.length; nf++) if (life.flags[cond.notFlags[nf]]) return false;
    if (cond.gender && life.gender !== cond.gender) return false;
    if (cond.route && life.route !== cond.route) return false;
    if (cond.minAge !== undefined && life.age < cond.minAge) return false;
    if (cond.maxAge !== undefined && life.age > cond.maxAge) return false;
    if (cond.chance !== undefined && Math.random() >= cond.chance) return false;
    return true;
  }

  /* ---------- 事件抽取 ---------- */
  function isKillEvent(e) {
    if (e.effect && e.effect.kill) return true;
    if (e.choices) for (var i = 0; i < e.choices.length; i++) {
      if (e.choices[i].effect && e.choices[i].effect.kill) return true;
    }
    return false;
  }

  function candidates(life) {
    var out = [];
    for (var i = 0; i < ALL_EVENTS.length; i++) {
      var e = ALL_EVENTS[i];
      if (e.sudden) continue;                        // 突发事件不走常规抽取
      var pool = e.pool || 'life';
      if (pool !== life.pool) continue;
      if (e.age && (life.age < e.age[0] || life.age > e.age[1])) continue;
      var firedAt = life.fired[e.id];
      if (firedAt !== undefined) {
        if (e.once || isKillEvent(e)) continue;      // kill 事件终身只入池一次
        // 可重复事件冷却：凡间 15 年，书中界/修仙界 28 年（池小易重复，lore 听两遍就腻）
        var cooldown = pool === 'life' ? 22 : (pool === 'xiuxian' ? 60 : 34);
        if (life.age - firedAt < cooldown) continue;
      }
      if (life.route === 'dead') break;
      if (!condPass(e.cond, life)) continue;
      out.push(e);
    }
    return out;
  }

  function pickEvent(life) {
    var list = candidates(life);
    if (!list.length) return null;
    return weightedPick(list);
  }

  /* 突发事件池：仅 sudden:true 的事件，其余过滤规则同常规 */
  function pickSudden(life) {
    var out = [];
    for (var i = 0; i < ALL_EVENTS.length; i++) {
      var e = ALL_EVENTS[i];
      if (!e.sudden) continue;
      var pool = e.pool || 'life';
      if (pool !== life.pool) continue;
      if (e.age && (life.age < e.age[0] || life.age > e.age[1])) continue;
      var firedAt = life.fired[e.id];
      if (firedAt !== undefined) {
        if (e.once || isKillEvent(e)) continue;
        if (life.age - firedAt < 25) continue;      // 突发事件冷却更长
      }
      if (!condPass(e.cond, life)) continue;
      out.push(e);
    }
    if (!out.length) return null;
    return weightedPick(out);
  }

  function weightedPick(list) {
    var total = 0, i;
    for (i = 0; i < list.length; i++) total += (list[i].weight || 10);
    var roll = Math.random() * total;
    for (i = 0; i < list.length; i++) {
      roll -= (list[i].weight || 10);
      if (roll <= 0) return list[i];
    }
    return list[list.length - 1];
  }

  /* ---------- 效果结算 ---------- */
  /* 返回 { deltas: {attr: n}, killed: bool, deathText: string } */
  function applyEffect(life, effect) {
    var res = { deltas: {}, killed: false, deathText: '' };
    if (!effect) return res;
      if (effect.attr) {
      for (var k in effect.attr) {
        var v = effect.attr[k];
        if (typeof v === 'string' && v.indexOf('rand') === 0) {
          // "rand:-2~3" 形式
          var m = v.match(/rand:(-?\d+)~(-?\d+)/);
          if (m) v = parseInt(m[1]) + rnd(parseInt(m[2]) - parseInt(m[1]) + 1);
        }
        // 体质低谷缓冲：身体濒垮时小额损耗不再叠加，避免"磨损必死"
        if (k === 'str' && v < 0 && life.attr.str <= 2 && v > -4) v = 0;
        life.attr[k] = (life.attr[k] || 0) + v;
        res.deltas[k] = v;
      }
    }
    if (effect.setFlags) for (var i = 0; i < effect.setFlags.length; i++) life.flags[effect.setFlags[i]] = true;
    if (effect.delFlags) for (var j = 0; j < effect.delFlags.length; j++) delete life.flags[effect.delFlags[j]];
    if (effect.setPool) life.pool = effect.setPool;
    if (effect.setRoute) life.route = effect.setRoute;
    if (effect.setAge !== undefined) life.age = effect.setAge;
    // v2：货币/物品/技能由 game.js 的背包系统落地，这里只做透传
    if (effect.coin) res.coin = effect.coin;
    if (effect.items) res.items = effect.items;
    if (effect.skills) res.skills = effect.skills;
    if (effect.kill) { res.killed = true; res.deathText = effect.deathText || ''; life.route = 'dead'; }
    return res;
  }

  /* 体质兜底：幼时体弱易夭折；成年后低体质转为年度病逝风险，避免属性磨损必死 */
  function checkBodyDeath(life) {
    if (life.route === 'dead') return null;
    if (life.age <= 5 && life.attr.str <= 0) {
      life.route = 'dead';
      return '先天体弱的你没能挺过这个冬天，人生刚刚开始便已落幕。';
    }
    if (life.attr.str <= 0) {
      var p = Math.min(0.5, 0.1 + (-life.attr.str) * 0.08);
      if (Math.random() < p) {
        life.route = 'dead';
        return '多年的亏空压垮了身体，你一病不起，人生就此落幕。';
      }
    }
    return null;
  }

  /* 年度自然死亡概率：随年龄指数上升，体质与气运缓解 */
  function mortality(life) {
    var a = life.age;
    if (a < 1) return false;
    // 身体缓慢自愈：体质偏低时每年有小概率调养回来
    if (life.attr.str > 0 && life.attr.str < 3 && Math.random() < 0.12) life.attr.str++;
    var p = 0;
    if (a >= 55) p = Math.pow((a - 50) / 60, 2.6);          // 55岁后爬升
    p *= Math.max(0.25, 1 - (life.attr.str - 5) * 0.07);    // 体质减益
    p *= Math.max(0.5, 1 - life.attr.luk * 0.03);           // 气运减益
    if (life.flags['has_box']) p *= 0.35;                   // 小盒镇命：吊住一口气等你开箱
    if (life.flags['immortal_body']) p = 0;                  // 修仙护体
    if (a >= 130 && !life.flags['immortal_body']) p = Math.max(p, 0.35);
    return Math.random() < p;
  }

  /* 属性变化描述文本 */
  function describeDeltas(deltas) {
    var parts = [];
    for (var k in deltas) {
      var v = deltas[k];
      if (!v) continue;
      parts.push({ name: ATTR_NAMES[k] || k, value: v, up: v > 0 });
    }
    return parts;
  }

  return {
    ATTR_NAMES: ATTR_NAMES, ATTR_KEYS: ATTR_KEYS,
    condPass: condPass, pickEvent: pickEvent, pickSudden: pickSudden, applyEffect: applyEffect,
    checkBodyDeath: checkBodyDeath, mortality: mortality,
    describeDeltas: describeDeltas, hasTalent: hasTalent, rnd: rnd
  };
})();
