/* 产业经营系统：买产业 → 升级 → 每年收租（含经营事件）
 * 存档字段：L.biz = { bizId: { lv: 1, since: age } }
 * 设计参考：未来人生的公司/房产滚雪球模型，简化为年收益制 */
var Biz = (function () {
  function $(id) { return document.getElementById(id); }

  /* 产业表：base=1级年收益，cost=1级买价，升级费=cost*lv*0.8 */
  var TYPES = {
    life: [
      { id: 'bz_milktea', name: '奶茶店', icon: '茶', base: 18, cost: 150, desc: '街角小铺，薄利多销。' },
      { id: 'bz_diner', name: '私房菜馆', icon: '膳', base: 50, cost: 420, desc: '口碑馆子，回头客不断。' },
      { id: 'bz_studio', name: '工作室', icon: '室', base: 125, cost: 1050, desc: '接项目做外包，饿不死也撑不着。' },
      { id: 'bz_company', name: '科技公司', icon: '司', base: 310, cost: 2600, desc: '融资招人做产品，赌一个上市梦。' },
      { id: 'bz_estate', name: '出租房产', icon: '宅', base: 210, cost: 1800, desc: '每月租金准时到账，最稳的现金流。' }
    ],
    novel_wuxia: [
      { id: 'bz_dart', name: '镖局', icon: '镖', base: 20, cost: 160, desc: '走镖收脚钱，刀口舔血的买卖。' },
      { id: 'bz_herbshop', name: '药铺', icon: '药', base: 55, cost: 450, desc: '坐堂问诊，兼卖跌打药酒。' },
      { id: 'bz_escort', name: '武馆', icon: '馆', base: 135, cost: 1100, desc: '收徒授艺，束脩与名望双收。' }
    ],
    novel_wuxian: [
      { id: 'bz_stall', name: '道具铺', icon: '铺', base: 20, cost: 160, desc: '倒卖副本特产，薄利多销。' },
      { id: 'bz_intel', name: '情报站', icon: '站', base: 62, cost: 500, desc: '攻略与坐标，都是硬通货。' },
      { id: 'bz_guild', name: '佣兵团', icon: '团', base: 160, cost: 1300, desc: '接委托下副本，抽成拿到手软。' }
    ],
    novel_bazong: [
      { id: 'bz_brand', name: '网红品牌', icon: '牌', base: 25, cost: 200, desc: '直播带货，流量就是钱。' },
      { id: 'bz_media', name: '传媒公司', icon: '媒', base: 75, cost: 600, desc: '签约艺人，热搜变现。' },
      { id: 'bz_group', name: '集团分部', icon: '团', base: 250, cost: 2000, desc: '真正的资本游戏，年会上你坐主位。' }
    ],
    novel_moshi: [
      { id: 'bz_farm', name: '避难所农场', icon: '农', base: 18, cost: 150, desc: '围墙里的土豆田，末世的命根子。' },
      { id: 'bz_water', name: '净水站', icon: '水', base: 60, cost: 480, desc: '干净的水比晶核还硬通。' },
      { id: 'bz_convoy', name: '运输队', icon: '队', base: 150, cost: 1200, desc: '废土驼队，连通各个安全区。' }
    ],
    xiuxian: [
      { id: 'bz_field', name: '灵田', icon: '田', base: 20, cost: 160, desc: '灵谷灵药，年年有收成。' },
      { id: 'bz_dan', name: '丹坊', icon: '丹', base: 65, cost: 520, desc: '开炉炼丹，坊市供不应求。' },
      { id: 'bz_mine', name: '灵矿', icon: '矿', base: 185, cost: 1500, desc: '灵石脉矿，坐着数钱的仙家产业。' }
    ]
  };

  function typesOf(world) { return TYPES[world] || TYPES.life; }
  function typeOf(world, id) {
    var ts = typesOf(world);
    for (var i = 0; i < ts.length; i++) if (ts[i].id === id) return ts[i];
    return null;
  }
  function upCost(t, lv) { return Math.round(t.cost * lv * 0.8); }

  /* ---------- 年度结算（game.js 每年调用） ---------- */
  function tick(L) {
    if (!L.biz) return;
    var total = 0, notes = [];
    for (var id in L.biz) {
      var b = L.biz[id];
      var t = typeOf(L.world, id);
      if (!t) continue;
      var inc = t.base * b.lv;
      // 经营事件：15% 触发
      var roll = Math.random();
      if (roll < 0.06) { inc = Math.round(inc * 1.6); notes.push('「' + t.name + '」生意火爆，收益大涨'); }
      else if (roll < 0.10) { inc = Math.round(inc * 0.4); notes.push('「' + t.name + '」经营遇挫，收益缩水'); }
      else if (roll < 0.13 && L.attr.mny >= 6) { inc = Math.round(inc * 1.3); notes.push('靠人脉给「' + t.name + '」拉来大单'); }
      inc = Math.round(inc * (0.85 + Math.random() * 0.3));
      total += inc;
    }
    if (total > 0) {
      L.coin += total;
      UI.miniToast('🏪 产业入账 +' + total + ' ' + Game.coinName());
      if (notes.length && Math.random() < 0.6) {
        Game.addCard('<div class="event-card">' + notes[Engine.rnd(notes.length)] + '。</div>');
      }
    }
  }

  /* ---------- 产业面板（在行动界面内打开） ---------- */
  var backFn = null;
  function openPanel(reRender) {
    if (reRender) backFn = reRender;   // 记住地图渲染回调，内部重渲染不丢
    var L = Game.life();
    var wrap = $('map-actions');
    wrap.innerHTML = '';
    if (!L.biz) L.biz = {};
    var head = document.createElement('p');
    head.style.cssText = 'color:var(--ink-faint);font-size:13px;text-align:center;margin-bottom:8px';
    head.textContent = '产业每年自动产出' + Game.coinName() + '，升级提高收益。盘缠：' + L.coin;
    wrap.appendChild(head);

    typesOf(L.world).forEach(function (t) {
      var own = L.biz[t.id];
      var div = document.createElement('div');
      div.className = 'map-act biz-item';
      var lvTxt = own ? ' <span class="biz-lv">Lv.' + own.lv + '</span>' : '';
      var incTxt = own ? ' <small style="color:var(--jade)">年入约 ' + t.base * own.lv + '</small>' : '';
      div.innerHTML = '<div><div class="l-name"><span class="biz-ico">' + t.icon + '</span>' + t.name + lvTxt + incTxt + '</div>' +
        '<div class="l-desc">' + t.desc + '</div></div>';
      var btns = document.createElement('div');
      btns.style.cssText = 'white-space:nowrap;display:flex;gap:6px';
      if (!own) {
        var buy = document.createElement('button');
        buy.className = 'ink-btn small';
        buy.textContent = '盘下（' + t.cost + '）';
        buy.disabled = L.coin < t.cost;
        buy.onclick = function () {
          if (!Game.spendCoin(t.cost)) return;
          L.biz[t.id] = { lv: 1, since: L.age };
          AudioFX.stamp();
          Game.toast('盘下了「' + t.name + '」，从此每年坐收 ' + Game.coinName() + '。');
          Game.refresh(); openPanel();
        };
        btns.appendChild(buy);
      } else {
        if (own.lv < 5) {
          var uc = upCost(t, own.lv);
          var up = document.createElement('button');
          up.className = 'ink-btn small';
          up.textContent = '升级（' + uc + '）';
          up.disabled = L.coin < uc;
          up.onclick = function () {
            if (!Game.spendCoin(uc)) return;
            own.lv++;
            AudioFX.stamp();
            Game.toast('「' + t.name + '」扩至 Lv.' + own.lv + '，年入约 ' + t.base * own.lv + '。');
            Game.refresh(); openPanel();
          };
          btns.appendChild(up);
        } else {
          var maxed = document.createElement('span');
          maxed.style.cssText = 'color:var(--gold);font-size:12px;align-self:center';
          maxed.textContent = '已满级';
          btns.appendChild(maxed);
        }
        var sell = document.createElement('button');
        sell.className = 'ink-btn small';
        var sv = Math.round((t.cost + accUp(t, own.lv)) * 0.6);
        sell.textContent = '转手 ' + sv;
        sell.onclick = function () {
          if (!confirm('确定转手「' + t.name + '」？拿回 ' + sv + ' ' + Game.coinName())) return;
          delete L.biz[t.id];
          Game.addCoin(sv);
          AudioFX.tick();
          Game.toast('转手了「' + t.name + '」');
          Game.refresh(); openPanel();
        };
        btns.appendChild(sell);
      }
      div.appendChild(btns);
      wrap.appendChild(div);
    });

    var back = document.createElement('button');
    back.className = 'ink-btn small';
    back.style.marginTop = '10px';
    back.textContent = '← 返回';
    back.onclick = function () { if (backFn) backFn(); };
    wrap.appendChild(back);
  }

  function accUp(t, lv) {
    var s = 0;
    for (var i = 1; i < lv; i++) s += upCost(t, i);
    return s;
  }

  function estateValue(L) {
    var v = 0;
    if (L.biz) for (var id in L.biz) {
      var t = typeOf(L.world, id);
      if (t) v += Math.round((t.cost + accUp(t, L.biz[id].lv)) * 0.6);
    }
    return v;
  }

  return { tick: tick, openPanel: openPanel, typesOf: typesOf, estateValue: estateValue };
})();

