/* 地图行动 / 副本列表 / 商店 / 背包。依赖 Game 暴露的背包与货币助手。 */
var MapX = (function () {
  function $(id) { return document.getElementById(id); }

  /* ---------- 地图主面板 ---------- */
  function open() {
    render();
    $('overlay-map').classList.remove('hidden');
  }

  function render() {
    var L = Game.life();
    $('map-world').textContent = Game.worldName();
    $('map-ap').textContent = L.ap;
    $('map-ap-note').textContent = '每 ' + Game.apInterval() + ' 年 +1，上限 3';
    $('map-coin').textContent = L.coin + ' ' + Game.coinName();
    var acts = [
      { id: 'train', name: '历练', desc: '出门闯荡，或遇敌或遇缘（1 行动点）' },
      { id: 'dungeon', name: '副本', desc: '挑战秘境险地，赢取装备赏金（1 行动点）' },
      { id: 'rogue', name: '幽冥幻境', desc: '肉鸽爬塔：十二层试炼，血不回满（1 行动点）' },
      { id: 'deck', name: '牌组', desc: '查看卡牌收藏，调整幻境牌组（不耗行动点）' },
      { id: 'shop', name: '商店', desc: '逛逛摊位，补给装备卡牌（不耗行动点）' },
      { id: 'rest', name: '休息', desc: '泡个热水澡，体质 +1（1 行动点，每年限一次）' }
    ];
    var wrap = $('map-actions');
    wrap.innerHTML = '';
    acts.forEach(function (a) {
      var div = document.createElement('div');
      div.className = 'map-act';
      div.innerHTML = '<div class="l-name">' + a.name + '</div><div class="l-desc">' + a.desc + '</div>';
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      btn.textContent = '前往';
      var needAp = a.id !== 'shop';
      if (needAp && L.ap < 1) { btn.disabled = true; btn.textContent = '行动点不足'; }
      if (a.id === 'rest' && L.restYear === L.age) { btn.disabled = true; btn.textContent = '今年已歇过'; }
      btn.onclick = function () { act(a.id); };
      div.appendChild(btn);
      wrap.appendChild(div);
    });
  }

  function act(id) {
    var L = Game.life();
    if (id === 'shop') return openShop();
    if (id === 'dungeon') return openDungeons();
    if (id === 'deck') return openDeck();
    if (L.ap < 1) return;
    if (id === 'rest') {
      L.ap--; L.restYear = L.age;
      L.attr.str += 1;
      Game.toast('你踏踏实实休息了一阵，体质 +1。');
      Game.refresh();
      return render();
    }
    if (id === 'rogue') {
      L.ap--;
      $('overlay-map').classList.add('hidden');
      Rogue.start(L, function (win) {
        Game.refresh();
        Game.onActionDone('幻境归来，' + (win ? '你带着造化全身而退。' : '你灰头土脸，但命还在。'));
      });
      return;
    }
    if (id === 'train') {
      L.ap--;
      return train();
    }
  }

  /* ---------- 历练 ---------- */
  function train() {
    var L = Game.life();
    var roll = Math.random();
    if (roll < 0.5) {
      // 遭遇战：强度随年龄/世界缩放
      var base = 30 + L.age * 2 + L.attr.str * 2;
      var enemy = {
        name: Game.encounterName(),
        intro: '历练途中，杀出个拦路的。',
        hp: Math.round(base), atk: Math.round(6 + L.age * 0.35), def: Math.round(1 + L.age * 0.12)
      };
      $('overlay-map').classList.add('hidden');
      Combat.start({
        title: '历练遭遇', life: L, enemies: [enemy],
        onEnd: function (win) {
          if (win) {
            var c = 20 + Engine.rnd(40);
            Game.addCoin(c);
            Game.toast('历练告捷，缴获 ' + c + ' ' + Game.coinName() + '。');
          } else {
            L.attr.str = Math.max(-2, L.attr.str - 1);
            Game.toast('历练受挫，体质 -1。');
          }
          Game.refresh();
          Game.onActionDone('');
        }
      });
    } else if (roll < 0.78) {
      var c2 = 15 + Engine.rnd(50);
      Game.addCoin(c2);
      Game.toast('你在市集角落捡到钱袋，' + Game.coinName() + ' +' + c2 + '。');
      Game.refresh(); render();
    } else if (roll < 0.9) {
      var it = Game.randomItem();
      Game.gainItem(it);
      Game.toast('奇遇！你获得「' + Game.itemName(it) + '」。');
      Game.refresh(); render();
    } else {
      Game.toast('逛了一整天，看了些新鲜景，什么也没发生。');
      render();
    }
  }

  /* ---------- 副本 ---------- */
  function openDungeons() {
    var L = Game.life();
    var list = DUNGEONS.filter(function (d) {
      if (d.world !== '*' && d.world !== L.world) return false;
      if (d.minAge && L.age < d.minAge) return false;
      return true;
    });
    var wrap = $('map-actions');
    wrap.innerHTML = '';
    if (!list.length) wrap.innerHTML = '<p style="color:var(--ink-faint)">此间暂无副本可入。</p>';
    list.forEach(function (d) {
      var cdLeft = (L.dungeonCd[d.id] || 0) - L.age;
      var div = document.createElement('div');
      div.className = 'map-act';
      div.innerHTML = '<div class="l-name">' + d.name + ' <small style="color:var(--gold)">' + '★'.repeat(d.difficulty) + '</small></div>' +
        '<div class="l-desc">' + d.desc + '</div>';
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      if (cdLeft > 0) { btn.disabled = true; btn.textContent = '休整中（' + cdLeft + ' 年）'; }
      else btn.textContent = '挑战';
      btn.onclick = function () { startDungeon(d); };
      div.appendChild(btn);
      wrap.appendChild(div);
    });
    backBtn();
  }

  function startDungeon(d) {
    var L = Game.life();
    L.ap--;
    $('overlay-map').classList.add('hidden');
    Combat.start({
      title: d.name, life: L, enemies: d.enemies,
      onEnd: function (win) {
        if (win) {
          L.dungeonCd[d.id] = L.age + (d.cooldown || 5);
          Game.applyReward(d.reward || {}, d.name);
        } else {
          L.attr.str = Math.max(-2, L.attr.str - 2);
          Game.toast('你在「' + d.name + '」里栽了跟头，体质 -2。');
        }
        Game.refresh();
        Game.onActionDone('');
      }
    });
  }

  /* ---------- 商店 ---------- */
  function openShop() {
    var L = Game.life();
    var wrap = $('map-actions');
    wrap.innerHTML = '';
    var stock = L.shopStock;
    if (!stock || stock.year !== L.age) {
      // 每年刷 3 件 + 30% 概率一张卡牌
      var pool = ITEMS.filter(function (it) { return it.price > 0; });
      stock = { year: L.age, items: [], card: null };
      for (var i = 0; i < 3 && pool.length; i++) {
        var idx = Math.floor(Math.random() * pool.length);
        stock.items.push(pool.splice(idx, 1)[0].id);
      }
      if (Math.random() < 0.35) {
        var cp = CARDS.filter(function (c) { return c.rarity <= 2; });
        stock.card = cp[Math.floor(Math.random() * cp.length)].id;
      }
      L.shopStock = stock;
    }
    stock.items.forEach(function (iid) {
      var it = Game.item(iid);
      if (!it) return;
      var div = document.createElement('div');
      div.className = 'map-act';
      div.innerHTML = '<div class="l-name">' + it.name + ' <small style="color:var(--gold)">' + it.price + ' ' + Game.coinName() + '</small></div>' +
        '<div class="l-desc">' + it.desc + '</div>';
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      btn.textContent = '买下';
      if (L.coin < it.price) { btn.disabled = true; btn.textContent = '钱不够'; }
      btn.onclick = function () {
        if (!Game.spendCoin(it.price)) return;
        Game.gainItem(iid);
        stock.items = stock.items.filter(function (x) { return x !== iid; });
        AudioFX.stamp();
        openShop();
        Game.refresh();
      };
      div.appendChild(btn);
      wrap.appendChild(div);
    });
    // 卡牌货架
    if (stock.card) {
      var c = null;
      for (var ci = 0; ci < CARDS.length; ci++) if (CARDS[ci].id === stock.card) c = CARDS[ci];
      if (c) {
        var price = 60 + c.rarity * 60;
        var cdiv = document.createElement('div');
        cdiv.className = 'map-act';
        cdiv.innerHTML = '<div class="l-name">卡牌·' + c.name + ' <small style="color:var(--gold)">' + price + ' ' + Game.coinName() + '</small></div>' +
          '<div class="l-desc">' + c.desc + '</div>';
        var cbtn = document.createElement('button');
        cbtn.className = 'ink-btn small';
        cbtn.textContent = '买下';
        if (L.coin < price) { cbtn.disabled = true; cbtn.textContent = '钱不够'; }
        cbtn.onclick = function () {
          if (!Game.spendCoin(price)) return;
          Game.collectCard(stock.card);
          stock.card = null;
          AudioFX.stamp();
          openShop();
          Game.refresh();
        };
        cdiv.appendChild(cbtn);
        wrap.appendChild(cdiv);
      }
    }
    backBtn();
  }

  function backBtn() {
    var wrap = $('map-actions');
    var b = document.createElement('button');
    b.className = 'ink-btn small';
    b.style.marginTop = '10px';
    b.textContent = '← 返回';
    b.onclick = render;
    wrap.appendChild(b);
  }

  /* ---------- 牌组构筑 ---------- */
  function cardOf(id) { for (var i = 0; i < CARDS.length; i++) if (CARDS[i].id === id) return CARDS[i]; return null; }

  function openDeck() {
    $('overlay-map').classList.add('hidden');
    renderDeck();
    $('overlay-deck').classList.remove('hidden');
  }

  function renderDeck() {
    var L = Game.life();
    $('dk-count').textContent = L.deckExtra.length;
    var deck = $('dk-deck'), coll = $('dk-coll');
    deck.innerHTML = ''; coll.innerHTML = '';
    if (!L.deckExtra.length) deck.innerHTML = '<p style="color:var(--ink-faint);font-size:13px">尚未加入卡牌，只带底牌上阵。</p>';
    L.deckExtra.forEach(function (cid, idx) {
      var c = cardOf(cid);
      if (!c) return;
      deck.appendChild(cardChip(c, function () {
        L.deckExtra.splice(idx, 1);
        AudioFX.tick();
        renderDeck();
      }));
    });
    var rest = L.collection.filter(function (cid) { return L.deckExtra.indexOf(cid) < 0; });
    if (!rest.length) coll.innerHTML = '<p style="color:var(--ink-faint);font-size:13px">收藏空空。爬塔结算与商店都能获得新卡。</p>';
    rest.forEach(function (cid) {
      var c = cardOf(cid);
      if (!c) return;
      coll.appendChild(cardChip(c, function () {
        if (L.deckExtra.length >= 10) { Game.toast('构筑已满（10 张），先移除一张'); return; }
        L.deckExtra.push(cid);
        AudioFX.stamp();
        renderDeck();
      }));
    });
  }

  function cardChip(c, onclick) {
    var el = document.createElement('div');
    el.className = 'dk-card r' + c.rarity;
    el.innerHTML = '<b>' + c.name + '</b><small>' + c.cost + ' 费 · ' + c.desc + '</small>';
    el.onclick = onclick;
    return el;
  }

  /* ---------- 装备 / 行囊（环绕式装备栏 + 强化 + 售卖） ---------- */
  var SLOT_NAMES = { weapon: '兵刃', armor: '衣甲', head: '头饰', trinket: '饰品', charm: '法宝' };
  var invTab = 'equip';
  var slotSel = null;

  function effStats(it) {
    var lv = (Game.life().forge || {})[it.id] || 0;
    var m = 1 + 0.25 * lv;
    return {
      lv: lv,
      atk: Math.round((it.atk || 0) * m),
      def: Math.round((it.def || 0) * m),
      hp: Math.round((it.hp || 0) * m)
    };
  }

  function openInventory() {
    renderInv();
    $('overlay-inv').classList.remove('hidden');
  }

  function renderInv() {
    var L = Game.life();
    $('inv-coin').textContent = L.coin + ' ' + Game.coinName();
    // 页签
    var tabs = $('inv-tabs').querySelectorAll('.tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].getAttribute('data-itab') === invTab);
      tabs[i].onclick = function () { invTab = this.getAttribute('data-itab'); slotSel = null; AudioFX.tick(0.05); renderInv(); };
    }
    if (invTab === 'equip') renderEquipTab();
    else renderBagTab();
  }

  function renderEquipTab() {
    var L = Game.life();
    $('inv-equip').classList.remove('hidden');
    $('inv-bag').classList.add('hidden');
    // 中央人物名
    $('eq-center-name').textContent = L.name;
    // 五个槽位
    var slots = document.querySelectorAll('.eq-slot');
    slots.forEach(function (slotEl) {
      var slot = slotEl.getAttribute('data-slot');
      var iid = L.equip[slot];
      var it = iid ? Game.item(iid) : null;
      var lv = it ? (L.forge[it.id] || 0) : 0;
      slotEl.innerHTML = '<small>' + SLOT_NAMES[slot] + '</small><b>' + (it ? it.name : '——') + '</b>' +
        (it && lv ? '<i>+' + lv + '</i>' : '');
      slotEl.classList.toggle('filled', !!it);
      slotEl.classList.toggle('sel', slotSel === slot);
      slotEl.onclick = function () {
        if (slotSel === slot) { slotSel = null; }
        else {
          slotSel = slot;
          // 空槽时自动穿上背包里第一件该部位
          if (!L.equip[slot]) {
            var cand = L.inventory.find(function (x) { var t = Game.item(x); return t && t.slot === slot; });
            if (cand) { L.equip[slot] = cand; AudioFX.stamp(); slotSel = null; Game.refresh(); }
          }
        }
        renderInv();
      };
    });
    // 槽位详情
    var detail = $('eq-detail');
    if (!slotSel || !L.equip[slotSel]) { detail.innerHTML = '<p style="color:var(--ink-faint)">点击槽位查看 / 换装 / 强化。空槽点击自动穿上背包中该部位装备。</p>'; return; }
    var iid = L.equip[slotSel];
    var it = Game.item(iid);
    var es = effStats(it);
    var st = [];
    if (es.atk) st.push('攻击+' + es.atk);
    if (es.def) st.push('防御+' + es.def);
    if (es.hp) st.push('生命+' + es.hp);
    var cost = Math.round(it.price * 0.5 * (es.lv + 1));
    detail.innerHTML = '<b>' + it.name + '</b>（' + SLOT_NAMES[it.slot] + ' · 强化 +' + es.lv + '）<br>' +
      '<span style="color:var(--jade)">' + (st.join('　') || '无属性') + '</span>　<span style="color:var(--ink-faint);font-size:12.5px">' + it.desc + '</span>';
    var row = document.createElement('div');
    row.className = 'eq-actions';
    // 强化
    var fbtn = document.createElement('button');
    fbtn.className = 'ink-btn small';
    fbtn.textContent = es.lv >= 5 ? '已满级' : ('强化（' + cost + '）');
    fbtn.disabled = es.lv >= 5 || L.coin < cost;
    fbtn.onclick = function () {
      if (!Game.spendCoin(cost)) return;
      L.forge[it.id] = es.lv + 1;
      AudioFX.stamp();
      Game.toast(it.name + ' 强化至 +' + (es.lv + 1));
      Game.refresh(); renderInv();
    };
    row.appendChild(fbtn);
    // 换下一件
    var others = L.inventory.filter(function (x) { var t = Game.item(x); return t && t.slot === it.slot && x !== iid; });
    if (others.length) {
      var sw = document.createElement('button');
      sw.className = 'ink-btn small';
      sw.textContent = '换下一件';
      sw.onclick = function () {
        var cur = others.indexOf(iid);
        L.equip[it.slot] = others[(cur + 1) % others.length];
        AudioFX.tick(); Game.refresh(); renderInv();
      };
      row.appendChild(sw);
    }
    // 卸下
    var off = document.createElement('button');
    off.className = 'ink-btn small';
    off.textContent = '卸下';
    off.onclick = function () { L.equip[it.slot] = null; slotSel = null; AudioFX.tick(); Game.refresh(); renderInv(); };
    row.appendChild(off);
    detail.appendChild(row);
  }

  function renderBagTab() {
    var L = Game.life();
    $('inv-equip').classList.add('hidden');
    $('inv-bag').classList.remove('hidden');
    var wrap = $('inv-list');
    wrap.innerHTML = '';
    if (!L.inventory.length) wrap.innerHTML = '<p style="color:var(--ink-faint)">囊中空空。</p>';
    L.inventory.forEach(function (iid, idx) {
      var it = Game.item(iid);
      if (!it) return;
      var es = effStats(it);
      var div = document.createElement('div');
      div.className = 'map-act';
      var statTxt = it.slot === 'use' ? '' :
        (' <small style="color:var(--jade)">' +
         (es.atk ? '攻+' + es.atk + ' ' : '') + (es.def ? '防+' + es.def + ' ' : '') + (es.hp ? '血+' + es.hp : '') +
         (es.lv ? ' <span style="color:var(--gold)">+' + es.lv + '</span>' : '') + '</small>');
      var equipped = it.slot !== 'use' && L.equip[it.slot] === iid;
      div.innerHTML = '<div class="l-name">' + it.name + (equipped ? ' <small style="color:var(--cinnabar)">已装备</small>' : '') + statTxt + '</div>' +
        '<div class="l-desc">' + it.desc + '</div>';
      var btnWrap = document.createElement('div');
      btnWrap.style.whiteSpace = 'nowrap';
      // 主按钮
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      if (it.slot === 'use') {
        btn.textContent = '使用';
        btn.onclick = function () { Game.useItem(idx); renderInv(); Game.refresh(); };
      } else {
        btn.textContent = equipped ? '卸下' : '装备';
        btn.onclick = function () { Game.toggleEquip(iid); renderInv(); Game.refresh(); };
      }
      btnWrap.appendChild(btn);
      // 售卖（40% 价格）
      if (it.price) {
        var sell = document.createElement('button');
        sell.className = 'ink-btn small';
        sell.style.marginLeft = '6px';
        sell.textContent = '售 ' + Math.round(it.price * 0.4);
        sell.onclick = function () {
          if (L.equip[it.slot] === iid) L.equip[it.slot] = null;
          L.inventory.splice(idx, 1);
          Game.addCoin(Math.round(it.price * 0.4));
          AudioFX.tick();
          Game.toast('售出「' + it.name + '」');
          renderInv(); Game.refresh();
        };
        btnWrap.appendChild(sell);
      }
      // 丢弃
      var del = document.createElement('button');
      del.className = 'ink-btn small';
      del.style.marginLeft = '6px';
      del.textContent = '丢弃';
      del.onclick = function () {
        if (!confirm('确定丢弃「' + it.name + '」？')) return;
        if (L.equip[it.slot] === iid) L.equip[it.slot] = null;
        L.inventory.splice(idx, 1);
        AudioFX.tick(0.06);
        renderInv(); Game.refresh();
      };
      btnWrap.appendChild(del);
      div.appendChild(btnWrap);
      wrap.appendChild(div);
    });
  }

  return { open: open, openInventory: openInventory, openDeck: openDeck };
})();
