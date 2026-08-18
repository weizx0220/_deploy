/* 卡牌战斗引擎（类杀戮尖塔）：能量/抽牌/格挡/敌人意图 + Canvas 模型与特效。
   用于肉鸽爬塔；传统副本仍用 combat.js。 */
var CardBattle = (function () {
  var S = null;
  var anim = { raf: 0, t: 0, lunge: null, shake: 0, parts: [], nums: [], flashes: [] };
  function $(id) { return document.getElementById(id); }
  function cardById(id) { for (var i = 0; i < CARDS.length; i++) if (CARDS[i].id === id) return CARDS[i]; return null; }

  /* ---------- 组牌：固定底牌 + 自由构筑（最多 10 张） ---------- */
  function buildDeck(life) {
    return BASE_DECK.concat(life.deckExtra || []);
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- 怪物造型判定 ---------- */
  function bodySpec(name) {
    if (/软泥|史莱姆|锈怪/.test(name)) return { body: 'slime', color: '#5a6b4a' };
    if (/幽灵|游魂|魂|魅|影/.test(name)) return { body: 'ghost', color: '#4a5a6b' };
    if (/骑士|守卫|典狱长|铠甲/.test(name)) return { body: 'knight', color: '#4a4a55' };
    if (/兽|犬|鼠|狼|蜂|妖兽/.test(name)) return { body: 'beast', color: '#6b4a3a' };
    if (/王|主|母|饕餮|你|魔/.test(name)) return { body: 'boss', color: '#3a2a4a' };
    return { body: 'human', color: '#5a4a4a' };
  }

  /* ---------- 卡牌图标（简笔线条 SVG） ---------- */
  var ICONS = {
    slash: '<path d="M8 24 L24 8 M14 24 L24 14"/>',
    slash2: '<path d="M6 26 L26 6 M12 26 L26 12 M6 20 L20 6"/>',
    shield: '<path d="M16 5 L26 9 V16 C26 23 21 27 16 29 C11 27 6 23 6 16 V9 Z"/>',
    shield2: '<path d="M16 4 L27 8 V16 C27 24 21 28 16 30 C11 28 5 24 5 16 V8 Z"/><path d="M16 9 L22 11 V16 C22 21 19 24 16 25 C13 24 10 21 10 16 V11 Z"/>',
    eye: '<path d="M4 16 C9 9 23 9 28 16 C23 23 9 23 4 16 Z"/><circle cx="16" cy="16" r="3"/>',
    bolt: '<path d="M18 4 L10 18 H16 L14 28 L24 13 H17 Z"/>',
    cross: '<path d="M13 6 H19 V13 H26 V19 H19 V26 H13 V19 H6 V13 H13 Z"/>',
    fire: '<path d="M16 4 C20 9 24 12 24 18 A8 8 0 0 1 8 18 C8 13 12 11 13 6 C14 9 15 10 16 12 C17 9 16 6 16 4 Z"/>',
    drop: '<path d="M16 4 C20 11 24 15 24 20 A8 8 0 0 1 8 20 C8 15 12 11 16 4 Z"/>',
    horn: '<path d="M6 26 C6 14 14 6 26 6 C24 16 16 24 6 26 Z"/><path d="M6 26 L12 20"/>',
    fang: '<path d="M10 4 C10 14 12 22 16 28 C20 22 22 14 22 4 C19 8 17 8 16 8 C15 8 13 8 10 4 Z"/>',
    star: '<path d="M16 4 L19 13 L28 13 L21 19 L23 28 L16 22 L9 28 L11 19 L4 13 L13 13 Z"/>',
    orb: '<circle cx="16" cy="16" r="10"/><path d="M16 6 V26 M6 16 H26"/>',
    thunder: '<path d="M17 3 L8 17 H15 L12 29 L24 13 H16 Z"/>',
    bell: '<path d="M16 5 C22 5 25 10 25 15 V21 L28 25 H4 L7 21 V15 C7 10 10 5 16 5 Z"/><circle cx="16" cy="28" r="2"/>',
    moon: '<path d="M21 4 A11 11 0 1 0 21 28 A9 9 0 0 1 21 4 Z"/>',
    dart: '<path d="M4 28 L28 4 M28 4 L22 6 M28 4 L26 10"/>',
    dbl: '<path d="M6 24 L18 8 M14 26 L26 10"/>',
    phoenix: '<path d="M6 24 C8 14 14 8 26 6 C24 12 22 14 18 16 C22 16 24 15 26 14 C24 22 16 26 6 24 Z"/>',
    godslay: '<path d="M16 3 L19 12 L28 12 L21 18 L24 28 L16 22 L8 28 L11 18 L4 12 L13 12 Z"/><circle cx="16" cy="15" r="4"/>'
  };
  function icon(name, color) {
    return '<svg viewBox="0 0 32 32" class="cb-icon" style="stroke:' + (color || '#2a2a2e') + '">' +
      (ICONS[name] || ICONS.slash) + '</svg>';
  }

  function hasRelic(id) { return S && S.relics && S.relics.indexOf(id) >= 0; }

  /* ---------- 开始 ---------- */
  /* opts: { life, enemy, deck, hpState, title, relics, onEnd(win) } */
  function start(opts) {
    var st = Combat.playerStats(opts.life);
    // 卡牌战斗生命独立设置：100 + 体质×2
    var maxhp = 100 + Math.round(opts.life.attr.str * 2);
    var relics = opts.relics || [];
    if (relics.indexOf('r_iron_heart') >= 0) maxhp = Math.round(maxhp * 1.15);
    S = {
      life: opts.life,
      title: opts.title || '幻境战斗',
      enemy: opts.enemy,
      eHp: opts.enemy.hp, eMax: opts.enemy.hp, eBlock: 0, eStr: 0, ePoison: 0,
      spec: bodySpec(opts.enemy.name),
      relics: relics,
      maxhp: maxhp,
      hp: opts.hpState ? Math.min(opts.hpState.hp, maxhp) : maxhp,
      atk: st.atk,                    // 自身攻击力（卡牌伤害的基准）
      pBlock: 0, pStr: 0,             // pStr = 攻击伤害+%
      crit: st.crit + (relics.indexOf('r_dice') >= 0 ? 0.15 : 0),
      energy: relics.indexOf('r_energy_stone') >= 0 ? 4 : 3,
      deck: shuffle((opts.deck || buildDeck(opts.life)).slice()),
      hand: [], discard: [],
      intent: null,
      pattern: (PATTERNS[opts.tier || 'mob'])[Math.floor(Math.random() * PATTERNS[opts.tier || 'mob'].length)],
      patternIdx: 0,
      weakTurns: 0,                   // 玩家被虚弱（攻击-25%）
      pVulnTurns: 0,                  // 玩家被易伤（受伤+25%）
      eWeakTurns: 0,                  // 敌方虚弱（其攻击-25%）
      eVulnTurns: 0,                  // 敌方易伤（其受伤+25%）
      firstAtk: true, blockedThisTurn: false,
      turn: 1, busy: false, over: false,
      hpState: opts.hpState || null,
      onEnd: opts.onEnd,
      opts: opts
    };
    if (S.hpState) S.hpState.max = maxhp;
    $('overlay-cbattle').classList.remove('hidden');
    AudioFX.bgm(opts.tier === 'boss' ? 'boss' : 'battle');
    $('cb-title').textContent = S.title;
    // 开场遗物
    if (hasRelic('r_armor_shard')) S.pBlock = Math.round(maxhp * 0.1);
    if (hasRelic('r_thunder_bead')) {
      var tb = Math.round(S.eMax * 0.06);
      S.eHp -= tb;
      setTimeout(function () { msg('引雷珠炸响，开场即劈 ' + tb + ' 点伤害'); }, 300);
    }
    rollIntent();
    drawCards(hasRelic('r_swift_boots') ? 6 : 5);
    renderHand();
    startLoop();
    AudioFX.pluck(160, 0.15);
  }

  /* ---------- 敌人意图（自身攻击% + 组合意图轮转） ---------- */
  function intentPct() {
    return 9 + S.enemy.atk * 0.22 + S.turn * 0.3 + S.eStr;   // 占玩家最大生命 %
  }
  /* 组合意图：atk 攻击 / block 防御 / buff 强化 / weak 弱化 / vuln 易伤，可同回合叠加 */
  var PATTERNS = {
    mob: [
      [{ atk: 1 }, { atk: 1 }, { atk: 1, weak: 2 }, { atk: 1 }, { block: 1 }, { atk: 1, buff: 2 }],
      [{ atk: 1 }, { atk: 1 }, { block: 1 }, { atk: 1, vuln: 2 }, { atk: 1 }, { atk: 1, buff: 2 }]
    ],
    elite: [
      [{ atk: 1 }, { atk: 1, weak: 2 }, { atk: 1 }, { buff: 2, block: 1 }, { atk: 1 }, { atk: 1, vuln: 2 }],
      [{ atk: 1, vuln: 2 }, { atk: 1 }, { atk: 1, weak: 2 }, { atk: 1 }, { block: 1, buff: 2 }, { atk: 1 }]
    ],
    boss: [
      [{ atk: 1 }, { buff: 2, block: 1 }, { atk: 1, weak: 2 }, { atk: 1 }, { atk: 1, vuln: 2 }, { atk: 1.25 }],
      [{ atk: 1, vuln: 2 }, { atk: 1 }, { atk: 1.25 }, { atk: 1, weak: 2 }, { buff: 2, block: 1 }, { atk: 1 }]
    ]
  };
  function rollIntent() {
    var it = S.pattern[S.patternIdx % S.pattern.length];
    S.patternIdx++;
    var out = {};
    if (it.atk) out.atk = intentPct() * it.atk;
    if (it.block) out.block = 12 + S.turn * 0.5;
    if (it.buff) out.buff = it.buff * 2;
    if (it.weak) out.weak = it.weak;
    if (it.vuln) out.vuln = it.vuln;
    S.intent = out;
  }

  /* ---------- 抽牌 ---------- */
  function drawCards(n) {
    for (var i = 0; i < n; i++) {
      if (!S.deck.length) { S.deck = shuffle(S.discard); S.discard = []; }
      if (!S.deck.length) break;
      if (S.hand.length >= 8) break;
      S.hand.push(S.deck.pop());
    }
  }

  /* ---------- 出牌 ---------- */
  function playCard(handIdx) {
    if (S.busy || S.over) return;
    var c = cardById(S.hand[handIdx]);
    if (!c || c.cost > S.energy) return;
    S.energy -= c.cost;
    S.hand.splice(handIdx, 1);
    S.discard.push(c.id);
    S.busy = true;

    if (c.dmg) {
      var hits = c.hits || 1, total = 0, anyCrit = false;
      for (var h = 0; h < hits; h++) {
        var pct = c.dmg;
        if (c.execute && S.eVulnTurns > 0) pct *= 2;             // 绝命斩
        if (c.laststand && S.hp < S.maxhp * 0.4) pct = 200;      // 背水一战
        if (S.firstAtk && hasRelic('r_sword_tassel')) pct += 25;   // 残剑穗
        var mult = pct / 100 * (1 + S.pStr / 100);
        if (S.weakTurns > 0) mult *= 0.75;                          // 我方虚弱
        if (S.eVulnTurns > 0) mult *= 1.25;                         // 敌方易伤
        var crit = Math.random() < S.crit;
        if (crit) { anyCrit = true; mult *= 1.5; }
        var dmg = Math.max(1, Math.round(S.atk * mult));
        if (!c.pierce) {
          var absorbed = Math.min(S.eBlock, dmg);
          S.eBlock -= absorbed; dmg -= absorbed;
        }
        S.eHp -= dmg; total += dmg;
        spawnHit(false, crit || c.rarity >= 2);
      }
      S.firstAtk = false;
      msg('「' + c.name + '」造成 ' + total + ' 点伤害' + (anyCrit ? '（暴击）' : ''));
      lunge(false);
      if (c.rarity >= 3) anim.shake = 10;   // 天品牌震屏更猛
      AudioFX.pluck(200 + Math.random() * 120, 0.14);
      if (c.poison) { S.ePoison += c.poison; msg('敌方中毒 ' + S.ePoison + ' 层'); }
      if (c.weak) { S.eWeakTurns = Math.max(S.eWeakTurns, c.weak); msg('敌方陷入虚弱（攻击 -25%，' + S.eWeakTurns + ' 回合）'); }
      if (c.vuln) { S.eVulnTurns = Math.max(S.eVulnTurns, c.vuln); msg('敌方暴露破绽（受伤 +25%，' + S.eVulnTurns + ' 回合）'); }
    }
    if (c.block) {
      var bpct = c.block;
      if (!S.blockedThisTurn && hasRelic('r_turtle')) bpct += 5;   // 龟息玉佩
      var bv = Math.round(S.maxhp * bpct / 100);
      S.pBlock += bv; S.blockedThisTurn = true; spawnShield(); msg('获得 ' + bv + ' 点格挡'); AudioFX.tick();
    }
    if (c.heal) {
      var hv = Math.round(S.maxhp * c.heal / 100);
      S.hp = Math.min(S.maxhp, S.hp + hv); spawnHeal(); msg('回复 ' + hv + ' 点生命');
    }
    if (c.str) { S.pStr += c.str; msg('力量 +' + c.str + '%（本场攻击提升）'); }
    if (c.selfDmg) {
      var sd = Math.max(1, Math.round(S.maxhp * c.selfDmg / 100));
      S.hp = Math.max(1, S.hp - sd);
      msg('自损 ' + sd + ' 点生命，换取爆发');
    }
    if (c.draw) { drawCards(c.draw); msg('抽 ' + c.draw + ' 张牌'); }
    AudioFX.card();
    if (hasRelic('r_blood_sack')) {   // 血玉髓
      var bh = Math.max(1, Math.round(S.maxhp * 0.01));
      S.hp = Math.min(S.maxhp, S.hp + bh);
    }

    renderHand();
    if (S.eHp <= 0) return setTimeout(function () { finish(true); }, 700);
    setTimeout(function () { S.busy = false; renderHand(); }, 350);
  }

  /* ---------- 结束回合 ---------- */
  function endTurn() {
    if (S.busy || S.over) return;
    S.busy = true;
    renderHand();
    setTimeout(enemyAct, 500);
  }

  function enemyAct() {
    var it = S.intent, e = S.enemy;
    // 中毒结算（每层 = 敌方最大生命 1.5%，五毒囊 2%）
    if (S.ePoison > 0) {
      var per = hasRelic('r_poison_vial') ? 0.02 : 0.015;
      var pd = Math.max(1, Math.round(S.eMax * per * S.ePoison));
      S.eHp -= pd;
      msg(e.name + ' 受到 ' + pd + ' 点毒伤');
      S.ePoison = Math.max(0, S.ePoison - 1);
      if (S.eHp <= 0) return finish(true);
    }
    if (it.atk) {
      var pct = it.atk;
      if (S.eWeakTurns > 0) pct *= 0.75;                       // 敌方虚弱
      var raw = Math.max(1, Math.round(S.maxhp * pct / 100));
      if (S.pVulnTurns > 0) raw = Math.round(raw * 1.25);      // 我方易伤
      var dmg = Math.max(0, raw - S.pBlock);
      S.pBlock = Math.max(0, S.pBlock - raw);
      S.hp -= dmg;
      lunge(true); spawnHit(true, false);
      msg(e.name + ' 攻击，你受到 ' + dmg + ' 点伤害');
      AudioFX.tick(0.08);
      if (S.hp <= 0) {
        // 凤凰翎：免死一次
        if (hasRelic('r_phoenix') && !(S.hpState && S.hpState.phoenixUsed)) {
          if (S.hpState) S.hpState.phoenixUsed = true;
          S.hp = Math.round(S.maxhp * 0.2);
          spawnHeal();
          msg('凤凰翎燃起——你于灰烬中站了起来！');
        } else {
          return setTimeout(function () { finish(false); }, 600);
        }
      }
    }
    if (it.block) {
      var eb = Math.round(S.eMax * it.block / 100);
      S.eBlock += eb;
      msg(e.name + ' 架起防御（格挡 +' + eb + '）');
    }
    if (it.buff) {
      var bv = hasRelic('r_mirror') ? Math.round(it.buff / 2) : it.buff;
      S.eStr += bv;
      msg(e.name + ' 气势暴涨（攻击 +' + bv + '%）');
    }
    if (it.weak) {
      var wt = hasRelic('r_mirror') ? Math.max(1, it.weak - 1) : it.weak;
      S.weakTurns = wt;
      msg(e.name + ' 施以震慑——你接下来 ' + wt + ' 回合攻击 -25%！');
    }
    if (it.vuln) {
      var vt = hasRelic('r_mirror') ? Math.max(1, it.vuln - 1) : it.vuln;
      S.pVulnTurns = vt;
      msg(e.name + ' 看穿了你的破绽——你 ' + vt + ' 回合受伤 +25%！');
    }
    // 状态回合数衰减
    if (S.weakTurns > 0) S.weakTurns--;
    if (S.pVulnTurns > 0) S.pVulnTurns--;
    if (S.eWeakTurns > 0) S.eWeakTurns--;
    if (S.eVulnTurns > 0) S.eVulnTurns--;
    // 新回合
    S.turn++;
    S.pBlock = 0;
    S.energy = 3;
    S.blockedThisTurn = false;
    S.discard = S.discard.concat(S.hand);
    S.hand = [];
    drawCards(hasRelic('r_swift_boots') ? 6 : 5);
    rollIntent();
    S.busy = false;
    renderHand();
  }

  function finish(win) {
    if (S.over) return;
    S.over = true;
    stopLoop();
    if (S.hpState) S.hpState.hp = Math.max(1, S.hp);
    var btn = document.createElement('button');
    btn.className = 'ink-btn primary';
    btn.textContent = win ? '凯旋' : '撤退';
    btn.onclick = function () {
      if (!S) return;   // 防连点
      AudioFX.bgm(S.life.pool === 'xiuxian' ? 'xiuxian' : (S.life.pool === 'life' ? 'life' : 'novel'));
      AudioFX.unduck();
      $('overlay-cbattle').classList.add('hidden');
      var cb = S.onEnd; S = null;
      cb(win);
    };
    $('cb-hand').innerHTML = '';
    $('cb-hand').appendChild(btn);
    // 败北时给「看广告再战」机缘（每场一次）
    if (!win && !S.opts.adUsed) {
      var adBtn = document.createElement('button');
      adBtn.className = 'ink-btn';
      adBtn.textContent = '看广告再战';
      adBtn.onclick = function () {
        var opts = S.opts;
        opts.adUsed = true;
        AudioFX.unduck();
        $('overlay-cbattle').classList.add('hidden');
        Puzzle.open({
          onWin: function () {
            UI.miniToast('机缘已到，满血再战！');
            if (opts.hpState) opts.hpState.hp = 99999;   // start 时按满血截断
            start(opts);
          },
          onGiveup: function () {
            if (S) { var cb2 = S.onEnd; S = null; cb2(false); }
          }
        });
      };
      $('cb-hand').appendChild(adBtn);
    }
    msg(win ? '—— 战斗胜利！——' : '—— 你不敌倒下……——');
    AudioFX[win ? 'stamp' : 'doom']();
  }

  function msg(t) { $('cb-msg').textContent = t; }

  /* ---------- DOM 信息栏（大字血条与意图） ---------- */
  function renderInfo() {
    if (!S) return;
    $('cbi-foe-name').textContent = S.enemy.name +
      (S.eWeakTurns > 0 ? '（虚弱）' : '') + (S.eVulnTurns > 0 ? '（易伤）' : '');
    $('cbi-foe-hp').style.width = Math.max(0, S.eHp / S.eMax * 100) + '%';
    $('cbi-foe-hp').textContent = Math.max(0, Math.round(S.eHp)) + ' / ' + S.eMax + (S.eBlock > 0 ? '（盾' + S.eBlock + '）' : '') + (S.ePoison > 0 ? '（毒' + S.ePoison + '）' : '');
    var it = S.intent, itTxt = [];
    if (it) {
      if (it.atk) itTxt.push('⚔ 攻击约 ' + Math.max(1, Math.round(S.maxhp * it.atk / 100)) + ' 点');
      if (it.block) itTxt.push('🛡 防御');
      if (it.buff) itTxt.push('▲ 强化+' + it.buff + '%');
      if (it.weak) itTxt.push('▼ 弱化你');
      if (it.vuln) itTxt.push('◎ 使你易伤');
    }
    $('cbi-intent').textContent = '下回合：' + itTxt.join(' + ');
    $('cbi-intent').className = 'cbi-intent ' + (it && it.atk ? 'atk' : (it && it.block ? 'block' : 'buff'));
    $('cbi-me-hp').style.width = Math.max(0, S.hp / S.maxhp * 100) + '%';
    $('cbi-me-hp').textContent = Math.max(0, Math.round(S.hp)) + ' / ' + S.maxhp;
    var st = [];
    if (S.pBlock > 0) st.push('格挡 ' + S.pBlock);
    if (S.pStr > 0) st.push('力量 +' + S.pStr + '%');
    if (S.weakTurns > 0) st.push('虚弱 ' + S.weakTurns + ' 回合');
    if (S.pVulnTurns > 0) st.push('易伤 ' + S.pVulnTurns + ' 回合');
    $('cbi-me-state').textContent = st.join('　');
  }

  /* ---------- 手牌渲染 ---------- */
  function renderHand() {
    renderInfo();
    var wrap = $('cb-hand');
    wrap.innerHTML = '';
    S.hand.forEach(function (cid, i) {
      var c = cardById(cid);
      var el = document.createElement('div');
      el.className = 'cb-card ' + c.type + ' r' + c.rarity + (c.cost > S.energy || S.busy || S.over ? ' disabled' : '');
      el.innerHTML =
        '<div class="cb-cost">' + c.cost + '</div>' +
        icon(c.icon, c.type === 'atk' ? '#a5281b' : '#3d6b5e') +
        '<div class="cb-cname">' + c.name + '</div>' +
        '<div class="cb-cdesc">' + c.desc + '</div>';
      el.onclick = function () { playCard(i); };
      wrap.appendChild(el);
    });
    $('cb-energy').textContent = S.energy;
    $('cb-draw-n').textContent = S.deck.length;
    $('cb-discard-n').textContent = S.discard.length;
  }

  /* ---------- Canvas 演出 ---------- */
  function startLoop() {
    var cv = $('cb-canvas');
    anim.t = 0;
    cancelAnimationFrame(anim.raf);
    (function loop() {
      if (!S) return;
      anim.t += 16;
      drawScene(cv);
      anim.raf = requestAnimationFrame(loop);
    })();
  }
  function stopLoop() { cancelAnimationFrame(anim.raf); }

  function lunge(byEnemy) { anim.lunge = { who: byEnemy ? 'e' : 'p', t0: anim.t }; anim.shake = 6; }
  function spawnHit(onPlayer, crit) {
    var x = onPlayer ? 180 : 700, y = 170;
    for (var i = 0; i < (crit ? 18 : 10); i++) {
      anim.parts.push({
        x: x, y: y + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 5, vy: -Math.random() * 4 - 1,
        life: 40 + Math.random() * 20,
        color: crit ? '#c23a2a' : (onPlayer ? '#3d6b5e' : '#a5281b'),
        size: 2 + Math.random() * 3
      });
    }
    anim.flashes.push({ who: onPlayer ? 'p' : 'e', t0: anim.t });
  }
  function spawnShield() { anim.flashes.push({ who: 'p', t0: anim.t, shield: true }); }
  function spawnHeal() {
    for (var i = 0; i < 12; i++) {
      anim.parts.push({ x: 180 + (Math.random() - 0.5) * 60, y: 200, vx: 0, vy: -1 - Math.random() * 2, life: 50, color: '#3d6b5e', size: 2.5 });
    }
  }

  var _imgCache = {};
  function imgOf(name) {
    if (_imgCache[name] === undefined) {
      var im = new Image();
      im.onload = function () { _imgCache[name] = im; };
      im.onerror = function () { _imgCache[name] = null; };
      im.src = (typeof Assets !== 'undefined') ? Assets.url(name) : '';
      _imgCache[name] = false;   // 加载中
    }
    return (_imgCache[name] && _imgCache[name].width) ? _imgCache[name] : null;
  }

  function drawScene(cv) {
    var ctx = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    // 战斗背景图（有则用，无则纸色）
    var bg = imgOf('battle_' + (S.life.world || 'life') + '.png');
    if (bg) {
      ctx.globalAlpha = 0.35;
      ctx.drawImage(bg, 0, 0, W, H);
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = 'rgba(243,237,224,0.6)';
      ctx.fillRect(0, 0, W, H);
    }
    ctx.strokeStyle = 'rgba(42,42,46,0.15)';
    ctx.beginPath(); ctx.moveTo(0, H - 60); ctx.lineTo(W, H - 60); ctx.stroke();
    // 震屏
    if (anim.shake > 0.3) {
      ctx.save();
      ctx.translate((Math.random() - 0.5) * anim.shake, (Math.random() - 0.5) * anim.shake);
      anim.shake *= 0.85;
    }
    var bob = Math.sin(anim.t / 450) * 4;
    // 突进位移
    var pOff = 0, eOff = 0;
    if (anim.lunge) {
      var k = (anim.t - anim.lunge.t0) / 260;
      if (k > 1) anim.lunge = null;
      else {
        var d = Math.sin(k * Math.PI) * 60;
        if (anim.lunge.who === 'p') pOff = d; else eOff = -d;
      }
    }
    var pFlash = anim.flashes.some(function (f) { return f.who === 'p' && anim.t - f.t0 < 180; });
    var eFlash = anim.flashes.some(function (f) { return f.who === 'e' && anim.t - f.t0 < 180; });
    anim.flashes = anim.flashes.filter(function (f) { return anim.t - f.t0 < 400; });

    drawPlayer(ctx, 180 + pOff, H - 50 + bob * 0.6, pFlash);
    drawMonster(ctx, 700 + eOff, H - 50 + bob, S.spec, eFlash, S.eHp <= 0);

    // 粒子
    anim.parts = anim.parts.filter(function (p) { return p.life > 0; });
    anim.parts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life--;
      ctx.globalAlpha = Math.min(1, p.life / 30);
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;
    });
    if (anim.shake > 0.3) ctx.restore();
  }

  function barAt(ctx, x, y, w, v, max, color) {
    ctx.fillStyle = 'rgba(42,42,46,0.15)';
    ctx.fillRect(x, y, w, 14);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w * Math.max(0, v / max), 14);
    ctx.fillStyle = '#f3ede0';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(Math.max(0, Math.round(v)) + '/' + max, x + w / 2, y + 11);
  }

  function drawIntent(ctx, x, y) {
    var it = S.intent;
    if (!it) return;
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    if (it.type === 'atk') {
      var raw = Math.max(1, Math.round(S.maxhp * it.pct / 100));
      ctx.fillStyle = '#a5281b'; ctx.fillText('⚔ 攻击 ' + raw + '（' + it.pct.toFixed(0) + '%）', x, y);
    }
    else if (it.type === 'block') {
      var eb = Math.round(S.eMax * it.pct / 100);
      ctx.fillStyle = '#3d6b5e'; ctx.fillText('🛡 防御 ' + eb, x, y);
    }
    else { ctx.fillStyle = '#b8862f'; ctx.fillText('▲ 强化 +' + it.val + '%', x, y); }
  }

  /* ---------- 模型绘制 ---------- */
  function drawPlayer(ctx, x, y, flash) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = flash ? '#f5f0e6' : '#2a2a2e';
    // 袍子
    ctx.beginPath();
    ctx.moveTo(0, -78); ctx.lineTo(-26, 0); ctx.lineTo(26, 0); ctx.closePath(); ctx.fill();
    // 头
    ctx.beginPath(); ctx.arc(0, -88, 13, 0, 7); ctx.fill();
    // 斗笠
    ctx.beginPath(); ctx.moveTo(-22, -92); ctx.lineTo(22, -92); ctx.lineTo(0, -106); ctx.closePath(); ctx.fill();
    // 剑
    ctx.strokeStyle = flash ? '#f5f0e6' : '#55554f'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(14, -40); ctx.lineTo(40, -70); ctx.stroke();
    ctx.restore();
  }

  function drawMonster(ctx, x, y, spec, flash, dead) {
    ctx.save();
    ctx.translate(x, y);
    if (dead) ctx.globalAlpha = 0.35;
    // 有立绘则用立绘，否则画剪影
    var mimg = imgOf('mob_' + spec.body + '.png');
    if (mimg) {
      var mh = 120, mw = mh * mimg.width / mimg.height;
      ctx.drawImage(mimg, -mw / 2, -mh, mw, mh);
      ctx.restore();
      return;
    }
    var col = flash ? '#f5f0e6' : spec.color;
    ctx.fillStyle = col;
    ctx.strokeStyle = col;
    var b = spec.body;
    if (b === 'slime') {
      var w = Math.sin(anim.t / 300) * 5;
      ctx.beginPath();
      ctx.moveTo(-34, 0);
      ctx.quadraticCurveTo(-34 - w, -44, 0, -44 + w);
      ctx.quadraticCurveTo(34 + w, -44, 34, 0);
      ctx.closePath(); ctx.fill();
      eyes(ctx, -10, -22, 10, -22, flash);
    } else if (b === 'ghost') {
      ctx.beginPath();
      ctx.moveTo(-26, 0);
      ctx.lineTo(-26, -50); ctx.quadraticCurveTo(0, -72, 26, -50); ctx.lineTo(26, 0);
      for (var i = 0; i < 4; i++) ctx.quadraticCurveTo(19 - i * 13, -8, 13 - i * 13, 0);
      ctx.closePath(); ctx.fill();
      eyes(ctx, -9, -44, 9, -44, flash);
    } else if (b === 'knight') {
      ctx.fillRect(-22, -64, 44, 64);
      ctx.beginPath(); ctx.moveTo(-22, -64); ctx.lineTo(0, -84); ctx.lineTo(22, -64); ctx.closePath(); ctx.fill();
      ctx.fillRect(-34, -58, 10, 34); ctx.fillRect(24, -58, 10, 34);
      eyes(ctx, -8, -56, 8, -56, flash);
    } else if (b === 'beast') {
      ctx.beginPath(); ctx.ellipse(0, -26, 36, 24, 0, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(26, -44, 16, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(18, -56) ; ctx.lineTo(14, -72); ctx.lineTo(26, -60); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(32, -58); ctx.lineTo(38, -72); ctx.lineTo(40, -56); ctx.closePath(); ctx.fill();
      ctx.fillRect(-26, -12, 8, 12); ctx.fillRect(12, -12, 8, 12);
      eyes(ctx, 28, -48, 0, 0, flash);
    } else if (b === 'boss') {
      ctx.beginPath();
      ctx.moveTo(0, -110); ctx.lineTo(-40, 0); ctx.lineTo(40, 0); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -122, 17, 0, 7); ctx.fill();
      // 王冠
      ctx.beginPath();
      ctx.moveTo(-16, -132); ctx.lineTo(-10, -146); ctx.lineTo(-4, -134); ctx.lineTo(0, -148);
      ctx.lineTo(4, -134); ctx.lineTo(10, -146); ctx.lineTo(16, -132); ctx.closePath(); ctx.fill();
      // 手臂
      ctx.lineWidth = 7;
      ctx.beginPath(); ctx.moveTo(-18, -70); ctx.lineTo(-46, -40 + Math.sin(anim.t / 400) * 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(18, -70); ctx.lineTo(46, -40 - Math.sin(anim.t / 400) * 6); ctx.stroke();
      eyes(ctx, -7, -126, 7, -126, flash, '#c23a2a');
    } else { // human
      ctx.beginPath();
      ctx.moveTo(0, -70); ctx.lineTo(-22, 0); ctx.lineTo(22, 0); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -80, 12, 0, 7); ctx.fill();
      eyes(ctx, -5, -82, 5, -82, flash);
    }
    ctx.restore();
  }

  function eyes(ctx, x1, y1, x2, y2, flash, color) {
    if (flash) return;
    ctx.fillStyle = color || '#f3ede0';
    ctx.beginPath(); ctx.arc(x1, y1, 3, 0, 7); ctx.fill();
    if (x2) { ctx.beginPath(); ctx.arc(x2, y2, 3, 0, 7); ctx.fill(); }
  }

  return { start: start, buildDeck: buildDeck, endTurn: endTurn,
           concede: function () { if (S && !S.over) finish(false); } };
})();
