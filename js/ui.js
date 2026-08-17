/* UI：界面渲染与动效（雷达图 / 人生曲线 / 印章提示 / 图鉴 / 轮回殿） */
var UI = (function () {
  function $(id) { return document.getElementById(id); }

  var SCREEN_BG = {
    title: 'bg_title.png',
    draw: 'bg_draw.png',
    alloc: 'bg_draw.png',
    life: 'bg_life.png',
    summary: 'bg_summary.png'
  };

  function showScreen(name) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    var sc = $('screen-' + name);
    sc.classList.add('active');
    $('topbar').classList.toggle('hidden', name === 'title');
    // 插画背景（缺图自动无背景，保持原水墨风）
    var bgFile = SCREEN_BG[name];
    if (bgFile && typeof Assets !== 'undefined') {
      var u = Assets.url(bgFile);
      var bg = sc.querySelector('.screen-bg');
      if (u) {
        if (!bg) {
          bg = document.createElement('div');
          bg.className = 'screen-bg';
          sc.insertBefore(bg, sc.firstChild);
        }
        bg.style.backgroundImage = 'url("' + u + '")';
        bg.classList.remove('on');
        setTimeout(function () { bg.classList.add('on'); }, 50);
      } else if (bg) { bg.remove(); }
    }
  }

  /* ---------- 雷达图 ---------- */
  function drawRadar(canvas, attr, keys) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2;
    var R = Math.min(W, H) / 2 - 34;
    keys = keys || ['chr', 'int', 'str', 'mny', 'spr'];
    var maxV = 10;
    ctx.clearRect(0, 0, W, H);
    var n = keys.length;
    function pt(i, v) {
      var ang = -Math.PI / 2 + i * 2 * Math.PI / n;
      var r = R * Math.min(v, maxV) / maxV;
      return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
    }
    // 网格
    ctx.strokeStyle = 'rgba(42,42,46,0.14)';
    for (var ring = 1; ring <= 2; ring++) {
      ctx.beginPath();
      for (var i = 0; i <= n; i++) {
        var p = pt(i % n, maxV * ring / 2);
        i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
      }
      ctx.stroke();
    }
    for (var a = 0; a < n; a++) {
      var pe = pt(a, maxV);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(pe[0], pe[1]); ctx.stroke();
    }
    // 数值面
    ctx.beginPath();
    for (var j = 0; j <= n; j++) {
      var pv = pt(j % n, attr[keys[j % n]] || 0);
      j === 0 ? ctx.moveTo(pv[0], pv[1]) : ctx.lineTo(pv[0], pv[1]);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(165,40,27,0.18)';
    ctx.strokeStyle = 'rgba(165,40,27,0.75)';
    ctx.lineWidth = 1.8;
    ctx.fill(); ctx.stroke();
    ctx.lineWidth = 1;
    // 标签
    ctx.fillStyle = '#55554f';
    ctx.font = '15px ' + getComputedStyle(document.body).fontFamily;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (var t = 0; t < n; t++) {
      var ang = -Math.PI / 2 + t * 2 * Math.PI / n;
      var lx = cx + (R + 20) * Math.cos(ang), ly = cy + (R + 20) * Math.sin(ang);
      ctx.fillText(Engine.ATTR_NAMES[keys[t]], lx, ly);
    }
  }

  /* ---------- 人生曲线 ---------- */
  function drawCurve(canvas, history) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    if (!history.length) return;
    var pad = { l: 36, r: 12, t: 16, b: 26 };
    var iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    var maxAge = Math.max(history[history.length - 1].age, 10);
    var maxV = 1;
    history.forEach(function (h) {
      ['chr', 'int', 'str', 'mny', 'spr'].forEach(function (k) { if (h.attr[k] > maxV) maxV = h.attr[k]; });
    });
    maxV = Math.max(maxV, 10);
    function X(age) { return pad.l + iw * age / maxAge; }
    function Y(v) { return pad.t + ih * (1 - v / maxV); }
    // 轴
    ctx.strokeStyle = 'rgba(42,42,46,0.25)';
    ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, pad.t + ih); ctx.lineTo(pad.l + iw, pad.t + ih); ctx.stroke();
    ctx.fillStyle = '#8a8778'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    for (var ag = 0; ag <= maxAge; ag += 20) ctx.fillText(ag + '岁', X(ag), H - 8);
    var colors = { chr: '#b8862f', int: '#3d6b5e', str: '#a5281b', mny: '#6b4d8f', spr: '#c2703a' };
    ['chr', 'int', 'str', 'mny', 'spr'].forEach(function (k) {
      ctx.strokeStyle = colors[k]; ctx.lineWidth = 1.6;
      ctx.beginPath();
      history.forEach(function (h, i) {
        i === 0 ? ctx.moveTo(X(h.age), Y(h.attr[k])) : ctx.lineTo(X(h.age), Y(h.attr[k]));
      });
      ctx.stroke();
    });
    ctx.lineWidth = 1;
    // 图例
    var lx = pad.l + 8;
    ctx.textAlign = 'left';
    ['chr', 'int', 'str', 'mny', 'spr'].forEach(function (k) {
      ctx.fillStyle = colors[k];
      ctx.fillRect(lx, pad.t + 2, 10, 3);
      ctx.fillText(Engine.ATTR_NAMES[k], lx + 13, pad.t + 6);
      lx += 52;
    });
  }

  /* ---------- 印章提示 ---------- */
  var toastQueue = [];
  var toastBusy = false;
  function sealToast(title, sub) {
    toastQueue.push({ title: title, sub: sub });
    if (!toastBusy) nextToast();
  }
  function nextToast() {
    var item = toastQueue.shift();
    if (!item) { toastBusy = false; return; }
    toastBusy = true;
    var el = $('seal-toast'), inner = $('seal-toast-inner');
    inner.innerHTML = item.title + (item.sub ? '<small>' + item.sub + '</small>' : '');
    el.classList.remove('hidden');
    AudioFX.stamp();
    setTimeout(function () {
      el.classList.add('hidden');
      setTimeout(nextToast, 150);
    }, 2200);
  }

  /* ---------- 属性飘字 ---------- */
  function floatText(text, up) {
    var layer = $('float-layer');
    var el = document.createElement('div');
    el.className = 'float-text ' + (up ? 'up' : 'down');
    el.textContent = text;
    el.style.left = (18 + Math.random() * 8) + '%';
    el.style.top = (30 + Math.random() * 30) + '%';
    layer.appendChild(el);
    setTimeout(function () { el.remove(); }, 1700);
  }

  /* ---------- 图鉴 ---------- */
  function renderGallery(tab) {
    var body = $('gallery-body');
    var html = '<div class="gallery-grid">';
    if (tab === 'endings') {
      var have = Save.data.endings;
      var got = 0;
      ENDINGS.forEach(function (e) {
        var unlocked = have.indexOf(e.id) >= 0;
        if (unlocked) got++;
        html += '<div class="gallery-item' + (unlocked ? '' : ' locked') + '">' +
          '<div class="g-name">' + (unlocked ? e.name : '？？？') + '</div>' +
          '<div class="g-desc">' + (unlocked ? e.desc : '尚未抵达的归宿') + '</div></div>';
      });
      html = '<p style="margin-bottom:12px;color:var(--ink-faint)">已抵结局 ' + got + ' / ' + ENDINGS.length + '</p>' + html;
    } else {
      var haveA = Save.data.achievements;
      var gotA = 0;
      ACHIEVEMENTS.forEach(function (a) {
        var unlocked = haveA.indexOf(a.id) >= 0;
        if (unlocked) gotA++;
        var secret = a.hidden && !unlocked;
        html += '<div class="gallery-item' + (unlocked ? '' : ' locked') + '">' +
          '<div class="g-name">' + (secret ? '？？？' : a.name) + '</div>' +
          '<div class="g-desc">' + (secret ? '隐于命运之后' : a.desc) + '</div></div>';
      });
      html = '<p style="margin-bottom:12px;color:var(--ink-faint)">功业 ' + gotA + ' / ' + ACHIEVEMENTS.length + '</p>' + html;
    }
    body.innerHTML = html + '</div>';
  }

  /* ---------- 轮回殿 ---------- */
  var LEGACY_SHOP = [
    { id: 'slot4', name: '第四签位', desc: '入世可择天赋 +1', cost: 30,
      owned: function () { return Save.data.legacy.talentSlots >= 4; },
      can: function () { return Save.data.legacy.talentSlots === 3; },
      buy: function () { Save.data.legacy.talentSlots = 4; } },
    { id: 'slot5', name: '第五签位', desc: '入世可择天赋再 +1', cost: 80,
      owned: function () { return Save.data.legacy.talentSlots >= 5; },
      can: function () { return Save.data.legacy.talentSlots === 4; },
      buy: function () { Save.data.legacy.talentSlots = 5; } },
    { id: 'attr5', name: '先天禀赋', desc: '初始可分配属性点 +5', cost: 25,
      owned: function () { return Save.data.legacy.attrBonus >= 5; },
      can: function () { return Save.data.legacy.attrBonus === 0; },
      buy: function () { Save.data.legacy.attrBonus = 5; } },
    { id: 'attr10', name: '得天独厚', desc: '初始可分配属性点再 +5', cost: 60,
      owned: function () { return Save.data.legacy.attrBonus >= 10; },
      can: function () { return Save.data.legacy.attrBonus === 5; },
      buy: function () { Save.data.legacy.attrBonus = 10; } },
    { id: 'u_rare', name: '天机入池', desc: '轮回限定天赋进入抽签池', cost: 40,
      owned: function () { return Save.data.legacy.unlocks.indexOf('u_rare') >= 0; },
      can: function () { return Save.data.legacy.unlocks.indexOf('u_rare') < 0; },
      buy: function () { Save.data.legacy.unlocks.push('u_rare'); } },
    { id: 'redraw1', name: '改命签', desc: '每世「换一批」次数 +1', cost: 20,
      extra: true },
    { id: 'redraw2', name: '逆天改命', desc: '每世「换一批」次数再 +1', cost: 50,
      extra: true, needs: 'redraw1' },
    { id: 'luk3', name: '福星高照', desc: '出生气运 +3', cost: 35, extra: true },
    { id: 'str2', name: '钢筋铁骨', desc: '出生体质 +2', cost: 30, extra: true },
    { id: 'int2', name: '慧根深种', desc: '出生智力 +2', cost: 30, extra: true },
    { id: 'mny2', name: '衔金而生', desc: '出生家境 +2', cost: 30, extra: true },
    { id: 'sudden_up', name: '多事之秋', desc: '突发事件概率翻倍，人生更跌宕', cost: 25, extra: true },
    { id: 'gender_pick', name: '阴阳自择', desc: '入世前可自选性别', cost: 15, extra: true },
    { id: 'self_name', name: '自署其名', desc: '入世前可自定义姓名', cost: 15, extra: true }
  ];

  LEGACY_SHOP.forEach(function (item) {
    if (!item.extra) return;
    item.owned = function () { return Save.data.legacy.extras.indexOf(item.id) >= 0; };
    item.can = function () {
      if (item.owned()) return false;
      if (item.needs && Save.data.legacy.extras.indexOf(item.needs) < 0) return false;
      return true;
    };
    item.buy = function () { Save.data.legacy.extras.push(item.id); };
  });

  function renderLegacy() {
    $('legacy-points').textContent = Save.data.legacy.points;
    var html = '';
    LEGACY_SHOP.forEach(function (item) {
      var state;
      if (item.owned()) state = '<span style="color:var(--jade)">已持有</span>';
      else if (!item.can()) state = '<span style="color:var(--ink-faint);font-size:13px">需先习得上一阶</span>';
      else state = '<button class="ink-btn small" data-legacy="' + item.id + '"><span class="l-cost">' + item.cost + ' 点</span> 换取</button>';
      html += '<div class="legacy-item"><div><div class="l-name">' + item.name + '</div>' +
        '<div class="l-desc">' + item.desc + '</div></div>' + state + '</div>';
    });
    $('legacy-shop').innerHTML = html;
    var btns = $('legacy-shop').querySelectorAll('[data-legacy]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = function () {
        var id = this.getAttribute('data-legacy');
        for (var j = 0; j < LEGACY_SHOP.length; j++) {
          if (LEGACY_SHOP[j].id === id && LEGACY_SHOP[j].can()) {
            if (Save.spendLegacyPoints(LEGACY_SHOP[j].cost)) {
              LEGACY_SHOP[j].buy(); Save.save();
              AudioFX.stamp();
              renderLegacy();
            } else {
              sealToast('轮回点不足', '再历几世，功德自成');
            }
          }
        }
      };
    }
  }

  /* ---------- 轻提示（小toast） ---------- */
  var miniTimer = null;
  function miniToast(text) {
    var el = document.createElement('div');
    el.className = 'mini-toast';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(function () { el.classList.add('out'); }, 1400);
    setTimeout(function () { el.remove(); }, 1900);
  }

  return {
    $: $, showScreen: showScreen, drawRadar: drawRadar, drawCurve: drawCurve,
    sealToast: sealToast, miniToast: miniToast, floatText: floatText,
    renderGallery: renderGallery, renderLegacy: renderLegacy
  };
})();
