/* 问号介绍系统：词条数据 + 弹层。任何带 data-help="键" 或 data-talent / data-item 的元素，
   点击（手机为点按）即弹出说明。 */
var Help = (function () {
  var TOPICS = {
    attr_chr: { name: '颜值', text: '影响社交、婚恋、娱乐圈路线与部分选项门槛。逛街时颜值即通行证：商店每点颜值优惠 1%（至多 15%）；颜值≥10 时历练更容易遇到好事。' },
    attr_int: { name: '智力', text: '影响学业、事业与大量事件的选项门槛；战斗中提供 40% 攻击加成；修仙线的悟道与渡劫「智取」都靠它。' },
    attr_str: { name: '体质', text: '立命之本。战斗生命 = 60 + 体质×12，并提供攻击与防御加成；体质归零会缠绵病榻，持续亏损则一病不起。' },
    attr_mny: { name: '家境', text: '财富与社会资源。影响事件走向与选项门槛；家底会生钱——每年按家境自动进账盘缠（家境÷3）。' },
    attr_spr: { name: '快乐', text: '人生的意义所在。快乐过低可能郁郁而终；修仙渡心魔劫时，快乐必须大于 10 方能守住道心。' },
    attr_luk: { name: '气运', text: '隐藏属性，天注定。影响暴击率（每点 +1.2%）、自然死亡规避与各种随机事件的暗中标价。' },
    ap: { name: '体力', text: '每年伊始回满 100 点（轮回殿「只争朝夕」可提至 130）。行动按收益分级消耗：属性成长 40、副本 40、历练 35、挣钱 25、休闲 15-25、休息 20、幽冥幻境 100。逛商店/产业/转盘不耗体力。' },
    coin: { name: '盘缠', text: '当前世界的通行货币（铜钱/银两/积分/晶核/灵石……）。来自事件、历练与副本赏金，在商店购买装备与补给。' },
    quest: { name: '主线', text: '每个世界有五段主线机缘，达成条件自动推进，盖印发放奖励。完成最终阶段往往指向这个世界的传奇结局。' },
    equip: { name: '装备', text: '兵刃提供攻击与技能，衣甲提供防御与生命，饰品各有妙用。在「行囊」中穿戴或卸下，新装备若对应栏位空着会自动穿上。' },
    rogue: { name: '幽冥幻境', text: '肉鸽爬塔：十二层幻境，每层二选一。生命跨场不自动回复，中途与塔主前各有一次三选一抓牌。登顶有大造化，败北只会重伤，不丢性命。' },
    dungeon: { name: '副本', text: '秘境险地，连战数场。难度以星级标注，通关有赏，休整几年后可再挑战。' },
    deck: { name: '牌组构筑', text: '底牌 8 张固定（3打击 3格挡 1电光 1凝神），自由构筑最多 10 张、同卡最多 2 张。卡牌来自爬塔抓牌（中途与塔主前各一次）、商店与技能转化。牌组跨世继承。' },
    wound: { name: '重伤', text: '战斗败北的后果：属性跌落并需静养。随年份自然好转，「休息」可加速静养，老山参、筑基丹等药物可直接疗伤。' },
    forge: { name: '装备强化', text: '在行囊-装备页点击已装备槽位可强化：每级提升 25% 属性，最高 +5，费用随等级递增。百分比神装的加成不受强化影响。' },
    shop: { name: '商店', text: '每 3 年上新一次（3 件物品 + 概率卡牌货架）。可花钱「换一批货」：首次收盘缠的 4%，第二次 5%，之后 10%。颜值每点优惠 1%（至多 15%）。' },
    train: { name: '历练', desc:'', text: '出门闯荡：可能遭遇战斗（胜有缴获，败则轻伤），也可能捡到钱袋、获得物品或空手而回。颜值≥10 时更容易遇到好事。' }
  };

  var panel = null;
  function ensurePanel() {
    if (panel) return panel;
    panel = document.createElement('div');
    panel.id = 'help-panel';
    panel.innerHTML = '<div id="help-card"><div id="help-name"></div><div id="help-text"></div><div id="help-close">收起</div></div>';
    document.body.appendChild(panel);
    panel.addEventListener('click', function () { hide(); });
    return panel;
  }

  function show(name, text) {
    ensurePanel();
    document.getElementById('help-name').textContent = name;
    document.getElementById('help-text').innerHTML = text;
    panel.classList.add('on');
    AudioFX.tick(0.05);
  }
  function hide() { if (panel) panel.classList.remove('on'); }

  /* 词条渲染辅助：天赋 / 物品的说明文本 */
  function talentText(t) {
    var R = ['凡品', '良品', '上品', '天品'];
    var html = '<p>' + t.desc + '</p>';
    html += '<p class="help-kv">品质：' + R[t.rarity || 0] + '</p>';
    if (t.attr) {
      var a = [];
      for (var k in t.attr) a.push(Engine.ATTR_NAMES[k] + (t.attr[k] > 0 ? '+' : '') + t.attr[k]);
      if (a.length) html += '<p class="help-kv">属性：' + a.join('，') + '</p>';
    }
    var r = t.rarity || 0;
    if (r > 0) html += '<p class="help-kv">战斗加成：攻击+' + (r * 2) + '，生命+' + (r * 10) + '</p>';
    return html;
  }

  function itemText(it) {
    var SLOTS = { weapon: '兵刃', armor: '衣甲', trinket: '饰品', use: '消耗品' };
    var html = '<p>' + it.desc + '</p>';
    html += '<p class="help-kv">类型：' + SLOTS[it.slot] + '</p>';
    var st = [];
    if (it.atk) st.push('攻击+' + it.atk);
    if (it.def) st.push('防御+' + it.def);
    if (it.hp) st.push('生命+' + it.hp);
    if (it.atkPct) st.push('攻击+' + it.atkPct + '%');
    if (it.defPct) st.push('防御+' + it.defPct + '%');
    if (it.hpPct) st.push('生命+' + it.hpPct + '%');
    if (st.length) html += '<p class="help-kv">' + st.join('，') + '</p>';
    if (it.skill) {
      for (var i = 0; i < SKILLS.length; i++) {
        if (SKILLS[i].id === it.skill) { html += '<p class="help-kv">附带技能：' + SKILLS[i].name + '（' + SKILLS[i].desc + '）</p>'; break; }
      }
    }
    if (it.slot === 'use') html += '<p class="help-kv">在「行囊」中点击使用</p>';
    return html;
  }

  /* 全局点击委托（物品 > 天赋 > 遗物 > 词条，优先具体的） */
  document.addEventListener('click', function (e) {
    var re = e.target.closest('[data-relic]');
    if (re && typeof RELICS !== 'undefined') {
      var rid = re.getAttribute('data-relic');
      for (var i = 0; i < RELICS.length; i++) {
        if (RELICS[i].id === rid) {
          var R = ['凡品', '良品', '上品', '天品'];
          show(RELICS[i].name, '<p>' + RELICS[i].desc + '</p><p class="help-kv">品质：' + R[RELICS[i].rarity || 0] + ' · 遗物（本趟爬塔生效）</p>');
          e.stopPropagation(); return;
        }
      }
    }
    var ie = e.target.closest('[data-item]');
    if (ie) {
      var iid = ie.getAttribute('data-item');
      var it = null;
      for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === iid) it = ITEMS[i];
      if (it) { show(it.name, itemText(it)); e.stopPropagation(); return; }
    }
    var te = e.target.closest('[data-talent]');
    if (te) {
      var tid = te.getAttribute('data-talent');
      var tl = (G_life_talents()).find(function (x) { return x.id === tid; });
      if (tl) { show(tl.name, talentText(tl)); e.stopPropagation(); return; }
    }
    var el = e.target.closest('[data-help]');
    if (el) {
      var t = TOPICS[el.getAttribute('data-help')];
      if (t) { show(t.name, '<p>' + t.text + '</p>'); e.stopPropagation(); }
    }
  });
  /* 由 game.js 注入当前天赋列表来源 */
  var G_life_talents = function () { return []; };
  return {
    show: show, hide: hide,
    setTalentSource: function (fn) { G_life_talents = fn; }
  };
})();
