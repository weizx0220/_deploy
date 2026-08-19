/* 地图行动 / 副本列表 / 商店 / 背包。依赖 Game 暴露的背包与货币助手。 */
var MapX = (function () {
  function $(id) { return document.getElementById(id); }

  /* ---------- 地图主面板 ---------- */
  function open() {
    render();
    $('overlay-map').classList.remove('hidden');
  }

  /* ---------- 各世界专属行动 ---------- */
  /* attr 属性成长 / coin 盘缠区间 / chanceAttr 概率加属性 / healWound 疗伤 / item 得物 / minigame 小游戏 / cd 冷却年数 */
  var SHARED = [
    { id: 'deck', name: '牌组', desc: '查看卡牌收藏，调整幻境牌组（不耗体力）', cost: 0 },
    { id: 'shop', name: '商店', desc: '逛逛摊位，补给装备卡牌（不耗体力）', cost: 0 },
    {
      id: 'rest', name: '休息', desc: '歇一歇：体质+2、快乐+1、重伤静养（20 体力，每年限一次）', cost: 20,
      textsByAge: [
        [0, ['午睡睡到自然醒，梦里还在追蝴蝶。', '听完第三个睡前故事，你抱着小熊睡着了。']],
        [7, ['写完作业瘫在床上，天花板的纹路都看熟了。', '周末一觉睡到中午，被饭香叫醒。']],
        [18, ['泡澡搓背加按脚，通体舒泰。', '关掉闹钟睡到自然醒，成年人的小确幸。']],
        [55, ['摇椅吱呀，收音机里放着戏，不知不觉打了个盹。', '阳台上一壶茶一份报，日头慢慢挪。']]
      ]
    }
  ];
  var ROGUE = { id: 'rogue', name: '幽冥幻境', desc: '肉鸽爬塔：十二层试炼，结算必得卡牌；败北只会重伤，不丢性命（100 体力，耗尽全年）', cost: 100 };
  var WORLD_ACTIONS = {
    life: [
      /* 幼年 0-6 */
      { id: 'earlyedu', name: '早教启蒙', desc: '智力 +1（识字卡与积木，40 体力）', cost: 40, age: [0, 6], attr: { int: 1 },
        texts: ['认了一整盒识字卡片，奶声奶气念给全家听。', '积木搭出了奇怪的塔，妈妈拍照发了朋友圈。'] },
      { id: 'play', name: '玩耍嬉戏', desc: '快乐 +1，两成概率体质 +1（15 体力）', cost: 15, age: [0, 14], attr: { spr: 1 }, chanceAttr: { attr: 'str', p: 0.2 },
        texts: ['在小区里疯跑了一下午，膝盖擦破了也不哭。', '和小伙伴玩了一整天过家家。'] },
      { id: 'pocketmoney', name: '要零花钱', desc: '盘缠 +5~15，爸妈的腰包最可靠（15 体力，每年限两次）', cost: 15, age: [3, 15], coin: [5, 15], usesPerYear: 2,
        texts: ['撒娇打滚三板斧，零花钱到手。', '考了双百，爸爸爽快地掏了钱。'] },
      /* 学生时代 7-22 */
      { id: 'school', name: '上学读书', desc: '智力 +1，随堂测验优异则 +2（40 体力）', cost: 40, age: [7, 22], minigame: 'math', attr: { int: 1 },
        texts: ['今天课堂上举手回答了问题，被老师表扬了。', '课本上的知识慢慢在脑子里连成网。'] },
      { id: 'cram', name: '补习班', desc: '智力 +1，但三成概率快乐 -1（35 体力）', cost: 35, age: [10, 22], attr: { int: 1 }, chanceDown: { attr: 'spr', p: 0.3 },
        texts: ['周末的补习班排到下午，卷子做了一套又一套。', '同桌在补习班睡着了，你替他记了笔记。'] },
      { id: 'club', name: '社团活动', desc: '快乐 +1，三成概率颜值 +1（25 体力）', cost: 25, age: [13, 22], attr: { spr: 1 }, chanceAttr: { attr: 'chr', p: 0.3 },
        texts: ['篮球社的友谊赛打满全场。', '文艺汇演的舞台上，你弹了一曲吉他。'] },
      { id: 'parttime', name: '兼职打工', desc: '盘缠 +25~55（家境加成，25 体力）', cost: 25, age: [16, 45], coin: [25, 55],
        texts: ['发了三天传单，腿肚子转筋但钱包鼓了。', '咖啡店兼职，拉花技术进步神速。', '接了个私活，熬夜交付，尾款到账。'] },
      /* 成年 18+ */
      { id: 'career', name: '职场打拼', desc: '入职/转行/晋升：年年领薪，每 3 年属性沉淀（不耗体力）', cost: 0, age: [18, 60] },
      { id: 'study', name: '学习充电', desc: '智力 +1，速算挑战优异则 +2（40 体力）', cost: 40, age: [18, 99], minigame: 'math', attr: { int: 1 },
        texts: ['啃完了一整块知识硬骨头。', '图书馆泡了一天，笔记记了半本。', '刷完一套网课，脑子焕然一新。'] },
      { id: 'gym', name: '健身撸铁', desc: '体质 +1，音游手感好则 +2（40 体力）', cost: 40, age: [14, 99], minigame: 'beat', attr: { str: 1 },
        texts: ['深蹲硬拉卧推，一套下来人精神了。', '汗水砸在瑜伽垫上，多巴胺拉满。'] },
      { id: 'social', name: '社交应酬', desc: '快乐 +1，三成概率颜值 +1（20 体力）', cost: 20, age: [16, 99], attr: { spr: 1 }, chanceAttr: { attr: 'chr', p: 0.3 },
        texts: ['饭局上推杯换盏，认识了不少人。', '剧本杀局上当了一晚上戏精。', 'livehouse 里蹦到散场。'] },
      { id: 'beauty', name: '形象管理', desc: '颜值 +1（25 体力，3 年冷却）', cost: 25, age: [16, 60], cd: 3, attr: { chr: 1 },
        texts: ['换了发型做了皮肤管理，镜中人焕然一新。', '穿搭博主没白关注，衣品肉眼可见地涨。'] },
      { id: 'invest', name: '投资理财', desc: '家境≥8 稳健获利且随家境放大，否则小赌怡情（15 体力）', cost: 15, age: [22, 99], special: 'invest',
        texts: [] },
      { id: 'biz', name: '产业经营', desc: '买产业收租，滚雪球式财富（不耗体力）', cost: 0, age: [20, 99] },
      { id: 'stroll', name: '城市漫步', desc: '随机小奇遇（盘缠/心情/小物，15 体力）', cost: 15, age: [6, 99], special: 'stroll',
        texts: [] },
      { id: 'taiji', name: '公园养生', desc: '体质 +1、快乐 +1，太极遛鸟岁月静好（20 体力）', cost: 20, age: [55, 99], attr: { str: 1, spr: 1 },
        texts: ['清晨的公园，一套太极拳打得行云流水。', '和老伙计们杀了两盘棋，遛了半天的鸟。'] },
      { id: 'grandkid', name: '含饴弄孙', desc: '快乐 +2，儿孙绕膝福满堂（15 体力）', cost: 15, age: [50, 99], attr: { spr: 2 },
        texts: ['小孙子骑在脖子上喊驾，你笑得像个孩子。', '给孙辈讲你年轻时的故事，他们眼睛瞪得溜圆。'] },
      { id: 'shoot', name: '打靶练枪', desc: '体质 +1，神枪手翻倍（25 体力）', cost: 25, age: [14, 60], minigame: 'shoot', attr: { str: 1 },
        texts: ['靶场上一组速射，虎口微微发麻。', '教练说你的站姿有天赋。'] },
      { id: 'fish', name: '河边垂钓', desc: '快乐 +1，连杆爆护翻倍（20 体力）', cost: 20, age: [6, 99], minigame: 'fish', attr: { spr: 1 },
        texts: ['一竿一线一世界，烦恼随水而去。', '鱼没钓几条，云看了半天。'] },
      { id: 'mow', name: '社区除草', desc: '盘缠 +15~40，除得干净翻倍（25 体力）', cost: 25, age: [10, 60], minigame: 'mow', coin: [15, 40],
        texts: ['社区组织除草劳动，你推着割草机上了。', '草丛里还翻出俩钢镚。'] },
      { id: 'luck_wheel', name: '庙会转盘', desc: '10 铜钱一转，手气定乾坤（不耗体力）', cost: 0, age: [6, 99] },
      { id: 'luck_scratch', name: '刮刮乐', desc: '5 铜钱一张，即开即中（不耗体力）', cost: 0, age: [18, 99] },
      SHARED[0], SHARED[1], SHARED[2],
      { id: 'rogue', name: '幽冥幻境', desc: '肉鸽爬塔：十二层试炼，结算必得卡牌；败北只会重伤，不丢性命（100 体力，耗尽全年）', cost: 100, age: [18, 99] }
    ],
    novel_wuxia: [
      { id: 'train', name: '行侠仗义', desc: '出山历练，或遇敌或遇缘（35 体力）', cost: 35 },
      { id: 'dungeon', name: '秘境副本', desc: '挑战江湖险地（40 体力）', cost: 40 },
      { id: 'meditate', name: '闭关参悟', desc: '智力 +1（画符描迹可翻倍），三成概率体质再 +1', cost: 40, minigame: 'fu', attr: { int: 1 }, chanceAttr: { attr: 'str', p: 0.3 },
        texts: ['面壁七日，剑谱上的字忽然都活了。', '气走周天，忽有所悟。'] },
      { id: 'spar', name: '切磋讨教', desc: '体质 +1，一成概率受轻伤', cost: 30, attr: { str: 1 }, special: 'spar',
        texts: ['与名门弟子喂招三百回合，受益良多。', '点到为止，惺惺相惜。'] },
      { id: 'herb', name: '采药换钱', desc: '盘缠 +20~45（家境加成）', cost: 25, coin: [20, 45],
        texts: ['深山采得几株老药，药铺给了好价钱。', '替镖局押了趟短镖，脚程钱到手。'] },
      { id: 'biz', name: '产业经营', desc: '开镖局药铺，年年有进账（不耗体力）', cost: 0 },
      { id: 'luck_stone', name: '赌石', desc: '30 银两一刀切，切涨切垮看天意（不耗体力）', cost: 0 },
      SHARED[0], SHARED[1], SHARED[2], ROGUE
    ],
    novel_wuxian: [
      { id: 'train', name: '刷自由副本', desc: '战斗历练（35 体力）', cost: 35 },
      { id: 'dungeon', name: '高难度副本', desc: '组队挑战（40 体力）', cost: 40 },
      { id: 'training2', name: '强化训练', desc: '体质 +1', cost: 40, attr: { str: 1 },
        texts: ['重力室里又是充实的一天。', '虚拟实战舱里死了十七次，进步肉眼可见。'] },
      { id: 'intel', name: '情报分析', desc: '智力 +1，两成概率快乐 +1', cost: 40, attr: { int: 1 }, chanceAttr: { attr: 'spr', p: 0.2 },
        texts: ['复盘了十个副本录像，拆解出一套攻略。', '在主神论坛发了篇分析帖，被顶上热门。'] },
      { id: 'stall', name: '广场摆摊', desc: '积分 +20~45（家境加成）', cost: 25, coin: [20, 45],
        texts: ['倒卖副本特产，小赚一笔。', '摊位前来了个阔绰的资深者。'] },
      { id: 'biz', name: '产业经营', desc: '置办产业，坐着收积分（不耗体力）', cost: 0 },
      { id: 'luck_wheel', name: '幸运轮盘', desc: '10 积分一转，主神的恶趣味（不耗体力）', cost: 0 },
      SHARED[0], SHARED[1], SHARED[2], ROGUE
    ],
    novel_bazong: [
      { id: 'negotiate', name: '商业谈判', desc: '盘缠 +30（家境加成），速算优异翻倍', cost: 25, minigame: 'math', coinFixed: 30,
        texts: ['谈判桌上寸土不让，条款签得漂亮。', '三句话让对方让了三个点。'] },
      { id: 'banquet', name: '名流晚宴', desc: '快乐 +1，四成概率颜值 +1（投壶助兴可翻倍）', cost: 20, minigame: 'pot', attr: { spr: 1 }, chanceAttr: { attr: 'chr', p: 0.4 },
        texts: ['香槟塔前与名流周旋，长袖善舞。', '晚宴上你的致辞赢得满堂彩。'] },
      { id: 'coach', name: '私教健身', desc: '体质 +1，音游手感好则 +2', cost: 40, minigame: 'beat', attr: { str: 1 },
        texts: ['私教课上得汗流浃背，线条更利落了。'] },
      { id: 'emba', name: '进修学习', desc: '智力 +1，速算优异翻倍', cost: 40, minigame: 'math', attr: { int: 1 },
        texts: ['商学院的案例课，笔记记了满满三页。'] },
      { id: 'beauty', name: '形象管理', desc: '颜值 +1（25 体力，3 年冷却）', cost: 25, cd: 3, attr: { chr: 1 },
        texts: ['高定西装上身，气场两米八。'] },
      { id: 'dungeon', name: '商战风云', desc: '商场如战场（40 体力）', cost: 40 },
      { id: 'biz', name: '产业经营', desc: '投资并购，资本滚雪球（不耗体力）', cost: 0 },
      { id: 'luck_wheel', name: '年会抽奖', desc: '10 现金一抽，大奖拿到手软（不耗体力）', cost: 0 },
      SHARED[0], SHARED[1], SHARED[2], ROGUE
    ],
    novel_moshi: [
      { id: 'train', name: '外出拾荒', desc: '危险与收获并存（35 体力）', cost: 35 },
      { id: 'dungeon', name: '禁区探索', desc: '深入危险区域（40 体力）', cost: 40 },
      { id: 'trainbody', name: '体能训练', desc: '体质 +1', cost: 40, attr: { str: 1 },
        texts: ['扛着沙袋绕围墙跑了二十圈。', '和守卫队对练到脱力。'] },
      { id: 'research', name: '研究样本', desc: '智力 +1', cost: 40, attr: { int: 1 },
        texts: ['解剖变异体样本，记录了一份珍贵数据。', '在旧实验室的终端里扒出半份研究日志。'] },
      { id: 'barter', name: '以物易物', desc: '晶核 +20~40（家境加成）', cost: 25, coin: [20, 40],
        texts: ['用两罐罐头换了把趁手的扳手和一把晶核。', '集市上倒卖净水片，小赚。'] },
      { id: 'biz', name: '产业经营', desc: '农场净水站，末世不动产（不耗体力）', cost: 0 },
      { id: 'luck_stone', name: '废土开箱', desc: '30 晶核赌一箱，可能是军火也可能是垃圾（不耗体力）', cost: 0 },
      SHARED[0], SHARED[1], SHARED[2], ROGUE
    ],
    xiuxian: [
      { id: 'train', name: '外出历练', desc: '斩妖除魔，历练道心（35 体力）', cost: 35 },
      { id: 'dungeon', name: '秘境探险', desc: '洞天福地，危机四伏（40 体力）', cost: 40 },
      { id: 'biguan', name: '闭关苦修', desc: '体质 +1、智力 +1（画符圆满则翻倍）', cost: 40, minigame: 'fu', attr: { str: 1, int: 1 },
        texts: ['闭关数月，灵力又浑厚了几分。', '枯坐蒲团，道心澄明。'] },
      { id: 'alchemy', name: '炼丹制药', desc: '盘缠 +25~50（家境加成），两成概率得老山参', cost: 25, coin: [25, 50], chanceItem: { id: 'it_ginseng', p: 0.2 },
        texts: ['一炉培元丹出炉，坊市抢着要。', '丹香十里，这一炉成色极佳。'] },
      { id: 'biz', name: '产业经营', desc: '灵田丹坊灵矿，仙家产业（不耗体力）', cost: 0 },
      { id: 'luck_stone', name: '赌石大会', desc: '30 灵石赌一块灵玉原石（不耗体力）', cost: 0 },
      SHARED[0], SHARED[1], SHARED[2], ROGUE
    ]
  };

  /* 地点定义：每个世界的行动按场所归组（借鉴未来人生的场景制） */
  var PLACES = {
    life: [
      { name: '家中', icon: '宅', acts: ['rest', 'pocketmoney'] },
      { name: '早教中心', icon: '幼', acts: ['earlyedu', 'play'] },
      { name: '学校 · 图书馆', icon: '学', acts: ['school', 'cram', 'study'] },
      { name: '中央广场', icon: '聚', acts: ['club', 'social', 'stroll', 'luck_wheel'] },
      { name: '健身房', icon: '体', acts: ['gym'] },
      { name: '商业街', icon: '商', acts: ['parttime', 'shop', 'mow', 'luck_scratch'] },
      { name: '美容院', icon: '颜', acts: ['beauty'] },
      { name: '写字楼', icon: '职', acts: ['career'] },
      { name: '金融街', icon: '投', acts: ['invest', 'biz'] },
      { name: '游乐场', icon: '玩', acts: ['shoot'] },
      { name: '滨河公园', icon: '钓', acts: ['fish', 'taiji', 'grandkid'] },
      { name: '虚空裂隙', icon: '幻', acts: ['rogue'] },
      { name: '随身', icon: '囊', acts: ['deck'] }
    ],
    novel_wuxia: [
      { name: '演武场', icon: '武', acts: ['train', 'spar'] },
      { name: '秘境', icon: '境', acts: ['dungeon'] },
      { name: '山门静室', icon: '悟', acts: ['meditate'] },
      { name: '市集', icon: '集', acts: ['herb', 'shop', 'biz', 'luck_stone'] },
      { name: '客栈', icon: '栈', acts: ['rest'] },
      { name: '虚空裂隙', icon: '幻', acts: ['rogue'] },
      { name: '随身', icon: '囊', acts: ['deck'] }
    ],
    novel_wuxian: [
      { name: '副本大厅', icon: '本', acts: ['train', 'dungeon'] },
      { name: '训练舱', icon: '练', acts: ['training2'] },
      { name: '情报屋', icon: '报', acts: ['intel'] },
      { name: '自由广场', icon: '摊', acts: ['stall', 'shop', 'biz', 'luck_wheel'] },
      { name: '休息舱', icon: '憩', acts: ['rest'] },
      { name: '虚空裂隙', icon: '幻', acts: ['rogue'] },
      { name: '随身', icon: '囊', acts: ['deck'] }
    ],
    novel_bazong: [
      { name: '集团总部', icon: '商', acts: ['negotiate', 'dungeon', 'biz'] },
      { name: '商学院', icon: '学', acts: ['emba'] },
      { name: '名流会所', icon: '宴', acts: ['banquet', 'luck_wheel'] },
      { name: '私教工作室', icon: '练', acts: ['coach'] },
      { name: '形象中心', icon: '颜', acts: ['beauty'] },
      { name: '公寓', icon: '宅', acts: ['rest'] },
      { name: '虚空裂隙', icon: '幻', acts: ['rogue'] },
      { name: '随身', icon: '囊', acts: ['deck'] }
    ],
    novel_moshi: [
      { name: '废土', icon: '荒', acts: ['train', 'dungeon'] },
      { name: '训练场', icon: '练', acts: ['trainbody'] },
      { name: '研究室', icon: '研', acts: ['research'] },
      { name: '集市', icon: '集', acts: ['barter', 'shop', 'biz', 'luck_stone'] },
      { name: '安全屋', icon: '屋', acts: ['rest'] },
      { name: '虚空裂隙', icon: '幻', acts: ['rogue'] },
      { name: '随身', icon: '囊', acts: ['deck'] }
    ],
    xiuxian: [
      { name: '山门之外', icon: '游', acts: ['train'] },
      { name: '秘境', icon: '境', acts: ['dungeon'] },
      { name: '洞府', icon: '修', acts: ['biguan'] },
      { name: '丹房', icon: '丹', acts: ['alchemy'] },
      { name: '坊市', icon: '坊', acts: ['shop', 'biz', 'luck_stone'] },
      { name: '静室', icon: '憩', acts: ['rest'] },
      { name: '虚空裂隙', icon: '幻', acts: ['rogue'] },
      { name: '随身', icon: '囊', acts: ['deck'] }
    ]
  };

  function render() {
    var L = Game.life();
    $('map-world').textContent = Game.worldName();
    $('map-ap').textContent = L.ap;
    $('map-ap-note').textContent = '每年伊始回满 ' + Game.maxEnergy() + ' 点';
    $('map-coin').textContent = L.coin + ' ' + Game.coinName();
    var defs = WORLD_ACTIONS[L.world] || WORLD_ACTIONS.life;
    var places = PLACES[L.world] || PLACES.life;
    var wrap = $('map-actions');
    wrap.innerHTML = '';
    places.forEach(function (p) {
      var block = document.createElement('div');
      block.className = 'map-place';
      var imgName = ({"学校 · 图书馆":"place_school","早教中心":"place_school","写字楼":"place_office","健身房":"place_gym","商业街":"place_shop","中央广场":"place_plaza","美容院":"place_beauty","金融街":"place_finance","家中":"place_home","虚空裂隙":"place_rift","随身":"place_bag","客栈":"place_home","市集":"place_shop","坊市":"place_shop","集市":"place_shop","演武场":"place_gym","训练舱":"place_gym","训练场":"place_gym","私教工作室":"place_gym","秘境":"place_rift","副本大厅":"place_rift","山门静室":"place_home","静室":"place_home","休息舱":"place_home","安全屋":"place_home","公寓":"place_home","洞府":"place_home","丹房":"place_home","情报屋":"place_office","研究室":"place_office","集团总部":"place_office","商学院":"place_school","自由广场":"place_plaza","废土":"place_rift","山门之外":"place_rift","形象中心":"place_beauty","名流会所":"place_plaza"})[p.name];
      var imgHtml = imgName ? '<img class="place-thumb" src="' + (typeof Assets !== 'undefined' ? Assets.url(imgName + '.png') : '') + '" onerror="this.remove()">' : '';
      var head = '<div class="place-head">' + imgHtml + '<span class="place-icon">' + p.icon + '</span>' + p.name + '</div>';
      var rows = '';
      var visible = 0;
      p.acts.forEach(function (aid) {
        var a = null;
        for (var i = 0; i < defs.length; i++) if (defs[i].id === aid) a = defs[i];
        if (!a) return;
        if (a.age && (L.age < a.age[0] || L.age > a.age[1])) return;   // 年龄段限定
        visible++;
        var disabled = '', btnTxt = '前往';
        if (L.ap < a.cost) { disabled = ' disabled'; btnTxt = '需体力 ' + a.cost; }
        if (a.id === 'rest' && L.restYear === L.age) { disabled = ' disabled'; btnTxt = '今年已歇过'; }
        if (a.usesPerYear) {
          var us = (L.actionUses || {})[a.id];
          if (us && us.year === L.age && us.n >= a.usesPerYear) { disabled = ' disabled'; btnTxt = '今年次数用完了'; }
        }
        if (a.cd) {
          var cdLeft = (L.actionCd[a.id] || L.age) - L.age;
          if (cdLeft > 0) { disabled = ' disabled'; btnTxt = cdLeft + ' 年后再来'; }
        }
        rows += '<div class="place-act">' +
          '<div><div class="l-name">' + a.name + '</div><div class="l-desc">' + a.desc + '</div></div>' +
          '<button class="ink-btn small" data-act="' + a.id + '"' + disabled + '>' + btnTxt + '</button></div>';
      });
      if (visible === 0) return;   // 整组超龄则隐藏
      block.innerHTML = head + rows;
      wrap.appendChild(block);
    });
    wrap.querySelectorAll('[data-act]').forEach(function (b) {
      b.onclick = function () { act(this.getAttribute('data-act')); };
    });
  }

  function act(id) {
    var L = Game.life();
    if (id === 'shop') return openShop();
    if (id === 'dungeon') return openDungeons();
    if (id === 'deck') return openDeck();
    if (id === 'career') return openCareer();
    if (id === 'biz') return Biz.openPanel(render);
    if (id === 'luck_wheel') return Luck.wheel(10, function () { Game.refresh(); render(); });
    if (id === 'luck_stone') return Luck.stone(30, function () { Game.refresh(); render(); });
    if (id === 'luck_scratch') { Luck.scratch(5); Game.refresh(); return render(); }
    if (id === 'rogue' && L.ap < 100) return;
    if (L.ap < 1) return;
    if (id === 'rest') {
      L.ap -= 20; L.restYear = L.age;
      if (L.wound > 0) {
        L.wound = Math.max(0, L.wound - 3);
        L.attr.spr += 1;
        Game.toast(L.wound > 0 ? '卧床静养，伤势大减（还需 ' + L.wound + ' 年），心情 +1' : '悉心调养，伤势痊愈，心情 +1！');
      } else {
        L.attr.str += 2; L.attr.spr += 1;
        var rt = '泡了个热水澡，通体舒泰：体质 +2，快乐 +1。';
        if (L.age <= 6) rt = '睡了个香甜的午觉，体质 +2，快乐 +1。';
        else if (L.age <= 17) rt = '美美补了一觉，体质 +2，快乐 +1。';
        else if (L.age >= 55) rt = '摇椅上晒着太阳打了个盹，体质 +2，快乐 +1。';
        Game.toast(rt);
      }
      Game.refresh();
      return render();
    }
    if (id === 'rogue') {
      L.ap -= 100;
      $('overlay-map').classList.add('hidden');
      Rogue.start(L, function (win) {
        Game.refresh();
        Game.onActionDone('幻境归来，' + (win ? '你带着造化全身而退。' : '你灰头土脸，但命还在。'));
      });
      return;
    }
    if (id === 'train') {
      var ta = findAction(L.world, 'train');
      if (L.ap < (ta ? ta.cost : 35)) return;
      L.ap -= ta ? ta.cost : 35;
      return train();
    }
    // 通用行动
    var a = findAction(L.world, id);
    if (a) return runAction(a);
  }

  function findAction(world, id) {
    var list = WORLD_ACTIONS[world] || WORLD_ACTIONS.life;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* 通用行动结算 */
  function runAction(a) {
    var L = Game.life();
    if (L.ap < a.cost) return;
    if (a.usesPerYear) {
      if (!L.actionUses) L.actionUses = {};
      var us0 = L.actionUses[a.id];
      if (us0 && us0.year === L.age && us0.n >= a.usesPerYear) return;
    }
    L.ap -= a.cost;
    if (a.cd) L.actionCd[a.id] = L.age + a.cd;
    if (a.usesPerYear) {
      var us1 = L.actionUses[a.id];
      if (!us1 || us1.year !== L.age) L.actionUses[a.id] = { year: L.age, n: 1 };
      else us1.n++;
    }
    Game.countAction(a.id);
    persistSafe();

    function finish(mult) {
      mult = mult || 1;
      var msgs = [];
      if (a.attr) for (var k in a.attr) {
        var v = Math.max(1, Math.round(a.attr[k] * mult));
        L.attr[k] = (L.attr[k] || 0) + v;
        msgs.push(Engine.ATTR_NAMES[k] + '+' + v);
      }
      if (a.coin) {
        var c = a.coin[0] + Engine.rnd(a.coin[1] - a.coin[0] + 1);
        c += Math.round((L.attr.mny || 0) * 2);   // 家境加成：人脉变现
        Game.addCoin(c); msgs.push(Game.coinName() + '+' + c);
      }
      if (a.coinFixed) {
        var cf = Math.round(a.coinFixed * mult) + Math.round((L.attr.mny || 0) * 3);
        Game.addCoin(cf); msgs.push(Game.coinName() + '+' + cf);
      }
      if (a.chanceDown && Math.random() < a.chanceDown.p) {
        L.attr[a.chanceDown.attr] = (L.attr[a.chanceDown.attr] || 0) - 1;
        msgs.push(Engine.ATTR_NAMES[a.chanceDown.attr] + '-1');
      }
      if (a.chanceAttr && Math.random() < a.chanceAttr.p * mult) {
        L.attr[a.chanceAttr.attr] = (L.attr[a.chanceAttr.attr] || 0) + 1;
        msgs.push(Engine.ATTR_NAMES[a.chanceAttr.attr] + '+1');
      }
      if (a.chanceItem && Math.random() < a.chanceItem.p) {
        Game.gainItem(a.chanceItem.id);
        msgs.push('意外收获');
      }
      if (a.special === 'invest') {
        if (L.attr.mny >= 8) {
          var g = 20 + Engine.rnd(30) + L.attr.mny * 4;
          Game.addCoin(g); msgs.push('稳健获利 ' + g);
        } else if (Math.random() < 0.5) {
          var g2 = 10 + Engine.rnd(25) + Math.round(L.attr.mny * 1.5);
          Game.addCoin(g2); msgs.push('小赚 ' + g2);
        } else {
          var lose = Math.min(L.coin, 10 + Engine.rnd(20));
          L.coin -= lose; msgs.push('小亏 ' + lose);
        }
      }
      if (a.special === 'spar' && Math.random() < 0.12) {
        Game.applyWound(1, {});
        msgs.push('切磋失手挂了彩');
      }
      if (a.special === 'stroll') {
        var roll = Math.random();
        if (roll < 0.35) { var sc = 10 + Engine.rnd(25); Game.addCoin(sc); msgs.push(Game.coinName() + '+' + sc); }
        else if (roll < 0.7) { L.attr.spr += 1; msgs.push('快乐+1'); }
        else if (roll < 0.85) { L.attr.chr += 1; msgs.push('颜值+1'); }
        else msgs.push('一无所获但心情舒畅');
      }
      var poolT = a.texts;
      if (a.textsByAge) {
        for (var ta = a.textsByAge.length - 1; ta >= 0; ta--) {
          if (L.age >= a.textsByAge[ta][0]) { poolT = a.textsByAge[ta][1]; break; }
        }
      }
      var flavor = poolT && poolT.length ? poolT[Engine.rnd(poolT.length)] : '';
      Game.toast(flavor + (msgs.length ? '（' + msgs.join('，') + '）' : ''));
      Game.refresh();
      persistSafe();
      render();
    }

    if (a.minigame && MiniGame[a.minigame]) {
      $('overlay-map').classList.add('hidden');
      MiniGame[a.minigame](function (mult) {
        $('overlay-map').classList.remove('hidden');
        finish(mult);
      });
      return;
    }
    finish(1);
  }

  function persistSafe() { if (Game.life()) Game.refresh(); }

  /* ---------- 历练 ---------- */
  function train() {
    var L = Game.life();
    var roll = Math.random();
    var fightP = (L.attr.chr || 0) >= 10 ? 0.38 : 0.5;
    if (roll < fightP) {
      // 遭遇战：强度随年龄/世界缩放
      var base = 30 + L.age * 2 + L.attr.str * 2;
      var enemy = {
        name: Game.encounterName(),
        intro: '历练途中，杀出个拦路的。',
        hp: Math.round(base), atk: Math.round(6 + L.age * 0.35), def: Math.round(1 + L.age * 0.12)
      };
      $('overlay-map').classList.add('hidden');
      Combat.start({
        title: '历练遭遇', life: L, enemies: [enemy],
        onEnd: function (win) {
          if (win) {
            var c = 20 + Engine.rnd(40);
            Game.addCoin(c);
            Game.toast('历练告捷，缴获 ' + c + ' ' + Game.coinName() + '。');
          } else {
            Game.applyWound(1, { str: -1 });
            Game.toast('历练受挫，挂了彩。');
          }
          Game.refresh();
          Game.onActionDone('');
        }
      });
    } else if (roll < 0.78) {
      var c2 = 15 + Engine.rnd(50);
      Game.addCoin(c2);
      Game.toast('你在市集角落捡到钱袋，' + Game.coinName() + ' +' + c2 + '。');
      Game.refresh(); render();
    } else if (roll < 0.9) {
      var it = Game.randomItem();
      Game.gainItem(it);
      Game.toast('奇遇！你获得「' + Game.itemName(it) + '」。');
      Game.refresh(); render();
    } else {
      Game.toast('逛了一整天，看了些新鲜景，什么也没发生。');
      render();
    }
  }

  /* ---------- 副本 ---------- */
  function openDungeons() {
    var L = Game.life();
    var list = DUNGEONS.filter(function (d) {
      if (d.world !== '*' && d.world !== L.world) return false;
      if (d.minAge && L.age < d.minAge) return false;
      return true;
    });
    var wrap = $('map-actions');
    wrap.innerHTML = '';
    if (!list.length) wrap.innerHTML = '<p style="color:var(--ink-faint)">此间暂无副本可入。</p>';
    list.forEach(function (d) {
      var cdLeft = (L.dungeonCd[d.id] || 0) - L.age;
      var div = document.createElement('div');
      div.className = 'map-act';
      var rwTxt = '';
      if (d.reward) {
        var rp = [];
        if (d.reward.coin) rp.push('赏金 ~' + d.reward.coin);
        if (d.reward.items) rp.push.apply(rp, d.reward.items.map(function (x) { return '「' + Game.itemName(x) + '」'; }));
        rwTxt = '<br><span style="color:var(--gold)">' + rp.join(' ') + '</span>';
      }
      div.innerHTML = '<div class="l-name">' + d.name + ' <small style="color:var(--gold)">' + '★'.repeat(d.difficulty) + '</small></div>' +
        '<div class="l-desc">' + d.desc + rwTxt + '</div>';
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      if (cdLeft > 0) { btn.disabled = true; btn.textContent = '休整中（' + cdLeft + ' 年）'; }
      else btn.textContent = '挑战';
      btn.onclick = function () { startDungeon(d); };
      div.appendChild(btn);
      wrap.appendChild(div);
    });
    backBtn();
  }

  function startDungeon(d) {
    var L = Game.life();
    if (L.ap < 40) return;
    L.ap -= 40;
    $('overlay-map').classList.add('hidden');
    Combat.start({
      title: d.name, life: L, enemies: d.enemies,
      onEnd: function (win) {
        if (win) {
          L.dungeonCd[d.id] = L.age + (d.cooldown || 5);
          Game.applyReward(d.reward || {}, d.name);
        } else {
          Game.applyWound(2, { str: -2 });
          Game.toast('你在「' + d.name + '」里栽了跟头，身受重伤。');
        }
        Game.refresh();
        Game.onActionDone('');
      }
    });
  }

  /* ---------- 商店 ---------- */
  function genStock() {
    var pool = ITEMS.filter(function (it) { return it.price > 0; });
    var stock = { items: [], card: null };
    for (var i = 0; i < 3 && pool.length; i++) {
      var idx = Math.floor(Math.random() * pool.length);
      stock.items.push(pool.splice(idx, 1)[0].id);
    }
    if (Math.random() < 0.35) {
      var cp = CARDS.filter(function (c) { return c.rarity <= 2; });
      stock.card = cp[Math.floor(Math.random() * cp.length)].id;
    }
    return stock;
  }

  function openShop() {
    var L = Game.life();
    var wrap = $('map-actions');
    wrap.innerHTML = '';
    var stock = L.shopStock;
    if (!stock || L.age >= stock.until) {
      // 每 3 年上新一次
      stock = genStock();
      stock.until = L.age + 3;
      stock.refreshCount = 0;
      L.shopStock = stock;
    }
    var left = stock.until - L.age;
    var note = document.createElement('p');
    note.style.cssText = 'color:var(--ink-faint);font-size:13px;text-align:center;margin-bottom:8px';
    note.textContent = left > 0 ? '下次上新：' + left + ' 年后' : '新货到店';
    wrap.appendChild(note);
    // 花钱换货：第一次 4%，第二次 5%，第三次起 10%（按当前盘缠比例）
    var RATES = [0.04, 0.05, 0.1];
    var rate = RATES[Math.min(stock.refreshCount, 2)];
    var cost = Math.max(1, Math.round(L.coin * rate));
    var rb = document.createElement('button');
    rb.className = 'ink-btn small';
    rb.style.cssText = 'display:block;margin:0 auto 10px';
    rb.textContent = '换一批货（' + cost + ' ' + Game.coinName() + '，' + Math.round(rate * 100) + '%）';
    if (L.coin < cost) rb.disabled = true;
    rb.onclick = function () {
      if (!Game.spendCoin(cost)) return;
      var keep = stock.until;
      var cnt = stock.refreshCount + 1;
      L.shopStock = genStock();
      L.shopStock.until = keep;
      L.shopStock.refreshCount = cnt;
      AudioFX.flip();
      openShop();
      Game.refresh();
    };
    wrap.appendChild(rb);
    stock.items.forEach(function (iid) {
      var it = Game.item(iid);
      if (!it) return;
      var div = document.createElement('div');
      div.className = 'map-act shop-item rar' + (it.rarity || 0);
      var pv = itemPreview(it);
      var ico = (typeof Assets !== 'undefined') ? '<img class="mini-ico" src="' + Assets.url(it.id + '.png') + '" onerror="this.remove()">' : '';
      div.innerHTML = '<div class="l-name">' + ico + it.name + ' <small style="color:var(--gold)">' + it.price + ' ' + Game.coinName() + '</small></div>' +
        '<div class="l-desc">' + it.desc + (pv ? '<br><span style="color:var(--jade)">' + pv + '</span>' : '') + '</div>';
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      btn.textContent = '买下';
      if (L.coin < priceOf(it)) { btn.disabled = true; btn.textContent = '钱不够'; }
      btn.onclick = function () {
        if (!Game.spendCoin(priceOf(it))) return;
        Game.gainItem(iid);
        stock.items = stock.items.filter(function (x) { return x !== iid; });
        AudioFX.stamp();
        openShop();
        Game.refresh();
      };
      div.appendChild(btn);
      wrap.appendChild(div);
    });
    // 卡牌货架
    if (stock.card) {
      var c = null;
      for (var ci = 0; ci < CARDS.length; ci++) if (CARDS[ci].id === stock.card) c = CARDS[ci];
      if (c) {
        var price = 60 + c.rarity * 60;
        var cdiv = document.createElement('div');
        cdiv.className = 'map-act shop-item rar' + (c.rarity || 0);
        var cico = (typeof Assets !== 'undefined') ? '<img class="mini-ico" src="' + Assets.url(c.id + '.png') + '" onerror="this.remove()">' : '';
        cdiv.innerHTML = '<div class="l-name">' + cico + '卡牌·' + c.name + ' <small style="color:var(--gold)">' + price + ' ' + Game.coinName() + '</small></div>' +
          '<div class="l-desc">' + c.desc + '</div>';
        var cbtn = document.createElement('button');
        cbtn.className = 'ink-btn small';
        cbtn.textContent = '买下';
        if (L.coin < price) { cbtn.disabled = true; cbtn.textContent = '钱不够'; }
        cbtn.onclick = function () {
          if (!Game.spendCoin(price)) return;
          Game.collectCard(stock.card);
          stock.card = null;
          AudioFX.stamp();
          openShop();
          Game.refresh();
        };
        cdiv.appendChild(cbtn);
        wrap.appendChild(cdiv);
      }
    }
    backBtn();
  }

  function backBtn() {
    var wrap = $('map-actions');
    var b = document.createElement('button');
    b.className = 'ink-btn small';
    b.style.marginTop = '10px';
    b.textContent = '← 返回';
    b.onclick = render;
    wrap.appendChild(b);
  }

  /* ---------- 职业面板 ---------- */
  function openCareer() {
    var L = Game.life();
    var wrap = $('map-actions');
    wrap.innerHTML = '';
    if (L.age < 18) {
      wrap.innerHTML = '<p style="color:var(--ink-faint);text-align:center">你还小，18 岁成年后才能入职。</p>';
      backBtn();
      return;
    }
    if (L.career) {
      var cs = Game.careerOf(L.career.id);
      var cur = document.createElement('div');
      cur.className = 'map-act';
      cur.innerHTML = '<div class="l-name">现任：' + cs.name + ' · ' + cs.titles[L.career.level] + '</div>' +
        '<div class="l-desc">年薪 ' + cs.salary[L.career.level] + ' ' + Game.coinName() +
        (L.career.level < 3 ? '；晋升下一级需 ' + (cs.need[Object.keys(cs.need)[0]] + (L.career.level + 1) * 4) + ' ' + Object.keys(cs.need).map(function(k){return Engine.ATTR_NAMES[k];})[0] : '；已到职级巅峰') + '</div>';
      wrap.appendChild(cur);
    }
    Game.CAREERS.forEach(function (c) {
      var key = Object.keys(c.need)[0];
      var okAttr = (L.attr[key] || 0) >= c.need[key];
      var div = document.createElement('div');
      div.className = 'map-act';
      div.innerHTML = '<div class="l-name">' + c.name + '</div>' +
        '<div class="l-desc">入职需 ' + Engine.ATTR_NAMES[key] + '≥' + c.need[key] + '（当前 ' + (L.attr[key] || 0) + '） · 年薪 ' + c.salary[0] + ' 起，最高 ' + c.salary[3] + '</div>';
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      if (L.career && L.career.id === c.id) { btn.disabled = true; btn.textContent = '在职'; }
      else if (!okAttr) { btn.disabled = true; btn.textContent = '资历不足'; }
      else { btn.textContent = L.career ? '转行' : '入职'; }
      btn.onclick = function () {
        L.career = { id: c.id, level: 0 };
        Game.toast('你成为了' + c.name + '（' + c.titles[0] + '），从明年开始领年薪。');
        AudioFX.stamp();
        Game.refresh();
        openCareer();
      };
      div.appendChild(btn);
      wrap.appendChild(div);
    });
    backBtn();
  }

  /* ---------- 牌组构筑 ---------- */
  function cardOf(id) { for (var i = 0; i < CARDS.length; i++) if (CARDS[i].id === id) return CARDS[i]; return null; }

  /* 颜值折扣：每点颜值 -1%，至多 -15% */
  function priceOf(it) {
    var L = Game.life();
    var disc = Math.min(0.15, (L.attr.chr || 0) * 0.01);
    return Math.max(1, Math.round(it.price * (1 - disc)));
  }

  /* 物品属性/效果预览（商店、行囊、副本奖励共用） */
  function itemPreview(it) {
    var p = [];
    if (it.atk) p.push('攻+' + it.atk);
    if (it.def) p.push('防+' + it.def);
    if (it.hp) p.push('血+' + it.hp);
    if (it.atkPct) p.push('攻+' + it.atkPct + '%');
    if (it.defPct) p.push('防+' + it.defPct + '%');
    if (it.hpPct) p.push('血+' + it.hpPct + '%');
    if (it.skill) {
      for (var i = 0; i < SKILLS.length; i++) if (SKILLS[i].id === it.skill) { p.push('技·' + SKILLS[i].name); break; }
    }
    if (it.use) {
      if (it.use.attr) for (var k in it.use.attr) p.push(Engine.ATTR_NAMES[k] + '+' + it.use.attr[k]);
      if (it.use.coin) p.push('盘缠+' + it.use.coin);
      if (it.use.wound) p.push('疗伤-' + it.use.wound + '年');
    }
    return p.length ? p.join(' ') : '';
  }

  function openDeck() {
    $('overlay-map').classList.add('hidden');
    renderDeck();
    $('overlay-deck').classList.remove('hidden');
  }

  function renderDeck() {
    var L = Game.life();
    $('dk-count').textContent = L.deckExtra.length;
    var deck = $('dk-deck'), coll = $('dk-coll');
    deck.innerHTML = ''; coll.innerHTML = '';
    if (!L.deckExtra.length) deck.innerHTML = '<p style="color:var(--ink-faint);font-size:13px">尚未加入卡牌，只带底牌上阵。</p>';
    L.deckExtra.forEach(function (cid, idx) {
      var c = cardOf(cid);
      if (!c) return;
      deck.appendChild(cardChip(c, function () {
        L.deckExtra.splice(idx, 1);
        AudioFX.tick();
        renderDeck();
      }));
    });
    // 收藏按卡聚合，显示持有数；同卡构筑最多 2 张
    var uniq = {}, order = [];
    L.collection.forEach(function (cid) {
      if (!uniq[cid]) { uniq[cid] = 0; order.push(cid); }
      uniq[cid]++;
    });
    if (!order.length) coll.innerHTML = '<p style="color:var(--ink-faint);font-size:13px">收藏空空。爬塔抓牌与商店都能获得新卡。</p>';
    order.forEach(function (cid) {
      var c = cardOf(cid);
      if (!c) return;
      var owned = uniq[cid];
      var inDeck = L.deckExtra.filter(function (x) { return x === cid; }).length;
      var chip = cardChip(c, function () {
        if (L.deckExtra.length >= 10) { Game.toast('构筑已满（10 张），先移除一张'); return; }
        if (inDeck >= 2) { Game.toast('同一张牌至多带 2 张'); return; }
        if (inDeck >= owned) return;
        L.deckExtra.push(cid);
        AudioFX.stamp();
        renderDeck();
      });
      chip.innerHTML = '<b>' + c.name + (owned > 1 ? ' ×' + owned : '') + '</b><small>' + c.cost + ' 费 · ' + c.desc +
        (inDeck ? '（已入组 ' + inDeck + '）' : '') + '</small>';
      coll.appendChild(chip);
    });
  }

  function cardChip(c, onclick) {
    var el = document.createElement('div');
    el.className = 'dk-card r' + c.rarity;
    el.innerHTML = '<b>' + c.name + '</b><small>' + c.cost + ' 费 · ' + c.desc + '</small>';
    el.onclick = onclick;
    return el;
  }

  /* ---------- 装备 / 行囊（环绕式装备栏 + 强化 + 售卖） ---------- */
  var SLOT_NAMES = { weapon: '兵刃', armor: '衣甲', head: '头饰', trinket: '饰品', charm: '法宝' };
  var invTab = 'equip';
  var invCat = 'all';
  var slotSel = null;

  function skillName(sid) {
    for (var i = 0; i < SKILLS.length; i++) if (SKILLS[i].id === sid) return SKILLS[i].name;
    return sid;
  }

  function effStats(it) {
    var lv = (Game.life().forge || {})[it.id] || 0;
    var m = 1 + 0.25 * lv;
    return {
      lv: lv,
      atk: Math.round((it.atk || 0) * m),
      def: Math.round((it.def || 0) * m),
      hp: Math.round((it.hp || 0) * m)
    };
  }

  function openInventory() {
    renderInv();
    $('overlay-inv').classList.remove('hidden');
  }

  function renderInv() {
    var L = Game.life();
    $('inv-coin').textContent = L.coin + ' ' + Game.coinName();
    // 页签
    var tabs = $('inv-tabs').querySelectorAll('.tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].getAttribute('data-itab') === invTab);
      tabs[i].onclick = function () { invTab = this.getAttribute('data-itab'); slotSel = null; AudioFX.tick(0.05); renderInv(); };
    }
    if (invTab === 'equip') renderEquipTab();
    else renderBagTab();
  }

  function renderEquipTab() {
    var L = Game.life();
    $('inv-equip').classList.remove('hidden');
    $('inv-bag').classList.add('hidden');
    // 中央人物名
    $('eq-center-name').textContent = L.name;
    // 五个槽位
    var slots = document.querySelectorAll('.eq-slot');
    slots.forEach(function (slotEl) {
      var slot = slotEl.getAttribute('data-slot');
      var iid = L.equip[slot];
      var it = iid ? Game.item(iid) : null;
      var lv = it ? (L.forge[it.id] || 0) : 0;
      var ico = (it && typeof Assets !== 'undefined') ? '<img class="eq-ico" src="' + Assets.url(it.id + '.png') + '" onerror="this.remove()">' : '';
      slotEl.innerHTML = '<small>' + SLOT_NAMES[slot] + '</small>' + ico + '<b>' + (it ? it.name : '——') + '</b>' +
        (it && lv ? '<i>+' + lv + '</i>' : '');
      slotEl.classList.toggle('filled', !!it);
      slotEl.classList.toggle('sel', slotSel === slot);
      slotEl.onclick = function () {
        if (slotSel === slot) { slotSel = null; }
        else {
          slotSel = slot;
          // 空槽时自动穿上背包里第一件该部位
          if (!L.equip[slot]) {
            var cand = L.inventory.find(function (x) { var t = Game.item(x); return t && t.slot === slot; });
            if (cand) { L.equip[slot] = cand; AudioFX.stamp(); slotSel = null; Game.refresh(); }
          }
        }
        renderInv();
      };
    });
    // 槽位详情
    var detail = $('eq-detail');
    if (!slotSel || !L.equip[slotSel]) { detail.innerHTML = '<p style="color:var(--ink-faint)">点击槽位查看 / 换装 / 强化。空槽点击自动穿上背包中该部位装备。</p>'; return; }
    var iid = L.equip[slotSel];
    var it = Game.item(iid);
    var es = effStats(it);
    var st = [];
    if (es.atk) st.push('攻击+' + es.atk);
    if (es.def) st.push('防御+' + es.def);
    if (es.hp) st.push('生命+' + es.hp);
    var cost = Math.round(it.price * 0.5 * (es.lv + 1));
    detail.innerHTML = '<b>' + it.name + '</b>（' + SLOT_NAMES[it.slot] + ' · 强化 +' + es.lv + '）<br>' +
      '<span style="color:var(--jade)">' + (st.join('　') || '无属性') + '</span>　<span style="color:var(--ink-faint);font-size:12.5px">' + it.desc + '</span>';
    var row = document.createElement('div');
    row.className = 'eq-actions';
    // 强化
    var fbtn = document.createElement('button');
    fbtn.className = 'ink-btn small';
    fbtn.textContent = es.lv >= 5 ? '已满级' : ('强化（' + cost + '）');
    fbtn.disabled = es.lv >= 5 || L.coin < cost;
    fbtn.onclick = function () {
      if (!Game.spendCoin(cost)) return;
      L.forge[it.id] = es.lv + 1;
      AudioFX.stamp();
      Game.toast(it.name + ' 强化至 +' + (es.lv + 1));
      Game.refresh(); renderInv();
    };
    row.appendChild(fbtn);
    // 换下一件
    var others = L.inventory.filter(function (x) { var t = Game.item(x); return t && t.slot === it.slot && x !== iid; });
    if (others.length) {
      var sw = document.createElement('button');
      sw.className = 'ink-btn small';
      sw.textContent = '换下一件';
      sw.onclick = function () {
        var cur = others.indexOf(iid);
        L.equip[it.slot] = others[(cur + 1) % others.length];
        AudioFX.tick(); Game.refresh(); renderInv();
      };
      row.appendChild(sw);
    }
    // 卸下
    var off = document.createElement('button');
    off.className = 'ink-btn small';
    off.textContent = '卸下';
    off.onclick = function () { L.equip[it.slot] = null; slotSel = null; AudioFX.tick(); Game.refresh(); renderInv(); };
    row.appendChild(off);
    detail.appendChild(row);
  }

  function renderBagTab() {
    var L = Game.life();
    $('inv-equip').classList.add('hidden');
    $('inv-bag').classList.remove('hidden');
    var wrap = $('inv-list');
    wrap.innerHTML = '';
    // 分类筛选
    var cats = [['all', '全部'], ['weapon', '兵刃'], ['armor', '衣甲'], ['head', '头饰'], ['trinket', '饰品'], ['charm', '法宝'], ['use', '消耗品']];
    var catBar = document.createElement('div');
    catBar.className = 'bag-cats';
    cats.forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'cat' + (invCat === c[0] ? ' on' : '');
      b.textContent = c[1];
      b.onclick = function () { invCat = c[0]; AudioFX.tick(0.05); renderBagTab(); };
      catBar.appendChild(b);
    });
    wrap.appendChild(catBar);

    var shown = L.inventory.filter(function (iid) {
      var it = Game.item(iid);
      return it && (invCat === 'all' || it.slot === invCat);
    });
    if (!shown.length) {
      var emp = document.createElement('p');
      emp.style.color = 'var(--ink-faint)';
      emp.textContent = L.inventory.length ? '此类暂无物品。' : '囊中空空。';
      wrap.appendChild(emp);
    }
    shown.forEach(function (iid) {
      var idx = L.inventory.indexOf(iid);
      var it = Game.item(iid);
      var es = effStats(it);
      var div = document.createElement('div');
      div.className = 'map-act';
      var statTxt = '';
      if (it.slot === 'use') {
        var pv = itemPreview(it);
        statTxt = pv ? ' <small style="color:var(--jade)">' + pv + '</small>' : '';
      } else {
        statTxt = ' <small style="color:var(--jade)">' +
         (es.atk ? '攻+' + es.atk + ' ' : '') + (es.def ? '防+' + es.def + ' ' : '') + (es.hp ? '血+' + es.hp : '') +
         (it.skill ? ' 技·' + skillName(it.skill) : '') +
         (es.lv ? ' <span style="color:var(--gold)">+' + es.lv + '</span>' : '') + '</small>';
      }
      var equipped = it.slot !== 'use' && L.equip[it.slot] === iid;
      div.innerHTML = '<div class="l-name"><img class="mini-ico" src="' + (typeof Assets !== 'undefined' ? Assets.url(it.id + '.png') : '') + '" onerror="this.remove()">' + it.name + (equipped ? ' <small style="color:var(--cinnabar)">已装备</small>' : '') + statTxt + '</div>' +
        '<div class="l-desc">' + it.desc + '</div>';
      var btnWrap = document.createElement('div');
      btnWrap.style.whiteSpace = 'nowrap';
      // 主按钮
      var btn = document.createElement('button');
      btn.className = 'ink-btn small';
      if (it.slot === 'use') {
        btn.textContent = '使用';
        btn.onclick = function () { Game.useItem(idx); renderInv(); Game.refresh(); };
      } else {
        btn.textContent = equipped ? '卸下' : '装备';
        btn.onclick = function () { Game.toggleEquip(iid); renderInv(); Game.refresh(); };
      }
      btnWrap.appendChild(btn);
      // 售卖（40% 价格）
      if (it.price) {
        var sell = document.createElement('button');
        sell.className = 'ink-btn small';
        sell.style.marginLeft = '6px';
        sell.textContent = '售 ' + Math.round(it.price * 0.4);
        sell.onclick = function () {
          if (L.equip[it.slot] === iid) L.equip[it.slot] = null;
          L.inventory.splice(idx, 1);
          Game.addCoin(Math.round(it.price * 0.4));
          AudioFX.tick();
          Game.toast('售出「' + it.name + '」');
          renderInv(); Game.refresh();
        };
        btnWrap.appendChild(sell);
      }
      // 丢弃
      var del = document.createElement('button');
      del.className = 'ink-btn small';
      del.style.marginLeft = '6px';
      del.textContent = '丢弃';
      del.onclick = function () {
        if (!confirm('确定丢弃「' + it.name + '」？')) return;
        if (L.equip[it.slot] === iid) L.equip[it.slot] = null;
        L.inventory.splice(idx, 1);
        AudioFX.tick(0.06);
        renderInv(); Game.refresh();
      };
      btnWrap.appendChild(del);
      div.appendChild(btnWrap);
      wrap.appendChild(div);
    });
  }

  return { open: open, openInventory: openInventory, openDeck: openDeck };
})();
