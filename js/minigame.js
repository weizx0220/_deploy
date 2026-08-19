/* 小游戏集合。math=速算2.0(DOM) fu=画符(Canvas) pot=投壶(Canvas) beat=下落音游(Phaser)。
   统一：MiniGame.xxx(function(mult){...})，mult 0.5~2。 */
var MiniGame = (function () {
  function $(id) { return document.getElementById(id); }

  /* 跳过机制：每个游戏开局注册中止函数，点「跳过」按 1 倍结算退出 */
  var abortFn = null;
  function setAbort(fn) { abortFn = fn; }
  function abort() { if (abortFn) { var f = abortFn; abortFn = null; f(); } }
  /* 包装回调：正常结算时注销跳过 */
  function wrapCb(cb) { return function (m) { abortFn = null; cb(m); }; }
  document.addEventListener('DOMContentLoaded', function () {
    var b = $('mini-skip');
    if (b) b.onclick = function () { abort(); };
  });

  /* ================= 速算 2.0：连击 + 限时 + 爆分 ================= */
  function math(cb) {
    cb = wrapCb(cb);
    var qi = 0, correct = 0, combo = 0, maxCombo = 0, timer = null;
    setAbort(function () { clearInterval(timer); $('overlay-mini').classList.add('hidden'); cb(1); });
    function question() {
      var a = 3 + Math.floor(Math.random() * 15), b = 3 + Math.floor(Math.random() * 15);
      var op = ['+', '-', '×'][Math.floor(Math.random() * 3)];
      var ans = op === '+' ? a + b : op === '-' ? a - b : a * b;
      var opts = [ans];
      while (opts.length < 4) {
        var d = ans + Math.floor(Math.random() * 21) - 10;
        if (opts.indexOf(d) < 0) opts.push(d);
      }
      opts.sort(function () { return Math.random() - 0.5; });
      $('mini-title').textContent = '速算挑战';
      $('mini-body').innerHTML =
        '<div class="mg-timer"><div id="mg-timer-fill"></div></div>' +
        '<div class="mg-q">' + a + ' ' + op + ' ' + b + ' = ?</div>' +
        '<div class="mg-progress">第 ' + (qi + 1) + '/6 题 · 连击 <b style="color:var(--cinnabar)">' + combo + '</b></div>' +
        '<div class="mg-opts">' + opts.map(function (o) { return '<button class="ink-btn mg-opt" data-v="' + o + '">' + o + '</button>'; }).join('') + '</div>';
      $('overlay-mini').classList.remove('hidden');
      // 限时 6 秒
      var t0 = Date.now();
      timer = setInterval(function () {
        var left = 1 - (Date.now() - t0) / 6000;
        var fill = $('mg-timer-fill');
        if (!fill) { clearInterval(timer); return; }
        fill.style.width = Math.max(0, left * 100) + '%';
        fill.style.background = left < 0.3 ? 'var(--cinnabar)' : 'var(--jade)';
        if (left <= 0) { clearInterval(timer); answer(null); }
      }, 50);
      var btns = $('mini-body').querySelectorAll('.mg-opt');
      for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () { answer(parseInt(this.getAttribute('data-v')) === ans, this); };
      }
      function answer(ok, el) {
        clearInterval(timer);
        if (ok) { correct++; combo++; maxCombo = Math.max(maxCombo, combo); AudioFX.pluck(520 + combo * 60, 0.12); }
        else { combo = 0; AudioFX.tick(0.08); if (el) el.style.borderColor = 'var(--cinnabar)'; }
        qi++;
        if (qi < 6) question();
        else {
          var mult = correct <= 2 ? 0.8 : correct <= 3 ? 1 : correct <= 4 ? 1.5 : 2;
          $('mini-body').innerHTML = '<div class="mg-q">答对 ' + correct + ' / 6</div>' +
            '<div class="mg-progress">最高连击 ' + maxCombo + ' · ' +
            (correct >= 5 ? '文思如泉涌！' : correct >= 3 ? '小有收获。' : '今日状态不佳……') + '</div>';
          AudioFX[mult >= 1.5 ? 'stamp' : 'tick']();
          setTimeout(function () { $('overlay-mini').classList.add('hidden'); cb(mult); }, 1300);
        }
      }
    }
    question();
  }

  /* ================= 画符（Canvas 描迹） ================= */
  function fu(cb) {
    cb = wrapCb(cb);
    setAbort(function () { MiniCore.close(); cb(1); });
    var path = [], trail = [], drawing = false, TIME = 14, t0 = 0;
    // 生成符箓曲线（三段贝塞尔）
    var pts = [];
    var x = 120, y = 250;
    for (var s = 0; s < 3; s++) {
      var cx = x + 80 + Math.random() * 120, cy = y - 60 - Math.random() * 80;
      var ex = x + 160 + Math.random() * 100, ey = Math.min(300, Math.max(60, y + (Math.random() - 0.5) * 160));
      for (var t = 0; t <= 20; t++) {
        var u = t / 20;
        pts.push({
          x: (1 - u) * (1 - u) * x + 2 * (1 - u) * u * cx + u * u * ex,
          y: (1 - u) * (1 - u) * y + 2 * (1 - u) * u * cy + u * u * ey
        });
      }
      x = ex; y = ey;
    }
    path = pts;

    MiniCore.open({
      title: '凌空画符',
      sub: '按住并沿金色符迹描画，覆盖越全威力越大',
      init: function (api) { t0 = api.t(); },
      onDown: function (p) { drawing = true; trail.push(p); },
      onMove: function (p) { if (drawing) trail.push(p); },
      onUp: function () { drawing = false; },
      update: function (dt, api) {
        var left = TIME - (api.t() - t0);
        api.sub('剩余 ' + Math.max(0, left).toFixed(0) + ' 秒 · 覆盖 ' + coverage() + '%');
        if (left <= 0) finish(api);
      },
      draw: function (ctx, api) {
        // 符迹（目标）
        ctx.strokeStyle = 'rgba(184,134,47,0.5)';
        ctx.lineWidth = 14; ctx.lineCap = 'round';
        ctx.beginPath();
        path.forEach(function (p, i) { i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
        ctx.stroke();
        // 已覆盖标记
        ctx.strokeStyle = 'rgba(61,107,94,0.55)';
        ctx.lineWidth = 15;
        ctx.beginPath();
        var started = false;
        path.forEach(function (p) {
          if (covered(p)) { if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y); }
          else started = false;
        });
        ctx.stroke();
        // 玩家笔迹
        ctx.strokeStyle = '#2a2a2e';
        ctx.lineWidth = 4;
        ctx.beginPath();
        trail.forEach(function (p, i) { i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
        ctx.stroke();
      }
    });

    function covered(p) {
      for (var i = 0; i < trail.length; i += 2) {
        var dx = trail[i].x - p.x, dy = trail[i].y - p.y;
        if (dx * dx + dy * dy < 20 * 20) return true;
      }
      return false;
    }
    function coverage() {
      var c = 0;
      for (var i = 0; i < path.length; i++) if (covered(path[i])) c++;
      return Math.round(c / path.length * 100);
    }
    var done = false;
    function finish(api) {
      if (done) return; done = true;
      var cov = coverage();
      var mult = cov < 40 ? 0.5 : cov < 60 ? 1 : cov < 78 ? 1.5 : 2;
      api.finish('符成 ' + cov + '%', cov >= 78 ? '笔走龙蛇，符箓灵气四溢！' : cov >= 60 ? '符文成型，略有瑕疵。' : '灵气涣散，符未成型……', mult, cb);
    }
  }

  /* ================= 投壶（Canvas 物理） ================= */
  function pot(cb) {
    cb = wrapCb(cb);
    setAbort(function () { MiniCore.close(); cb(1); });
    var throws = 0, hits = 0, power = 0, charging = false, ball = null, POT_X = 480;
    MiniCore.open({
      title: '投壶雅戏',
      sub: '按住蓄力，松手投矢。进壶即中（第 ' + 1 + ' / 3 矢）',
      onDown: function () { if (!ball && throws < 3) charging = true; },
      onUp: function () {
        if (!charging) return;
        charging = false;
        ball = { x: 90, y: 280, vx: 2.2 + power * 4.6, vy: -3.4 - power * 2.6 };
        power = 0;
      },
      update: function (dt, api) {
        if (charging) { power += dt * 0.9; if (power > 1) power = 1; }
        if (ball) {
          ball.vy += 9.8 * dt;
          ball.x += ball.vx * 60 * dt;
          ball.y += ball.vy * 60 * dt;
          // 命中判定：落入壶口
          if (ball.vy > 0 && ball.x > POT_X - 22 && ball.x < POT_X + 22 && ball.y > 238 && ball.y < 258) {
            hits++;
            api.burst(POT_X, 240, '#b8862f', 18);
            api.float('中！', POT_X, 200, '#b8862f');
            AudioFX.stamp();
            ball = null;
            nextThrow(api);
          } else if (ball.y > 320 || ball.x > 620) {
            api.float('偏了', Math.min(ball.x, 580), 280, '#8a8778');
            AudioFX.tick();
            ball = null;
            nextThrow(api);
          }
        }
      },
      draw: function (ctx) {
        // 壶
        ctx.fillStyle = '#55554f';
        ctx.fillRect(POT_X - 26, 250, 52, 60);
        ctx.fillRect(POT_X - 20, 238, 40, 14);
        ctx.fillStyle = '#3a3a3e';
        ctx.fillRect(POT_X - 20, 238, 40, 6);
        // 投掷者（简笔）
        ctx.fillStyle = '#2a2a2e';
        ctx.beginPath(); ctx.moveTo(90, 290); ctx.lineTo(72, 290); ctx.lineTo(90, 250); ctx.lineTo(108, 290); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.arc(90, 242, 9, 0, 7); ctx.fill();
        // 蓄力条
        if (charging) {
          ctx.fillStyle = 'rgba(42,42,46,0.15)';
          ctx.fillRect(140, 300, 200, 12);
          ctx.fillStyle = power > 0.85 ? '#a5281b' : '#3d6b5e';
          ctx.fillRect(140, 300, 200 * power, 12);
        }
        // 球
        if (ball) {
          ctx.fillStyle = '#a5281b';
          ctx.beginPath(); ctx.arc(ball.x, ball.y, 7, 0, 7); ctx.fill();
        }
      }
    });
    function nextThrow(api) {
      throws++;
      if (throws >= 3) {
        var mult = hits === 0 ? 0.5 : hits === 1 ? 1 : hits === 2 ? 1.5 : 2;
        api.finish('三中 ' + hits, hits >= 3 ? '连中三元，满座皆惊！' : hits >= 1 ? '中规中矩。' : '全军覆没……', mult, cb);
      } else {
        api.sub('按住蓄力，松手投矢（第 ' + (throws + 1) + ' / 3 矢 · 已中 ' + hits + '）');
      }
    }
  }

  /* ================= 下落音游（Phaser 引擎） ================= */
  function beat(cb) {
    cb = wrapCb(cb);
    // 先开弹层给反馈（Phaser 1.2MB，弱网加载有延迟）
    $('mini-title').textContent = '律动韶华';
    $('mini-body').innerHTML = '<div style="padding:48px 0;color:var(--ink-faint)">曲谱展开中……</div>';
    $('overlay-mini').classList.remove('hidden');
    setAbort(function () { $('overlay-mini').classList.add('hidden'); cb(1); });
    // Phaser 未加载则动态加载；失败回退提示 1 倍结算
    if (typeof Phaser === 'undefined') {
      var s = document.createElement('script');
      s.src = 'js/vendor/phaser.min.js';
      s.onload = function () { beat(cb); };
      s.onerror = function () { $('overlay-mini').classList.add('hidden'); cb(1); };
      document.head.appendChild(s);
      return;
    }
    var notes = [], score = 0, combo = 0, spawned = 0, TOTAL = 24, ended = false;
    var LANES = 3, LW = 130, TOP = 20, HIT_Y = 270, SPEED = 150;

    $('mini-body').innerHTML = '<div id="phaser-host"></div>' +
      '<div id="mg-sub" style="margin-top:6px;font-size:13px;color:var(--ink-faint)">音符落到金线时点击对应音轨（键盘 1/2/3 亦可）</div>';

    var game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 420, height: 320,
      parent: 'phaser-host',
      backgroundColor: '#f8f3e6',
      scene: {
        create: function () {
          var sc = this;
          sc.laneG = [];
          for (var i = 0; i < LANES; i++) {
            var x = 30 + i * (LW + 10);
            sc.add.rectangle(x + LW / 2, 160, LW, 300, 0xeee5d2).setStrokeStyle(1, 0x8a8778);
            sc.laneG.push(x);
          }
          // 判定线
          sc.add.rectangle(210, HIT_Y, 420 - 20, 4, 0xb8862f);
          sc.hitGfx = sc.add.graphics();
          sc.textCombo = sc.add.text(210, 6, '', { font: 'bold 18px KaiTi, serif', color: '#a5281b' }).setOrigin(0.5, 0);
          // 定时出音符
          sc.time.addEvent({
            delay: 620, repeat: TOTAL - 1,
            callback: function () {
              var lane = Math.floor(Math.random() * LANES);
              var laneX = sc.laneG[lane];
              var note = sc.add.rectangle(laneX + LW / 2, TOP, LW - 26, 16, 0x2a2a2e);
              note.lane = lane;
              notes.push(note);
              spawned++;
            }
          });
          // 输入
          function hit(lane) {
            if (ended) return;
            var best = null, bestD = 999;
            notes.forEach(function (n) {
              if (!n.active || n.lane !== lane) return;
              var d = Math.abs(n.y - HIT_Y);
              if (d < bestD) { bestD = d; best = n; }
            });
            if (best && bestD < 26) {
              var perfect = bestD < 12;
              score += perfect ? 2 : 1;
              combo++;
              sc.textCombo.setText('连击 ' + combo);
              var bi = notes.indexOf(best);   // 击中后必须从队列移除，否则结束条件永不满足
              if (bi >= 0) notes.splice(bi, 1);
              best.destroy();
              AudioFX.pluck([392, 440, 523][lane] * (perfect ? 2 : 1), 0.12);
              sc.hitGfx.fillStyle(perfect ? 0xb8862f : 0x3d6b5e, 0.6);
              sc.hitGfx.fillCircle(sc.laneG[lane] + LW / 2, HIT_Y, perfect ? 22 : 14);
              setTimeout(function () { sc.hitGfx.clear(); }, 120);
            } else {
              combo = 0;
              sc.textCombo.setText('');
              AudioFX.tick(0.06);
            }
          }
          sc.input.on('pointerdown', function (p) {
            for (var i = 0; i < LANES; i++) {
              if (p.x >= sc.laneG[i] && p.x <= sc.laneG[i] + LW) { hit(i); return; }
            }
          });
          sc.input.keyboard.on('keydown', function (e) {
            if (e.key === '1') hit(0); if (e.key === '2') hit(1); if (e.key === '3') hit(2);
          });
          sc.notesRef = notes;
        },
        update: function (time, delta) {
          var dt = delta / 1000;
          var sc = this;
          for (var i = notes.length - 1; i >= 0; i--) {
            var n = notes[i];
            if (!n.active) continue;
            n.y += SPEED * dt;
            if (n.y > 310) {
              n.destroy();
              notes.splice(i, 1);
              combo = 0;
              sc.textCombo && sc.textCombo.setText('');
            }
          }
          if (spawned >= TOTAL && notes.length === 0 && !ended) {
            ended = true;
            var maxScore = TOTAL * 2;
            var ratio = score / maxScore;
            var mult = ratio < 0.3 ? 0.5 : ratio < 0.5 ? 1 : ratio < 0.7 ? 1.5 : 2;
            var fin = function () {
              game.destroy(true);
              $('overlay-mini').classList.add('hidden');
              cb(mult);
            };
            var t = sc.add.text(210, 150, '得分 ' + score + ' / ' + maxScore, { font: 'bold 26px KaiTi, serif', color: '#2a2a2e' }).setOrigin(0.5);
            var t2 = sc.add.text(210, 190, ratio >= 0.7 ? '余音绕梁，三日不绝！' : ratio >= 0.5 ? '曲调尚可。' : '跑调了……', { font: '16px KaiTi, serif', color: '#55554f' }).setOrigin(0.5);
            AudioFX[ratio >= 0.7 ? 'stamp' : 'tick']();
            setTimeout(fin, 1400);
          }
        }
      }
    });
    // 游戏创建后，跳过需连引擎一起销毁
    setAbort(function () { try { game.destroy(true); } catch (e) {} $('overlay-mini').classList.add('hidden'); cb(1); });
  }

  /* 兼容旧接口：节奏健身改用音游 */
  function rhythm(cb) { beat(cb); }

  return { math: math, rhythm: rhythm, fu: fu, pot: pot, beat: beat, _wrap: wrapCb, _abort: setAbort, abort: abort };
})();

