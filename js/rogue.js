/* 肉鸽爬塔：幽冥幻境。8 层，每层双路选择，战斗掉三选一强化，血量跨场继承。
   数据来自 js/data/rogue.js（ROGUE_MOBS/ELITES/BOSSES/EVENTS），缺失时用内置兜底。 */
var Rogue = (function () {
  var R = null;
  function $(id) { return document.getElementById(id); }

  /* 内置兜底数据（数据文件缺失时保证可玩） */
  var FALLBACK = {
    mobs: [{ name: '幻境游魂', hp: 70, atk: 10, def: 2, intro: '雾气凝成一个模糊的人影。' }],
    elites: [{ name: '幻境守卫', hp: 180, atk: 20, def: 6, intro: '石像睁开了眼睛。' }],
    bosses: [{ name: '幻境之主', hp: 420, atk: 30, def: 12, intro: '塔顶的雾王座上，它已等候多时。' }],
    events: [{ text: '一口古井，井水幽深。', choices: [{ text: '饮一口', result: '清冽回甘。', heal: 0.25 }, { text: '离开', result: '你继续向上。' }] }]
  };
  function data() {
    return {
      mobs: (typeof ROGUE_MOBS !== 'undefined' && ROGUE_MOBS.length) ? ROGUE_MOBS : FALLBACK.mobs,
      elites: (typeof ROGUE_ELITES !== 'undefined' && ROGUE_ELITES.length) ? ROGUE_ELITES : FALLBACK.elites,
      bosses: (typeof ROGUE_BOSSES !== 'undefined' && ROGUE_BOSSES.length) ? ROGUE_BOSSES : FALLBACK.bosses,
      events: (typeof ROGUE_EVENTS !== 'undefined' && ROGUE_EVENTS.length) ? ROGUE_EVENTS : FALLBACK.events
    };
  }

  var NODE_TYPES = ['fight', 'fight', 'elite', 'event', 'treasure', 'rest'];
  var NODE_NAMES = { fight: '战斗', elite: '精英', event: '奇遇', treasure: '宝箱', rest: '歇息', boss: '塔主' };

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function scaled(base, mult) {
    var f = R.floor;
    return {
      name: base.name, intro: base.intro,
      hp: Math.round(base.hp * (1 + (f - 1) * 0.18) * mult),
      atk: Math.round(base.atk * (1 + (f - 1) * 0.12) * mult),
      def: Math.round(base.def * (1 + (f - 1) * 0.1) * mult),
      skills: base.skills
    };
  }

  function start(life, onEnd) {
    R = { life: life, floor: 1, hpState: { hp: 9999, max: 0 }, onEnd: onEnd, usedEvent: {}, deck: CardBattle.buildDeck(life) };
    // 用玩家满血开战
    var st = Combat.playerStats(life);
    R.hpState.hp = st.maxhp;
    R.hpState.max = st.maxhp;
    $('overlay-rogue').classList.remove('hidden');
    renderMap('幻境入口雾气缭绕，八层高塔直入云霄。登顶者，可向幻境讨一份造化。');
    AudioFX.bgm('novel');
  }

  function close(win) {
    $('overlay-rogue').classList.add('hidden');
    var cb = R.onEnd; R = null;
    cb(win);
  }

  /* ---------- 地图层 ---------- */
  function renderMap(msg) {
    $('rg-floor').textContent = '第 ' + R.floor + ' 层 / 8';
    bar();
    var wrap = $('rg-nodes');
    wrap.innerHTML = '';
    if (msg) logLine(msg);
    if (R.floor >= 8) {
      addNode(wrap, 'boss');
      return;
    }
    // 双路选择
    var a = pick(NODE_TYPES), b = pick(NODE_TYPES);
    addNode(wrap, a);
    addNode(wrap, b);
  }

  function addNode(wrap, type) {
    var b = document.createElement('button');
    b.className = 'rg-node rg-' + type;
    b.textContent = NODE_NAMES[type];
    b.onclick = function () { enterNode(type); };
    wrap.appendChild(b);
  }

  function bar() {
    $('rg-hp').textContent = '生命 ' + Math.max(0, Math.round(R.hpState.hp)) + '/' + R.hpState.max;
    $('rg-hp-bar').style.width = Math.max(0, R.hpState.hp / R.hpState.max * 100) + '%';
  }

  function logLine(t) {
    var el = $('rg-log');
    var div = document.createElement('div');
    div.textContent = t;
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
  }

  function enterNode(type) {
    if (type === 'fight') return fight(scaled(pick(data().mobs), 1), 1);
    if (type === 'elite') return fight(scaled(pick(data().elites), 1.5), 2);
    if (type === 'boss') return fight(pick(data().bosses), 3, true);
    if (type === 'rest') {
      var h = Math.round(R.hpState.max * 0.3);
      R.hpState.hp = Math.min(R.hpState.max, R.hpState.hp + h);
      logLine('你在篝火旁歇了口气，恢复 ' + h + ' 点生命。');
      return nextFloor();
    }
    if (type === 'treasure') {
      if (Math.random() < 0.5) {
        var c = 40 + R.floor * 20;
        Game.addCoin(c);
        logLine('宝箱里是 ' + c + ' ' + Game.coinName() + '。');
      } else {
        var it = Game.randomItem();
        Game.gainItem(it);
        logLine('宝箱里躺着「' + Game.itemName(it) + '」。');
      }
      return nextFloor();
    }
    if (type === 'event') {
      var evs = data().events.filter(function (e, i) { return !R.usedEvent[i]; });
      if (!evs.length) { logLine('这一层空无一人。'); return nextFloor(); }
      var ev = pick(evs);
      R.usedEvent[data().events.indexOf(ev)] = true;
      return showEvent(ev);
    }
  }

  function showEvent(ev) {
    var wrap = $('rg-nodes');
    wrap.innerHTML = '';
    logLine(ev.text);
    ev.choices.forEach(function (ch) {
      var b = document.createElement('button');
      b.className = 'rg-node';
      b.textContent = ch.text;
      b.onclick = function () {
        if (ch.heal) R.hpState.hp = Math.min(R.hpState.max, R.hpState.hp + Math.round(R.hpState.max * ch.heal));
        if (ch.effect) Game.applyEffectRes(R.life, Engine.applyEffect(R.life, ch.effect));
        logLine(typeof ch.result === 'function' ? ch.result(R.life) : (ch.result || ''));
        nextFloor();
      };
      wrap.appendChild(b);
    });
  }

  function fight(enemy, rewardPicks, isBoss) {
    $('overlay-rogue').classList.add('hidden');
    CardBattle.start({
      title: '幽冥幻境 · 第 ' + R.floor + ' 层',
      life: R.life,
      enemy: enemy,
      deck: R.deck,
      hpState: R.hpState,
      onEnd: function (win) {
        $('overlay-rogue').classList.remove('hidden');
        bar();
        if (!win) {
          logLine('你不敌倒地，幻境把你吐回了入口。这一趟到此为止。');
          return setTimeout(function () { close(false); }, 1400);
        }
        if (isBoss) {
          logLine('雾王座崩塌，幻境认你为主。');
          Game.onRogueClear();
          return setTimeout(function () { close(true); }, 1400);
        }
        offerRewards(rewardPicks);
      }
    });
  }

  /* ---------- 三选一抓牌（类杀戮尖塔） ---------- */
  function draftCards() {
    var pool = CARDS.filter(function (c) { return c.id !== 'c_strike' && c.id !== 'c_guard' && c.id !== 'c_focus' && c.id !== 'c_spark'; });
    var W = [40, 30, 20, 10];   // 品质权重
    var opts = [];
    while (opts.length < 3 && pool.length) {
      var total = 0, i;
      for (i = 0; i < pool.length; i++) total += W[pool[i].rarity] || 10;
      var roll = Math.random() * total, pickC = pool[0];
      for (i = 0; i < pool.length; i++) { roll -= W[pool[i].rarity] || 10; if (roll <= 0) { pickC = pool[i]; break; } }
      pool.splice(pool.indexOf(pickC), 1);
      opts.push(pickC);
    }
    return opts;
  }

  function offerRewards(n) {
    var wrap = $('rg-nodes');
    wrap.innerHTML = '';
    logLine('战利品浮现，择一而取：');
    draftCards().forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'rg-node rg-reward rg-card';
      b.innerHTML = '<b>' + c.name + '</b><small>' + c.desc + '</small>';
      b.onclick = function () {
        R.deck.push(c.id);
        logLine('获得卡牌「' + c.name + '」。');
        n--; if (n > 0) offerRewards(n); else nextFloor();
      };
      wrap.appendChild(b);
    });
    // 跳过：回血
    var skip = document.createElement('button');
    skip.className = 'rg-node rg-rest';
    skip.innerHTML = '<b>放弃抓牌</b><small>回复 15% 生命</small>';
    skip.onclick = function () {
      R.hpState.hp = Math.min(R.hpState.max, R.hpState.hp + Math.round(R.hpState.max * 0.15));
      n--; if (n > 0) offerRewards(n); else nextFloor();
    };
    wrap.appendChild(skip);
  }

  function nextFloor() {
    R.floor++;
    bar();
    renderMap();
  }

  return { start: start };
})();
