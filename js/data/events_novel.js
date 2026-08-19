// 书中界（小说穿越）事件：武侠 / 无限流 / 霸总 / 末世
var EVENTS_NOVEL = [

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
    { text: '回归人间，万家灯火', effect: { setFlags: ['wuxian_win'], attr: { str: 2, int: 2, luk: 1 } }, result: '你拒绝了权柄，选择回到人间烟火里。主神躬身送你离开，空间里从此流传着一个拒绝成神的传说。', kind: 'good', big: true }
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
    { text: '踏入裂缝，走向新生', effect: { setFlags: ['moshi_win'], attr: { str: 2, int: 2, spr: 1 } }, result: '你踏入裂缝，走向重建后的新世界。那里有炊烟，有书声，有你亲手挣来的明天。', kind: 'good', big: true }
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
},

// ========== 第四轮扩充：门派日常·新副本·商战家族·基地微光（ev_n4_） ==========

// ---- 武侠 ----

{
  id: 'ev_n4_wx_biaoju_tour',
  age: [16, 20],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '镇远镖局门口贴出告示招趟子手，总镖头坐在太师椅上打量每一个来人。你往人堆里一站，他冲你抬了抬下巴。',
  choices: [
    { text: '上前耍趟拳应聘', cond: { attr: { str: { gte: 4 } } },
      effect: { attr: { str: 1 }, setFlags: ['n4_wx_biao1'] },
      result: '总镖头点点头："明儿跟车。"你成了吃镖行饭的人。', kind: 'good' },
    { text: '摇摇头离开',
      effect: { attr: { spr: 1 } },
      result: '镖行的水太深，你觉得还是自由身快活。' }
  ]
},

{
  id: 'ev_n4_wx_biaoju_first',
  age: [18, 32],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  cond: { flags: ['n4_wx_biao1'] },
  text: '你第一次跟镖，夜宿荒村，三更时分林子里亮起十几点火把，镖旗在风里猎猎作响。',
  choices: [
    { text: '敲响铜锣结阵稳守', cond: { attr: { int: { gte: 5 } } },
      effect: { attr: { str: 1 }, setFlags: ['n4_wx_biao2'] },
      result: '劫匪见你们阵脚不乱，骂骂咧咧退了，老镖头对你刮目相看。', kind: 'good' },
    { text: '抄起单刀先冲出去',
      effect: { attr: { str: 2, spr: -1 }, setFlags: ['n4_wx_biao2'] },
      result: '你砍翻两人挂了彩，镖银保住了，老镖头直摇头说你莽。' },
    { text: '提议谈判花钱消灾', cond: { attr: { chr: { gte: 5 } } },
      effect: { attr: { chr: 1 }, coin: -30, setFlags: ['n4_wx_biao2'] },
      result: '对方要了三成买路钱，镖头脸黑了一路，但人货两全。' }
  ]
},

{
  id: 'ev_n4_wx_biaoju_master',
  age: [24, 40],
  pool: 'novel_wuxia',
  weight: 5,
  once: true,
  big: true,
  cond: { flags: ['n4_wx_biao2'] },
  text: '老镖头把你叫到堂前，把总镖头的铜印往桌上一放："我老了，这口印，你接不接？"',
  choices: [
    { text: '接印', 
      effect: { attr: { mny: 2, chr: 1 } },
      result: '你成了总镖头，镖旗所到之处，黑白两道都给三分薄面。', kind: 'good', big: true },
    { text: '推辞，只想走镖',
      effect: { attr: { spr: 2 } },
      result: '你这辈子就想听镖铃响，不想管账。老镖头笑骂你没出息。' }
  ]
},

{
  id: 'ev_n4_wx_siguo_punish',
  age: [16, 25],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '你失手打碎了掌门心爱的琉璃盏，被发落上思过崖面壁三日。崖上风大，云雾就在脚底下翻。',
  choices: [
    { text: '老实面壁',
      effect: { attr: { spr: -1, int: 1 }, setFlags: ['n4_wx_sg1'] },
      result: '对着崖壁三天，你竟觉得心静了不少。' },
    { text: '偷偷练剑解闷',
      effect: { attr: { str: 1 } },
      result: '反正没人看见，你在崖顶把剑法耍了个遍。' }
  ]
},

