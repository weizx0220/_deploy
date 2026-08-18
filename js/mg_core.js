/* 小游戏框架：Canvas 循环 / 缓动 / 粒子 / 飘分 / 统一指针输入。
   每个游戏只需提供 init/update/draw/onDown/onMove/onUp 与结算。 */
var MiniCore = (function () {
  var G = null;
  function $(id) { return document.getElementById(id); }

  var W = 600, H = 340;

  function open(opts) {
    G = {
      opts: opts,
      t: 0,
      parts: [],
      floats: [],
      lastTs: 0,
      raf: 0,
      over: false
    };
    $('mini-title').textContent = opts.title || '';
    var body = $('mini-body');
    body.innerHTML = '<canvas id="mg-canvas" width="' + W + '" height="' + H + '" style="width:100%;border-radius:8px;background:rgba(255,250,238,0.7);touch-action:none"></canvas>' +
      '<div id="mg-sub" style="margin-top:6px;font-size:13px;color:var(--ink-faint)">' + (opts.sub || '') + '</div>';
    $('overlay-mini').classList.remove('hidden');
    var cv = $('mg-canvas');
    G.ctx = cv.getContext('2d');

    function pos(e) {
      var r = cv.getBoundingClientRect();
      var p = e.touches ? e.touches[0] : e;
      return { x: (p.clientX - r.left) * (W / r.width), y: (p.clientY - r.top) * (H / r.height) };
    }
    cv.addEventListener('mousedown', function (e) { if (G.opts.onDown) G.opts.onDown(pos(e)); e.preventDefault(); });
    cv.addEventListener('mousemove', function (e) { if (G.opts.onMove) G.opts.onMove(pos(e)); e.preventDefault(); });
    cv.addEventListener('mouseup', function (e) { if (G.opts.onUp) G.opts.onUp(pos(e)); });
    cv.addEventListener('touchstart', function (e) { if (G.opts.onDown) G.opts.onDown(pos(e)); e.preventDefault(); }, { passive: false });
    cv.addEventListener('touchmove', function (e) { if (G.opts.onMove) G.opts.onMove(pos(e)); e.preventDefault(); }, { passive: false });
    cv.addEventListener('touchend', function () { if (G.opts.onUp) G.opts.onUp(null); });

    if (opts.init) opts.init(api);
    G.lastTs = performance.now();
    (function loop(ts) {
      if (!G) return;
      var dt = Math.min(50, ts - G.lastTs) / 1000;
      G.lastTs = ts;
      G.t += dt;
      if (G.opts.update && !G.over) G.opts.update(dt, api);
      draw();
      G.raf = requestAnimationFrame(loop);
    })(G.lastTs);
    return api;
  }

  function draw() {
    var ctx = G.ctx;
    ctx.clearRect(0, 0, W, H);
    if (G.opts.draw) G.opts.draw(ctx, api);
    // 粒子
    G.parts = G.parts.filter(function (p) { return p.life > 0; });
    G.parts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += p.g || 0; p.life--;
      ctx.globalAlpha = Math.min(1, p.life / 25);
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;
    });
    // 飘分
    G.floats = G.floats.filter(function (f) { return f.life > 0; });
    G.floats.forEach(function (f) {
      f.y -= 0.7; f.life--;
      ctx.globalAlpha = Math.min(1, f.life / 40);
      ctx.fillStyle = f.color;
      ctx.font = 'bold 20px ' + getComputedStyle(document.body).fontFamily;
      ctx.textAlign = 'center';
      ctx.fillText(f.text, f.x, f.y);
      ctx.globalAlpha = 1;
    });
  }

  var api = {
    W: W, H: H,
    t: function () { return G ? G.t : 0; },
    burst: function (x, y, color, n) {
      if (!G) return;
      for (var i = 0; i < (n || 12); i++) {
        G.parts.push({
          x: x, y: y,
          vx: (Math.random() - 0.5) * 5, vy: -Math.random() * 4 - 0.5,
          g: 0.12, life: 30 + Math.random() * 25,
          color: color || '#a5281b', size: 2 + Math.random() * 3
        });
      }
    },
    float: function (text, x, y, color) {
      if (!G) return;
      G.floats.push({ text: text, x: x, y: y, color: color || '#2a2a2e', life: 55 });
    },
    sub: function (t) { $('mg-sub').textContent = t; },
    /* 结算：展示结果片刻后关闭并回调倍率 */
    finish: function (title, detail, mult, cb) {
      if (!G || G.over) return;
      G.over = true;
      var ctx = G.ctx;
      draw();
      ctx.fillStyle = 'rgba(243,237,224,0.88)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#2a2a2e';
      ctx.textAlign = 'center';
      ctx.font = 'bold 34px ' + getComputedStyle(document.body).fontFamily;
      ctx.fillText(title, W / 2, H / 2 - 16);
      ctx.font = '17px ' + getComputedStyle(document.body).fontFamily;
      ctx.fillStyle = '#55554f';
      ctx.fillText(detail, W / 2, H / 2 + 22);
      AudioFX[mult >= 1.5 ? 'stamp' : 'tick']();
      setTimeout(function () { close(); cb(mult); }, 1300);
    },
    close: close
  };

  function close() {
    if (G) { cancelAnimationFrame(G.raf); G = null; }
    $('overlay-mini').classList.add('hidden');
  }

  return { open: open, close: close, isOpen: function () { return !!G; } };
})();
