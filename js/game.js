/* 游戏主状态机：开场 → 抽签 → 分配 → 人生 → 结算 → 轮回 */
(function () {
  var $ = UI.$;

  /* ---------- 全局状态 ---------- */
  var G = {
    phase: 'title',
    drawBatch: [],       // 本轮抽到的10个天赋
    picked: [],          // 已选天赋
    redraws: 1,
    alloc: null,         // 分配中的属性
    allocPoints: 0,
    life: null,
    auto: false,
    autoTimer: null,
    waiting: false       // 等待选项
  };

  var SURNAMES = '王李张刘陈杨黄赵周吴徐孙马朱胡郭何林罗高郑梁谢宋唐许韩冯邓曹彭';
  var GIVEN_M = ['伟', '强', '磊', '军', '洋', '志远', '子轩', '浩然', '明哲', '思远', '乘风', '惊鸿'];
  var GIVEN_F = ['芳', '娜', '敏', '静', '丽', '雨桐', '欣怡', '诗涵', '若曦', '清婉', '疏影', '惊鸿'];

  function randomName(gender) {
    var s = SURNAMES[Engine.rnd(SURNAMES.length)];
    var pool = gender === 'M' ? GIVEN_M : GIVEN_F;
    return s + pool[Engine.rnd(pool.length)];
  }

  /* 轮回殿增益是否已持有 */
  function hasExtra(id) {
    var ex = Save.data.legacy.extras;
    return !!ex && ex.indexOf(id) >= 0;
  }

  /* ============ 抽签 ============ */
  var RARITY_W = [100, 38, 13, 3.5];   // 普通/稀有/史诗/传说
  var RARITY_NAMES = ['凡品', '良品', '上品', '天品'];

  function talentPool() {
    return TALENTS.filter(function (t) {
      if (!t.unlock) return true;
      return Save.data.legacy.unlocks.indexOf(t.unlock) >= 0;
    });
  }

  function rollTen() {
    var pool = talentPool();
    var batch = [], usedIds = {}, usedGroups = {};
    var guard = 0;
    while (batch.length < 10 && guard++ < 500) {
      var total = 0, i;
      for (i = 0; i < pool.length; i++) total += RARITY_W[pool[i].rarity];
      var roll = Math.random() * total, pick = pool[0];
      for (i = 0; i < pool.length; i++) {
        roll -= RARITY_W[pool[i].rarity];
        if (roll <= 0) { pick = pool[i]; break; }
      }
      if (usedIds[pick.id]) continue;
      if (pick.exclusive && usedGroups[pick.exclusive]) continue;
      usedIds[pick.id] = true;
      if (pick.exclusive) usedGroups[pick.exclusive] = true;
      batch.push(pick);
    }
    return batch;
  }

  function startDraw() {
    G.phase = 'draw';
    G.picked = [];
    G.redraws = 1 + (hasExtra('redraw1') ? 1 : 0) + (hasExtra('redraw2') ? 1 : 0);
    G.drawBatch = rollTen();
    $('draw-slots').textContent = Save.data.legacy.talentSlots;
    renderDraw();
    UI.showScreen('draw');
    AudioFX.bgm('draw');
  }

  function renderDraw() {
    var grid = $('draw-grid');
    grid.innerHTML = '';
    var slots = Save.data.legacy.talentSlots;
    G.drawBatch.forEach(function (t, idx) {
      var card = document.createElement('div');
      card.className = 'tcard r' + t.rarity;
      card.innerHTML =
        '<div class="tcard-inner">' +
        '<div class="tcard-face tcard-back"></div>' +
        '<div class="tcard-face tcard-front">' +
        '<div class="tname">' + t.name + '</div>' +
        '<div class="tdesc">' + t.desc + '</div>' +
        '<div class="trarity">' + RARITY_NAMES[t.rarity] + '</div>' +
        '</div></div>';
      grid.appendChild(card);
      // 依次翻卡
      setTimeout(function () { card.classList.add('flipped'); AudioFX.flip(); }, 200 + idx * 120);
      card.onclick = function () {
        var pi = G.picked.indexOf(t);
        if (pi >= 0) { G.picked.splice(pi, 1); card.classList.remove('selected'); }
        else {
          if (G.picked.length >= slots) return;
          // 互斥校验
          if (t.exclusive) {
            for (var i = 0; i < G.picked.length; i++) {
              if (G.picked[i].exclusive === t.exclusive) {
                UI.sealToast('命数相冲', '「' + G.picked[i].name + '」与「' + t.name + '」不可兼得');
                return;
              }
            }
          }
          G.picked.push(t); card.classList.add('selected');
        }
        AudioFX.tick();
        $('btn-draw-ok').disabled = G.picked.length !== slots;
        var full = G.picked.length >= slots;
        var cards = grid.children;
        for (var c = 0; c < cards.length; c++) {
          var isSel = cards[c].classList.contains('selected');
          cards[c].classList.toggle('dim', full && !isSel);
        }
      };
    });
    $('btn-draw-ok').disabled = true;
    $('redraw-count').textContent = G.redraws;
    $('btn-redraw').disabled = G.redraws <= 0;
  }

  /* ============ 属性分配 ============ */
  var ALLOC_KEYS = ['chr', 'int', 'str', 'mny', 'spr'];

  function startAlloc() {
    G.phase = 'alloc';
    G.allocPoints = 20 + Save.data.legacy.attrBonus;
    G.alloc = { chr: 0, int: 0, str: 0, mny: 0, spr: 0 };
    G.genderPick = null;
    // 轮回殿解锁的身份自定义
    var nameInput = $('alloc-name'), genderBox = $('alloc-gender');
    nameInput.classList.toggle('hidden', !hasExtra('self_name'));
    nameInput.value = '';
    genderBox.classList.toggle('hidden', !hasExtra('gender_pick'));
    var gbs = genderBox.querySelectorAll('button');
    for (var i = 0; i < gbs.length; i++) gbs[i].classList.remove('selected');
    renderAlloc();
    UI.showScreen('alloc');
  }

  function allocUsed() {
    var s = 0; ALLOC_KEYS.forEach(function (k) { s += G.alloc[k]; }); return s;
  }

  function renderAlloc() {
    $('alloc-points').textContent = G.allocPoints - allocUsed();
    var panel = $('alloc-panel');
    panel.innerHTML = '';
    ALLOC_KEYS.forEach(function (k) {
      var row = document.createElement('div');
      row.className = 'alloc-row';
      row.innerHTML =
        '<div class="alloc-name">' + Engine.ATTR_NAMES[k] + '</div>' +
        '<button class="alloc-pm" data-k="' + k + '" data-d="-1">−</button>' +
        '<div class="alloc-bar"><div class="alloc-fill" style="width:' + (G.alloc[k] * 10) + '%"></div></div>' +
        '<div class="alloc-val">' + G.alloc[k] + '</div>' +
        '<button class="alloc-pm" data-k="' + k + '" data-d="1">＋</button>';
      panel.appendChild(row);
    });
    var btns = panel.querySelectorAll('.alloc-pm');
    for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = function () {
        var k = this.getAttribute('data-k'), d = parseInt(this.getAttribute('data-d'));
        if (d > 0 && (allocUsed() >= G.allocPoints || G.alloc[k] >= 10)) return;
        if (d < 0 && G.alloc[k] <= 0) return;
        G.alloc[k] += d;
        AudioFX.tick(0.08);
        renderAlloc();
      };
    }
    // 天赋 chips
    var chips = '';
    G.picked.forEach(function (t) { chips += '<span class="chip r' + t.rarity + '">' + t.name + '</span>'; });
    $('alloc-talents').innerHTML = chips;
    // 雷达（含天赋加成预览）
    UI.drawRadar($('alloc-radar'), previewAttr());
    $('btn-alloc-ok').disabled = allocUsed() > G.allocPoints;
  }

  function previewAttr() {
    var a = {};
    ALLOC_KEYS.forEach(function (k) { a[k] = G.alloc[k]; });
    a.luk = 0;
    G.picked.forEach(function (t) {
      if (t.attr) for (var k in t.attr) a[k] = (a[k] || 0) + t.attr[k];
    });
    return a;
  }

  /* ============ 人生 ============ */
  function newLife() {
    var gender = G.genderPick || (Math.random() < 0.5 ? 'M' : 'F');
    var attr = previewAttr();
    attr.luk = Engine.rnd(11);   // 气运天定 0-10
    G.picked.forEach(function (t) { if (t.attr && t.attr.luk) attr.luk = Math.max(0, attr.luk); });
    // 轮回殿出生加成
    if (hasExtra('luk3')) attr.luk += 3;
    if (hasExtra('str2')) attr.str += 2;
    if (hasExtra('int2')) attr.int += 2;
    if (hasExtra('mny2')) attr.mny += 2;
    var flags = {};
    G.picked.forEach(function (t) { if (t.flags) t.flags.forEach(function (f) { flags[f] = true; }); });
    var customName = hasExtra('self_name') ? $('alloc-name').value.trim() : '';
    G.life = {
      name: customName || randomName(gender),
      gender: gender,
      age: -1,
      attr: attr,
      talents: G.picked.slice(),
      flags: flags,
      fired: {},
      pool: 'life',
      route: '',
      history: [],
      moments: [],
      dead: false,
      deathText: ''
    };
    G.phase = 'life';
    UI.showScreen('life');
    AudioFX.bgm('life');
    $('life-timeline').innerHTML = '';
    $('life-route').textContent = '';
    updateScene.current = null;
    renderSide();
    addTimeline('<div class="event-card fate">乾道成男，坤道成女。你名唤 <b>' + G.life.name + '</b>，' +
      (gender === 'M' ? '是个男孩' : '是个女孩') + '，带着 ' + G.picked.length + ' 道天命落入人间。</div>');
    snapshot();
  }

  var ROUTE_NAMES = {
    xiuxian: '仙途', novel: '书中界', cthulhu: '诡秘', hunxiu: '魂修',
    biz: '商途', star: '星途'
  };

  /* 根据人生状态选场景插画 */
  function sceneFor(L) {
    if (L.flags['ascended']) return 'xx_ascend.png';
    if (L.flags['cthulhu_vessel']) return 'end_cthulhu.png';
    if (L.pool && L.pool.indexOf('novel_') === 0) return L.pool + '.png';
    if (L.flags['leijie_guo'] ||
        (L.flags['wx_jin'] && L.flags['wx_mu'] && L.flags['wx_shui'] && L.flags['wx_huo'] && L.flags['wx_tu'] && L.flags['benyuan']))
      return 'xx_tribulation.png';
    if (L.flags['box_opened']) return 'xx_cultivate.png';
    if (L.flags['hunxiu']) return 'hidden_hunxiu.png';
    if (L.flags['cthulhu_touched']) return 'hidden_cthulhu.png';
    if (L.flags['superstar'] || L.flags['star_road']) return 'hidden_star.png';
    if (L.flags['biz_empire'] || L.flags['biz_road']) return 'hidden_biz.png';
    if (L.age < 7) return 'stage_birth.png';
    if (L.age < 26) return 'stage_youth.png';
    if (L.age < 56) return 'stage_midlife.png';
    return 'stage_old.png';
  }

  function updateScene() {
    // 按路线切换 BGM
    var L0 = G.life;
    var bk = 'life';
    if (L0.pool && L0.pool.indexOf('novel_') === 0) bk = 'novel';
    else if (L0.flags['box_opened'] || L0.route === 'xiuxian') bk = 'xiuxian';
    AudioFX.bgm(bk);
    if (typeof Assets === 'undefined') return;
    var name = sceneFor(G.life);
    if (name === updateScene.current) return;
    var u = Assets.url(name);
    var box = $('life-scene'), img = $('life-scene-img');
    if (!u) { box.classList.add('hidden'); return; }
    updateScene.current = name;
    img.classList.remove('on');
    img.onload = function () { img.classList.add('on'); };
    img.onerror = function () { box.classList.add('hidden'); };
    img.src = u;
    box.classList.remove('hidden');
  }
  updateScene.current = null;

  function renderSide() {
    var L = G.life;
    $('life-age-big').textContent = Math.max(0, L.age);
    $('life-route').textContent = ROUTE_NAMES[L.route] || '';
    updateScene();
    UI.drawRadar($('life-radar'), L.attr);
    var html = '';
    Engine.ATTR_KEYS.forEach(function (k) {
      if (k === 'luk' && !L.flags['luck_revealed']) return;   // 气运默认隐藏
      html += '<div class="life-attr-row"><span>' + Engine.ATTR_NAMES[k] + '</span><span>' + (L.attr[k] || 0) + '</span></div>';
    });
    $('life-attrs').innerHTML = html;
    var chips = '';
    L.talents.forEach(function (t) { chips += '<span class="chip r' + t.rarity + '">' + t.name + '</span>'; });
    $('life-talents').innerHTML = chips;
  }

  function addTimeline(html) {
    var tl = $('life-timeline');
    var div = document.createElement('div');
    div.innerHTML = html;
    var node = div.firstChild;
    tl.appendChild(node);
    tl.scrollTop = tl.scrollHeight;
    return node;
  }

  function snapshot() {
    var L = G.life;
    L.history.push({ age: Math.max(0, L.age), attr: JSON.parse(JSON.stringify(L.attr)) });
  }

  function deltaHtml(deltas) {
    var parts = Engine.describeDeltas(deltas);
    if (!parts.length) return '';
    var s = parts.map(function (p) {
      return '<span class="' + (p.up ? 'up' : 'down') + '">' + p.name + (p.up ? '+' : '') + p.value + '</span>';
    }).join('　');
    return '<div class="ev-delta">' + s + '</div>';
  }

  function floatDeltas(deltas) {
    var parts = Engine.describeDeltas(deltas);
    parts.forEach(function (p, i) {
      setTimeout(function () { UI.floatText(p.name + (p.up ? '+' : '') + p.value, p.up); }, i * 120);
    });
  }

  function eventText(ev) {
    return typeof ev.text === 'function' ? ev.text(G.life) : ev.text;
  }

  function resultText(r) {
    return typeof r === 'function' ? r(G.life) : (r || '');
  }

  /* 突发事件卡牌包装 */
  function cardOpen(ev, kind) {
    if (ev.sudden) return '<div class="event-card sudden"><span class="sudden-tag">突发</span>';
    return '<div class="event-card ' + (kind || 'normal') + '">';
  }

  /* 触发一个事件，返回 'ok' | 'waiting' | 'dead' */
  function fireEvent(ev) {
    var L = G.life;
    L.fired[ev.id] = L.age;
    if (/dujie/.test(ev.id)) AudioFX.thunder();

    if (ev.choices && ev.choices.length) {
      addTimeline(cardOpen(ev, 'fate') + eventText(ev) + '</div>');
      presentChoices(ev);
      return 'waiting';
    }

    var res = Engine.applyEffect(L, ev.effect);
    addTimeline(cardOpen(ev, ev.kind) + eventText(ev) + deltaHtml(res.deltas) + '</div>');
    floatDeltas(res.deltas);
    if (ev.big) L.moments.push({ age: L.age, text: eventText(ev) });
    AudioFX.pluck(300 + Math.random() * 300, 0.06);

    if (res.killed) { L.deathText = res.deathText || eventText(ev); finishLife(); return 'dead'; }
    return 'ok';
  }

  function suddenRate() {
    return hasExtra('sudden_up') ? 0.26 : 0.13;
  }

  /* 推进一年 */
  function advanceYear() {
    var L = G.life;
    if (!L || L.dead || G.waiting) return;

    L.age++;
    if (L.age > 0) addTimeline('<div class="age-marker">' + L.age + ' 岁</div>');

    // 自然死亡
    if (L.age > 0 && Engine.mortality(L)) {
      L.deathText = '岁月不饶人。' + L.age + ' 岁那年，你安详地合上了眼。';
      return finishLife();
    }

    var ev = Engine.pickEvent(L);
    if (!ev) {
      addTimeline('<div class="event-card">平平淡淡的一年，如白水入茶。</div>');
    } else {
      var r = fireEvent(ev);
      if (r !== 'ok') return;   // waiting 或 dead
    }

    // 突发事件掷骰
    if (Math.random() < suddenRate()) {
      var sev = Engine.pickSudden(L);
      if (sev) {
        var r2 = fireEvent(sev);
        if (r2 !== 'ok') return;
      }
    }
    afterYear();
  }

  function presentChoices(ev) {
    G.waiting = true;
    var box = $('choice-box');
    $('choice-text').textContent = '你将如何抉择？';
    var wrap = $('choice-options');
    wrap.innerHTML = '';
    var L = G.life;
    ev.choices.forEach(function (ch) {
      var btn = document.createElement('button');
      btn.className = 'choice-opt';
      btn.textContent = ch.text;
      if (ch.cond && !Engine.condPass(ch.cond, L)) {
        btn.disabled = true;
        btn.textContent += '（机缘未至）';
      }
      btn.onclick = function () {
        box.classList.add('hidden');
        G.waiting = false;
        var res = Engine.applyEffect(L, ch.effect);
        var txt = resultText(ch.result);
        if (txt || Engine.describeDeltas(res.deltas).length) {
          addTimeline('<div class="event-card ' + (ch.kind || 'normal') + '">' + txt + deltaHtml(res.deltas) + '</div>');
          floatDeltas(res.deltas);
        }
        if (ch.big !== false) L.moments.push({ age: L.age, text: eventText(ev) + '——你选择了「' + ch.text + '」' });
        AudioFX.tick();
        if (res.killed) { L.deathText = res.deathText || txt; return finishLife(); }
        afterYear();
      };
      wrap.appendChild(btn);
    });
    // 选项框插入时间轴末尾（跟在事件卡后面），并滚动到可视位置
    var tl = $('life-timeline');
    tl.appendChild(box);
    box.classList.remove('hidden');
    tl.scrollTop = tl.scrollHeight;
    AudioFX.pluck(520, 0.1);
  }

  function afterYear() {
    var L = G.life;
    // 体质耗尽死亡
    var bodyDeath = Engine.checkBodyDeath(L);
    if (bodyDeath) { L.deathText = bodyDeath; return finishLife(); }
    // 修仙寿元：pool 为 xiuxian 时不受 130 岁硬顶（mortality 已按 immortal_body 豁免）
    renderSide();
    snapshot();
    checkAchievements('life');
    if (L.age >= 500) {  // 绝对上限，防死循环
      L.deathText = '你已走到此世尽头。';
      return finishLife();
    }
  }

  /* ============ 结算 ============ */
  var GRADE_BONUS = { 'SSS': 40, 'SS': 30, 'S': 22, 'A': 14, 'B': 9, 'C': 5, 'D': 3, 'F': 1 };

  function pickEnding() {
    var L = G.life;
    var best = null;
    ENDINGS.forEach(function (e) {
      if (e.cond && !Engine.condPass(e.cond, L)) return;
      if (!best || (e.priority || 0) > (best.priority || 0)) best = e;
    });
    return best;
  }

  function finishLife() {
    var L = G.life;
    L.dead = true;
    stopAuto();
    AudioFX.doom();
    AudioFX.bgm('summary');

    addTimeline('<div class="event-card bad">' + (L.deathText || '一生就此落幕。') + '</div>');

    var ending = pickEnding();
    var isNewEnding = ending ? Save.addEnding(ending.id) : false;

    // 轮回点
    var grade = ending ? (ending.grade || 'C') : 'C';
    var reward = Math.floor(Math.max(0, L.age) / 12) + (GRADE_BONUS[grade] || 3);
    Save.addLegacyPoints(reward);
    Save.data.stats.lives++;
    if (L.age > Save.data.stats.maxAge) Save.data.stats.maxAge = L.age;
    Save.save();

    checkAchievements('end');

    // 总结界面
    setTimeout(function () {
      renderSummary(ending, grade, reward, isNewEnding);
      UI.showScreen('summary');
    }, 1200);
  }

  /* 结局插画映射 */
  var ENDING_ART = {
    ed_ascend: 'xx_ascend.png', ed_bingjie: 'xx_bingjie.png',
    ed_cthulhu: 'end_cthulhu.png', ed_hunxiu: 'hidden_hunxiu.png',
    ed_biz_empire: 'end_rich.png', ed_rich: 'end_rich.png',
    ed_superstar: 'end_superstar.png', ed_biz_bankrupt: 'end_bankrupt.png',
    ed_wuxia_win: 'novel_wuxia.png', ed_wuxian_win: 'novel_wuxian.png',
    ed_bazong_win: 'novel_bazong.png', ed_moshi_win: 'novel_moshi.png',
    ed_old_age: 'end_family.png', ed_four_gen: 'end_family.png',
    ed_lonely: 'end_lonely.png', ed_gloomy: 'end_gloomy.png',
    ed_guoshi: 'end_scholar.png', ed_literati: 'end_scholar.png'
  };

  function renderSummary(ending, grade, reward, isNewEnding) {
    var L = G.life;
    // 结局插画：优先按结局 id，其次按书中界 flag，最后按享年阶段
    var art = $('summary-art');
    var artFile = ending ? ENDING_ART[ending.id] : null;
    if (!artFile) {
      if (L.flags['ascended']) artFile = 'xx_ascend.png';
      else if (L.flags['tribulation_failed']) artFile = 'xx_bingjie.png';
      else if (L.flags['world_wuxia']) artFile = 'novel_wuxia.png';
      else if (L.flags['world_wuxian']) artFile = 'novel_wuxian.png';
      else if (L.flags['world_bazong']) artFile = 'novel_bazong.png';
      else if (L.flags['world_moshi']) artFile = 'novel_moshi.png';
      else if (L.flags['box_opened']) artFile = 'xx_cultivate.png';
      else artFile = sceneFor(L);
    }
    if (typeof Assets !== 'undefined' && artFile) {
      var au = Assets.url(artFile);
      if (au) {
        art.onerror = function () { art.classList.add('hidden'); };
        art.src = au;
        art.classList.remove('hidden');
      } else art.classList.add('hidden');
    } else art.classList.add('hidden');
    $('summary-seal').textContent = grade;
    $('summary-grade').textContent = '享年 ' + Math.max(0, L.age) + ' 岁 · ' + (L.gender === 'M' ? '乾' : '坤');
    $('summary-verdict').textContent = ending ? ending.verdict : '一生如水，无波无澜。';
    $('summary-ending').textContent = ending ? ('结局 · ' + ending.name + (isNewEnding ? '（新）' : '')) : '';
    $('summary-reward').textContent = '轮回点 +' + reward;
    UI.drawCurve($('summary-curve'), L.history);
    var mh = '', seenTexts = {};
    L.moments.forEach(function (m) {   // 去重：同一文本只留第一次
      if (seenTexts[m.text]) return;
      seenTexts[m.text] = true;
      mh += '<div class="moment"><b>' + m.age + '岁</b>' + m.text + '</div>';
    });
    $('summary-moments').innerHTML = mh || '<div class="moment">此生平平，无甚可书。</div>';
  }

  /* ============ 成就 ============ */
  function checkAchievements(when) {
    ACHIEVEMENTS.forEach(function (a) {
      if (a.when !== when) return;
      if (Save.data.achievements.indexOf(a.id) >= 0) return;
      var hit = false;
      try { hit = a.check(G.life, Save.data); } catch (e) { /* 数据异常不阻塞游戏 */ }
      if (hit && Save.addAchievement(a.id)) {
        UI.sealToast('功业 · ' + a.name, a.desc);
      }
    });
  }

  /* ============ 自动播放 ============ */
  function stopAuto() {
    G.auto = false;
    if (G.autoTimer) { clearInterval(G.autoTimer); G.autoTimer = null; }
    $('btn-auto').textContent = '自动 ▸';
  }

  function toggleAuto() {
    if (G.auto) { stopAuto(); return; }
    G.auto = true;
    $('btn-auto').textContent = '暂停 ⏸';
    var speed = parseInt($('auto-speed').value);
    G.autoTimer = setInterval(function () {
      if (!G.auto || G.waiting || !G.life || G.life.dead) return;
      advanceYear();
    }, speed);
  }

  /* ============ 绑定 ============ */
  function bind() {
    $('btn-start').onclick = function () { AudioFX.tick(); startDraw(); };
    $('btn-redraw').onclick = function () {
      if (G.redraws <= 0) return;
      G.redraws--; G.picked = [];
      G.drawBatch = rollTen();
      AudioFX.pluck(440, 0.1);
      renderDraw();
    };
    $('btn-draw-ok').onclick = function () { AudioFX.stamp(); startAlloc(); };
    $('btn-random-alloc').onclick = function () {
      ALLOC_KEYS.forEach(function (k) { G.alloc[k] = 0; });
      var p = G.allocPoints;
      while (p > 0) {
        var k = ALLOC_KEYS[Engine.rnd(ALLOC_KEYS.length)];
        if (G.alloc[k] < 10) { G.alloc[k]++; p--; }
      }
      AudioFX.flip();
      renderAlloc();
    };
    $('btn-alloc-ok').onclick = function () { AudioFX.stamp(); newLife(); };
    // 性别自选（轮回殿解锁）
    (function () {
      var gbs = $('alloc-gender').querySelectorAll('button');
      for (var i = 0; i < gbs.length; i++) {
        gbs[i].onclick = function () {
          for (var j = 0; j < gbs.length; j++) gbs[j].classList.remove('selected');
          this.classList.add('selected');
          G.genderPick = this.getAttribute('data-g');
          AudioFX.tick(0.06);
        };
      }
    })();
    $('btn-next').onclick = function () { if (!G.waiting) advanceYear(); };
    $('btn-auto').onclick = toggleAuto;
    $('auto-speed').onchange = function () {
      if (G.auto) { stopAuto(); toggleAuto(); }
    };
    $('btn-again').onclick = function () { AudioFX.tick(); startDraw(); };
    $('btn-home').onclick = function () { AudioFX.tick(); showTitle(); };
    $('btn-mute').onclick = function () {
      var m = AudioFX.toggleMute();
      this.textContent = m ? '✕' : '♪';
    };
    $('btn-gallery').onclick = function () {
      UI.renderGallery('endings');
      $('overlay-gallery').classList.remove('hidden');
    };
    $('btn-legacy').onclick = function () {
      UI.renderLegacy();
      $('overlay-legacy').classList.remove('hidden');
    };
    // 轮回者档案
    $('btn-profile').onclick = function () {
      renderProfiles();
      $('overlay-profile').classList.remove('hidden');
    };
    $('btn-profile-new').onclick = function () {
      Save.createProfile($('profile-name').value);
      afterProfileChange();
    };
    // 弹层关闭
    var closes = document.querySelectorAll('.overlay-close');
    for (var i = 0; i < closes.length; i++) {
      closes[i].onclick = function () {
        $(this.getAttribute('data-close')).classList.add('hidden');
      };
    }
    // 图鉴页签
    var tabs = document.querySelectorAll('.tab');
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].onclick = function () {
        for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove('active');
        this.classList.add('active');
        UI.renderGallery(this.getAttribute('data-tab'));
        AudioFX.tick(0.06);
      };
    }
    // 键盘：空格/回车 推进
    document.addEventListener('keydown', function (e) {
      if (G.phase === 'life' && (e.code === 'Space' || e.code === 'Enter') && !G.waiting) {
        e.preventDefault();
        advanceYear();
      }
    });
  }

  /* ============ 轮回者档案 ============ */
  function refreshProfileLabel() {
    $('btn-profile').textContent = Save.currentProfileName();
  }

  function afterProfileChange() {
    stopAuto();
    G.life = null;
    G.phase = 'title';
    $('overlay-profile').classList.add('hidden');
    refreshProfileLabel();
    showTitle();
  }

  function renderProfiles() {
    var list = Save.listProfiles();
    var html = '';
    list.forEach(function (p) {
      html += '<div class="legacy-item"><div class="l-name">' + p.name +
        (p.current ? ' <span style="color:var(--cinnabar);font-size:13px">· 当前</span>' : '') +
        '</div><div>' +
        (p.current
          ? ''
          : '<button class="ink-btn small" data-switch="' + p.id + '">切换</button> ') +
        (list.length > 1
          ? '<button class="ink-btn small" data-del="' + p.id + '" style="border-color:var(--cinnabar);color:var(--cinnabar)">删除</button>'
          : '') +
        '</div></div>';
    });
    $('profile-list').innerHTML = html;
    var sw = $('profile-list').querySelectorAll('[data-switch]');
    for (var i = 0; i < sw.length; i++) {
      sw[i].onclick = function () {
        Save.switchProfile(this.getAttribute('data-switch'));
        afterProfileChange();
      };
    }
    var del = $('profile-list').querySelectorAll('[data-del]');
    for (var j = 0; j < del.length; j++) {
      del[j].onclick = function () {
        var id = this.getAttribute('data-del');
        var ps = Save.listProfiles();
        var name = '';
        for (var k = 0; k < ps.length; k++) if (ps[k].id === id) name = ps[k].name;
        if (confirm('确定删除轮回者「' + name + '」的存档？此不可挽回。')) {
          Save.deleteProfile(id);
          refreshProfileLabel();
          renderProfiles();
          showTitle();
        }
      };
    }
  }

  function showTitle() {
    var s = Save.data.stats;
    refreshProfileLabel();
    $('title-stats').textContent = s.lives > 0
      ? '已历 ' + s.lives + ' 世 · 最长寿 ' + s.maxAge + ' 岁 · 结局 ' + Save.data.endings.length + '/' + ENDINGS.length
      : '前尘未染，此为第一世';
    UI.showScreen('title');
    AudioFX.bgm('title');
    // 角落水墨小品装饰（缺图自动不出现）
    if (typeof Assets !== 'undefined') {
      var sc = $('screen-title');
      if (!sc.querySelector('.corner-art')) {
        [['extra_plum.png', 'bl'], ['extra_crane.png', 'tr']].forEach(function (pair) {
          var u = Assets.url(pair[0]);
          if (!u) return;
          var img = document.createElement('img');
          img.className = 'corner-art ' + pair[1];
          img.alt = '';
          img.onerror = function () { this.remove(); };
          img.src = u;
          sc.appendChild(img);
        });
      }
    }
  }

  /* 启动 */
  bind();
  showTitle();
})();
