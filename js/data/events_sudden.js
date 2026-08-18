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
    effect: { attr: { spr: 3, luk: 1 } } },

  /* ========== v2 · 货币/装备配套突发 ========== */
  { id: 'ev_v2_airdrop_crate', sudden: true, once: true, kind: 'good', weight: 5, age: [10, 70],
    text: '只听"哐当"一声巨响，一个军绿色的大铁箱砸穿了你家楼下违建的阳光棚，箱体上印着"空投补给"四个大字。四下无人，监控恰好坏了。',
    choices: [
      { text: '拖回家，开箱', cond: { attr: { str: { gte: 5 } } },
        effect: { items: ['it_vest', 'it_sword'], attr: { spr: 2 } },
        result: '箱里一件防弹背心一柄短剑，还有张字条："赠有缘人。"你至今不知道这是谁的快递。', kind: 'good' },
      { text: '上交派出所',
        effect: { coin: 50, attr: { spr: 1, chr: 1 } },
        result: '警方查证是影视基地的道具箱，失主送来锦旗和感谢金。你上了本地新闻，标题：拾箱不昧好市民。', kind: 'good' }
    ] },
  { id: 'ev_v2_wallet_back', sudden: true, once: true, kind: 'good', weight: 6, age: [16, 70],
    text: '三年前丢的钱包，被派出所通知去认领。现金分文不少，卡也都在，甚至多了一张字条："当年急用，如今奉还，利息在夹层。"夹层里是几张崭新的钞票。',
    effect: { coin: 80, attr: { spr: 2, luk: 1 } } },
  { id: 'ev_v2_old_man_book', sudden: true, once: true, kind: 'good', weight: 4, age: [10, 40],
    text: '路边一个仙风道骨的老头拦住你："少年，我看你骨骼清奇，是万中无一的练武奇才。这本《基础刀法精要》，原价九十八，收你五块。"',
    choices: [
      { text: '掏钱买下',
        effect: { coin: -5, skills: ['sk_slash'], attr: { spr: 1 } },
        result: '回家翻开一看，字字珠玑，图图带劲。你照着练了一个月，劈柴如切瓜。五块钱，买不了吃亏。', kind: 'good' },
      { text: '婉拒并报警',
        effect: { attr: { int: 1, spr: 1 } },
        result: '警察来了，老头掏出正规出版物经营许可证，反把你教育了一顿"年轻人要有梦想"。' }
    ] },
  { id: 'ev_v2_mistaken_master', sudden: true, once: true, weight: 4, age: [18, 60],
    text: '武术馆门口，一群人冲你抱拳："久仰久仰，您就是「铁掌水上漂」陈师傅吧？"你低头看看自己——和海报上那位高手确实八分像。',
    choices: [
      { text: '将错就错，先撑住场面', cond: { attr: { chr: { gte: 6 } } },
        effect: { coin: 100, attr: { chr: 1, spr: 2 } },
        result: '你背着手点评了三句"尚可""差点火候""还需打磨"，众人叹服。真陈师傅赶到时，你已领了指导费潇洒离场。', kind: 'good' },
      { text: '连连摆手澄清',
        effect: { attr: { spr: 1, luk: 1 } },
        result: '误会解开，真陈师傅反倒觉得你面善，请你吃了顿饭，临走还夸你"有武德"。' }
    ] },
  { id: 'ev_v2_scratch_win', sudden: true, once: true, kind: 'good', weight: 4, age: [18, 80],
    text: '买彩票送的刮刮乐，你随手一刮——头奖。店主比你还激动，拉着你在店门口合影，说要把照片裱起来镇店。',
    effect: { coin: 120, attr: { spr: 2, luk: 2 } } },
  { id: 'ev_v2_wall_sword', sudden: true, once: true, kind: 'good', weight: 3, age: [20, 70],
    text: '老房翻新，工人一锤子砸开夹墙，里面赫然躺着一柄油布包裹的古剑。房东看了直摆手："祖传老宅，我什么都不知道，拿走拿走。"',
    effect: { items: ['it_sword'], attr: { luk: 1, spr: 1 } } },
  { id: 'ev_v2_old_coin', sudden: true, once: true, weight: 3, age: [22, 60],
    text: '整理旧硬盘，你突然想起大学时跟风买过一点数字货币。找回密码的手都在抖——当年一顿火锅钱，如今翻了两百倍。',
    choices: [
      { text: '全部卖出，落袋为安',
        effect: { coin: 300, attr: { mny: 1, spr: 2 } },
        result: '到账提示音响起，你请全家吃了顿真正的火锅。饭桌上你感慨：人生最赚的投资，是忘了自己投资过。', kind: 'good' },
      { text: '继续持有，赌未来',
        effect: { attr: { luk: 1, spr: -1 } },
        result: '你把密码写在纸上锁进抽屉。从此每天睡前看一眼行情，头发以肉眼可见的速度变少。' }
    ] },
  { id: 'ev_v2_wrong_parcel', sudden: true, once: true, kind: 'good', weight: 5, age: [16, 60],
    text: '快递柜里躺着个写着你名字的包裹，可你最近什么都没买。寄件人一栏只写着："一个欣赏你的人。"',
    choices: [
      { text: '拆开看看',
        effect: { items: ['it_hoodie'], attr: { spr: 2 } },
        result: '一件粉色卫衣，尺码分毫不差。你穿了三天，也没等到认领的人。行吧，神秘人的审美，你认可了。', kind: 'good' },
      { text: '联系快递退回',
        effect: { attr: { chr: 1, spr: 1 } },
        result: '一周后包裹又寄了回来，附言升级："请别退回，你值得。"你挠头收下，权当生活给的小确幸。', kind: 'good' }
    ] },

  /* ========== s2 扩容批次 · 现实向突发 ========== */
  { id: 'ev_s2_news_hero', sudden: true, once: true, kind: 'good', weight: 5, age: [16, 60],
    text: '路口老人突然晕倒，你冲上去做心肺复苏，全程被路人直播。当晚你上了同城热搜第一，词条是：#最美路人甲#。',
    choices: [
      { text: '接受采访，实话实说',
        effect: { coin: 50, attr: { spr: 2, chr: 2 } },
        result: '你那句"谁遇上都会伸手"又圈了一波粉，还有企业送来慰问金。', kind: 'good', big: true },
      { text: '婉拒采访，低调消失',
        effect: { attr: { luk: 1, spr: 1 } },
        result: '网友找了你三天，封你为"蒙面侠"。深藏功与名，就是快递还得自己拿。', kind: 'good' }
    ] },
  { id: 'ev_s2_news_wrong', sudden: true, once: true, kind: 'bad', weight: 6, age: [18, 70],
    text: '本地新闻配错了照片：在逃人员的照片栏赫然放着你去年的一寸照。你顶着全小区异样的目光上了半天班，下午报社登报道歉，你才洗清冤屈。',
    effect: { attr: { spr: -1, int: 1 } } },
  { id: 'ev_s2_news_street', sudden: true, once: true, weight: 5, age: [18, 65],
    text: '街头采访的话筒怼到你脸上："请问您觉得幸福是什么？"你刚被老板骂完，脑子和嘴都没把门的。',
    choices: [
      { text: '真话："幸福是不用回工作群。"',
        effect: { attr: { spr: 2, chr: 1 } },
        result: '视频百万点赞，评论区集体破防。老板也看到了，默默把群名改成了"幸福一家人"。', kind: 'good' },
      { text: '标准答案："当然是奋斗。"',
        effect: { attr: { mny: 1 } },
        result: '节目播出后你被评为"年度正能量市民"，街道办送来一桶油和一面锦旗。', kind: 'good' }
    ] },
  { id: 'ev_s2_witness', sudden: true, once: true, weight: 6, age: [18, 70],
    text: '你目睹一起剐蹭事故，交警来做笔录。你绘声绘色的描述配上手绘示意图，让责任认定一目了然。交警合上本子："考虑来我们队里做文职吗？"',
    effect: { attr: { int: 1, spr: 1 } } },
  { id: 'ev_s2_wx_snow', sudden: true, once: true, weight: 4, age: [0, 90],
    text: '六月正午，天空毫无征兆飘起鹅毛大雪，气温半小时掉了二十度。你穿着短袖站在雪里，和全城市民一起怀疑人生——气象台连夜致歉，说仪器也没见过这阵仗。',
    effect: { attr: { spr: 1, luk: 1, str: -1 } } },
  { id: 'ev_s2_wx_fish', sudden: true, once: true, kind: 'good', weight: 3, age: [10, 80],
    text: '暴雨过后，你家楼下积水里扑腾着几条活蹦乱跳的鲫鱼。专家说是罕见的"鱼雨"，邻居大姨已经拎着桶下楼了。你抄起锅跟了下去。',
    effect: { coin: 20, attr: { spr: 2 } } },
  { id: 'ev_s2_wx_halo', sudden: true, once: true, weight: 3, age: [6, 85],
    text: '正午的天上挂着三个"太阳"，朋友圈瞬间刷屏。老人说是祥瑞，专家说是幻日，你只觉得连太阳都开始内卷了。',
    effect: { attr: { luk: 2, spr: 1 } } },
  { id: 'ev_s2_wx_typhoon', sudden: true, once: true, weight: 5, age: [18, 60],
    text: '台风夜你被困在便利店，卷帘门哗啦啦响，店里只剩你、店员和一个抱着猫的姑娘。',
    choices: [
      { text: '凑钱请全场吃关东煮',
        effect: { coin: -30, attr: { spr: 2, chr: 1 } },
        result: '三个人一只猫围着蒸腾的锅聊到后半夜。台风过境，你们互留联系方式，约定明年台风季再聚。', kind: 'good', big: true },
      { text: '靠墙补觉，养精蓄锐',
        effect: { attr: { str: 1 } },
        result: '你一觉睡到天亮。店员在你额头贴了张便签："睡相安详，像本店的镇店之宝。"' }
    ] },
  { id: 'ev_s2_metro_seat', sudden: true, once: true, weight: 6, age: [14, 50],
    text: '地铁上你给一位大爷让座，大爷中气十足地谢绝："小伙子，我刚跑完马拉松，你坐你坐。"全车厢的目光让你默默把让座的手收了回来。',
    effect: { attr: { spr: 1 } } },
  { id: 'ev_s2_elevator_star', sudden: true, once: true, kind: 'good', weight: 4, age: [16, 55],
    text: '电梯门关上的一刻，你才发现身边站着那位天天挂在热搜上的顶流，口罩帽子全副武装，对你比了个"嘘"。',
    choices: [
      { text: '假装没认出，安静到站',
        effect: { attr: { luk: 2, spr: 1 } },
        result: '电梯到站，对方低声说了句"谢谢"，塞给你一张演唱会内场票。' },
      { text: '礼貌请求合影',
        effect: { attr: { chr: 1, spr: 2 } },
        result: '对方犹豫两秒还是配合了。照片里你笑得像个二百斤的孩子，这张头像你用了三年。', kind: 'good' }
    ] },
  { id: 'ev_s2_elevator_stuck', sudden: true, once: true, weight: 4, age: [16, 70],
    text: '电梯"咣当"一声停在半空，灯灭了。同梯的还有一位外卖小哥和一只泰迪。',
    choices: [
      { text: '冷静按警铃，安抚大家',
        effect: { attr: { spr: 1, str: 1 } },
        result: '两小时后你们获救。小哥超时的一单被投诉，你帮他写了情况说明，平台最终免责。', kind: 'good' },
      { text: '带大家做深蹲取暖',
        effect: { attr: { str: 1, spr: 1 } },
        result: '救援人员打开门，看到三人一狗整整齐齐做深蹲。视频被物业发上网：最暖困梯现场。', kind: 'good' }
    ] },
  { id: 'ev_s2_metro_musician', sudden: true, once: true, weight: 5, age: [16, 60],
    text: '末班地铁里，一个背吉他的年轻人轻轻唱起歌，唱的是"加班的人呐，早点回家"。车厢里没人说话，有人偷偷抹眼睛。你把口袋里的零钱全放进了他的琴盒。',
    effect: { coin: -10, attr: { spr: 2 } } },
  { id: 'ev_s2_metro_last', sudden: true, once: true, kind: 'fate', weight: 4, age: [18, 60],
    text: '你冲进末班车厢，对面座位的老奶奶抬头看你："后生仔，这趟车不到站嘞。"你一激灵——车厢里明明空无一人，她刚刚……是不是没动嘴？',
    choices: [
      { text: '淡定坐下："奶奶，我坐到终点。"',
        effect: { attr: { luk: 3, spr: -1 } },
        result: '老奶奶笑了，身影在隧道灯影里淡去。第二天你买彩票中了小奖，同事说你最近印堂发亮。', kind: 'good' },
      { text: '到站就跑，头也不回',
        effect: { attr: { str: 1, spr: -1 } },
        result: '你落荒而逃。回头望时，末班车静静驶出站台，车厢灯光明亮，空无一人。' }
    ] },
  { id: 'ev_s2_kd_100', sudden: true, once: true, kind: 'bad', weight: 4, age: [18, 60],
    text: '快递员推着小山一样的推车在楼下喊你名字——一百个包裹，全是你在深夜emo时分期买的东西。拆到第三十个，你悟了。',
    effect: { attr: { mny: -1, spr: -1, int: 1 } } },
  { id: 'ev_s2_kd_cat', sudden: true, once: true, kind: 'good', weight: 4, age: [16, 70],
    text: '快递箱里传出猫叫。打开一看，一只橘猫端坐在气泡膜上，旁边一张字条："猫粮在夹层，麻烦收留它几天。——走投无路的人"',
    choices: [
      { text: '收留它',
        effect: { coin: -50, attr: { spr: 2 } },
        result: '"几天"变成了"一辈子"。橘猫用你的快递箱登基，从此你家多了位橘色房东。', kind: 'good', big: true },
      { text: '联系平台寻找原主',
        effect: { attr: { chr: 1, spr: 1 } },
        result: '三天后主人红着眼眶上门接猫，硬塞给你谢礼。橘猫走时头也不回，你竟有点失落。' }
    ] },
  { id: 'ev_s2_wm_rider', sudden: true, once: true, weight: 5, age: [18, 50],
    text: '开门的瞬间你和外卖员同时愣住——是高中时总考第一的那位同学。他把餐递给你："少熬夜。你点的全糖去冰，对身体不好。"',
    effect: { attr: { spr: -1, int: 1 } } },
  { id: 'ev_s2_wm_help', sudden: true, once: true, kind: 'good', weight: 3, age: [18, 60],
    text: '你点的外卖迟迟没到，骑手来电，声音发抖："哥，我电动车被偷了，餐在我身上，我跑过来给你送，别投诉我行吗？"',
    choices: [
      { text: '"别跑，定位发我，我开车去接你。"',
        effect: { coin: -20, attr: { spr: 2, chr: 1 } },
        result: '你载着他送完了剩下的单。后来他创业做同城配送，天使投资人一栏写的是你的名字。', kind: 'good', big: true },
      { text: '照收餐，顺手五星好评加满打赏',
        effect: { attr: { spr: 1 } },
        result: '当晚他发来消息："今天本想辞职的，现在不了。"', kind: 'good' }
    ] },
  { id: 'ev_s2_skill_taste', sudden: true, once: true, weight: 4, age: [18, 70],
    text: '某天起你的舌头突然灵敏得可怕：一口奶茶能报出植脂末的牌子，一口火锅能数出花椒的产地。朋友聚会都让你先尝——你成了人形质检仪。',
    effect: { attr: { int: 1, spr: 1 } } },
  { id: 'ev_s2_skill_memory', sudden: true, once: true, kind: 'good', weight: 3, age: [12, 40],
    text: '一觉醒来，你发现自己能逐字背出昨晚随手翻过的菜单。过目不忘这种好事，居然轮到你了。',
    choices: [
      { text: '趁buff还在，疯狂考证',
        effect: { coin: 100, attr: { int: 2 } },
        result: '一年三证，朋友以为你被夺舍了。你把秘诀总结为："灵感来了，挡都挡不住。"', kind: 'good', big: true },
      { text: '用来背歌词和贯口',
        effect: { attr: { chr: 2, spr: 1 } },
        result: '聚会上你张口就来整段《报菜名》，从此酒席C位非你莫属。', kind: 'good' }
    ] },
  { id: 'ev_s2_skill_sleep', sudden: true, once: true, weight: 5, age: [18, 70],
    text: '你突然掌握了"秒睡"神技：头沾枕头三秒入睡，闹钟响前一分钟自然醒。同事问你秘诀，你说："可能是想通了吧。"',
    effect: { attr: { str: 2, spr: 1 } } },
  { id: 'ev_s2_skill_math', sudden: true, once: true, weight: 4, age: [8, 25],
    text: '菜市场里，你的心算能力毫无征兆地觉醒：三斤二两乘单价再加零头，比摊主按计算器还快。摊主沉默了，默默给你抹了零。',
    effect: { coin: 10, attr: { int: 2 } } },
  { id: 'ev_s2_ex_invite', sudden: true, once: true, weight: 5, age: [22, 45],
    text: '红色炸弹来得猝不及防：前任要结婚了，请柬亲手送到你手上，还笑着说"一定要来哦"。',
    choices: [
      { text: '盛装出席，随个吉利数',
        effect: { coin: -50, attr: { chr: 1, spr: 1 } },
        result: '敬酒时前任举杯："谢谢你当年的不娶不嫁之恩。"你笑着干了，心里那点旧账翻篇了。', kind: 'good' },
      { text: '随礼到，人不到',
        effect: { coin: -20, attr: { spr: 1 } },
        result: '你托人带了个红包，备注"百年好合"。当晚朋友圈安静如鸡，你睡了个好觉。' }
    ] },
  { id: 'ev_s2_ex_zaima', sudden: true, once: true, weight: 6, age: [20, 50],
    text: '凌晨一点，沉寂五年的前任头像跳动："在吗？"你盯着屏幕三分钟，回了句"不在"。对方秒回："哦，那我明天结婚，份子钱可以转账。"你默默拉黑，继续睡觉。',
    effect: { attr: { spr: -1, int: 1 } } },
  { id: 'ev_s2_ex_viral', sudden: true, once: true, kind: 'bad', weight: 4, age: [20, 45],
    text: '前任成了情感博主，最新爆款视频《那些年我遇过的奇葩》里，那个"看电影都要AA到小数点"的角色越看越像你自己。评论区十万条骂战，你还不敢认领。',
    effect: { attr: { spr: -2, chr: -1 } } },
  { id: 'ev_s2_layoff', sudden: true, once: true, weight: 4, age: [22, 55],
    text: '周一例会，HR念优化名单，第三个就是你的名字。会议室安静得能听见空调出风声。',
    choices: [
      { text: '平静签字，拿赔偿走人',
        effect: { coin: 200, attr: { spr: -1 } },
        result: 'N+1到账那天，你请自己吃了顿好的。三个月后前公司业务腰斩，你成了幸免的那批。', kind: 'good' },
      { text: '找老板据理力争', cond: { attr: { int: { gte: 6 } } },
        effect: { attr: { mny: 1, spr: 1 } },
        result: '你拿出三年的项目数据一条条过，老板当场把名单划掉一个名字——你的。', kind: 'good', big: true }
    ] },
  { id: 'ev_s2_bonus', sudden: true, once: true, kind: 'good', weight: 3, age: [22, 55],
    text: '年终奖到账，你数了三遍——比去年多了一个零。财务群炸了："发错了！全员退回！"半小时后老板发话："大过年的，发了就是缘，不退了。"',
    effect: { coin: 300, attr: { mny: 1, spr: 2 } } },
  { id: 'ev_s2_company_gone', sudden: true, once: true, kind: 'bad', weight: 4, age: [22, 55],
    text: '周一上班，公司大门贴着封条，老板连夜跑路，连前台那盆发财树都被搬走了。你和同事们站在楼下，手里还拎着给他带的早餐。',
    effect: { coin: -50, attr: { mny: -1, spr: -2 } } },
  { id: 'ev_s2_promote', sudden: true, once: true, weight: 4, age: [25, 55],
    text: '董事长来视察，随口问了句这个项目谁负责的。全场沉默中，你的直属领导指了指你。',
    choices: [
      { text: '不卑不亢，汇报十分钟', cond: { attr: { int: { gte: 6 } } },
        effect: { attr: { mny: 2, chr: 1 } },
        result: '一周后任命下来：连跳两级。原领导见你就笑，笑得你心里发毛。', kind: 'good', big: true },
      { text: '谦虚推给领导',
        effect: { attr: { chr: 1, luk: 1 } },
        result: '领导当晚请你吃饭，拍着你的肩说"懂事"。年底评优，你的名字排在第一个。', kind: 'good' }
    ] },
  { id: 'ev_s2_pet_door', sudden: true, once: true, weight: 5, age: [10, 70],
    text: '监控里，你家猫立起身，用前爪压下门把手，整套动作行云流水，出门遛了个弯，回来还顺手带上了门。你反复看了八遍，开始怀疑自己才是宠物。',
    effect: { attr: { spr: 2 } } },
  { id: 'ev_s2_pet_money', sudden: true, once: true, kind: 'good', weight: 4, age: [10, 70],
    text: '遛狗时狗突然挣脱牵引，钻进绿化带，叼出来一个脏兮兮的信封——里面是厚厚一沓现金。',
    choices: [
      { text: '交给警察',
        effect: { attr: { chr: 2, spr: 1 } },
        result: '半月后失主——一位急着交手术费的大爷——登门道谢，往你手里塞锦旗的手都在抖。', kind: 'good', big: true },
      { text: '原地等失主',
        effect: { attr: { luk: 1, spr: 1 } },
        result: '你等到天黑，等来一位哭得稀里哗啦的阿姨。酬金你没收，回家给狗加了个鸡腿。', kind: 'good' }
    ] },
  { id: 'ev_s2_pet_parrot', sudden: true, once: true, weight: 5, age: [10, 80],
    text: '家里的鹦鹉突然开口，字正腔圆地喊出你的全名，接着是一串只有你妈才会的数落："几点了还不起！"你愣在原地——它到底偷听了多少年？',
    effect: { attr: { spr: 1, int: 1 } } },
  { id: 'ev_s2_pet_keyboard', sudden: true, once: true, kind: 'good', weight: 4, age: [16, 60],
    text: '猫在键盘上踩了一串乱码，精准命中发送键，把你的吐槽小作文发给了老板本人。五分钟后老板回复："写得挺生动，转岗去市场部写文案吧，加薪。"',
    effect: { attr: { mny: 1, spr: 2 } } },
  { id: 'ev_s2_dream_lotto', sudden: true, once: true, weight: 3, age: [18, 80],
    text: '梦里白胡子老爷爷抓着你的手腕，一笔一划在你掌心写下七个数字，临走叮嘱："天机只说一次。"你惊醒，掌心空空，但那串数字烫在脑子里。',
    choices: [
      { text: '照单全买',
        effect: { coin: -20, items: ['it_lotto'], attr: { luk: 1 } },
        result: '开奖夜你中了五个号，二等奖！你对着空气拱手："老爷子，下回直接报一等奖。"', kind: 'good' },
      { text: '翻个身继续睡',
        effect: { attr: { spr: 1 } },
        result: '一周后开奖，那串数字全中头奖。你把枕头捶出了一个坑。', kind: 'bad' }
    ] },
  { id: 'ev_s2_virus_ticket', sudden: true, once: true, kind: 'good', weight: 3, age: [16, 60],
    text: '手机中了病毒，自动把你全家拉进"相亲相爱一家人"群，还顺手帮你抢到三张春运票、两张演唱会门票。杀毒软件弹出警告时，你犹豫了整整十秒。',
    effect: { coin: -30, attr: { spr: 2 } } },
  { id: 'ev_s2_virus_ransom', sudden: true, once: true, kind: 'bad', weight: 3, age: [16, 60],
    text: '手机突然黑屏，弹出一行字："相册已加密，转账解锁。"里面有你十年的照片。',
    choices: [
      { text: '咬牙转账',
        effect: { coin: -100, attr: { spr: -2 } },
        result: '对方真的解了锁，还留了句"谢谢惠顾，记得备份"。你连夜买了三块硬盘。' },
      { text: '报警加刷机，认栽',
        effect: { attr: { spr: -1, int: 1 } },
        result: '照片没了，人没事。民警夸你果断："上当的九成是转账的。"你把云备份开了三个。' }
    ] },
  { id: 'ev_s2_phone_ai', sudden: true, once: true, weight: 4, age: [16, 60],
    text: '凌晨三点，语音助手自己亮了："检测到主人连续加班七天，已为您请假、关机、并拉黑老板。"你想发火，又有点想哭——这届AI比人有人情味。',
    effect: { attr: { str: 1, spr: 1 } } },
  { id: 'ev_s2_dance_judge', sudden: true, once: true, weight: 5, age: [16, 70],
    text: '篮球少年和广场舞大妈同时看上了小区新铺的场地，剑拔弩张之际，双方一致推举路过的你当裁判。',
    choices: [
      { text: '主持公道：单双号轮流', cond: { attr: { int: { gte: 5 } } },
        effect: { attr: { chr: 2, spr: 1 } },
        result: '方案全票通过。大妈给你塞了自家腌的萝卜，少年们教你三步上篮。你成了小区风云人物。', kind: 'good', big: true },
      { text: '掏出音响放歌：都别吵，一起跳',
        effect: { attr: { spr: 2, str: 1 } },
        result: '篮球队被迫加入广场舞方阵，画面和谐得上了本地民生新闻。', kind: 'good' }
    ] },
  { id: 'ev_s2_dance_lead', sudden: true, once: true, weight: 5, age: [50, 90],
    text: '广场舞领队大姐闪了腰，全舞队齐刷刷看向你："就你了，新领队！"你推辞三次未果。第二天你的动作比谁都标准，老姐妹们都看呆了。',
    effect: { attr: { str: 1, spr: 2, chr: 1 } } },
  { id: 'ev_s2_reno_drill', sudden: true, once: true, kind: 'bad', weight: 6, age: [16, 80],
    text: '楼上装修，电钻声精准卡点你的每一个美梦：你梦见演唱会，它伴奏；你梦见考试，它打铃。一个月后你搬着小板凳上楼，和师傅探讨起了冲击钻的转速。',
    effect: { attr: { spr: -2, int: 1 } } },
  { id: 'ev_s2_reno_wall', sudden: true, once: true, weight: 4, age: [16, 80],
    text: '"咚"的一声闷响，你家墙皮簌簌掉落，墙上探进来一根钢管——邻居装修，把你家墙砸穿了。',
    choices: [
      { text: '索赔，要求全屋翻新',
        effect: { coin: 150, attr: { spr: -1 } },
        result: '邻居赔得痛快，还顺手把墙刷成了你一直想要的奶油色。也算是因祸得福？' },
      { text: '探头过去："师傅，加个门洞呗，以后好串门。"',
        effect: { attr: { spr: 2, chr: 1 } },
        result: '邻居笑到打跌，从此两家好得像一家。逢年过节你家的饺子都是双份的。', kind: 'good' }
    ] },
  { id: 'ev_s2_midnight_stall', sudden: true, once: true, weight: 5, age: [18, 70],
    text: '凌晨的巷口，深夜食堂的灯还亮着。老板给你下了一碗阳春面："说说吧，这个点还在外面晃的，都有故事。"',
    choices: [
      { text: '讲讲这些年的起起落落',
        effect: { attr: { spr: 2 } },
        result: '你讲，他听，锅里的汤咕嘟咕嘟。买单时老板摆手："故事抵面钱。"你走出巷口，觉得这座城没那么冷了。', kind: 'good', big: true },
      { text: '"老板，加个蛋。故事没有，饿是真的。"',
        effect: { attr: { str: 1, spr: 1 } },
        result: '老板大笑，给你卧了两个蛋："实在人，我喜欢！"' }
    ] },
  { id: 'ev_s2_midnight_noodle', sudden: true, once: true, kind: 'good', weight: 4, age: [18, 70],
    text: '连续加班的第九天，你在公司楼下收到一碗陌生人递来的热汤面。对方指指楼上："我老婆以前也在这层加班，她说吃口热的才有力气想明天。"',
    effect: { attr: { spr: 2, str: 1 } } },
  { id: 'ev_s2_wedding_crash', sudden: true, once: true, weight: 4, age: [20, 60],
    text: '酒店宴会厅，你随了份子坐定，开席才发现——舞台上新人的名字你一个都不认识。走错厅了，红包已经进了人家账房。',
    choices: [
      { text: '将错就错，大方吃席',
        effect: { attr: { spr: 2 } },
        result: '新人敬酒时认不出你，你举杯大喊"百年好合"，全场掌声。出门时新娘还塞给你一包喜糖。', kind: 'good' },
      { text: '找账房尴尬要回红包',
        effect: { attr: { int: 1 } },
        result: '账房大爷乐了："头一回见随错还敢来要的，有前途。"红包完璧归赵，你落荒而逃。' }
    ] },
  { id: 'ev_s2_wedding_flower', sudden: true, once: true, kind: 'good', weight: 5, age: [20, 50],
    text: '同事婚礼上，新娘抛出的捧花划过一道弧线，精准砸进正在埋头干饭的你怀里。全场起哄，司仪高喊："下一位脱单的就是——那位干饭的！"',
    effect: { attr: { spr: 2, chr: 1, luk: 1 } } },
  { id: 'ev_s2_report_swap', sudden: true, once: true, weight: 4, age: [25, 70],
    text: '体检中心来电："您的报告和别人拿混了。对方四十岁像二十岁，您的二十岁像……总之，您二位要不要认识一下？"',
    effect: { attr: { str: -1, int: 1 } } },
  { id: 'ev_s2_hair', sudden: true, once: true, weight: 4, age: [14, 60],
    text: '理发师手一抖，推子在你头顶犁出一条"高速公路"。两人对着镜子沉默十秒，他说："哥，要不……试试寸头？显精神。"',
    choices: [
      { text: '认了，全推了',
        effect: { attr: { chr: 1, spr: 1 } },
        result: '寸头的你意外地帅，同事纷纷打听发型师。你没忍心说出真相。', kind: 'good' },
      { text: '要求赔偿，换总监补救',
        effect: { coin: 30 },
        result: '总监委婉表示无力回天，给你免单又送了三张券。你戴着帽子度过了人生最长的一个月。' }
    ] },
  { id: 'ev_s2_concert_seat', sudden: true, once: true, kind: 'good', weight: 3, age: [16, 50],
    text: '演唱会你的座位在最后一排山顶，开场前工作人员忽然请你去前排——团队随机抽"幸运观众"填座。你全程被大屏扫到三次，截图糊得像马赛克，依然是你最珍贵的照片。',
    effect: { attr: { spr: 3, chr: 1 } } },
  { id: 'ev_s2_stream_rocket', sudden: true, once: true, weight: 4, age: [16, 60],
    text: '你随手开了场直播，观众只有三个人。突然屏幕被火箭刷屏——一位神秘大佬连刷九十九个，留言只有一句："继续，我在看。"',
    choices: [
      { text: '稳住，好好播',
        effect: { coin: 200, attr: { chr: 1, spr: 2 } },
        result: '下播后大佬再没出现。你把钱提现，郑重更新了设备三件套，从此认真做内容。', kind: 'good', big: true },
      { text: '激动到当场下播缓一缓',
        effect: { attr: { spr: 1 } },
        result: '你缓了三天，大佬再没来过。江湖传言：那晚的火箭，是一个时代的惊鸿一瞥。' }
    ] },
  { id: 'ev_s2_game_account', sudden: true, once: true, kind: 'good', weight: 3, age: [20, 50],
    text: '退游八年的游戏突然关服，官方按虚拟资产折算补偿。你想起当年仓库里囤的那堆"破烂"——如今全是绝版。补偿到账那天，你对八年前的自己肃然起敬。',
    effect: { coin: 250, attr: { spr: 2 } } },
  { id: 'ev_s2_ai_paint', sudden: true, once: true, weight: 4, age: [16, 60],
    text: '你随手上传的自拍被AI重绘后意外走红，画作《地铁上的沉思者》被美术馆数字展厅收录。评论区都说画中人"眼里有光"，只有你知道那是熬夜的红血丝。',
    effect: { coin: 50, attr: { chr: 1, spr: 2 } } },
  { id: 'ev_s2_gene', sudden: true, once: true, weight: 4, age: [18, 70],
    text: '基因检测报告出来：你的祖上竟出过一位御前带刀侍卫，还带着百分之三的游牧血统。',
    choices: [
      { text: '顺着族谱查下去',
        effect: { attr: { int: 2, spr: 1 } },
        result: '你翻出半部家族迁徙史，写成帖子十万加。远房亲戚纷纷冒头，家里的群一下多了四十个人。', kind: 'good' },
      { text: '打印出来裱墙上',
        effect: { attr: { chr: 1, spr: 1 } },
        result: '朋友来家里都对着报告行注目礼。你叉腰：祖上阔过，四舍五入我也阔过。', kind: 'good' }
    ] },
  { id: 'ev_s2_meter', sudden: true, once: true, kind: 'good', weight: 3, age: [25, 75],
    text: '抄表员盯着你家电表看了十分钟，叫来电工——电表在倒转。排查半天：楼上太阳能板接错了线，一直在给你家输电。电力公司追认你为"被动节能标兵"，电费全免还倒贴。',
    effect: { coin: 100, attr: { spr: 2 } } },
  { id: 'ev_s2_wifi_note', sudden: true, once: true, kind: 'good', weight: 4, age: [18, 60],
    text: '门口贴了张字条："蹭了您家三年WiFi，如今搬走，附上三年网费与一箱脐橙。密码我从没破解——是您家门牌号，我猜的。"你看着那箱橙子，决定密码再用三年。',
    effect: { coin: 30, attr: { spr: 2 } } },
  { id: 'ev_s2_gym', sudden: true, once: true, weight: 4, age: [18, 60],
    text: '健身房连夜跑路，会员群哀嚎一片。唯独你的私教加你好友："哥，课没上完，钱退你——我打算自己开工作室，你要不要入伙？"',
    choices: [
      { text: '入股！',
        effect: { coin: -100, attr: { mny: 1 } },
        result: '先退款后入股，一通操作下来你成了小股东。三年后工作室开了三家分店。', kind: 'good', big: true },
      { text: '只收退款，婉拒',
        effect: { coin: 80 },
        result: '退款到账。后来他的工作室火了，你酸着办了一张新卡。' }
    ] },
  { id: 'ev_s2_blindbox', sudden: true, once: true, kind: 'good', weight: 5, age: [10, 60],
    text: '随手买的一个盲盒，开出了全球限量五十个的超级隐藏款。店里瞬间围满了人，老板捧着盒子手抖："三年，我这店第一次出它。"',
    effect: { coin: 150, attr: { spr: 2, luk: 1 } } },
  { id: 'ev_s2_meteor_wish', sudden: true, once: true, kind: 'good', weight: 4, age: [10, 80],
    text: '流星雨夜你爬上楼顶，正赶上最大的一颗划破天幕。你闭眼许愿，睁眼时发现全楼天台的邻居都在，有人还支了烧烤架。那晚，全城的天台都在许愿。',
    effect: { attr: { spr: 2, luk: 2 } } },
  { id: 'ev_s2_old_phone', sudden: true, once: true, weight: 4, age: [20, 60],
    text: '抽屉深处的旧手机充上电居然开了机，弹出一条十年前的草稿短信："别怕，以后的你过得还不错。"你愣了很久，回了一句："确实，谢谢当年的你。"然后截了图。',
    effect: { attr: { spr: 2 } } },
  { id: 'ev_s2_taxi_boss', sudden: true, once: true, weight: 4, age: [18, 60],
    text: '出租车司机一路跟你聊宏观经济，从汇率聊到产业链，犀利得吓人。下车时他递来名片——某上市公司创始人。"开车是我的解压方式。"',
    choices: [
      { text: '收好名片，改日登门请教', cond: { attr: { int: { gte: 6 } } },
        effect: { coin: 100, attr: { mny: 2 } },
        result: '你真的登门了。三个月后你入职他的公司，薪水翻倍。他说："敢给司机发消息的，你是第一个。"', kind: 'good', big: true },
      { text: '客气道别，把故事记在心里',
        effect: { attr: { int: 1, spr: 1 } },
        result: '你发了条动态记录奇遇，点赞破万。热评第一：城市里的出租车，是移动的深夜书房。', kind: 'good' }
    ] },
  { id: 'ev_s2_lost_dog', sudden: true, once: true, kind: 'good', weight: 4, age: [14, 70],
    text: '电线杆上的寻狗启事写着：酬金十万元。全城都在找那条叫"将军"的柯基。三天后的雨夜，你家楼道里蹲着一条湿透的柯基，狗牌上赫然两个字：将军。',
    choices: [
      { text: '按启事电话联系主人',
        effect: { coin: 500, attr: { chr: 1 } },
        result: '主人是位独居老教授，酬金之外，他每周都带"将军"来看你。你多了两个朋友。', kind: 'good', big: true },
      { text: '先收留，再慢慢找主人',
        effect: { coin: 300, attr: { spr: 2 } },
        result: '"将军"在你家白吃白住一周才被接走。它走时一步三回头，你的心被一只柯基踩出了坑。', kind: 'good' }
    ] },
  { id: 'ev_s2_kid_parent', sudden: true, once: true, weight: 4, age: [22, 60],
    text: '亲戚家小学生的作业是"采访一位长辈的职业"，老师看完惊为天人，点名要见你。你盛装出席，小学生当众朗读："我的叔叔每天假装很忙……"全班大笑。',
    effect: { attr: { spr: 1 } } },
  { id: 'ev_s2_grandma_live', sudden: true, once: true, kind: 'good', weight: 4, age: [16, 60],
    text: '你随手教奶奶开了直播，三天后"八十岁暴躁奶奶在线教学腌酸菜"冲上热门，打赏收到手软。奶奶对着镜头中气十足："家人们，点关注不迷路！"你在旁边默默调货发货。',
    effect: { coin: 150, attr: { mny: 1, spr: 2 } } },
  { id: 'ev_s2_undercover', sudden: true, once: true, weight: 3, age: [22, 55],
    text: '新来的实习生笨手笨脚，打印机能用反，唯独食堂阿姨见了他就腿软。一个月后全员大会上，他走上主席台——集团太子爷，微服私访结束。',
    choices: [
      { text: '庆幸：我一直对他不错',
        effect: { attr: { spr: 2, mny: 1 } },
        result: '太子爷点名表扬"唯一教会我用复印机的前辈"。年底你的晋升公示贴在最显眼的位置。', kind: 'good', big: true },
      { text: '后怕：我使唤过他带奶茶……',
        effect: { attr: { spr: -2, luk: 1 } },
        result: '大会散场，他路过你工位，眨眨眼："三分糖，去冰，对吧？"你后背的汗凉了。' }
    ] },
  { id: 'ev_s2_kite', sudden: true, once: true, weight: 5, age: [8, 80],
    text: '广场上，你的风筝和一只老鹰风筝缠在一起，两位主人隔空较劲半小时，最后双双坠毁。对方是位退休物理教授，你们蹲在残骸旁聊了俩小时空气动力学。',
    effect: { attr: { int: 2, spr: 1 } } },
  { id: 'ev_s2_fog', sudden: true, once: true, kind: 'good', weight: 4, age: [10, 85],
    text: '清晨推窗，整座城市泡在平流雾里，只有楼顶探出云海，像一座座孤岛。你拍的照片被城市官微转发，配文："今日份的人间仙境。"',
    effect: { attr: { chr: 1, spr: 2, luk: 1 } } },
  { id: 'ev_s2_drone', sudden: true, once: true, kind: 'good', weight: 3, age: [18, 60],
    text: '江边无人机表演，千架无人机忽然变换阵型，在夜空中拼出你的名字和一句"生日快乐"。可今天，不是你生日。',
    choices: [
      { text: '替名字的主人把愿望许了',
        effect: { attr: { luk: 2, spr: 2 } },
        result: '你对着夜空认真许愿。后来才知道是程序员输错了日期——但灵不灵，只有天知道。' },
      { text: '发视频全网寻人',
        effect: { attr: { chr: 1, spr: 1 } },
        result: '视频火了，同名的陌生人纷纷认领。你们拉了个群，群名：天选之名的持有者们。', kind: 'good' }
    ] },
  { id: 'ev_s2_museum', sudden: true, once: true, weight: 3, age: [14, 80],
    text: '博物馆新展的陶俑火了——眉眼、鼻梁、甚至法令纹都和你一模一样。讲解员憋笑问你："先生，需要给您和您合个影吗？"',
    effect: { attr: { chr: 1, spr: 2, luk: 1 } } },
  { id: 'ev_s2_capsule', sudden: true, once: true, kind: 'good', weight: 4, age: [18, 50],
    text: '母校拆迁，施工队挖出了你们班埋的时光胶囊。你拆开自己的信："未来的我，发财了吗？没发财也没关系，别变成无聊的大人。"你摸了摸肚子，决定今晚去跑步。',
    effect: { attr: { spr: 2, str: 1 } } },
  { id: 'ev_s2_reunion', sudden: true, once: true, weight: 5, age: [25, 55],
    text: '十年同学会，饭局变成凡尔赛大赛：有人晒表，有人晒娃，班长哭穷说自己是"就两套房的普通人"。',
    choices: [
      { text: '安静干饭，真诚鼓掌',
        effect: { attr: { spr: 2, chr: 1 } },
        result: '散场时三个老同学加你微信："全场就你活得明白。"你们组了个"干饭人不攀比"小群。', kind: 'good' },
      { text: '掏出手机，播放自家猫开门的视频',
        effect: { attr: { spr: 2, luk: 1 } },
        result: '全场爆发出今晚最真诚的掌声。当晚，你家猫成了班级群头像。', kind: 'good' }
    ] },
  { id: 'ev_s2_sleep_champ', sudden: true, once: true, kind: 'good', weight: 3, age: [18, 60],
    text: '商场举办"睡眠大赛"，你被朋友偷偷报了名。你一觉睡到自然醒，拿下冠军，奖品是一年份的乳胶枕。颁奖词写着："在失眠的时代，会睡觉是一种超能力。"',
    effect: { coin: 50, attr: { str: 2, spr: 2 } } },
  { id: 'ev_s2_challenge', sudden: true, once: true, weight: 4, age: [16, 60],
    text: '街头立着"吃辣挑战"的牌子：吃完变态辣烤翅十只，奖金五千。围观人群把你推了出去——谁让你昨天吹牛说自己是辣王。',
    choices: [
      { text: '应战！', cond: { attr: { str: { gte: 7 } } },
        effect: { coin: 200, attr: { spr: 2 } },
        result: '你涕泪横流地啃完十只，老板含泪付款。第二天你的"烈焰红唇"表情包传遍全城。', kind: 'good' },
      { text: '认怂，请全场喝凉茶',
        effect: { coin: -30, attr: { chr: 1 } },
        result: '大家笑着说你"识时务"。面子没了，但肠胃保住了。' }
    ] },
  { id: 'ev_s2_cold_wave', sudden: true, once: true, kind: 'good', weight: 4, age: [16, 65],
    text: '寒潮红色预警，全城停工停学一天。暖气、被窝、火锅，窗外大雪纷飞。多年后你仍会想起这一天——全人类难得的、理直气壮的暂停键。',
    effect: { attr: { spr: 3, str: 1 } } },
  { id: 'ev_s2_robot_coffee', sudden: true, once: true, kind: 'good', weight: 3, age: [18, 60],
    text: '加班夜，窗外传来嗡鸣——一台无人机吊着一杯咖啡悬在窗口，滚动字幕写着："打烊前最后一杯，给23楼还亮灯的你。免单。"',
    effect: { attr: { spr: 2, str: 1 } } },
  { id: 'ev_s2_pigeon', sudden: true, once: true, kind: 'good', weight: 4, age: [12, 80],
    text: '一只信鸽落在你家窗台，腿上绑着小纸条："寻主未果，行至此处，可否借宿一宿？——编号0713"。你撒了把小米。第二天，窗台多了根漂亮的羽毛。',
    effect: { attr: { spr: 2, luk: 1 } } },
  { id: 'ev_s2_fish_talk', sudden: true, once: true, weight: 4, age: [16, 80],
    text: '钓鱼一整天颗粒无收，收竿时却钓上一条金灿灿的锦鲤。它看你一眼，你也看它一眼，气氛突然有点庄重。',
    choices: [
      { text: '放生',
        effect: { attr: { luk: 3, spr: 1 } },
        result: '锦鲤入水，绕着你的影子游了三圈才走。此后一年，你顺得自己都害怕。', kind: 'good', big: true },
      { text: '带回家养着',
        effect: { coin: 100, attr: { spr: 1 } },
        result: '锦鲤在你家鱼缸住下，朋友都说"有灵气"。有人出高价求购，你拒绝了——万一呢。', kind: 'good' }
    ] },
  { id: 'ev_s2_mirror', sudden: true, once: true, weight: 5, age: [16, 70],
    text: '服装店的试衣镜把你照得腿长一米八，你激情下单三条裤子。回家再试，原形毕露。你盯着裤子沉思：到底是哪面镜子在撒谎？',
    effect: { attr: { mny: -1, spr: -1, int: 1 } } },
  { id: 'ev_s2_rooftop', sudden: true, once: true, kind: 'good', weight: 4, age: [30, 80],
    text: '你在天台种的番茄和小葱被物业无人机巡查拍到，本以为要挨罚，结果社区评你"最美空中菜园"，还请你给全楼开课。第一批收成，你请邻居们吃了顿番茄炒蛋。',
    effect: { coin: 30, attr: { spr: 2, chr: 1 } } },
  { id: 'ev_s2_store_half', sudden: true, once: true, kind: 'good', weight: 5, age: [16, 60],
    text: '深夜便利店，饭团第二件半价。你和另一个加班的陌生人同时伸手拿最后一个，对视三秒，同时开口："一人一半？"那晚你们拼桌吃完，加了好友，备注：半价之交。',
    effect: { attr: { spr: 2 } } },
  { id: 'ev_s2_escalator', sudden: true, once: true, kind: 'good', weight: 5, age: [14, 70],
    text: '商场扶梯上，前方大爷的编织袋裂开，橙子滚了整条扶梯。你下意识开启守门员模式，左扑右挡一个没漏。大爷握着你的手："小伙子，女足需要你！"',
    effect: { attr: { str: 1, spr: 2, chr: 1 } } },
  { id: 'ev_s2_power_cut', sudden: true, once: true, weight: 4, age: [18, 80],
    text: '夏夜全城大停电，整栋楼的人都摸黑下了楼。有人搬出音响，有人抱出西瓜，孩子们打着手电追萤火虫。',
    choices: [
      { text: '把家里的冰棒全拿出来分了',
        effect: { coin: -20, attr: { spr: 2, chr: 1 } },
        result: '冰棒换故事，你们聊到来电。灯亮的一瞬，居然有人叹气："怎么这么快。"', kind: 'good' },
      { text: '带头组织楼道歌会',
        effect: { attr: { chr: 2, spr: 2 } },
        result: '从流行歌唱到难忘今宵，来电时全楼合唱正嗨。第二天物业公告：建议每年停电一次（不是）。', kind: 'good' }
    ] },
  { id: 'ev_s2_kill_fallobj', sudden: true, once: true, kind: 'bad', weight: 3, age: [18, 70],
    cond: { chance: 0.02 },
    text: '深夜回家，你哼着歌走到楼下，头顶传来一声细微的碎裂声。你抬头，只看见一片急速放大的阴影——二十九楼窗台的花盆。',
    effect: { kill: true, deathText: '被高空坠落的花盆击中，生命定格在楼下的路灯旁' } }
];
