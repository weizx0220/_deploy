/* 战斗引擎：回合制，传统副本与肉鸽爬塔共用。
   战力公式（在战斗界面展示）：
   生命 = 60 + 体质×12 + 装备生命
   攻击 = 6 + 体质×0.8 + 智力×0.4 + 装备攻击 + 天赋加成
   防御 = 2 + 体质×0.3 + 装备防御
   暴击 = 5% + 气运×1.2% */
var Combat = (function () {
  var S = null;   // 当前战斗状态

  function $(id) { return document.getElementById(id); }

  /* ---------- 玩家战力 ---------- */
  /* 天赋战力加成：每点稀有度 攻+2 血+10 */
  function talentBonus(life) {
    var atk = 0, hp = 0;
    (life.talents || []).forEach(function (t) {
      var r = t.rarity || 0;
      atk += r * 2; hp += r * 10;
    });
    return { atk: atk, hp: hp };
  }

  /* 天赋附带战斗技能 */
  var TALENT_SKILLS = {
    t_box: 'sk_heal',          // 神秘小盒：灵种护体
    t_cthulhu: 'sk_dark',      // 不可名状之影
    t_jade: 'sk_shield',       // 玉佩护主
    t_luck: 'sk_double'        // 天眷之人
  };

  function playerStats(life) {
    var atk = 0, def = 0, hp = 0;
    var skills = [];
    var seen = {};
    (life.inventory || []).forEach(function (id) {
      var it = itemById(id);
      if (!it) return;
      if (it.slot === 'use') return;
      if (life.equip[it.slot] !== id) return;   // 只算已装备
      atk += it.atk || 0; def += it.def || 0; hp += it.hp || 0;
      if (it.skill && !seen[it.skill]) { seen[it.skill] = 1; skills.push(it.skill); }
    });
    (life.skills || []).forEach(function (sid) { if (!seen[sid]) { seen[sid] = 1; skills.push(sid); } });
    // 天赋附带技能
    (life.talents || []).forEach(function (t) {
      var sid = TALENT_SKILLS[t.id];
      if (sid && !seen[sid]) { seen[sid] = 1; skills.push(sid); }
    });
    var tb = talentBonus(life);
    var lb = (typeof Game !== 'undefined' && Game.legacyCombat) ? Game.legacyCombat() : { atk: 0, hp: 0 };
    return {
      maxhp: Math.round(60 + life.attr.str * 12 + hp + tb.hp + lb.hp),
      atk: Math.round(6 + life.attr.str * 0.8 + life.attr.int * 0.4 + atk + tb.atk + lb.atk),
      def: Math.round(2 + life.attr.str * 0.3 + def),
      crit: 0.05 + (life.attr.luk || 0) * 0.012,
      skills: skills.slice(0, 3)   // 普攻之外最多 3 个技能
    };
  }

  function itemById(id) {
    for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i];
    return null;
  }
  function skillById(id) {
    for (var i = 0; i < SKILLS.length; i++) if (SKILLS[i].id === id) return SKILLS[i];
    return null;
  }

  /* ---------- 伤害 ---------- */
  function calcDamage(atk, mult, def, critCh) {
    var base = atk * mult * (0.85 + Math.random() * 0.3);
    var crit = Math.random() < critCh;
    if (crit) base *= 1.6;
    return { dmg: Math.max(1, Math.round(base - def)), crit: crit };
  }

  /* ---------- 界面 ---------- */
  function render() {
    var e = S.enemies[S.idx];
    $('bt-foe-name').textContent = e.name;
    $('bt-foe-intro').textContent = e.intro || '';
    bar('bt-foe-hp', S.foeHp, e.hp);
    bar('bt-me-hp', S.hp, S.maxhp);
    $('bt-me-shield').textContent = S.shield > 0 ? '护盾 ' + S.shield : '';
    var sk = $('bt-skills');
    sk.innerHTML = '';
    addSkillBtn(sk, { name: '普攻', mult: 1, cd: 0, desc: '朴实无华的一击' }, -1);
    S.skills.forEach(function (sid, i) {
      var s = skillById(sid);
      if (s) addSkillBtn(sk, s, i);
    });
    $('bt-title').textContent = S.title + '（第 ' + (S.idx + 1) + '/' + S.enemies.length + ' 场）';
    $('bt-stats').textContent = '生命 ' + S.hp + '/' + S.maxhp + ' · 攻击 ' + S.atk + ' · 防御 ' + S.def + ' · 暴击 ' + Math.round(S.crit * 100) + '%';
  }

  function addSkillBtn(wrap, s, idx) {
    var b = document.createElement('button');
    b.className = 'bt-skill';
    var cdLeft = idx >= 0 ? (S.cds[idx] || 0) : 0;
    b.innerHTML = s.name + (cdLeft > 0 ? '<small>冷却 ' + cdLeft + '</small>' : (s.cd ? '<small>CD ' + s.cd + '</small>' : '')) +
      '<small>' + (s.desc || '') + '</small>';
    b.disabled = cdLeft > 0 || S.busy;
    b.onclick = function () { act(s, idx); };
    wrap.appendChild(b);
  }

  function bar(id, v, max) {
    var el = $(id);
    el.style.width = Math.max(0, Math.min(100, v / max * 100)) + '%';
    el.textContent = Math.max(0, Math.round(v)) + '/' + max;
  }

  function log(text, cls) {
    var el = $('bt-log');
    var div = document.createElement('div');
    if (cls) div.className = cls;
    div.textContent = text;
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
  }

  /* ---------- 回合 ---------- */
  function act(skill, idx) {
    if (S.busy) return;
    S.busy = true;
    render();
    var e = S.enemies[S.idx];

    // DOT 结算
    if (S.foeDot > 0) {
      S.foeHp -= S.foeDot;
      log(e.name + ' 受到持续伤害 ' + S.foeDot + '。');
      S.foeDot = Math.max(0, S.foeDot - 1);
    }

    if (skill.heal) {
      var h = Math.round(S.maxhp * skill.heal);
      S.hp = Math.min(S.maxhp, S.hp + h);
      log('你施展「' + skill.name + '」，恢复生命 ' + h + '。', 'good');
    } else if (skill.shield) {
      var sh = Math.round(S.maxhp * skill.shield);
      S.shield += sh;
      log('你施展「' + skill.name + '」，获得护盾 ' + sh + '。', 'good');
    } else {
      var r = calcDamage(S.atk, skill.mult || 1, e.def, S.crit);
      S.foeHp -= r.dmg;
      log('你使出「' + skill.name + '」，造成 ' + r.dmg + ' 点伤害' + (r.crit ? '（暴击！）' : '。'), r.crit ? 'good' : '');
      if (skill.dot) { S.foeDot += skill.dot; log(e.name + ' 中了持续伤害。'); }
    }
    if (idx >= 0) S.cds[idx] = skill.cd || 0;
    S.cds = S.cds.map(function (c) { return c > 0 ? c - 1 : 0; });
    if (S.cds[idx] !== undefined && (skill.cd || 0) > 0) S.cds[idx] = skill.cd;   // 当前技能进入冷却

    if (S.foeHp <= 0) return setTimeout(winRound, 500);
    setTimeout(enemyTurn, 650);
  }

  function enemyTurn() {
    var e = S.enemies[S.idx];
    var sk = null;
    if (e.skills && e.skills.length && Math.random() < 0.45) {
      sk = skillById(e.skills[Math.floor(Math.random() * e.skills.length)]);
    }
    var name = sk ? sk.name : '攻击';
    var mult = sk ? (sk.mult || 1.2) : 1;
    var r = calcDamage(e.atk, mult, S.def, 0.05);
    var dmg = r.dmg;
    if (S.shield > 0) {
      var absorbed = Math.min(S.shield, dmg);
      S.shield -= absorbed; dmg -= absorbed;
      if (absorbed > 0) log('护盾挡下 ' + absorbed + ' 点伤害。');
    }
    S.hp -= dmg;
    log(e.name + ' 使用「' + name + '」，你受到 ' + dmg + ' 点伤害。', 'bad');
    if (S.hp <= 0) return setTimeout(function () { end(false); }, 600);
    S.busy = false;
    render();
  }

  function winRound() {
    var e = S.enemies[S.idx];
    log(e.name + ' 倒下了。', 'good');
    S.idx++;
    if (S.idx >= S.enemies.length) return end(true);
    // 连战：回 15% 血
    S.hp = Math.min(S.maxhp, S.hp + Math.round(S.maxhp * 0.15));
    S.shield = 0; S.foeDot = 0; S.foeHp = S.enemies[S.idx].hp;
    S.busy = false;
    log('稍作喘息，下一个对手出现了……');
    render();
  }

  function end(win) {
    if (S.done) return;
    S.done = true;
    $('bt-skills').innerHTML = '';
    var btn = document.createElement('button');
    btn.className = 'ink-btn primary';
    btn.textContent = win ? '凯旋' : '撤退';
    btn.onclick = function () {
      $('overlay-battle').classList.add('hidden');
      var cb = S.onEnd, hpState = S.hpState;
      if (hpState) hpState.hp = Math.max(1, S.hp);
      S = null;
      cb(win, hpState);
    };
    $('bt-skills').appendChild(btn);
    log(win ? '—— 战斗胜利！——' : '—— 你败下阵来……——', win ? 'good' : 'bad');
    AudioFX[win ? 'stamp' : 'doom']();
  }

  /* ---------- 入口 ---------- */
  /* opts: { title, enemies:[{name,hp,atk,def,skills,intro}], hpState(可选，肉鸽续血), onEnd(win, hpState) } */
  function start(opts) {
    var life = opts.life;
    var st = playerStats(life);
    S = {
      title: opts.title || '遭遇战',
      enemies: opts.enemies,
      idx: 0,
      maxhp: st.maxhp, hp: opts.hpState ? Math.min(opts.hpState.hp, st.maxhp) : st.maxhp,
      atk: st.atk, def: st.def, crit: st.crit,
      skills: st.skills, cds: [0, 0, 0],
      shield: 0, foeDot: 0,
      foeHp: opts.enemies[0].hp,
      busy: false,
      hpState: opts.hpState || null,
      onEnd: opts.onEnd
    };
    if (S.hpState) S.hpState.max = st.maxhp;
    $('overlay-battle').classList.remove('hidden');
    $('bt-log').innerHTML = '';
    log(opts.enemies[0].intro || (opts.enemies[0].name + ' 出现了！'));
    render();
    AudioFX.pluck(180, 0.15);
  }

  return { start: start, playerStats: playerStats,
           concede: function () { if (S && !S.done) end(false); } };
})();
