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
    $('map-coin').textContent = L.coin + ' ' + Game.coinName();
    var acts = [
      { id: 'train', name: '历练', desc: '出门闯荡，或遇敌或遇缘（1 行动点）' },
      { id: 'dungeon', name: '副本', desc: '挑战秘境险地，赢取装备赏金（1 行动点）' },
      { id: 'rogue', name: '幽冥幻境', desc: '肉鸽爬塔：八层试炼，血不回满，死了认栽（1 行动点）' },
      { id: 'shop', name: '商店', desc: '逛逛摊位，补给装备（不耗行动点）' },
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
      // 每年刷 3 件
      var pool = ITEMS.filter(function (it) { return it.price > 0; });
      stock = { year: L.age, items: [] };
      for (var i = 0; i < 3 && pool.length; i++) {
        var idx = Math.floor(Math.random() * pool.length);
        stock.items.push(pool.splice(idx, 1)[0].id);
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

  /* ---------- 背包 ---------- */
  function openInventory() {
    var L = Game.life();
    var wrap = $('inv-list');
    wrap.innerHTML = '';
    $('inv-coin').textContent = L.coin + ' ' + Game.coinName();
    if (!L.inventory.length) wrap.innerHTML = '<p style="color:var(--ink-faint)">囊中空空。</p>';
    L.inventory.forEach(function (iid, idx) {
      var it = Game.item(iid);
      if (!it) return;
      var div = document.createElement('div');
      div.className = 'map-act';
      var statTxt = it.slot === 'use' ? '' :
        (' <small style="color:var(--jade)">' +
         (it.atk ? '攻+' + it.atk + ' ' : '') + (it.def ? '防+' + it.def + ' ' : '') + (it.hp ? '血+' + it.hp : '') + '</small>');
      var equipped = it.slot !== 'use' && L.equip[it.slot] === iid;
      div.innerHTML = '<div class="l-name">' + it.name + (equipped ? ' <small style="color:var(--cinnabar)">已装备</small>' : '') + statTxt + '</div>' +
        '<div class="l-desc">' + it.desc + '</div>';
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      if (it.slot === 'use') {
        btn.textContent = '使用';
        btn.onclick = function () { Game.useItem(idx); openInventory(); Game.refresh(); };
      } else {
        btn.textContent = equipped ? '卸下' : '装备';
        btn.onclick = function () { Game.toggleEquip(iid); openInventory(); Game.refresh(); };
      }
      div.appendChild(btn);
      wrap.appendChild(div);
    });
    $('overlay-inv').classList.remove('hidden');
  }

  return { open: open, openInventory: openInventory };
})();
