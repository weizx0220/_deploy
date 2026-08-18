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
},

// ---- v2 · 战斗与装备配套事件 ----

// ---- 武侠 ----
{
  id: 'ev_v2_wx_biaoyun',
  age: [16, 50],
  pool: 'novel_wuxia',
  weight: 8,
  text: '你随镖队押送一趟红货，行至黑松岭，林中唿哨一声，跳下二十几条好汉："此山是我开！"镖头脸色发白，看向你。',
  choices: [
    { text: '抄家伙，护镖！', cond: { attr: { str: { gte: 7 } } }, effect: { coin: 150, attr: { str: 2, chr: 1 } }, result: '你单刀直入连挑三名头目，匪众作鸟兽散。镖头当场封你"镇远镖局头号镖师"，分红丰厚。', kind: 'good', big: true },
    { text: '护着镖车且战且退', effect: { coin: 40, attr: { str: -1 } }, result: '镖银保下一半，你挂了彩。镖头拍着胸脯说兄弟够意思，医药费全包。' }
  ]
},
{
  id: 'ev_v2_wx_zhujian',
  age: [18, 60],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  text: '铸剑山庄三年一开炉，庄门口贴出告示：今有新剑出炉，价高者得，亦寻有缘人。江湖客闻风而动。',
  choices: [
    { text: '重金求名剑', cond: { attr: { mny: { gte: 5 } } }, effect: { coin: -260, items: ['it_swordqi_blade'] }, result: '你拍下压轴的"承影"。剑出鞘时满座无声，剑身隐有流光——好剑，值这个价。', kind: 'good', big: true },
    { text: '买把顺手的旧剑', effect: { coin: -60, items: ['it_sword'] }, result: '库房里你挑了柄青铜剑，庄主笑道："剑老心不老。"趁手，就是最好。', kind: 'good' }
  ]
},
{
  id: 'ev_v2_wx_xuanshang',
  age: [16, 55],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'good',
  text: '衙门悬赏缉拿江洋大盗"一阵风"。你在悦来客栈吃面，认出隔壁桌正是通缉令上那张脸，一个眼色唤来便衣捕快。赏银到手，面钱还是大盗替你付的。',
  effect: { coin: 120, attr: { int: 1, chr: 1 } }
},

// ---- 玄幻 ----
{
  id: 'ev_v2_wxn_heishi',
  age: [18, 45],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  text: '坊市地下的黑市半夜才开，摊主们面目模糊。一个角落摊上，一柄锈迹斑斑的古剑压着张纸："识货的来。"',
  choices: [
    { text: '赌一把，买下锈剑', cond: { attr: { luk: { gte: 6 } } }, effect: { coin: -150, items: ['it_swordqi_blade'] }, result: '回府以灵泉洗去锈迹，剑身露出"承影"二字，流光隐现。摊主今夜怕是睡不着觉了。', kind: 'good', big: true },
    { text: '买瓶丹药就走', effect: { coin: -100, items: ['it_elixir'] }, result: '丹药成色尚可，药香纯正。黑市规矩：不问来路，不问去处。', kind: 'good' }
  ]
},
{
  id: 'ev_v2_wxn_lianqi',
  age: [18, 40],
  pool: 'novel_wuxian',
  weight: 8,
  text: '炼器峰缺人手，长老许你以工换酬。你抡了一个月锤子拉风箱，炉火烧得你满脸通红，工钱倒是结得爽快。',
  effect: { coin: 80, attr: { str: 1, int: 1 } }
},
{
  id: 'ev_v2_wxn_hufa',
  age: [20, 50],
  pool: 'novel_wuxian',
  weight: 7,
  once: true,
  text: '内门长老闭关冲击瓶颈，点你在外护法七日。出关那日长老红光满面："护法有功，赏。灵石还是功法，自己挑。"',
  choices: [
    { text: '要灵石', effect: { coin: 150 }, result: '一袋灵石入手沉甸甸。长老笑骂一声"俗"，转头又多给了两块。', kind: 'good' },
    { text: '要功法', effect: { skills: ['sk_swordqi'], attr: { int: 1 } }, result: '长老传你一式【剑气】。你练了三个月，剑未出鞘，院里的竹子先秃了一片。', kind: 'good' }
  ]
},

// ---- 霸总 ----
{
  id: 'ev_v2_bz_anbao',
  age: [18, 50],
  pool: 'novel_bazong',
  weight: 8,
  text: '集团大堂，一个醉酒的合作方闹事，抄起花瓶就砸。保安还没赶到，眼看花瓶飞向总裁办的玻璃门。',
  choices: [
    { text: '一个箭步拦下', cond: { attr: { str: { gte: 6 } } }, effect: { coin: 200, attr: { str: 1, chr: 2 } }, result: '你徒手接住花瓶，全场鸦雀无声。第二天你的工位上多了个信封：特别贡献奖，厚度可观。', kind: 'good', big: true },
    { text: '报警并疏散人群', effect: { attr: { int: 2, spr: 1 } }, result: '你冷静疏散了人群，醉酒者被带走时还在喊"我认识你们总裁"。巧了，总裁本人就站在你旁边。', kind: 'good' }
  ]
},
{
  id: 'ev_v2_bz_hushen',
  age: [20, 55],
  pool: 'novel_bazong',
  weight: 5,
  once: true,
  kind: 'good',
  text: '生日这天，厉承烨让助理抬来一个黑色礼盒，语气别扭："……防身用的。你的安全，现在属于集团重要资产。"',
  effect: { items: ['it_vest'], coin: 50, attr: { spr: 2 } }
},

// ---- 末世 ----
{
  id: 'ev_v2_ms_shihuang',
  age: [18, 50],
  pool: 'novel_moshi',
  weight: 8,
  text: '尸潮退去的第三天，战场还冒着烟。拾荒队要深入废墟搜刮物资，危险，但油水十足。',
  choices: [
    { text: '深入核心区', cond: { attr: { str: { gte: 6 } } }, effect: { coin: 60, items: ['it_gun'], attr: { str: -1 } }, result: '你在报废装甲车里翻出一把改装手枪和半箱压缩饼干。回程遭遇落单丧尸，新枪当场开了张。', kind: 'good', big: true },
    { text: '外围捡捡就好', effect: { coin: 40, items: ['it_apple'] }, result: '外围物资零碎，但你在一辆翻倒的货车里找到一箱罐头和几颗苹果——末世的苹果，比黄金稀罕。', kind: 'good' }
  ]
},
{
  id: 'ev_v2_ms_junxie',
  age: [20, 55],
  pool: 'novel_moshi',
  weight: 7,
  text: '基地军械师老烟鬼叼着烟打量你："晶核带够了吗？我这儿的东西，件件都能换命。"',
  choices: [
    { text: '换一把改装手枪', cond: { attr: { mny: { gte: 4 } } }, effect: { coin: -250, items: ['it_gun'] }, result: '老烟鬼亲手帮你校了准星："七步之内，它就是真理。"', kind: 'good' },
    { text: '换一件防弹背心', effect: { coin: -200, items: ['it_vest'] }, result: '背心沉得压肩。老烟鬼咧嘴一笑："沉好啊，命更沉。"', kind: 'good' },
    { text: '拜师学维修', effect: { attr: { int: 2 }, coin: 30 }, result: '你跟着修了半个月枪械，满手机油。老烟鬼把学费免了："手稳，心细，像年轻时的我。"', kind: 'good' }
  ]
},

// ========== 第三轮扩充：终局铺垫·新支线·风物（ev_n3_） ==========

// ---- 武侠 · 终局铺垫 ----

