/* 「看广告」拼图小游戏：3×3 换图还原。用游戏插画做图；无图时自动生成水墨图案。
   完成 → onWin；点「放弃」→ onGiveup。 */
var Puzzle = (function () {
  var P = null;
  function $(id) { return document.getElementById(id); }

  var IMGS = ['bg_title.png', 'novel_wuxia.png', 'xx_cultivate.png', 'bg_summary.png', 'novel_moshi.png'];

  /* 无素材时生成一张水墨小景 */
  function generatedArt() {
    var cv = document.createElement('canvas');
    cv.width = cv.height = 360;
    var c = cv.getContext('2d');
    c.fillStyle = '#f3ede0'; c.fillRect(0, 0, 360, 360);
    // 红日
    c.fillStyle = '#a5281b';
    c.beginPath(); c.arc(270, 80, 28, 0, 7); c.fill();
    // 远山三层
    var cols = ['rgba(60,72,84,0.25)', 'rgba(60,72,84,0.4)', 'rgba(42,42,46,0.6)'];
    for (var l = 0; l < 3; l++) {
      c.fillStyle = cols[l];
      c.beginPath();
      c.moveTo(0, 360);
      var base = 200 + l * 40;
      for (var x = 0; x <= 360; x += 20) {
        c.lineTo(x, base - Math.abs(Math.sin(x * 0.02 + l * 2)) * (70 - l * 15));
      }
      c.lineTo(360, 360); c.closePath(); c.fill();
    }
    // 舟
    c.fillStyle = '#2a2a2e';
    c.beginPath(); c.moveTo(90, 300); c.lineTo(170, 300); c.lineTo(155, 315); c.lineTo(105, 315); c.closePath(); c.fill();
    c.fillRect(126, 272, 3, 28);
    return cv.toDataURL();
  }

  function open(opts) {
    P = { sel: -1, moves: 0, onWin: opts.onWin, onGiveup: opts.onGiveup || function () {}, solved: false };
    var overlay = $('overlay-puzzle');
    overlay.classList.remove('hidden');
    $('pz-moves').textContent = '0';
    renderBoard(null);

    var src = null;
    if (typeof Assets !== 'undefined') src = Assets.url(IMGS[Math.floor(Math.random() * IMGS.length)]);
    var img = new Image();
    img.onload = function () { if (P) build(src); };
    img.onerror = function () { if (P) build(generatedArt()); };
    img.src = src || generatedArt();
    AudioFX.pluck(440, 0.1);
  }

  /* 生成 1-8 打乱的可解排列（用随机交换，必可解） */
  function shuffled() {
    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    do {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
    } while (a.every(function (v, i) { return v === i; }));
    return a;
  }

  function build(src) {
    P.src = src;
    P.tiles = shuffled();
    renderBoard(src);
  }

  function renderBoard(src) {
    var board = $('pz-board');
    board.innerHTML = '';
    if (!src) { board.innerHTML = '<p style="color:var(--ink-faint);padding:40px">机缘凝聚中……</p>'; return; }
    for (var i = 0; i < 9; i++) {
      var tile = document.createElement('div');
      tile.className = 'pz-tile' + (P.sel === i ? ' sel' : '');
      var t = P.tiles[i];
      tile.style.backgroundImage = 'url("' + src + '")';
      tile.style.backgroundPosition = (-(t % 3) * 100) + '% ' + (-Math.floor(t / 3) * 100) + '%';
      tile.setAttribute('data-i', i);
      tile.onclick = function () { pick(parseInt(this.getAttribute('data-i'))); };
      board.appendChild(tile);
    }
  }

  function pick(i) {
    if (!P || P.solved) return;
    if (P.sel < 0) { P.sel = i; renderBoard(P.src); AudioFX.tick(0.05); return; }
    if (P.sel === i) { P.sel = -1; renderBoard(P.src); return; }
    var t = P.tiles[P.sel]; P.tiles[P.sel] = P.tiles[i]; P.tiles[i] = t;
    P.sel = -1;
    P.moves++;
    $('pz-moves').textContent = P.moves;
    AudioFX.flip();
    renderBoard(P.src);
    if (P.tiles.every(function (v, idx) { return v === idx; })) {
      P.solved = true;
      AudioFX.stamp();
      $('pz-board').classList.add('solved');
      setTimeout(function () {
        close();
        P.onWin();
      }, 900);
    }
  }

  function close() {
    $('overlay-puzzle').classList.add('hidden');
    $('pz-board').classList.remove('solved');
  }

  function giveup() {
    if (!P) return;
    close();
    var cb = P.onGiveup; P = null;
    cb();
  }

  return { open: open, giveup: giveup };
})();
