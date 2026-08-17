// 书中界（小说穿越）事件：武侠 / 无限流 / 霸总 / 末世
var EVENTS_NOVEL = [

// ========== 入界事件（pool: life） ==========

{
  id: 'ev_n_wuxia_in1',
  age: [16, 45],
  pool: 'life',
  weight: 1,
  once: true,
  big: true,
  kind: 'fate',
  cond: { chance: 0.12, notFlags: ['has_box', 'world_wuxia'] },
  text: '你熬夜追一本武侠小说，看到主角跳崖时一口气没上来，眼前一黑。再睁眼，你躺在崖底，手边一本泛黄的《太玄经》，脑子里多了一段不属于你的记忆。',
  effect: { setPool: 'novel_wuxia', setRoute: 'novel', setAge: 16, setFlags: ['world_wuxia'], spr: 2 }
},
{
  id: 'ev_n_wuxia_in2',
  age: [16, 45],
  pool: 'life',
  weight: 1,
  once: true,
  big: true,
  kind: 'fate',
  cond: { chance: 0.12, notFlags: ['has_box', 'world_wuxia'] },
  text: '一场车祸后，你在一阵唢呐声中醒来，发现自己成了武林世家里那个"活不过三章"的病弱少爷。既来之，则练之。',
  effect: { setPool: 'novel_wuxia', setRoute: 'novel', setAge: 16, setFlags: ['world_wuxia'] }
},
{
  id: 'ev_n_wuxian_in1',
  age: [18, 45],
  pool: 'life',
  weight: 1,
  once: true,
  big: true,
  kind: 'fate',
  cond: { chance: 0.12, notFlags: ['has_box', 'world_wuxian'] },
  text: '深夜，手机弹出一行血红的字："想明白生命的意义吗？想真正地……活着吗？"你鬼使神差点了"是"，白光闪过，你已站在一片纯白空间里。',
  effect: { setPool: 'novel_wuxian', setRoute: 'novel', setAge: 18, setFlags: ['world_wuxian'] }
},
{
  id: 'ev_n_wuxian_in2',
  age: [18, 45],
  pool: 'life',
  weight: 1,
  once: true,
  big: true,
  kind: 'fate',
  cond: { chance: 0.12, notFlags: ['has_box', 'world_wuxian'] },
  text: '电梯在五楼和六楼之间停住了，灯灭了三秒。灯再亮时，电梯里多了七个陌生人，广播响起："欢迎各位玩家进入副本。"',
  effect: { setPool: 'novel_wuxian', setRoute: 'novel', setAge: 18, setFlags: ['world_wuxian'] }
},
{
  id: 'ev_n_bazong_in1',
  age: [18, 45],
  pool: 'life',
  weight: 1,
  once: true,
  big: true,
  kind: 'fate',
  cond: { chance: 0.12, notFlags: ['has_box', 'world_bazong'] },
  text: '你发帖吐槽某霸总文"狗血淋头、逻辑喂狗"，当晚被一道雷劈中。醒来时，管家恭敬地递上黑卡："夫人，总裁让您别再用体温给文件升温了。"',
  effect: { setPool: 'novel_bazong', setRoute: 'novel', setAge: 22, setFlags: ['world_bazong'] }
},
{
  id: 'ev_n_moshi_in1',
  age: [18, 45],
  pool: 'life',
  weight: 1,
  once: true,
  big: true,
  kind: 'fate',
  cond: { chance: 0.12, notFlags: ['has_box', 'world_moshi'] },
  text: '睡前你还在看末世文吐槽主角囤粮太慢，醒来时窗外传来嘶吼，新闻里主持人话说到一半就开始变异。你摸了摸床头的棒球棍，还好，不是手无寸铁。',
  effect: { setPool: 'novel_moshi', setRoute: 'novel', setAge: 20, setFlags: ['world_moshi'] }
},
{
  id: 'ev_n_moshi_in2',
  age: [18, 45],
  pool: 'life',
  weight: 1,
  once: true,
  big: true,
  kind: 'fate',
  cond: { chance: 0.12, notFlags: ['has_box', 'world_moshi'] },
  text: '你在丧尸口中咽气，再睁眼竟回到末世爆发前三天。这一世，你熟读剧情，知道每一波尸潮的时间——以及超市哪排货架的罐头最值钱。',
  effect: { setPool: 'novel_moshi', setRoute: 'novel', setAge: 20, setFlags: ['world_moshi'], int: 1, mny: 1 }
},

// ========== 武侠世界（novel_wuxia，16-46岁） ==========

{
  id: 'ev_n_wuxia_cliff',
  age: [16, 20],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  big: true,
  text: '你被仇家追至断魂崖边，身后万丈深渊云雾翻涌。你忽然想起：在这本书里，跳崖的主角死亡率是零。',
  choices: [
    { text: '跳！主角跳崖必有机缘', effect: { attr: { int: 2, str: 1, luk: 2 }, setFlags: ['wuxia_miji'] }, result: '崖底藤蔓接住了你，石洞里躺着一具骷髅和半部《九霄剑诀》。你对骷髅磕了三个响头：前辈，这挂我收下了。', kind: 'good' },
    { text: '回头拼命', effect: { attr: { str: -2, spr: -1 } }, result: '你寡不敌众被打落山崖，挂在歪脖子树上躺了半个月。仇家以为你死了，也算因祸得福。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_wuxia_laoren',
  age: [16, 24],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  kind: 'good',
  text: '山神庙里，你救下一位奄奄一息的白发老者。老者摸完你的骨，眼睛一亮："百年难遇的练武奇才！"不由分说把一甲子内力灌进了你体内。',
  effect: { attr: { str: 2, int: 1 }, spr: 1 }
},
{
  id: 'ev_n_wuxia_baike',
  age: [18, 28],
  pool: 'novel_wuxia',
  weight: 10,
  text: '悦来客栈里，江湖百晓生摇着扇子凑过来："少侠，十条消息一两银子，买不了吃亏。"',
  choices: [
    { text: '买！情报就是实力', cond: { attr: { mny: { gte: 4 } } }, effect: { attr: { int: 1, mny: -1, luk: 1 } }, result: '你得知三日后黑风寨要劫官银，提前报官领了赏钱，还顺手在江湖上混了个好名声。', kind: 'good' },
    { text: '蹭听说书就行', effect: { attr: { spr: 1 } }, result: '你白嫖了一下午《三侠五义》，听得津津有味，就是鞋底被小二盯得发毛。', kind: 'good' }
  ]
},
{
  id: 'ev_n_wuxia_yaonv',
  age: [20, 30],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '魔教圣女掀翻你的茶桌，红衣似火："听说你要替天行道？"她剑尖离你咽喉只有三寸，眼睛却在笑。',
  choices: [
    { text: '劝她弃暗投明', cond: { attr: { chr: { gte: 6 } } }, effect: { attr: { spr: 2, chr: 1 } }, result: '三个月后，圣女叛出魔教，江湖传言她是被一个"满口大道理的家伙"拐跑的。', kind: 'good', big: true },
    { text: '拔剑相向', effect: { attr: { str: -1, spr: -1 } }, result: '大战三百回合，谁也奈何不了谁。她收剑时丢下一句"有点意思"，你后背已被冷汗浸透。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_wuxia_dabi',
  age: [18, 26],
  pool: 'novel_wuxia',
  weight: 10,
  once: true,
  text: '门派大比如期而至，你一路打进决赛，对手是掌门亲传的大师兄。',
  effect: { attr: { str: 1, spr: 'rand:-1~2' } },
  kind: 'good'
},
{
  id: 'ev_n_wuxia_zhujian',
  age: [22, 34],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '铸剑山庄庄主放出话来：谁能拔出炉中那柄百年玄铁剑，剑便归谁。',
  choices: [
    { text: '上前拔剑', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { str: 1, spr: 1, luk: 1 } }, result: '玄铁剑出鞘的瞬间龙吟震天，庄主抚须大笑："此剑等你百年了。"', kind: 'good', big: true },
    { text: '自知臂力不足，围观就好', effect: { attr: { spr: 1 } }, result: '一个莽汉拔剑闪了腰，全场哄笑。你笑得最大声，被他追出二里地，轻功倒是精进不少。', kind: 'good' }
  ]
},
{
  id: 'ev_n_wuxia_jiefu',
  age: [20, 36],
  pool: 'novel_wuxia',
  weight: 10,
  text: '途经青州，知府贪腐民不聊生，他的银库今夜只有八个护院看守。',
  choices: [
    { text: '劫富济贫', effect: { attr: { spr: 2, mny: 1, luk: -1 } }, result: '一夜之间青州百姓门前都多了碎银，你的画像贴满城门——悬赏五百两，画得像头熊。', kind: 'good' },
    { text: '多一事不如少一事', effect: { attr: { spr: -1 } }, result: '你绕道而行，只是很久之后想起青州饿殍，心里仍会咯噔一下。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_wuxia_mijing',
  age: [24, 38],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  cond: { attr: { luk: { gte: 5 } } },
  kind: 'good',
  text: '大漠深处，失传百年的"楼兰秘境"三十年一开，而你恰好握有半块开启秘境的虎符。',
  effect: { attr: { int: 2, mny: 2, str: 1 } }
},
{
  id: 'ev_n_wuxia_beipan',
  age: [20, 32],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '你最信任的师弟偷走你的剑谱投敌，还反手诬告你私通魔教。掌门罚你面壁思过一年。',
  effect: { attr: { spr: -2, int: 1 } }
},
{
  id: 'ev_n_wuxia_zouhuo',
  age: [22, 40],
  pool: 'novel_wuxia',
  weight: 6,
  kind: 'bad',
  text: '你强行冲击任督二脉，真气逆行，一口血喷在墙上画出一幅抽象画。',
  effect: { attr: { str: -2, spr: -1 } }
},
{
  id: 'ev_n_wuxia_wugong',
  age: [26, 40],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  kind: 'good',
  text: '十年苦修，你终于悟出属于自己的剑意。剑出无声，落叶两半——江湖从此有了你的传说。',
  effect: { attr: { str: 2, int: 1, spr: 2 } },
  big: true
},
{
  id: 'ev_n_wuxia_biaojv',
  age: [30, 44],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '厌倦了打打杀杀，你琢磨着金盆洗手。有人邀你合伙开镖局，也有人劝你归隐山林。',
  choices: [
    { text: '开镖局，走南闯北', effect: { attr: { mny: 2, spr: 1 } }, result: '"镇远镖局"的旗号三年内响彻十三省，黑白两道都要给你三分薄面。', kind: 'good', big: true },
    { text: '归隐山林种竹子', effect: { attr: { spr: 2, mny: -1 } }, result: '你在竹林里盖了间草庐，终日煮茶听雨。江湖少了位侠客，山里多了位闲人。', kind: 'good' }
  ]
},
{
  id: 'ev_n_wuxia_mengzhu',
  age: [34, 46],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  cond: { attr: { str: { gte: 6 }, spr: { gte: 4 } } },
  text: '少林寺前，三十六派联名推举你出任武林盟主。推辞三次之后，你"勉为其难"地接了金印。',
  effect: { attr: { mny: 2, spr: 2, chr: 1 } }
},
{
  id: 'ev_n_wuxia_lunjian',
  age: [30, 46],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  big: true,
  text: '十年一度的华山论剑开幕，东邪西毒南帝北丐……的后人们都来了。请帖上，你的名字排在第三。',
  choices: [
    { text: '全力争这天下第一', cond: { attr: { str: { gte: 7 } } }, effect: { attr: { str: 1, spr: 2, luk: 1 } }, result: '大战七日七夜，你一剑挑落论剑碑顶的积雪，自此"天下第一"四个字有了归属。', kind: 'good', big: true },
    { text: '点到为止，重在参与', effect: { attr: { spr: 1, int: 1 } }, result: '你与各路高手切磋十余场，虽未夺魁，却偷学了七八门绝学的影子，血赚。', kind: 'good' }
  ]
},
{
  id: 'ev_n_wuxia_win',
  age: [40, 46],
  pool: 'novel_wuxia',
  weight: 4,
  once: true,
  big: true,
  kind: 'fate',
  text: '华山之巅，你望着云海翻涌。这一生从崖底无名之辈到武林泰斗，该拿的拿了，该放的也放下了。',
  choices: [
    { text: '破碎虚空，武极登仙', effect: { setFlags: ['wuxia_win'], kill: true, deathText: '于华山之巅破碎虚空，江湖只留下一段传说' }, result: '你一剑斩开虚空，霞光万道。后世弟子只知祖师爷"羽化登仙"那日，满山桃花一夜尽开。', kind: 'good', big: true },
    { text: '笑看风云，含笑而终', effect: { setFlags: ['wuxia_win'], kill: true, deathText: '一代武林泰斗，百岁寿宴上含笑而逝' }, result: '百岁寿宴那日，三千弟子齐聚。你饮尽杯中酒，大笑三声，溘然长逝。', kind: 'good', big: true }
  ]
},

// ========== 无限流世界（novel_wuxian，18-48岁） ==========

{
  id: 'ev_n_wuxian_fuben1',
  age: [18, 22],
  pool: 'novel_wuxian',
  weight: 10,
  once: true,
  big: true,
  text: '第一个副本：午夜医院。任务是在住院部活到天亮，而走廊尽头的404病房，每到整点就会多出一张床。',
  choices: [
    { text: '苟在安全区数秒针', effect: { attr: { int: 1, spr: -1 } }, result: '你蜷在护士站台灯下背了一整夜规则，天亮时评分B。命保住了，就是落了个"苟王"的外号。', kind: 'good' },
    { text: '夜探404病房', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 2, str: -1, luk: 1 } }, result: '你发现多出的病床是鬼怪的"签到表"，反手撕了它。副本崩塌，评分S，首杀通告响彻全服。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n_wuxian_duihuan',
  age: [19, 30],
  pool: 'novel_wuxian',
  weight: 10,
  text: '回到主神空间，你攥着几千奖励点站在兑换光柱前，琳琅满目的强化列表看得你眼晕。',
  choices: [
    { text: '强化体质，活着才有输出', effect: { attr: { str: 2, mny: -1 } }, result: '一阵暖流冲刷全身，你现在的体质能硬抗小轿车追尾。', kind: 'good' },
    { text: '全换情报和道具', effect: { attr: { int: 2, mny: -1 } }, result: '你背熟了接下来三个副本的攻略，队友看你的眼神像看一个人形外挂。', kind: 'good' }
  ]
},
{
  id: 'ev_n_wuxian_zishen',
  age: [18, 26],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '资深者把新人当炮灰探路，这次轮到了你。他狞笑着把你推向那扇写着"勿入"的门。',
  choices: [
    { text: '将计就计反将一军', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '你假装被推入，反手拽住他的脚踝。门后伸出什么东西把他拖了进去，你礼貌地帮门带上了。', kind: 'good' },
    { text: '忍气吞声照做', effect: { attr: { str: -1, spr: -2 } }, result: '你探完路活着回来，但那种被当成耗材的滋味，你记了很多年。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_wuxian_tuanzhan',
  age: [22, 34],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '团战副本开启：两支队伍，只有一支能走出这座孤岛。对面的队长，据说已经连胜十一场。',
  effect: { attr: { str: 1, spr: 'rand:-2~2' } }
},
{
  id: 'ev_n_wuxian_daoju',
  age: [20, 36],
  pool: 'novel_wuxian',
  weight: 5,
  once: true,
  kind: 'good',
  cond: { attr: { luk: { gte: 6 } } },
  text: '副本结算时金光一闪——S级道具【复活十字架】！整个主神空间的公告栏为你滚动播放了三遍。',
  effect: { attr: { luk: 1, spr: 2, mny: 1 } },
  big: true
},
{
  id: 'ev_n_wuxian_beipan',
  age: [20, 32],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '生死关头，平日称兄道弟的队友抢走了你唯一的通关道具，头也不回地冲进了安全门。',
  effect: { attr: { spr: -2, str: -1, int: 1 } }
},
{
  id: 'ev_n_wuxian_guize',
  age: [20, 34],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '规则怪谈副本：宿舍楼守则十三条，其中三条是谎言。违反真规则会死，遵守假规则也会死。',
  choices: [
    { text: '逐条逻辑推演', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2, spr: 1 } }, result: '你指出"守则第十一条"的墨迹比其他的新——那是它刚写的。楼里响起一声不甘的叹息，天亮了。', kind: 'good', big: true },
    { text: '一条都不遵守试试', effect: { attr: { str: -2, spr: -1 } }, result: '你活着出来了，代价是三天没敢合眼，现在看到"守则"两个字就手抖。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_wuxian_youlun',
  age: [24, 38],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  text: '恐怖游轮副本：你在同一天循环了四十七次，每次都在甲板上看到自己的尸体。',
  choices: [
    { text: '杀死"自己"打破循环', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { str: 1, int: 1, spr: -1 } }, result: '刀刃落下的瞬间循环崩解。你通关了，但从此不敢照镜子太久。', kind: 'good', big: true },
    { text: '找出循环的源头', cond: { attr: { int: { gte: 7 } } }, effect: { attr: { int: 2 } }, result: '第四十八次循环，你烧掉了船舱里那面落地镜。海雾散去，朝阳是真的。', kind: 'good' }
  ]
},
{
  id: 'ev_n_wuxian_mengxin',
  age: [24, 40],
  pool: 'novel_wuxian',
  weight: 10,
  text: '副本里一个萌新吓得腿软，瘫在怪物刷新点上哭。救她会暴露你的位置。',
  choices: [
    { text: '救！谁还不是从萌新过来的', effect: { attr: { spr: 2, str: -1 } }, result: '你拖着她跑了半条街。后来她成了排行榜前十的"影刃"，逢人便说命是你给的。', kind: 'good', big: true },
    { text: '自身难保，爱莫能助', effect: { attr: { spr: -2 } }, result: '惨叫声停了。你活了下来，只是每次结算界面亮起，都会想起那个坐标。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_wuxian_xuetong',
  age: [26, 40],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'good',
  text: '你咬牙兑换了中级血族血统。改造仓开启时，你照镜子发现自己帅得有点不像人了。',
  effect: { attr: { chr: 2, str: 2, spr: 1 } }
},
{
  id: 'ev_n_wuxian_yincang',
  age: [22, 36],
  pool: 'novel_wuxian',
  weight: 8,
  text: '副本角落，你发现墙上一道不属于场景贴图的裂缝——隐藏任务的入口。',
  choices: [
    { text: '钻进去看看', cond: { attr: { luk: { gte: 4 } } }, effect: { attr: { mny: 2, int: 1 } }, result: '隐藏任务的奖励是常规的三倍，你数奖励点数到手抽筋。', kind: 'good' },
    { text: '未知等于危险，不碰', effect: { attr: { spr: 1 } }, result: '你稳字当头拿了保底奖励。苟得万年船，也是一种通关哲学。', kind: 'good' }
  ]
},
{
  id: 'ev_n_wuxian_duizhang',
  age: [28, 44],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  big: true,
  kind: 'bad',
  text: '带你入行、替你挡过刀的队长，在最终BOSS战里把最后一支治疗药剂推给了你。他的头像，永远灰了下去。',
  effect: { attr: { spr: -3, str: 1, int: 1 } }
},
{
  id: 'ev_n_wuxian_gaojie',
  age: [30, 46],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'good',
  big: true,
  text: '你的编号从白色变成金色——高阶玩家。主神空间的萌新们开始流传你的通关录像，标题叫《教科书级操作》。',
  effect: { attr: { str: 1, int: 1, spr: 2, mny: 1 } }
},
{
  id: 'ev_n_wuxian_qianye',
  age: [34, 48],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '最终副本的倒计时出现在视网膜上：72小时。老队友们难得聚齐，在主神空间开了最后一顿火锅。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n_wuxian_win',
  age: [35, 48],
  pool: 'novel_wuxian',
  weight: 4,
  once: true,
  big: true,
  kind: 'fate',
  text: '最终副本通关。主神罕见地亲自现身："你是本空间有史以来评分最高的玩家。许愿吧——留在主神空间执掌规则，或者，带着全部强化回归现实。"',
  choices: [
    { text: '留下，成为新的主神', effect: { setFlags: ['wuxian_win'], kill: true, deathText: '通关最终副本，化身主神空间新的执掌者' }, result: '你接过光球，从此端坐空间中央。无数玩家的生死副本里，都藏着一双温柔注视的眼睛。', kind: 'good', big: true },
    { text: '回归现实，人间值得', effect: { setFlags: ['wuxian_win'], setPool: 'life', setAge: 18, attr: { str: 2, int: 2, luk: 1 } }, result: '白光散去，你回到穿越前那部电梯里，时间只过了三秒。但你的眼神、体魄和胆识，都已脱胎换骨。', kind: 'good', big: true }
  ]
},

// ========== 霸总文世界（novel_bazong，22-52岁） ==========

{
  id: 'ev_n_bazong_qiyue',
  age: [22, 26],
  pool: 'novel_bazong',
  weight: 10,
  once: true,
  big: true,
  text: '厉氏集团总裁厉承烨把一份协议拍在你面前："契约婚姻，一年三千万，不许动心。"他推眼镜的样子，像极了书里写的二百五。',
  choices: [
    { text: '签！谈感情多伤钱', effect: { attr: { mny: 3, spr: 1 }, setFlags: ['bazong_contract'] }, result: '你在"乙方"处龙飞凤舞签下大名。不就是演戏吗，你上辈子可是看过八百章的人。', kind: 'good', big: true },
    { text: '当场撕协议走人', effect: { attr: { spr: 2, mny: -1, chr: 1 } }, result: '纸屑纷飞中你扬长而去。厉承烨盯着你的背影："很好，你是第一个敢撕我协议的人。"——完了，剧情开始了。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n_bazong_bidong',
  age: [22, 30],
  pool: 'novel_bazong',
  weight: 10,
  once: true,
  text: '走廊拐角，你被一只手臂拦住去路。厉承烨单手撑墙把你圈住："女人，你成功引起了我的注意。"',
  choices: [
    { text: '"注意费结一下，谢谢。"', effect: { attr: { mny: 1, spr: 2 } }, result: '他愣了三秒，竟然真的掏出支票本。你忽然觉得这霸总还有救。', kind: 'good' },
    { text: '抬膝，格挡，转身走人', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { spr: 1, str: 1 } }, result: '厉总捂着肚子滑坐在地，第二天全公司都在传总裁"闪了腰"。', kind: 'good' }
  ]
},
{
  id: 'ev_n_bazong_yanhui',
  age: [24, 34],
  pool: 'novel_bazong',
  weight: 10,
  once: true,
  text: '豪门宴会上，几位名媛把你围在中间阴阳怪气："听说你以前是摆地摊的？"',
  choices: [
    { text: '优雅打脸', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 2, chr: 1 } }, result: '你笑着报出她们各自家族的股价跌幅，精确到小数点后两位。宴会厅安静得能听见香槟冒泡。', kind: 'good', big: true },
    { text: '懒得理会，专心吃席', effect: { attr: { spr: 1, str: 1 } }, result: '你一人炫完了三盘澳洲龙虾。名媛们气得跳脚，你吃得心满意足。', kind: 'good' }
  ]
},
{
  id: 'ev_n_bazong_baiyueguang',
  age: [26, 36],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  big: true,
  text: '热搜爆了：厉承烨的白月光初恋回国，机场照里两人"相谈甚欢"。全城的瓜农都在等你哭闹。',
  choices: [
    { text: '当面问清楚', effect: { attr: { spr: 1, int: 1 } }, result: '厉承烨把聊天记录怼到你眼前——他全程只说了三句话，其中两句是"我夫人会不高兴"。', kind: 'good', big: true },
    { text: '收拾行李先发制人', effect: { attr: { spr: -1, mny: 1 } }, result: '你连夜搬进酒店。凌晨三点，某人开着直升机在酒店顶楼举着喇叭道歉，全城的狗都醒了。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n_bazong_popo',
  age: [24, 32],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '婆婆把一张支票推过桌面："五百万，离开我儿子。"茶都没给你倒一杯。',
  choices: [
    { text: '"阿姨，这是一千万，您离开他。"', cond: { attr: { mny: { gte: 5 } } }, effect: { attr: { spr: 2, mny: -1 } }, result: '婆婆盯着支票看了十秒，忽然笑了："有意思，这儿媳我认了。"', kind: 'good', big: true },
    { text: '收下支票，回头转账给厉承烨', effect: { attr: { mny: 1, int: 1 } }, result: '厉承烨收到转账备注"你妈给的分手费"，连夜召开家庭会议。此后婆婆见你绕着走。', kind: 'good' }
  ]
},
{
  id: 'ev_n_bazong_nvpei',
  age: [23, 33],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '恶毒女配林小姐"不小心"把红酒泼在你的高定礼服上，还捂着嘴惊呼："哎呀，这裙子看起来也不贵嘛。"',
  choices: [
    { text: '微笑着泼回去', effect: { attr: { spr: 2 } }, result: '两杯红酒同时泼出。第二天头条：《双姝斗艳，红酒成双》。你的股票涨了，她的代言掉了。', kind: 'good' },
    { text: '记下这笔账', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, mny: 2 } }, result: '三个月后，你收购了她家公司的供应链。复仇这道菜，确实凉了更好吃。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n_bazong_weiji',
  age: [28, 40],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '厉氏集团遭遇做空狙击，股价三天跌去两成，董事会上人人自危。',
  choices: [
    { text: '连夜操盘反击', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { mny: 3, int: 1, spr: 1 } }, result: '你精准抄底反手拉爆空头，一战封神。财经媒体称你为"厉氏背后的那只手"。', kind: 'good', big: true },
    { text: '稳住后方，相信专业团队', effect: { attr: { mny: -1, spr: 1 } }, result: '危机平稳度过。庆功宴上厉承烨举杯："我夫人说了，专业的事交给专业的人。"', kind: 'good' }
  ]
},
{
  id: 'ev_n_bazong_daiqiu',
  age: [26, 36],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '你发现自己怀孕了，而电视里正播着厉承烨和当红影星的"绯闻"。按照原书剧情，你该带着球跑路了。',
  choices: [
    { text: '跑！剧情之力不可违', effect: { attr: { spr: -1, mny: 1 } }, result: '你跑到三亚第三天，厉承烨包下整座海岛广播寻人，顺便把绯闻告到了法院。带球跑，宣告失败。', kind: 'good', big: true },
    { text: '把化验单拍他脸上', effect: { attr: { spr: 2 } }, result: '厉总盯着化验单石化三分钟，然后宣布集团放假一天。绯闻？律师函已经发出去了。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n_bazong_shiyi',
  age: [28, 40],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  kind: 'bad',
  text: '一场车祸后厉承烨失忆了，记忆停留在十八岁——那个还没认识你、也还没学会说土味情话的年纪。',
  effect: { attr: { spr: -2, str: -1 } }
},
{
  id: 'ev_n_bazong_shougou',
  age: [30, 44],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'good',
  text: '你主导收购了对家集团。签字仪式上，对家老董事长握着你的手："长江后浪推前浪啊。"',
  effect: { attr: { mny: 3, int: 1 } },
  big: true
},
{
  id: 'ev_n_bazong_feiwen',
  age: [24, 38],
  pool: 'novel_bazong',
  weight: 10,
  text: '狗仔偷拍到你和一位年轻导演"深夜密会"，热搜第一后面跟着一个紫红的"爆"字。',
  choices: [
    { text: '开直播澄清', effect: { attr: { spr: 1, chr: 1 } }, result: '你直播放出完整监控——你们在谈一部反诈公益片。当晚涨粉三百万，导演的新片未拍先火。', kind: 'good' },
    { text: '让法务部加班', cond: { attr: { mny: { gte: 4 } } }, effect: { attr: { mny: -1, spr: 1 } }, result: '第二天，造谣的营销号整整齐齐地挂出了道歉声明，字体大小都一模一样。', kind: 'good' }
  ]
},
{
  id: 'ev_n_bazong_cishan',
  age: [28, 46],
  pool: 'novel_bazong',
  weight: 10,
  kind: 'good',
  text: '慈善晚宴上，你匿名捐建的第一百所乡村小学落成。主持人念到你的化名时，台下厉承烨鼓掌鼓得最大声。',
  effect: { attr: { spr: 2, mny: -1, chr: 1 } }
},
{
  id: 'ev_n_bazong_shenshi',
  age: [30, 42],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  big: true,
  kind: 'fate',
  text: '一份DNA报告揭开身世之谜：你是被抱错的真千金，而霸占你身份的假千金，正准备开记者会"原谅"你。',
  effect: { attr: { mny: 2, spr: 1, int: 1 } }
},
{
  id: 'ev_n_bazong_dongshi',
  age: [34, 50],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  big: true,
  text: '董事会上，几位元老联合发难，要求罢免你的执行董事职务。厉承烨坐在主位，似笑非笑地看戏。',
  choices: [
    { text: '亮出股权书反杀', cond: { attr: { mny: { gte: 6 } } }, effect: { attr: { mny: 2, spr: 2 } }, result: '你持股百分之三十一的消息一出，会议室落针可闻。散会后厉承烨鼓掌："我夫人藏得够深。"', kind: 'good', big: true },
    { text: '退一步，放长线', effect: { attr: { int: 1, spr: -1 } }, result: '你主动让出职务，半年后那几位元老因内幕交易被带走。你接手时，连椅子都没换。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n_bazong_win',
  age: [40, 52],
  pool: 'novel_bazong',
  weight: 4,
  once: true,
  big: true,
  kind: 'fate',
  text: '世纪婚礼十周年，厉氏集团登顶世界五百强。财经杂志的封面标题是：《最好的爱情，是势均力敌》。',
  effect: { setFlags: ['bazong_win'], kill: true, deathText: '与挚爱携手一生，在万亿身家与满堂儿孙中含笑而逝' }
},

// ========== 末世文世界（novel_moshi，20-50岁） ==========

{
  id: 'ev_n_moshi_yineng',
  age: [20, 23],
  pool: 'novel_moshi',
  weight: 10,
  once: true,
  big: true,
  kind: 'fate',
  text: '高烧三天三夜后，你觉醒了。指尖萦绕的能量在末世里比黄金还金贵——关键是，选哪条路走？',
  choices: [
    { text: '雷系异能，输出拉满', effect: { attr: { str: 2, chr: 1 }, setFlags: ['moshi_power'] }, result: '你指尖劈出的第一道雷把三只丧尸劈成了碳。营地的人看你的眼神，像看一根人形避雷针。', kind: 'good', big: true },
    { text: '空间异能，囤货之王', effect: { attr: { mny: 2, int: 1 }, setFlags: ['moshi_power'] }, result: '你的随身空间有三百立方，当别人为半瓶水拼命时，你在空间里涮火锅。', kind: 'good', big: true },
    { text: '治愈异能，末世菩萨', effect: { attr: { spr: 2, chr: 1 }, setFlags: ['moshi_power'] }, result: '你治好了队长的断腿。从此所有队伍抢着要你——末世里，奶妈才是硬通货。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n_moshi_tunhuo',
  age: [20, 26],
  pool: 'novel_moshi',
  weight: 10,
  text: '秩序崩坏前夜，你握着全部积蓄站在批发市场门口。囤货清单在你脑子里滚了八百遍。',
  choices: [
    { text: '梭哈！米面粮油加药品', effect: { attr: { mny: 1, int: 1 } }, result: '末世第三个月，你的物资储备让一支武装小队主动来投。仓库，就是末世里的王座。', kind: 'good' },
    { text: '留一半钱观察形势', effect: { attr: { mny: -1, spr: -1 } }, result: '物价一天涨十倍，你攥着钞票站在空货架前，深刻理解了什么叫"纸就是纸"。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_moshi_shichao',
  age: [21, 34],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  big: true,
  kind: 'bad',
  text: '警报响彻营地：三万规模的尸潮正朝这边移动，黑压压的像一片会移动的坟场。预计六小时后抵达。',
  effect: { attr: { str: -2, spr: -1 } }
},
{
  id: 'ev_n_moshi_jidi',
  age: [22, 30],
  pool: 'novel_moshi',
  weight: 10,
  once: true,
  kind: 'good',
  text: '历经千辛万苦，你率队抵达"曙光基地"——高墙、电网、瞭望塔，城门口的大字写着：秩序即生命。',
  effect: { attr: { spr: 2, str: 1 } }
},
{
  id: 'ev_n_moshi_soujiu',
  age: [23, 36],
  pool: 'novel_moshi',
  weight: 8,
  text: '无线电里传来求救信号：三十公里外的超市仓库，六名幸存者被尸群围困，弹尽粮绝。',
  choices: [
    { text: '带队营救', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { spr: 2, str: 1, luk: 1 } }, result: '你带队杀出一条血路。被救的六人里有一位病毒学教授——这份人情，日后值一座基地。', kind: 'good', big: true },
    { text: '风险太大，不予理会', effect: { attr: { spr: -2 } }, result: '三天后信号消失了。基地例会上没人提这件事，但每个人都在想。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_moshi_shengji',
  age: [24, 40],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'good',
  text: '猎杀变异体得来的晶核在掌心融化，你的异能突破到了四阶。整个基地，四阶强者不超过五指之数。',
  effect: { attr: { str: 2, spr: 1 } }
},
{
  id: 'ev_n_moshi_renxing',
  age: [24, 38],
  pool: 'novel_moshi',
  weight: 10,
  text: '深夜，你撞见两个队员在偷基地的公共粮仓。他们跪地求饶，说家里孩子已经饿了两天。',
  choices: [
    { text: '按规矩处置，但自掏腰包补上', effect: { attr: { int: 1, spr: 1, mny: -1 } }, result: '你在公告栏写下："偷粮者罚，饿殍者救——从今日起设救济仓。"基地的凝聚力，肉眼可见地涨了。', kind: 'good', big: true },
    { text: '睁一只眼闭一只眼', effect: { attr: { spr: -1, int: -1 } }, result: '粮仓失窃案越来越多。规矩一旦有了裂缝，溃堤只是时间问题。', kind: 'bad' }
  ]
},
{
  id: 'ev_n_moshi_sangshiwang',
  age: [28, 44],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  big: true,
  text: '侦察兵拼死带回消息：尸潮背后有一只"丧尸王"，已有初步智慧，正在收拢方圆百里的尸群。',
  choices: [
    { text: '斩首行动，直取尸王', cond: { attr: { str: { gte: 7 } } }, effect: { attr: { str: 2, spr: 2, luk: 1 } }, result: '你带十二名死士夜袭尸巢，一战斩王。失去指挥的尸群作鸟兽散，你的名字成了末世的传说。', kind: 'good', big: true },
    { text: '加固城防，固守待变', effect: { attr: { int: 1, str: -1 } }, result: '基地挺过了七波围攻，伤亡惨重但城墙未破。活下来的每个人，都学会了在战壕里睡觉。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n_moshi_shiyan',
  age: [26, 42],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  text: '废弃的地下实验室里，你找到了病毒爆发的原始档案——这场末世，不是天灾。',
  choices: [
    { text: '带走全部资料', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2, luk: 1 } }, result: '档案里有病毒的完整基因序列。距离解药，人类第一次这么近。', kind: 'good', big: true },
    { text: '拍照留证，原样封存', effect: { attr: { int: 1, spr: -1 } }, result: '有些真相太沉重，你决定让它再多睡一会儿。', kind: 'good' }
  ]
},
{
  id: 'ev_n_moshi_neidou',
  age: [26, 44],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '副首领拉拢了一批人发难，指责你"独断专行"。会议室里的空气，比外面的尸潮还让人窒息。',
  effect: { attr: { spr: -2, mny: -1 } }
},
{
  id: 'ev_n_moshi_anquanqu',
  age: [30, 48],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  big: true,
  kind: 'good',
  text: '在你主持下，三座基地连成一片，方圆五十里清剿完毕——末世以来第一个"安全区"宣告成立。孩子们重新背起了书包。',
  effect: { attr: { spr: 3, mny: 2, chr: 1 } }
},
{
  id: 'ev_n_moshi_kongtou',
  age: [22, 38],
  pool: 'novel_moshi',
  weight: 10,
  text: '一架不明势力的运输机掠过头顶，三个空投箱正缓缓落在两伙幸存者的中间地带。',
  choices: [
    { text: '先下手为强', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { mny: 2, str: -1 } }, result: '你抢先一步拖走两个箱子：药品、罐头、还有一台柴油发电机。对方气得朝天鸣枪。', kind: 'good' },
    { text: '喊话谈判，五五分账', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 1, spr: 1 } }, result: '两方在枪口下完成分赃，还互通了情报。末世里，多一个不打你的邻居就是赚了。', kind: 'good' }
  ]
},
{
  id: 'ev_n_moshi_shouchao',
  age: [28, 46],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  kind: 'bad',
  text: '变异的兽群在冬夜袭击了外围农场，粮食减产四成。这个冬天，注定难熬。',
  effect: { attr: { str: -2, mny: -2 } }
},
{
  id: 'ev_n_moshi_xueqing',
  age: [34, 50],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  cond: { attr: { int: { gte: 6 } } },
  text: '实验室的白炽灯亮了整整一百天。当第一支血清在培养皿中稳定下来的那一刻，整个基地的欢呼声惊飞了十里内的乌鸦。',
  effect: { attr: { int: 2, spr: 3 } }
},
{
  id: 'ev_n_moshi_win',
  age: [38, 50],
  pool: 'novel_moshi',
  weight: 4,
  once: true,
  big: true,
  kind: 'fate',
  text: '血清量产，尸群退去，安全区的烟囱重新冒起了炊烟。末世纪元终于要翻篇了。只是某夜，你在废土上看到一道熟悉的裂缝——它在邀请你回家。',
  choices: [
    { text: '留下，看着他们重建文明', effect: { setFlags: ['moshi_win'], kill: true, deathText: '末世终结者，在新世界的朝阳里安详离世' }, result: '你留了下来，把余生交给这片土地。多年后雕像落成，碑文只有一句："他/她让世界重新有了明天。"', kind: 'good', big: true },
    { text: '踏入裂缝，回归现实', effect: { setFlags: ['moshi_win'], setPool: 'life', setAge: 24, attr: { str: 2, int: 2, spr: 1 } }, result: '裂缝那头是你穿越前的出租屋，桌上的泡面还冒着热气。你拉开窗帘，阳光好得让人想哭。', kind: 'good', big: true }
  ]
},

// ========== 第二轮扩充：世界观建设与新支线（ev_n2_） ==========

// ---- 武侠 · 江湖风物（lore） ----

{
  id: 'ev_n2_wuxia_guige',
  age: [16, 40],
  pool: 'novel_wuxia',
  weight: 8,
  kind: 'fate',
  text: '混迹江湖久了，你渐渐摸清这里的规矩：镖局过山要喊镖号，绿林劫道不杀穷苦，寻仇可以连坐，祸不及妻儿。守规矩的未必是好人，但不守规矩的一定死得早。',
  effect: { attr: { int: 1 } }
},
{
  id: 'ev_n2_wuxia_menpai',
  age: [16, 40],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'fate',
  text: '茶馆里说书人拍着醒木，把天下格局讲了个遍：北有少林执牛耳，南有武当镇山门，唐门暗器蜀中称雄，魔教总坛远在西域。你掰着指头一算——这武林，已经二十年没换过盟主了。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n2_wuxia_fengwu',
  age: [16, 44],
  pool: 'novel_wuxia',
  weight: 9,
  text: '江南春雨连绵，你在临水酒楼点了一壶竹叶青。隔壁桌镖师划拳行令，窗外卖花姑娘的吴侬软语混着雨声。江湖不只有刀光剑影，也有这样的人间烟火。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n2_wuxia_gaibang',
  age: [18, 42],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'fate',
  text: '城门口的乞丐收了你半块炊饼，附赠三条城中秘闻。你这才明白：丐帮弟子遍布天下去，没有他们不知道的事——半个馒头，比什么情报网都好使。',
  effect: { attr: { int: 1, mny: -1 } }
},

// ---- 武侠 · 新支线 ----

{
  id: 'ev_n2_wuxia_xiulian',
  age: [18, 30],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  cond: { flags: ['wuxia_miji'] },
  text: '崖底得来的《九霄剑诀》你已参透七成，只差最后一招"九霄雷引"。剑谱扉页有小字批注：此招逆天，悟则登天，误则筋脉俱断。',
  choices: [
    { text: '稳妥起见，就此封剑', effect: { attr: { str: 1, spr: 1 } }, result: '你把最后一页压进箱底。十年后再看，忽然庆幸当年的怂——拿命赌一口气，不值。', kind: 'good' },
    { text: '悟！这剧情我熟，主角都这么练', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { str: 2, int: 1, luk: 1 } }, result: '雷雨夜你一剑引下天光，剑成之日满城兵器齐鸣。批注诚不欺你，但主角光环也不欺你。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n2_wuxia_zhaoan',
  age: [22, 38],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '六扇门的金牌捕头找上门，腰牌往桌上一拍："朝廷招揽江湖好手，编制、俸禄、退休金一应俱全。少侠，考不考虑上岸？"',
  choices: [
    { text: '上岸！铁饭碗谁不馋', effect: { attr: { mny: 2, spr: 1 }, setFlags: ['wuxia_guanfu'] }, result: '你成了六扇门最年轻的铜牌捕快。江湖朋友笑你"从良"，你笑他们不懂什么叫公积金。', kind: 'good', big: true },
    { text: '江湖人，不做朝廷鹰犬', effect: { attr: { spr: 1, chr: 1 } }, result: '你摔门而去，此事传遍绿林，道上朋友纷纷竖起大拇指：是条有骨气的汉子。', kind: 'good' }
  ]
},
{
  id: 'ev_n2_wuxia_mojiao',
  age: [24, 40],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  kind: 'bad',
  text: '魔教右护法深夜造访，留下一封烫金请柬："教主有请，共商武林大事。"送信的黑鸦在你窗台站了一宿——去与不去，都像一步棋。',
  effect: { attr: { int: 1, spr: -1 } }
},
{
  id: 'ev_n2_wuxia_dalei',
  age: [18, 34],
  pool: 'novel_wuxia',
  weight: 8,
  text: '城隍庙前有人摆擂，十两银子一场，守擂的是个使流星锤的壮汉，已连胜十九场。',
  choices: [
    { text: '上台会会他', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { mny: 1, str: 1, spr: 1 } }, result: '三个回合你挑飞了他的锤。壮汉抱拳："好汉，这擂台归你了！"你当了一下午擂主，进账八十两。', kind: 'good' },
    { text: '下注押他赢', effect: { attr: { mny: 1, spr: 'rand:-1~1' } }, result: '第二十场，壮汉被一个娃娃脸少年一指点倒。庄家通杀，你输得只剩裤衩——哦不，还剩裤衩。', kind: 'good' }
  ]
},

// ---- 无限流 · 主神空间（lore） ----

{
  id: 'ev_n2_wuxian_shouze',
  age: [18, 40],
  pool: 'novel_wuxian',
  weight: 8,
  kind: 'fate',
  text: '新人手册第一条：副本评分决定奖励点；第二条：奖励点低于零，抹杀；第三条：不要相信手册上没写的任何东西。你把第三条抄在了手臂内侧。',
  effect: { attr: { int: 1 } }
},
{
  id: 'ev_n2_wuxian_qunxiang',
  age: [18, 44],
  pool: 'novel_wuxian',
  weight: 7,
  kind: 'fate',
  text: '休息区是个大杂烩：排行榜第一的"夜帝"从不露面，第二是开直播间的魅魔御姐，还有个道士打扮的大爷逢人推销开光符咒。在主神空间，你永远猜不到队友上辈子是干什么的。',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n2_wuxian_baitan',
  age: [19, 44],
  pool: 'novel_wuxian',
  weight: 9,
  text: '交易广场的地摊文化自成一派：有人卖"必过攻略"（假的居多），有人收购别人不要的诅咒道具，最角落的老头只收故事——他说这空间缺的不是道具，是人味儿。',
  effect: { attr: { spr: 1 } }
},
{
  id: 'ev_n2_wuxian_dating',
  age: [18, 46],
  pool: 'novel_wuxian',
  weight: 7,
  kind: 'fate',
  text: '副本大厅的光幕滚动着本周排期：周一灵异场，周三科幻场，周五西幻场，周末随机。老玩家都知道，恐怖本积分高但折寿，种田本积分低却治愈——选本如选股。',
  effect: { attr: { int: 1 } }
},

// ---- 无限流 · 新支线 ----

{
  id: 'ev_n2_wuxian_gonghui',
  age: [20, 36],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '排名第三的大公会"长明灯"向你递来橄榄枝：包分配副本、保底治疗、情报共享，条件是三成积分上交，外加一句"一切行动听指挥"。',
  choices: [
    { text: '入会，背靠大树好乘凉', effect: { attr: { str: 1, mny: 1, spr: 1 }, setFlags: ['wuxian_gonghui'] }, result: '入会首场副本，会里奶妈全程盯着你奶。感动之余你发现合同细则写着：战时先锋位，按资排辈。', kind: 'good', big: true },
    { text: '自由散人，不受约束', effect: { attr: { int: 1, chr: 1 } }, result: '散人的路难走，但每一步都是自己的。半年后"独狼"之名上了论坛热帖：《盘点那些不加公会的狠人》。', kind: 'good' }
  ]
},
{
  id: 'ev_n2_wuxian_duju',
  age: [20, 38],
  pool: 'novel_wuxian',
  weight: 7,
  once: true,
  text: '特殊副本"深渊赌场"：赢一局积分翻倍，输一局随机扣除一项能力。庄家是个戴笑脸面具的男人，洗牌手法比你的心跳还稳。',
  choices: [
    { text: '上桌，赌一把大的', cond: { attr: { luk: { gte: 5 } } }, effect: { attr: { mny: 2, luk: 1, spr: 1 } }, result: '你连赢三局收手离场。面具男鞠躬相送："懂收手的赌客，最受欢迎。"', kind: 'good', big: true },
    { text: '赌徒没有好下场，告辞', effect: { attr: { int: 1 } }, result: '出门时你回头看了一眼：刚坐上你位置的玩家，正被面具男收走"恐惧"这项能力，笑得一脸空白。', kind: 'good' }
  ]
},
{
  id: 'ev_n2_wuxian_heishi',
  age: [20, 40],
  pool: 'novel_wuxian',
  weight: 8,
  kind: 'bad',
  text: '你花大价钱从黑市淘了瓶"高级治疗药剂"，关键时刻一口闷下——标签底下还有层小字：本品为安慰剂，心理疗效显著。伤口没好，但你的确气笑了。',
  effect: { attr: { mny: -2, int: 1 } }
},
{
  id: 'ev_n2_wuxian_yituo',
  age: [26, 46],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  text: '副本崩塌前，一位素不相识的资深者把一枚U盘塞进你手里："我攒了三十个副本的攻略，带出去……给萌新留条活路。"说完他转身迎向数据风暴。',
  choices: [
    { text: '公开攻略，免费放送', effect: { attr: { spr: 2, int: 1, luk: 1 } }, result: '攻略帖引爆论坛，萌新存活率涨了三成。空间第一次出现悼念楼，十万层楼没有一句脏话。', kind: 'good', big: true },
    { text: '制成付费课程', effect: { attr: { mny: 3, spr: -1 } }, result: '你赚得盆满钵满，只是每次有人刷"感谢大佬"，你都觉得那声谢不该给自己。', kind: 'good' }
  ]
},

// ---- 霸总 · 豪门风云（lore） ----

{
  id: 'ev_n2_bazong_sijia',
  age: [22, 46],
  pool: 'novel_bazong',
  weight: 8,
  kind: 'fate',
  text: '管家给你补了一晚上豪门课：厉家居首，掌金融地产；沈家握航运，顾氏控传媒，还有个沉默的叶家专攻科技。四家联姻结怨几十年，比财经频道精彩，也比谍战片费脑。',
  effect: { attr: { int: 1 } }
},
{
  id: 'ev_n2_bazong_bantu',
  age: [24, 48],
  pool: 'novel_bazong',
  weight: 7,
  kind: 'fate',
  text: '晨起翻财经报：厉氏收购案上了头条，顾氏传媒的通稿阴阳了半版，沈家航运的股票应声微涨。你抿了口咖啡——在这座城，吃早餐不看盘，等于裸奔。',
  effect: { attr: { int: 1, mny: 1 } }
},
{
  id: 'ev_n2_bazong_chahui',
  age: [22, 44],
  pool: 'novel_bazong',
  weight: 9,
  text: '名媛下午茶有三条铁律：包包要"不经意"放在桌上，八卦要以"我可不是乱说"开头，夸人要用"你这气质真是随了阿姨"。一个月时间，你把这套黑话学得炉火纯青。',
  effect: { attr: { spr: 1, chr: 1 } }
},
{
  id: 'ev_n2_bazong_laozhai',
  age: [22, 50],
  pool: 'novel_bazong',
  weight: 7,
  kind: 'fate',
  text: '厉家老宅的规矩比故宫导览还长：晨起问安，长幼有序，祠堂的香不能断，年夜饭座次要论资排辈。你头回去就坐错了位置，全桌倒吸凉气的声音比空调还冷。',
  effect: { attr: { spr: -1, int: 1 } }
},

// ---- 霸总 · 新支线 ----

{
  id: 'ev_n2_bazong_xuyue',
  age: [24, 34],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  cond: { flags: ['bazong_contract'] },
  text: '契约婚姻到期前一周，厉承烨把一份新协议放在你床头——条款全改了，报酬一栏空着，期限一栏写着：终身。',
  choices: [
    { text: '签，但报酬栏填"全部身家"', effect: { attr: { mny: 2, spr: 2 }, setFlags: ['bazong_renew'] }, result: '厉承烨看完你填的条款，笔尖顿了三秒，竟然真的签了。律师连夜赶来确认总裁的精神状态。', kind: 'good', big: true },
    { text: '不签，先晾他三天', effect: { attr: { spr: 2, chr: 1 } }, result: '第三天财经头条：《厉氏总裁点亮全城大屏，只为求夫人续约》。全城吃瓜，你慢悠悠喝了口茶。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n2_bazong_toubiao',
  age: [26, 42],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '城东地王招标，厉氏与沈家杀到最后。开标前夜，有人出价八位数买你手里那份标底。',
  choices: [
    { text: '反手设局，引蛇出洞', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { mny: 2, int: 1 } }, result: '你递了份假标底。开标那天沈家报出离谱高价，拿下地王——和旁边那块被污染的地。你收获掌声，以及沈家三年的敌意。', kind: 'good', big: true },
    { text: '原样上报，公事公办', effect: { attr: { spr: 1, int: 1 } }, result: '厉承烨听完只说了句"知道了"。第二天那个中间人被全行业拉黑，你的年终奖多了个零。', kind: 'good' }
  ]
},
{
  id: 'ev_n2_bazong_xiaoshu',
  age: [26, 44],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  kind: 'bad',
  text: '厉家二少留学归来，进门第一天就"手滑"打碎了你最爱的花瓶，笑得温文尔雅："嫂子，这家里很多东西，很快就要换主人了。"',
  effect: { attr: { spr: -2, int: 1 } }
},
{
  id: 'ev_n2_bazong_zongyi',
  age: [24, 40],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '一档夫妻观察综艺开出天价邀约，导演拍胸脯保证"绝对真实、绝不恶意剪辑"。你看了看合同第38条的小字，笑了。',
  choices: [
    { text: '上！让全网看看什么叫恩爱', cond: { attr: { chr: { gte: 6 } } }, effect: { attr: { chr: 1, mny: 2, spr: 1 } }, result: '节目播出后你们喜提热搜"豪门爱情天花板"。没人知道厉总半夜煮泡面那段，是你授意保留的。', kind: 'good', big: true },
    { text: '推了，私生活不上货架', effect: { attr: { spr: 1, int: 1 } }, result: '你把第38条圈出来退回去，导演组连夜改稿。后来这节目因恶意剪辑翻车，你躲过一劫。', kind: 'good' }
  ]
},

// ---- 末世 · 废土法则（lore） ----

{
  id: 'ev_n2_moshi_shili',
  age: [20, 44],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'fate',
  text: '老兵在沙盘上给你讲天下大势：东有"曙光"高墙重镇，西有"铁齿"掠夺团流窜劫掠，南边废城是无人区，北边……北边无线电静默三年了。他敲敲地图："记住，末世最危险的从来不是丧尸。"',
  effect: { attr: { int: 1 } }
},
{
  id: 'ev_n2_moshi_faze',
  age: [20, 46],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'fate',
  text: '基地围墙上刻着生存法则：一、水源即命脉；二、火光会引来两种东西——丧尸和人；三、交易时先亮货再亮枪；四、别问别人末世前是做什么的。字迹被摸得发亮，每一条都是血写的。',
  effect: { attr: { int: 1, spr: -1 } }
},
{
  id: 'ev_n2_moshi_jinghe',
  age: [21, 46],
  pool: 'novel_moshi',
  weight: 9,
  text: '集市上以物易物是常态，硬通货只有一种——变异体晶核。一阶换三顿饱饭，三阶换一把步枪。五阶？摆摊老头嗤笑："那玩意儿一出现，集市就该见血了。"',
  effect: { attr: { int: 1, mny: 1 } }
},
{
  id: 'ev_n2_moshi_feitu',
  age: [20, 48],
  pool: 'novel_moshi',
  weight: 7,
  text: '春天，废城的裂缝里钻出大片野花，藤蔓爬满废弃商场的橱窗。巡逻的孩子摘了一捧回来插在弹药箱上——末世第三年，你第一次觉得这破地方还有点颜色。',
  effect: { attr: { spr: 2 } }
},

// ---- 末世 · 新支线 ----

{
  id: 'ev_n2_moshi_pingjing',
  age: [24, 40],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  cond: { flags: ['moshi_power'] },
  text: '你的异能卡在四阶瓶颈整整一年。黑市有人兜售一枚五阶晶核，吞服冲击瓶颈——成功率三成，失败则异能尽废。',
  choices: [
    { text: '吞！末世不相信保守', cond: { attr: { luk: { gte: 5 } } }, effect: { attr: { str: 3, spr: 2 } }, result: '三天三夜高烧退去，你睁开眼，指尖的能量凝成了实质。整个安全区，这一阶一只手数得过来。', kind: 'good', big: true },
    { text: '卖掉晶核，换半年军粮', effect: { attr: { mny: 2, spr: 1 } }, result: '晶核换了三车粮食，基地安然过冬。有人替你惋惜，你看着粮仓笑了：活着，才是最高的阶。', kind: 'good' }
  ]
},
{
  id: 'ev_n2_moshi_shangdui',
  age: [22, 44],
  pool: 'novel_moshi',
  weight: 8,
  text: '一支流动装甲商队路过基地，货架上从抗生素到二手游戏机一应俱全。老板是个笑起来像弥勒佛的胖子："只收晶核和情报，童叟无欺——童叟除外。"',
  choices: [
    { text: '买情报，摸清周边势力', cond: { attr: { mny: { gte: 4 } } }, effect: { attr: { int: 2, mny: -1 } }, result: '胖子给你的地图上标着三处物资点和两处伏击区。这钱花得，比子弹值。', kind: 'good' },
    { text: '以物易物，换批药品', effect: { attr: { mny: 1, spr: 1 } }, result: '你用二十张完好的兽皮换回一箱抗生素。临走胖子送你一句话："下个月，别走北边的桥。"', kind: 'good' }
  ]
},
{
  id: 'ev_n2_moshi_xinrenlei',
  age: [26, 46],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '自称"新人类公社"的组织找上门，斗篷下的眼睛泛着淡淡红光："病毒不是灾难，是进化。加入我们，抛弃旧人类的躯壳与道德。"',
  choices: [
    { text: '虚与委蛇，套出老巢位置', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2, luk: 1 } }, result: '你陪他们聊了三天"进化哲学"，转头把坐标卖给了三大基地。联军端掉老巢那天，你在功劳簿上排第一。', kind: 'good', big: true },
    { text: '当场轰出去', effect: { attr: { spr: 1, str: -1 } }, result: '来使临走撂下一句"旧时代会埋了你"。当夜基地加了双岗——有些疯话，不能全当疯话听。', kind: 'good' }
  ]
},
{
  id: 'ev_n2_moshi_gouhuo',
  age: [22, 48],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'good',
  text: '冬夜，哨塔下燃起一小堆篝火。老兵掏出藏了半年的吉他，弹跑了三个音，全队却听得鸦雀无声。有人往火里丢了两颗珍藏的咖啡豆，香气散开时，谁都舍不得说话。',
  effect: { attr: { spr: 2, str: 1 } }
}
];
