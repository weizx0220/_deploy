/* 行动小游戏：速算挑战（学习/谈判）、节奏健身（完美区间点击）。
   统一出口 MiniGame.math(cb) / MiniGame.rhythm(cb)，cb(multiplier 0.5~2) */
var MiniGame = (function () {
  function $(id) { return document.getElementById(id); }

  function open(title, bodyHtml) {
    $('mini-title').textContent = title;
    $('mini-body').innerHTML = bodyHtml;
    $('overlay-mini').classList.remove('hidden');
  }
  function close() { $('overlay-mini').classList.add('hidden'); }

  /* ---------- 速算挑战：5 题，答对越多收益越高 ---------- */
  function math(cb) {
    var qi = 0, correct = 0;
    function question() {
      var a = 3 + Math.floor(Math.random() * 15), b = 3 + Math.floor(Math.random() * 15);
      var ops = ['+', '-', '×'];
      var op = ops[Math.floor(Math.random() * 3)];
      var ans = op === '+' ? a + b : op === '-' ? a - b : a * b;
      var opts = [ans];
      while (opts.length < 4) {
        var d = ans + Math.floor(Math.random() * 21) - 10;
        if (opts.indexOf(d) < 0 && d !== ans) opts.push(d);
      }
      opts.sort(function () { return Math.random() - 0.5; });
      open('速算挑战', '<div class="mg-q">' + a + ' ' + op + ' ' + b + ' = ?</div>' +
        '<div class="mg-progress">第 ' + (qi + 1) + ' / 5 题　已答对 ' + correct + '</div>' +
        '<div class="mg-opts">' + opts.map(function (o) { return '<button class="ink-btn mg-opt" data-v="' + o + '">' + o + '</button>'; }).join('') + '</div>');
      var btns = $('mini-body').querySelectorAll('.mg-opt');
      for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
          if (parseInt(this.getAttribute('data-v')) === ans) { correct++; AudioFX.tick(); }
          else AudioFX.tick(0.06);
          qi++;
          if (qi < 5) question();
          else done();
        };
      }
    }
    function done() {
      var mult = [0.5, 1, 1, 1.5, 1.5, 2][correct];
      open('速算挑战', '<div class="mg-q">答对 ' + correct + ' / 5</div>' +
        '<div class="mg-progress">' + (correct >= 4 ? '文思如泉涌！' : correct >= 2 ? '小有收获。' : '今日状态不佳……') + '</div>');
      AudioFX[correct >= 4 ? 'stamp' : 'tick']();
      setTimeout(function () { close(); cb(mult); }, 1200);
    }
    question();
  }

  /* ---------- 节奏健身：指针进入绿色区间点击，5 次 ---------- */
  function rhythm(cb) {
    var round = 0, hits = 0, timer = null;
    function turn() {
      open('节奏健身', '<div class="mg-progress">第 ' + (round + 1) + ' / 5 次 · 指针进入<b style="color:var(--jade)">绿色区间</b>时点「发力」</div>' +
        '<div class="mg-bar"><div class="mg-zone"></div><div class="mg-cursor" id="mg-cursor"></div></div>' +
        '<button class="ink-btn primary" id="mg-hit" style="margin-top:14px">发力！</button>');
      var pos = 0, dir = 1;
      var speed = 1.6 + round * 0.35;   // 每轮更快
      var cursor = $('mg-cursor');
      timer = setInterval(function () {
        pos += dir * speed;
        if (pos >= 100) { pos = 100; dir = -1; }
        if (pos <= 0) { pos = 0; dir = 1; }
        cursor.style.left = pos + '%';
      }, 30);
      $('mg-hit').onclick = function () {
        clearInterval(timer);
        var inZone = pos >= 42 && pos <= 58;
        if (inZone) { hits++; AudioFX.stamp(); } else AudioFX.tick();
        cursor.style.background = inZone ? 'var(--jade)' : 'var(--cinnabar)';
        round++;
        setTimeout(function () { if (round < 5) turn(); else done(); }, 500);
      };
    }
    function done() {
      var mult = [0.5, 1, 1, 1.5, 1.5, 2][hits];
      open('节奏健身', '<div class="mg-q">完美发力 ' + hits + ' / 5</div>' +
        '<div class="mg-progress">' + (hits >= 4 ? '这一组，练到位了！' : hits >= 2 ? '汗没白流。' : '今天划水了……') + '</div>');
      setTimeout(function () { close(); cb(mult); }, 1200);
    }
    turn();
  }

  return { math: math, rhythm: rhythm };
})();
