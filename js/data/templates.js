/* 角色模板：预设属性、天赋、装备、技能与专属简介 */
var TEMPLATES = [
  {
    id: 'tpl_tafi', name: '永雏塔菲', title: '虚拟主播 · 粉色闪光', gender: 'F',
    intro: '个人势虚拟主播，抽象圣体，直播界的气氛组组长。凭借超强网感与无敌乐观，把任何直播事故都能变成节目效果。她的信条：只要我不尴尬，尴尬的就是别人。塔叠们永远在弹幕里守候。',
    suggest: 'life',
    attr: { chr: 9, int: 5, str: 3, mny: 5, spr: 10, luk: 6 },
    talents: ['t_star'],
    extraTalents: [
      { id: 'tpl_tafi_aura', name: '塔叠庇护', rarity: 2, desc: '弹幕护体，快乐常在。', attr: { spr: 2 } }
    ],
    items: ['it_mic', 'it_hoodie'],
    skills: [],
    coin: 150,
    birthText: '聚光灯亮起的那一刻，弹幕已经刷满了"来了来了"。'
  },
  {
    id: 'tpl_sun', name: '孙笑川', title: '抽象宗师 · 儒雅随和', gender: 'M',
    intro: '网络抽象文化祖师爷，直播间造梗永动机。一句"你吼那么大声干什么"火遍全网，圣经咏诵者无数。世人笑他太疯癫，他笑世人看不穿——骂声越大，流量越旺，他自岿然不动，堪称互联网第一心态。',
    suggest: 'life',
    attr: { chr: 4, int: 7, str: 6, mny: 4, spr: 8, luk: 3 },
    talents: [],
    extraTalents: [
      { id: 'tpl_sun_saint', name: '抽象圣经', rarity: 2, desc: '出口成章（物理意义上的）。', attr: { int: 1, spr: 2 } },
      { id: 'tpl_sun_heart', name: '大心脏', rarity: 1, desc: '任凭风浪起，稳坐钓鱼台。', attr: { str: 1 } }
    ],
    items: ['it_keyboard'],
    skills: [],
    coin: 100,
    birthText: '弹幕已经准备就绪，就等他开口了。'
  },
  {
    id: 'tpl_sanbing', name: '散兵', title: '流浪者 · 无心人偶', gender: 'M',
    intro: '曾是神造人偶"国崩"，三度遭逢背叛后自封"散兵"。毒舌傲娇，嘴硬心软，一边说着最狠的话，一边把斗笠压低遮住泛红的耳尖。踏遍尘世寻一颗心——"巴尔泽布，我已登神！"',
    suggest: 'xiuxian',
    attr: { chr: 8, int: 8, str: 7, mny: 3, spr: 4, luk: 4 },
    talents: [],
    extraTalents: [
      { id: 'tpl_sb_doll', name: '人偶之躯', rarity: 2, desc: '不知疲倦，不畏伤病。', attr: { str: 2 } },
      { id: 'tpl_sb_god', name: '登神之志', rarity: 3, desc: '此生定要证道登神。', attr: { int: 2, luk: 1 } }
    ],
    items: ['it_bamboo_hat'],
    skills: ['sk_divine_thunder'],
    coin: 80,
    birthText: '斗笠之下传来一声冷哼："这一世，我自己走。"'
  }
];
