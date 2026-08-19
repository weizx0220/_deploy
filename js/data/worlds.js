/* 世界定义：6 个可选开局世界，各带 5 阶段主线 */
var WORLDS = [
  {
    id: 'life', name: '现实都市', img: 'bg_life.png', startAge: 0, coinName: '铜钱',
    pool: 'life', setFlags: [], setRoute: '',
    desc: '柴米油盐，人间烟火。最平凡的世界，也有最不平凡的可能。',
    intro: '你降生在烟火人间。这里有KPI和房贷，也有深夜的烧烤摊和突如其来的温柔。',
    mainline: [
      { name: '长大成人', hint: '活到 18 岁', cond: { minAge: 18 },
        reward: { coin: 50 }, toast: '你成年了。世界很大，去闯吧。' },
      { name: '立志', hint: '选定人生方向（18 岁的抉择）', cond: { anyFlag: ['branch_biz', 'branch_scholar', 'branch_star', 'branch_athlete', 'branch_flat'] },
        reward: { coin: 60 }, toast: '志之所向，素履以往。' },
      { name: '商海扬帆', hint: '财富达到 12', cond: { attr: { mny: { gte: 12 } } }, branch: 'biz',
        reward: { coin: 150 }, toast: '你的生意，开始有了起色。' },
      { name: '学富五车', hint: '智力达到 15', cond: { attr: { int: { gte: 15 } } }, branch: 'scholar',
        reward: { coin: 80, attr: { int: 2 } }, toast: '腹有诗书气自华。' },
      { name: '星光乍现', hint: '颜值达到 15', cond: { attr: { chr: { gte: 15 } } }, branch: 'star',
        reward: { coin: 80, attr: { spr: 2 } }, toast: '镁光灯开始追着你跑。' },
      { name: '体魄过人', hint: '体质达到 15', cond: { attr: { str: { gte: 15 } } }, branch: 'athlete',
        reward: { coin: 80, attr: { str: 2 } }, toast: '钢筋铁骨，百炼成钢。' },
      { name: '知足常乐', hint: '快乐达到 15', cond: { attr: { spr: { gte: 15 } } }, branch: 'flat',
        reward: { coin: 80, attr: { spr: 2 } }, toast: '人间有味是清欢。' },
      { name: '成家', hint: '与一人结为连理', cond: { flags: ['married'] },
        reward: { coin: 100, attr: { spr: 2 } }, toast: '从此有人与你立黄昏，问你粥可温。' },
      { name: '顶梁柱', hint: '育有子女，或财富达到 15', cond: { anyFlag: ['has_child', 'biz_empire'] },
        reward: { coin: 150, attr: { str: 2 } }, toast: '你成了别人的依靠。' },
      { name: '此生无憾', hint: '活到 70 岁', cond: { minAge: 70 },
        reward: { coin: 200, attr: { spr: 3 } }, toast: '回首来路，柴米油盐皆是诗。' }
    ]
  },
  {
    id: 'novel_wuxia', name: '武侠江湖', img: 'novel_wuxia.png', startAge: 16, coinName: '银两',
    pool: 'novel_wuxia', setFlags: ['world_wuxia'], setRoute: 'novel',
    desc: '刀光剑影，快意恩仇。门派林立，秘籍动人心。',
    intro: '你生在武侠世界。江湖规矩很简单：拳头大的是道理，剑快的是真理。',
    mainline: [
      { name: '初涉江湖', hint: '活到 17 岁', cond: { minAge: 17 },
        reward: { coin: 60, items: ['it_saber'] }, toast: '你挎刀出门，江湖就在脚下。' },
      { name: '小有所成', hint: '体质达到 15', cond: { attr: { str: { gte: 15 } } },
        reward: { coin: 80, skills: ['sk_swordqi'] }, toast: '你的武功，已能护住一方平安。' },
      { name: '名震一方', hint: '获得秘籍或拜入名门', cond: { anyFlag: ['wuxia_miji', 'wuxia_guanfu'] },
        reward: { coin: 120, attr: { int: 2 } }, toast: '报上名号，黑白两道都要给三分薄面。' },
      { name: '武林神话', hint: '体质达到 30', cond: { attr: { str: { gte: 30 } } },
        reward: { coin: 200, items: ['it_swordqi_blade'] }, toast: '你的传说，开始被说书人传唱。' },
      { name: '破碎虚空', hint: '等待华山论剑的结局', cond: { flags: ['wuxia_win'] },
        reward: { attr: { spr: 5 } }, toast: '武道尽头，原来是天上人间。' }
    ]
  },
  {
    id: 'novel_wuxian', name: '无限流', img: 'novel_wuxian.png', startAge: 18, coinName: '积分',
    pool: 'novel_wuxian', setFlags: ['world_wuxian'], setRoute: 'novel',
    desc: '主神空间，副本轮回。活下去，或者成为规则的一部分。',
    intro: '睁开眼，你已身处主神空间。想活命，就下副本；想回家，先攒够五万积分。',
    mainline: [
      { name: '新人试炼', hint: '活到 19 岁', cond: { minAge: 19 },
        reward: { coin: 100, items: ['it_cloth'] }, toast: '你活过了第一个副本，正式成为轮回者。' },
      { name: '站稳脚跟', hint: '体质达到 12', cond: { attr: { str: { gte: 12 } } },
        reward: { coin: 150, skills: ['sk_rule'] }, toast: '你学会了在主神的规则里跳舞。' },
      { name: '小队核心', hint: '加入公会或智力达到 15', cond: { anyFlag: ['wuxian_gonghui'], attr: { int: { gte: 15 } } },
        reward: { coin: 200, items: ['it_amulet'] }, toast: '队友愿意把后背交给你。' },
      { name: '资深轮回者', hint: '体质达到 25', cond: { attr: { str: { gte: 25 } } },
        reward: { coin: 300, items: ['it_thunder_fan'] }, toast: '新人看你的眼神，像看一个传说。' },
      { name: '超脱棋局', hint: '走到主神空间的终局', cond: { flags: ['wuxian_win'] },
        reward: { attr: { spr: 5 } }, toast: '棋子掀了棋盘。' }
    ]
  },
  {
    id: 'novel_bazong', name: '霸总风云', img: 'novel_bazong.png', startAge: 22, coinName: '现金',
    pool: 'novel_bazong', setFlags: ['world_bazong'], setRoute: 'novel',
    desc: '豪门恩怨，契约婚姻。天凉王破，只在一念之间。',
    intro: '你穿进了一本霸总文。这里的规矩：不要轻易得罪姓顾的、姓厉的和姓傅的。',
    mainline: [
      { name: '入局', hint: '活到 23 岁', cond: { minAge: 23 },
        reward: { coin: 100 }, toast: '你拿到了进入豪门棋局的入场券。' },
      { name: '契约加身', hint: '签下那份契约', cond: { flags: ['bazong_contract'] },
        reward: { coin: 150, attr: { mny: 2 } }, toast: '一纸契约，各取所需。大概。' },
      { name: '搅动风云', hint: '家境（财富）达到 12', cond: { attr: { mny: { gte: 12 } } },
        reward: { coin: 200, items: ['it_ring'] }, toast: '财经版的编辑开始打听你的名字。' },
      { name: '执掌乾坤', hint: '家境（财富）达到 20', cond: { attr: { mny: { gte: 20 } } },
        reward: { coin: 300, skills: ['sk_money'] }, toast: '你说要下雨，股市就真的下雨了。' },
      { name: '天凉王破', hint: '走到这场豪门大戏的终局', cond: { flags: ['bazong_win'] },
        reward: { attr: { spr: 5 } }, toast: '故事的最后，你成了别人的传说。' }
    ]
  },
  {
    id: 'novel_moshi', name: '末世废土', img: 'novel_moshi.png', startAge: 20, coinName: '晶核',
    pool: 'novel_moshi', setFlags: ['world_moshi'], setRoute: 'novel',
    desc: '文明倾覆，弱肉强食。在废墟之上，重建或毁灭。',
    intro: '病毒爆发的第三年，你睁开眼。食物、子弹、盟友——在末世，信任比黄金贵。',
    mainline: [
      { name: '活下去', hint: '活到 21 岁', cond: { minAge: 21 },
        reward: { coin: 80, items: ['it_vest'] }, toast: '你活过了第一年。已经是强者。' },
      { name: '觉醒', hint: '觉醒你的异能', cond: { flags: ['moshi_power'] },
        reward: { coin: 120, skills: ['sk_mutant'] }, toast: '异能觉醒，废土之上你不再是谁的猎物。' },
      { name: '一方势力', hint: '体质达到 18', cond: { attr: { str: { gte: 18 } } },
        reward: { coin: 200, items: ['it_gun'] }, toast: '幸存者开始投奔你的旗帜。' },
      { name: '废土之王', hint: '体质达到 30', cond: { attr: { str: { gte: 30 } } },
        reward: { coin: 300, items: ['it_crown'] }, toast: '这片废土，默认了你的规矩。' },
      { name: '新纪元的火种', hint: '走到末世线的终局', cond: { flags: ['moshi_win'] },
        reward: { attr: { spr: 5 } }, toast: '你在废墟上种出了第一株绿芽。' }
    ]
  },
  {
    id: 'xiuxian', name: '修仙界', img: 'xx_cultivate.png', startAge: 100, coinName: '灵石',
    pool: 'xiuxian', setFlags: ['box_opened', 'immortal_body'], setRoute: 'xiuxian',
    desc: '夺天地之造化。百岁开局，长生之路在脚下。',
    intro: '这一世你直接投身修真界，开局已有百年道行。灵根未测，仙途未卜——但时间，站在你这边。',
    mainline: [
      { name: '测定灵根', hint: '完成灵根检测', cond: { anyFlag: ['linggen_good', 'linggen_normal', 'linggen_poor'] },
        reward: { coin: 100, items: ['it_robe'] }, toast: '灵根已测，道途自此分明。' },
      { name: '筑基大成', hint: '体质达到 80', cond: { attr: { str: { gte: 80 } } },
        reward: { coin: 200, items: ['it_elixir'] }, toast: '筑基一成，寿元再涨。' },
      { name: '五行齐聚', hint: '悟透金木水火土五行大道', cond: { flags: ['wx_jin', 'wx_mu', 'wx_shui', 'wx_huo', 'wx_tu'] },
        reward: { coin: 300, attr: { int: 5 } }, toast: '五行轮转，尽在掌中。' },
      { name: '窥见本源', hint: '悟出一条本源大道', cond: { flags: ['benyuan'] },
        reward: { coin: 400, items: ['it_thunder_fan'] }, toast: '你摸到了这个世界的底层代码。' },
      { name: '渡劫飞升', hint: '渡过雷劫与心魔劫', cond: { flags: ['xinmo_guo'] },
        reward: { attr: { spr: 5 } }, toast: '天门已开，只欠临门一脚。' }
    ]
  }
];
