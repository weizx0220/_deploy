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
  var MAX_FLOOR = 12;

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
    renderMap('幻境入口雾气缭绕，十二层高塔直入云霄。登顶者，可向幻境讨一份造化。');
    AudioFX.bgm('novel');
  }

  function close(win) {
    $('overlay-rogue').classList.add('hidden');
    var cb = R.onEnd; R = null;
    cb(win);
  }

  /* ---------- 地图层 ---------- */
  function renderMap(msg) {
    $('rg-floor').textContent = '第 ' + R.floor + ' 层 / ' + MAX_FLOOR;
    bar();
    var wrap = $('rg-nodes');
    wrap.innerHTML = '';
    if (msg) logLine(msg);
    if (R.floor >= MAX_FLOOR) {
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
    if (!R) return;
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
    if (!R || R.busy) return;   // 切换中（如战败结算）禁止重复点击
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
    if (!R) return;
    R.busy = true;
    $('rg-nodes').innerHTML = '';   // 清空节点，防止战斗中残留可点
    $('overlay-rogue').classList.add('hidden');
    CardBattle.start({
      title: '幽冥幻境 · 第 ' + R.floor + ' 层',
      life: R.life,
      enemy: enemy,
      deck: R.deck,
      hpState: R.hpState,
      onEnd: function (win) {
        if (!R) return;
        R.busy = false;
        $('overlay-rogue').classList.remove('hidden');
        bar();
        if (!win) {
          logLine('你不敌倒地，幻境把你吐回了入口。这一趟到此为止。');
          $('rg-nodes').innerHTML = '';
          return setTimeout(function () { offerEndDraft(function () { close(false); }); }, 1200);
        }
        if (isBoss) {
          logLine('雾王座崩塌，幻境认你为主。');
          Game.onRogueClear();
          return setTimeout(function () { offerEndDraft(function () { close(true); }); }, 1200);
        }
        offerRewards(rewardPicks);
      }
    });
  }

  /* ---------- 战后收益（小补给，卡牌改到爬塔结算抓牌） ---------- */
  function offerRewards(n) {
    var wrap = $('rg-nodes');
    wrap.innerHTML = '';
    logLine('雾气散开，你稍作整顿：');
    var opts = [
      { label: '<b>疗伤</b><small>回复 25% 生命</small>', apply: function () {
        R.hpState.hp = Math.min(R.hpState.max, R.hpState.hp + Math.round(R.hpState.max * 0.25));
      } },
      { label: '<b>感悟</b><small>体质 +1</small>', apply: function () { R.life.attr.str += 1; } },
      { label: '<b>财货</b><small>拾取 ' + (30 + R.floor * 15) + ' ' + Game.coinName() + '</small>', apply: function () {
        Game.addCoin(30 + R.floor * 15);
      } }
    ];
    opts.forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'rg-node rg-reward';
      b.innerHTML = o.label;
      b.onclick = function () {
        o.apply();
        n--; if (n > 0) offerRewards(n); else nextFloor();
      };
      wrap.appendChild(b);
    });
  }

  /* ---------- 爬塔结算抓牌（无论成败，三选一入册） ---------- */
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

  function offerEndDraft(onDone) {
    var wrap = $('rg-nodes');
    wrap.innerHTML = '';
    logLine('幻境临别赠礼——择一张卡牌收入囊中：');
    draftCards().forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'rg-node rg-reward rg-card';
      b.innerHTML = '<b>' + c.name + '</b><small>' + c.desc + '</small>';
      b.onclick = function () {
        Game.collectCard(c.id);
        logLine('「' + c.name + '」已收入你的牌册。');
        setTimeout(onDone, 900);
      };
      wrap.appendChild(b);
    });
    var skip = document.createElement('button');
    skip.className = 'rg-node rg-rest';
    skip.innerHTML = '<b>都不要</b><small>拂袖而去</small>';
    skip.onclick = function () { setTimeout(onDone, 100); };
    wrap.appendChild(skip);
  }

  function nextFloor() {
    R.floor++;
    bar();
    renderMap();
  }

  return { start: start };
})();
