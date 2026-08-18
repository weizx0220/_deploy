/* 音频：优先播放 assets/audio/ 下的真实音频文件；缺文件自动回退到 WebAudio 合成。
   需要的文件清单见 assets/audio/README.md */
var AudioFX = (function () {
  var ctx = null;
  var muted = false;

  var FILE_DIR = 'assets/audio/';
  /* 各键位对应的文件名与回退行为 */
  var SFX_FILES = {
    flip: 'sfx_flip.mp3',      // 翻卡
    stamp: 'sfx_stamp.mp3',    // 盖章/成就
    tick: 'sfx_tick.mp3',      // 点击/木鱼
    doom: 'sfx_doom.mp3',      // 死亡
    thunder: 'sfx_thunder.mp3' // 渡劫雷声
  };
  var BGM_FILES = {
    title: 'bgm_title.mp4',     // 主题曲：悠远
    draw: 'bgm_draw.mp4',       // 抽签：悠远
    life: 'bgm_life.mp4',       // 人生日常：平和
    xiuxian: 'bgm_xiuxian.mp4', // 修仙：仙侠
    novel: 'bgm_novel.mp4',     // 书中界：悬疑/异世
    summary: 'bgm_summary.mp4'  // 总结：舒缓
  };
  var fileBroken = {};   // 文件名 -> true 表示加载失败，之后回退合成

  /* ================= WebAudio 合成（回退用） ================= */
  function ac() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; }
    }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function env(gainNode, t, attack, decay, peak) {
    var g = gainNode.gain;
    g.setValueAtTime(0.0001, t);
    g.exponentialRampToValueAtTime(peak, t + attack);
    g.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  function pluck(freq, vol) {
    if (muted) return;
    var c = ac(); if (!c) return;
    var t = c.currentTime;
    var osc = c.createOscillator();
    var g = c.createGain();
    var f = c.createBiquadFilter();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    f.type = 'lowpass'; f.frequency.setValueAtTime(freq * 4, t);
    f.frequency.exponentialRampToValueAtTime(freq * 1.2, t + 0.8);
    env(g, t, 0.005, 1.1, vol || 0.18);
    osc.connect(f); f.connect(g); g.connect(c.destination);
    osc.start(t); osc.stop(t + 1.3);
  }

  function synthTick(vol) {
    if (muted) return;
    var c = ac(); if (!c) return;
    var t = c.currentTime;
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.08);
    env(g, t, 0.002, 0.12, vol || 0.12);
    osc.connect(g); g.connect(c.destination);
    osc.start(t); osc.stop(t + 0.15);
  }

  function synthStamp() {
    if (muted) return;
    var c = ac(); if (!c) return;
    var t = c.currentTime;
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.18);
    env(g, t, 0.004, 0.3, 0.35);
    osc.connect(g); g.connect(c.destination);
    osc.start(t); osc.stop(t + 0.35);
    var buf = c.createBuffer(1, c.sampleRate * 0.12, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) * 0.25;
    var src = c.createBufferSource(); src.buffer = buf;
    var g2 = c.createGain(); g2.gain.value = 0.2;
    var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900;
    src.connect(f); f.connect(g2); g2.connect(c.destination);
    src.start(t);
  }

  function synthFlip() { pluck(660, 0.08); setTimeout(function () { pluck(990, 0.06); }, 60); }

  function synthDoom() {
    if (muted) return;
    var c = ac(); if (!c) return;
    var t = c.currentTime;
    [220, 174, 146, 110].forEach(function (fq, i) {
      var osc = c.createOscillator(); var g = c.createGain();
      osc.type = 'sine'; osc.frequency.value = fq;
      env(g, t + i * 0.28, 0.02, 0.9, 0.2);
      osc.connect(g); g.connect(c.destination);
      osc.start(t + i * 0.28); osc.stop(t + i * 0.28 + 1);
    });
  }

  function synthThunder() {
    if (muted) return;
    var c = ac(); if (!c) return;
    var t = c.currentTime;
    var buf = c.createBuffer(1, c.sampleRate * 1.2, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.6);
    var src = c.createBufferSource(); src.buffer = buf;
    var f = c.createBiquadFilter(); f.type = 'lowpass';
    f.frequency.setValueAtTime(3000, t);
    f.frequency.exponentialRampToValueAtTime(120, t + 1.1);
    var g = c.createGain(); g.gain.value = 0.5;
    src.connect(f); f.connect(g); g.connect(c.destination);
    src.start(t);
  }

  /* 合成 BGM：五声音阶随机拨弦 */
  var synthBgmTimer = null;
  var PENTA = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3];
  function startSynthBgm() {
    stopSynthBgm();
    synthBgmTimer = setInterval(function () {
      if (muted || Math.random() < 0.35) return;
      var f = PENTA[Math.floor(Math.random() * PENTA.length)];
      pluck(f * (Math.random() < 0.3 ? 0.5 : 1), 0.05);
    }, 2200);
  }
  function stopSynthBgm() { if (synthBgmTimer) { clearInterval(synthBgmTimer); synthBgmTimer = null; } }

  /* ================= 文件播放 ================= */
  function tryPlay(a) {
    var p = a.play();
    if (p && p.catch) p.catch(function () {
      // 自动播放限制：等用户首次交互后补播（不标记为缺失）
      var resume = function () {
        a.play().catch(function () {});
        document.removeEventListener('click', resume);
        document.removeEventListener('keydown', resume);
        document.removeEventListener('touchstart', resume);
      };
      document.addEventListener('click', resume);
      document.addEventListener('keydown', resume);
      document.addEventListener('touchstart', resume);
    });
  }

  /* 各音效最长播放时长（毫秒），超时淡出截断 */
  var SFX_MAXLEN = { flip: 1500, stamp: 1200, tick: 500, doom: 3200, thunder: 2800 };

  function playSfxFile(key, synthFn, synthArg) {
    if (muted) return;
    var file = SFX_FILES[key];
    if (fileBroken[file]) { synthFn(synthArg); return; }
    var a = new Audio(FILE_DIR + file);
    a.volume = 0.5;
    a.addEventListener('error', function () {
      fileBroken[file] = true;
      synthFn(synthArg);   // 本次也用合成补上
    });
    tryPlay(a);
    var max = SFX_MAXLEN[key];
    if (max) setTimeout(function () {
      if (a.paused) return;
      var fade = setInterval(function () {
        a.volume = Math.max(0, a.volume - 0.1);
        if (a.volume <= 0) { clearInterval(fade); a.pause(); }
      }, 40);
    }, max);
  }

  /* ================= BGM 管理 ================= */
  var bgmEl = null, bgmKey = null;

  function bgm(key) {
    if (bgmKey === key) return;
    bgmKey = key;
    stopBgm();
    if (muted) return;
    var file = BGM_FILES[key];
    if (!file || fileBroken[file]) { startSynthBgm(); return; }
    var a = new Audio(FILE_DIR + file);
    a.loop = true;
    a.volume = 0.32;
    a.addEventListener('error', function () {
      fileBroken[file] = true;
      if (bgmKey === key && !muted) startSynthBgm();
    });
    bgmEl = a;
    tryPlay(a);
  }

  function stopBgm() {
    stopSynthBgm();
    if (bgmEl) { bgmEl.pause(); bgmEl = null; }
  }

  /* 战斗时压低 BGM 而非中断，结束后恢复 */
  var ducked = false;
  function duck() { if (bgmEl && !muted) { bgmEl.volume = 0.12; ducked = true; } }
  function unduck() { if (bgmEl && ducked) { bgmEl.volume = 0.32; ducked = false; } }

  /* ================= 对外接口（与旧版兼容） ================= */
  return {
    pluck: pluck,                                   // 合成拨弦（事件出现等，保持轻量）
    tick: function (vol) { playSfxFile('tick', synthTick, vol); },
    stamp: function () { playSfxFile('stamp', synthStamp); },
    flip: function () { playSfxFile('flip', synthFlip); },
    doom: function () { playSfxFile('doom', synthDoom); },
    thunder: function () { playSfxFile('thunder', synthThunder); },
    bgm: bgm,
    startBgm: function () { bgm(bgmKey || 'title'); },   // 兼容旧调用
    stopBgm: stopBgm,
    duck: duck, unduck: unduck,
    toggleMute: function () {
      muted = !muted;
      if (muted) { stopBgm(); }
      else if (bgmKey) { var k = bgmKey; bgmKey = null; bgm(k); }
      return muted;
    },
    get muted() { return muted; }
  };
})();