/* ================= 追加：打靶 / 垂钓 / 除草（都市小游戏） ================= */
(function () {
  function $(id) { return document.getElementById(id); }

  /* ---------- 打靶场：限时点靶 ---------- */
  function shoot(cb) {
    cb = MiniGame._wrap(cb); MiniGame._abort(function () { MiniCore.close(); cb(1); });
    var targets = [], score = 0, shots = 0, hits = 0, spawnT = 0, TIME = 25, api0 = null;
    MiniCore.open({
      title: '打靶场',
      sub: '靶子一冒头就点！小的快的分高（25 秒）',
      init: function (api) { api0 = api; },
      onDown: function (p) {
        var api = api0;
        shots++; AudioFX.tick(0.08);
        for (var i = targets.length - 1; i >= 0; i--) {
          var t = targets[i];
          var d = Math.hypot(p.x - t.x, p.y - t.y);
          if (d < t.r * t.grow + 8) {
            score += t.score; hits++;
            api.burst(t.x, t.y, '#a5281b', 14);
            api.float('+' + t.score, t.x, t.y, '#a5281b');
            AudioFX.pluck(520 + t.score * 3, 0.1);
            targets.splice(i, 1);
            return;
          }
        }
        api.float('脱靶', p.x, p.y, '#8a8778');
      },
      update: function (dt, api) {
        spawnT -= dt;
        if (spawnT <= 0 && api.t() < TIME - 2) {
          spawnT = 0.65 + Math.random() * 0.5;
          var fast = Math.random() < 0.3;
          var r = 16 + Math.random() * 16;
          targets.push({
            x: 60 + Math.random() * 480, y: 55 + Math.random() * 220, r: r, grow: 0,
            life: fast ? 1.4 : 2.2,
            vx: fast ? (Math.random() < 0.5 ? -70 : 70) : 0,
            score: Math.round(34 - (r - 16) + (fast ? 15 : 0))
          });
        }
        for (var i = targets.length - 1; i >= 0; i--) {
          var t = targets[i];
          t.grow = Math.min(1, t.grow + dt * 5);
          t.life -= dt; t.x += t.vx * dt;
          if (t.life <= 0) { targets.splice(i, 1); api.float('溜了', t.x, t.y, '#8a8778'); }
        }
        if (api.t() >= TIME) {
          var acc = hits / Math.max(1, shots);
          var mult = (score >= 200 && acc >= 0.65) ? 2 : score >= 120 ? 1.5 : score >= 60 ? 1 : 0.5;
          api.finish('命中 ' + hits + ' 靶 · ' + score + ' 分', acc >= 0.65 ? '神枪手，名不虚传！' : '枪法还得练。', mult, cb);
        }
      },
      draw: function (ctx, api) {
        ctx.strokeStyle = 'rgba(42,42,46,0.12)';
        for (var g = 0; g < 5; g++) { ctx.beginPath(); ctx.moveTo(0, 60 + g * 60); ctx.lineTo(600, 60 + g * 60); ctx.stroke(); }
        targets.forEach(function (t) {
          var r = t.r * t.grow;
          if (r < 2) return;
          ctx.beginPath(); ctx.arc(t.x, t.y, r, 0, 7); ctx.fillStyle = '#a5281b'; ctx.fill();
          ctx.beginPath(); ctx.arc(t.x, t.y, r * 0.66, 0, 7); ctx.fillStyle = '#f8f3e6'; ctx.fill();
          ctx.beginPath(); ctx.arc(t.x, t.y, r * 0.33, 0, 7); ctx.fillStyle = '#a5281b'; ctx.fill();
        });
      }
    });
  }

  /* ---------- 河边垂钓：咬钩时机 + 收线张力 ---------- */
  function fish(cb) {
    cb = MiniGame._wrap(cb); MiniGame._abort(function () { MiniCore.close(); cb(1); });
    var phase = 'wait', waitT = 1 + Math.random() * 3, biteT = 0;
    var prog = 0, tension = 0, holding = false, caught = 0, tries = 0, MAXTRY = 4, api0 = null;
    function reset() { phase = 'wait'; waitT = 1 + Math.random() * 3; prog = 0; tension = 0; holding = false; }
    MiniCore.open({
      title: '河边垂钓',
      sub: '浮标猛沉就按住收线，张力条别爆红！（4 次机会）',
      init: function (api) { api0 = api; },
      onDown: function (p) {
        var api = api0;
        if (phase === 'wait') { /* 点早了惊鱼 */ if (waitT > 0.4) { api.float('惊着鱼了……', 300, 150, '#a5281b'); waitT = 1 + Math.random() * 3; } }
        else if (phase === 'bite') { phase = 'reel'; holding = true; AudioFX.pluck(660, 0.1); api.burst(300, 210, '#3d6b5e', 10); }
        else if (phase === 'reel') holding = true;
      },
      onUp: function () { holding = false; },
      update: function (dt, api) {
        if (phase === 'wait') {
          waitT -= dt;
          if (waitT <= 0) { phase = 'bite'; biteT = 0.7; AudioFX.pluck(880, 0.12); }
        } else if (phase === 'bite') {
          biteT -= dt;
          if (biteT <= 0) { api.float('脱钩了……', 300, 150, '#a5281b'); tries++; if (tries >= MAXTRY) return fin(api); reset(); }
        } else if (phase === 'reel') {
          var struggle = Math.sin(api.t() * 6) * 8 + Math.random() * 6;
          if (holding) { prog += dt * 26; tension += dt * (34 + struggle); }
          else { prog -= dt * 6; tension -= dt * 42; }
          tension = Math.max(0, tension);
          if (tension >= 100) { tries++; api.float('线断了！', 300, 150, '#a5281b'); AudioFX.tick(0.1); if (tries >= MAXTRY) return fin(api); reset(); }
          else if (prog >= 100) {
            caught++; tries++;
            api.burst(300, 200, '#3d6b5e', 20);
            api.float('上鱼了！', 300, 140, '#3d6b5e');
            AudioFX.stamp();
            if (tries >= MAXTRY) return fin(api);
            reset();
          }
        }
      },
      draw: function (ctx, api) {
        // 水面
        ctx.fillStyle = 'rgba(61,107,94,0.15)'; ctx.fillRect(0, 200, 600, 140);
        // 浮标
        var by = phase === 'bite' ? 218 : 200 + Math.sin(api.t() * 2) * 3;
        ctx.beginPath(); ctx.arc(300, by, 9, 0, 7);
        ctx.fillStyle = phase === 'bite' ? '#a5281b' : '#d4a94e'; ctx.fill();
        ctx.strokeStyle = '#2a2a2e'; ctx.stroke();
        if (phase === 'bite') {
          ctx.font = 'bold 18px KaiTi,serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#a5281b';
          ctx.fillText('咬钩了！快收线！', 300, 100);
        }
        if (phase === 'reel') {
          // 进度条
          ctx.fillStyle = 'rgba(42,42,46,0.15)'; ctx.fillRect(160, 60, 280, 14);
          ctx.fillStyle = '#3d6b5e'; ctx.fillRect(160, 60, 280 * Math.max(0, prog) / 100, 14);
          // 张力条
          ctx.fillStyle = 'rgba(42,42,46,0.15)'; ctx.fillRect(160, 84, 280, 10);
          ctx.fillStyle = tension > 75 ? '#a5281b' : '#d4a94e';
          ctx.fillRect(160, 84, 280 * tension / 100, 10);
          ctx.font = '12px KaiTi,serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#55554f';
          ctx.fillText('收线', 120, 72); ctx.fillText('张力', 120, 94);
        }
        // 渔获
        ctx.font = '13px KaiTi,serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#55554f';
        ctx.fillText('已钓 ' + caught + ' 条 · 剩 ' + (MAXTRY - tries) + ' 次机会', 16, 24);
      }
    });
    function fin(api) {
      var mult = caught >= 3 ? 2 : caught === 2 ? 1.5 : caught === 1 ? 1 : 0.5;
      api.finish('钓获 ' + caught + ' 条', caught >= 3 ? '连杆爆护，钓圣附体！' : caught >= 1 ? '小有收获。' : '空军了……下次带秘制饵料。', mult, cb);
    }
  }

  /* ---------- 社区除草：拖动割草机除草 ---------- */
  function mow(cb) {
    cb = MiniGame._wrap(cb); MiniGame._abort(function () { MiniCore.close(); cb(1); });
    var tufts = [], cut = 0, spawnT = 0, TIME = 30;
    var mx = 300, my = 170, down = false;
    for (var i = 0; i < 26; i++) tufts.push({ x: 30 + Math.random() * 540, y: 40 + Math.random() * 270, g: 1 });
    MiniCore.open({
      title: '社区除草',
      sub: '按住拖动割草机，把疯长的杂草都剃平（30 秒）',
      onDown: function (p) { down = true; mx = p.x; my = p.y; },
      onMove: function (p) { if (down) { mx = p.x; my = p.y; } },
      onUp: function () { down = false; },
      update: function (dt, api) {
        spawnT -= dt;
        if (spawnT <= 0 && tufts.length < 46) { spawnT = 0.8; tufts.push({ x: 30 + Math.random() * 540, y: 40 + Math.random() * 270, g: 0.2 }); }
        tufts.forEach(function (t) { t.g = Math.min(1, t.g + dt * 0.25); });
        for (var i = tufts.length - 1; i >= 0; i--) {
          var t = tufts[i];
          if (t.g > 0.55 && Math.hypot(mx - t.x, my - t.y) < 30) {
            tufts.splice(i, 1); cut++;
            api.burst(t.x, t.y, '#4a7a3a', 6);
            if (cut % 10 === 0) api.float('已除 ' + cut, 300, 40, '#4a7a3a');
          }
        }
        if (api.t() >= TIME) {
          var mult = cut >= 55 ? 2 : cut >= 40 ? 1.5 : cut >= 22 ? 1 : 0.5;
          api.finish('除草 ' + cut + ' 丛', cut >= 55 ? '草坪像被熨斗烫过！' : cut >= 22 ? '勉强交差。' : '这草除得稀稀拉拉……', mult, cb);
        }
      },
      draw: function (ctx, api) {
        ctx.fillStyle = 'rgba(74,122,58,0.08)'; ctx.fillRect(0, 0, 600, 340);
        tufts.forEach(function (t) {
          ctx.strokeStyle = 'rgba(58,90,44,' + (0.4 + t.g * 0.6) + ')';
          ctx.lineWidth = 2;
          var h = 6 + t.g * 12;
          for (var b = -1; b <= 1; b++) {
            ctx.beginPath();
            ctx.moveTo(t.x + b * 4, t.y);
            ctx.quadraticCurveTo(t.x + b * 5, t.y - h * 0.6, t.x + b * 7, t.y - h);
            ctx.stroke();
          }
        });
        // 割草机
        ctx.fillStyle = '#a5281b'; ctx.fillRect(mx - 16, my - 12, 32, 24);
        ctx.fillStyle = '#2a2a2e'; ctx.fillRect(mx - 10, my - 22, 6, 12);
        ctx.beginPath(); ctx.arc(mx - 9, my + 13, 5, 0, 7); ctx.fillStyle = '#2a2a2e'; ctx.fill();
        ctx.beginPath(); ctx.arc(mx + 9, my + 13, 5, 0, 7); ctx.fill();
        ctx.strokeStyle = 'rgba(42,42,46,0.3)'; ctx.strokeRect(mx - 16, my - 12, 32, 24);
      }
    });
  }

  MiniGame.shoot = shoot;
  MiniGame.fish = fish;
  MiniGame.mow = mow;
})();