/* ================= 运气玩法（依附 Biz 模块） ================= */
var Luck = (function () {
  function $(id) { return document.getElementById(id); }

  /* ---------- 幸运转盘（MiniCore Canvas） ---------- */
  function wheel(fee, cb) {
    var L = Game.life();
    if (!Game.spendCoin(fee)) { Game.toast('盘缠不够。'); return; }
    var cn = Game.coinName();
    // 奖品区：数值为净收益（已扣费后的相对值直接做增减）
    var ZONES = [
      { t: '谢谢惠顾', v: 0, w: 26 }, { t: '+' + fee, v: fee, w: 18 },
      { t: '+' + fee * 3, v: fee * 3, w: 14 }, { t: '谢谢惠顾', v: 0, w: 18 },
      { t: '+' + fee * 8, v: fee * 8, w: 8 }, { t: '+' + fee * 2, v: fee * 2, w: 10 },
      { t: '锦鲤附体', v: -1, w: 4 }, { t: '谢谢惠顾', v: 0, w: 2 }
    ];
    var COLORS = ['#8a8778', '#b8862f', '#3d6b5e', '#8a8778', '#a5281b', '#5a7ba4', '#d4a94e', '#55554f'];
    var total = 0; ZONES.forEach(function (z) { total += z.w; });
    var angle = 0, vel = 0, spinning = false, done = false;

    MiniCore.open({
      title: '幸运转盘',
      sub: '点击转盘开转，' + fee + ' ' + cn + ' 一次',
      init: function (api) {},
      onDown: function () {
        if (spinning || done) return;
        spinning = true;
        vel = 11 + Math.random() * 5;
        AudioFX.flip();
      },
      update: function (dt, api) {
        if (!spinning || done) return;
        angle += vel * dt;
        vel *= (1 - dt * 0.95);
        if (vel < 0.25) {
          spinning = false; done = true;
          // 指针在正上方（-90°），算中奖区
          var a = ((-Math.PI / 2 - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          var acc = 0, hit = ZONES[0];
          for (var i = 0; i < ZONES.length; i++) {
            var span = ZONES[i].w / total * Math.PI * 2;
            if (a >= acc && a < acc + span) { hit = ZONES[i]; break; }
            acc += span;
          }
          var mult, title, detail;
          if (hit.v === -1) {
            L.attr.luk = (L.attr.luk || 0) + 1;
            title = '锦鲤附体！'; detail = '气运 +1'; mult = 2;
          } else if (hit.v > 0) {
            Game.addCoin(hit.v);
            title = hit.t + ' ' + cn; detail = hit.v >= fee * 3 ? '手气爆棚！' : '小赚一笔。'; mult = hit.v >= fee * 3 ? 2 : 1.2;
          } else {
            title = '谢谢惠顾'; detail = '分文未中，摊主笑而不语。'; mult = 0.6;
          }
          AudioFX[mult >= 1.2 ? 'stamp' : 'tick']();
          api.finish(title, detail, mult, function () { cb && cb(); });
        }
      },
      draw: function (ctx, api) {
        var cx = 300, cy = 165, R = 120;
        var acc = 0;
        for (var i = 0; i < ZONES.length; i++) {
          var span = ZONES[i].w / total * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, R, angle + acc, angle + acc + span);
          ctx.closePath();
          ctx.fillStyle = COLORS[i];
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.globalAlpha = 1;
          // 文字
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle + acc + span / 2);
          ctx.textAlign = 'right';
          ctx.fillStyle = '#f8f3e6';
          ctx.font = '12px KaiTi, serif';
          ctx.fillText(ZONES[i].t, R - 10, 4);
          ctx.restore();
          acc += span;
        }
        // 中心轴
        ctx.beginPath(); ctx.arc(cx, cy, 14, 0, 7); ctx.fillStyle = '#2a2a2e'; ctx.fill();
        ctx.beginPath(); ctx.arc(cx, cy, 14, 0, 7); ctx.strokeStyle = '#b8862f'; ctx.stroke();
        // 指针
        ctx.beginPath();
        ctx.moveTo(cx, cy - R - 16); ctx.lineTo(cx - 9, cy - R + 2); ctx.lineTo(cx + 9, cy - R + 2);
        ctx.closePath(); ctx.fillStyle = '#a5281b'; ctx.fill();
      }
    });
  }

  /* ---------- 赌石/开箱（三选一翻牌） ---------- */
  function stone(fee, cb) {
    var L = Game.life();
    if (!Game.spendCoin(fee)) { Game.toast('盘缠不够。'); return; }
    var cn = Game.coinName();
    $('mini-title').textContent = '赌石大会';
    // 奖项：倍数（含本），大概率小亏小赚，小概率暴富
    var pool = [0, 0.5, 1.5];
    var roll = Math.random();
    if (roll < 0.06) pool[Math.floor(Math.random() * 3)] = 10;       // 6% 帝王绿
    else if (roll < 0.2) pool[Math.floor(Math.random() * 3)] = 4;    // 14% 大涨
    var html = '<p style="color:var(--ink-faint);font-size:13px;margin-bottom:12px">三块原石，一刀切涨一刀切垮。挑一块（' + fee + ' ' + cn + '）</p><div style="display:flex;gap:12px;justify-content:center">';
    for (var i = 0; i < 3; i++) {
      html += '<button class="ink-btn stone-pick" data-i="' + i + '" style="width:86px;height:110px;font-size:34px">🪨</button>';
    }
    html += '</div><div id="stone-result" style="margin-top:12px;min-height:26px"></div>';
    $('mini-body').innerHTML = html;
    $('overlay-mini').classList.remove('hidden');
    var picked = false;
    var btns = $('mini-body').querySelectorAll('.stone-pick');
    btns.forEach(function (b) {
      b.onclick = function () {
        if (picked) return;
        picked = true;
        var i = parseInt(b.getAttribute('data-i'));
        var mult = pool[i];
        var gain = Math.round(fee * mult);
        var maxGain = Math.round(fee * Math.max.apply(null, pool));
        btns.forEach(function (x, xi) {
          var m = pool[xi];
          x.textContent = m >= 10 ? '💎' : m >= 4 ? '🟢' : m > 1 ? '🟩' : m > 0 ? '🪨' : '⬜';
          x.disabled = true;
          if (xi === i) x.style.borderColor = 'var(--gold)';
        });
        var txt;
        if (gain >= fee * 10) { txt = '帝王绿！！一刀暴富，+' + gain + ' ' + cn; Game.addCoin(gain); AudioFX.stamp(); }
        else if (gain >= fee * 4) { txt = '大涨！+' + gain + ' ' + cn; Game.addCoin(gain); AudioFX.stamp(); }
        else if (gain > fee) { txt = '小涨，回本有余：+' + gain + ' ' + cn; Game.addCoin(gain); AudioFX.tick(); }
        else if (gain > 0) { txt = '切垮了，只回点血：+' + gain + ' ' + cn; Game.addCoin(gain); AudioFX.tick(0.06); }
        else { txt = '一刀切垮，血本无归……'; AudioFX.tick(0.06); }
        $('stone-result').innerHTML = '<b style="color:' + (gain > fee ? 'var(--jade)' : 'var(--cinnabar)') + '">' + txt + '</b>';
        setTimeout(function () { $('overlay-mini').classList.add('hidden'); cb && cb(); }, 1700);
      };
    });
  }

  /* ---------- 刮刮乐（即开型，快进快出） ---------- */
  function scratch(fee) {
    var L = Game.life();
    if (!Game.spendCoin(fee)) { Game.toast('盘缠不够。'); return; }
    var cn = Game.coinName();
    var r = Math.random(), gain = 0, txt = '';
    if (r < 0.02) { gain = fee * 60; txt = '头奖！！刮出' + gain + ' ' + cn + '，彩票店老板都来围观'; }
    else if (r < 0.08) { gain = fee * 15; txt = '大奖！+' + gain + ' ' + cn; }
    else if (r < 0.22) { gain = fee * 5; txt = '中奖！+' + gain + ' ' + cn; }
    else if (r < 0.45) { gain = fee * 2; txt = '小奖，+' + gain + ' ' + cn; }
    else if (r < 0.65) { gain = fee; txt = '回本，再来一张？'; }
    else txt = '谢谢参与，刮了个寂寞。';
    if (gain > 0) Game.addCoin(gain);
    Game.toast('🎫 ' + txt);
    AudioFX[gain >= fee * 5 ? 'stamp' : 'tick']();
  }

  return { wheel: wheel, stone: stone, scratch: scratch };
})();
