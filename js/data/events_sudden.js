/* 突发事件：天降横祸 / 横财 / 奇遇。sudden:true 的事件不走常规抽取，
   由突发事件系统按年掷骰触发（默认约 13%/年，轮回殿可翻倍）。 */
var EVENTS_SUDDEN = [
  /* ========== 凡尘 pool（默认 life） ========== */
  { id: 'ev_s_rain_gold', sudden: true, once: true, kind: 'good', weight: 5,
    text: '天上掉馅饼这种事真的发生了——你在路边捡到一个鼓鼓的钱包，交到派出所后失主执意塞给你一笔感谢费。',
    effect: { attr: { mny: 2, spr: 1 } } },

  { id: 'ev_s_lottery', sudden: true, once: true, kind: 'good', weight: 3, age: [18, 70],
    text: '便利店找零时你随手拿了张刮刮乐。刮开涂层的瞬间，柜员和你的呼吸同时停了——头奖，一百万。泼天的富贵，就这么毫无预兆地砸在了你头上。',
    effect: { attr: { mny: 6, spr: 3 } } },

  { id: 'ev_s_cat', sudden: true, once: true, weight: 6, age: [6, 80],
    text: '下班路上，一只橘猫从绿化带里窜出来，精准地瘫在你脚背上，翻出肚皮。它看你的眼神，像在看一个迟到了很多年的仆人。',
    choices: [
      { text: '抱回家，从今天起你就是有猫的人了', effect: { attr: { spr: 3, str: 1 }, setFlags: ['has_cat'] },
        result: '当晚它就睡在了你枕头正中间。你缩在床角，觉得自己被正式收编了。', kind: 'good' },
      { text: '拍照发帖找领养', effect: { attr: { spr: 1 } },
        result: '帖子火了，猫被一户好人家领走。它上别人家的车前回头看了你一眼，你心里空了一块。' },
      { text: '狠心绕开', effect: { attr: { spr: -2, luk: -1 } },
        result: '走出五十米你回了七次头。那晚你梦见一双谴责的猫眼。', kind: 'bad' }
    ] },

  { id: 'ev_s_scout', sudden: true, once: true, weight: 4, age: [14, 35],
    cond: { attr: { chr: { gte: 6 } } },
    text: '逛街时一个戴鸭舌帽的男人拦住你，递上名片："我是星探，你这条件，不进圈可惜了。"路人纷纷侧目，你一时分不清是机遇还是剧本。',
    choices: [
      { text: '去公司看看，万一是真的呢', cond: { attr: { chr: { gte: 8 } } },
        effect: { attr: { chr: 2, spr: 2, mny: 2 } },
        result: '是真的。你拍的第一条广告上线那天，你妈把电视音量开到了整栋楼都听得见。', kind: 'good' },
      { text: '先查查这家公司底细', cond: { attr: { int: { gte: 7 } } },
        effect: { attr: { int: 1, spr: 1 } },
        result: '你三句话问出对方合同里的坑，星探反而更兴奋了："脑子也这么好使？更得签了！"你婉拒，但心情很好。' },
      { text: '礼貌拒绝，转身走进人海', effect: { attr: { spr: 1 } },
        result: '你继续过你的日子。偶尔照镜子会想：另一个平行宇宙的你，此刻是不是正在走红毯。' }
    ] },

  { id: 'ev_s_waimai_note', sudden: true, once: true, weight: 6, age: [16, 60],
    text: '外卖吃到一半，你在餐盒夹层里发现一张对折的纸条，字迹工整："如果你看到这张纸条，说明我们挺有缘。今天也要好好吃饭。——一个匿名的打包员"',
    choices: [
      { text: '在外卖平台给店家写三百字好评', effect: { attr: { spr: 2, luk: 1 } },
        result: '第二天你的外卖袋里多了一颗卤蛋和一张新纸条："谢谢你的好评，老板给我加了鸡腿。"你俩用纸条聊了起来。', kind: 'good' },
      { text: '发到网上分享这份温柔', effect: { attr: { spr: 1, chr: 1 } },
        result: '帖子获赞十万，那家小店排起了长队。店主接受采访时说：我们店没有打包员。你盯着纸条，后背一暖又一凉。' },
      { text: '夹进书里收好', effect: { attr: { spr: 2 } },
        result: '很多年后你翻书时它掉出来，那天的饭菜香仿佛又回来了。' }
    ] },

  { id: 'ev_s_kuaidi_wrong', sudden: true, once: true, weight: 5, age: [16, 70],
    text: '快递柜里躺着一件不属于你的包裹，面单地址被雨打花，只看得清你的取件码。箱子不重，晃一晃，里面传来清脆的碰撞声。',
    choices: [
      { text: '拆开看看', effect: { attr: { mny: 2, spr: -1, luk: -1 } },
        result: '是一套精美的绝版茶具。你昧下了它，但每次喝茶都觉得茶是苦的。', kind: 'bad' },
      { text: '联系快递员原路退回', effect: { attr: { spr: 2, luk: 2 } },
        result: '三天后失主登门道谢——那是一位茶商，硬塞给你两罐明前茶。你忽然明白，好人有好报是种复利。', kind: 'good' },
      { text: '放回原柜，当没看见', effect: { attr: { spr: 0 } },
        result: '你转身走了。好奇心在接下来一周挠得你睡不着。' }
    ] },

  { id: 'ev_s_emo_night', sudden: true, once: true, kind: 'good', weight: 6, age: [16, 60],
    text: '凌晨一点，你在天台吹风，emo 得恰到好处。楼下便利店的大爷冲你喊："小伙子/姑娘，下来！请你吃根烤肠，凉了就不好吃了。"你鬼使神差地下了楼。烤肠滋滋冒油，大爷说："没啥过不去的，我六十年都这么过来的。"',
    effect: { attr: { spr: 3, str: 1, luk: 1 } } },

  { id: 'ev_s_hot_search', sudden: true, once: true, weight: 4, age: [16, 60],
    text: '一觉醒来，你的手机炸了——你昨天随手发的一段视频被顶上了热搜第三，评论区清一色"哈哈哈哈哈哈"。你成了本周的显眼包，全公司都在憋笑看你。',
    choices: [
      { text: '接住流量，趁热开播', effect: { attr: { mny: 3, chr: 1, spr: 1 }, setFlags: ['hot_search'] },
        result: '首场直播十万人在线。你紧张得口误频出，弹幕却刷"这松弛感，爱了爱了"。', kind: 'good' },
      { text: '删视频，装死，等风头过去', effect: { attr: { spr: -1 } },
        result: '三天后热度散了。你松了口气，又有点说不清的失落。' },
      { text: '发一条体面回应', cond: { attr: { int: { gte: 6 } } },
        effect: { attr: { chr: 2, spr: 2 } },
        result: '你的回应被网友称为"教科书级公关"，热搜又挂了一天——这次是夸你的。', kind: 'good' }
    ] },

  { id: 'ev_s_elevator', sudden: true, once: true, weight: 5, age: [10, 80],
    text: '电梯走到一半猛地一沉，灯灭了，轿厢卡在两层之间。应急灯亮起的红光里，你听见自己的心跳声大得像鼓。',
    choices: [
      { text: '按下警铃，贴墙半蹲，冷静等待', cond: { attr: { int: { gte: 5 } } },
        effect: { attr: { spr: 1, int: 1 } },
        result: '二十分钟后维修工撬开门，你完好无损。同梯的小孩全程把你当主心骨，你忽然觉得自己挺可靠。', kind: 'good' },
      { text: '疯狂拍门呼救', effect: { attr: { spr: -2, str: -1 } },
        result: '门开了，你喊劈了嗓子。维修工说电梯只是触发了保护机制，从来没危险过。虚惊一场，腿软三天。', kind: 'bad' }
    ] },

  { id: 'ev_s_quake', sudden: true, once: true, kind: 'fate', weight: 4, age: [4, 90],
    text: '深夜，床突然晃了起来，吊灯摇摆，整栋楼都在呻吟。你抱着枕头冲到楼下广场，和一群穿睡衣的邻居面面相觑。几分钟后一切归于平静——震中在远方，你这里只有惊，没有险。',
    effect: { attr: { spr: 1, luk: 2, str: -1 } } },

  { id: 'ev_s_classmate', sudden: true, once: true, weight: 5, age: [25, 60],
    text: '高铁上，邻座的人盯着你看半天，突然一拍大腿："你是不是二小三年级三班的？我坐你后桌，借过你半块橡皮！"——眼前这位，是财经新闻里经常出现的大人物。',
    choices: [
      { text: '叙旧！半块橡皮的交情必须续上', effect: { attr: { mny: 2, spr: 2 } },
        result: '你们聊了一路。下车前他留了你的联系方式："下次同学聚会，你必须到。"人脉这棵树，二十年前就种下了。', kind: 'good' },
      { text: '谦虚寒暄，不多打扰', effect: { attr: { spr: 1 } },
        result: '他笑着说你还和小时候一样稳。你回家后把"我后桌是上市公司董事长"这句话在心里过了一百遍。' },
      { text: '装不认识', effect: { attr: { spr: -1 } },
        result: '对方愣了一下，笑着没再说话。你望着窗外，把一段奇遇亲手关在了门外。', kind: 'bad' }
    ] },

  { id: 'ev_s_inherit', sudden: true, once: true, kind: 'good', weight: 3, age: [20, 75],
    text: '一位律师找上门：你从未谋面的远房七舅姥爷在海外去世，遗嘱里指名把遗产留给你——理由是族谱上只有你名字里带个"信"字，他觉得踏实。',
    choices: [
      { text: '办手续，接受这份天降之礼', effect: { attr: { mny: 5, spr: 2 }, setFlags: ['sudden_inherit'] },
        result: '遗产到账那天，你给七舅姥爷的黑白照片上了三炷香。素未谋面，感谢您的信任。' },
      { text: '怕是骗局，先请律师验明正身', cond: { attr: { int: { gte: 6 } } },
        effect: { attr: { mny: 4, int: 1 }, setFlags: ['sudden_inherit'] },
        result: '核实无误，是真的。谨慎让你少交了各种"手续费"，全额落袋。' }
    ] },

  { id: 'ev_s_bird_poop', sudden: true, once: true, kind: 'bad', weight: 7, age: [4, 90],
    text: '晴空万里，一坨鸟屎以精确制导的姿态命中你的头顶。你僵在原地三秒，旁边下棋的大爷头也不抬："鸟屎运，要转运喽，回去买张彩票。"',
    effect: { attr: { spr: -1, luk: 2 } } },

  { id: 'ev_s_phone_crack', sudden: true, once: true, weight: 6, age: [14, 80],
    text: '手机从口袋滑出，在水泥地上弹跳三下，屏幕碎成一朵绚烂的烟花。你捡起来，它倔强地亮着，裂纹正好从壁纸上你的脸中间穿过。',
    choices: [
      { text: '换原装屏，强迫症不能忍', effect: { attr: { mny: -1, spr: 1 } },
        result: '屏幕焕然一新，钱包薄了一圈。你发誓要买防摔壳，就像上一次发誓时一样。' },
      { text: '贴个膜盖住裂纹，再战三年', effect: { attr: { spr: -1, mny: 1 } },
        result: '膜一贴，裂纹反而更有艺术感了。同事问你是不是定制款，你说是，限定"心碎款"。' },
      { text: '顺势换新机', effect: { attr: { mny: -2, spr: 2 } },
        result: '新手机流畅得不像话。旧手机你擦干净收进抽屉，像给一位老战友办了场体面的退役仪式。' }
    ] },

  { id: 'ev_s_enlighten', sudden: true, once: true, kind: 'good', weight: 5, age: [18, 90],
    text: '某个再普通不过的傍晚，你看着窗外发呆，脑子里忽然"叮"的一声——纠结多年的事，那一刻全想通了。没有雷声，没有金光，只是天突然就亮了。',
    effect: { attr: { int: 2, spr: 3 } } },

  { id: 'ev_s_taxi_master', sudden: true, once: true, kind: 'good', weight: 5, age: [18, 70],
    text: '深夜打车，司机师傅听你在电话里跟客户道歉，挂掉后淡淡说了三句话。句句切中要害，比你开了三周的复盘会都有用。下车时你忍不住问，他摆摆手："以前做过点生意，赔光了，开车清净。"',
    effect: { attr: { int: 1, spr: 2, luk: 1 } } },

  { id: 'ev_s_red_packet', sudden: true, once: false, weight: 8, age: [10, 90],
    text: '两百人的大群发红包，你随手一点——手气最佳。金额不大，但那份"两百个人里偏偏是我"的感觉，让你美滋滋了一整天。',
    effect: { attr: { mny: 1, spr: 2 } } },

  { id: 'ev_s_upgrade', sudden: true, once: true, kind: 'good', weight: 5, age: [18, 80],
    text: '值机时地勤微笑着告诉你：经济舱超售，给您免费升到商务舱。你端着香槟坐在能平躺的座位上，全程没睡着——不是不舒服，是舍不得。',
    effect: { attr: { spr: 2, chr: 1 } } },

  { id: 'ev_s_queue', sudden: true, once: true, kind: 'good', weight: 7, age: [10, 80],
    text: '网红店前排了四十分钟，前面的人突然集体收到消息：排错了，招牌在隔壁街。人群作鸟兽散，你一步没挪，直接成了第一名。',
    effect: { attr: { spr: 2, luk: 1 } } },

  { id: 'ev_s_old_money', sudden: true, once: true, kind: 'good', weight: 6, age: [10, 90],
    text: '换季整理旧物，一本中学课本里滑出五张百元钞——是你当年藏的私房钱，藏得太好，连自己都忘了。跨越时空的投喂，来自过去的你。',
    effect: { attr: { mny: 1, spr: 2 } } },

  { id: 'ev_s_boss_beg', sudden: true, once: true, kind: 'good', weight: 4, age: [28, 55],
    text: '前老板突然来电，寒暄三分钟后进入正题：公司离了你果然不行，回来吧，条件你开。你望着窗外，想起当年工位上那盆没人浇水的绿萝。',
    effect: { attr: { spr: 3, mny: 1 } } },

  { id: 'ev_s_scam_call', sudden: true, once: true, weight: 6, age: [18, 80],
    text: '"您好，这里是某某平台客服，您的账户存在异常……"诈骗电话打来的时间巧得很，你正好闲得发慌。',
    choices: [
      { text: '陪聊，看他能编到第几层', cond: { attr: { int: { gte: 6 } } },
        effect: { attr: { int: 1, spr: 2 } },
        result: '四十分钟后对方主动挂电话前说了句"哥，你是真闲"。你把录音交给了反诈中心，功德圆满。', kind: 'good' },
      { text: '回一句"包的"，挂断拉黑', effect: { attr: { spr: 1 } },
        result: '对面沉默了两秒，似乎没料到剧本还能这么接。你哼着歌把手机扔回沙发。' },
      { text: '直接挂断', effect: { attr: { spr: 0 } },
        result: '世界清净了。你给爸妈也设了防骚扰拦截。' }
    ] },

  { id: 'ev_s_free_meal', sudden: true, once: true, kind: 'good', weight: 6, age: [10, 80],
    text: '餐厅店庆摇奖，轮到你时滚筒转了三圈，停在了唯一一个"免单"格上。全店鼓掌，你举着账单的手微微颤抖——这顿饭，吃出了登基的感觉。',
    effect: { attr: { mny: 1, spr: 2 } } },

  { id: 'ev_s_haircut', sudden: true, once: true, kind: 'bad', weight: 6, age: [6, 70],
    text: '理发师信心满满地说"给你设计个今年最火的"，手起剪落。镜子里那个发型前卫得超出了这个时代的审美——接下来两周，你就是全办公室最显眼的显眼包。',
    effect: { attr: { chr: -2, spr: -1 } } },

  { id: 'ev_s_treasure_wall', sudden: true, once: true, kind: 'good', weight: 3, age: [25, 90],
    text: '老屋翻新，工人砸开夹墙，掉出一个油纸包——是太爷爷当年藏的一幅字画。鉴定结果出来那天，专家扶了三次眼镜：真迹，而且是好真迹。',
    effect: { attr: { mny: 4, spr: 2 } } },

  { id: 'ev_s_wrong_report', sudden: true, once: true, kind: 'fate', weight: 4, age: [30, 90],
    text: '体检中心来电，语气沉重地让你尽快复检。你把自己的人生快进回放了三遍，连遗言都打好了腹稿。三天后对方再来电：同名同姓，报告拿错了，您的指标一切正常。',
    effect: { attr: { spr: 2, str: 1, luk: 1 } } },

  { id: 'ev_s_train_hero', sudden: true, once: true, kind: 'good', weight: 4, age: [16, 70],
    text: '高铁广播紧急寻医，一位乘客突然晕倒。医生赶到时发现急救箱在行李架最上层——是你踩着座椅第一个把它递了下去。病人转危为安，医生回头对你说：小伙子/姑娘，递得及时。',
    effect: { attr: { spr: 3, str: 1 } } },

  { id: 'ev_s_free_trip', sudden: true, once: true, weight: 4, age: [18, 70],
    text: '你半年前随手填的问卷中奖了：双人免费海岛游，有效期三个月。旅行社打来电话时，你差点当成诈骗挂掉。',
    choices: [
      { text: '请假！出发！', effect: { attr: { spr: 3, str: 1, chr: 1 } },
        result: '海水蓝得像假的一样。你在沙滩上晒成一个快乐的熟人，回来上班时同事以为你跳槽去了度假行业。', kind: 'good' },
      { text: '没假，折现吧', effect: { attr: { mny: 2 } },
        result: '钱到账了。你在工位上看着别人的海岛朋友圈，喝了一口速溶咖啡，觉得也挺好。' }
    ] },

  { id: 'ev_s_blackout_galaxy', sudden: true, once: true, kind: 'good', weight: 4, age: [6, 90],
    text: '全城大停电的那个夏夜，霓虹熄灭，光污染清零。你走出楼道抬头——银河就那么横在天上，清清楚楚。整栋楼的人都在天台上，没人说话，只有星星很吵。',
    effect: { attr: { spr: 3, luk: 1 } } },

  { id: 'ev_s_locked_out', sudden: true, once: true, weight: 6, age: [10, 70],
    text: '忘带钥匙，你决定翻自家阳台。翻到一半，楼下传来邻居中气十足的大喊："抓贼啊！"你骑在自家栏杆上，进退两难，成为全小区今晚最靓的仔。',
    effect: { attr: { spr: -1, str: -1, chr: -1 } } },

  { id: 'ev_s_rain_milktea', sudden: true, once: true, kind: 'good', weight: 6, age: [14, 70],
    text: '暴雨天，浑身湿透的你收到外卖，袋子里多了一杯没点过的热奶茶，小票上手写着一行字："雨天也要开心呀。——店员请的"。你捧着它站在窗前，觉得这场雨下得很值。',
    effect: { attr: { spr: 3 } } },

  { id: 'ev_s_photobomb', sudden: true, once: true, kind: 'good', weight: 5, age: [10, 80],
    text: '去年你在街角吃烤红薯时，无意中闯进了一位摄影师的镜头。今天朋友甩来一条链接：那张《冬日街头》拿了国际摄影奖，画面上那个埋头啃红薯的路人，是你。',
    effect: { attr: { chr: 1, spr: 2 } } },

  { id: 'ev_s_missed_interview', sudden: true, once: true, kind: 'fate', weight: 5, age: [20, 50],
    text: '手机静音，你错过了那家"梦中情司"的面试回电，懊恼了整整一个月。三个月后，那家公司暴雷上了新闻，员工排队讨薪。你盯着新闻看了很久，给静音键磕了一个。',
    effect: { attr: { spr: 2, luk: 2 } } },

  { id: 'ev_s_seven_bottles', sudden: true, once: true, weight: 6, age: [6, 80],
    text: '你买了瓶汽水，"再来一瓶"；又开，"再来一瓶"。连中七瓶之后，小店老板看瓶盖的眼神像在看赌神。你抱着一怀汽水走出店门，感觉中了人生的大满贯。',
    effect: { attr: { spr: 2, luk: 2 } } },

  { id: 'ev_s_fortune_teller', sudden: true, once: true, weight: 5, age: [16, 80],
    text: '天桥下的算命先生突然叫住你，说今日有缘，分文不取只送你一句："三十天内，心宽一寸，路宽一丈。"你似懂非懂地道了谢，回头他已收摊走人。',
    effect: { attr: { luk: 2, spr: 1 } } },

  { id: 'ev_s_letter_past', sudden: true, once: true, kind: 'good', weight: 4, age: [28, 45],
    text: '一封挂号信寄到你手上，信封泛黄——是你十八岁那年参加"写给未来的自己"活动写的。你拆开，当年的字迹张牙舞爪："未来的我，有没有成为很酷的大人？没有钱也没关系，要开心啊。"',
    effect: { attr: { spr: 3, int: 1 } } },

  { id: 'ev_s_square_dance', sudden: true, once: true, weight: 5, age: [30, 80],
    text: '小区广场舞领队大妈急性肠胃炎，音响已开，三十双眼睛齐刷刷看向你这个围观群众："年轻人，顶替一曲！"',
    choices: [
      { text: '上！主打一个松弛感', cond: { attr: { str: { gte: 4 } } },
        effect: { attr: { spr: 3, chr: 1, str: 1 } },
        result: '你全程瞎跳但气势如虹，大妈们掌声雷动，当场聘你为荣誉领舞。你收获了三十位情报网覆盖全小区的干妈。', kind: 'good' },
      { text: '连连摆手，落荒而逃', effect: { attr: { spr: -1 } },
        result: '你逃了。身后传来大妈们善意的哄笑，你的背影有点狼狈，也有点可爱。' }
    ] },

  { id: 'ev_s_bus_recipe', sudden: true, once: true, kind: 'good', weight: 5, age: [16, 80],
    text: '公交上你给一位拎菜的老奶奶让座。到站前，她从布袋里掏出一张叠得方方正正的纸塞给你："祖传酱牛肉方子，我看你面善。"纸上字迹工整，落款日期是一九七四年。',
    effect: { attr: { spr: 2, str: 1 } } },

  { id: 'ev_s_rain_singer', sudden: true, once: true, kind: 'good', weight: 5, age: [14, 80],
    text: '暴雨突至，你和七八个陌生人挤在同一个屋檐下。人群里有个背吉他的流浪歌手，笑着说："反正都走不了，我唱一首吧。"雨声当伴奏，一首歌的时间，屋檐下的所有人都不着急了。这大概就是松弛感。',
    effect: { attr: { spr: 3, luk: 1 } } },

  { id: 'ev_s_car_draw', sudden: true, once: true, kind: 'good', weight: 3, age: [20, 70],
    text: '商场周年庆，消费满额抽大奖。你本想把抽奖券送人，鬼使神差自己刮了——特等奖，轿车一辆。主持人握着话筒的手都在抖，说这是开业以来第一个被刮走的。',
    choices: [
      { text: '办手续，开走！', effect: { attr: { mny: 4, spr: 3, chr: 1 } },
        result: '你把车开出地库时绕了三圈找出口，保安都替你高兴。泼天的富贵，这回是真轮到你家了。' },
      { text: '折价转卖给经销商', effect: { attr: { mny: 5, spr: 1 } },
        result: '钱货两讫，落袋为安。你打车回家，心情比坐车还稳。' }
    ] },

  { id: 'ev_s_fall_ring', sudden: true, once: true, kind: 'fate', weight: 5, age: [6, 80],
    text: '你在人行道上结结实实摔了个平地摔，狼狈趴地的瞬间，脸颊旁静静躺着一枚金戒指。路过的大爷啧啧称奇："别人摔跤捡钱，你摔跤捡金。"',
    effect: { attr: { mny: 2, str: -1, spr: 1 } } },

  { id: 'ev_s_teacher_group', sudden: true, once: true, weight: 5, age: [20, 50],
    text: '你被拉进一个叫"相亲相爱一家人"的群，正想退，定睛一看群主——是你小学班主任。群里正在接龙晒孙子和晒工资，你默默把自己的群昵称改成了真名。',
    effect: { attr: { spr: 2 } } },

  { id: 'ev_s_ring_toss', sudden: true, once: true, kind: 'good', weight: 6, age: [6, 80],
    text: '夜市套圈，十块钱五个圈。你随手一抛，竹圈在空中划出一道离谱的弧线，稳稳套中了老板摆在最后排、据说从不打算让人套走的半人高大玩偶。老板鼓掌鼓得比谁都真诚："三年！你是头一个！"',
    effect: { attr: { spr: 3, chr: 1, luk: 1 } } },

  { id: 'ev_s_flat_tire', sudden: true, once: true, kind: 'good', weight: 5, age: [20, 70],
    text: '郊外公路上车胎瘪了，前不着村后不着店。路边修车铺的师傅出来一看车牌，二话不说开工，修完摆手不收钱："您当年捐的那批助学款，我是受助人之一。这胎，我早想给您修了。"',
    effect: { attr: { spr: 3, luk: 1 } } },

  { id: 'ev_s_dream_number', sudden: true, once: true, weight: 5, age: [18, 80],
    text: '你梦到一串格外清晰的数字，醒来还记得，鬼使神差去买了注彩票。开奖当晚你屏息核对——中了，五块。梦里那么隆重，现实如此朴素，你哭笑不得地把五块钱换了根烤肠。',
    effect: { attr: { spr: 1, luk: 1 } } },

  { id: 'ev_s_school_essay', sudden: true, once: true, kind: 'good', weight: 4, age: [30, 60],
    text: '一封没有署名的快递，里面是你小学三年级的作文《我的理想》，纸张脆黄，末尾是老师的红笔批语："这孩子眼里的光，请务必保管好。"你查不到是谁寄的，但那天你把作文裱了起来。',
    effect: { attr: { spr: 3, int: 1 } } },

  { id: 'ev_s_headhunter', sudden: true, once: true, weight: 4, age: [25, 50],
    text: '猎头的电话打进来，开门见山：薪资翻倍，级别跳一级，对方点名要你。你握着手机走到窗边，工位上的绿植还在夕阳里缓慢生长。',
    choices: [
      { text: '谈！人生能有几回搏', effect: { attr: { mny: 3, spr: 1, str: -1 } },
        result: '新 offer 到手，你在离职单上签字的手很稳。旧工牌你留了一张，提醒自己从哪里来。', kind: 'good', big: true },
      { text: '婉拒，现在的地方挺好', effect: { attr: { spr: 2 } },
        result: '猎头说"随时联系"。挂了电话你发现自己的腰杆挺直了不少——被抢着要的感觉，本身就是一种涨薪。' }
    ] },

  { id: 'ev_s_sleep_talk', sudden: true, once: true, weight: 5, age: [14, 40],
    cond: { attr: { int: { gte: 5 } } },
    text: '合租室友神秘兮兮地给你听一段录音：昨晚你说梦话，字正腔圆地背了圆周率小数点后一百位，中间还纠正了自己一次。你本人毫无印象，但深藏功与名。',
    effect: { attr: { int: 1, spr: 2 } } },

  { id: 'ev_s_mall_piano', sudden: true, once: true, kind: 'good', weight: 5, age: [10, 70],
    cond: { attr: { int: { gte: 5 } } },
    text: '商场中庭摆着一架公共钢琴，写着"欢迎弹奏"。你鬼使神差坐下弹了一曲，起身时四周响起掌声，有个小女孩拉着妈妈说长大也要学琴。你鞠躬谢幕，像个真正的艺术家。',
    effect: { attr: { chr: 2, spr: 2 } } },

  { id: 'ev_s_milktea_smile', sudden: true, once: false, weight: 8, age: [12, 80],
    text: '取奶茶时发现杯套上画了个歪歪扭扭的笑脸，旁边写着"今天也要开心呀"。你回头看，店员正冲你比了个大拇指。这杯奶茶的含糖量，超标的不是糖。',
    effect: { attr: { spr: 2 } } },

  { id: 'ev_s_lightning', sudden: true, once: true, kind: 'bad', weight: 3, age: [14, 90],
    cond: { chance: 0.02 },
    text: '暴雨倾盆，你站在空地上对天起誓："我要是撒谎，就天打雷劈——"轰！！！',
    effect: { kill: true, deathText: '死于天打雷劈。这个故事告诉我们：发誓需谨慎，老天爷有时候真听着呢。' } },

  { id: 'ev_s_meteor', sudden: true, once: true, kind: 'bad', weight: 3, age: [0, 100],
    cond: { chance: 0.01 },
    text: '天文台预警今夜有流星雨，你搬了躺椅上天台许愿。流星确实来了，其中一颗偏离了轨道，带着尾焰，直奔你而来。',
    effect: { kill: true, deathText: '被陨石精准命中。七十六亿分之一的概率，你中了这个宇宙级的"头奖"。' } },

  { id: 'ev_s_icicle', sudden: true, once: true, kind: 'bad', weight: 3, age: [4, 90],
    cond: { chance: 0.03 },
    text: '化冻的午后，你贴着楼根走路。头顶传来一声轻响，你抬头——一根磨了一整个冬天的冰锥，正挣脱屋檐，自由落体。',
    effect: { kill: true, deathText: '被坠落的冰锥击中。冬天化冻时节，切记不要贴着楼根走路。' } },

  /* ========== 修仙 pool ========== */
  { id: 'ev_s_xx_vision', sudden: true, once: true, kind: 'fate', weight: 4, age: [100, 500], pool: 'xiuxian',
    text: '你正打坐，天穹毫无征兆地裂开一线——紫气东来三万里，仙鹤衔书绕峰三匝。宗门警钟大作，长老们蜂拥而出：千年未现的天降异象，落点正是你的洞府。',
    choices: [
      { text: '敞开门户，顺势吐纳天地异气', cond: { attr: { str: { gte: 10 } } },
        effect: { attr: { str: 3, int: 2, luk: 2 } },
        result: '异气入体如江河倒灌，你硬生生扛住了。出关之日，修为精进一截，长老们看你的眼神变了。', kind: 'good' },
      { text: '异象来得蹊跷，闭门加固禁制', effect: { attr: { int: 1, spr: 1 } },
        result: '异象在你洞府外盘旋三日后散去。谨慎未必能撞大运，但一定能活得久。' }
    ] },

  { id: 'ev_s_xx_heartdevil', sudden: true, once: true, weight: 5, age: [100, 500], pool: 'xiuxian',
    text: '毫无预兆地，心魔突袭——你识海中浮出此生所有遗憾：没回过的家、没救下的人、没说出口的话。它们化作无数声音齐声问你：修仙修到今天，图什么？',
    choices: [
      { text: '直面本心，一一作答', cond: { attr: { int: { gte: 10 } } },
        effect: { attr: { int: 3, spr: 2 } },
        result: '你与心魔对坐三天三夜，把每个问题都答完了。心魔散去时竟向你作了一揖。道心澄澈，更胜从前。', kind: 'good' },
      { text: '吞服定神丹，强行压下', effect: { attr: { mny: -2, str: -1, spr: -1 } },
        result: '丹药压住了心魔，却压不住那个问题。它沉在识海深处，等着下一次突袭。', kind: 'bad' }
    ] },

  { id: 'ev_s_xx_robber', sudden: true, once: true, weight: 6, age: [100, 500], pool: 'xiuxian',
    text: '荒山野岭，三个蒙面散修从天而降把你围住："此山是我开！交出储物袋！"你看了看他们手中卷刃的法器，又看了看自己袖中温养百年的本命法宝，一时有些同情他们。',
    choices: [
      { text: '让他们见识一下什么叫踢到铁板', effect: { attr: { mny: 3, spr: 2 } },
        result: '三招之后，三个散修跪成一排主动上交了自己的储物袋，哭喊着"前辈饶命"。你掂了掂——比你还穷，只收了个教训费。这波反打劫，泰裤辣。', kind: 'good' },
      { text: '反手再送他们几块灵石', effect: { attr: { mny: -1, spr: 2, luk: 2 } },
        result: '三个散修捧着灵石愣在原地，为首那个当场给你磕了一个，说要去金盆洗手。你挥袖离去，深藏功与名。', kind: 'good' }
    ] },

  { id: 'ev_s_xx_pillrain', sudden: true, once: true, kind: 'good', weight: 4, age: [100, 500], pool: 'xiuxian',
    text: '你洞府上空忽降灵雨，雨中裹着细碎丹华——是某位大能丹成九转，丹香冲天引来了天地庆贺，余泽恰好淋了你满头。你张口接住三滴，周身毛孔一齐张开。',
    effect: { attr: { str: 2, int: 1, luk: 1 } } },

  { id: 'ev_s_xx_dreamgod', sudden: true, once: true, weight: 3, age: [100, 500], pool: 'xiuxian',
    text: '梦中，一缕上古大能的残魂飘到你面前："小友，本座观你骨骼清奇，愿将毕生传承相授，只消你应下一件事——"话没说完，你注意到他的影子在悄悄往你识海里钻。',
    choices: [
      { text: '答应他，搏一场造化', effect: { attr: { int: 3, luk: 2 } },
        result: '传承灌顶如山洪倾泻，你守住灵台最后一寸清明，残魂反而散了——他本就是强弩之末。造化，归你了。', kind: 'good', big: true },
      { text: '察觉不对，斩灭这缕残魂', cond: { attr: { int: { gte: 8 } } },
        effect: { attr: { int: 1, spr: 1 } },
        result: '残魂消散前留下一句"好警觉的小辈"。梦里馈赠十之八九是夺舍陷阱，你躲过一劫。', kind: 'good' }
    ] },

  /* ========== 书中界 pool ========== */
  { id: 'ev_s_wx_sword', sudden: true, once: true, weight: 5, age: [16, 60], pool: 'novel_wuxia',
    text: '你正赶路，一声龙吟自九天坠下——一柄古剑"铛"地插在你脚前三寸，剑身嗡鸣不止，剑柄上缠着褪色的红绸。四下无人，山谷安静得像在等你做决定。',
    choices: [
      { text: '拔剑！天赐不取，反受其咎', cond: { attr: { str: { gte: 7 } } },
        effect: { attr: { str: 2, luk: 2, chr: 1 } },
        result: '剑出，石开，山风大作。古剑认主，剑身上浮现两个小字：问心。从此江湖多了一个背着剑的传说。', kind: 'good', big: true },
      { text: '绕道而行，来路不明的东西别碰', effect: { attr: { spr: 1 } },
        result: '你绕开了。走出半里地回头，剑已不见。江湖从此少了一个传说，多了一个"差点"的故事。' }
    ] },

  { id: 'ev_s_wx_wanted', sudden: true, once: true, kind: 'bad', weight: 6, age: [16, 60], pool: 'novel_wuxia',
    text: '城门口新贴的通缉令上赫然画着你的脸，罪名是"夜闯府衙"。可画匠把你画成了鞋拔子脸配斗鸡眼，围观百姓对着画像指指点点，愣是没人认出站在旁边的你本人。',
    effect: { attr: { chr: -1, spr: -1, luk: 1 } } },

  { id: 'ev_s_wx_hero', sudden: true, once: true, kind: 'good', weight: 4, age: [16, 60], pool: 'novel_wuxia',
    text: '山洪夜发，你路过的村庄转瞬成了泽国。你来不及多想，背着老人抱着孩子往返七趟。天亮时全村人跪在泥水里给你磕头，一位老者颤巍巍捧出本油布包裹的册子：恩公，这是老朽祖上传下的拳谱。',
    effect: { attr: { str: 2, spr: 3, chr: 1 } } },

  { id: 'ev_s_wxn_rift', sudden: true, once: true, weight: 4, age: [100, 500], pool: 'novel_wuxian',
    text: '你脚下一空——大地毫无征兆地裂开一道缝隙，缝隙深处宝光冲天，隐约有仙乐传出。宗门地图上没有这个地方，古籍里没有记载，它就那么突兀地在你脚下开了门。',
    choices: [
      { text: '跳！机缘当前，生死看淡', cond: { attr: { str: { gte: 8 } } },
        effect: { attr: { mny: 3, int: 2, luk: 2 } },
        result: '缝底是一座沉眠万载的上古药园。你出来时衣摆都塞满了灵药，身后缝隙合拢，仿佛从未开过。', kind: 'good', big: true },
      { text: '先探虚实，扔块石头听听响', effect: { attr: { int: 1 } },
        result: '石头落下去，没有回声，只有仙乐停了。片刻后缝隙缓缓合拢，像一张闭上的嘴。你出了一身冷汗。' }
    ] },

  { id: 'ev_s_wxn_beast', sudden: true, once: true, kind: 'good', weight: 4, age: [100, 500], pool: 'novel_wuxian',
    text: '一声奶声奶气的吼叫，一团毛球从林子里滚出来抱住你的腿——是头刚出生不久的白泽幼崽，睁眼第一个看见的是你，从此认定你就是娘。神兽认亲，躲是躲不掉了。',
    effect: { attr: { spr: 3, luk: 2, str: 1 } } },

  { id: 'ev_s_wxn_auction', sudden: true, once: true, kind: 'good', weight: 3, age: [100, 500], pool: 'novel_wuxian',
    text: '万宝阁拍卖会上，压轴的古镜流光百年无人能动其分毫。可当你起身离席路过展台，古镜突然挣脱禁制飞入你怀中，镜面朝内，像怕被抢走。满座哗然，阁主沉默良久："此镜有灵，自择其主。恭喜道友。"',
    effect: { attr: { mny: 2, luk: 3, chr: 1 } } },

  { id: 'ev_s_bz_transfer', sudden: true, once: true, weight: 5, age: [18, 60], pool: 'novel_bazong',
    text: '手机"叮"的一声：到账5,200,000.00元，转账人厉承烨，备注只有两个字："零花。"你数了三遍零，手开始抖。',
    choices: [
      { text: '收下，顺手回了个"谢谢老板"', effect: { attr: { mny: 4, spr: 2 } },
        result: '对方秒回："叫我承烨。"你盯着屏幕，觉得这世界真是魔幻——但银行卡余额是真实的。', kind: 'good' },
      { text: '原路退回，附言"无功不受禄"', effect: { attr: { spr: 1, chr: 1 } },
        result: '十分钟后办公室门被推开，厉承烨站在门口，眼神危险："你是第一个敢退我钱的女人/男人。"完了，剧情开始加速了。', kind: 'good' }
    ] },

  { id: 'ev_s_bz_reporter', sudden: true, once: true, kind: 'good', weight: 5, age: [18, 60], pool: 'novel_bazong',
    text: '财经峰会的走廊上，一名记者把话筒怼到你面前："请问您就是那位连续三年做空从未失手的神秘投资人"X"吗？"你只是想进来蹭茶歇的，但全场镜头已经转了过来。',
    effect: { attr: { chr: 2, spr: 1, luk: 1 } } },

  { id: 'ev_s_bz_heli', sudden: true, once: true, kind: 'good', weight: 3, age: [18, 60], pool: 'novel_bazong',
    text: '暴雨天你站在公司楼下打不到车，正狼狈时，一架直升机轰然降落在天台。舱门打开，管家撑着黑伞走下来，对你躬身："小姐/少爷，老爷说，淋雨这种事，不该发生在您身上。"全写字楼的人都趴在窗上看。',
    effect: { attr: { spr: 3, chr: 2 } } },

  { id: 'ev_s_ms_airdrop', sudden: true, once: true, weight: 5, age: [18, 80], pool: 'novel_moshi',
    text: '警报未响，哨塔先喊：一个空投箱拖着降落伞，晃晃悠悠砸在基地大门口，箱体印着陌生的徽记。末世的空投，可能是补给，也可能是钓饵。',
    choices: [
      { text: '全副武装，开箱', cond: { attr: { str: { gte: 6 } } },
        effect: { attr: { mny: 2, str: 1, spr: 2 } },
        result: '满满一箱药品和罐头，附一张字条："给还在坚持的人。——路过的"末世的善意比罐头更稀缺，你分给全基地一人一口。', kind: 'good' },
      { text: '先排查陷阱，宁可错过', cond: { attr: { int: { gte: 6 } } },
        effect: { attr: { int: 1, mny: 1 } },
        result: '排查三小时，确认安全。箱底果然有个定位器——你拆掉它，物资照收。末世生存法则：白嫖可以，地址不能给。', kind: 'good' }
    ] },

  { id: 'ev_s_ms_cat', sudden: true, once: true, kind: 'good', weight: 6, age: [18, 80], pool: 'novel_moshi',
    text: '巡逻路上，一只三条腿的变异猫从废墟里钻出来，眼睛在黑暗里发着幽绿的光。你没开枪，它也没扑上来，只是远远跟着你回了基地，从此赖在瞭望塔上不走了。末世的动物直觉最准——它觉得你这里安全。',
    effect: { attr: { spr: 3, luk: 1 } } }
];