{
  id: 'ev_n4_wx_siguo_wall',
  age: [17, 30],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  cond: { flags: ['n4_wx_sg1'] },
  text: '面壁到第二日，你发现崖壁上有一道极深的剑痕，走势凌厉，绝非本门路数，旁边还刻着几个模糊小字。',
  choices: [
    { text: '依着剑痕比划领悟', cond: { attr: { str: { gte: 5 } } },
      effect: { attr: { str: 1, int: 1 }, setFlags: ['n4_wx_sg2'] },
      result: '比划了上百遍，你隐约摸到一点前人留下的剑路。', kind: 'good' },
    { text: '抄下那几个小字',
      effect: { attr: { int: 1 }, setFlags: ['n4_wx_sg2'] },
      result: '字迹被风雨磨得只剩一半："恨……未能……"', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wx_siguo_truth',
  age: [20, 36],
  pool: 'novel_wuxia',
  weight: 5,
  once: true,
  big: true,
  kind: 'fate',
  cond: { flags: ['n4_wx_sg2'] },
  text: '多年后你重上思过崖，撬开剑痕下松动的石片，里面藏着一封油布书信——百年前一位前辈被逐出师门的真相，字字泣血。',
  effect: { attr: { spr: 1, int: 1 }, setFlags: ['n4_wx_sg3'] }
},

{
  id: 'ev_n4_wx_zhaoqin_drum',
  age: [18, 30],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '城东绸缎庄搭起高台比武招亲，小姐在珠帘后若隐若现，台下挤满了提刀挎剑的汉子。鼓声一响，血都热了。',
  choices: [
    { text: '跳上擂台', cond: { attr: { str: { gte: 5 } } },
      effect: { attr: { str: 1 }, setFlags: ['n4_wx_zq1'] },
      result: '你连赢三场，台下喝彩声震得瓦片嗡嗡响。', kind: 'good' },
    { text: '在台下押注',
      effect: { coin: 50 },
      result: '你押中了最后赢的那个黑脸汉子，小赚一笔。' },
    { text: '看完就走',
      effect: { attr: { spr: 1 } },
      result: '热闹看饱，你啃着烧饼回了家。' }
  ]
},

{
  id: 'ev_n4_wx_zhaoqin_fight',
  age: [18, 32],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  cond: { flags: ['n4_wx_zq1'] },
  text: '你夺了魁，洞房花烛夜挑开盖头，新娘子却低声说："公子，我是替嫁的丫环，真小姐早跟心上人跑了。"',
  choices: [
    { text: '去绸缎庄讨说法',
      effect: { attr: { spr: -1 }, coin: 80, setFlags: ['n4_wx_zq2'] },
      result: '庄主赔了一大笔银子息事宁人，你成了全城笑谈。' },
    { text: '将错就错',
      effect: { attr: { spr: 2 } },
      result: '丫环姑娘手巧心热，日子竟过得有滋有味。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_wx_zhaoqin_end',
  age: [20, 36],
  pool: 'novel_wuxia',
  weight: 5,
  once: true,
  cond: { flags: ['n4_wx_zq2'] },
  text: '半年后，一位蒙面女子深夜叩窗——正是逃婚的真小姐。她塞给你一封信："那晚替我拜堂的人，可还好？"',
  choices: [
    { text: '如实相告',
      effect: { attr: { chr: 1 }, coin: 60 },
      result: '她听完笑了，说你们都是实在人，留下一支金钗作谢。', kind: 'good' },
    { text: '劝她回家',
      effect: { attr: { spr: -1 } },
      result: '她沉默良久，把信烧了，转身没入夜色，从此再没人见过她。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wx_bang_rise',
  age: [18, 35],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '城里新近冒出个"断水帮"，半年吞了三个小堂口。帮主亲自登门，开出三倍月钱挖你过去。',
  choices: [
    { text: '入伙',
      effect: { attr: { mny: 1 }, coin: 50, setFlags: ['n4_wx_bg1'] },
      result: '新帮规矩大、银子足，你穿上了绣着断水纹的号衣。' },
    { text: '婉拒',
      effect: { attr: { chr: 1 } },
      result: '你托词家中老母需奉养，帮主也不恼，留了坛酒走了。' }
  ]
},

{
  id: 'ev_n4_wx_bang_split',
  age: [20, 40],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  cond: { flags: ['n4_wx_bg1'] },
  text: '断水帮老帮主暴毙，大当家与少帮主当场翻脸，两边人马在总舵对峙，都派人来拉你站队。',
  choices: [
    { text: '站少帮主',
      effect: { attr: { chr: 1 }, setFlags: ['n4_wx_bg2'] },
      result: '少帮主年轻气盛，但肯为弟兄挡刀，你赌他赢。', kind: 'fate' },
    { text: '站大当家',
      effect: { attr: { str: 1 } },
      result: '大当家根基深，你随他清算了几个摇摆不定的堂主。' },
    { text: '连夜卷铺盖走人',
      effect: { attr: { spr: 1 } },
      result: '神仙打架凡人遭殃，你揣着攒下的银子跑了。' }
  ]
},

{
  id: 'ev_n4_wx_bang_end',
  age: [24, 44],
  pool: 'novel_wuxia',
  weight: 5,
  once: true,
  big: true,
  cond: { flags: ['n4_wx_bg2'] },
  text: '火并定在七月十五。当夜总舵火光冲天，你护着少帮主杀到正厅，大当家横刀立马等着你们。',
  choices: [
    { text: '抢先出手', cond: { attr: { str: { gte: 6 } } },
      effect: { attr: { str: 1 } },
      result: '三合之内你挑飞了他的刀，断水帮从此只有一个帮主。', kind: 'good', big: true },
    { text: '喝止双方罢手', cond: { attr: { chr: { gte: 6 } } },
      effect: { attr: { int: 1, chr: 1 } },
      result: '你一句"别让外人看笑话"，竟真让两边收了刀，你成了帮中和事佬。', kind: 'good' },
    { text: '替少帮主挡刀',
      effect: { attr: { spr: -1, str: -1 }, coin: 100 },
      result: '那一刀砍在你背上。少帮主赢了，你躺了三个月，得了块"义"字金牌。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wx_save_villain',
  age: [18, 44],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '江边芦苇荡里躺着一个重伤的男人，腰间令牌刻着魔教的火焰纹。追兵的呼喝声已经不远了。',
  choices: [
    { text: '把他拖进自家船舱',
      effect: { attr: { spr: 1 } },
      result: '他醒来只说了一句"魔教也知恩"，留下一枚黑铁牌。十年后，它救了你一命。', kind: 'good' },
    { text: '喊来追兵领赏',
      effect: { coin: 60, attr: { spr: -1 } },
      result: '赏银到手，可你总梦见那双失血过多的眼睛。', kind: 'bad' },
    { text: '当没看见',
      effect: { attr: { int: 1 } },
      result: '芦苇荡第二天只剩一摊血，谁也不知道你路过了。' }
  ]
},

{
  id: 'ev_n4_wx_righteous_dirty',
  age: [20, 44],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  text: '你无意撞见名门长老深夜埋尸——死的是揭发他私吞赈灾款的弟子。长老回头看见了你，笑得很和蔼。',
  choices: [
    { text: '假装梦游离开', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { spr: -1 } },
      result: '你哼着小调晃走了，背后冷汗湿了三层衣。', kind: 'fate' },
    { text: '留下证据上报盟主',
      effect: { attr: { chr: -1, int: 1 } },
      result: '盟主夸你正直，长老被调去"清修"。从此你天天检查自己的饭食。' },
    { text: '敲他一笔封口费',
      effect: { coin: 100, attr: { spr: -1 } },
      result: '封口费很厚，但从此你听见他的笑声就胃疼。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wx_demon_kindness',
  age: [16, 40],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  text: '雪灾封山，给村里送粮的竟是魔教的分舵。教众背着粮袋深一脚浅一脚，为首的还蹲下来帮孩子焐手。',
  choices: [
    { text: '搭把手一起送粮',
      effect: { attr: { spr: 2 } },
      result: '老人往你手里塞煮鸡蛋："管他什么教，雪中送炭的就是好人。"', kind: 'good' },
    { text: '悄悄报官',
      effect: { coin: 50, attr: { spr: -2 } },
      result: '官兵冲进去时，那锅给孩子的粥还热着。你攥着赏银，手心发烫。', kind: 'bad' },
    { text: '远远看着',
      effect: { attr: { int: 1 } },
      result: '你在雪地里站了很久，"正邪"两个字忽然有点模糊。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wx_tournament_prep',
  age: [20, 40],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '十年一届的武林大会轮到你所在的地界筹办，各派为擂台朝向、座次排位吵得房顶都快掀了。',
  choices: [
    { text: '出力调停座次', cond: { attr: { int: { gte: 5 } } },
      effect: { attr: { chr: 1 }, coin: -30 },
      result: '你定的座次连宿敌两派都挑不出错，盟主记了你的名。', kind: 'good' },
    { text: '趁机卖茶水板凳',
      effect: { coin: 80 },
      result: '大会三天，你数钱数到手抽筋。武学？不认识。' },
    { text: '躲远点',
      effect: { attr: { spr: 1 } },
      result: '神仙吵架，你找了个向阳的墙根睡大觉。' }
  ]
},

{
  id: 'ev_n4_wx_ring_challenge',
  age: [18, 36],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  text: '武林大会擂台上，连胜七人的刀客点名要"那位缩在后面的朋友"上台，全场目光唰地聚到你身上。',
  choices: [
    { text: '上台应战', cond: { attr: { str: { gte: 6 } } },
      effect: { attr: { str: 1, chr: 1 } },
      result: '三十招后你险胜半招，刀客抱拳："够胆。"', kind: 'good' },
    { text: '拱手认怂',
      effect: { attr: { chr: -1, spr: -1 } },
      result: '哄笑声里你坐回板凳，那口茶怎么喝都是苦的。', kind: 'bad' },
    { text: '推荐旁边的胖子', cond: { attr: { int: { gte: 5 } } },
      effect: { attr: { int: 1 } },
      result: '胖子上台三招放翻了刀客——你早就看出他不简单。' }
  ]
},

{
  id: 'ev_n4_wx_morning_class',
  age: [16, 24],
  pool: 'novel_wuxia',
  weight: 10,
  text: '五更早课，钟声催人，你被窝暖和得像神仙洞府，窗外执事师兄的脚步声越来越近。',
  choices: [
    { text: '鲤鱼打挺冲出去',
      effect: { attr: { str: 1 } },
      result: '你踩着钟声的尾巴到位，师兄狐疑地看了你一眼。' },
    { text: '装病',
      effect: { attr: { int: 1, spr: 1 } },
      result: '你咳得惊天动地，换来一碗热汤和一上午懒觉。' },
    { text: '被逮个正着',
      effect: { attr: { spr: -1 } },
      result: '罚扫一个月演武场，你成了全门起得最早的人。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wx_kitchen',
  age: [16, 30],
  pool: 'novel_wuxia',
  weight: 10,
  text: '伙房今夜炖全羊，香气顺着窗缝往鼻子里钻。大师傅出去解手了，灶上那锅羊汤没人看着。',
  choices: [
    { text: '先舀一碗再说',
      effect: { attr: { spr: 1 } },
      result: '汤鲜得你差点咬到舌头。喝完你把锅边擦得干干净净。' },
    { text: '替大师傅看着火',
      effect: { attr: { chr: 1 } },
      result: '大师傅回来见你守着灶，撕了条羊腿塞给你。', kind: 'good' },
    { text: '往里加一把盐',
      effect: { attr: { spr: 1 } },
      result: '第二天全门齁得直灌水，只有你在角落里偷笑。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wx_mountain_patrol',
  age: [16, 36],
  pool: 'novel_wuxia',
  weight: 9,
  text: '轮到你巡山，走到黑风口，听见草丛里有动静——像是人，还不止一个。',
  choices: [
    { text: '悄悄摸回去报信',
      effect: { attr: { int: 1 } },
      result: '果然是一伙踩点的山贼，掌门夸你有勇有谋。', kind: 'good' },
    { text: '大喝一声冲过去', cond: { attr: { str: { gte: 5 } } },
      effect: { attr: { str: 1, spr: -1 } },
      result: '三个蟊贼被你唬得跪地求饶——你的腿其实抖得像筛糠。' },
    { text: '假装没听见',
      effect: { attr: { spr: -1 } },
      result: '当夜库房失窃，你攥着拳头什么都没说。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wx_scammed',
  age: [16, 44],
  pool: 'novel_wuxia',
  weight: 9,
  kind: 'bad',
  text: '游方郎中拍胸脯说他的"金刚丸"一粒增十年功力。你掏空钱袋买了三粒，当晚跑了八趟茅房。',
  choices: [
    { text: '堵到他要钱', cond: { attr: { str: { gte: 5 } } },
      effect: { coin: 30 },
      result: '你把他按在墙上要回半数药钱，还附赠一句"再让我看见你"。' },
    { text: '自认倒霉',
      effect: { attr: { spr: -1 } },
      result: '茅房的夜里你悟了：江湖第一课，叫学费。' },
    { text: '把剩下的卖给仇家',
      effect: { coin: 20, attr: { chr: -1 } },
      result: '仇家跑了十趟茅房。你良心有点痛，但不后悔。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wx_frame',
  age: [18, 40],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  kind: 'bad',
  text: '同门丢了的玉佩从你枕下被搜了出来，人证物证俱全。你知道是有人栽赃，可百口莫辩。',
  choices: [
    { text: '据理力争', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { chr: 1 } },
      result: '你指出玉佩上抹的胶还没干透，真凶的马脚当场露了。', kind: 'good' },
    { text: '咬牙认罚',
      effect: { attr: { spr: -2 } },
      result: '二十棍打完，那个栽赃你的人笑得最响。你记住了他。', kind: 'bad' },
    { text: '求掌门彻查',
      effect: { attr: { int: 1 } },
      result: '掌门盯着众人看了半晌，把玉佩摔了："我这门里，容不下脏东西。"', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wx_injury',
  age: [18, 40],
  pool: 'novel_wuxia',
  weight: 8,
  kind: 'bad',
  text: '切磋时对方没收住手，一记重掌拍在你胸口。你当场呕了血，三个月提不起重物。',
  choices: [
    { text: '安心养伤',
      effect: { attr: { str: -1, spr: 1 } },
      result: '伤好后你重新打熬筋骨，反而比从前更稳。' },
    { text: '带伤偷练', cond: { attr: { luk: { gte: 6 } } },
      effect: { attr: { str: 1 } },
      result: '你赌赢了，经脉在极限处拓宽了一线。' },
    { text: '让对方赔到底',
      effect: { coin: 40 },
      result: '医药钱一分没少，对方从此见你就绕道。' }
  ]
},

{
  id: 'ev_n4_wx_street_kid',
  age: [16, 40],
  pool: 'novel_wuxia',
  weight: 8,
  kind: 'fate',
  text: '集市上一个小乞儿抢了馒头被摊主追打。他跑得飞快，怀里还护着半个——大概是要留给谁的。',
  choices: [
    { text: '替他付钱',
      effect: { coin: -10, attr: { spr: 1 } },
      result: '小乞儿愣住，把护着的半个馒头分了你一口。', kind: 'good' },
    { text: '一把抓住他',
      effect: { attr: { chr: -1 } },
      result: '摊主夸你仗义，小乞儿看你的眼神像看一条狗。', kind: 'bad' },
    { text: '跟着看看',
      effect: { attr: { int: 1 } },
      result: '破庙里躺着个病丫头，那半个馒头还是热的。你鼻子忽然一酸。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wx_gambler_den',
  age: [18, 44],
  pool: 'novel_wuxia',
  weight: 7,
  text: '赌坊里你连赢七把，庄家额头冒汗。第八把开盅前，你分明看见他小指在盅底一勾。',
  choices: [
    { text: '当场掀桌',
      effect: { attr: { str: 1 }, coin: -50 },
      result: '打手围上来之前你掀桌夺路，赢的钱撒了一路。' },
    { text: '记下他的手法', cond: { attr: { int: { gte: 5 } } },
      effect: { attr: { int: 1 }, coin: 40 },
      result: '你用他的手法赢了他的钱，他看你的眼神像见了鬼。' },
    { text: '找坊主告状',
      effect: { attr: { chr: 1 } },
      result: '坊主剁了庄家一根手指，请你喝了顿酒，从此你去赌钱免费。' }
  ]
},

{
  id: 'ev_n4_wx_fire_watch',
  age: [20, 44],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  kind: 'good',
  text: '你守夜时发现柴房起火，硬是在风势起来前把火扑灭了，保住了半个庄子。',
  effect: { attr: { chr: 1, spr: 1 }, coin: 30 }
},

{
  id: 'ev_n4_wx_rain_shelter',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '暴雨夜你躲进破庙，神像后蜷着个老丐，你们分着吃了半块干粮。天亮雨停，老丐不见了，草堆里多了半页拳谱。',
  effect: { attr: { str: 1, int: 1 } }
},

{
  id: 'ev_n4_wx_old_debt',
  age: [20, 44],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'bad',
  text: '结义兄弟欠下赌债跑路，债主拿着你画押的保书找上门。白纸黑字，赖都赖不掉。',
  effect: { coin: -80, attr: { spr: -2 } }
},

{
  id: 'ev_n4_wx_herb_gift',
  age: [16, 36],
  pool: 'novel_wuxia',
  weight: 8,
  kind: 'good',
  text: '你在山里救了个摔断腿的药农，他执意送你一包祖传伤药，说行走江湖总用得上。',
  effect: { attr: { spr: 1 }, coin: 20 }
},

{
  id: 'ev_n4_wx_wine_fight',
  age: [18, 44],
  pool: 'novel_wuxia',
  weight: 9,
  kind: 'bad',
  text: '酒楼里两桌人一言不合动了手，你上前劝架——两边倒是停手了，合伙把你揍了一顿。',
  effect: { attr: { str: -1, spr: -1 } }
},

{
  id: 'ev_n4_wx_night_watch',
  age: [18, 40],
  pool: 'novel_wuxia',
  weight: 8,
  kind: 'good',
  text: '你夜里巡更，撞见飞贼翻墙，追出三条街把人按住了。失主是个寡妇，哭着要给你磕头。',
  effect: { attr: { chr: 2 }, coin: 20 }
},

{
  id: 'ev_n4_wx_beggar_test',
  age: [16, 40],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '老丐拦路讨酒，你给了他半壶。他喝完拿竹枝在地上划了个歪歪扭扭的"侠"字："心不歪，路就歪不了。"',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_wx_lore_lantern',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 10,
  kind: 'good',
  text: '上元夜满城花灯如昼，猜灯谜的、卖糖画的、走百病的挤作一团。你在桥头看了半宿，觉得人间值得。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wx_lore_boat',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 9,
  text: '渡船上艄公一篙一点，讲他年轻时见过的江上水战，唾沫横飞。靠岸时你多给了两个铜板。',
  effect: { attr: { int: 1 }, coin: -5 }
},

{
  id: 'ev_n4_wx_lore_stele',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  kind: 'fate',
  text: '荒郊半截断碑，字被雷火劈去大半，只认得"侠之大者"四个字。你拂去青苔，站了一会儿。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wx_lore_tea',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 9,
  text: '清明前的龙井，茶博士手腕一翻凤凰三点头，茶汤碧绿。你不懂茶，但这一口下去，懂了什么叫春天。',
  effect: { attr: { spr: 1 }, coin: -5 }
},

{
  id: 'ev_n4_wx_lore_horse_fair',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 9,
  text: '骡马市上牲口打响鼻，牙行在袖子里捏价码。你看了半天没敢伸手——袖里乾坤，比掌法还难练。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_wx_lore_snow',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '塞北的雪能把天地下成一张白纸，马蹄落上去，一个坑一个字。你呵着白气想：好大的江湖。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wx_lore_bridge',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '扬州二十四桥，月夜箫声从水面飘过来。你数了数其实只有一座桥，但不妨碍它好听。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wx_lore_smith',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '城南铁匠铺，师傅赤膊抡锤，火星子溅在砧子上像打铁花。他说好刀不斩无名之辈，也不卖无义之人。',
  effect: { attr: { str: 1 } }
},

{
  id: 'ev_n4_wx_lore_pawn',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '当铺柜台高得要仰视，朝奉眼皮都不抬："破剑一把，五钱。"那剑鞘上分明镶着七颗宝石。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_wx_lore_bath',
  age: [18, 46],
  pool: 'novel_wuxia',
  weight: 9,
  text: '澡堂子里雾气蒸腾，隔壁池子两个镖师吹嘘走镖见闻，一条真三条假。你泡着澡，听了一部江湖史。',
  effect: { attr: { int: 1, spr: 1 } }
},

{
  id: 'ev_n4_wx_lore_river',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '江边浣衣的妇人唱着梆子，棒槌起落都是节拍。调子太悲，你听了会儿，默默帮她拧了两床被单。',
  effect: { attr: { chr: 1 } }
},

{
  id: 'ev_n4_wx_lore_chess',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '街头棋摊的残局摆了三十年没人解得开。你蹲了一下午，输了五文钱，赢了一肚子棋理。',
  effect: { attr: { int: 1 }, coin: -5 }
},

{
  id: 'ev_n4_wx_lore_shadow',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '皮影戏演的是穆桂英挂帅，灯影子里刀枪翻飞。散场后老艺人教你挑了三下签子——手比脑子快。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_wx_lore_medicine',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '药铺坐堂的老大夫三根手指搭脉，眼皮一垂就知道你昨夜熬了夜、前日贪了杯。你吓得连声是是。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wx_lore_kite',
  age: [16, 30],
  pool: 'novel_wuxia',
  weight: 9,
  kind: 'good',
  text: '春风一起满城纸鸢，你的沙燕放得最高。线断了，它摇摇晃晃飞过城墙，像去投奔了谁。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wx_lore_grave',
  age: [18, 46],
  pool: 'novel_wuxia',
  weight: 6,
  kind: 'fate',
  text: '赶夜路误走乱葬岗，磷火飘飘。你壮着胆子给无主坟头各洒了半杯酒，后半夜睡得格外安稳。',
  effect: { attr: { spr: 1, luk: 1 } }
},

{
  id: 'ev_n4_wx_lore_fortune',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 7,
  kind: 'fate',
  text: '测字先生让你写个字，你随手写了个"走"。他端详半晌："足下近期有远行，走为上。"你愣住——你还什么都没说。',
  effect: { attr: { int: 1 }, coin: -5 }
},

{
  id: 'ev_n4_wx_lore_wine',
  age: [18, 46],
  pool: 'novel_wuxia',
  weight: 8,
  kind: 'good',
  text: '埋了十八年的女儿红开坛，酒香能勾人魂。嫁女儿的人家请你沾喜气，你喝了一碗，脸红到脖子根。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wx_lore_monk',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 7,
  text: '行脚僧一步一叩往五台山去，膝盖早磨穿了。你递了水，他说："路远，慢慢走，总会到。"',
  effect: { attr: { spr: 1, int: 1 } }
},

{
  id: 'ev_n4_wx_lore_map',
  age: [16, 46],
  pool: 'novel_wuxia',
  weight: 8,
  text: '舆图铺里，你盯着大周疆域图看了半个时辰。原来江湖之外，还有那么大的地方没去过。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_wx_cook_master',
  age: [16, 30],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  kind: 'good',
  text: '伙房大师傅看你顺眼，教你颠勺的手劲："腕子活，剑才活。"半年后你腕力大涨，厨艺竟也小成。',
  effect: { attr: { str: 1, spr: 1 } }
},

{
  id: 'ev_n4_wx_early_bell',
  age: [16, 24],
  pool: 'novel_wuxia',
  weight: 10,
  text: '冬日凌晨的钟声撞开浓雾，你哈着白气站桩，忽然觉得这一身懒骨头里，有根筋悄悄直了。',
  effect: { attr: { str: 1 } }
},

{
  id: 'ev_n4_wx_fist_manual',
  age: [16, 36],
  pool: 'novel_wuxia',
  weight: 8,
  once: true,
  text: '旧书摊角落躺着本虫蛀的拳谱，摊主当废纸卖你三文钱。翻开一看，招式野得很。',
  choices: [
    { text: '照着练', cond: { attr: { str: { gte: 4 } } },
      effect: { attr: { str: 1 } },
      result: '招式虽野，胜在实用，你的拳脚多了几分狠辣。', kind: 'good' },
    { text: '转卖给武馆',
      effect: { coin: 40 },
      result: '武馆教头如获至宝。你三文钱进，一贯钱出。' },
    { text: '拿去垫桌脚',
      effect: { attr: { spr: 1 } },
      result: '桌子从此不晃了，也算物尽其用。' }
  ]
},

{
  id: 'ev_n4_wx_lost_dog',
  age: [16, 44],
  pool: 'novel_wuxia',
  weight: 9,
  kind: 'good',
  text: '你帮粮店老板娘找回走失的黄狗，她非塞给你一包酱牛肉。黄狗冲你摇尾巴，像认了半个主。',
  effect: { attr: { spr: 1 }, coin: 10 }
},

{
  id: 'ev_n4_wx_night_rain',
  age: [20, 44],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  kind: 'fate',
  text: '夜雨敲窗，你挑灯擦剑，剑身映出你的眉眼——比出门那年沉稳多了。江湖催人老，也催人长大。',
  effect: { attr: { int: 1, spr: 1 } }
},

{
  id: 'ev_n4_wx_gym_challenge',
  age: [18, 40],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  text: '一个独臂汉子来武馆踢馆，连挫三个教头。馆主急得团团转，重金悬赏能留住招牌的人。',
  choices: [
    { text: '上台应战', cond: { attr: { str: { gte: 6 } } },
      effect: { attr: { str: 1 }, coin: 60 },
      result: '你赢在年轻气足。独臂汉子走前说："比我当年差远了。"你竟然服气。', kind: 'good' },
    { text: '牵线请外援',
      effect: { attr: { int: 1 }, coin: 30 },
      result: '你请来名宿压阵，馆主分你一成谢礼。' },
    { text: '围观到底',
      effect: { attr: { spr: 1 } },
      result: '你白看了一场好拳脚，值回站票的力气。' }
  ]
},

{
  id: 'ev_n4_wx_spring_plow',
  age: [16, 44],
  pool: 'novel_wuxia',
  weight: 9,
  kind: 'good',
  text: '春耕时节你帮老乡扶了三天犁，换来一身泥、两手茧和一顿韭菜盒子。庄稼人的谢意，最沉。',
  effect: { attr: { str: 1, spr: 1 } }
},

{
  id: 'ev_n4_wx_lantern_riddle',
  age: [16, 40],
  pool: 'novel_wuxia',
  weight: 9,
  text: '灯市上悬着一盏走马灯，谜面是"一口咬掉牛尾巴"。掌柜说猜中送灯。',
  choices: [
    { text: '答"告"', cond: { attr: { int: { gte: 5 } } },
      effect: { attr: { int: 1, spr: 1 } },
      result: '掌柜抚掌大笑，走马灯归了你，转出一路光影。', kind: 'good' },
    { text: '蒙一个"午"',
      effect: { attr: { spr: -1 }, coin: -10 },
      result: '掌柜摇头，周围小孩笑作一团，你讪讪买了盏灯挽回颜面。', kind: 'bad' },
    { text: '拉掌柜喝酒套答案',
      effect: { attr: { chr: 1 } },
      result: '三两黄酒下肚，答案到手，还多了个朋友。' }
  ]
},

{
  id: 'ev_n4_wx_poison_wine',
  age: [20, 44],
  pool: 'novel_wuxia',
  weight: 6,
  once: true,
  text: '酒过三巡，你瞥见主人给你续杯时，拇指在壶柄上按了一下——这壶有机关，是阴阳壶。',
  choices: [
    { text: '佯醉泼酒',
      effect: { attr: { int: 1 } },
      result: '你手一抖酒洒衣襟，主人脸色微变又掩了过去。这顿饭，你记下了。', kind: 'fate' },
    { text: '借敬酒换杯盏', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { chr: 1 } },
      result: '半个时辰后，主人自己趴下了。', kind: 'good' },
    { text: '一饮而尽',
      effect: { attr: { str: -2 }, coin: -50 },
      result: '你赌他不敢——赌输了。醒来时躺在乱葬岗边上，钱袋空了，命还在。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wx_dice_oath',
  age: [16, 36],
  pool: 'novel_wuxia',
  weight: 7,
  once: true,
  text: '同乡三人意气相投，挑了个月圆之夜在城外土地庙摆香案，要与你结为异姓兄弟。',
  choices: [
    { text: '磕头结拜',
      effect: { attr: { chr: 1, spr: 1 } },
      result: '"不愿同年同月同日生"念出口，你从此多了三个过命的家人。', kind: 'good' },
    { text: '婉拒',
      effect: { attr: { spr: 1 } },
      result: '你说独来独往惯了，三人也不恼，拉你喝完那坛酒。' },
    { text: '提议歃血改成拼酒',
      effect: { attr: { spr: 2 } },
      result: '四人喝到月亮偏西，拜没拜成，感情倒比血还浓。' }
  ]
},

// ---- 无限流 ----

{
  id: 'ev_n4_wxn_metro_rules',
  age: [18, 26],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '深夜十一点五十九分，你踏上末班地铁。车厢里贴着一张《乘车须知》，一共七条，第一条是"本线路没有终点站"，最后一条被人用指甲抠掉了。',
  choices: [
    { text: '逐条背熟规则', effect: { attr: { int: 1, spr: -1 }, setFlags: ['n4_wxn_metro_exit'] }, result: '你在每一站都严格照章办事，凌晨四点被广播礼貌地"请"下了车。活着，兜里还多了一张没有日期的车票。', kind: 'good' },
    { text: '假装睡觉', effect: { attr: { str: -1, spr: -2 } }, result: '你闭眼的第三分钟，广播开始念你的名字。你一路装睡装到声带发抖，天亮才被吐出来，掉了半条命。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_metro_driver',
  age: [20, 34],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  cond: { flags: ['n4_wxn_metro_exit'] },
  text: '又是那趟末班地铁。这次驾驶室的门虚掩着，司机的背影瘦得像一根电线杆，广播里忽然说：欢迎老朋友乘车。',
  choices: [
    { text: '上前搭话', effect: { attr: { int: 1, luk: 1 }, setFlags: ['n4_wxn_metro_veteran'] }, result: '司机说他也曾是乘客，开了三十年车，只差一张"下车的票"。他把时刻表塞进你手里，上面有一站叫"出口"。', kind: 'good' },
    { text: '按规则无视他', effect: { attr: { spr: -1 } }, result: '须知第十二条：不要与司机交谈。你守住了规矩，也永远错过了某些东西。' }
  ]
},

{
  id: 'ev_n4_wxn_metro_terminal',
  age: [24, 40],
  pool: 'novel_wuxian',
  weight: 5,
  once: true,
  big: true,
  kind: 'fate',
  cond: { flags: ['n4_wxn_metro_veteran'] },
  text: '某个深夜，末班地铁破例为你一人停靠。司机朝你点头：终点站到了——不是它的，是你的。你走出车厢，身后轨道尽头透出一线真正的天光。',
  effect: { attr: { spr: 2, luk: 1, int: 1 } }
},

{
  id: 'ev_n4_wxn_puzzle_diary',
  age: [18, 30],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '解密副本：一座停摆二十年的疗养院，所有谜题的答案都指向同一间院长室。暗格里没有通关道具，只有一本卷边的日记，扉页写着"第八赛季留念"。',
  effect: { attr: { int: 1 }, setFlags: ['n4_wxn_old_diary'] }
},

{
  id: 'ev_n4_wxn_last_season',
  age: [22, 40],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  kind: 'fate',
  cond: { flags: ['n4_wxn_old_diary'] },
  text: '休息区的老烟枪瞥见你背包里露出的日记角，烟头当场掉在裤子上。他压低声音："这本子……是上一个赛季的人留下的。那赛季怎么结束的，公告里一个字都没写。"',
  choices: [
    { text: '请他喝酒套话', effect: { attr: { mny: -1, int: 1 }, setFlags: ['n4_wxn_last_season'] }, result: '三杯酒下肚，他说那个赛季最后只有十七个人回来，名单第二天就刷新了，像什么都没发生过。', kind: 'fate' },
    { text: '听完就当八卦', effect: { attr: { spr: -1 } }, result: '你把日记塞回包底。有些真相的运费太贵，你暂时付不起。' }
  ]
},

{
  id: 'ev_n4_wxn_space_crack',
  age: [26, 46],
  pool: 'novel_wuxian',
  weight: 5,
  once: true,
  big: true,
  kind: 'fate',
  cond: { flags: ['n4_wxn_last_season'] },
  text: '循着日记里的暗示，你在空间最旧的走廊尽头找到一面会"呼吸"的墙。指尖贴上去的瞬间，你听见墙那边传来声音——像是很多人在一起倒数。',
  effect: { attr: { int: 1, luk: 1, spr: -1 } }
},

{
  id: 'ev_n4_wxn_temp_alliance',
  age: [18, 32],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '生存副本开局，一个笑起来很真诚的轮回者向你伸出手："结盟吧，两个人怎么也比一个人活得久。"你看着他的眼睛，判断不出这句话有几成保质期。',
  choices: [
    { text: '握手结盟', effect: { attr: { chr: 1 }, setFlags: ['n4_wxn_ally'] }, result: '你们约定暗号、分配守夜，那晚你睡了进本以来第一个整觉。', kind: 'good' },
    { text: '婉拒独行', effect: { attr: { int: 1, spr: -1 } }, result: '你独自活过了这个副本，只是从此看谁都像潜在的内鬼。' }
  ]
},

{
  id: 'ev_n4_wxn_ally_betrayal',
  age: [20, 38],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  kind: 'bad',
  cond: { flags: ['n4_wxn_ally'] },
  text: '结算前最后一夜，你的盟友把你的坐标卖给了追杀者，换了一张直通终点的门票。被围攻时你看见他站在远处，朝你比了个"对不起"的口型。',
  choices: [
    { text: '杀出重围再算账', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { str: -1, spr: -1 }, setFlags: ['n4_wxn_betrayed'] }, result: '你浑身挂彩地活了下来，把他的名字刻在了匕首柄上。', kind: 'bad' },
    { text: '咽下这口气', effect: { attr: { spr: -2 }, setFlags: ['n4_wxn_betrayed'] }, result: '你躲进下水道熬过结算。仇恨这玩意儿不顶饱，但很提神。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_betrayal_reunion',
  age: [24, 44],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  cond: { flags: ['n4_wxn_betrayed'] },
  text: '三年后的副本大厅，你又见到了那个卖你的人。他老了很多，左腿换成了义肢，看见你的瞬间，他站住了，没有跑。',
  choices: [
    { text: '把酒泼他脸上，两清', effect: { attr: { spr: 2, chr: 1 } }, result: '酒液顺着他的下巴滴落，谁都没再提当年。有些账，泼出去就算结清了。', kind: 'good' },
    { text: '擦肩而过', effect: { attr: { int: 1 } }, result: '你们像两个陌生人一样错身而过。你发现自己早就不恨了，只是还记得。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wxn_glitch_window',
  age: [18, 30],
  pool: 'novel_wuxian',
  weight: 5,
  once: true,
  kind: 'fate',
  text: '副本结算界面卡住了一秒。就这一秒里，你看见光幕后面闪过一行乱码，乱码末尾缀着一个词：DEBUG。全空间好像只有你没眨眼。',
  effect: { attr: { int: 1 }, setFlags: ['n4_wxn_glitch_seen'] }
},

{
  id: 'ev_n4_wxn_glitch_loot',
  age: [20, 36],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  cond: { flags: ['n4_wxn_glitch_seen'] },
  text: '你摸清了规律：每逢整点维护，结算系统会"打嗝"半秒，手快的话能多点一次领取。这和抢银行唯一的区别是，银行不知道自己在被抢。',
  choices: [
    { text: '薅！薅秃为止', effect: { attr: { mny: 2, spr: 1 }, setFlags: ['n4_wxn_glitch_used'] }, result: '你连薅七次，积分翻倍。第八次，界面弹出一行小字："别太过分哦。"你收手了。', kind: 'good' },
    { text: '立刻上报', effect: { attr: { int: 1, chr: 1 } }, result: '系统奖励你一笔"诚实积分"，附赠评语：本赛季第4个上报者。你很好奇前三个现在在哪。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wxn_glitch_origin',
  age: [24, 46],
  pool: 'novel_wuxian',
  weight: 5,
  once: true,
  big: true,
  kind: 'fate',
  cond: { flags: ['n4_wxn_glitch_used'] },
  text: '那行"别太过分哦"之后，你的个人面板角落多了一个永远关不掉的小窗口，缓慢滚动着看不懂的日志。你只认出一行：建造批次003，回收状态：延期。',
  effect: { attr: { int: 2, spr: -1 } }
},

{
  id: 'ev_n4_wxn_night_diner',
  age: [18, 36],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  text: '规则怪谈副本：一家只在凌晨营业的食堂。守则第一条"不要点菜单上没有的菜"，第二条"厨师没有影子"，第三条墨迹未干："别信前两条"。',
  choices: [
    { text: '点一碗阳春面', effect: { attr: { spr: 1, str: 1 } }, result: '面很普通，普通得令人感动。收碗时你瞟了一眼——厨师有影子，但影子戴着厨师帽，他本人没有。', kind: 'good' },
    { text: '点菜单上没有的菜', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2, spr: -1 } }, result: '你点了一份"昨天的晚饭"。厨师盯着你看了十秒，笑了，给你免单，附赠一张写着"合格"的餐巾纸。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wxn_empty_block',
  age: [18, 36],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  text: '规则怪谈副本：一座入住率为零的小区。半夜两点，你所在单元楼的声控灯从一楼开始一层层往上亮，而你全程没有发出任何声音。',
  choices: [
    { text: '对着楼道喊一嗓子', effect: { attr: { int: 1, spr: -1 } }, result: '灯全灭了。对讲机里随即传来物业的声音："六楼业主请小声一点。"可这栋楼根本没有六楼。', kind: 'fate' },
    { text: '屏住呼吸等它上来', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { str: 1, spr: -1 } }, result: '灯亮到你这层，停了。你和一个"不存在的人"隔着一扇门站了一整夜，谁都没敲门。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_wxn_late_store',
  age: [18, 34],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '规则怪谈副本：24小时便利店，守则只有一条——"凌晨三点到三点零一分之间，不要抬头看监控"。你没忍住。监控里没有店，只有你，和站在你身后的你自己。',
  effect: { attr: { spr: -2, int: 1 } }
},

{
  id: 'ev_n4_wxn_pool_rules',
  age: [18, 34],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '规则怪谈副本：深夜游泳馆，深水区的泳道线每天都会多一根。救生员守则写着："若听见水下传来掌声，请鼓掌回应。"',
  choices: [
    { text: '鼓掌回应', effect: { attr: { chr: 1, spr: 1 } }, result: '你鼓了三下掌，水面安静下来。第二天你被评为"本月最受欢迎顾客"，奖状是从水里浮上来的。', kind: 'good' },
    { text: '装没听见', effect: { attr: { spr: -1 } }, result: '掌声停了。你总觉得有什么东西对你很失望。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_old_inn',
  age: [20, 38],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '老式旅馆副本，前台永远背对客人。你在登记簿上看见自己未来七天的入住记录，字迹和你一模一样，而最后一页写着四个字：退房失败。',
  effect: { attr: { int: 1, spr: -1 } }
},

{
  id: 'ev_n4_wxn_seven_keys',
  age: [18, 36],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  text: '解密副本：七扇门，七把钥匙，墙上提示"每一把钥匙都是对的"。队友已经开始撞门，你盯着锁孔，意识到真正的谜面是——为什么要给七扇门配七把都能用的钥匙。',
  choices: [
    { text: '按提示逐扇开门', effect: { attr: { int: 2 } }, result: '第七扇门后就是出口。原来这关考的不是开锁，是忍住不抄近路。', kind: 'good' },
    { text: '跟着撞门', effect: { attr: { str: -1 } }, result: '你们撞开一扇假门，触发了加时惩罚。暴力破解在解密本里约等于挂科。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_clock_tower',
  age: [20, 40],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '解密副本：一座走快十分钟的钟楼，全镇时间都以它为准。谜题是"让钟楼说出真话"，而钟楼每扇窗后都站着一个不同年龄的守钟人。',
  choices: [
    { text: '把全镇的钟都调快', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2, spr: 1 } }, result: '当所有钟比钟楼还快，它就成了唯一"慢"的那个——相对意义上，它说了真话。通关音响起时你觉得自己帅呆了。', kind: 'good' },
    { text: '砸了它', effect: { attr: { str: 1, mny: -1 } }, result: '物理说服也是说服。钟楼倒下的瞬间全镇时间恢复正常，但维修费从你的积分里扣。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_wxn_loop_gallery',
  age: [20, 40],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '解密副本：一间每转一圈就少一幅画的画廊。你走了十四圈终于发现，消失的画全画着你刚走过的路——画里的你，正一幅一幅替你"通关"。',
  effect: { attr: { int: 1, luk: 1 } }
},

{
  id: 'ev_n4_wxn_sudoku_o2',
  age: [18, 36],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '解密副本：一面墙大的数独，规则简单——错一格，全室氧气少一成。学霸队友白着嘴唇填到第七行，而你在最后一格看出了两个都成立的答案。',
  choices: [
    { text: '指出另一解', cond: { attr: { int: { gte: 7 } } }, effect: { attr: { int: 2 } }, result: '双解即无解，无解即答案。你擦掉那一格，铁门应声而开，学霸抱着你哭得像个孩子。', kind: 'good' },
    { text: '让学霸继续', effect: { attr: { str: -1 } }, result: '你们赌错了那口气。好在惩罚只到缺氧眩晕为止，出来时全员的嘴唇都是口红色号。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_cipher_wall',
  age: [20, 42],
  pool: 'novel_wuxian',
  weight: 8,
  text: '解密副本的尾声，你在出口旁的墙上发现一层盖一层的刻痕，全是历届轮回者留下的草稿。最新一行刻得很深："答案不重要，把墙带出去。"',
  effect: { attr: { int: 1, spr: 1 } }
},

{
  id: 'ev_n4_wxn_snowfield',
  age: [18, 40],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  text: '生存副本：零下四十度的雪原，补给箱在三十公里外，队友正发着高烧。广播提示：负重每多十公斤，体温流失快一倍。',
  choices: [
    { text: '背着他走', effect: { attr: { str: -2, spr: 2 } }, result: '你背着他走了三十公里，到达时两人都快冻成路标。通关评分S，评语只有四个字：值得依靠。', kind: 'good', big: true },
    { text: '独自去搬补给', effect: { attr: { str: -1, mny: 1 } }, result: '你活着带回补给，但他看你的眼神比雪原还冷。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_desert_week',
  age: [20, 42],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '生存副本：荒漠七日，每人每天限量一壶水。第三天，商队幻影出现在地平线上，报价：一壶水换一件你最珍贵的东西。',
  choices: [
    { text: '换', effect: { attr: { mny: -1, spr: -1, str: 1 } }, result: '你交出母亲留下的护身符，换了七天活命。幻影消失前朝你鞠了一躬，像在致意一笔公平的交易。', kind: 'fate' },
    { text: '不换', effect: { attr: { str: -1, luk: 1 } }, result: '你靠舔石头上的晨露熬到最后一天。通关时幻影商队全体向你挥手，像欢送一位老对手。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_wxn_plague_town',
  age: [20, 42],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '生存副本：被隔离的瘟疫小镇，你是唯一没症状的人，也因此成了全镇的"活药引"。你逃出镇界那一刻，身后有人轻声说了句谢谢。你至今没敢回头想这句话的意思。',
  effect: { attr: { spr: -2, int: 1 } }
},

{
  id: 'ev_n4_wxn_flood_roof',
  age: [18, 40],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  text: '生存副本：洪水漫城，屋顶的位置只够七个人，而你们是八个。浪头打来的前一分钟，所有人都在看你——你手里攥着唯一一根绳。',
  choices: [
    { text: '把绳让给别人', effect: { attr: { str: -1, chr: 2 } }, result: '你被浪卷下去又爬了上来，浑身泥浆。那晚之后，七个人轮流替你守了半个月夜。', kind: 'good' },
    { text: '先绑住自己', effect: { attr: { spr: -2 } }, result: '你活了下来。名单上少了一个人，你的名字从此在队伍频道里变得很轻。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_polar_night',
  age: [22, 44],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '生存副本：极夜小镇，太阳六十天不会升起，"睡着"的人会忘掉一条自己的规则。你在手臂上刻满字才撑到日出，最后一条刻痕是：你是你。',
  effect: { attr: { str: -1, int: 1, spr: -1 } }
},

{
  id: 'ev_n4_wxn_city_rush',
  age: [18, 36],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  text: '竞速副本：横穿整座城市，第一名独享双倍积分，最后一名随机没收一项强化。你暂列第三，前面那位正踩着你的影子加速。',
  choices: [
    { text: '走屋顶直线', effect: { attr: { str: 1, spr: 1 } }, result: '你飞檐走壁抄了十七条近路，压线夺冠。市政厅的维修账单随后寄到，你假装没收到。', kind: 'good' },
    { text: '稳扎稳打', effect: { attr: { int: 1 } }, result: '你第四名完赛，不上不下。但你是全场唯一没踩中任何陷阱的人，解说称你为"人形雷达"。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_wxn_conveyor_maze',
  age: [20, 40],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'good',
  text: '竞速副本：整个迷宫建在传送带上，走错一步就被退回起点。你跑了十一遍终于发现，最快的路线是——在起点原地等迷宫自己转到出口那一格。',
  effect: { attr: { int: 2, spr: 1 } }
},

{
  id: 'ev_n4_wxn_shadow_race',
  age: [18, 36],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '竞速副本：和你的影子赛跑，规则是"影子先过线就算你输"。问题是太阳正在下山，你的影子越拉越长，跑得比你还快。',
  choices: [
    { text: '躲进隧道', effect: { attr: { int: 1 } }, result: '没有光就没有影子。你在隧道里等到天黑，裁判宣布：平局，双冠军。影子气得在原地跺脚。', kind: 'good' },
    { text: '和它硬拼', effect: { attr: { str: 1, spr: -1 } }, result: '你以半个脚掌惜败。影子冲线时回头看了你一眼，那表情很像你小学体育老师。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_photo_finish',
  age: [20, 38],
  pool: 'novel_wuxian',
  weight: 6,
  once: true,
  kind: 'good',
  text: '竞速副本决赛，你和对手同时压线。高速摄像机回放了三十遍也分不出先后，判定并列第一。你们对视一眼，同时说出同一句话："再来一局。"',
  effect: { attr: { spr: 2, chr: 1 } }
},

{
  id: 'ev_n4_wxn_barter',
  age: [18, 40],
  pool: 'novel_wuxian',
  weight: 9,
  once: true,
  text: '交易广场上，一个蒙面人拦住你："三张S级副本内部情报，换你那颗没什么用的黑色玻璃珠。"他说"没什么用"的时候，喉结动了一下。',
  choices: [
    { text: '换', effect: { attr: { mny: 2 } }, result: '情报全是真的，你赚翻了。但蒙面人走远的背影，快乐得像刚抢完银行。', kind: 'fate' },
    { text: '不换', effect: { attr: { int: 1 } }, result: '你查了三个月才知道那珠子是某个隐藏副本的钥匙。无所谓，钥匙在你手里，急的是他。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_wxn_contract',
  age: [18, 38],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'good',
  text: '你在公证处签了份长期组队契约，条款第七条写着"任何情况下不先松开队友的手"。签完你才发现，对方把这一条用红笔描了三遍。',
  effect: { attr: { spr: 1, chr: 1 } }
},

{
  id: 'ev_n4_wxn_loot_split',
  age: [18, 40],
  pool: 'novel_wuxian',
  weight: 9,
  text: '战利品分配现场，队友坚持"出力多者多拿"，可他所谓的出力，是全程站在后面喊加油。气氛僵到连副本boss都想出来打圆场。',
  choices: [
    { text: '按贡献重算', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { chr: 1, mny: 1 } }, result: '你拉出伤害统计和承伤曲线，数据糊脸。喊加油那位默默把多拿的放了回去。', kind: 'good' },
    { text: '懒得争', effect: { attr: { mny: -1, spr: -1 } }, result: '你拿了最小的一份，回去路上安慰自己：和气生财。然后越想越气。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_coward_mate',
  age: [18, 40],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'bad',
  text: 'boss狂暴的瞬间，你队主坦连句台词都没留就捏碎了回城符。你硬吃了三巴掌才等到支援，事后他在群里发了六个磕头表情。',
  effect: { attr: { str: -1, spr: -2 } }
},

{
  id: 'ev_n4_wxn_keeper',
  age: [20, 42],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '即将进高难副本的轮回者把一枚戒指塞给你："替我保管，十天后没回来就归你。"他说得轻描淡写，可你认得那戒指——他的全部身家。',
  choices: [
    { text: '妥善保管', effect: { attr: { chr: 1, spr: 1 } }, result: '第十一天他回来了，瘦了一圈，开口第一句是"戒指还在吧"。你把戒指抛给他，附赠一句"利息一顿火锅"。', kind: 'good' },
    { text: '劝他自己带着', effect: { attr: { spr: 1, luk: 1 } }, result: '他想了想，把戒指戴回手上。那个副本他活着出来了——戒指替他挡了致命一击。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_wxn_mentor',
  age: [18, 34],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '积分榜前十的大佬忽然私聊你："看你骨骼清奇，要不要拜我为师？学费是你下个副本三成收益。"你盯着"骨骼清奇"四个字，怀疑他群发了两百遍。',
  choices: [
    { text: '拜师', effect: { attr: { mny: -1, int: 2 } }, result: '学费很贵，但干货是真的。三个月后你再看新人犯蠢，眼神已经和师父一模一样。', kind: 'good' },
    { text: '婉拒', effect: { attr: { spr: 1 } }, result: '你回了个"我考虑考虑"，随即被移出大佬朋友圈。也好，清净。' }
  ]
},

{
  id: 'ev_n4_wxn_debt',
  age: [18, 40],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '昔日队友深夜来电，说强化差最后一千积分，求你江湖救急，下本连本带利还。你看了看存款——那是你攒了四个月的命。',
  choices: [
    { text: '借', effect: { attr: { mny: -2, chr: 1 } }, result: '他下本活着回来，连本带利还了钱，附赠一张手写"生死之交"奖状。字很丑，你看完笑出了声。', kind: 'good' },
    { text: '不借', effect: { attr: { spr: -1 } }, result: '你编了个理由推掉。后来他活着回来请你喝酒，谁都没提那通电话，但你知道有些东西变薄了。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_wxn_rival',
  age: [20, 42],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '积分榜上，有个人连续七个副本排名都恰好压你一头。你们从没说过话，但每次进本前，都会下意识在名单里先找对方的名字。',
  effect: { attr: { spr: 1, int: 1 } }
},

{
  id: 'ev_n4_wxn_maintenance',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'fate',
  text: '凌晨四点，全空间广播："系统例行维护，期间请勿死亡，复活服务暂停。"你躺在宿舍里琢磨：这句话的意思是，平时死得起？',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_wxn_graffiti',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'fate',
  text: '宿舍床板背面刻着一行褪色的字："第七赛季，老三到此一游。"你问系统，系统回复：当前为第九赛季，第八赛季资料不存在。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_wxn_number_rule',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'fate',
  text: '你发现自己的轮回者编号前两位是"00"，而其他所有人都是随机四位。问遍全空间没人见过同款，只有一个老头嘀咕："00开头……那是试运行的号段。"',
  effect: { attr: { luk: 1 } }
},

{
  id: 'ev_n4_wxn_points_truth',
  age: [20, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'fate',
  text: '老玩家喝多了漏了句嘴："积分不是钱，是锚。你在这儿花得越多，就越不记得自己原来住哪个世界。"第二天他矢口否认，但你发现他账户余额常年为零。',
  effect: { attr: { int: 1, spr: -1 } }
},

{
  id: 'ev_n4_wxn_revived_gap',
  age: [20, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'bad',
  text: '复活归来的队友说他记得死前的每一秒，唯独想不起死的那一瞬间看见了什么。他说这话时在笑，但手一直在抖。',
  effect: { attr: { spr: -1, int: 1 } }
},

{
  id: 'ev_n4_wxn_customer_service',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'fate',
  text: '你试着对光幕说了句"转人工"。沉默三秒后，光幕弹出一行字："您好，工号9527为您服务。"你吓得当场退出登录，从此再没敢皮过。',
  effect: { attr: { spr: -1, luk: 1 } }
},

{
  id: 'ev_n4_wxn_old_broadcast',
  age: [22, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'fate',
  text: '观战厅录像库里，你翻到一段没有编号的录像：画质很旧，一群人站在空间里开联欢会，横幅写着"庆祝通关，欢迎回家"。发布日期比空间"上线"还早三年。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_wxn_fake_ceiling',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'fate',
  text: '失眠的夜里你盯着天花板，忽然意识到：这个空间的天，从来没有一片云是被风吹动的。它们更像一张裱糊得很好、但裱糊了太久的画。',
  effect: { attr: { spr: -1, int: 1 } }
},

{
  id: 'ev_n4_wxn_clean_day',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 11,
  kind: 'good',
  text: '公会发起"空间大扫除日"，你负责擦公告栏。擦掉三层灰之后，你在栏板角落发现前任会长刻的小字："扫完记得吃饭。"',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wxn_kitchen',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 11,
  kind: 'good',
  text: '公共厨房里，四川轮回者和广东轮回者正为"火锅能不能涮白切鸡"展开第N次论战。你默默涮了一片毛肚，觉得这才是人间正道。',
  effect: { attr: { spr: 1, str: 1 } }
},

{
  id: 'ev_n4_wxn_fake_stars',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'good',
  text: '宿舍区顶楼有一片人造星空，每晚准时亮起。你躺着看了半小时，认出其中三颗"星星"其实是其他轮回者晾在天花板的荧光袜子。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wxn_chess_room',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'good',
  text: '棋牌室里，两个老头用积分为注下了三天象棋。输家赖账的方式是当场报名下一个S级副本，赢家愣了半天也报了名："你死了谁还我钱。"',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wxn_bathhouse',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'good',
  text: '空间澡堂的池子据说是某位大佬兑换的"温泉副本残留"。泡着泡着，你听见隔壁隔间两个轮回者在交流情报——水声很大，秘密很小。',
  effect: { attr: { spr: 1, int: 1 } }
},

{
  id: 'ev_n4_wxn_roommate',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'good',
  text: '新室友睡觉说梦话，全是各副本的规则条文。你听了半宿默默记了两页笔记——第二天他自己根本不记得，你白嫖了一份攻略。',
  effect: { attr: { int: 1, spr: 1 } }
},

{
  id: 'ev_n4_wxn_insomnia',
  age: [20, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'bad',
  text: '凌晨三点你没睡着，刷到论坛热帖《你还记得现实里住几楼吗》。你想了很久，发现只记得门牌号，不记得回家的路。你关掉帖子，假装没刷到过。',
  effect: { attr: { spr: -2 } }
},

{
  id: 'ev_n4_wxn_space_cat',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'good',
  text: '空间里不知哪来的橘猫，谁的罐头都吃，谁的床都睡，唯独不进任何副本。有人说它是系统漏洞，有人说它是上代玩家变的。它对此不予置评，因为它在睡觉。',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_wxn_dungeon_birthday',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'good',
  text: '生日那天你正好在副本里。零点整，队友们用三根照明棒当蜡烛、罐头当蛋糕，boss在门外很有耐心地等你们唱完生日歌才破门。',
  effect: { attr: { spr: 2, chr: 1 } }
},

{
  id: 'ev_n4_wxn_no_number_door',
  age: [22, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'fate',
  text: '副本大厅最深处有一扇没有编号的门，门锁崭新，门轴却锈了。保安说那儿从来是面墙，保洁说她每天都擦那扇门。你站在门口，第一次觉得"忘了"是一种功能。',
  effect: { attr: { int: 1, spr: -1 } }
},

{
  id: 'ev_n4_wxn_bench_oldman',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 10,
  kind: 'good',
  text: '广场长椅上常年坐着个晒太阳的老人，没人记得他进过副本。他告诉你："我年轻时候也急，后来发现，活得久本身就是一种通关。"说完他掏出保温杯，枸杞泡得正红。',
  effect: { attr: { spr: 1, luk: 1 } }
},

{
  id: 'ev_n4_wxn_retire_wall',
  age: [24, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'fate',
  text: '休息区有一面"退役墙"，贴满金盆洗手者的留言。出现频率最高的一句是："积分换不回的东西，就别再拿命去换了。"落款日期横跨八年。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_wxn_dream_home',
  age: [20, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'fate',
  text: '你梦见自己回到现实世界的家，妈妈在厨房喊你吃饭，一切都和离开前一模一样。醒来时枕头湿了一角，而系统提示音照常响起：今日副本已排期。',
  effect: { attr: { spr: -1, str: 1 } }
},

{
  id: 'ev_n4_wxn_nameless_statue',
  age: [18, 48],
  pool: 'novel_wuxian',
  weight: 9,
  kind: 'fate',
  text: '交易广场中央立着一尊无名雕像，底座刻着"献给所有没回来的人"。每逢新赛季开启，雕像前总会莫名多出几罐可乐——没人组织，但人人都知道该放一罐。',
  effect: { attr: { spr: 1, chr: 1 } }
},

{
  id: 'ev_n4_wxn_npc_mercy',
  age: [20, 44],
  pool: 'novel_wuxian',
  weight: 8,
  once: true,
  text: '生存副本的尾声，负责追杀你们的NPC猎手在最后一刻收了刀。他盯着你看了很久，说："你挣扎的样子，很像当年的我。"然后转身走进了雾里。',
  choices: [
    { text: '追问他的来历', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, spr: -1 } }, result: '他没回头，只留下一句："NPC这行，干久了会想起一些不该想起的事。"', kind: 'fate' },
    { text: '默默记下这份情', effect: { attr: { spr: 1 } }, result: '通关结算时，你的评语栏多了一行小字：猎手的敬意。积分没加，但你开心了一整天。', kind: 'good' }
  ]
},

// ---- 霸总 ----

{
  id: 'ev_n4_bz_pricewar_start',
  age: [24, 30],
  pool: 'novel_bazong',
  weight: 10,
  once: true,
  big: true,
  text: '顾氏传媒旗下的新消费品牌突然全线降价三成，摆明了要烧钱拖垮厉氏的新零售业务。厉承烨盯着报表一夜没睡，天亮时问你：这仗，打不打？',
  choices: [
    { text: '陪他打，砸钱跟到底', cond: { attr: { mny: { gte: 6 } } },
      effect: { attr: { mny: -3, spr: 2 }, setFlags: ['n4_bz_pricewar'] },
      result: '你把自己的私房钱都拍在桌上。厉承烨看了你很久，只说了两个字：值得。', kind: 'good', big: true },
    { text: '献上一计：不打价格，打体验',
      effect: { attr: { int: 2, mny: -1 }, setFlags: ['n4_bz_pricewar'] },
      result: '你提出的会员体验方案被全票通过，顾氏的降价像一拳打进了棉花里。', kind: 'good' },
    { text: '劝他及时止损',
      effect: { attr: { spr: -1, mny: 1 } },
      result: '厉承烨沉默了很久，说了句再议。那晚他一个人在书房坐到天亮。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_pricewar_mid',
  age: [31, 37],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  cond: { flags: ['n4_bz_pricewar'] },
  text: '价格战打到第三年，顾氏现金流见底，开始在渠道上玩阴的：买断货架、挖走店长。厉氏季度会上气氛凝重，所有人都看向你这个当初的主战派。',
  choices: [
    { text: '亲自下一线稳渠道', cond: { attr: { chr: { gte: 6 } } },
      effect: { attr: { chr: 1, str: -1 }, setFlags: ['n4_bz_pr_won'] },
      result: '你一家家店跑下来，店长们被诚意打动，八成渠道稳住了。顾氏的攻势就此瓦解。', kind: 'good', big: true },
    { text: '釜底抽薪，收购对方上游',
      effect: { attr: { mny: -2, int: 1 }, setFlags: ['n4_bz_pr_won'] },
      result: '厉氏悄悄吃下了顾氏的供货工厂。对手第二天就悄悄把价格调了回去。', kind: 'good' },
    { text: '撑不住，建议求和',
      effect: { attr: { spr: -2 } },
      result: '停战协议签了，但厉氏丢掉了两个省的货架。会议室里没人说话。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_pricewar_end',
  age: [38, 45],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  cond: { flags: ['n4_bz_pr_won'] },
  text: '价格战尘埃落定，厉氏新零售成为行业第一。庆功宴上，当年被你稳住的店长们联名送来一面锦旗，上书八个字：价格会输，人心不会。',
  effect: { attr: { mny: 3, spr: 2, chr: 1 } }
},

{
  id: 'ev_n4_bz_patent_sue',
  age: [25, 32],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  text: '叶氏科技突然发难，起诉厉氏新投产线的核心专利侵权，索赔金额后面跟着一串零。法务部连夜开会，你发现对方引用的专利文件里有一处日期对不上。',
  choices: [
    { text: '抓住日期漏洞反诉', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { int: 1, spr: 1 }, setFlags: ['n4_bz_patent'] },
      result: '对方的专利申请日晚于厉氏的实验记录。法庭外，叶氏的律师脸色铁青。', kind: 'good' },
    { text: '走和解，花钱买平安',
      effect: { attr: { mny: -2 }, setFlags: ['n4_bz_patent'] },
      result: '和解费贵得肉疼，但产线没停。厉承烨说：能用钱解决的，都不算事。' },
    { text: '慌了神，交给法务全权处理',
      effect: { attr: { spr: -1, mny: -1 } },
      result: '案子拖了半年，产线错过最佳窗口期。你懊悔当初没有多看那几页文件。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_patent_turn',
  age: [33, 40],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  cond: { flags: ['n4_bz_patent'] },
  text: '专利官司的后续来了：你主张布局的防御性专利池派上了用场，叶氏的新品反而踩进了厉氏的专利雷区。攻守之势，异也。',
  choices: [
    { text: '交叉授权，化敌为友',
      effect: { attr: { mny: 2, chr: 1 }, setFlags: ['n4_bz_patent_win'] },
      result: '两家公司签了交叉授权协议。叶氏掌门人在签字时说：你比厉承烨难对付。', kind: 'good', big: true },
    { text: '穷追猛打，索赔到底',
      effect: { attr: { mny: 3, spr: -1 }, setFlags: ['n4_bz_patent_win'] },
      result: '赔偿金到账那天，财经版头条写着：专利战，厉氏完胜。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_bz_patent_cash',
  age: [41, 48],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  kind: 'good',
  cond: { flags: ['n4_bz_patent_win'] },
  text: '厉氏的专利池开始对外授权，每年躺着收许可费。你路过会议室，听见新来的实习生小声说：原来专利墙真的能当印钞机。',
  effect: { attr: { mny: 2, spr: 1 } }
},

{
  id: 'ev_n4_bz_overseas',
  age: [28, 38],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  big: true,
  text: '厉氏计划进军东南亚市场，但当地财团放出话来：厉家的船，进不了他们的港。董事会分成两派，吵得不可开交。',
  choices: [
    { text: '借沈家的航运线绕开封锁', cond: { attr: { chr: { gte: 6 } } },
      effect: { attr: { mny: 2, chr: 1 } },
      result: '你摆了一桌酒请沈家话事人，三杯下肚，港口的事就成了。', kind: 'good' },
    { text: '稳扎稳打，先做跨境电商试水',
      effect: { attr: { int: 1, mny: 1 } },
      result: '小包件先过去探路，半年后数据漂亮得让反对派闭了嘴。', kind: 'good' },
    { text: '硬闯，正面刚当地财团',
      effect: { attr: { mny: -3, spr: -1 } },
      result: '货柜在港口被扣了四十天，滞港费单比你的人还高。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_supply_negotiate',
  age: [26, 36],
  pool: 'novel_bazong',
  weight: 10,
  once: true,
  text: '核心原材料涨价五成，供应商仗着独家货源漫天要价。采购总监急得嘴角起泡，你却注意到对方老板最近迷上了厉氏旗下马场的赛马。',
  choices: [
    { text: '组一场马球局，边玩边谈', cond: { attr: { chr: { gte: 5 } } },
      effect: { attr: { chr: 1, mny: 1 } },
      result: '三局马球下来，合同上的涨幅从五成变成了半成。生意果然都是玩出来的。', kind: 'good' },
    { text: '扶持二供，打破垄断',
      effect: { attr: { int: 1, mny: -1 } },
      result: '你投了第二供应商一条产线。独家货源从此不再独家，报价单变得眉清目秀。', kind: 'good' },
    { text: '咬牙接受涨价',
      effect: { attr: { mny: -2, spr: -1 } },
      result: '成本转嫁到终端，销量应声下滑。你在复盘会上把这笔账记在了自己头上。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_newbiz',
  age: [30, 42],
  pool: 'novel_bazong',
  weight: 10,
  text: '你提议厉氏试水银发经济，把闲置的商业物业改造成康养社区。三年后，第一批入住的老人们在院子里下棋，入住率百分之九十八，还顺手上了央视新闻。',
  effect: { attr: { mny: 2, spr: 2 } }
},

{
  id: 'ev_n4_bz_chip',
  age: [27, 35],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '叶氏科技的新一代芯片流片失败，股价大跌。厉承烨看着收购窗口，问你的意见：抄，还是不抄？',
  choices: [
    { text: '趁低吸筹，小步建仓', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { mny: 3, int: 1 } },
      result: '半年后叶氏二次流片成功，股价翻倍。你的建仓记录被投研部当成了教学案例。', kind: 'good', big: true },
    { text: '隔行如隔山，按兵不动',
      effect: { attr: { spr: 1 } },
      result: '你没赚到大钱，也没踩进坑里。稳健有时候就是最好的进攻。' }
  ]
},

{
  id: 'ev_n4_bz_logistics',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '圈子里都说沈家的航运生意是祖上传下来的，从漕运做到远洋，家里吃饭的规矩都是按船期排的。你在沈家的码头看见一句话：风浪越大，船费越贵。',
  effect: { attr: { luk: 1 } }
},

{
  id: 'ev_n4_bz_media_gu',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '顾氏传媒掌握着全城一半的杂志和热搜位。圈内的生存法则是：宁得罪厉家，别得罪顾家——厉家要钱，顾家要的是让你社死。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_bz_will_leak',
  age: [30, 38],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  big: true,
  text: '厉家老爷子病重，一份疑似遗嘱的文件在家族群里疯传：旁支三房分到的份额，比预想的少了一大截。三叔当晚就带着律师杀到了老宅。',
  choices: [
    { text: '出面安抚三叔，稳住局面', cond: { attr: { chr: { gte: 6 } } },
      effect: { attr: { chr: 1, spr: -1 }, setFlags: ['n4_bz_will'] },
      result: '你在老宅客厅坐到凌晨三点，三叔摔门而去，但律师函暂时没有寄出。' },
    { text: '建议老爷子公开遗嘱',
      effect: { attr: { int: 1 }, setFlags: ['n4_bz_will'] },
      result: '病床上的老爷子看了你一眼：全家上下，就你敢跟我提这个。', kind: 'good' },
    { text: '事不关己，躲远点',
      effect: { attr: { spr: -1 }, setFlags: ['n4_bz_will'] },
      result: '你躲得了一时，躲不了家族群里每天九十九加的未读消息。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_will_court',
  age: [39, 46],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  cond: { flags: ['n4_bz_will'] },
  text: '老爷子去世后，三叔正式提起诉讼，主张遗嘱无效。开庭前夜，他私下找到你，开出一个价码：只要你交出当年老爷子的就诊记录，厉氏海外的两处物业归你。',
  choices: [
    { text: '严词拒绝，法庭见',
      effect: { attr: { spr: 2, int: 1 }, setFlags: ['n4_bz_will_side'] },
      result: '你摔了茶杯。三个月后判决下来：遗嘱有效。三叔在法院门口老了很多岁。', kind: 'good', big: true },
    { text: '心动，但最终没有点头',
      effect: { attr: { spr: -1, mny: 1 }, setFlags: ['n4_bz_will_side'] },
      result: '那晚你没睡好。虽然什么也没做，但你始终记得自己犹豫过的那十秒钟。' }
  ]
},

{
  id: 'ev_n4_bz_will_peace',
  age: [47, 52],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  kind: 'good',
  cond: { flags: ['n4_bz_will_side'] },
  text: '争产风波过去多年，三叔的儿子创业缺钱，兜兜转转找到了你。你投了他。签约那天他说：我爸让我别来，但我信你。恩怨这一页，总算翻过去了。',
  effect: { attr: { spr: 2, chr: 1, mny: -1 } }
},

{
  id: 'ev_n4_bz_uncle',
  age: [33, 42],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  big: true,
  text: '二伯联合了几位老臣，以厉承烨长期旅居海外为由，提议改选集团总裁。投票定在下周，你手里握着的关键一票，成了双方争夺的焦点。',
  choices: [
    { text: '提前布局，逐个争取摇摆票', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { int: 1, spr: -1 } },
      result: '投票结果九比二。二伯当场拂袖而去，老臣们从此见你都绕着走。', kind: 'good' },
    { text: '在会上一锤定音，公开表态',
      effect: { attr: { chr: 2 } },
      result: '你只说了一句话：业绩在这里，谁行谁上。会议室安静得能听见空调声。', kind: 'good' },
    { text: '两头不得罪，装病缺席',
      effect: { attr: { spr: -2, chr: -1 } },
      result: '虽然最后没改选成功，但你缺席的事被记了很久。信任这东西，碎了就难补。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_cousin',
  age: [28, 40],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  text: '旁支的一位堂哥打着厉氏旗号在外面高息揽储，暴雷后债主堵到了集团门口。厉承烨只有一句话：处理干净，但别脏了厉家的名声。',
  effect: { attr: { mny: -2, spr: -1 } },
  kind: 'bad'
},

{
  id: 'ev_n4_bz_family_tree',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '厉家族谱修到了第三十二代，规矩是嫡系用金粉、旁支用墨笔。你翻到自己那一页，名字端端正正写在厉承烨旁边——用的也是金粉。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_bz_old_house_meal',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '老宅每月一次家宴，长桌二十四道菜，上菜顺序按辈分排。你如今的位置离主位又近了两格，有人看在眼里，脸色比桌上的凉拌苦瓜还绿。',
  effect: { attr: { chr: 1 } }
},

{
  id: 'ev_n4_bz_aunt',
  age: [34, 44],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '久不联系的姑姑突然登门，拎着两盒燕窝，绕了三个弯终于说明来意：家族基金改选理事，她想让你投她一票。',
  choices: [
    { text: '看在燕窝的面子上，投她',
      effect: { attr: { chr: 1, mny: -1 } },
      result: '姑姑当选后逢人就夸你懂事。燕窝的味道，你至今记得。' },
    { text: '婉拒：理事要按章程选',
      effect: { attr: { int: 1, spr: -1 } },
      result: '姑姑笑着收了燕窝，转头就在牌桌上说你翅膀硬了。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_grandpa',
  age: [25, 33],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'good',
  text: '老爷子把你叫到书房，什么都不说，只跟你下了一下午的棋。连输三局后，他忽然开口：承烨那小子脾气硬，家里需要一个能输得起的人。你被留下了晚饭。',
  effect: { attr: { spr: 2, int: 1 } }
},
{
  id: 'ev_n4_bz_ex_return',
  age: [24, 30],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  big: true,
  kind: 'fate',
  text: '行业峰会上，有人拍了拍你的肩。回头一看，是你出国前谈了四年的前任，如今是华尔街归来的投行精英，名片上的头衔烫得发光。他笑着说：好久不见，你比以前更好了。',
  choices: [
    { text: '大方叙旧，仅此而已',
      effect: { attr: { chr: 1 }, setFlags: ['n4_bz_ex'] },
      result: '你们像老同学一样聊了十分钟。不远处，厉承烨端着酒杯，指节微微发白。' },
    { text: '冷淡点头，转身就走',
      effect: { attr: { spr: 1 }, setFlags: ['n4_bz_ex'] },
      result: '你走得干脆利落。当晚厉承烨什么都没问，但给你剥了一整盘虾。', kind: 'good' },
    { text: '心里咯噔一下，多喝了两杯',
      effect: { attr: { spr: -2 }, setFlags: ['n4_bz_ex'] },
      result: '旧情这东西，见光就发酵。你回家路上一直看着窗外没说话。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_ex_truth',
  age: [31, 38],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  cond: { flags: ['n4_bz_ex'] },
  text: '前任代表资方参与厉氏一轮融资，谈判桌上他忽然放出消息：当年分手，是因为他收了别人一笔钱离开这座城市。全桌的目光刷地聚到你脸上。',
  choices: [
    { text: '当场把事情摊开说清',
      effect: { attr: { spr: 2, chr: 1 }, setFlags: ['n4_bz_ex_clear'] },
      result: '你说：当年的事我早知道了，钱是沈家给的，对吧？前任的脸色瞬间煞白。这一局，你赢得干净利落。', kind: 'good', big: true },
    { text: '不动声色，生意归生意',
      effect: { attr: { int: 1, mny: 1 }, setFlags: ['n4_bz_ex_clear'] },
      result: '融资条款谈得异常顺利——他心里有愧，让了三个点。旧账，变成了折扣。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_bz_jealous',
  age: [24, 40],
  pool: 'novel_bazong',
  weight: 10,
  once: true,
  text: '厉承烨和新任女副总裁连续加班一周，公司里传得有鼻子有眼。你表面云淡风轻，晚上却把他书房里的合照全都扣着放了。',
  choices: [
    { text: '直接问清楚',
      effect: { attr: { spr: 1, chr: 1 } },
      result: '他愣了三秒，然后把一整周的会议纪要拍在你面前：自己看，全程二十七个人在场。', kind: 'good' },
    { text: '阴阳怪气一整天',
      effect: { attr: { spr: -1, chr: -1 } },
      result: '他到晚上才反应过来你在吃醋，笑得直不起腰。你更气了。', kind: 'bad' },
    { text: '暗中观察，自己破案', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { int: 1 } },
      result: '你查清了他们是在筹备给你的惊喜基金。你默默把合照一张张摆了回去。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_bz_misunderstand',
  age: [26, 42],
  pool: 'novel_bazong',
  weight: 10,
  once: true,
  kind: 'bad',
  text: '你在厉承烨的西装口袋里发现一张妇产科的挂号单，名字却不是你的。你攥着那张纸在客厅坐了一整夜，脑子里演完了八十集连续剧。',
  choices: [
    { text: '天亮就把挂号单拍在桌上',
      effect: { attr: { spr: 1 } },
      result: '他看完沉默了：这是替沈家少奶奶挂的专家号，人家丈夫在国外。你闹了个大红脸。', kind: 'good' },
    { text: '憋着不说，暗中较劲',
      effect: { attr: { spr: -2 } },
      result: '冷战三天后真相大白，他却认真地说：以后有疑问，直接问我。你忽然有点想哭。' }
  ]
},

{
  id: 'ev_n4_bz_test',
  age: [25, 38],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  kind: 'fate',
  text: '你们像两只互相试探的猫：他故意在你面前接了别的女人的电话，你故意在朋友圈发了和学长的合影。谁先绷不住谁就输。',
  effect: { attr: { int: 1, spr: -1 } }
},

{
  id: 'ev_n4_bz_tsundere',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 10,
  text: '降温了。厉承烨把一件外套扔给你，附带一句：别误会，是司机买多了。你看了眼吊牌——是你的尺码，定制款，下单日期是上个月。',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_bz_umbrella',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 10,
  kind: 'good',
  text: '暴雨夜你被困在公司楼下，叫了半小时的车。忽然一辆熟悉的车停在面前，车窗降下来，厉承烨面无表情：顺路。你查过导航，他家和你完全反方向。',
  effect: { attr: { spr: 2, luk: 1 } }
},

{
  id: 'ev_n4_bz_anniversary2',
  age: [30, 50],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'good',
  text: '结婚纪念日，厉承烨推掉了百亿签约，亲自下厨。成品是一盘焦黑的牛排和一锅糊底的罗宋汤。你们对着灾难现场笑了半小时，最后点了外卖。',
  effect: { attr: { spr: 2, chr: 1 } }
},

{
  id: 'ev_n4_bz_text_msg',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 10,
  text: '你发现厉承烨的微信表情包库存惊人：猫猫、狗狗、流泪熊猫头应有尽有。谁能想到谈判桌上杀伐决断的厉总，收藏夹里全是毛茸茸。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_bz_gift_tie',
  age: [26, 44],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  text: '你送了厉承烨一条领带。第二天董事会，第三天路演，第四天见外宾，他戴的全是那一条。秘书小声说：厉总以前一天换三条。',
  choices: [
    { text: '心里偷着乐，再送一条',
      effect: { attr: { chr: 1, mny: -1 } },
      result: '从此他的领带轮换名单变成了两条。整个秘书处都学会了看领带识心情。', kind: 'good' },
    { text: '提醒他该换换了',
      effect: { attr: { spr: -1 } },
      result: '他淡淡回了句习惯了。那条领带他戴到了起毛边。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_bz_his_ex',
  age: [28, 38],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '厉承烨的大学前任成了当红画家，回国办展，画册扉页上印着一行字：献给C.Y.，我永远的灵感。媒体闻风而动，长枪短炮对准了你。',
  choices: [
    { text: '高调现身画展，买下全场最贵的一幅', cond: { attr: { mny: { gte: 5 } } },
      effect: { attr: { mny: -2, chr: 2 } },
      result: '你站在那幅画前合影，笑容得体。第二天头条是：正宫的格局。', kind: 'good', big: true },
    { text: '不理会，冷处理',
      effect: { attr: { spr: 1 } },
      result: '画展闭幕那天，那幅最贵的画流拍了。有些事，不回应就是最好的回应。' },
    { text: '憋不住，找厉承烨闹了一场',
      effect: { attr: { spr: -2, chr: -1 } },
      result: '他安静地听完，只说：都过去了，信我。你却整晚没睡着。' }
  ]
},

{
  id: 'ev_n4_bz_night_talk',
  age: [32, 52],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'fate',
  big: true,
  text: '凌晨两点，你们都没睡着。厉承烨忽然说：其实当年那份契约，我第二天就后悔了——后悔设了期限。窗外天快亮了，谁也没有再说话，但有些东西不一样了。',
  effect: { attr: { spr: 3 } }
},

{
  id: 'ev_n4_bz_product_crisis',
  age: [27, 40],
  pool: 'novel_bazong',
  weight: 10,
  once: true,
  big: true,
  kind: 'bad',
  text: '厉氏旗下新品被曝出批次质量问题，测评视频播放量破亿，退货潮涌进客服中心。公关部给了两套方案：冷处理等风头过去，或者总裁亲自直播道歉。',
  choices: [
    { text: '支持直播道歉，全额召回',
      effect: { attr: { mny: -3, chr: 2, spr: 1 } },
      result: '直播间弹幕从谩骂刷到路转粉。三个月后复购率创了新高——危机成了最好的广告。', kind: 'good', big: true },
    { text: '冷处理，发律师函压热搜',
      effect: { attr: { mny: -1, chr: -2 } },
      result: '热搜是压下去了，但测评博主做了续集，标题叫：资本堵不住我的嘴。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_scandal_exec',
  age: [30, 45],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '跟着厉家二十年的老臣被曝出挪用公款包养情人，金额触目惊心。他是厉承烨的授业恩师，处置重了伤情分，轻了坏规矩。全集团都在看你们怎么办。',
  choices: [
    { text: '移交司法，不留情面',
      effect: { attr: { spr: -1, chr: 1, int: 1 } },
      result: '厉承烨亲自送他上的警车，回头说了一句：规矩比情分长寿。集团风气为之一肃。', kind: 'good' },
    { text: '内部处理，让他体面退休',
      effect: { attr: { spr: -1, mny: -1 } },
      result: '事情压下来了，但年轻的骨干们陆续递了辞呈——他们看的不是结果，是态度。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_cyberbully',
  age: [22, 35],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  kind: 'bad',
  text: '一段掐头去尾的监控视频在网上疯传：画面里你对服务员颐指气使。评论区十万条谩骂，你的照片被做成表情包，连你大学时的微博都被挖了出来。',
  choices: [
    { text: '放出完整视频，正面硬刚', cond: { attr: { int: { gte: 5 } } },
      effect: { attr: { spr: 1, chr: 1 } },
      result: '完整视频里，你前一秒刚替服务员挡下了醉汉的推搡。风向一夜逆转，造谣账号被封。', kind: 'good' },
    { text: '关掉评论，等风头过去',
      effect: { attr: { spr: -2 } },
      result: '你一个月没敢看手机。厉承烨默默注销了五个带头造谣的大号——用他的方式。' }
  ]
},

{
  id: 'ev_n4_bz_hotsearch',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 10,
  text: '你发现自己有了热搜体质：穿件外套上热搜，喝杯咖啡上热搜，就连打个喷嚏都有人做成动图转发三万次。娱乐版编辑给你起了个外号：行走的流量包。',
  effect: { attr: { chr: 1 } }
},

{
  id: 'ev_n4_bz_rumor_stock',
  age: [28, 45],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '一则厉氏资金链断裂的小道消息在股民群里疯传，股价三天跌了百分之十五。你陪着投研部熬了两个通宵做澄清材料，发布那天手都在抖。',
  effect: { attr: { mny: -2, str: -1, spr: -1 } }
},

{
  id: 'ev_n4_bz_livestream',
  age: [24, 38],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  text: '你第一次试水直播带货，结果把产品名念错了三次，还把价格说低了一百块。弹幕瞬间沸腾，两万人冲进直播间喊着上错价也要买。',
  choices: [
    { text: '将错就错，按报错的价格卖',
      effect: { attr: { mny: -2, chr: 2 } },
      result: '那晚亏了八十万，却涨粉两百万。商家连夜加签了三年代言——血赚。', kind: 'good', big: true },
    { text: '紧急下播，发声明道歉',
      effect: { attr: { chr: -1, spr: -1 } },
      result: '声明写得很诚恳，但弹幕截图已经传遍了全网：嘴瓢主播，一战成名。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_bz_paparazzi2',
  age: [25, 42],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '狗仔拍到你和大学师兄在咖啡馆聊了三个小时，标题起得惊悚：豪门婚姻亮红灯？实际上你们在谈一个公益助学项目的赞助。厉承烨把报纸折好，只说了四个字：做得不错。',
  effect: { attr: { spr: 1, chr: 1 } }
},

{
  id: 'ev_n4_bz_pr_team',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '厉氏公关部有个内部守则：坏消息不过夜，好消息要包装，老板的私人新闻一律装死。守则最后一条是手写的：老板娘的新闻，优先级永远最高。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_bz_apology',
  age: [26, 44],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'good',
  text: '三年前被你在会上当众驳了面子的部门经理，如今成了独当一面的总监。年会敬酒时他说：当年那一驳，是我职业生涯最值钱的一课。你们碰了个杯。',
  effect: { attr: { chr: 1, spr: 1 } }
},
{
  id: 'ev_n4_bz_charity_doubt',
  age: [28, 42],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  big: true,
  kind: 'bad',
  text: '有自媒体发文质疑厉氏慈善基金：捐款数字漂亮，落地项目寥寥，还附了一张对比表格。文章十万加之后，基金会的热线被愤怒的网友打爆了。',
  choices: [
    { text: '公开全部账目和项目清单',
      effect: { attr: { chr: 2, spr: 1 } },
      result: '四十七页明细挂上网，每一分钱的去向清清楚楚。质疑文章的作者默默删了稿。', kind: 'good', big: true },
    { text: '起诉造谣，杀鸡儆猴',
      effect: { attr: { mny: -1, chr: -1 } },
      result: '官司赢了，口碑输了。网友说你赢了官司，输了人心。', kind: 'bad' },
    { text: '邀请质疑者实地探访项目',
      effect: { attr: { chr: 1, mny: -1 } },
      result: '那位自媒体人走访三所乡村小学后，连发五条道歉视频，成了基金会的义务宣传员。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_bz_charity_audit',
  age: [32, 46],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '你坚持给慈善基金引入第三方审计，理事们集体反对：自家人查自家人，像什么话。你力排众议签了字。审计结果公布那天，捐赠额不降反升。',
  effect: { attr: { int: 1, chr: 1, spr: 1 } }
},

{
  id: 'ev_n4_bz_project_land',
  age: [30, 50],
  pool: 'novel_bazong',
  weight: 9,
  once: true,
  kind: 'good',
  text: '你盯了三年的乡村图书馆项目终于落地，第一批二十座同时开馆。开馆仪式上，一个小姑娘拽着你的衣角问：阿姨，这里的书真的能随便看吗？你鼻子一酸。',
  effect: { attr: { spr: 3 } }
},

{
  id: 'ev_n4_bz_charity_lore',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '圈里慈善晚宴的潜规则：捐款数字要好看，通稿要快，合影要站C位。但老人们说，真正的老牌家族比的是另一件事——谁捐的项目，十年后还活着。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_bz_volunteer',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  kind: 'good',
  text: '基金会志愿者日，你去山区小学当了一天代课老师。孩子们不知道你是谁，只记得这个老师会修投影仪，还会在课间给他们变魔术。',
  effect: { attr: { spr: 2, str: -1 } }
},

{
  id: 'ev_n4_bz_ex_dinner',
  age: [26, 36],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '合作方组的饭局上，你和前任被安排在了相邻座位。整顿饭你们聊天气、聊菜色、聊行业八卦，礼貌得像两块浮冰。散场时他说：你现在过得很好，挺好。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_bz_ex_gift',
  age: [25, 34],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '生日这天收到一个没有署名的包裹，里面是你很多年前随口说过想要的那本绝版书。你认得那个包装手法——全城只有一个人会打那样的蝴蝶结。',
  choices: [
    { text: '原样退回',
      effect: { attr: { spr: 1, int: 1 } },
      result: '包裹退回去的第三天，厉承烨不知从哪淘来同一本书，扉页上写着：我家也有。', kind: 'good' },
    { text: '收下，束之高阁',
      effect: { attr: { spr: -1 } },
      result: '书被塞进书柜最顶层。你以为忘了，搬家的那天却又看到了它。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_bz_ex_partner',
  age: [29, 40],
  pool: 'novel_bazong',
  weight: 7,
  once: true,
  text: '命运弄人，前任所在的投行成了厉氏新项目的联席承销方。签约仪式上你们握手、微笑、交换名片，全套动作标准得像演练过。只有你知道他掌心有汗。',
  effect: { attr: { mny: 1, spr: -1 } }
},

{
  id: 'ev_n4_bz_ex_wedding',
  age: [30, 45],
  pool: 'novel_bazong',
  weight: 8,
  text: '你收到了前任的婚礼请柬，烫金的，很体面。你让助理备了一份厚礼，人没有去。后来听说，新娘在敬酒时专门谢了你那份礼——圈子真小。',
  effect: { attr: { spr: 1, mny: -1 } }
},

{
  id: 'ev_n4_bz_gym',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 10,
  text: '厉承烨的私人健身房里挂着一块牌子：运动时不谈工作。你亲测无效——他在跑步机上否决了两个提案，在举铁的间隙批准了一个亿的预算。',
  effect: { attr: { str: 1 } }
},

{
  id: 'ev_n4_bz_coffee',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 10,
  text: '总裁办的咖啡有严格的鄙视链：手冲看不起挂耳，挂耳看不起速溶。而厉承烨喝速溶，喝得理直气壮：能提神的就是好咖啡。全楼的风气就此扭转。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_bz_driver',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '给厉家开了三十年车的老王是全宅情报最灵通的人：哪家要联姻，哪家要分家，他看接送路线就能猜个八九不离十。他的名言是：车轮子知道的事，比账本多。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_bz_elevator',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  kind: 'good',
  text: '电梯突发故障，你和厉承烨被困了四十分钟。没有电话，没有文件，你们靠在轿厢里聊了这些年的鸡毛蒜皮。救援到了，两个人都假装不着急出去。',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_bz_midnight_snack',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '半夜饿醒，你溜进厨房煮面，发现厉承烨也在。堂堂总裁，穿着睡衣，盯着一锅泡面，表情比看财报还专注。',
  choices: [
    { text: '拼桌，加两个蛋',
      effect: { attr: { spr: 2, str: 1 } },
      result: '凌晨一点的泡面局，你们分了最后一根火腿肠。比米其林好吃。', kind: 'good' },
    { text: '笑话他，然后被抢走了半锅面',
      effect: { attr: { spr: 1 } },
      result: '他抢面的手法稳准狠，一看就是练过的。总裁的形象碎了一地。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_bz_tailor',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 9,
  text: '给厉家做了两代西装的老师傅量体不用尺，眼睛一扫就报出一串数字。他说：衣服骗不了人，人站直了，衣服才会服帖。你悄悄挺直了背。',
  effect: { attr: { chr: 1 } }
},

{
  id: 'ev_n4_bz_piano',
  age: [24, 44],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '老宅琴房多年没人碰的三角钢琴，你一时兴起弹了半首。回头发现厉承烨倚在门边，不知听了多久。他说：继续。你说：忘词了。他说：琴没有词。',
  choices: [
    { text: '坐回去，弹完整首', cond: { attr: { chr: { gte: 5 } } },
      effect: { attr: { chr: 1, spr: 1 } },
      result: '曲子弹完，掌声只有一个人，但足够响。', kind: 'good' },
    { text: '落荒而逃',
      effect: { attr: { spr: -1 } },
      result: '后来每次路过琴房，那半首曲子都在你脑子里自动续播。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_bz_auction_watch',
  age: [28, 48],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  text: '拍卖行春拍，你替厉承烨举牌竞一块古董怀表。叫到第三轮，对手是叶家的少东家。你们隔着三排座位互相点头，然后面不改色地继续加价。',
  effect: { attr: { mny: -2, luk: 1 } }
},

{
  id: 'ev_n4_bz_rain_temple',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '出差路过一座古刹，同行的人都在躲雨，只有你进去求了支签。签文写着：假作真时真亦假。你盯着看了很久，想起自己是怎么来到这个世界的。',
  choices: [
    { text: '把签文收好',
      effect: { attr: { spr: 2, luk: 1 } },
      result: '你把签纸夹进了钱包最里层。真也好，假也好，日子是自己过出来的。', kind: 'good' },
    { text: '付之一炬',
      effect: { attr: { spr: -1 } },
      result: '火光熄灭的瞬间你有点后悔——有些东西烧掉了，反而记得更牢。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_bz_fortune',
  age: [22, 52],
  pool: 'novel_bazong',
  weight: 8,
  kind: 'fate',
  text: '巷口算命的老头拉住你，端详半天说了句奇怪的话：姑娘的命数，不像这个户口本上的人。你笑他胡说，走出两条街，后背的汗还没干。',
  effect: { attr: { luk: 1, spr: -1 } }
},

{
  id: 'ev_n4_bz_dream',
  age: [35, 52],
  pool: 'novel_bazong',
  weight: 6,
  once: true,
  big: true,
  kind: 'fate',
  text: '你梦见了这本小说的原结局：厉承烨孤独终老，厉氏分崩离析。惊醒时天刚亮，枕边人睡得安稳。你忽然明白，你存在于此，本身就是改写的剧情。',
  effect: { attr: { spr: 3, luk: 1 } }
},

// ---- 末世 ----

{
  id: 'ev_n4_ms_water_scout',
  age: [22, 38],
  pool: 'novel_moshi',
  weight: 9,
  once: true,
  kind: 'fate',
  text: '侦察队回报：上游乱石谷发现一处未污染的泉水眼，可邻基地黑岩堡的人也盯上了它，两边哨兵隔着河谷互相举枪。',
  choices: [
    { text: '抢先派人驻守泉眼', cond: { attr: { str: { gte: 6 } } },
      effect: { attr: { str: 1, mny: -1 }, setFlags: ['n4_ms_water'] },
      result: '你的人连夜在泉边打下木桩，黑岩堡的人骂了几句，终究没敢开枪。', kind: 'good' },
    { text: '派使者去谈共享',
      effect: { attr: { chr: 1 }, setFlags: ['n4_ms_water'] },
      result: '使者带回来一句话：水可以分，但规矩要谈。谈判的门开了一条缝。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_water_talks',
  age: [23, 40],
  pool: 'novel_moshi',
  weight: 9,
  once: true,
  kind: 'fate',
  cond: { flags: ['n4_ms_water'] },
  text: '乱石谷谈判桌上，黑岩堡的代表把弯刀拍在桌面：泉水按人头来分，还是按拳头分？满屋子的火药味。',
  choices: [
    { text: '用晶核买下优先取水权',
      effect: { attr: { mny: -2, chr: 1 }, setFlags: ['n4_ms_water_pact'] },
      result: '一袋晶核推过去，对方收起弯刀。一纸分水盟约按了手印，两边各退一步。', kind: 'good' },
    { text: '提出联合护卫、按日轮取', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { int: 1, spr: 1 }, setFlags: ['n4_ms_water_pact'] },
      result: '你画出轮值表和共管哨位图，对方盯着看了半晌，点了头。乱世里少见的一纸信义。', kind: 'good', big: true },
    { text: '拂袖而去，准备武力夺水',
      effect: { attr: { str: 1, spr: -1 } },
      result: '谈判破裂。回程的路上谁都知道，下一面就是在泉边的枪口下。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_ms_water_pump',
  age: [24, 42],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  cond: { flags: ['n4_ms_water_pact'] },
  text: '老烟鬼用报废消防泵改出一台抽水机，清泉顺着铁皮管第一次流进曙光基地的蓄水池。孩子们排着队，捧着豁口的搪瓷缸接水，笑声比水声还响。',
  effect: { attr: { spr: 2, mny: 1 } }
},

{
  id: 'ev_n4_ms_stranger_gate',
  age: [20, 45],
  pool: 'novel_moshi',
  weight: 9,
  once: true,
  kind: 'fate',
  text: '黄昏，一个衣衫褴褛的男人跪在基地大门外，身后拖着一辆板车，车上盖着破帆布。他说自己从铁齿的地牢里逃出来，求一口饭、一面墙。',
  choices: [
    { text: '搜身后收入观察区',
      effect: { attr: { chr: 1 }, setFlags: ['n4_ms_stranger_in'] },
      result: '帆布下只有半袋发芽的土豆和一把磨亮的短刀。他缩在观察区的角落，眼神却总往基地深处瞟。', kind: 'fate' },
    { text: '给点干粮，让他离开',
      effect: { attr: { spr: -1 } },
      result: '他磕了个头，拖着板车走进暮色。守夜的老王嘟囔：这年月，狠心也是护身符。', kind: 'bad' },
    { text: '盘问他地牢的情形', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { int: 1 }, setFlags: ['n4_ms_stranger_in'] },
      result: '他说得出铁齿换岗的时辰、牢房的朝向，细节密得不像是编的。你留了个心眼。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_stranger_map',
  age: [21, 46],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  kind: 'fate',
  cond: { flags: ['n4_ms_stranger_in'] },
  text: '深夜，那个投奔者敲开你的门，从鞋底抠出一张油纸包着的图：铁齿掠夺团的囤粮点和哨位，一笔一划，是他用半年的命换来的。',
  choices: [
    { text: '收下地图，许他正式入籍',
      effect: { attr: { int: 1, chr: 1 }, setFlags: ['n4_ms_stranger_map'] },
      result: '他捧着那张薄薄的入籍纸，手抖得像风里的枯叶。他说十年了，第一次有人信他。', kind: 'good' },
    { text: '先验证，派人暗中踩点', cond: { attr: { int: { gte: 7 } } },
      effect: { attr: { int: 1 }, setFlags: ['n4_ms_stranger_map'] },
      result: '三天后侦察员回来：图上三处哨位，分毫不差。这个人，值得赌一把。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_ms_stranger_cache',
  age: [22, 48],
  pool: 'novel_moshi',
  weight: 5,
  once: true,
  big: true,
  kind: 'good',
  cond: { flags: ['n4_ms_stranger_map'] },
  text: '按着那张图，夜袭队摸进铁齿的囤粮点，一枪未放扛回二十袋粮和三箱药品。天亮时那个投奔者站在人群最后，没人看见他偷偷抹了把脸。',
  effect: { attr: { mny: 3, spr: 1 } }
},

{
  id: 'ev_n4_ms_fox_pup',
  age: [20, 40],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '巡逻队在铁丝网外捡到一只变异的狐崽，通体火红，两条尾巴，呲着乳牙冲人低吼。有人说变异兽养不熟，趁早打死省心。',
  choices: [
    { text: '留下它，关进铁笼喂养',
      effect: { attr: { spr: 1 }, setFlags: ['n4_ms_fox'] },
      result: '你用肉汤一点点喂，它从撞笼到肯隔着栏杆舔你的手指。驯化变异兽，基地里没人试过。', kind: 'fate' },
    { text: '放归荒野',
      effect: { attr: { spr: -1 } },
      result: '它跑出十几步又回头看了你一眼，红影一闪没入废墟。你心里空落落的。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_ms_fox_bond',
  age: [21, 42],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  kind: 'good',
  cond: { flags: ['n4_ms_fox'] },
  text: '双尾狐长到半人高，开始跟着狩猎队出墙。它能在三里外嗅出潜伏的变异体，喉间一声低鸣就是警报。老王给它起了个名，叫火苗。',
  choices: [
    { text: '给火苗登记成正式哨兽',
      effect: { attr: { spr: 1, str: 1 }, setFlags: ['n4_ms_fox_bond'] },
      result: '名册上多了一行特殊的名字。狩猎季的伤亡，比往年少了一半。', kind: 'good', big: true },
    { text: '继续散养，不立名目',
      effect: { attr: { spr: 1 }, setFlags: ['n4_ms_fox_bond'] },
      result: '火苗白天睡在哨塔阴影里，夜里绕着围墙巡逻，比谁都尽职。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_ms_fox_howl',
  age: [23, 45],
  pool: 'novel_moshi',
  weight: 5,
  once: true,
  big: true,
  kind: 'fate',
  cond: { flags: ['n4_ms_fox_bond'] },
  text: '尸群夜袭那晚，是火苗先撞响了警钟。它独守缺口，一身红毛被血浸得发黑，愣是没让一只变异体翻墙。天亮时它瘸着腿走回哨塔，全基地的人自发挥手向它致意。',
  effect: { attr: { spr: 2, luk: 1 } }
},

{
  id: 'ev_n4_ms_route_open',
  age: [24, 44],
  pool: 'novel_moshi',
  weight: 9,
  once: true,
  kind: 'fate',
  text: '南方种植园基地捎话来：想打通两地商路，用粮种换我们的铁器。中间隔着八十里废城和三伙流窜的掠夺者，需要有人押着第一趟货蹚出路来。',
  choices: [
    { text: '亲自押队开路', cond: { attr: { str: { gte: 6 } } },
      effect: { attr: { str: 1, mny: 1 }, setFlags: ['n4_ms_route'] },
      result: '七天六夜，车队碾过废城，你砍翻了两拨拦路的，车轮后扬起一条活路的尘烟。', kind: 'good' },
    { text: '出资雇佣兵护送',
      effect: { attr: { mny: -1 }, setFlags: ['n4_ms_route'] },
      result: '晶核撒出去，佣兵把货护到了地头。商路通了，就是过路费肉疼。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_route_ambush',
  age: [25, 46],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'bad',
  cond: { flags: ['n4_ms_route'] },
  text: '商路中段的黑松林出了事：一伙蒙面人劫了半车铁器，还在路面钉了倒刺。看手法，像是铁齿探子摸清了班次。',
  choices: [
    { text: '设伏反打一锅端', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { int: 1, str: 1 }, setFlags: ['n4_ms_route_clear'] },
      result: '你让车队照常上路，暗桩伏在林子里。蒙面人扑出来那一刻，罗网正好收口。', kind: 'good' },
    { text: '绕道百里，暂避锋芒',
      effect: { attr: { mny: -1, spr: -1 }, setFlags: ['n4_ms_route_clear'] },
      result: '新路多走两天，鞋底磨穿了，好歹再没遭劫。稳妥，就是憋屈。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_route_convoy',
  age: [26, 48],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  cond: { flags: ['n4_ms_route_clear'] },
  text: '商路畅通后的第一个满月，五辆改装卡车对向而行，车斗里装着南方的稻种、北地的铁器，还有一封封两地幸存者互相捎的信。有人管这条路叫活脉。',
  effect: { attr: { mny: 2, chr: 1, spr: 1 } }
},

{
  id: 'ev_n4_ms_ration_reform',
  age: [25, 45],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '配给所门口贴了张新榜：出工记工分，工分换细粮。老弱病残的保底口粮不变，多出力的能多吃一口。榜下吵成了一锅粥。',
  choices: [
    { text: '力挺新制，亲自解释',
      effect: { attr: { chr: 1, spr: -1 } },
      result: '你在粮站前站了三天，嘴皮子磨破。上工的人渐渐多了，仓库消耗也快了。', kind: 'fate' },
    { text: '维持大锅饭旧制',
      effect: { attr: { spr: 1, int: -1 } },
      result: '人群松了口气，可田里偷懒的身影也多了。公平和效率，乱世里难两全。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_ms_traitor_wire',
  age: [23, 42],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  kind: 'bad',
  text: '检修线路时在围墙根挖出一截新埋的铜线，另一头通向墙外——有人在给铁齿传基地的布防。排查到最后，嫌疑落在跟你同桌吃过三年饭的老巡逻身上。',
  choices: [
    { text: '当众公审，以儆效尤',
      effect: { attr: { spr: -1, str: 1 } },
      result: '他跪在场院中央，说女儿在铁齿手里。法办了，可整个基地安静了好几天。', kind: 'bad' },
    { text: '将计就计，喂假情报', cond: { attr: { int: { gte: 7 } } },
      effect: { attr: { int: 2 } },
      result: '铜线照旧传信，只是内容成了你写的。下一次铁齿扑空损兵，老巡逻望着墙外，老泪纵横。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_celeb_survivor',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  kind: 'fate',
  text: '新来的难民里有个戴口罩的中年人，摘了口罩有人失声喊出来——旧世界拿过大奖的电影明星。他苦笑着摆摆手：现在会杀丧尸，比会演戏值钱。',
  choices: [
    { text: '请他给大伙演一场戏',
      effect: { attr: { spr: 2, chr: 1 } },
      result: '场院搭起破布戏台，他演了一出旧世喜剧。笑声冲出围墙，惊起一片夜鸟。有人笑着笑着就哭了。', kind: 'good' },
    { text: '一视同仁，编入劳作队',
      effect: { attr: { spr: -1, str: 1 } },
      result: '他扛麻袋的样子笨得可爱，手上磨出血泡也不吭声。名人不名人的，末世只认汗水。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_child_secret',
  age: [22, 44],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  kind: 'fate',
  text: '拾荒队带回来一个七八岁的孩子，不哭不闹，怀里死死抱着一只铁盒。医生说孩子后颈有一块淡青的斑——和轻度变异体化的征兆一模一样。',
  choices: [
    { text: '留下孩子，秘密观察', cond: { attr: { spr: { gte: 5 } } },
      effect: { attr: { spr: 1 }, setFlags: ['n4_ms_child'] },
      result: '铁盒里是半块化掉的糖，他掰了一半给你。那块斑三个月没变化，孩子倒是先学会了笑。', kind: 'good' },
    { text: '送去隔离区',
      effect: { attr: { spr: -2 } },
      result: '隔着栅栏，孩子把铁盒贴在胸口看你。那眼神让你好几个夜里睡不踏实。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_ms_new_mutant',
  age: [24, 46],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  kind: 'bad',
  text: '城外出现新型变异体，昼伏夜出，循声而动，壳硬得步枪都打不穿。狩猎队折了两个人，只拖回来半截断肢供研究。',
  choices: [
    { text: '带队蹲守，摸清习性', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { int: 1, str: 1 } },
      result: '三个寒夜换来关键发现：它们畏惧高频哨音。老烟鬼连夜赶制了一批驱兽哨。', kind: 'good', big: true },
    { text: '收缩防线，避开其领地',
      effect: { attr: { mny: -1, spr: -1 } },
      result: '猎场小了一圈，粮仓紧了一分。活下来是活下来了，就是窝囊。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_ms_mine_dispute',
  age: [25, 45],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '西山废弃铜矿能采了，可黑岩堡的矿工也上了山。两边在山口各扎营垒，矿道里黑黢黢的，谁先动手谁理亏。',
  choices: [
    { text: '提议分巷道共采',
      effect: { attr: { chr: 1, mny: 1 } },
      result: '一纸巷道划分图，两班人马错时进洞。矿灯在山腹里次第亮起，像一条地下的星河。', kind: 'good' },
    { text: '夜里偷采，先下手为强',
      effect: { attr: { mny: 2, spr: -2 } },
      result: '矿是采回来了，可黑岩堡在山口贴出悬赏，要采贼的耳朵。梁子结下了。', kind: 'bad' }
  ]
},

{
  id: 'ev_n4_ms_power_restore',
  age: [26, 48],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  big: true,
  kind: 'good',
  text: '老烟鬼带着电工班修了整整一个秋天，柴油发电机终于带动主变压器。合闸那晚，基地主干道十二盏路灯齐刷刷亮了——末世以来，第一次有人造的光照亮夜路。',
  choices: [
    { text: '每晚限时供电两小时',
      effect: { attr: { spr: 2, int: 1 } },
      result: '灯亮时孩子们在灯下背书，大人们补衣裳。有人仰着头看灯，像看星星落了地。', kind: 'good' },
    { text: '电力优先供给工坊和医院',
      effect: { attr: { mny: 2, spr: 1 } },
      result: '机床轰鸣到深夜，手术室的灯再没灭过。路灯黑着，可人心亮着。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_ms_first_bus',
  age: [27, 50],
  pool: 'novel_moshi',
  weight: 5,
  once: true,
  big: true,
  kind: 'good',
  text: '一辆焊满钢板的旧校车改装完毕，开始沿安全路线接送外围哨点的孩子来基地上学。第一天发车，孩子们扒着窗栏杆，把脸挤在铁条中间，一路唱跑了调的歌。',
  choices: [
    { text: '跟车护送第一班',
      effect: { attr: { spr: 2, chr: 1 } },
      result: '你坐在最后一排，听了一路跑调的童谣。司机师傅说，这是他开过最金贵的一车货。', kind: 'good' },
    { text: '留在基地安排护卫岗哨',
      effect: { attr: { int: 1, spr: 1 } },
      result: '沿线增设四个瞭望哨。校车准点进出，汽笛声成了基地最安心的报时。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_ms_sacrifice_bridge',
  age: [24, 44],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  big: true,
  kind: 'bad',
  text: '尸群追兵将至，吊桥这头还有一支没走完的运输队，桥那头是炸桥的导火索。按下，桥断队亡；不按，墙危人亡。所有人的目光都落在你手上。',
  choices: [
    { text: '炸桥',
      effect: { attr: { spr: -3, str: 1 } },
      result: '巨响过后，河面漂着碎木。你活了下来，基地活了下来，可那几个名字，你再没勇气念出口。', kind: 'bad' },
    { text: '带人死守桥头，赌运输队过完',
      cond: { attr: { str: { gte: 7 } } },
      effect: { attr: { str: 2, spr: -1 } },
      result: '最后一辆板车过桥时，你的刀已经卷了刃。桥头横尸一片，你拄着断刀笑出了声——赌赢了。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_ms_night_market',
  age: [20, 45],
  pool: 'novel_moshi',
  weight: 9,
  kind: 'good',
  text: '每月十五，粮仓后巷自发聚起夜市：弹壳换的麦芽糖、旧零件拼的手电、用晶核标价的手工皮具。巡逻队睁一只眼闭一只眼，只要不卖违禁品。',
  choices: [
    { text: '逛摊，淘点小物件',
      effect: { attr: { spr: 1, mny: -1 } },
      result: '你用两枚晶核换了只木雕小鸟，摊主是个缺了条胳膊的老兵，刻鸟的手稳得出奇。', kind: 'good' },
    { text: '摆个摊试试手艺',
      effect: { attr: { mny: 1, chr: 1 } },
      result: '你的修表摊前排起了队。末世里，还有人愿意为知道时间付钱。', kind: 'good' }
  ]
},

{
  id: 'ev_n4_ms_workshop_accident',
  age: [22, 42],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'bad',
  text: '工坊里一台老车床崩了刀，铁屑削掉了学徒小六两根手指。他攥着血淋淋的手，第一句话是：师傅，活儿还没干完。',
  choices: [
    { text: '掏钱送他去板房医院',
      effect: { attr: { mny: -1, chr: 1 } },
      result: '手保住了三根指头。小六吊着绷带回了工坊，用左手慢慢学着重新握锉刀。', kind: 'good' },
    { text: '责令工坊整改安全规程',
      effect: { attr: { int: 1, spr: -1 } },
      result: '新规程贴满墙，防护罩连夜焊上。小六的绷带和规章，都是血的学费。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_funeral_new',
  age: [25, 50],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  kind: 'fate',
  text: '老巡逻队长没了，按他的遗嘱不烧不埋，骨灰拌进城墙根的花泥里。来年开春，那段墙根开满了向日葵，巡逻的人路过都要放慢脚步。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_clean_land',
  age: [28, 50],
  pool: 'novel_moshi',
  weight: 5,
  once: true,
  big: true,
  kind: 'good',
  text: '农艺组试了三年，用菌肥和深翻轮作，基地东南角那片泛白的污染地终于测出了活土。第一茬萝卜出土那天，老农把萝卜供在场院中央，像供着一块玉。',
  choices: [
    { text: '把净化法誊抄送往各基地',
      effect: { attr: { chr: 2, spr: 1 } },
      result: '三个月后，邻基地捎来回信：他们的地也活了一角。信的末尾画了一棵笨拙的萝卜。', kind: 'good', big: true },
    { text: '列为机密，闷声扩耕',
      effect: { attr: { mny: 2, chr: -1 } },
      result: '粮仓眼见着鼓起来，可有人问起那片地的门道，你只能含糊带过。富足里掺了点不安。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_air_route',
  age: [30, 50],
  pool: 'novel_moshi',
  weight: 5,
  once: true,
  big: true,
  kind: 'fate',
  text: '北方军垦基地放出风声：他们修复了一架轻型运输机，愿开辟空中商线，运费用晶核结算。第一次试航，他们问曙光基地要不要搭一股。',
  choices: [
    { text: '入股试航，搭上头班货',
      effect: { attr: { mny: -2, chr: 1 }, setFlags: ['n4_ms_airline'] },
      result: '飞机掠过基地上空那天，全基地的人都仰着头。三天后，第一批北货落地：盐、药、一卷崭新的帆布。', kind: 'good' },
    { text: '观望，天上飞的不踏实',
      effect: { attr: { spr: -1 } },
      result: '你站在人群里看那个黑点飞过云层。心里一半是怕，一半是藏不住的痒。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_lore_rain_clear',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 10,
  text: '连下半月的酸雨终于停了。云缝漏下一道斜阳，正落在围墙的了望旗上。没人说话，岗哨上的人站得笔直，像在接受检阅。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_hopscotch',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 10,
  text: '场院的水泥地上，孩子们用粉笔画了跳房子的格子，最末一格写着天堂。一只变异鼠窜过，孩子们哄笑着追打，格子被踩花了，明天再画。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_beehive',
  age: [22, 48],
  pool: 'novel_moshi',
  weight: 9,
  text: '农艺组在废楼阳台上养起三箱蜜蜂。取蜜那天，养蜂人掀起面纱，笑得满脸褶子：甜的。真是甜的。末世七年，基地第一次有了蜜。',
  effect: { attr: { spr: 1, mny: 1 } }
},

{
  id: 'ev_n4_ms_lore_old_clock',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '老烟鬼修好了一口旧世界的座钟，挂在食堂梁上。整点钟声一响，满食堂的人齐齐抬头。有人轻声说：听听，日子还在走呢。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_balcony_scallion',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 10,
  text: '家家户户的窗台摆上了盆盆罐罐，小葱、蒜苗、辣椒秧，绿得参差不齐。评比最美窗台成了基地最新的风尚，奖品是半斤猪油。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_book_corner',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '拾荒队背回一麻袋泡过水的旧书，晒干后在食堂角落搭了个图书角。最抢手的是一本卷边的菜谱，扉页有前人留的字：好好吃饭。',
  effect: { attr: { int: 1, spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_crow',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'bad',
  text: '哨兵发现规律：变异乌鸦群起之日，十里内必有尸群移动。从此瞭望塔多了一项差事——数乌鸦。人们管那群黑压压的家伙叫丧信使，又恨又离不开。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_ms_lore_glow_fish',
  age: [22, 48],
  pool: 'novel_moshi',
  weight: 8,
  text: '护城河入夜泛起幽幽蓝光，是变异的鱼群在游。孩子们趴在护栏上看，说像把银河倒进了水里。没人敢吃，看看也好。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_photo_studio',
  age: [24, 50],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'good',
  text: '有人盘下废街一间照相馆，修好了老式相机，开张给幸存者拍全家福。第一张相纸显影时，一家三代挤在镜头前，背后墙上弹孔都没来得及遮。',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_ms_lore_windmill',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '铁匠铺屋顶架起一架木板风车，吱呀吱呀地转，带动一台小砂轮。风大时全基地都听得见那声响，像一头温顺的老牲口在嚼夜。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_mid_autumn',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  text: '中秋夜，伙房用土豆粉压了一簸箕月饼，馅是野枣泥。全基地分食，每人一小角。月亮悬在断楼上方，圆得不像话，像旧世界忘了收回去的一盏灯。',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_ms_lore_letterbox',
  age: [22, 50],
  pool: 'novel_moshi',
  weight: 8,
  text: '基地大门内挂了一只绿漆邮筒，各哨点、各棚区的人都能往里投信，每日有人取送。信里多是琐事：腌菜成了，娃会走了，勿念。勿念二字出现得最多。',
  effect: { attr: { spr: 1, chr: 1 } }
},

{
  id: 'ev_n4_ms_lore_spore_night',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'bad',
  text: '入夜起了白雾，是变异孢子。全基地闭门封窗，口罩勒出深痕。雾里隐约有影子游走，孩子的哭声被大人捂在掌心。熬到天亮，雾散，人人如退潮后的礁石。',
  effect: { attr: { spr: -1, str: 1 } }
},

{
  id: 'ev_n4_ms_lore_antenna_forest',
  age: [24, 50],
  pool: 'novel_moshi',
  weight: 8,
  text: '最高的水塔顶上，天线一年年多起来，像一片铁的长草。守电台的小子说，每根天线都对着一个方向，对着一个可能有人应答的远方。',
  effect: { attr: { int: 1, spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_chess_stall',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '仓库墙根下，老王摆开一副缺子的象棋，用螺帽充卒，纽扣当炮。杀到兴起，围观者里三层外三层。输家罚唱一支旧世老歌，跑调也算数。',
  effect: { attr: { int: 1, spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_dogtag',
  age: [22, 48],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'fate',
  text: '翻修菜窖时挖出一枚旧士兵的身份牌，锈得只剩半串编号。没人知道他是谁。基地把它挂上英烈墙最边上的钉子，牌子无字，香火不断。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_rain_catch',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '家家户户屋檐下架起铁皮槽接雨水，沉淀三日才可浣洗。下雨天满基地都是叮咚声，老人们在门廊下闭目听，说这动静像旧世界的檐溜。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_lore_quilt',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'good',
  text: '妇女们把各家捐的旧衣碎布拼成一床百衲被，送给基地里最年长的阿婆。被面上百块布，百种花色。阿婆摩挲着说：这一块，像我家囡囡小时候的罩衫。',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_ms_lore_dry_riverbed',
  age: [22, 50],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'bad',
  text: '枯水期的河床露出大片淤泥，里面嵌着末世第一年逃难者的遗骸，手还挽着手。拾荒队默默绕行。回基地后，没人提这事，饭桌上却都多添了一碗饭。',
  effect: { attr: { spr: -1 } }
},

{
  id: 'ev_n4_ms_lore_cricket',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '夏夜，围墙内的草丛里竟有了蟋蟀叫。老烟鬼用竹篾编了只小笼，捉一只养在窗台。他说这声儿一响，枪声就显得远了。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_apprentice',
  age: [20, 45],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'fate',
  text: '老烟鬼放出话要收个关门徒弟，条件是徒手拆装老式步枪快过他。应者云集，全被刷下。他吧嗒着烟袋问你：要不，你试试？',
  choices: [
    { text: '蒙眼拆装，放手一搏', cond: { attr: { int: { gte: 6 } } },
      effect: { attr: { int: 1, str: 1 }, setFlags: ['n4_ms_apprentice'] },
      result: '咔哒一声，复进簧归位，比老烟鬼的纪录快了两秒。老头别过脸去，烟锅子磕得梆梆响：明儿起早来上工。', kind: 'good' },
    { text: '婉拒，举荐旁人',
      effect: { attr: { chr: 1 } },
      result: '老烟鬼瞪你一眼，终究还是收了那个手最稳的少年。军械铺的灯，往后夜夜亮到三更。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_warehouse_mouse',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '老王揪着你在粮仓角落蹲了半宿，就为指给你看他布的连环捕鼠阵：变异耗子个头赛猫，可到底斗不过人的耐心。凌晨收阵，七只，老王得意得像打了胜仗。',
  effect: { attr: { int: 1 } }
},

{
  id: 'ev_n4_ms_ration_card',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'bad',
  text: '配给卡丢了。补卡要扣三天口粮作工本。你翻遍了所有口袋，最后在晾衣绳的裤脚里摸到了它——虚惊一场，可那几分钟的冷汗是真的。',
  effect: { attr: { spr: -1, luk: 1 } }
},

{
  id: 'ev_n4_ms_mosquito',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'bad',
  text: '入夏，变异蚊虫成群，叮一口肿起拳头大的包，还低烧。医疗组熬了大锅艾草水，全基地烟熏火燎三天，人熏得流眼泪，蚊子熏得翻了肚皮。',
  effect: { attr: { str: -1, int: 1 } }
},

{
  id: 'ev_n4_ms_bridge_joint',
  age: [26, 48],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  kind: 'good',
  text: '与黑岩堡合修的跨河木桥合龙，两岸各出一半木料、一半人工。桥成那日，两边工匠在桥心碰了碰拳头，谁也没提从前互指过的枪口。',
  effect: { attr: { chr: 1, spr: 1 } }
},

{
  id: 'ev_n4_ms_crystal_fever',
  age: [22, 46],
  pool: 'novel_moshi',
  weight: 7,
  kind: 'bad',
  text: '晶核打磨作坊接连三人咳血倒下，医生说是晶核粉尘入了肺。老烟鬼连夜给作坊加装水磨防尘罩，嘴里骂骂咧咧：钱是好东西，命更是。',
  choices: [
    { text: '出钱给工匠配发滤尘面罩',
      effect: { attr: { mny: -1, chr: 1 } },
      result: '面罩发下去那天，老工匠摩挲着橡胶带子，说头一回觉得自己这条命有人当回事。', kind: 'good' },
    { text: '压缩打磨工序，减产保人',
      effect: { attr: { mny: -1, spr: 1 } },
      result: '晶核进项少了一截，作坊里的咳嗽声渐渐稀了。账面上的亏，良心上的赚。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_birthday_noodle',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  kind: 'good',
  text: '今天是你生日，没人声张。夜里回屋，门把手上挂着一只粗布兜，里面一碗还温着的手擀面，卧着个荷包蛋。不知道是谁放的，全基地都有嫌疑。',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_ms_guard_dream',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'fate',
  text: '轮你守夜，下半夜困极打了个盹，梦见旧世界的清晨：豆浆铺子冒白汽，公交报站声，没有人绷着神经。惊醒时东方既白，你摸了摸怀里的枪，笑了笑，起身查哨。',
  effect: { attr: { spr: 1 } }
},

{
  id: 'ev_n4_ms_tiechi_parley',
  age: [25, 46],
  pool: 'novel_moshi',
  weight: 6,
  once: true,
  kind: 'bad',
  text: '一小队铁齿人马举着白布条来到墙下，说他们裂了伙，想拿两车抢来的物资换庇护。为首那人的刀鞘上，挂着曙光基地巡逻队的旧号牌。',
  choices: [
    { text: '缴械收编，分开看押',
      effect: { attr: { mny: 1, spr: -1 } },
      result: '物资入了库，人编进苦役队。夜里你总想起那块旧号牌——它原来的主人，尸骨无存。', kind: 'bad' },
    { text: '驱离，永不准近墙',
      effect: { attr: { str: 1 } },
      result: '他们在墙外咒骂着远去。有人松了口气，有人望着那两车物资咽了咽唾沫。', kind: 'fate' }
  ]
},

{
  id: 'ev_n4_ms_beast_migration',
  age: [22, 48],
  pool: 'novel_moshi',
  weight: 8,
  kind: 'fate',
  cond: { flags: ['moshi_power'] },
  text: '变异兽群开始季节性迁徙，黑压压掠过荒原，绕开一切有火光的地方。瞭望塔上的人看了整整一个时辰——原来它们也在逃，在逃一种连兽都怕的东西。',
  effect: { attr: { spr: 1, int: 1 } }
},

{
  id: 'ev_n4_ms_tannery',
  age: [24, 50],
  pool: 'novel_moshi',
  weight: 8,
  text: '皮革坊开张，变异兽皮硝制后坚韧胜铁。第一件成品是给哨兵做的护臂。老师傅捧着皮子念叨：畜生害人，畜生的皮护人，这账怎么算。',
  effect: { attr: { str: 1, mny: 1 } }
},

{
  id: 'ev_n4_ms_public_bath',
  age: [22, 50],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'good',
  text: '锅炉房扩建出一间公共澡堂，每周开放两日，凭票供应热水。第一天，雾气缭绕里全是舒坦的叹气声。有人搓着搓着，忽然说：这才像个人过的日子。',
  effect: { attr: { spr: 2 } }
},

{
  id: 'ev_n4_ms_storyteller',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '场院的老槐树下来了个说书的瞎子，惊堂木是半块炮弹皮。他讲旧世界的演义，也讲基地自己的仗。讲到斩丧尸王那段，满场喝彩，你坐在人后，没敢认那是自己。',
  effect: { attr: { spr: 1, chr: 1 } }
},

{
  id: 'ev_n4_ms_fire_drill',
  age: [20, 50],
  pool: 'novel_moshi',
  weight: 9,
  text: '基地组织火警演习：粮囤旁草垛一点，钟声大作，各棚区按路线传桶运水。头一回乱了套，第三回七分半钟扑灭火头。老王掐着表，难得咧嘴笑了。',
  effect: { attr: { int: 1, str: 1 } }
},

{
  id: 'ev_n4_ms_star_watch',
  age: [22, 50],
  pool: 'novel_moshi',
  weight: 8,
  once: true,
  kind: 'fate',
  cond: { attr: { int: { gte: 6 } } },
  text: '你用废望远镜架了座土观星台，比对旧历，核出了偏了三天的历法。从此基地的农时、节气重新校准。孩子们管你叫看星星的人。',
  effect: { attr: { int: 2, spr: 1 } }
},

{
  id: 'ev_n4_ms_pigeon_post',
  age: [26, 50],
  pool: 'novel_moshi',
  weight: 7,
  once: true,
  kind: 'good',
  text: '驯鸽人放飞的第一批信鸽，有三只从黑岩堡飞了回来，脚环上系着回信。字条展开只有八个字：鸽已收悉，水边无恙。两个基地之间，从此有了一条会飞的路。',
  effect: { attr: { chr: 1, spr: 1 } }
},
];
