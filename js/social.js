/* 人际关系系统：结识/互动/界面。挂在 Game 上，数据存 L.npcs */
var Social = (function () {
  function $(id) { return document.getElementById(id); }
  function L() { return Game.life(); }

  /* 结识检查（每年调用） */
  function checkMeet() {
    var life = L();
    if (!life || life.dead) return;
    if (!life.npcs) life.npcs = {};
    NPCS.forEach(function (n) {
      if (life.npcs[n.id]) return;
      var m = n.meet;
      if (life.age < m.age[0] || life.age > m.age[1]) return;
      if (m.attr && !Engine.condPass({ attr: m.attr }, life)) return;
      if (Math.random() >= m.chance) return;
      life.npcs[n.id] = { favor: 5, lastYear: life.age, chatYear: -1 };
      life.flags['met_' + n.id] = true;   // 供事件 cond 使用
      Game.addCard('<div class="event-card good"><b>结识 · ' + n.name + '</b><br>' + n.intro + '</div>');
      UI.miniToast('结识了新朋友：' + n.name);
      AudioFX.stamp();
    });
  }

  /* 年度关系衰减与随机互动 */
  function yearTick() {
    var life = L();
    if (!life || !life.npcs) return;
    for (var id in life.npcs) {
      var rel = life.npcs[id];
      // 两年没互动，好感 -2（不低于 0）
      if (life.age - rel.lastYear >= 2 && rel.favor > 0) rel.favor = Math.max(0, rel.favor - 2);
    }
  }

  function stageOf(favor) {
    var s = REL_STAGES[0];
    REL_STAGES.forEach(function (r) { if (favor >= r.min) s = r; });
    return s.name;
  }

  /* 互动 */
  function interact(id, kind) {
    var life = L();
    var rel = life.npcs[id];
    var n = null;
    NPCS.forEach(function (x) { if (x.id === id) n = x; });
    if (!rel || !n) return;
    rel.lastYear = life.age;
    if (kind === 'chat') {
      if (rel.chatYear === life.age) { UI.miniToast('今天已经聊过了'); return; }
      rel.chatYear = life.age;
      var g = 2 + Engine.rnd(3);
      rel.favor += g;
      life.attr.spr += 1;
      Game.toast(NPC_TEXTS.chat[Engine.rnd(NPC_TEXTS.chat.length)] + '（好感 +' + g + '，快乐 +1）');
    } else if (kind === 'outing') {
      if (life.ap < 1) { UI.miniToast('行动点不足'); return; }
      life.ap--;
      var g2 = 8 + Engine.rnd(5);
      rel.favor += g2;
      life.attr.spr += 2;
      Game.toast(NPC_TEXTS.outing[Engine.rnd(NPC_TEXTS.outing.length)] + '（好感 +' + g2 + '，快乐 +2）');
    }
    Game.refresh();
    openPanel();   // 刷新界面
    Game.persist();
  }

  function sendGift(id, giftId) {
    var life = L();
    var rel = life.npcs[id];
    var n = null;
    NPCS.forEach(function (x) { if (x.id === id) n = x; });
    var gift = null;
    GIFTS.forEach(function (g) { if (g.id === giftId) gift = g; });
    if (!rel || !n || !gift) return;
    if (!Game.spendCoin(gift.price)) { UI.miniToast('盘缠不够'); return; }
    rel.lastYear = life.age;
    var base = 5 + Engine.rnd(3);
    var liked = n.gift === giftId;
    var gain = liked ? base * 2 : base;
    rel.favor += gain;
    Game.toast((liked ? NPC_TEXTS.gift_good : NPC_TEXTS.gift_normal)[Engine.rnd(2)] + '（好感 +' + gain + '）');
    AudioFX.stamp();
    Game.refresh();
    openPanel();
    Game.persist();
  }

  /* 求婚/结拜：挚友以上+好感 80 */
  function propose(id) {
    var life = L();
    var rel = life.npcs[id];
    var n = null;
    NPCS.forEach(function (x) { if (x.id === id) n = x; });
    if (!rel || rel.favor < 80) return;
    rel.favor = 100;
    life.flags['married'] = true;
    life.flags['spouse_' + id] = true;
    Game.addCard('<div class="event-card fate">你向 ' + n.name + ' 表明了心迹。对方红着眼眶点了点头。从此灯火可亲，三餐四季。</div>');
    UI.sealToast('喜结连理', '与 ' + n.name + ' 步入婚姻');
    AudioFX.stamp();
    Game.refresh();
    openPanel();
    Game.persist();
  }

  /* ---------- 界面 ---------- */
  function openPanel() {
    var life = L();
    var wrap = $('soc-list');
    wrap.innerHTML = '';
    var met = Object.keys(life.npcs || {});
    if (!met.length) {
      wrap.innerHTML = '<p style="color:var(--ink-faint);text-align:center;padding:20px">还未结识任何人。随着年龄增长，缘分自会到来。</p>';
    }
    met.forEach(function (id) {
      var n = null;
      NPCS.forEach(function (x) { if (x.id === id) n = x; });
      var rel = life.npcs[id];
      var div = document.createElement('div');
      div.className = 'map-act';
      var stage = stageOf(rel.favor);
      var isMarried = life.flags['spouse_' + id];
      div.innerHTML =
        '<div style="display:flex;gap:12px;align-items:flex-start">' +
        '<img class="soc-avatar" src="' + (typeof Assets !== 'undefined' ? Assets.url(n.id + '.png') : '') + '" onerror="this.remove()">' +
        '<div style="flex:1"><div class="l-name">' + n.name + ' <small style="color:var(--wacc,#b8862f)">' + (isMarried ? '伴侣' : stage) + '</small></div>' +
        '<div class="l-desc">' + n.vibe + '</div>' +
        '<div class="soc-favor"><div class="soc-favor-fill" style="width:' + Math.min(100, rel.favor) + '%"></div></div></div></div>';
      var btns = document.createElement('div');
      btns.className = 'soc-btns';
      var b1 = document.createElement('button');
      b1.className = 'ink-btn small'; b1.textContent = '聊天';
      b1.onclick = function () { interact(id, 'chat'); };
      btns.appendChild(b1);
      var b2 = document.createElement('button');
      b2.className = 'ink-btn small'; b2.textContent = '邀约(1点)';
      b2.onclick = function () { interact(id, 'outing'); };
      btns.appendChild(b2);
      // 送礼选择
      var sel = document.createElement('select');
      sel.className = 'ink-select';
      GIFTS.forEach(function (g) {
        var o = document.createElement('option');
        o.value = g.id; o.textContent = g.name + ' ' + g.price;
        sel.appendChild(o);
      });
      var b3 = document.createElement('button');
      b3.className = 'ink-btn small'; b3.textContent = '送礼';
      b3.onclick = function () { sendGift(id, sel.value); };
      btns.appendChild(sel); btns.appendChild(b3);
      // 求婚：挚友以上且 80+
      if (rel.favor >= 80 && !life.flags['married'] && !isMarried) {
        var b4 = document.createElement('button');
        b4.className = 'ink-btn small';
        b4.style.borderColor = 'var(--cinnabar)'; b4.style.color = 'var(--cinnabar)';
        b4.textContent = n.gender !== life.gender ? '求婚' : '结拜';
        b4.onclick = function () { propose(id); };
        btns.appendChild(b4);
      }
      div.appendChild(btns);
      wrap.appendChild(div);
    });
    $('overlay-social').classList.remove('hidden');
  }

  return { checkMeet: checkMeet, yearTick: yearTick, openPanel: openPanel };
})();