{
  id: 'ev_n3_wuxia_zhaohuan',
  age: [34, 42],
  pool: 'novel_wuxia',
  weight: 9,
  once: true,
  kind: 'fate',
  cond: { attr: { str: { gte: 20 } } },
  text: '近来江湖风向不对：魔教十年来第一次封山，少林武当同时召回云游弟子，连悦来客栈的说书先生都停更了《武林月旦评》。老江湖们压低声音——要变天了。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxia_dongyuan',
  age: [36, 44],
  pool: 'novel_wuxia',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  cond: { anyFlag: ['wuxia_miji', 'wuxia_guanfu'] },
  text: '英雄帖一夜撒遍十三省，落款是少林武当联名：魔教教主闭关将出，正魔决战在即。你收到的那张帖子上，单独用朱笔添了四个字："非你不可。"',
  choices: [
    { text: '接帖，即刻动身', effect: { attr: { spr: 2, str: 1 } }, result: '你把帖子压在剑下抚平，当夜便上了路。官道两旁，同路人的火把连成了星河。', kind: 'good', big: true },
    { text: '先回山向师门复命', effect: { attr: { int: 1, spr: 1 } }, result: '师父听完只回了三个字："去吧。"你磕了三个头，起身时已预感到，这是最后一面。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxia_xinjing',
  age: [38, 45],
  pool: 'novel_wuxia',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  cond: { attr: { str: { gte: 24 } } },
  text: '决战前夜，你独自登上华山。云海在脚下翻涌，你想起崖底的骷髅、客栈的百晓生、红衣的圣女……三十年种种，都凝成了剑穗上的一缕风。这一战之后，江湖该换个讲法了。',
  effect: { attr: { spr: 2, int: 1 } }
},

// ---- 武侠 · 风物 lore ----

{
  id: 'ev_n3_wuxia_chapeng',
  age: [16, 44],
  pool: 'novel_wuxia',
  weight: 8,
  text: '官道旁的茶棚是江湖的信息交易所：一钱银子一碗粗茶，附赠方圆百里的恩怨情仇。你总结出规律——说书人拍醒木的力道，和消息的劲爆程度成正比。',
  effect: { attr: { int: 1 } }
},
{
  id: 'ev_n3_wuxia_chuohao',
  age: [16, 40],
  pool: 'novel_wuxia',
  weight: 9,
  text: '在江湖混，绰号比姓名要紧。报上"张三"没人理，报上"白衣快剑张三"，对方先掂量三分。你想了想自己的外号，决定最近行事再低调点。',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_wuxia_chongyang',
  age: [18, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '重阳登高是武林盛事：各大门派借登高之名行比试之实，山顶那坛菊花酒，只有当年最强的年轻人够得着。你看着一群少年抢作一团，恍如昨日。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_wuxia_miaohui',
  age: [16, 44],
  pool: 'novel_wuxia',
  weight: 9,
  text: '城隍庙会比武林大会热闹：糖画摊挨着兵器摊，耍猴的锣鼓盖过切磋的呼喝。你给泥人摊捐了锭银子——摊主捏了个你，剑眉星目，就是脸圆了点。',
  effect: { attr: { spr: 2, chr: 1 } }
},
{
  id: 'ev_n3_wuxia_shuku',
  age: [18, 40],
  pool: 'novel_wuxia',
  weight: 7,
  text: '门派藏书阁规矩森严：一层拳脚，二层兵刃，三层内功，顶层锁着的据说是祖师爷手札。守阁长老打瞌睡，口水流到了《拳经》上——你只敢在心里腹诽。',
  effect: { attr: { int: 1 } }
},
{
  id: 'ev_n3_wuxia_saiwai',
  age: [20, 44],
  pool: 'novel_wuxia',
  weight: 8,
  text: '塞北的雪一下就是三月，客栈里挤满等开春的镖师和刀客。掌柜温一壶烧刀子，墙上挂着八十年没人摘的旧剑。你听他们吹牛到天亮，出门时，雪停了。',
  effect: { attr: { spr: 1, str: 1 } }
},

// ---- 武侠 · 新支线 ----

{
  id: 'ev_n3_wuxia_enyuan',
  age: [20, 38],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '一位瞎眼老者拦住你的去路，拄拐长揖：求你替他了结与铁掌帮的二十年恩怨。',
  choices: [
    { text: '查明真相再断', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 2, spr: 2 } }, result: '你翻出当年卷宗——所谓血仇竟是第三方挑拨。两家人在你见证下同饮一杯，二十年的刀同时入鞘。', kind: 'good', big: true },
    { text: '提剑上门讨说法', effect: { attr: { str: -1, spr: 1 } }, result: '打到一半双方才发现是误会，讪讪收剑。你揉着淤青感叹：江湖多少仇，都死于一场没聊开的天。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxia_shoutu',
  age: [24, 42],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '一个逃荒来的少年在你门前跪了三天，额头磕出了血，只求拜师。',
  choices: [
    { text: '收下这个徒弟', effect: { attr: { spr: 2, int: 1 }, setFlags: ['wuxia_tudi'] }, result: '少年练武肯下死力气，三年后已能替你出战门派大比。看他挥剑的背影，你想起当年的自己。', kind: 'good', big: true },
    { text: '赠银百两，让他回家', effect: { attr: { mny: -1, spr: 1 } }, result: '少年走后，你听说他用那百两银子开了间武馆，教穷孩子练拳。也算另一种传承。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxia_chouzhi',
  age: [22, 40],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  kind: 'fate',
  text: '多年前败在你剑下的仇家之子登门，跪呈一封书信——其父临终遗言：败于你手，心服口服；犬子若成器，请代我指点一二。',
  choices: [
    { text: '收信指点，不记前仇', effect: { attr: { int: 2, spr: 2 } }, result: '十年后那少年成了新一代名侠，逢人便说剑术得自"先父至交"。恩怨二字，到你这里断了根。', kind: 'good', big: true },
    { text: '婉拒，江湖路各走各的', effect: { attr: { spr: -1, int: 1 } }, result: '少年磕了个头，转身走进风雪。你望着他的背影，忽然不知道自己是不是做错了。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_wuxia_matou',
  age: [22, 40],
  pool: 'novel_wuxia',
  weight: 8,
  text: '漕帮和盐帮为争夺码头对峙三日，刀枪都架上了。两边不约而同递来拜帖，请你主持公道。',
  choices: [
    { text: '摆酒调停', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 1, spr: 2 } }, result: '你定下"单日漕、双日盐、初一十五歇码头"的规矩，两边都觉得没吃亏。这顿和事酒，喝了三天三夜。', kind: 'good', big: true },
    { text: '让他们自己打明白', effect: { attr: { spr: -1 } }, result: '两败俱伤，官府趁势把码头收了官营。你这才明白：有时候不插手，也是一种选择——坏的那种。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_wuxia_yaowang',
  age: [20, 42],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  text: '药王谷规矩怪：求药不收银两，只收一个等值的故事。谷主泡好茶，眯眼等你开口。',
  choices: [
    { text: '讲你的崖底奇遇', effect: { attr: { spr: 2, str: 1 } }, result: '谷主听得拍案叫绝，当场赠你一枚九花玉露丸："好故事，值得好药。"', kind: 'good' },
    { text: '现编一个传奇', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '谷主听完沉默半晌："编的。"你心头一紧，他又笑了："但编得好。药，给你。"', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxia_tongxing',
  age: [20, 36],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '官道上，一位蒙面女侠拦住你："同路吗？我听说前面黑风峡不太平。"她的剑穗上，系着半枚眼熟的铜钱。',
  choices: [
    { text: '结伴同行', effect: { attr: { chr: 2, spr: 2 } }, result: '一路并肩闯过黑风峡。分别时她摘下面巾一笑，没说姓名——江湖很大，有缘总会再见。', kind: 'good', big: true },
    { text: '独来独往惯了', effect: { attr: { spr: -1 } }, result: '后来听说黑风峡那晚有人独斗三十悍匪，剑法精妙。你望着月亮，莫名有些怅然。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_wuxia_pantu',
  age: [24, 42],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '门派抓到私通魔教的叛徒——是你的同门师弟。刑堂上下等你发落，按门规，当废去武功，逐出师门。',
  choices: [
    { text: '先查他叛门的缘由', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, spr: 2 } }, result: '你查出魔教挟持了他的家人。真相大白，掌门网开一面，师弟跪在你面前泣不成声。', kind: 'good', big: true },
    { text: '按门规处置', effect: { attr: { spr: -1, int: 1 } }, result: '行刑那晚，你在山门外放了一壶酒。规矩是规矩，情分是情分——这两样，从来不在一张桌子上。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_wuxia_miwu',
  age: [22, 40],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '姑苏城接连有武师失踪，现场只留一团不散的白雾。知府悬赏千两，满城人心惶惶。',
  choices: [
    { text: '夜探迷雾', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { mny: 1, spr: 2 } }, result: '雾里藏着个用迷魂香掳人的采花贼，你把他拎出来时，全城武师夹道相迎。', kind: 'good', big: true },
    { text: '报官，静观其变', effect: { attr: { int: 1 } }, result: '官府折腾半月无果，最后还是六扇门的高手破了案。你默默记下一课：迷雾本身，往往是答案的一半。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxia_bangzhu',
  age: [26, 44],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  text: '丐帮新老帮主交接，请你做公证人。打狗棒传到一半，跳出个长老，指控新帮主身世来路不正。',
  choices: [
    { text: '当场查验身世', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2, spr: 1 } }, result: '你三问两验，戳破长老伪造的文书——原来他想扶持自己的侄儿。丐帮上下对你心服口服。', kind: 'good', big: true },
    { text: '请丐帮关起门自决', effect: { attr: { spr: 1 } }, result: '三天后新帮主亲自登门道谢：他查清了冤案，还顺手清理了门户。你觉得这人不简单。', kind: 'good' }
  ]
},

// ---- 武侠 · 门派恩怨与江湖地位 ----

{
  id: 'ev_n3_wuxia_miemen',
  age: [18, 44],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'bad',
  text: '一夜之间，武夷山清微派满门被屠，凶手留下一朵黑色莲花。江湖人人自危，各派开始互相猜忌——而这，正是凶手想要的效果。',
  effect: { attr: { int: 1, spr: -1 } }
},
{
  id: 'ev_n3_wuxia_yingxiong',
  age: [20, 44],
  pool: 'novel_wuxia',
  weight: 8,
  text: '少林广发英雄帖，邀天下豪杰共商黑莲血案。大雄宝殿里坐了三百号人，吵了三天，唯一达成的共识是：下次开会，别叫这么多人。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxia_zhenwu',
  age: [22, 44],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  kind: 'fate',
  text: '武当镇派宝剑"真武"失窃，矛头直指魔教。武当七剑联袂下山，魔教则宣布悬赏缉拿真凶——正邪两道，难得达成了同一个小目标。',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_wuxia_chuanwei',
  age: [26, 44],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  kind: 'fate',
  text: '掌门大限将至，传位之争暗流涌动。大师兄资历深，二师兄人缘好，而你……长老们看你的眼神，最近越来越不对劲。',
  choices: [
    { text: '力挺大师兄上位', effect: { attr: { spr: 2, mny: 1 } }, result: '新掌门上任第一件事，就是把执剑长老的位置给了你。会做人的，运气都不会太差。', kind: 'good', big: true },
    { text: '当仁不让，我也争一争', cond: { attr: { chr: { gte: 6 } } }, effect: { attr: { mny: 2, spr: 2, chr: 1 } }, result: '演武场上你连过七关，技压同门。接掌玉圭那晚，山门外求见的人排到了山脚。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n3_wuxia_yuedan',
  age: [22, 40],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  kind: 'good',
  text: '最新一期《武林月旦评》出了：你的名号从"剑客"升级为"剑侠"，评语是"剑快，心正，饭量大"。你把最后三个字圈出来，决定找百晓生谈谈。',
  effect: { attr: { spr: 2, chr: 1 } }
},
{
  id: 'ev_n3_wuxia_tiaozhan',
  age: [20, 38],
  pool: 'novel_wuxia',
  weight: 9,
  text: '又有年轻剑客上门挑战，指名要领教高招——本月第三个。江湖地位就是这么麻烦：打赢了涨名望，打输了涨笑话。',
  choices: [
    { text: '三招之内解决', cond: { attr: { str: { gte: 7 } } }, effect: { attr: { spr: 2, chr: 1 } }, result: '第三招你收剑入鞘，对方抱拳："受教。"第二天江湖传闻又多了新版本。', kind: 'good' },
    { text: '先请他吃顿饭再比划', effect: { attr: { spr: 1, int: 1 } }, result: '三杯酒下肚，挑战变成了请教，对手变成了酒友。临走他撂下话：明年还来——蹭饭。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxia_biaoju2',
  age: [22, 42],
  pool: 'novel_wuxia',
  weight: 8,
  text: '长风镖局来势汹汹，放话三个月内挤垮你的生意，还把你家的镖旗画在了茅厕门上。',
  choices: [
    { text: '擂台见，镖局对镖局', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { mny: 2, spr: 1 } }, result: '三场比试全赢。长风镖局总镖头倒是光棍，当场认输并入你麾下——江湖从此少个对头，多员猛将。', kind: 'good', big: true },
    { text: '降价抢单，商战到底', effect: { attr: { mny: -1, int: 1 } }, result: '价格战打了半年，两家都瘦了一圈，最后握手言和合伙分红。账算下来，居然比开打前还赚。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxia_lunjianbei',
  age: [24, 44],
  pool: 'novel_wuxia',
  weight: 7,
  text: '路过华山，你仰头看论剑碑上历代天下第一的留名。守碑老道递来一柄刻刀："位置还多，英雄随意。"你笑了笑，把刀还了回去——名字刻在哪，得靠剑说话。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxia_haibu',
  age: [18, 40],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'bad',
  text: '城门新贴的海捕文书上赫然画着你的脸，罪名"夜闯知府银库"。画像丑得惊天地泣鬼神，唯独那双眼睛神还原——该死，画师的工笔全用在眼睛上了。',
  effect: { attr: { spr: -1, luk: -1 } }
},
{
  id: 'ev_n3_wuxia_shuoshu',
  age: [20, 44],
  pool: 'novel_wuxia',
  weight: 9,
  text: '酒馆里，说书人正讲"某大侠三招败魔教护法"，添油加醋得你本人都快认不出自己。邻桌小孩听得两眼放光："我长大了也要当他！"你默默给他碗里加了个鸡腿。',
  effect: { attr: { spr: 2, chr: 1 } }
},
{
  id: 'ev_n3_wuxia_saomu',
  age: [22, 44],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'fate',
  text: '师父忌日，你上山扫墓，碑前摆了三个酒杯。下山时雪落满肩，你忽然明白：所谓传承，就是师父不在了，但你还在出剑。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxia_donglian',
  age: [16, 36],
  pool: 'novel_wuxia',
  weight: 9,
  text: '冬练三九，你在结冰的演武场上打了三个时辰拳，汗气在头顶蒸成白雾。小师弟们裹着棉被围观，像看一个移动的蒸笼。',
  effect: { attr: { str: 2, spr: 1 } }
},
{
  id: 'ev_n3_wuxia_yifu',
  age: [24, 44],
  pool: 'novel_wuxia',
  weight: 7,
  text: '曾经对你爱答不理的小门派，如今掌门人亲自登门送礼，话里话外想"依附"你。江湖地位这回事，全写在他们笑容的弧度里。',
  effect: { attr: { mny: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxia_hejie',
  age: [26, 44],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  big: true,
  kind: 'good',
  text: '结仇六十年的峨眉与青城，在你牵头下办了场和解宴。两位掌门碰杯时手都在抖，台下弟子哭成一片——六十年的恩怨，终究要有人先放下。',
  effect: { attr: { spr: 2, int: 1 } }
},
{
  id: 'ev_n3_wuxia_tangmen',
  age: [20, 42],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'bad',
  text: '你误食了唐门试毒大会上的"点心"，上吐下泻三天。唐门弟子登门道歉，留下一瓶解药和一张字条："抱歉，那盘是展品。"',
  effect: { attr: { str: -2, int: 1 } }
},
{
  id: 'ev_n3_wuxia_zhaoan',
  age: [22, 40],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  text: '黑风寨大当家托人捎话：愿率全寨三百弟兄接受招安，只求一个正经营生。而朝廷的回复，是一道剿灭令。',
  choices: [
    { text: '为三百人奔走斡旋', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { mny: 1, spr: 2 } }, result: '你带着方案三进府城，最终黑风寨改编为护商队，大当家当了队长。剿灭令，悄无声息地作废了。', kind: 'good', big: true },
    { text: '明哲保身，不多管闲事', effect: { attr: { spr: -1 } }, result: '三个月后黑风寨被破，大当家自刎前留话："不怪你，只怪这世道。"你路过寨子废墟，驻足了很久。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_wuxia_laoxia',
  age: [28, 46],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '名动一时的铁剑先生过世，葬礼来了三百江湖人，一半旧友，一半旧仇。仇家们上了香，转身便把恩怨一笔勾销——江湖人的葬礼，也是江湖人的和解。',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_wuxia_yecha',
  age: [18, 44],
  pool: 'novel_wuxia',
  weight: 9,
  text: '小客栈的夜半，南来北往的江湖客围着火炉吹牛：有人说见过会飞的剑，有人说西域有种武功专克内功。你添了根柴，把真真假假都听进了心里。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxia_bingqi',
  age: [26, 44],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  kind: 'good',
  text: '兵器谱重排，你的佩剑从第四十七位跳到第九。铸剑山庄连夜来信，愿出千两收购"第九名的第一手使用心得"。你回信四个字："多打架，少擦剑。"',
  effect: { attr: { mny: 1, spr: 2 } }
},
{
  id: 'ev_n3_wuxia_guonian',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '年关，门派张灯结彩，弟子们比完武比包饺子。你包的饺子煮成了一锅片汤，师父却吃得干干净净："江湖儿女，能吃就是福。"',
  effect: { attr: { spr: 2, str: 1 } }
},

// ---- 无限流 · 终局铺垫 ----

{
  id: 'ev_n3_wuxian_saiji',
  age: [30, 40],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  kind: 'fate',
  cond: { attr: { str: { gte: 18 } } },
  text: '主神空间的公告光幕毫无征兆地变成暗红色，所有副本排期清空，只剩一行字：【最终赛季即将开启，参赛者名单生成中】。你的名字，在名单第一页。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxian_dongyuan',
  age: [32, 44],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  cond: { flags: ['wuxian_gonghui'] },
  text: '公会紧急召集全体核心成员。会长的声音前所未有地严肃："最终副本的情报，我用三件S级道具换到一页。这次不是下本，是赴死——想退出的，现在可以走。"会议室里，没人动。',
  choices: [
    { text: '第一个在出征名单上签名', effect: { attr: { spr: 2, str: 1 } }, result: '你签完把笔一撂："下一个。"那一晚，签名册被写满了三本。', kind: 'good', big: true },
    { text: '先把身后事安排明白', effect: { attr: { int: 1, spr: 1 } }, result: '你把道具、积分和攻略一一列好，托付给留守的新人。做完这些，你签名的手反而稳了。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxian_gaobie',
  age: [33, 46],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  text: '进入最终副本的前夜，你把这些年攒的道具一件件擦好，给每位老队友写了留言。写给队长的那封，你对着他永远灰下去的头像愣了很久，最后只写了一句："这次换我兜底。"',
  effect: { attr: { spr: 2, int: 1 } }
},

// ---- 无限流 · 主神空间 lore ----

{
  id: 'ev_n3_wuxian_guanzhan',
  age: [18, 44],
  pool: 'novel_wuxian',
  weight: 8,
  text: '观战厅花十积分就能围观别人的副本直播。最火的是一对活宝兄弟，操作菜得离谱，弹幕却暖得离谱："别死啊，我还等着看你们下饭。"',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_wuxian_bangdan',
  age: [18, 44],
  pool: 'novel_wuxian',
  weight: 7,
  text: '积分榜前一百名，三年换了八十一个。老玩家说这榜要用追悼会的心态看——每一个消失的名字，都是某个副本里没走出来的人。',
  effect: { attr: { int: 1, spr: -1 } }
},
{
  id: 'ev_n3_wuxian_fuhuo',
  age: [20, 44],
  pool: 'novel_wuxian',
  weight: 7,
  kind: 'fate',
  text: '空间规则第零条：死亡即抹杀，复活类道具除外。于是S级复活道具成了比命还硬的硬通货，黑市上为它流的血，比副本里死的还多。',
  effect: { attr: { int: 1 } }
},
{
  id: 'ev_n3_wuxian_jiuba',
  age: [19, 46],
  pool: 'novel_wuxian',
  weight: 8,
  text: '休息区有家"存档点酒吧"，老板娘据说通关过九十九个副本，如今只调酒不下本。她的招牌酒叫"差一点"——敬所有倒在通关前一秒的人。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_wuxian_tianqi',
  age: [18, 46],
  pool: 'novel_wuxian',
  weight: 8,
  text: '主神空间也有天气：结算日"晴"，团灭高发期"暴雨"，主神心情好了会下"积分雨"。那天全空间的人都仰着头张嘴，像一群等投喂的鸽子。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_wuxian_pindao',
  age: [18, 42],
  pool: 'novel_wuxian',
  weight: 8,
  text: '新人频道永远热闹："求带！""副本里捡的戒指能戴吗？""救命我把NPC惹毛了！"你想起当年的自己，默默发了条置顶帖：《新人保命十条，免费》。',
  effect: { attr: { spr: 2, int: 1 } }
},

// ---- 无限流 · 新支线 ----

{
  id: 'ev_n3_wuxian_shuangsheng',
  age: [20, 38],
  pool: 'novel_wuxian',
  weight: 7,
  once: true,
  text: '特殊副本"双生"强制两人组队，匹配给你的搭档是个全程闭目装死的白发少年。',
  choices: [
    { text: '背着他通关', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { spr: 2, luk: 1 } }, result: '通关瞬间少年睁开眼——他是主神的质检程序。你的评分直接拉满，附赠一句："很久没人愿意背着我了。"', kind: 'good', big: true },
    { text: '投诉匹配系统', effect: { attr: { int: 1 } }, result: '系统回复："匹配结果无误。"你狐疑地回头，少年冲你眨了眨眼，继续装死。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxian_jingji',
  age: [22, 40],
  pool: 'novel_wuxian',
  weight: 8,
  text: '竞技场副本开启：十名玩家擂台混战，观众下注，赢家通吃。',
  choices: [
    { text: '报名上场', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { mny: 2, spr: 1 } }, result: '你连下三城，赔率从1赔9打到1赔1.1。领奖时庄家看你的眼神像看瘟神。', kind: 'good' },
    { text: '坐观众席收情报', effect: { attr: { int: 1, spr: 1 } }, result: '你把前十名的招式套路记了满满一本。看台上的收获，未必比擂台上少。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxian_canting',
  age: [24, 42],
  pool: 'novel_wuxian',
  weight: 7,
  once: true,
  text: '经营类副本"末日小餐馆"：三十天内让一家倒闭餐馆盈利，失败则赔光积分。',
  choices: [
    { text: '亲自掌勺', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 2, spr: 2 } }, result: '你推出招牌菜"罐头乱炖"，菜单标注"不含丧尸"。店火了，通关评价：米其林阴间一星。', kind: 'good', big: true },
    { text: '高薪挖来NPC大厨', effect: { attr: { mny: -1, spr: 1 } }, result: '大厨手艺惊人，餐馆起死回生。结算时他问你下个副本还带不带他——你第一次听说NPC会求职。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxian_tushuguan',
  age: [22, 42],
  pool: 'novel_wuxian',
  weight: 7,
  once: true,
  text: '解谜副本"无限图书馆"：每本书都是一道谜题，解不开的书，会在午夜翻过来看你。',
  choices: [
    { text: '按索书号找规律', cond: { attr: { int: { gte: 7 } } }, effect: { attr: { int: 2 } }, result: '你发现书号连起来是一句话："出口在儿童绘本区。"全场最幼稚的选择，救了所有人。', kind: 'good', big: true },
    { text: '暴力撕书', effect: { attr: { str: -2, spr: -1 } }, result: '图书馆很生气，后果很严重。你被追杀到天亮，从此对纸制品过敏。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_wuxian_nongchang',
  age: [20, 44],
  pool: 'novel_wuxian',
  weight: 8,
  text: '种田副本"最后的农场"：没有怪物，只有四季。你在里面种了三年地，外界只过了三小时。副本评价："恭喜获得珍贵体验——普通人的一生。"',
  effect: { attr: { spr: 2, str: 1 } }
},
{
  id: 'ev_n3_wuxian_xinli',
  age: [24, 44],
  pool: 'novel_wuxian',
  weight: 7,
  once: true,
  text: '空间里新开了家心理诊所，专治轮回创伤。医生是个通关失败被永远留下的老玩家，开场白永远是："说说，你多久没睡过一个不用设防的觉了？"',
  choices: [
    { text: '坐下聊聊', effect: { attr: { spr: 3, int: 1 } }, result: '你聊了三个小时，出门时天光大亮。账单上写着：本次免费——医生也需要有人听他说话。', kind: 'good' },
    { text: '"我没事"，转身离开', effect: { attr: { spr: -1, str: 1 } }, result: '出门时他喊住你："能把"我没事"说得这么利索的，都是重症。下周三，给你留号。"', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxian_duju2',
  age: [20, 40],
  pool: 'novel_wuxian',
  weight: 8,
  text: '死对头玩家当众下战书：下个副本谁评分低，谁公开叫对方一声"爸爸"。',
  choices: [
    { text: '应战', cond: { attr: { luk: { gte: 4 } } }, effect: { attr: { spr: 2 } }, result: '你以半分险胜。他咬牙喊了一声，从此见你绕道走——小道消息说，他偷偷把你的攻略抄了三遍。', kind: 'good' },
    { text: '没意思，不比', effect: { attr: { int: 1, spr: 1 } }, result: '他愣了半天，嘟囔一句"没劲"。第二天他自己下了那个副本，评分比你预估的还低。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_wuxian_daiwa',
  age: [22, 42],
  pool: 'novel_wuxian',
  weight: 8,
  text: '系统派给你三个萌新，奖励按存活数结算。看着他们清澈又愚蠢的眼神，你血压先上来了。',
  choices: [
    { text: '保姆式全程护航', effect: { attr: { spr: 2, str: -1 } }, result: '三个萌新全须全尾通关，结算时凑积分给你买了杯"存档点"的酒——酒单上那杯叫"大哥"。', kind: 'good', big: true },
    { text: '只讲要点，生死自负', effect: { attr: { int: 1, spr: -1 } }, result: '活下来两个。第三个的名字，你记在了手册最后一页——那页已经有七个名字了。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_wuxian_npc',
  age: [26, 44],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '某个副本的NPC在结算前忽然抓住你的手腕："我知道你们要走了。告诉我，外面的世界……是真的吗？"',
  choices: [
    { text: '告诉他真相', effect: { attr: { int: 2, spr: -1 } }, result: '他笑了："那你们真可怜，死了没人重开。"副本关闭，这句话陪你走了很多年。', kind: 'good', big: true },
    { text: '骗他说"都是假的"', effect: { attr: { spr: -2 } }, result: '他松了口气，目送你离开。回程的光柱里，你不敢回头。', kind: 'bad' }
  ]
},

// ---- 无限流 · 副本机制与轮回者众生相 ----

{
  id: 'ev_n3_wuxian_lunpan',
  age: [18, 44],
  pool: 'novel_wuxian',
  weight: 9,
  text: '本周随机副本轮盘开奖，全空间屏息围观。指针停在"童话镇"三个字上，老玩家集体倒吸凉气——名字越可爱的本，死亡率越高，这是常识。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxian_xianyu',
  age: [19, 44],
  pool: 'novel_wuxian',
  weight: 8,
  text: '有人把副本过成了咸鱼局：恐怖片副本里搭灶做饭，丧尸本里开民宿。系统给了他专属称号"副本害虫"。你默默关注了他的直播间，每天准时下饭。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_wuxian_zuzhou',
  age: [20, 42],
  pool: 'novel_wuxian',
  weight: 7,
  kind: 'bad',
  text: '减益诅咒副本：全员随机挂一个负面状态。你抽到的是"说真话"——整整七天，你在队友面前毫无秘密，包括你藏了三年的那个名字。',
  effect: { attr: { spr: -2, chr: 1 } }
},
{
  id: 'ev_n3_wuxian_wuxianren',
  age: [22, 42],
  pool: 'novel_wuxian',
  weight: 7,
  text: '传说中的"无限人"——把同一个副本刷了一百遍的狠人，只为刷满图鉴。你问他图什么，他说："这破空间连只猫都不给养，我总得收集点什么。"',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_wuxian_chongzu',
  age: [20, 44],
  pool: 'novel_wuxian',
  weight: 8,
  text: '队伍重组，新来个话痨牧师和一个沉默的肉盾。第一次下本，话痨的嘴和肉盾的盾同时救了全队——一个负责引怪，一个负责抗怪，分工明确。',
  effect: { attr: { spr: 2, str: 1 } }
},
{
  id: 'ev_n3_wuxian_houyizheng',
  age: [20, 42],
  pool: 'novel_wuxian',
  weight: 7,
  kind: 'bad',
  text: '恐怖本后遗症：你现在听到八音盒的声音就汗毛倒竖。队友善解人意地把你的闹铃换成了唢呐，效果更糟了。',
  effect: { attr: { spr: -1, str: -1 } }
},
{
  id: 'ev_n3_wuxian_qihuo',
  age: [20, 44],
  pool: 'novel_wuxian',
  weight: 8,
  text: '交易所最近流行"副本期货"：押注下赛季哪种本增多。你没忍住下了两手，从此看光幕像看大盘——资深韭菜的自我修养。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxian_heji',
  age: [22, 42],
  pool: 'novel_wuxian',
  weight: 8,
  text: '你的通关录像被人剪成《高燃合集》爆火，弹幕齐刷"学废了"。有萌新照着操作，在同样的位置以同样的姿势白给，发帖控诉你"误人子弟"。',
  effect: { attr: { spr: 2, chr: 1 } }
},
{
  id: 'ev_n3_wuxian_qianghua',
  age: [22, 42],
  pool: 'novel_wuxian',
  weight: 8,
  text: '装备强化炉前排长队，前面大哥的+12武器碎成了烟花，他当场表演行为艺术《男人的崩溃只在一瞬间》。你默默把强化券塞回了口袋。',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_wuxian_juhui',
  age: [26, 46],
  pool: 'novel_wuxian',
  weight: 7,
  text: '老玩家聚会，话题永远是"当年那个副本"。有人手臂上是刀疤，有人眼底是故事。散场时有人说了句"下个本，都给我活着回来"，没人接话，但大家都点了点头。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_wuxian_cunzhang',
  age: [24, 44],
  pool: 'novel_wuxian',
  weight: 7,
  once: true,
  kind: 'good',
  text: '你在副本里救下的小女孩NPC，竟在你下次进入时长成了发布任务的村长。她递来任务卷轴时眨眨眼："这次，换我给你开后门。"',
  effect: { attr: { spr: 2, luk: 1 } },
  big: true
},
{
  id: 'ev_n3_wuxian_lianbai',
  age: [20, 42],
  pool: 'novel_wuxian',
  weight: 7,
  kind: 'bad',
  text: '高难度本连跪五次，队里气氛跌到冰点。第六次进本前，肉盾默默买了六瓶最便宜的汽水："喝完这口，当第一把打。"',
  effect: { attr: { str: -1, spr: 1 } }
},
{
  id: 'ev_n3_wuxian_budang',
  age: [22, 44],
  pool: 'novel_wuxian',
  weight: 8,
  text: '论坛神帖《论主神空间的一百个BUG》被置顶又被秒删，楼主账号变灰。三小时后，同样的帖子换了个小号重新出现，标题多了俩字：补档。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_wuxian_jingsu',
  age: [26, 44],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  kind: 'good',
  text: '空间首届全服竞速赛，通关最快的队伍平分十万积分。你们队一路领先，终点前队长却停下扶起了摔倒的萌新队。最终名次：第三。领奖时，掌声比冠军还响。',
  effect: { attr: { spr: 3 } },
  big: true
},
{
  id: 'ev_n3_wuxian_baimen',
  age: [24, 42],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '深夜，空间边缘出现一扇从未见过的白色门扉，门上贴着你的手写体便签——是你从未写过的字迹："别开门，除非你准备好知道真相。"你拍了张照，设成壁纸，又撤回了。',
  effect: { attr: { int: 2, spr: -1 } }
},
{
  id: 'ev_n3_wuxian_licai',
  age: [22, 40],
  pool: 'novel_wuxian',
  weight: 8,
  text: '空间推出"积分理财"，年化百分之五。全服沸腾，你想起上辈子被基金套牢的绿光，毅然选择活期。三个月后理财暴雷，你的活期成了全服唯一的笑话反面。',
  effect: { attr: { int: 2, spr: 1 } }
},
{
  id: 'ev_n3_wuxian_dipai',
  age: [26, 44],
  pool: 'novel_wuxian',
  weight: 7,
  text: '资深者教你最后一课：永远留一张底牌；永远别让人知道你的底牌；永远假装自己还有一张底牌。三条加起来，叫活着的艺术。',
  effect: { attr: { int: 2 } }
},
{
  id: 'ev_n3_wuxian_bailian',
  age: [30, 46],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  kind: 'good',
  text: '你的累计通关数破百，空间降下金色称号"百炼"。公告只挂了三分钟，新人频道却刷了整晚——在平均活不过二十个副本的地方，一百，是个神话。',
  effect: { attr: { spr: 2, str: 1 } },
  big: true
},
{
  id: 'ev_n3_wuxian_pingjing',
  age: [32, 46],
  pool: 'novel_wuxian',
  weight: 7,
  kind: 'fate',
  text: '最终赛季临近，空间的气氛变了：黑市物价飞涨，不知何时多出的教堂前排起长队，连"存档点"的老板娘都在吧台后磨刀。暴风雨前的平静，原来是有声音的。',
  effect: { attr: { int: 1, spr: 1 } }
},

// ---- 霸总 · 终局铺垫 ----

{
  id: 'ev_n3_bazong_fengbao',
  age: [36, 46],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  kind: 'fate',
  cond: { attr: { mny: { gte: 15 } } },
  text: '资本市场风向突变：三家海外基金同时做空厉氏关联产业，顾氏传媒的通稿火力全开，连一向中立的沈家都开始增持现金。助理把报告放在你桌上时，手是抖的——所有人都闻到了决战的味道。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_bazong_tanpai',
  age: [38, 48],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  cond: { anyFlag: ['bazong_contract', 'bazong_renew'] },
  text: '深夜书房，厉承烨把所有底牌摊在你面前：股权结构、离岸账户、还有他准备了三年的反收购预案。"以前我习惯一个人扛，"他顿了顿，"现在，我想问你愿不愿意和我一起打完这一仗。"',
  choices: [
    { text: '"废话，夫妻同心，其利断金。"', effect: { attr: { spr: 2, mny: 1 } }, result: '他怔了怔，笑了。那晚书房的灯亮到凌晨四点，作战图上并排签着两个名字。', kind: 'good', big: true },
    { text: '"先说好，输了家产分我一半。"', effect: { attr: { spr: 2, int: 1 } }, result: '他笔尖一顿："我的早就是你的。"顿了顿又补一句："所以不存在输。"', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n3_bazong_xinlu',
  age: [38, 50],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  text: '大战前的清晨，你站在落地窗前看这座城苏醒。从被雷劈进这本书那天算起，你斗过白月光、撕过恶婆婆、收购过对家……如今棋至残局，你忽然很想感谢当年那道雷。',
  effect: { attr: { spr: 3 } }
},

// ---- 霸总 · 豪门风物 lore ----

{
  id: 'ev_n3_bazong_yiyuan',
  age: [22, 48],
  pool: 'novel_bazong',
  weight: 8,
  text: '豪门的私人医院像五星级酒店：VIP病房带江景，体检报告用烫金封皮，院长见你第一句永远是"气色真好"。你后来才知道，他们对所有人都这么说——这叫情绪价值。',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_bazong_paimai',
  age: [24, 48],
  pool: 'novel_bazong',
  weight: 8,
  text: '拍卖行是豪门的第二战场：举牌即表态，落槌即站队，一幅画背后是三家公司股价的涨跌。你学会的第一课是——永远不要为喜欢的东西第一个举牌。',
  effect: { attr: { int: 2 } }
},
{
  id: 'ev_n3_bazong_saima',
  age: [26, 48],
  pool: 'novel_bazong',
  weight: 7,
  text: '周末赛马会，太太们比帽子，先生们比眼光。你随手买的那匹"灰姑娘"爆冷夺冠，全场名媛的笑容同时凝固——你看盘的眼光，从此成了圈内传说。',
  effect: { attr: { mny: 1, spr: 2 } }
},
{
  id: 'ev_n3_bazong_xintuo',
  age: [26, 50],
  pool: 'novel_bazong',
  weight: 7,
  text: '家族信托律师讲了三个小时架构设计：离岸、防火墙、代持……你终于明白豪门为什么富过三代——人家的离婚、破产和意外，都提前写进了合同。',
  effect: { attr: { int: 2 } }
},
{
  id: 'ev_n3_bazong_guanjia',
  age: [22, 46],
  pool: 'novel_bazong',
  weight: 8,
  text: '厉家老管家是个宝藏：会八国语言，记得住三百位宾客的忌口，还能在厉承烨皱眉前三秒递上胃药。他悄悄告诉你秘诀："在这个家，总裁是面子，您才是里子。"',
  effect: { attr: { spr: 2, chr: 1 } }
},
{
  id: 'ev_n3_bazong_zhuanfang',
  age: [24, 46],
  pool: 'novel_bazong',
  weight: 8,
  text: '你上了财经频道专访，主持人问成功秘诀，你答："主要是运气好。"播出后"运气好"三个字被做成表情包，公关部连夜开会研究你的凡尔赛式公关学。',
  effect: { attr: { chr: 1, spr: 2 } }
},

// ---- 霸总 · 新支线（商战与拉扯） ----

{
  id: 'ev_n3_bazong_wajue',
  age: [26, 42],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '顾氏三倍年薪挖厉氏核心技术团队，团队负责人深夜约你喝茶，欲言又止。',
  choices: [
    { text: '加钱加股权留人', cond: { attr: { mny: { gte: 5 } } }, effect: { attr: { mny: -2, spr: 1 } }, result: '你把股权协议推过去："要走的留不住，要留的给足。"第二天，团队集体撤回了辞呈。', kind: 'good', big: true },
    { text: '放人，然后釜底抽薪', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2 } }, result: '你早把核心专利拆分注册在个人名下。团队走了三天，又灰溜溜地回来了——顾氏花三倍年薪，买了个空壳。', kind: 'good', big: true }
  ]
},
{
  id: 'ev_n3_bazong_jiayun',
  age: [26, 40],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  kind: 'bad',
  text: '白月光忽然召开记者会，含泪暗示怀了厉承烨的孩子，热搜连爆三条，全城的瓜农倾巢而出。',
  choices: [
    { text: '直接晒时间线打脸', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 2 } }, result: '你列出他过去半年的行程——其中四个月在国外陪你。记者会变成她的塌房现场，直播弹幕全是"退票"。', kind: 'good', big: true },
    { text: '让子弹飞一会儿', effect: { attr: { spr: 1 } }, result: '三天后她的公司股价先崩了——有人比你更沉不住气，直接发了律师函，署名：厉承烨。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_bazong_lianyin',
  age: [28, 44],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  text: '沈家家主亲自登门提亲，想让独子娶你名义上的妹妹——明眼人都看得出，这是要用姻亲把厉家绑上沈家的船。',
  choices: [
    { text: '促成，但条款往死里谈', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 2, int: 1 } }, result: '你把彩礼谈成了港口三成股权。沈家主签字时手在抖："厉夫人，比传闻中难对付。"', kind: 'good', big: true },
    { text: '先问当事人的意思', effect: { attr: { spr: 2 } }, result: '妹妹红着脸说自己早有心上人——是顾家二公子。你扶额：这剧情，作者是懂对称的。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_bazong_zachang',
  age: [26, 44],
  pool: 'novel_bazong',
  weight: 8,
  text: '厉氏新品发布会上，被对家买通的记者连环发难，直播弹幕瞬间被水军淹没。',
  choices: [
    { text: '现场拆穿', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { chr: 1, spr: 2 } }, result: '你当场调出该记者的收款记录投到大屏。直播人数翻了三倍——全网都说这发布会比电视剧好看。', kind: 'good', big: true },
    { text: '冷处理，用产品说话', effect: { attr: { mny: 1, spr: 1 } }, result: '新品首销当天卖断货。水军的通稿还挂在热搜上，评论区全是晒单。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_bazong_eyi',
  age: [30, 46],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  text: '海外财团恶意收购厉氏旗下核心子公司，报价狠辣，白衣骑士迟迟未现。',
  choices: [
    { text: '亲自飞过去谈判', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { mny: 2, spr: 2 } }, result: '你用对方母公司的债务漏洞反将一军，收购案变成你的战利品展。下飞机时，厉承烨举着"欢迎董事长凯旋"的牌子——全公司都疯了。', kind: 'good', big: true },
    { text: '断臂求生，出售止损', effect: { attr: { mny: 1, spr: -1 } }, result: '交割那天你请被裁的员工吃了顿饭，承诺三年内挨个请回来。三年后，你做到了。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_bazong_shilian',
  age: [32, 48],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  text: '股东大会前夜，手握关键一票的小股东突然失联——内线说，他被对家请去南方"度假"了。',
  choices: [
    { text: '连夜飞过去找人', cond: { attr: { luk: { gte: 4 } } }, effect: { attr: { mny: 1, spr: 2 } }, result: '你在度假村的麻将桌上找到他，陪打了一宿。天亮时他揉着肩膀："票给你。牌品见人品。"', kind: 'good', big: true },
    { text: '启动B计划，改组议案', effect: { attr: { int: 1, spr: 1 } }, result: '你连夜把议案拆成三个独立表决项，绕过那一票。散会时对手的脸色，比提案本身精彩。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_bazong_daiyan',
  age: [24, 42],
  pool: 'novel_bazong',
  weight: 8,
  text: '顶流代言人深夜塌房，品牌部乱成一锅粥，公关总监的电话烫手。',
  choices: [
    { text: '凌晨两点发解约声明', effect: { attr: { int: 2, mny: -1 } }, result: '切割快准狠，被网友称为"教科书级解约"，品牌好感度不降反升。代价是你只睡了三个小时。', kind: 'good', big: true },
    { text: '再观察一天风向', effect: { attr: { spr: -2 } }, result: '第二天塌得更彻底，你含泪多付了一倍公关费。这学费叫：犹豫就会败北。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_bazong_cipai',
  age: [28, 46],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '慈善拍卖夜，你捐出结婚时的钻石项链。顾太太举牌抬价三次，隔着半个会场冲你挑眉。',
  choices: [
    { text: '陪她抬到底', cond: { attr: { mny: { gte: 6 } } }, effect: { attr: { mny: -2, spr: 2 } }, result: '你以十倍估价拍回自己的项链，致辞只一句："慈善无输赢，但今晚确实有。"全场起立鼓掌。', kind: 'good', big: true },
    { text: '微笑放手', effect: { attr: { spr: 1, int: 1 } }, result: '顾太太高价接盘一条她并不需要的项链，笑容逐渐僵硬。你端着香槟，冲她遥遥致意。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_bazong_jiajia',
  age: [34, 48],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  text: '你主导的跨国并购收官在即，对方CEO在签约桌上临时加价一成，笃定你骑虎难下。',
  choices: [
    { text: '合上文件，起身就走', effect: { attr: { mny: 2, int: 1 } }, result: '你走到电梯口时，对方追出来全盘接受原条件。厉承烨听完汇报沉默良久："还好我们是夫妻，不是对手。"', kind: 'good', big: true },
    { text: '咬牙接受', effect: { attr: { mny: -2, spr: -1 } }, result: '签完你发现对方财报有粉饰痕迹。这学费，交得肉疼，但你记了一辈子。', kind: 'bad' }
  ]
},

// ---- 霸总 · 商战日常与感情拉扯 ----

{
  id: 'ev_n3_bazong_naicha',
  age: [24, 44],
  pool: 'novel_bazong',
  weight: 8,
  text: '你把奶茶店开进厉氏大厦底层，主打产品"总裁同款冰美式（其实总裁喝热水）"。首月流水让集团CFO沉默了十分钟。',
  effect: { attr: { mny: 2, spr: 1 } }
},
{
  id: 'ev_n3_bazong_lengzhan',
  age: [26, 42],
  pool: 'novel_bazong',
  weight: 7,
  text: '和厉承烨冷战第三天，家里安静得能听见冰箱制冰。第四天清晨，你床头多了一杯热牛奶和一张字条："认输。下次吵架能不能别超过72小时？胃药要过期了。"',
  effect: { attr: { spr: 1 } }
},
{
  id: 'ev_n3_bazong_xieshu',
  age: [26, 44],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'good',
  text: '你匿名写的小说《和霸总协议结婚的日子》爆火，读者催更催上热搜。打赏榜第一的ID叫"文中男主原型"——你看了看正在厨房煮面的某人，决定装傻。',
  effect: { attr: { spr: 3, chr: 1 } }
},
{
  id: 'ev_n3_bazong_zili',
  age: [26, 44],
  pool: 'novel_bazong',
  weight: 8,
  text: '谈判桌上对家老总摆资历："我经商时你还在上学。"你把上季度财报推过去："所以您该庆幸，我上学时您没遇到我。"你的助理憋笑憋出了内伤。',
  effect: { attr: { spr: 2, int: 1 } }
},
{
  id: 'ev_n3_bazong_jiahui',
  age: [28, 46],
  pool: 'novel_bazong',
  weight: 7,
  text: '家族聚会，七大姑八大姨轮番催生孩子、问分红、打听股价。厉承烨全程给你剥虾，用行动堵所有问题——虾堆成小山时，全场识趣地换了话题。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_bazong_pinpai',
  age: [26, 42],
  pool: 'novel_bazong',
  weight: 8,
  text: '你的个人品牌上线首日服务器被挤爆，程序员连夜扩容。庆功宴上你举杯："感谢厉总提供的服务器。"厉承烨纠正："是夫妻共同财产。"',
  effect: { attr: { mny: 2, spr: 2 } }
},
{
  id: 'ev_n3_bazong_taifeng',
  age: [28, 44],
  pool: 'novel_bazong',
  weight: 7,
  text: '结婚纪念日，厉承烨包下整座海岛，结果台风预警，直升机停飞。两位身价千亿的总裁夫妇被困候机厅吃泡面。你嗦着面说："这纪念日，比包岛难忘。"',
  effect: { attr: { spr: 2, chr: 1 } }
},
{
  id: 'ev_n3_bazong_shamat',
  age: [28, 44],
  pool: 'novel_bazong',
  weight: 7,
  text: '对家买通稿黑你"靠脸上位"，配图是你大学时期的杀马特照片。你反手转发并配文"感谢考古，证明我十年如一日的发量"，热搜画风瞬间跑偏。',
  effect: { attr: { spr: 1, chr: 1 } }
},
{
  id: 'ev_n3_bazong_nianhui',
  age: [26, 46],
  pool: 'novel_bazong',
  weight: 8,
  text: '公司年会，你抽中特等奖"与总裁共进晚餐"。全场起哄，厉承烨面不改色地宣布："奖品升级——与总裁共进余生。"土味但有效，当晚集团股价微涨。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_bazong_yanjiang',
  age: [30, 46],
  pool: 'novel_bazong',
  weight: 7,
  text: '母校邀你回校演讲，台下学生提问："嫁入豪门是什么体验？"你答："嫁之前我是豪门，嫁之后我们是豪门。"掌声雷动，当晚这句话传遍全网。',
  effect: { attr: { chr: 1, spr: 2, int: 1 } }
},
{
  id: 'ev_n3_bazong_dahuo',
  age: [30, 46],
  pool: 'novel_bazong',
  weight: 7,
  kind: 'bad',
  text: '供应链核心工厂突发大火，交期在即，违约金是天价。你三天睡了六个小时，终于在备选产线上抢出产能。走出车间时，晨光正好。',
  effect: { attr: { str: -1, int: 2, mny: 1 } }
},
{
  id: 'ev_n3_bazong_beizhu',
  age: [26, 42],
  pool: 'novel_bazong',
  weight: 8,
  text: '厉承烨学会了新技能：在你开会时送奶茶，备注"厉太太专属"。全公司开始赌总裁明天备注什么，行政部顺势成立了奶茶基金。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_bazong_xiangce',
  age: [28, 48],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  kind: 'good',
  text: '婆婆六十大寿，你送的礼物是一本相册——她年轻时创业的老照片，你托人一张张修复的。老太太翻到第三页就红了眼眶，拉着你的手坐到了主桌。',
  effect: { attr: { spr: 3, chr: 1 } }
},
{
  id: 'ev_n3_bazong_zuokong',
  age: [32, 48],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  text: '空头机构发布百页做空报告，标题惊悚。你只回了一句话："已阅，建议作者改行写小说——可惜想象力用错了地方。"三天后报告漏洞被逐一拆穿，机构巨亏离场。',
  effect: { attr: { mny: 2, int: 2 } }
},
{
  id: 'ev_n3_bazong_qingrenjie',
  age: [24, 40],
  pool: 'novel_bazong',
  weight: 8,
  text: '情人节，全公司收到总裁办通知：今日加班双倍工资，理由是"总裁要约会，各位都是帮凶"。员工纷纷表示这种帮凶可以天天当。',
  effect: { attr: { spr: 2, mny: -1 } }
},
{
  id: 'ev_n3_bazong_emba',
  age: [24, 44],
  pool: 'novel_bazong',
  weight: 7,
  text: '你报了商学院EMBA，同学一半是冲你人脉来的。结课时你说了句大实话："人脉不是资源，是信任——信任没法共享，只能自己挣。"',
  effect: { attr: { int: 2, spr: 1 } }
},
{
  id: 'ev_n3_bazong_qiyue2',
  age: [34, 50],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  big: true,
  kind: 'fate',
  text: '整理旧物时你翻出当年那份契约，胶带已经发黄。厉承烨从背后环住你："当年你要是签得干脆点，我们还能多谈两年恋爱。"你把契约锁进了保险柜最里层。',
  effect: { attr: { spr: 3 } }
},
{
  id: 'ev_n3_bazong_banjiang',
  age: [36, 50],
  pool: 'novel_bazong',
  weight: 7,
  text: '商界年度人物颁奖典礼，你和厉承烨同时入围。主持人问谁更希望对方获奖，你们异口同声："我。"全场大笑——势均力敌的夫妻，连谦让都要卷。',
  effect: { attr: { spr: 2, chr: 1 } }
},
{
  id: 'ev_n3_bazong_rioluo',
  age: [38, 50],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '决战前夜，你把手机调成静音，和厉承烨在阳台看完了整场日落。谁都没提明天的董事会，但碰杯的时候，两只杯子的声音都特别稳。',
  effect: { attr: { spr: 2, int: 1 } }
},

// ---- 末世 · 终局铺垫 ----

{
  id: 'ev_n3_moshi_bianyi',
  age: [34, 44],
  pool: 'novel_moshi',
  weight: 9,
  once: true,
  kind: 'fate',
  cond: { flags: ['moshi_power'] },
  text: '前线侦察连带回坏消息：病毒开始二次变异，新型变异体出现了协作迹象，尸群的移动方向前所未有地一致——全都朝着人类最后的安全区。军医放下报告："留给我们的时间，按天算了。"',
  effect: { attr: { int: 1, spr: -1 } }
},
{
  id: 'ev_n3_moshi_dongyuan',
  age: [35, 46],
  pool: 'novel_moshi',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  cond: { attr: { str: { gte: 18 } } },
  text: '决战总动员令签署的那个下午，基地广播循环播放战前通告。铁匠铺炉火彻夜不熄，学校提前放假，酒馆老板把存酒全搬了出来："打完这仗我请客——活着的都来。"',
  choices: [
    { text: '登台做战前演讲', cond: { attr: { chr: { gte: 5 } } }, effect: { attr: { spr: 2, str: 1 } }, result: '你站上高台只说了三句话，台下的火把连成了海。有人喊你的名字，然后所有人都在喊。', kind: 'good', big: true },
    { text: '挨个巡查最后一遍防线', effect: { attr: { int: 1, str: 1 } }, result: '你摸黑走完整整十公里城墙，拧紧了七处铁丝网。哨兵们说，你在，大家就睡得着。', kind: 'good' }
  ]
},
{
  id: 'ev_n3_moshi_dengta',
  age: [36, 48],
  pool: 'novel_moshi',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  text: '决战前夜，你爬上最高的瞭望塔。探照灯扫过无垠废土，远处是黑压压的尸潮，身后是万家灯火——末世第十年，你守着的早已不是一座基地，是"人类"这两个字。',
  effect: { attr: { spr: 2, int: 1 } }
},

// ---- 末世 · 废土风物 lore ----

{
  id: 'ev_n3_moshi_guangbo',
  age: [20, 46],
  pool: 'novel_moshi',
  weight: 8,
  text: '基地广播站每晚七点开播：寻人启事、失物招领、明日天气（永远是"局部地区有尸潮"）。最火的是点歌台，今晚有人给守夜的兄弟点了首《明天会更好》，全基地跟着哼。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_moshi_nongchang',
  age: [20, 48],
  pool: 'novel_moshi',
  weight: 8,
  text: '地下农场是无土栽培的奇迹：荧光灯管当太阳，营养液当土壤。第一茬草莓成熟那天，全基地按人头分，每人一颗——酸得龇牙咧嘴，甜得眼眶发热。',
  effect: { attr: { spr: 2, str: 1 } }
},
{
  id: 'ev_n3_moshi_jijie',
  age: [22, 48],
  pool: 'novel_moshi',
  weight: 7,
  text: '废土上的季节有自己的名字：尸潮季、拾荒季、封冻季，以及所有人最盼的"开春季"。老人说末世前叫四季，名字更好听，可惜没人记得全了。',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_moshi_yiwu',
  age: [20, 46],
  pool: 'novel_moshi',
  weight: 8,
  text: '拾荒队带回一批旧世界遗物：咖啡机、游戏手柄、一本婚纱照相册。相册被孩子们传看了三天，最后一页写着一行褪色的字："愿你们的婚纱照，背景不是废墟。"',
  effect: { attr: { spr: 1 } }
},
{
  id: 'ev_n3_moshi_youxi',
  age: [20, 44],
  pool: 'novel_moshi',
  weight: 8,
  text: '基地的孩子们发明了新游戏"丧尸捉人"，被抓到的人要学丧尸走路。你路过时被一群小丧尸围攻，只好配合地倒下——孩子们的笑声，是这末世最硬的通货。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_moshi_jinianbi',
  age: [24, 48],
  pool: 'novel_moshi',
  weight: 7,
  text: '基地发行了内部纪念币：正面是瞭望塔，背面刻着建基地那年的日期。老烟鬼把第一枚打孔穿绳挂在脖子上："等重建了，这玩意儿就是文物——证明咱从末世里趟过来了。"',
  effect: { attr: { spr: 2 } }
},

// ---- 末世 · 新支线（人性抉择） ----

{
  id: 'ev_n3_moshi_geli',
  age: [22, 40],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  text: '巡逻队抓回一名疑似感染者：伤口形状像抓痕，但他坚称是铁丝划的。隔离观察要耗珍贵药品；放人，可能酿成灭顶之灾。',
  choices: [
    { text: '隔离，并亲自陪护', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 2 } }, result: '第三天伤口结痂，不是感染。他出隔离区时对你深深鞠躬——后来成了你最得力的巡逻队长。', kind: 'good', big: true },
    { text: '驱逐出基地', effect: { attr: { spr: -2 } }, result: '一周后他的尸体出现在路边，死于普通伤口引发的败血症。那晚，你多喝了半斤。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_moshi_fenliang',
  age: [24, 44],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  text: '冬储粮只够七成人过冬。会议上两种声音吵成一团：按劳分配，还是按人头均分。所有人都在等你拍板。',
  choices: [
    { text: '按人头分，干部减半', effect: { attr: { spr: 2, int: 1 } }, result: '方案公布那天没人闹事——因为干部们的饭盆比谁都浅。这个冬天难熬，但没人掉队。', kind: 'good', big: true },
    { text: '按劳分配，多劳多得', effect: { attr: { mny: 1, spr: -1 } }, result: '粮仓守住了。但开春后你数了数，基地少了三十一张熟悉的面孔。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_moshi_junxu',
  age: [26, 44],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '你最信任的军需官私吞药品倒卖，人赃并获。按基地法，当处决。他跪在地上，说家里老娘还病着。',
  choices: [
    { text: '依法处置，但养他母亲终老', effect: { attr: { int: 2, spr: -1 } }, result: '行刑那天全基地默哀。你去接他母亲时，老人拉着你的手："孩子，你做得对——是我没教好他。"', kind: 'good', big: true },
    { text: '废去职务，留用观察', effect: { attr: { spr: -1, int: -1 } }, result: '半年后他再次倒卖，这次害死了三个伤员。刑前你只说了一句："上次，是我错了。"', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_moshi_liulang',
  age: [22, 42],
  pool: 'novel_moshi',
  weight: 8,
  text: '基地外来了三十几个衣衫褴褛的流浪者，为首的女人说他们来自被攻破的北方基地，只求一块遮雪的墙根。',
  choices: [
    { text: '开城门收容', effect: { attr: { spr: 2, mny: -1 } }, result: '流浪者里有铁匠、兽医和两个老师。三个月后，你无比庆幸那晚开了门。', kind: 'good', big: true },
    { text: '给粮放行，不留人', effect: { attr: { spr: -1 } }, result: '他们消失在风雪里。之后每年初雪，城墙上都会多一碗没人动过的热汤——你放的。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_moshi_toupiao',
  age: [26, 46],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  big: true,
  text: '基地第一次全民投票：是否出兵救援百里外被围的邻盟。赞成票险胜三票。你宣布结果时，反对者也默默背起了枪——废土上的民主，是吵完架还能并肩。',
  effect: { attr: { spr: 2, int: 1 } },
  kind: 'good'
},
{
  id: 'ev_n3_moshi_shenpan',
  age: [24, 44],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  text: '掠夺团俘虏的审判大会，群情激愤要求全部处决。人群中忽然有个孩子喊："他们抢粮，是不是因为也在挨饿？"全场安静了。',
  choices: [
    { text: '愿意归降的，编入劳役队', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { spr: 2 } }, result: '三年后，劳役队成了基地最能打的工程营。当年发问的那个孩子，现在是你的书记员。', kind: 'good', big: true },
    { text: '全部处决，以儆效尤', effect: { attr: { spr: -3 } }, result: '刑场的血渗进冻土。你赢了威慑，却像输了点什么，说不清。', kind: 'bad' }
  ]
},
{
  id: 'ev_n3_moshi_xuexiao',
  age: [26, 46],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  big: true,
  kind: 'good',
  text: '你拍板在基地建一所学校，反对声不小："末世识字有什么用？"你只说了一句："末世会结束，孩子要活在结束之后。"开学那天，三十个孩子齐声念"人之初"，守门的壮汉哭得像个孩子。',
  effect: { attr: { spr: 3 } }
},
{
  id: 'ev_n3_moshi_laoren',
  age: [26, 46],
  pool: 'novel_moshi',
  weight: 7,
  text: '基地的老人自发组成"经验队"：认得哪种野菜能吃，记得哪口老井没枯，会接生，会看云识天气。你给他们发了双倍配给——在废土上，记忆本身就是战略物资。',
  effect: { attr: { int: 1, spr: 1 } }
},
{
  id: 'ev_n3_moshi_yuanzheng',
  age: [28, 46],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  text: '远征队申请穿越死亡辐射区，寻找传说中的国家种子库。九死一生。全队的请战书按满了红手印。',
  choices: [
    { text: '批准，亲自带队', cond: { attr: { str: { gte: 7 } } }, effect: { attr: { spr: 2, str: -1 } }, result: '三个月后你们抬回二十箱种子，队伍少了两个人。播种那天，你用他们的名字命名了两块田。', kind: 'good', big: true },
    { text: '否决，保存实力', effect: { attr: { spr: -1 } }, result: '那年秋天，"种子库"三个字成了基地里不能提的念想。你不知道这个决定是对是错，只知道是你做的。', kind: 'bad' }
  ]
},

// ---- 末世 · 基地建设与人性微光 ----

{
  id: 'ev_n3_moshi_yiyuan',
  age: [24, 46],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'good',
  text: '基地医院落成：三间板房，两台手术灯，一位末世前的外科主任。第一台手术成功的消息传开时，有人放起了珍藏的鞭炮——被巡逻队追了半条街。',
  effect: { attr: { spr: 2, str: 1 } }
},
{
  id: 'ev_n3_moshi_chengqiang',
  age: [22, 46],
  pool: 'novel_moshi',
  weight: 9,
  text: '城墙二期加固完工：十米高的混凝土墙，瞭望塔装上了探照灯。竣工那天孩子们用炭在墙上画满涂鸦，你没让擦——防线防的是丧尸，不是生活。',
  effect: { attr: { spr: 2, mny: -1 } }
},
{
  id: 'ev_n3_moshi_maoyizhan',
  age: [24, 48],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'good',
  text: '你主导的贸易站开市：三大基地以物易物，晶核结算，规矩刻在门口石碑上。首日成交额超预期三倍，连"铁齿"掠夺团都派人来换药——枪没离手，但生意照做。',
  effect: { attr: { mny: 2, spr: 1 } }
},
{
  id: 'ev_n3_moshi_diantai',
  age: [22, 44],
  pool: 'novel_moshi',
  weight: 8,
  text: '修复的老电台终于响起人声："这里是曙光基地，频率121.5，有人吗？"沉默十秒后，七个基地先后应答。那晚全基地失眠——原来世界上，还有这么多人活着。',
  effect: { attr: { spr: 3 } }
},
{
  id: 'ev_n3_moshi_kuaiji',
  age: [22, 44],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'bad',
  text: '新人入伙三个月，管仓库的老王始终不肯交钥匙。你问原因，老王说："他末日前的职业栏写的是会计，可他打算盘的手势不对。"三天后，那人卷了半箱药品跑了。',
  effect: { attr: { int: 1, spr: -1 } }
},
{
  id: 'ev_n3_moshi_shuijing',
  age: [20, 44],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'bad',
  text: '主水井水位骤降，有人夜里偷水浇自家菜地。基地颁布限水令，你家菜地第一个枯了——规矩，得从立规矩的人身上先长出来。',
  effect: { attr: { spr: -1, int: 1 } }
},
{
  id: 'ev_n3_moshi_xinsheng',
  age: [24, 46],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'good',
  text: '基地迎来末世后的第十个新生儿。满月酒上，老烟鬼喝多了，抱着孩子哼起跑调的摇篮曲。啼哭声和跑调声混在一起，是末世最好的交响乐。',
  effect: { attr: { spr: 3 } }
},
{
  id: 'ev_n3_moshi_xunluo',
  age: [20, 44],
  pool: 'novel_moshi',
  weight: 9,
  text: '例行巡逻，你带队绕城墙走一圈：检查铁丝网、补充陷阱、给哨兵送热汤。三年三百趟，一趟都没出事——平安从来不是运气，是走出来的。',
  effect: { attr: { str: 1, int: 1 } }
},
{
  id: 'ev_n3_moshi_dianying',
  age: [22, 46],
  pool: 'novel_moshi',
  weight: 8,
  text: '露天电影夜：幕布是床单，放映机是拾荒来的老古董，片子是末世前的合家欢喜剧。放到一半发电机熄火，全场安静三秒，然后有人打着手电把结局讲完了。',
  effect: { attr: { spr: 3 } }
},
{
  id: 'ev_n3_moshi_liugan',
  age: [26, 44],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'bad',
  text: '一场普通流感在基地蔓延，比尸潮更让人心慌。你把指挥部搬进隔离区，半个月后疫情平息。走出隔离区时你懂了：末世的敌人，从来不止丧尸。',
  effect: { attr: { str: -1, int: 2 } }
},
{
  id: 'ev_n3_moshi_mujiang',
  age: [24, 46],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'good',
  text: '老木匠带徒弟们打出基地第一批课桌椅，刨花香味飘了半条街。他摸着椅背说："十年没打过不装枪托的木头了，手生。"',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_moshi_yanti',
  age: [24, 44],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'bad',
  text: '侦察排在北边发现军方废弃掩体，墙上的作战地图还标着"最终防线"。日志显示，那道防线在命令下达的第九天失守。你把地图带回作战室——记住失败，比纪念胜利有用。',
  effect: { attr: { int: 2, spr: -1 } }
},
{
  id: 'ev_n3_moshi_hunli',
  age: [26, 46],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'good',
  text: '基地办了场集体婚礼：七对新人，婚纱是窗帘改的，戒指是弹壳磨的。证婚人老烟鬼哽咽着念完祝词，最后一句是："都给我活到金婚！"',
  effect: { attr: { spr: 3 } }
},
{
  id: 'ev_n3_moshi_qiushou',
  age: [28, 48],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  text: '末世第十年的秋收，田里翻着真正的麦浪。粮仓装不下的部分晒满了广场，孩子们躺在谷堆上打滚。老农抓了把麦粒搓了搓，吹掉壳放进嘴里，嚼了很久很久。',
  effect: { attr: { spr: 3 } }
},
{
  id: 'ev_n3_moshi_zhanbao',
  age: [24, 44],
  pool: 'novel_moshi',
  weight: 7,
  text: '广播站开始播"每日战报"：物资存量、巡逻排班、婴儿出生数。有人问为什么坏消息也播，播音员答："大家一起扛的，就不算坏消息。"',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_moshi_qiangwei',
  age: [28, 48],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  text: '你发现西墙的裂缝里开了一丛蔷薇，没人种过。卫兵要铲，你拦下了。第二天全基地的孩子都跑来看花，你索性在旁边立了块牌子：观赏区，闲人欢迎。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_moshi_buhuan',
  age: [26, 46],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'bad',
  text: '"铁齿"掠夺团送来谈判书：用三车弹药，换你们的医疗教官。你盯着"换"字看了很久，提笔回了四个字："人，不换。"当夜，医疗队驻地加派了双岗。',
  effect: { attr: { spr: 1, int: 1 } }
},
{
  id: 'ev_n3_moshi_lieji',
  age: [30, 48],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  text: '狩猎季结束：粮仓满、弹药足、城墙无损，阵亡名单十年来第一次空白。庆功宴上你把第一杯酒洒在地上："敬没等到今天的人。"全场安静，然后所有人做了同样的动作。',
  effect: { attr: { spr: 2 } }
},
{
  id: 'ev_n3_moshi_shuxin',
  age: [32, 48],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  kind: 'fate',
  text: '一封从南方基地辗转半年送达的信，寄信人是你失散多年的旧友，全文只有一句："我还活着，你撑住。"你把信纸抚平，压在作战室地图的透明板下——每次开会，都看得见。',
  effect: { attr: { spr: 3 } }
},
{
  id: 'ev_n3_moshi_nianan',
  age: [36, 48],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '决战动员的最后一晚，你在基地名册上逐一签字。签到最后一个新生儿时，笔尖顿住了——名字一栏写着"念安"。母亲在旁边轻声说："念着平安，就能平安。"',
  effect: { attr: { spr: 2, int: 1 } }
}
];
