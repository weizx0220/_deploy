// 现实人生事件池（凡人主线，pool 默认 'life'）
// 契约 flag：married（已婚）、has_child（有子女）
// 本文件内部连锁 flag：
//   qm（青梅竹马线）：qm -> qm_miss / married
//   sworn（结拜兄弟线）：sworn -> sworn_partner / sworn_gone
//   first_love（初恋线）：first_love -> fl_broken -> fl_reunited
//   fit（健身线）：fit -> fit_body
//   writer（写作线）：writer -> writer_signed -> writer_famous
//   dating（恋爱中）-> married
var EVENTS_REALITY = [

// ========== 0-9 岁 ==========
{ id: 'ev_r_birth_poor', age: [0, 0], once: true, big: true, kind: 'fate',
  cond: { attr: { mny: { lte: 3 } } },
  text: '你出生在一个清贫人家。接生婆把你裹进打了补丁的旧棉被，父亲在门口抽了半宿的烟，笑出了满脸褶子。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_birth_mid', age: [0, 0], once: true, big: true, kind: 'fate',
  cond: { attr: { mny: { gte: 4, lte: 6 } } },
  text: '你出生在一个普通工薪家庭。产房外奶奶念叨着"母子平安就好"，你哭声响亮，护士说这孩子肺活量将来能吹唢呐。',
  effect: { attr: { str: 1 } } },
{ id: 'ev_r_birth_rich', age: [0, 0], once: true, big: true, kind: 'fate',
  cond: { attr: { mny: { gte: 7 } } },
  text: '你出生在富裕之家，月子中心顶层套房。你的人生起跑线，是许多人终点线后面那条街的咖啡馆。',
  effect: { attr: { chr: 1, spr: 1 } } },
{ id: 'ev_r_first_word', age: [1, 2], once: true,
  text: '你到了学说话的年纪，全家人围着你，等你开口叫第一个人。',
  choices: [
    { text: '含糊地喊"爸爸"', effect: { attr: { spr: 1 } }, result: '父亲激动得连夜给所有亲戚打电话，你成了全家的头条新闻。' },
    { text: '清楚地喊"妈妈"', effect: { attr: { spr: 1 } }, result: '母亲笑出了眼泪，父亲在一旁假装大度地鼓掌。' },
    { text: '喊了一声"汪"', cond: { attr: { luk: { gte: 3 } } }, effect: { attr: { spr: 2 } }, result: '全家沉默三秒后笑作一团，家里的狗从此地位超然。' }
  ] },
{ id: 'ev_r_drop_bowl', age: [2, 4],
  text: '你把饭碗扣在了地上，米饭在地上画出一幅抽象派地图。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_kindergarten_fight', age: [4, 6],
  text: '幼儿园里，一个大个子孩子抢走了你的积木，还冲你做鬼脸。',
  choices: [
    { text: '抢回来', cond: { attr: { str: { gte: 4 } } }, effect: { attr: { str: 1, spr: 1 } }, result: '你俩滚作一团，最后老师各打五十大板，但积木回来了。', kind: 'good' },
    { text: '告老师', effect: { attr: { int: 1 } }, result: '老师主持了公道。你第一次明白，规则也是一种武器。' },
    { text: '用饼干换和平', effect: { attr: { chr: 1, mny: -1 } }, result: '你们成了好朋友。多年后你才知道这叫"以零食服人"。', kind: 'good' }
  ] },
{ id: 'ev_r_qm1', age: [3, 8], once: true, big: true, kind: 'fate',
  text: '隔壁搬来一户人家，有个和你同岁的孩子。你们在楼道里抢同一根冰棍，最后一人一半，从此形影不离。',
  effect: { setFlags: ['qm'], attr: { spr: 1 } } },
{ id: 'ev_r_pet_dog', age: [4, 9],
  text: '放学路上你捡到一只脏兮兮的小狗，它冲你摇尾巴。你想带它回家。',
  choices: [
    { text: '抱回家，求爸妈留下它', effect: { attr: { spr: 2 } }, result: '母亲嘴上嫌弃，转头就去买了狗粮。它成了你童年最好的玩伴。', kind: 'good' },
    { text: '送到救助站', effect: { attr: { int: 1 } }, result: '你学会了喜欢不一定要占有，虽然回家路上哭了一路。' }
  ] },
{ id: 'ev_r_swim_drown', age: [5, 14], weight: 4, kind: 'bad', once: true, cond: { chance: 0.06 },
  text: '盛夏午后，你瞒着大人跟伙伴去野河沟里摸鱼，脚下一滑，水草缠住了你的脚踝。',
  effect: { kill: true, deathText: '野泳溺水，没能等到大人的呼喊' } },
{ id: 'ev_r_draw_wall', age: [3, 6],
  text: '你趁大人不注意，用蜡笔在客厅白墙上完成了一幅鸿篇巨制。母亲下班回来，血压和画一起上升。',
  effect: { attr: { chr: 1, spr: 1 } } },
{ id: 'ev_r_first_grade', age: [6, 7], once: true, big: true,
  text: '你背着新书包走进小学。校门口人挤人，你攥紧书包带，觉得自己像个即将出征的小兵。',
  effect: { attr: { int: 1 } } },
{ id: 'ev_r_jiwa_class', age: [5, 9],
  text: '母亲给你报了三个兴趣班：珠心算、跆拳道、少儿主持。周末排得比领导还满。',
  choices: [
    { text: '咬牙全上', cond: { attr: { str: { gte: 4 } } }, effect: { attr: { int: 2, str: -1, spr: -1 } }, result: '你成了亲戚口中"别人家的孩子"，代价是再也没看过周六的动画片。' },
    { text: '哭闹着只留一个', effect: { attr: { spr: 2, int: -1 } }, result: '你保住了周末，也保住了童年。', kind: 'good' }
  ] },
{ id: 'ev_r_lose_teeth', age: [6, 8],
  text: '你的门牙掉了，说话漏风。爷爷说上牙扔房顶、下牙扔床底，新牙才长得齐。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_sworn1', age: [8, 15], once: true, big: true, kind: 'fate',
  text: '你和班上两个死党在操场角落结拜：三根辣条举过头顶，歃辣条为盟，发誓有福同享、有作业同抄。',
  effect: { setFlags: ['sworn'], attr: { spr: 2 } } },
{ id: 'ev_r_child_fever', age: [2, 9], kind: 'bad',
  text: '你半夜发起高烧，父亲背着你跑了三条街去挂急诊。你趴在他背上，觉得那是最稳的床。',
  effect: { attr: { str: -1 } } },
{ id: 'ev_r_newyear_money', age: [5, 12],
  text: '过年收了一圈压岁钱，母亲微笑着伸出手："妈先替你存着。"',
  choices: [
    { text: '乖乖上交', effect: { attr: { spr: -1 } }, result: '这笔钱的去向成了你家最大的未解之谜。' },
    { text: '偷偷藏起两张', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 1, spr: 1 } }, result: '你把钱夹进字典，体验了人生第一次"财务自由"。', kind: 'good' }
  ] },

// ========== 10-19 岁 ==========
{ id: 'ev_r_zhongkao', age: [15, 16], once: true, big: true,
  text: '中考来了。考场外烈日当头，母亲手里的矿泉水比你还紧张。',
  choices: [
    { text: '稳定发挥', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, spr: 2 } }, result: '你考进了重点高中，全家福挂在客厅最显眼的位置。', kind: 'good' },
    { text: '尽力就好', effect: { attr: { spr: 1 } }, result: '成绩不好不坏，你去了普通高中。父亲说路还长，别急。' }
  ] },
{ id: 'ev_r_game_addict', age: [12, 17],
  text: '你迷上了一款游戏，段位只差一步就能上王者。作业在书包里安静地躺尸。',
  choices: [
    { text: '通宵冲分', effect: { attr: { int: -1, str: -1, spr: 2 } }, result: '你上了王者，也上了班主任的黑名单。', kind: 'bad' },
    { text: '忍住，先写作业', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: -1 } }, result: '你关掉手机那一刻，理解了什么叫"延迟满足"，虽然一点也不满足。' }
  ] },
{ id: 'ev_r_first_love1', age: [14, 22], once: true, big: true, kind: 'fate',
  text: '前排那个人回头借橡皮，阳光正好落在侧脸上。你的心漏跳了半拍——完了，这是初恋。',
  effect: { setFlags: ['first_love'], attr: { spr: 2 } } },
{ id: 'ev_r_gaokao', age: [17, 19], once: true, big: true,
  text: '高考。最后一科交卷铃响，你把笔一扔，十二年的寒窗在这一刻画上句号。',
  choices: [
    { text: '胸有成竹，估分很高', cond: { attr: { int: { gte: 7 } } }, effect: { attr: { int: 1, mny: 1, spr: 2 } }, result: '录取通知书寄到那天，整条街都知道你家出了个大学生。', kind: 'good' },
    { text: '正常发挥，听天由命', effect: { attr: { spr: 1 } }, result: '成绩够上一所普通大学。你在志愿填报书上郑重写下：服从调剂。' },
    { text: '考砸了，考虑复读', kind: 'bad', effect: { attr: { spr: -2 } }, result: '你把成绩单塞进抽屉最底层。复读与否，成了一整个夏天的煎熬。' }
  ] },
{ id: 'ev_r_bullied', age: [10, 16], kind: 'bad',
  text: '几个高年级学生堵在放学路上，冲你要"保护费"。',
  choices: [
    { text: '硬刚到底', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { str: 1, spr: -1 } }, result: '你挂了彩，但他们再没找过你。有些事，退一步不会海阔天空。' },
    { text: '交钱消灾', effect: { attr: { mny: -1, spr: -2 } }, result: '你攥着空口袋回家，一路都在想：要是再强壮一点就好了。' },
    { text: '告诉家长和学校', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 1 } }, result: '学校严肃处理了那几个人。你明白了求助不是软弱。', kind: 'good' }
  ] },
{ id: 'ev_r_growth_spurt', age: [12, 16], kind: 'good',
  text: '一个暑假过去，你蹿了十厘米，裤子短了一截。奶奶说："这孩子跟浇了粪的苗似的。"',
  effect: { attr: { str: 1, chr: 1 } } },
{ id: 'ev_r_pimple', age: [13, 17], kind: 'bad',
  text: '青春痘攻占了你的脸，额头成了重灾区。你试遍了偏方，痘痘表示毫发无伤。',
  effect: { attr: { chr: -1 } } },
{ id: 'ev_r_idol', age: [12, 18],
  text: '你疯狂迷上了一个明星，海报贴满墙，打榜投票样样不落。',
  choices: [
    { text: '省吃俭用买周边', effect: { attr: { mny: -1, spr: 2 } }, result: '你的快乐很简单：偶像营业了，天就晴了。', kind: 'good' },
    { text: '理智追星，学习为主', effect: { attr: { int: 1 } }, result: '你把偶像的照片贴在错题本上，称之为"精神氮泵"。' }
  ] },
{ id: 'ev_r_qm2', age: [10, 16], once: true,
  cond: { flags: ['qm'] },
  text: '你和隔壁那位一起上补习班，夏天的傍晚，两个人分一副耳机骑车回家。你觉得这样的日子永远不会结束。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r_sworn2', age: [12, 18], once: true, kind: 'good',
  cond: { flags: ['sworn'] },
  text: '有人在校外堵你，结拜兄弟二话不说拎着扫把就冲了过来。虽然最后一起被罚站，但谁都没后悔。',
  effect: { attr: { spr: 2, str: 1 } } },
{ id: 'ev_r_rebel', age: [13, 17],
  text: '叛逆期准时到货。你想把头发染成奶奶灰，父亲扬言要和你断绝父子关系。',
  choices: [
    { text: '染！青春就这一次', effect: { attr: { chr: 1, spr: 1 } }, result: '镜子里的人很酷，父亲的脸很黑。三天后你自己也觉得像只灰耗子。' },
    { text: '算了，剪个寸头', effect: { attr: { str: 1 } }, result: '理发师手起刀落，你看起来精神得像个兵。' }
  ] },
{ id: 'ev_r_school_food', age: [10, 18],
  text: '食堂今日特供：西瓜炒月饼。你看着餐盘，开始思考人生的意义。',
  effect: { attr: { spr: -1, str: "rand:-1~1" } } },
{ id: 'ev_r_phone_confiscate', age: [12, 17], kind: 'bad',
  text: '上课偷玩手机被班主任当场缴获。他说：毕业再来取。你算了算，还有七百多天。',
  effect: { attr: { spr: -1 } } },
{ id: 'ev_r_scholarship', age: [14, 19], kind: 'good',
  cond: { attr: { int: { gte: 7 } } },
  text: '你拿到了奖学金。颁奖台上灯光有点晃眼，你在心里给熬夜的自己记了一功。',
  effect: { attr: { mny: 1, spr: 1 } } },
{ id: 'ev_r_bike_fall', age: [10, 19], kind: 'bad',
  text: '下雨天骑车耍帅，一个漂移没漂好，你和水坑亲密接触，胳膊挂了彩。',
  effect: { attr: { str: -2 } } },
{ id: 'ev_r_car_accident', age: [10, 70], weight: 4, kind: 'bad', once: true, cond: { chance: 0.06 },
  text: '十字路口，一辆闯红灯的货车呼啸而来。你只觉得白光一闪。',
  effect: { kill: true, deathText: '死于一场突如其来的车祸' } },

// ========== 20-29 岁 ==========
{ id: 'ev_r_college', age: [18, 20], once: true, big: true, kind: 'good',
  cond: { attr: { int: { gte: 5 } } },
  text: '你拖着行李箱走进大学校门。宿舍四个人来自四个省，第一晚就用四种口音聊到了凌晨三点。',
  effect: { attr: { int: 1, spr: 2 } } },
{ id: 'ev_r_major_regret', age: [19, 22],
  text: '专业课越上越绝望——你发现自己对本专业的热爱，约等于对高数的热爱。',
  choices: [
    { text: '转专业，从头再来', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, spr: 2 } }, result: '你成功转了专业，虽然要多补一年课，但眼里重新有了光。', kind: 'good' },
    { text: '凑合念完，毕业再说', effect: { attr: { spr: -1, mny: 1 } }, result: '你把不喜欢的事坚持了四年，也算一种本事。' }
  ] },
{ id: 'ev_r_confess', age: [18, 28], once: true, big: true,
  text: '你攒了三个月的勇气，决定在今晚向喜欢的人表白。心跳快得像要越狱。',
  choices: [
    { text: '当面说，真诚到底', cond: { attr: { chr: { gte: 5 } } }, effect: { setFlags: ['dating'], attr: { spr: 3 } }, result: '对方红着脸点了头。晚风都是甜的。', kind: 'good' },
    { text: '发一条斟酌了八百遍的消息', cond: { attr: { int: { gte: 4 } } }, effect: { setFlags: ['dating'], attr: { spr: 2 } }, result: '对方回了一个"好呀"。你盯着屏幕笑了十分钟，像个傻子。', kind: 'good' },
    { text: '再等等，万一呢', effect: { attr: { spr: -1 } }, result: '你选择了沉默。后来对方有了别人，你把那晚的话咽了一辈子。', kind: 'bad' }
  ] },
{ id: 'ev_r_marry_love', age: [24, 35], once: true, big: true, kind: 'good',
  cond: { flags: ['dating'], notFlags: ['married'] },
  text: '你们决定结婚。领证那天下了点小雨，你们在民政局门口拍了张照，红底白衬衫，笑得像两个傻子。',
  effect: { setFlags: ['married'], delFlags: ['dating'], attr: { spr: 3 } } },
{ id: 'ev_r_blind_date', age: [25, 40],
  cond: { notFlags: ['married', 'dating'] },
  text: '三姑六婆联合安排的相亲局。对方条件不错，就是聊天气氛像在开项目评审会。',
  choices: [
    { text: '条件合适，处处看', effect: { setFlags: ['married'], attr: { spr: 1 } }, result: '没有轰轰烈烈，但柴米油盐处久了，也处出了感情。你们领证了。', kind: 'good', big: true },
    { text: '礼貌告辞，单身万岁', effect: { attr: { spr: 1 } }, result: '你婉拒了对方。回家路上买了杯奶茶，自由的味道。' }
  ] },
{ id: 'ev_r_first_job', age: [22, 26], once: true, big: true,
  text: '你入职了人生第一家公司。工牌挂在胸前那一刻，你突然有点想念不用打卡的日子。',
  effect: { attr: { mny: 2 } } },
{ id: 'ev_r_996', age: [22, 40],
  text: '项目 deadline 逼近，领导在群里发："年轻人要多吃苦。"已连续加班两周的你盯着这句话。',
  choices: [
    { text: '继续肝，绩效要紧', effect: { attr: { mny: 2, str: -2, spr: -1 } }, result: '项目上线了，奖金到账了，你的发际线也向后挪了一厘米。' },
    { text: '准点下班，命是自己的', cond: { attr: { spr: { gte: 3 } } }, effect: { attr: { spr: 2, mny: -1 } }, result: '你关掉电脑走出写字楼，晚霞很美。领导的脸色不详，但你不在乎。', kind: 'good' }
  ] },
{ id: 'ev_r_landlord', age: [22, 35], kind: 'bad',
  cond: { attr: { mny: { lte: 5 } } },
  text: '房东发来消息：下季度房租涨三百。你看了看银行卡余额，又看了看房窗外的万家灯火，没有一盏是你的。',
  effect: { attr: { mny: -1, spr: -1 } } },
{ id: 'ev_r_startup', age: [24, 40],
  cond: { attr: { mny: { gte: 5 } } },
  text: '朋友拉你合伙创业，项目书写了八十页，梦想写了八百页。你手里正好有一笔积蓄。',
  choices: [
    { text: 'All in，搏一把', effect: { attr: { mny: "rand:-3~5" }, setFlags: ['startup_tried'] }, result: '你把积蓄全部投了进去。成与不成，至少这辈子不是只有工位和地铁。' },
    { text: '婉拒，稳健理财', effect: { attr: { mny: 1 } }, result: '你把这笔钱存了定期。三年后听说朋友的公司黄了，你默默取消了给他朋友圈的点赞提醒。' }
  ] },
{ id: 'ev_r_lottery', age: [18, 70], weight: 4, kind: 'good',
  cond: { attr: { luk: { gte: 6 } } },
  text: '随手买的彩票，开奖那晚你一个数字一个数字地对——全中。二等奖。你反复确认了二十遍。',
  effect: { attr: { mny: 4, spr: 3 } } },
{ id: 'ev_r_first_love_breakup', age: [18, 28], once: true, big: true, kind: 'bad',
  cond: { flags: ['first_love'], notFlags: ['married'] },
  text: '毕业季，异地，争吵，沉默。初恋终究还是没能跑赢现实。你们在校门口说再见，谁都没有回头。',
  effect: { delFlags: ['first_love'], setFlags: ['fl_broken'], attr: { spr: -3 } } },
{ id: 'ev_r_qm3', age: [17, 26], once: true, big: true, kind: 'fate',
  cond: { flags: ['qm'], notFlags: ['married', 'dating'] },
  text: '夏夜的天台，隔壁那位突然问你："我们这样，算什么关系？"蝉鸣声震耳欲聋。',
  choices: [
    { text: '"要不，我们在一起吧"', cond: { attr: { spr: { gte: 3 } } }, effect: { setFlags: ['married', 'qm_together'], delFlags: ['qm'] }, result: '从分一根冰棍到领一个红本，你们用了二十年。婚礼上，当年的冰棍成了梗。', kind: 'good' },
    { text: '"最好的朋友啊"', effect: { setFlags: ['qm_miss'], delFlags: ['qm'] }, result: '对方笑了笑说好。后来你们各自搬家、各自生活，那句话成了你心里的一个倒刺。', kind: 'bad' }
  ] },
{ id: 'ev_r_roommate', age: [20, 30],
  text: '合租室友是个奇人：凌晨三点煮螺蛳粉，袜子在客厅晾成一排旗帜。你们的友好协商进行到第八轮。',
  effect: { attr: { spr: -1, int: "rand:0~1" } } },
{ id: 'ev_r_fitness1', age: [20, 40], once: true,
  text: '体检报告上第一次出现了箭头。你咬咬牙办了张健身卡。',
  choices: [
    { text: '坚持锻炼，风雨无阻', cond: { attr: { str: { gte: 3 } } }, effect: { setFlags: ['fit'], attr: { str: 2, chr: 1 } }, result: '三个月后，你成了朋友圈的打卡博主，体能肉眼可见地回升。', kind: 'good' },
    { text: '卡办了就是练了', effect: { attr: { mny: -1, spr: -1 } }, result: '健身卡成了最贵的书签。健身房前台都替你惋惜。', kind: 'bad' }
  ] },
{ id: 'ev_r_wedding_cost', age: [25, 35],
  cond: { flags: ['married'] },
  text: '办婚礼那天，司仪煽情，亲戚催泪，账单催命。但看着身边的那个人，你觉得都值。',
  effect: { attr: { mny: -2, spr: 2 } } },
{ id: 'ev_r_civil_exam', age: [22, 30],
  text: '家里人劝你考公：宇宙的尽头是编制。你买了一箱资料，开始了题海漂流。',
  choices: [
    { text: '全力备考', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, mny: 1 } }, result: '笔试面试一路过关，你上岸了。报到第一天，你学会了泡枸杞。', kind: 'good', big: true },
    { text: '半途而废，继续打工', effect: { attr: { spr: -1 } }, result: '资料在二手平台三折出掉了。你和铁饭碗擦肩而过。' }
  ] },
{ id: 'ev_r_overwork_death', age: [25, 45], weight: 3, kind: 'bad', once: true, cond: { chance: 0.08, attr: { str: { lte: 3 } } },
  text: '连续熬夜赶项目的第三周，凌晨的工位上，你突然觉得胸口一阵剧痛，眼前的屏幕开始模糊。',
  effect: { kill: true, deathText: '积劳成疾，猝死在深夜的工位上' } },

// ========== 30-39 岁 ==========
{ id: 'ev_r_child_birth', age: [25, 40], once: true, big: true, kind: 'good',
  cond: { flags: ['married'], notFlags: ['has_child'] },
  text: '产房里一声啼哭，你的孩子出生了。你捧着那个皱巴巴的小东西，手抖得像在拆炸弹。从此，你有了软肋，也有了铠甲。',
  effect: { setFlags: ['has_child'], attr: { spr: 3, mny: -2 } } },
{ id: 'ev_r_child_name', age: [25, 40],
  cond: { flags: ['has_child'] },
  text: '为了给孩子取名，全家开了三次会，翻烂了两本字典，还重金咨询了大师。',
  choices: [
    { text: '用大师算的"梓涵"', effect: { attr: { mny: -1, spr: 1 } }, result: '开学第一天，班上有三个梓涵。你们面面相觑。' },
    { text: '自己起，就叫"一一"', effect: { attr: { spr: 2 } }, result: '名字好写好记，孩子考试写名字永远快人一步。', kind: 'good' }
  ] },
{ id: 'ev_r_mortgage', age: [28, 45], kind: 'bad',
  cond: { attr: { mny: { lte: 6 } } },
  text: '房贷合同签了二十年。你算了一笔账：从今天起，每天早上叫醒你的不是梦想，是月供。',
  effect: { attr: { mny: -2, spr: -1 } } },
{ id: 'ev_r_promotion', age: [28, 45], kind: 'good',
  text: '部门空出一个主管名额，领导找你谈话，话里话外都是考察。',
  choices: [
    { text: '主动请缨，拿出方案', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { mny: 3, spr: 2 } }, result: '你顺利升职。工位换到靠窗的位置，你给自己倒了杯茶，看了十分钟风景。', kind: 'good', big: true },
    { text: '低调观望，不争不抢', effect: { attr: { spr: -1 } }, result: '名额给了比你晚来两年的同事。你安慰自己：高处不胜寒。' }
  ] },
{ id: 'ev_r_layoff', age: [30, 50], weight: 6, kind: 'bad',
  text: '公司"组织架构优化"，你的名字出现在名单上。HR 的笑容很职业，你的工牌回收得很彻底。',
  effect: { attr: { mny: -2, spr: -3 } } },
{ id: 'ev_r_sworn3', age: [28, 45], once: true,
  cond: { flags: ['sworn'], notFlags: ['sworn_gone'] },
  text: '多年没见的结拜兄弟突然来电：有个稳赚的项目，就差你这个合伙人。',
  choices: [
    { text: '信兄弟，入伙', cond: { attr: { mny: { gte: 4 } } }, effect: { setFlags: ['sworn_partner'], attr: { mny: "rand:-2~4" } }, result: '当年的辣条盟约升级成了合同。至于赚不赚，且看天意。' },
    { text: '婉拒，友情归友情', effect: { setFlags: ['sworn_gone'], attr: { spr: -1 } }, result: '你拒绝了。从此兄弟的朋友圈对你三天可见。', kind: 'bad' }
  ] },
{ id: 'ev_r_parent_ill', age: [30, 55], once: true, kind: 'bad',
  text: '母亲体检查出问题，需要手术。你请了假守在病房外，第一次发现父母老得这么快。',
  choices: [
    { text: '砸锅卖铁也要治', effect: { attr: { mny: -3, spr: -1 } }, result: '手术很成功。缴费单很长，但母亲出院那天的阳光很好。', kind: 'good' },
    { text: '选择保守治疗', effect: { attr: { spr: -2 } }, result: '你做了最艰难的决定。往后的每个深夜，你都在问自己选得对不对。' }
  ] },
{ id: 'ev_r_temptation', age: [30, 50],
  cond: { flags: ['married'] },
  text: '出差途中，一位旧识对你频频示好，言语暧昧。酒店走廊的灯光有点昏黄。',
  choices: [
    { text: '守住底线，转身离开', effect: { attr: { spr: 1, chr: 1 } }, result: '你回房间给爱人打了个视频电话，讲了半小时废话，心里很踏实。', kind: 'good' },
    { text: '一时糊涂', effect: { attr: { spr: -2, mny: -1 } }, result: '一时的新鲜换来长久的愧疚。有些错，犯一次就刻进骨头里。', kind: 'bad' }
  ] },
{ id: 'ev_r_fl_reunion', age: [30, 50], once: true, big: true,
  cond: { flags: ['fl_broken'] },
  text: '同学聚会上，你和初恋重逢了。对方眼角有了细纹，笑起来的样子却和那年借橡皮时一模一样。',
  choices: [
    { text: '敬往事一杯酒', effect: { setFlags: ['fl_reunited'], attr: { spr: 1 } }, result: '你们像老朋友一样聊了一晚。有些人适合怀念，不适合重来。', kind: 'good' },
    { text: '借口离席', effect: { attr: { spr: -1 } }, result: '你提前走了。车里放的那首老歌，你听完才发动的车。' }
  ] },
{ id: 'ev_r_fitness2', age: [25, 55], once: true, kind: 'good',
  cond: { flags: ['fit'] },
  text: '坚持锻炼一年后，你参加公司运动会拿了名次。体检报告上的箭头，一根都没有了。',
  effect: { setFlags: ['fit_body'], attr: { str: 2, chr: 1, spr: 1 } } },
{ id: 'ev_r_cancer', age: [35, 90], weight: 4, kind: 'bad', once: true, cond: { chance: 0.08, attr: { str: { lte: 4 } } },
  text: '持续低烧半个月，检查结果出来那天，医生欲言又止。晚期。窗外的梧桐叶子落得很快。',
  effect: { kill: true, deathText: '罹患绝症，与病魔抗争后不治' } },
{ id: 'ev_r_night_snack', age: [25, 45],
  text: '加班到深夜，路边摊的烤串滋滋冒油。老板多送了两串："小伙子，别太拼。"',
  effect: { attr: { spr: 2, str: -1 } } },
{ id: 'ev_r_classmate_flex', age: [30, 45],
  text: '同学会成了凡尔赛大会：有人聊学区房，有人聊海外游。轮到你发言，全场安静。',
  choices: [
    { text: '如实说：挺好，够花', effect: { attr: { spr: 1 } }, result: '散场时当年最不起眼的老同学拍拍你：全场就你说的是人话。', kind: 'good' },
    { text: '打肿脸充胖子', effect: { attr: { mny: -1, spr: -1 } }, result: '你抢着买了单。回家路上看着账单，胃比脸疼。', kind: 'bad' }
  ] },
{ id: 'ev_r_second_child', age: [28, 42],
  cond: { flags: ['has_child', 'married'] },
  text: '家里开始讨论要不要二胎。大的那个说想要个弟弟，可以帮他写作业的那种。',
  choices: [
    { text: '生，热闹是福', cond: { attr: { mny: { gte: 4 }, str: { gte: 3 } } }, effect: { attr: { mny: -2, spr: 2 } }, result: '二娃出生后家里鸡飞狗跳，但两个孩子的笑声能掀翻屋顶。', kind: 'good' },
    { text: '一个就够，精养', effect: { attr: { spr: 1 } }, result: '你把这个话题温柔地翻了篇。独生子继续享受全家六个人的爱。' }
  ] },
{ id: 'ev_r_write1', age: [25, 45], once: true,
  text: '深夜失眠，你突然想把脑子里那个故事写出来。文档建好了，光标一闪一闪，像在催更。',
  choices: [
    { text: '写！每天两千字', cond: { attr: { int: { gte: 5 } } }, effect: { setFlags: ['writer'], attr: { int: 1, spr: 1 } }, result: '你开始了白天上班、晚上码字的双面人生。读者虽然只有两个，但你写得热血沸腾。', kind: 'good' },
    { text: '想想就算了', effect: { attr: { spr: -1 } }, result: '那个故事在文件夹里躺了很多年，名字都没改：新建文档1。' }
  ] },
{ id: 'ev_r_divorce_crisis', age: [30, 55], once: true, kind: 'bad',
  cond: { flags: ['married'] },
  text: '日复一日的琐事把感情磨出了裂痕。一次大吵之后，"离婚"两个字第一次被摆上了桌面。',
  choices: [
    { text: '坐下来，好好谈一次', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 1 } }, result: '你们谈了整整一夜，把多年的委屈倒了个干净。天亮时，决定再试试。', kind: 'good' },
    { text: '离就离', effect: { delFlags: ['married'], attr: { spr: -3, mny: -2 } }, result: '红本换绿本。走出民政局那天，你在马路牙子上坐了很久。', big: true }
  ] },

// ========== 40-49 岁 ==========
{ id: 'ev_r_midlife_crisis', age: [40, 50], once: true, big: true, kind: 'fate',
  text: '某天照镜子，你突然发现白发、肚腩和 KPI 一样顽固。上老下小，前有埋伏后有追兵——中年，就这么来了。',
  effect: { attr: { spr: -2, int: 1 } } },
{ id: 'ev_r_hair_loss', age: [35, 50], kind: 'bad',
  text: '洗头时指缝里的头发越来越多。你对着镜子数了数，决定从此只买深色的梳子，眼不见为净。',
  effect: { attr: { chr: -1 } } },
{ id: 'ev_r_child_gaokao', age: [42, 55],
  cond: { flags: ['has_child'] },
  text: '孩子高考，你比孩子还紧张。考场外你和其他家长交换眼神，像一群等待判决的陪审团。',
  choices: [
    { text: '孩子发挥出色', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { spr: 3 } }, result: '孩子考进了不错的大学。送站那天你嘴上说"赶紧走"，转身就红了眼眶。', kind: 'good', big: true },
    { text: '成绩平平，也够用了', effect: { attr: { spr: 1 } }, result: '孩子去了普通学校。你想通了：自己当年也不是状元，不也活得好好的。' }
  ] },
{ id: 'ev_r_buy_car', age: [35, 55],
  cond: { attr: { mny: { gte: 5 } } },
  text: '旧车开了十年，空调开始罢工。4S 店的销售笑得像久别重逢的亲人。',
  choices: [
    { text: '换辆好的，犒劳自己', effect: { attr: { mny: -3, spr: 2 } }, result: '新车味道真好闻。你特意绕远路回家，就为多开十分钟。', kind: 'good' },
    { text: '修修还能开', effect: { attr: { mny: 1 } }, result: '老师傅敲敲打打，旧车重获新生。你和它的革命友谊又续了五年。' }
  ] },
{ id: 'ev_r_health_check', age: [40, 60],
  text: '体检报告：血脂偏高、轻度脂肪肝。医生推了推眼镜："少应酬，多运动。"',
  choices: [
    { text: '戒酒戒肉，清淡饮食', effect: { attr: { str: 2, spr: -1 } }, result: '三个月后指标回落。你看着水煮菜，理解了什么叫"活着但不清闲"。', kind: 'good' },
    { text: '人生在世，吃喝二字', effect: { attr: { str: -2, spr: 1 } }, result: '你把报告塞进抽屉。快乐是快乐，就是裤腰带又紧了一格。', kind: 'bad' }
  ] },
{ id: 'ev_r_write2', age: [27, 50], once: true, kind: 'good',
  cond: { flags: ['writer'] },
  text: '你的小说收到了签约站短。编辑说：有潜力，保持更新。你盯着那条消息看了十遍。',
  effect: { setFlags: ['writer_signed'], attr: { mny: 1, spr: 2 } } },
{ id: 'ev_r_sworn_drift', age: [40, 60], once: true, kind: 'bad',
  cond: { flags: ['sworn_partner'] },
  text: '合伙的生意赔了个底掉，兄弟把责任推得干干净净。当年分辣条的手，如今分得最清的是利益。',
  effect: { setFlags: ['sworn_gone'], delFlags: ['sworn'], attr: { mny: -2, spr: -2 } } },
{ id: 'ev_r_parents_pass', age: [45, 65], once: true, big: true, kind: 'bad',
  text: '父亲在一个平常的清晨走了，走得很安详。整理遗物时你翻到一沓你从小到大的奖状，都用报纸包着，平平整整。',
  effect: { attr: { spr: -4 } } },
{ id: 'ev_r_fishing', age: [40, 70],
  text: '你爱上了钓鱼。一坐一整天，鱼没钓几条，但河边的风把心里的事吹散了大半。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_health_product_scam', age: [45, 75],
  text: '社区来了推销员，"包治百病"的磁疗床垫，只要两万八，还送鸡蛋。',
  choices: [
    { text: '一眼识破，顺手举报', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { spr: 1 } }, result: '你识破了骗局，还救下了正要掏钱的王大妈。鸡蛋没吃到，功德+1。', kind: 'good' },
    { text: '将信将疑，买一张试试', effect: { attr: { mny: -2, str: 1, spr: -1 } }, result: '床垫没有任何疗效，但躺上去确实软和。就当买了张贵的床垫吧。', kind: 'bad' }
  ] },
{ id: 'ev_r_qm4', age: [28, 50], once: true, big: true,
  cond: { flags: ['qm_miss'] },
  text: '多年后同学会，你和青梅重逢。对方端着酒杯走过来："当年天台上，我等的是你另一句话。"',
  choices: [
    { text: '"现在说，还来得及吗？"', cond: { notFlags: ['married'] }, effect: { setFlags: ['married'], delFlags: ['qm_miss'], attr: { spr: 3 } }, result: '兜兜转转二十年，你们终于把那天的话补上了。婚礼很简单，但你们笑得很满。', kind: 'good' },
    { text: '相视一笑，都过去了', effect: { delFlags: ['qm_miss'], attr: { spr: -1 } }, result: '有些答案过期作废。你们碰了杯，把那段岁月一饮而尽。', kind: 'fate' }
  ] },
{ id: 'ev_r_stomach', age: [35, 60], kind: 'bad',
  text: '多年的外卖加应酬，胃终于罢工抗议。胃镜室的灯很白，医生的医嘱很长。',
  effect: { attr: { str: -2 } } },
{ id: 'ev_r_executive', age: [40, 55], kind: 'good',
  cond: { attr: { mny: { gte: 7 }, int: { gte: 6 } } },
  text: '你被提拔为公司高管，名片上的头衔印得很大。庆功宴上你敬酒的手很稳，只有你知道熬了多少个通宵。',
  effect: { attr: { mny: 3, spr: 2 } } },
{ id: 'ev_r_kid_rebel', age: [40, 55],
  cond: { flags: ['has_child'] },
  text: '孩子到了叛逆期，把房门一摔："你们根本不懂我！"门板震得你太阳穴直跳。',
  choices: [
    { text: '写封信放在门口', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 1 } }, result: '第二天早上，牛奶盒上贴了张便利贴："爸/妈，对不起。"字很丑，你看了一早上。', kind: 'good' },
    { text: '对着门讲道理', effect: { attr: { spr: -1 } }, result: '你讲了四十分钟，门里传出一句："说完了吗？"你默默去厨房下了两碗面。' }
  ] },
{ id: 'ev_r_electric_shock', age: [20, 70], weight: 3, kind: 'bad', once: true, cond: { chance: 0.05 },
  text: '老房子的插座漏电，你伸手去拔插头的那一刻，一阵麻痹窜过全身。',
  effect: { kill: true, deathText: '家中线路老化，触电身亡' } },

// ========== 50-59 岁 ==========
{ id: 'ev_r_fifty', age: [50, 50], once: true, big: true,
  text: '五十岁生日。孔子说五十而知天命，你知的天命是：血压药不能停，秋裤要趁早。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r_child_marry', age: [50, 65], once: true, big: true, kind: 'good',
  cond: { flags: ['has_child'] },
  text: '孩子结婚了。婚礼上手挽手走红毯，你把孩子的手交出去那一刻，眼泪比誓词先到。',
  effect: { attr: { spr: 3, mny: -2 } } },
{ id: 'ev_r_menopause', age: [45, 55], kind: 'bad',
  cond: { gender: 'F' },
  text: '潮热、失眠、莫名的烦躁。更年期的风暴不讲道理，家人学会了看你的脸色行事。',
  effect: { attr: { spr: -2, str: -1 } } },
{ id: 'ev_r_prostate', age: [50, 70], kind: 'bad',
  cond: { gender: 'M' },
  text: '起夜的次数越来越多。医生说是这个年纪的常见问题，让你少久坐、多喝水。你默默把钓鱼的马扎换成了软垫。',
  effect: { attr: { str: -1 } } },
{ id: 'ev_r_write3', age: [30, 60], once: true, big: true, kind: 'good',
  cond: { flags: ['writer_signed'] },
  text: '你的小说突然爆了，热搜挂了三天，版权卖出七位数。读者在评论区写："大大，你是我的神。"',
  effect: { setFlags: ['writer_famous'], attr: { mny: 5, spr: 3 } } },
{ id: 'ev_r_invest_fail', age: [45, 65], kind: 'bad',
  text: '老朋友推荐的"稳赚理财"，年化百分之十八。你投进去的钱，现在连App都打不开了。',
  choices: [
    { text: '报警维权，死磕到底', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: -1, spr: -1 } }, result: '追回了一部分损失。你把"高收益高风险"六个字刻进了DNA。' },
    { text: '自认倒霉，买个教训', effect: { attr: { mny: -3, spr: -2 } }, result: '你删掉了那个App，也删掉了一个"老朋友"。' }
  ] },
{ id: 'ev_r_square_dance', age: [50, 75],
  cond: { gender: 'F' },
  text: '你加入了小区广场舞队，三个月就成了领队。音乐一响，整个广场的节奏由你掌控。',
  effect: { attr: { spr: 2, str: 1, chr: 1 } } },
{ id: 'ev_r_old_classmate', age: [50, 70],
  text: '失联三十年的老同学突然加你好友。从童年糗事聊到降压药牌子，一直聊到手机发烫。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_teeth_fall', age: [50, 70], kind: 'bad',
  text: '啃排骨时崩掉了一颗牙。你含着那颗牙看了半天：跟了你五十年的老伙计，先走一步了。',
  effect: { attr: { str: -1, mny: -1 } } },
{ id: 'ev_r_fl_final', age: [50, 70], once: true, big: true, kind: 'fate',
  cond: { flags: ['fl_reunited'] },
  text: '初恋病逝的消息传来。葬礼上你献了一束白菊，什么都没说。回家的公交车上，你把五十年的光阴从头数了一遍。',
  effect: { delFlags: ['fl_reunited'], attr: { spr: -2, int: 1 } } },
{ id: 'ev_r_early_retire', age: [50, 58],
  text: '单位推出内退政策：提前退，待遇打折。办公室里人心浮动。',
  choices: [
    { text: '退！人生下半场开场', effect: { attr: { spr: 2, mny: -1 } }, result: '办完手续那天，你把闹钟全删了。第二天自然醒，阳光好得不像话。', kind: 'good' },
    { text: '再干几年，攒足养老本', effect: { attr: { mny: 2, str: -1 } }, result: '你选择继续坚守。工资条好看了，保温杯里的枸杞更浓了。' }
  ] },
{ id: 'ev_r_climb_fall', age: [50, 70], kind: 'bad',
  text: '不服老，跟年轻人去爬野山。半山腰一脚踩空，你在骨科病房思考了半个月"服老"二字。',
  effect: { attr: { str: -2 } } },
{ id: 'ev_r_gas_poison', age: [40, 85], weight: 3, kind: 'bad', once: true, cond: { chance: 0.06 },
  text: '冬日取暖，煤炉的烟道堵了。你在睡梦中越睡越沉，再也没有醒来。',
  effect: { kill: true, deathText: '煤气中毒，在睡梦中悄然离世' } },
{ id: 'ev_r_silver_wedding', age: [50, 60], once: true, big: true, kind: 'good',
  cond: { flags: ['married'] },
  text: '结婚二十五周年，银婚。你们翻出当年的结婚照，你笑话对方当年的发型，对方笑话你当年的腰围。',
  effect: { attr: { spr: 3 } } },

// ========== 60-69 岁 ==========
{ id: 'ev_r_retire', age: [58, 62], once: true, big: true, kind: 'fate',
  text: '正式退休了。最后一天你把工位收拾得干干净净，抱着纸箱走出大门。三十多年的职场，落幕得安安静静。',
  effect: { attr: { spr: 2, mny: 1 } } },
{ id: 'ev_r_grandchild', age: [55, 75], once: true, big: true, kind: 'good',
  cond: { flags: ['has_child'] },
  text: '孙辈出生了。你抱着那个软乎乎的小家伙，他冲你吐了个泡泡。含饴弄孙的日子，从此有了具体的形状。',
  effect: { attr: { spr: 4 } } },
{ id: 'ev_r_telecom_scam', age: [60, 80],
  text: '电话那头自称"警官"，说你涉嫌洗钱，要把钱转到"安全账户"。',
  choices: [
    { text: '挂断并报警', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 1 } }, result: '你识破了骗局。社区民警还请你给老街坊们讲了防骗课。', kind: 'good' },
    { text: '慌了神，照做', effect: { attr: { mny: -3, spr: -2 } }, result: '养老钱被骗走大半。你在派出所做笔录时，手一直在抖。', kind: 'bad' }
  ] },
{ id: 'ev_r_dance_star', age: [60, 75], kind: 'good',
  text: '你的广场舞视频被孙女发上网，意外火了。评论区喊你"最飒大爷/大妈"。你一夜之间成了小区顶流。',
  effect: { attr: { spr: 2, chr: 1 } } },
{ id: 'ev_r_demolition', age: [55, 75], weight: 5, kind: 'good',
  cond: { attr: { mny: { lte: 6 } } },
  text: '住了大半辈子的老房子划入拆迁范围。补偿款到账那天，你围着老屋转了三圈，跟每块砖道了别。',
  effect: { attr: { mny: 5, spr: 1 } } },
{ id: 'ev_r_hypertension', age: [55, 75], kind: 'bad',
  text: '血压计上的数字越来越高。从此你的生活多了三样东西：降压药、限盐勺、和子女的唠叨。',
  effect: { attr: { str: -1 } } },
{ id: 'ev_r_old_photos', age: [60, 85],
  text: '整理旧物翻出一盒老照片：黑白的毕业照、泛黄的结婚照、孩子掉门牙的傻照。你坐在地板上看到了天黑。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_volunteer', age: [60, 75], kind: 'good',
  text: '你报名当了社区志愿者，红袖章一戴，帮邻里调解纠纷、指路、看孩子。你成了整条街的"定海神针"。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_sworn4', age: [60, 80], once: true, big: true,
  cond: { flags: ['sworn'], notFlags: ['sworn_gone'] },
  text: '结拜兄弟约你小聚。三个老头点了三根辣条当下酒菜，笑出满脸褶子。当年的盟约，兑现了一辈子。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r_memory_decline', age: [60, 80], kind: 'bad',
  text: '你开始忘事：出门忘带钥匙，烧水忘关火。你把重要的东西都写下来贴在冰箱上，冰箱门成了你的外置大脑。',
  effect: { attr: { int: -1 } } },
{ id: 'ev_r_hip_fracture', age: [60, 85], kind: 'bad',
  text: '卫生间地滑，你摔了一跤，股骨骨折。卧床的三个月里，你第一次认真打量了天花板的每一道裂纹。',
  effect: { attr: { str: -2, spr: -1 } } },
{ id: 'ev_r_stroke', age: [60, 100], weight: 4, kind: 'bad', once: true, cond: { chance: 0.15, notFlags: ['has_box'], attr: { str: { lte: 4 } } },
  text: '清晨起床，你突然觉得半边身子不听使唤，嘴也歪了。救护车的鸣笛声由远及近，又渐渐远去。',
  effect: { kill: true, deathText: '突发脑溢血，抢救无效' } },
{ id: 'ev_r_golden_wedding', age: [60, 75], once: true, big: true, kind: 'good',
  cond: { flags: ['married'] },
  text: '结婚五十周年，金婚。子孙们张罗了一桌酒席，你们被起哄着喝了交杯酒。五十年，吵过闹过，没散过。',
  effect: { attr: { spr: 4 } } },

// ========== 70-79 岁 ==========
{ id: 'ev_r_seventy', age: [70, 70], once: true, big: true,
  text: '七十岁生日。人生七十古来稀，你给自己倒了半杯酒：往后每一天，都是赚来的。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_grandchild_school', age: [65, 80],
  cond: { flags: ['has_child'] },
  text: '接送孙辈上下学成了你的新工作。校门口一群老头老太太，你很快有了自己的"接娃搭子"。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_friends_gone', age: [70, 90], kind: 'bad',
  text: '老伙计们一个接一个地走了。电话本里有些名字，你舍不得删，偶尔翻到，就停下来发一会儿呆。',
  effect: { attr: { spr: -2 } } },
{ id: 'ev_r_calligraphy', age: [65, 85],
  text: '你报了老年大学的书法班。第一堂课写了张"宁静致远"，老师说有股子拙劲。你把它裱起来挂在客厅。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r_four_generation', age: [70, 90], weight: 5, once: true, big: true, kind: 'good',
  cond: { flags: ['has_child'] },
  text: '四世同堂的全家福。你坐在正中间，怀里抱着重孙。快门按下的那一刻，你觉得这辈子值了。',
  effect: { attr: { spr: 4 } } },
{ id: 'ev_r_bad_legs', age: [70, 90], kind: 'bad',
  text: '膝盖开始预报天气，比气象台还准。上下楼成了一项需要扶着栏杆慢慢完成的工程。',
  effect: { attr: { str: -1 } } },
{ id: 'ev_r_story_time', age: [70, 90], kind: 'good',
  cond: { flags: ['has_child'] },
  text: '孙辈缠着你讲"以前的故事"。你把那些苦日子讲成了冒险故事，小家伙听得眼睛发亮。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_heart_attack', age: [65, 100], weight: 4, kind: 'bad', once: true, cond: { chance: 0.15, notFlags: ['has_box'], attr: { str: { lte: 5 } } },
  text: '胸口一阵熟悉的绞痛，比以往任何一次都猛烈。你扶着墙慢慢滑坐在地上，眼前渐渐黑了下去。',
  effect: { kill: true, deathText: '突发心梗，撒手人寰' } },
{ id: 'ev_r_life_review', age: [70, 95],
  text: '失眠的夜里，你把这辈子从头过了一遍：得意的事、后悔的事、来不及做的事。',
  choices: [
    { text: '有遗憾，但不亏', effect: { attr: { spr: 2 } }, result: '你跟自己达成了和解。天亮后，你睡了个好觉。', kind: 'good' },
    { text: '越想越意难平', effect: { attr: { spr: -2 } }, result: '天快亮了你才迷糊过去。有些账，一辈子都算不平。', kind: 'bad' }
  ] },
{ id: 'ev_r_old_cat', age: [70, 95],
  text: '一只老猫常来你阳台晒太阳，赶也赶不走。后来它成了你的固定室友，你们各晒各的太阳，互不打扰。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_denture', age: [70, 90],
  text: '你配了假牙。第一顿饭吃得小心翼翼，孙子问："爷爷你怎么嚼得像只仓鼠？"全家笑作一团。',
  effect: { attr: { spr: 1, str: 1 } } },
{ id: 'ev_r_spouse_pass', age: [65, 90], once: true, big: true, kind: 'bad',
  cond: { flags: ['married'] },
  text: '老伴走了。饭桌上从此少了一副碗筷，你盛饭时还是会习惯性地多盛半碗，然后怔怔地看很久。',
  effect: { delFlags: ['married'], attr: { spr: -4, str: -1 } } },

// ========== 80-89 岁 ==========
{ id: 'ev_r_eighty', age: [80, 80], once: true, big: true,
  text: '八十岁，耄耋之年。生日宴上子孙满堂，你颤巍巍地吹蜡烛，许的愿是：明年还能坐在这儿吹。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_longevity_interview', age: [80, 95],
  text: '本地电视台来采访你的长寿秘诀。镜头怼到脸上，主持人一脸期待。',
  choices: [
    { text: '"心态好，不生气"', effect: { attr: { spr: 2 } }, result: '节目播出后你成了社区名人。邻居见面就问：今天心态好吗？', kind: 'good' },
    { text: '"主要因为我命硬"', effect: { attr: { spr: 1 } }, result: '主持人愣了三秒，观众笑成一片。这段采访在网上小范围出圈。' }
  ] },
{ id: 'ev_r_alzheimer', age: [75, 95], once: true, kind: 'bad',
  text: '记忆像被虫子蛀的老照片，一块一块地消失。你还认得儿女，但开始叫不出孙辈的名字。你随身带着一张写满名字的卡片。',
  effect: { attr: { int: -2, spr: -2 } } },
{ id: 'ev_r_family_dinner', age: [75, 95], kind: 'good',
  text: '周末全家回来吃饭，三张桌子拼在一起才坐得下。你坐在主位，看着一屋子吵吵嚷嚷的人，觉得这就是江山。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r_old_photo_viral', age: [80, 95],
  text: '孙女把你年轻时的照片发上网："我爷爷/奶奶年轻时也太帅/美了吧！"点赞破了十万。你对着老照片端详半天：啧，确实。',
  effect: { attr: { spr: 2, chr: 1 } } },
{ id: 'ev_r_old_fall', age: [80, 95], kind: 'bad',
  text: '夜里起床没开灯，你摔了一跤。这一跤之后，轮椅和拐杖正式加入了你的生活。',
  effect: { attr: { str: -2 } } },
{ id: 'ev_r_peaceful_death', age: [80, 100], weight: 5, kind: 'fate', once: true, cond: { chance: 0.35, notFlags: ['has_box'] },
  text: '一个寻常的午后，你躺在摇椅上晒太阳，手里的蒲扇慢慢停了。你走得很安详，像睡着了一样。',
  effect: { kill: true, deathText: '在午后的阳光里安详离世，寿终正寝' } },
{ id: 'ev_r_great_grandchild', age: [80, 98], once: true, big: true, kind: 'good',
  cond: { flags: ['has_child'] },
  text: '玄孙出生了。五代人的照片摆了一墙，你从襁褓里的那一个，活成了最中间的那一个。',
  effect: { attr: { spr: 4 } } },
{ id: 'ev_r_write_will', age: [75, 95], once: true,
  text: '你决定立一份遗嘱。律师问财产怎么分，你摆摆手：先写第一句——"我这辈子，没白活。"',
  choices: [
    { text: '平均分给孩子们', effect: { attr: { spr: 1 } }, result: '遗嘱立好了，你心里一块石头落了地。当晚多吃了一碗饭。', kind: 'good' },
    { text: '捐一部分给公益', effect: { attr: { spr: 2 } }, result: '你把一部分积蓄留给了山区助学。钱带不走，善意可以。', kind: 'good' }
  ] },
{ id: 'ev_r_eighty_banquet', age: [80, 89], once: true, big: true, kind: 'good',
  text: '八十大寿，子孙们摆了十桌。你穿着崭新的唐装挨桌敬酒，说的最多的一句是："都多吃点儿。"',
  effect: { attr: { spr: 3, mny: 1 } } },
{ id: 'ev_r_wisdom', age: [80, 98],
  text: '年轻人来向你请教人生经验。你想了半天，说："别熬夜，对人好点，想吃啥就吃点啥。"',
  effect: { attr: { spr: 1, int: 1 } } },
{ id: 'ev_r_hearing_loss', age: [80, 95],
  text: '耳朵越来越背，别人说话你总听岔。孙子喊"爷爷吃饭了"，你听成"爷爷出发了"，逗得全家直乐。',
  effect: { attr: { spr: 1, int: -1 } } },

// ========== 90-100 岁 ==========
{ id: 'ev_r_ninety', age: [90, 90], once: true, big: true,
  text: '九十岁，鲐背之年。你是整个家族行走的年鉴，谁家孩子该管谁叫舅，都得来问你。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_centenarian', age: [100, 100], once: true, big: true, kind: 'good',
  text: '一百岁了。生日那天来了好多人，红绸子挂满了院子。你握着一把糖果分给孩子们，就像一百年前有人分给你那样。',
  effect: { attr: { spr: 5 } } },
{ id: 'ev_r_tv_visit', age: [95, 100],
  text: '重阳节，电视台又来采访。你对着镜头慢悠悠地说："上回那个主持人呢？退休了？哦，我还活着呢。"',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_oldest_in_town', age: [92, 100], kind: 'good',
  text: '你成了全镇最长寿的人。逢年过节，镇上都派人来慰问，你坐在太师椅上接受敬意，派头十足。',
  effect: { attr: { spr: 2, mny: 1 } } },
{ id: 'ev_r_secret_dance', age: [90, 100],
  text: '有人问你长寿的终极秘诀。你神秘一笑："每天早上，跟着收音机扭半小时。"',
  effect: { attr: { str: 1, spr: 1 } } },
{ id: 'ev_r_five_generation', age: [90, 100], weight: 5, once: true, big: true, kind: 'good',
  cond: { flags: ['has_child'] },
  text: '五世同堂。最小的那个还不会说话，最大的你已经看惯百年风云。一家人围着一张大圆桌，像一棵大树的所有年轮。',
  effect: { attr: { spr: 5 } } },
{ id: 'ev_r_no_illness_death', age: [90, 100], weight: 4, kind: 'fate', once: true, cond: { chance: 0.45, notFlags: ['has_box'] },
  text: '夜里你做了个很长的梦，梦见年轻时走过的所有路。清晨，阳光照进房间，你没有醒来，脸上带着笑。',
  effect: { kill: true, deathText: '无疾而终，油尽灯枯' } },
{ id: 'ev_r_memory_lane', age: [90, 100],
  text: '午后你靠在床头，一生的画面像走马灯：第一声啼哭、第一张奖状、新婚的红烛、孩子的孩子……你慢慢数，慢慢笑。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r_still_chess', age: [90, 100],
  text: '楼下棋摊，你执黑，一步"当头炮"把老对手将得抓耳挠腮。九十多岁了，杀气不减当年。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r_great_great_call', age: [90, 100], kind: 'good',
  cond: { flags: ['has_child'] },
  text: '玄孙奶声奶气地喊了一声"太爷爷/太奶奶"。这一声，你等了快一个世纪。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r_ninety_banquet', age: [90, 94], once: true, big: true, kind: 'good',
  text: '九十大寿，寿桃堆成了小山。你胃口不错，多吃了半碗长寿面。全场鼓掌，像在看一场奇迹。',
  effect: { attr: { spr: 3, str: 1 } } },
{ id: 'ev_r_old_friend_letter', age: [90, 100],
  text: '收到一封手写的信，是年轻时老朋友的孩子写来的："我父亲生前总念叨您。"你把信读了三遍，让孙子替你回了信。',
  effect: { attr: { spr: 1 } } }

/* 补充：0-9 岁无条件事件，保证幼年期覆盖 */
,{ id: 'ev_r_learn_walk', age: [1, 2], once: true,
  text: '你摇摇晃晃地迈出了人生第一步，全家人围着你鼓掌，仿佛你刚拿了奥运冠军。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_babble', age: [1, 3], once: true,
  text: '你含糊不清地喊出了人生第一句话。至于喊的是"爸爸"还是"妈妈"，家里为此争论了三个月。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_candy', age: [3, 8],
  text: '你用攒了好久的零花钱买了一颗糖，含在嘴里，觉得整个世界都是甜的。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_mud', age: [3, 9],
  text: '你在泥坑里打滚玩了一下午，回家时像从兵马俑坑里爬出来的。母亲欲打又止。',
  effect: { attr: { spr: 1, str: 1 } } },
{ id: 'ev_r_cartoon', age: [4, 10],
  text: '你迷上了动画片，每天准时守在电视机前，这是你人生中第一个固定节目。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_hide_seek', age: [4, 9],
  text: '捉迷藏时你躲得太好，小伙伴们找不着你，你自己在柜子里睡着了。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_loose_tooth', age: [6, 9], once: true,
  text: '你掉了第一颗牙。大人说上牙的牙要扔到床底下，你照做了，并认真期待新牙快点长出来。',
  effect: {} },
{ id: 'ev_r_school_first', age: [6, 8], once: true,
  text: '第一天上学，你背着比你还宽的书包，一步三回头地走进了校门。',
  effect: { attr: { int: 1 } } },
{ id: 'ev_r_firefly', age: [5, 12],
  text: '夏夜你捉到一只萤火虫，装在玻璃瓶里看了一整晚。第二天它飞走了，你难过了五分钟。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r_new_year_kid', age: [4, 12],
  text: '过年了，你收到压岁钱，郑重地交给了妈妈"保管"。多年后你才懂这笔钱的去向。',
  effect: { attr: { spr: 1 } } }

/* ========== 第二轮扩充：当代生活与新梗（ev_r2_ 前缀） ==========
   本批连锁 flag：
     考证线：r2_cert -> r2_cert_pass
     摆摊线：r2_stall -> r2_stall_master
     骑行线：r2_ride -> r2_ride_pro
     养猫线：r2_cat（流浪猫来福，直至终老）
*/

// ---- 童年新事 ----
,{ id: 'ev_r2_kid_card', age: [5, 12],
  text: '班里掀起了集卡热，一张稀有卡在同学眼里比满分试卷还硬通货。你攥着零花钱站在小卖部的卡包货架前。',
  choices: [
    { text: '端盒！整盒包圆', cond: { attr: { mny: { gte: 4 } } }, effect: { attr: { mny: -1, spr: 2 } }, result: '你抱着整盒卡回教室，被围得水泄不通。那一刻，你是全班的小卡王。', kind: 'good' },
    { text: '买一包，听天由命', effect: { attr: { spr: 1 } }, result: '一包入魂，你抽中了传说款。同桌出五块钱收购，你毅然拒绝。' },
    { text: '自制"手绘卡"', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '你的手绘卡意外走俏，还接了三个"定制单"。班主任没收时说：画得确实好。' }
  ] },
{ id: 'ev_r2_kid_ge', age: [6, 12],
  text: '表哥失恋了在家emo，你端了杯水递过去："哥哥别难过，你还年轻，下一个更乖。"全家愣住，从此管你叫"小孩哥/小孩姐"。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r2_kid_live', age: [6, 12],
  text: '你偷拿妈妈的手机看直播，主播突然对着镜头喊："那个叫快乐小孩的，别刷礼物，快写作业去！"你吓得把手机塞回了沙发缝。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r2_kid_game', age: [6, 12],
  text: '你迷上了派对手游，每天和同学联机冲段位，约定谁先掉段谁请辣条。',
  choices: [
    { text: '苦练技术，冲击全服榜', effect: { attr: { spr: 2, int: -1 } }, result: '你打进了全服前一千，代价是数学作业错了一半。', kind: 'bad' },
    { text: '见好就收，作业优先', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: -1 } }, result: '你忍痛下线。第二天听说同桌通宵上分被他妈收了手机，你逃过一劫。' }
  ] },

// ---- 学生时代 ----
{ id: 'ev_r2_malou', age: [13, 19],
  text: '晚自习你刷到吗喽表情包，笑得在课桌底下直抽。同桌凑过来看了一眼，两个人一起抽。班主任幽幽地说："后面那两只吗喽，上来做题。"',
  effect: { attr: { spr: 2, int: -1 } } },
{ id: 'ev_r2_relax_exam', age: [15, 19],
  text: '月考砸了，你却意外平静。同桌说你身上有股"松弛感"。你说这叫尽力之后的坦然——其实卷子背面还有半面没写完。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r2_short_video', age: [13, 19], kind: 'bad',
  text: '说好只刷十分钟短视频，再抬头天已经蒙蒙亮。算法比你妈还懂你。',
  effect: { attr: { str: -1, int: -1 } } },
{ id: 'ev_r2_tice', age: [16, 22],
  text: '体测一千米，你跑到一半感觉灵魂出窍。校医说指标正常，就是"缺乏锻炼"，俗称：脆。',
  choices: [
    { text: '从此每天夜跑', cond: { attr: { str: { gte: 3 } } }, effect: { attr: { str: 2, spr: 1 } }, result: '一个月后你跑进了班级前十，顺便收获了好气色。', kind: 'good' },
    { text: '命要紧，少走两步', effect: { attr: { spr: 1, str: -1 } }, result: '你把"脆皮"二字焊在了自己身上，爬三层楼都开始喘。' }
  ] },
{ id: 'ev_r2_kaoyan', age: [20, 26],
  text: '宿舍六个人，五个在考研。图书馆的座位要靠抢，走廊里全是背书的回声。',
  choices: [
    { text: '加入考研大军', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, spr: -1 } }, result: '你成了走廊背书团的一员。上岸与否尚未可知，但英语底子实打实厚了。' },
    { text: '不考，直接找工作', effect: { attr: { mny: 1, spr: 1 } }, result: '你绕过独木桥直奔职场。三年后他们毕业时，你已经是个小组长了。', kind: 'good' }
  ] },
{ id: 'ev_r2_crispy', age: [18, 25],
  text: '一个喷嚏下去，你把腰闪了。室友一边笑一边扶你去校医院："这就是传说中的脆皮大学生吧。"',
  effect: { attr: { str: -1, spr: -1 } } },
{ id: 'ev_r2_guzi', age: [14, 28],
  text: '你一头扎进谷子店：吧唧、立牌、色纸……挑了两小时，结账时发现这个月伙食费变成了铁皮和亚克力。',
  effect: { attr: { mny: -1, spr: 2 } } },

// ---- 打工青年图鉴 ----
{ id: 'ev_r2_diagnose', age: [18, 30],
  text: '最近流行"确诊文学"。朋友盯着你看了三秒，郑重宣布："我正式确诊你为——"',
  choices: [
    { text: '"浓人"：爱恨分明', effect: { attr: { spr: 1, chr: 1 } }, result: '你确实能为一杯好奶茶写三百字好评，能为朋友的委屈气到失眠。浓得化不开。', kind: 'good' },
    { text: '"淡人"：行、好、都可以', effect: { attr: { spr: 1, int: 1 } }, result: '你人生最大的波澜是外卖少送了吸管。淡淡的，很安心。' },
    { text: '"吗喽"：打工猴本猴', effect: { attr: { spr: -1, str: 1 } }, result: '你看了看自己的加班记录，无法反驳。吗喽的命也是命，你决定今晚早睡。' }
  ] },
{ id: 'ev_r2_banwei', age: [22, 35],
  text: '周末和朋友逛街，对方盯着你看了半天："你身上一股班味，隔着三里地都闻得到。"',
  choices: [
    { text: '报复性休息，睡到自然醒', effect: { attr: { spr: 2, str: 1 } }, result: '你昏天黑地睡了一整天。醒来觉得班味淡了些，人味浓了些。', kind: 'good' },
    { text: '健身加理发，物理去味', cond: { attr: { mny: { gte: 4 } } }, effect: { attr: { mny: -1, chr: 1, spr: 1 } }, result: '新发型一剪，汗流一场。你照镜子：嗯，像个人了。', kind: 'good' },
    { text: '摆烂，班味是保护色', effect: { attr: { spr: -1 } }, result: '你继续穿着皱衬衫出门。班味没散，还添了点班锈。', kind: 'bad' }
  ] },
{ id: 'ev_r2_spirit_quit', age: [23, 40],
  text: '你想通了：人在工位，心在洱海。从此开启"精神离职"模式——活儿照干，灵魂免打扰。',
  choices: [
    { text: '省下的精力拿去搞副业', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 1, int: 1 } }, result: '下班后的三小时成了你的第二人生。副业虽小，每一分都是自己的。', kind: 'good' },
    { text: '纯粹躺平，到点就走', effect: { attr: { spr: 2, mny: -1 } }, result: '绩效打了个中游，但你重获了晚饭和晚霞。值不值，胃说了算。' }
  ] },
{ id: 'ev_r2_gap_year', age: [20, 30],
  text: '身边有人辞职去 gap year：旅行、义工、学潜水。你也动了心，银行卡余额却欲言又止。',
  choices: [
    { text: '说走就走，穷游一年', cond: { attr: { mny: { gte: 5 } } }, effect: { attr: { mny: -3, spr: 3, int: 1 } }, result: '你住青旅、搭顺风车，在海边看了一整个夏天的日落。钱花光了，人长回来了。', kind: 'good', big: true },
    { text: '云gap：周末也算gap', effect: { attr: { spr: 1 } }, result: '你把周边两小时车程的地方走了个遍。精神gap，也是gap。' },
    { text: '不了，班还得上', effect: { attr: { mny: 1, spr: -1 } }, result: '你把人家的vlog看了三十遍，然后默默打开了工作文档。' }
  ] },
{ id: 'ev_r2_fulltime_child', age: [22, 35],
  text: '求职屡屡碰壁，你索性回家当"全职儿女"：陪买菜、陪遛弯、按月领"亲情工资"。',
  choices: [
    { text: '认真上岗，把爸妈哄好', effect: { attr: { spr: 2, mny: 1 } }, result: '家里被你打理得井井有条，爸妈逢人就夸。这份工，情绪价值拉满。', kind: 'good' },
    { text: '边当儿女边备考', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: -1 } }, result: '白天陪妈逛超市，晚上刷题到深夜。两头都不耽误，就是头发有点意见。' },
    { text: '受不了唠叨，搬出去', effect: { attr: { mny: -1, spr: -1 } }, result: '自由的代价是房租。你又开始自己做饭、自己修马桶。' }
  ] },
{ id: 'ev_r2_neiho', age: [20, 40],
  text: '深夜你躺在床上复盘白天说过的话：那句"好的"是不是太冷淡？对方会不会多想？……三点了，你还在内耗。',
  choices: [
    { text: '写下来，逐条反驳自己', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '写着写着你发现：九成的担忧都不会发生。笔记本一合，倒头睡着。', kind: 'good' },
    { text: '直接问当事人', cond: { attr: { chr: { gte: 4 } } }, effect: { attr: { spr: 1 } }, result: '对方回："啊？我没注意啊。"你内耗三天，对方三秒翻篇。', kind: 'good' },
    { text: '继续耗着', effect: { attr: { spr: -2, str: -1 } }, result: '你在脑内把同一件事演了八个版本，每个版本的结局都很糟。', kind: 'bad' }
  ] },
{ id: 'ev_r2_ai_anxiety', age: [22, 45],
  text: 'AI一天一个样，同事开始用它写周报。你刷到一篇文章：《你的工作还能撑几年？》',
  choices: [
    { text: '打不过就加入，学着用', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, mny: 1 } }, result: '你把AI调教成了免费实习生，周报十分钟搞定。省下的时间用来充电——好吧，摸鱼。', kind: 'good' },
    { text: '打磨不可替代的手艺', cond: { attr: { int: { gte: 4 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '你把看家本事磨得更扎实。机器再快，人情练达它学不会。' },
    { text: '焦虑地刷更多文章', effect: { attr: { spr: -2 } }, result: '你收藏了五十篇"AI时代生存指南"，一篇没看完，焦虑倒是拉满了。', kind: 'bad' }
  ] },
{ id: 'ev_r2_coffee', age: [20, 45],
  text: '早八的命是冰美式给的。你端着咖啡挤进地铁，觉得自己的血液里一半是咖啡因，一半是周报。',
  effect: { attr: { spr: 1, str: -1 } } },
{ id: 'ev_r2_ele_mustard', age: [18, 45],
  text: '没有下饭视频，你一口饭都吃不下去。今天的电子榨菜是考古综艺，不知不觉炫了两碗。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r2_side_gig', age: [22, 45],
  text: '全网都在搞副业：有人下班摆摊，有人周末跟拍，有人给宠物当临时家长。你盘点了一下自己的技能树。',
  choices: [
    { text: '发挥特长，接单搞钱', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 2, spr: 1 } }, result: '第一桶金到账那天，你给自己加了俩鸡腿。副业不大，腰杆粗了一圈。', kind: 'good' },
    { text: '技能不够，先学一门', effect: { attr: { int: 1, spr: -1 } }, result: '你报了门网课。能不能变现不知道，至少简历多了一行。' },
    { text: '主业都累瘫，不搞', effect: { attr: { spr: 1 } }, result: '你把"搞钱"的帖子刷过去，翻了个身。休息也是一种投资。' }
  ] },
{ id: 'ev_r2_dazi', age: [18, 45], kind: 'bad',
  text: '你的饭搭子离职了。从此食堂的麻辣烫不香了，奶茶第二杯半价也没人拼了。成年人的世界，搭子散伙堪比失恋。',
  effect: { attr: { spr: -2 } } },
{ id: 'ev_r2_short_drama', age: [18, 75],
  text: '你点开一部短剧：《赘婿归来，丈母娘跪求原谅》。一集一分钟，你一口气刷了八十集，还付了九块九解锁大结局。',
  effect: { attr: { mny: -1, spr: "rand:-1~2" } } },
{ id: 'ev_r2_temple_coffee', age: [18, 40],
  text: '寺庙旁的咖啡店排起长队，你点了一杯招牌"慈杯"，在功德箱旁的长椅上喝完。玄学没学到，照片拍了一组。',
  effect: { attr: { spr: 1, mny: -1 } } },
{ id: 'ev_r2_shouchuan', age: [18, 45],
  text: '你入手了人生第一串手串，从此走哪盘哪。同事说你身上有股超出年龄的祥和。',
  effect: { attr: { spr: 1 } } },

// ---- 外卖与直播间 ----
{ id: 'ev_r2_takeout_note', age: [18, 50], kind: 'good',
  text: '备注随手写了句"今天生日，求画个小画"。外卖到了，袋子上真的画了个歪歪扭扭的蛋糕，还有一行字："生日快乐，要开心哦。"',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r2_takeout_rider', age: [18, 55],
  text: '暴雨天，骑手晚到了二十分钟，浑身湿透，连声道歉，说超时要被扣钱。',
  choices: [
    { text: '没事，再塞瓶热饮', effect: { attr: { spr: 2 } }, result: '他鞠了一躬转身冲进雨里。你关上门，心里热乎乎的。', kind: 'good' },
    { text: '理解，但赔付照领', effect: { attr: { mny: 1, spr: -1 } }, result: '赔付到账三块八。你看着窗外的雨，觉得这钱有点烫手。' },
    { text: '反手一个差评', effect: { attr: { spr: -2 } }, result: '当晚你刷到一条推送：《暴雨天，请对骑手多点耐心》。你默默撤回了差评。', kind: 'bad' }
  ] },
{ id: 'ev_r2_live_room', age: [20, 65],
  text: '主播喊着"最后一百单！三、二、一，上链接！"你手指悬在屏幕上，心跳加速。',
  choices: [
    { text: '抢！手慢无', effect: { attr: { mny: -2, spr: "rand:-1~2" } }, result: '快递到了才发现，家里已经有三瓶同款。直播间的"划算"自带魔法。' },
    { text: '冷静，先放购物车', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 1, spr: 1 } }, result: '三天后再看，已经不想买了。购物车成了你的冷静期。', kind: 'good' },
    { text: '只看不买，主打陪伴', effect: { attr: { spr: 1 } }, result: '你看主播喊了一晚上，一分钱没花。他是懂表演的，你是懂白嫖的。' }
  ] },

// ---- 潮流玩法 ----
{ id: 'ev_r2_script_kill', age: [18, 35],
  text: '朋友攒局玩剧本杀，你抽到凶手本。主持人宣布开始搜证，全场的目光不经意扫过你。',
  choices: [
    { text: '影帝附体，带偏全场', cond: { attr: { chr: { gte: 5 } } }, effect: { attr: { chr: 1, spr: 2 } }, result: '你声泪俱下地指控了无辜的会计，全场信以为真。散场后朋友扬言和你绝交三天。', kind: 'good' },
    { text: '逻辑碾压，自证清白', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '你用时间线把嫌疑摘得干干净净，还顺手盘出了真凶——主持人说你抢了他的活儿。', kind: 'good' },
    { text: '紧张到自爆', effect: { attr: { spr: -1 } }, result: '三轮不到你就自爆了。全场笑疯，你的演技被永久钉在耻辱柱上。', kind: 'bad' }
  ] },
{ id: 'ev_r2_escape_room', age: [18, 35],
  text: '恐怖主题密室，NPC从暗门扑出来的瞬间，全队的叫声掀翻了屋顶。',
  choices: [
    { text: '当人肉坦克，护住全队', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { str: 1, spr: 2 } }, result: '你顶着NPC的贴脸杀破完所有机关。队友封你为"密室之光"。', kind: 'good' },
    { text: '动脑不动腿，专攻解谜', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '密码锁、机关盒被你一个个拆开。至于鬼，让胆子大的去对付。', kind: 'good' },
    { text: '缩在角落当挂件', effect: { attr: { spr: -1, chr: 1 } }, result: '你全程抱着队友的胳膊。虽然怂，但你们拿了"最佳气氛组"。' }
  ] },
{ id: 'ev_r2_camping', age: [20, 45],
  text: '周末去郊外露营，帐篷搭了俩小时，天幕被风吹跑三次。但夜幕降临，篝火一点，全值了。',
  choices: [
    { text: '过夜，看星星', effect: { attr: { spr: 3, str: -1 } }, result: '银河就在头顶。你躺在防潮垫上听了一夜虫鸣，冻醒三次也没后悔。', kind: 'good' },
    { text: '日归，回家睡床', effect: { attr: { spr: 1 } }, result: '烧烤吃完就收摊。你摸到了露营的精髓：体验过，就行。' }
  ] },
{ id: 'ev_r2_stove_tea', age: [22, 55],
  text: '入冬，你约好友围炉煮茶。橘子、年糕、板栗在炭火上烤得滋滋作响。一下午什么都没干，又好像干了很重要的事。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r2_special_tour', age: [18, 30],
  text: '"特种兵旅游"正流行。你规划了三天四城：周五下班冲火车站，周一早上直接进公司。',
  choices: [
    { text: '冲！青春没有售价', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { str: -1, spr: 3, mny: -1 } }, result: '三天打卡十七个景点，步数霸榜。周会上你睡着了，但相册满了。', kind: 'good' },
    { text: '一天一城，悠着点', effect: { attr: { spr: 2, mny: -1 } }, result: '慢下来才发现，最好吃的那碗面根本不在攻略里。', kind: 'good' },
    { text: '在家云旅游', effect: { attr: { spr: 1 } }, result: '你窝在沙发刷完所有攻略视频，点了份当地特产外卖。赛博特种兵。' }
  ] },
{ id: 'ev_r2_citywalk', age: [20, 50],
  text: '周末你来了场citywalk：不导航，随缘走。老巷子的猫、开了三十年的理发店、墙角一丛野菊，都是盲盒。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r2_blind_box', age: [15, 35],
  text: '路过盲盒机，最想要的隐藏款概率是1/144。你盯着玻璃柜里的样品，挪不动腿。',
  choices: [
    { text: '抽一发，听天由命', effect: { attr: { mny: -1, spr: "rand:-1~3" } }, result: '撕开包装的那一刻，心跳比表白还快。' },
    { text: '直接端盒', cond: { attr: { mny: { gte: 6 } } }, effect: { attr: { mny: -2, spr: 2 } }, result: '一盒十二个，整整齐齐。隐藏款没出，但你收获了十二个"也不错"。' },
    { text: '拍照即拥有', effect: { attr: { spr: 1 } }, result: '你对着样品拍了九宫格发朋友圈。云抽盒，零成本。' }
  ] },
{ id: 'ev_r2_cat_cafe', age: [18, 45],
  text: '猫咖里，一只大橘巡视一圈，跳上你的腿团成一团，呼噜声像台小拖拉机。你一动不敢动，腿麻了也幸福。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r2_dog_walk', age: [20, 65],
  text: '帮邻居遛狗，结果狗子的人脉比你广：一路认识了柯基、边牧和三只金毛的主人。你被拉进了小区遛狗群。',
  effect: { attr: { spr: 2, chr: 1 } } },
{ id: 'ev_r2_food_queue', age: [18, 55],
  text: '全城最火的馆子要排三小时。你取了个号：前面还有187桌。',
  choices: [
    { text: '排！来都来了', effect: { attr: { spr: 2, str: -1, mny: -1 } }, result: '吃到第一口时你原谅了一切。朋友圈配文：排队三小时，干饭十分钟，值。' },
    { text: '转战隔壁苍蝇馆子', effect: { attr: { spr: 2, mny: 1 } }, result: '隔壁小馆子的味道意外地绝。你悟了：网红会过气，锅气不会。', kind: 'good' }
  ] },

// ---- 网络行为大赏 ----
{ id: 'ev_r2_pour_wealth', age: [18, 40], weight: 4, once: true, big: true, kind: 'good',
  text: '你随手发的视频一夜爆了：点赞百万，涨粉十万，合作私信塞爆后台。泼天的富贵，就这么砸到了头上。',
  effect: { attr: { mny: 3, chr: 2, spr: 3 } } },
{ id: 'ev_r2_xianyanbao', age: [18, 45],
  text: '年会上你被拱上台表演节目。全场举起手机，你的脚趾已经开始施工。',
  choices: [
    { text: '豁出去了，当回显眼包', cond: { attr: { chr: { gte: 4 } } }, effect: { attr: { chr: 1, spr: 2 } }, result: '一首跑调的歌配一套自创舞步，全场笑到缺氧。视频被转了八百遍，你是当晚MVP。', kind: 'good' },
    { text: '礼貌推辞，稳坐观众席', effect: { attr: { spr: -1 } }, result: '你躲过一劫。看着台上放飞自我的同事，你承认：有点羡慕。' }
  ] },
{ id: 'ev_r2_tougan', age: [20, 55],
  text: '夏天最热那几天，你去商场"散步"，从一楼走到五楼，顺便把每家店的试吃尝了个遍。朋友说：你这人，偷感很重。',
  effect: { attr: { spr: 1, mny: 1 } } },
{ id: 'ev_r2_hard_ctrl', age: [18, 60],
  text: '路过广场，音响里放出一首洗脑神曲。你的腿不听使唤地跟着打拍子，被硬控了整整半小时，正事全忘了。',
  effect: { attr: { spr: 2, str: 1 } } },
{ id: 'ev_r2_baode', age: [18, 45],
  text: '朋友深夜来电，支支吾吾半天，说想借点钱周转，小心翼翼地问："你那边……方便吗？"',
  choices: [
    { text: '"包的。"转过去再说', cond: { attr: { mny: { gte: 5 } } }, effect: { attr: { mny: -2, spr: 1 } }, result: '你秒转账，附言"包的好吧"。朋友连发二十个磕头表情。', kind: 'good' },
    { text: '量力而行，借一半', effect: { attr: { mny: -1, spr: 1 } }, result: '你借了一半，还附赠一份还款计划模板。朋友说你像个温柔的风控。' },
    { text: '哭穷，保住钱包', effect: { attr: { spr: -1 } }, result: '你说自己也在吃土。挂了电话，心里有点不是滋味。', kind: 'bad' }
  ] },
{ id: 'ev_r2_emotion_value', age: [22, 45],
  text: '最要好的朋友加班到崩溃，打电话来倒苦水。你看了看手里没干完的活。',
  choices: [
    { text: '放下一切，认真听完', effect: { attr: { spr: 1, chr: 1 } }, result: '你啥也没解决，只是听。挂电话前对方说："跟你聊完好多了。"原来情绪价值真的会发光。', kind: 'good' },
    { text: '敷衍两句，继续干活', effect: { attr: { spr: -1 } }, result: '对方说了句"你忙吧"就挂了。你盯着屏幕，活儿突然干不进去了。', kind: 'bad' }
  ] },
{ id: 'ev_r2_concert', age: [16, 45],
  text: '偶像巡演开票，你提前定好五个闹钟，发动全家帮你抢。开票十秒，票没了。',
  choices: [
    { text: '咬牙买溢价票', cond: { attr: { mny: { gte: 6 } } }, effect: { attr: { mny: -2, spr: 3 } }, result: '现场三万人合唱，你从头哭到尾。贵是真贵，值是真值。', kind: 'good' },
    { text: '蹲回流票', cond: { attr: { luk: { gte: 5 } } }, effect: { attr: { mny: -1, spr: 2 } }, result: '演出前三天，你真刷到了回流票！全场合唱时嗓子都喊哑了。', kind: 'good' },
    { text: '场外听个响', effect: { attr: { spr: 1 } }, result: '你在场馆外和几千人听完了整场。省钱版演唱会，青春不打折。' }
  ] },
{ id: 'ev_r2_museum', age: [16, 65],
  text: '博物馆热正盛。你为看一个特展排了两小时队，又花重金买了文创冰箱贴。回家贴在冰箱上，越看越爱。',
  effect: { attr: { int: 1, spr: 1, mny: -1 } } },
{ id: 'ev_r2_annual_party', age: [22, 50],
  text: '年会抽奖环节，你攥着号码牌默念玄学口诀。大屏幕上滚动的名字，停住了——',
  choices: [
    { text: '一等奖！泼天富贵', cond: { attr: { luk: { gte: 7 } } }, effect: { attr: { mny: 3, spr: 3 } }, result: '最新款手机到手。你上台领奖时同手同脚，全场笑声和掌声齐飞。', kind: 'good' },
    { text: '阳光普照奖', effect: { attr: { spr: 1, mny: 1 } }, result: '一桶油加一袋米。沉甸甸地拎回家，也算没白来。' },
    { text: '完美错过所有奖', effect: { attr: { spr: -1 } }, result: '前后左右的号码都中了，就你是那个"气氛担当"。', kind: 'bad' }
  ] },
{ id: 'ev_r2_insomnia', age: [22, 45],
  text: '连续失眠半个月。褪黑素、白噪音、蒸汽眼罩，你的床头像开了个助眠杂货铺。',
  choices: [
    { text: '看医生，认真调理', effect: { attr: { str: 1, spr: 1, mny: -1 } }, result: '遵医嘱一个月，你终于睡了个整觉。原来能睡着，就是顶好的日子。', kind: 'good' },
    { text: '硬扛，谁还没失过眠', effect: { attr: { str: -2, spr: -1 } }, result: '你顶着黑眼圈继续卷。镜子里的自己，越来越像国宝。', kind: 'bad' }
  ] },

// ---- 考证热（连锁） ----
{ id: 'ev_r2_cert1', age: [22, 40], once: true,
  text: '身边人都在考证：教资、注会、心理咨询、无人机驾照……考证热的浪也拍到了你。',
  choices: [
    { text: '报！先报名再说', effect: { attr: { mny: -1 }, setFlags: ['r2_cert'] }, result: '报名费一交，学习的理由就有了。教材到货那天你发了条朋友圈：重新做回学生。' },
    { text: '观望，证书不等于能力', effect: { attr: { spr: 1 } }, result: '你关掉了报名页面。不是每一阵风都要跟，你想。' }
  ] },
{ id: 'ev_r2_cert2', age: [23, 45], once: true,
  cond: { flags: ['r2_cert'] },
  text: '考试日到了。考点设在一所学校，坐进教室的那一刻，你恍惚回到了高考。',
  choices: [
    { text: '沉着应考，水到渠成', cond: { attr: { int: { gte: 6 } } }, effect: { setFlags: ['r2_cert_pass'], delFlags: ['r2_cert'], attr: { int: 1, spr: 2 } }, result: '成绩出来：通过！证书到手那天，你把它摆在书架最显眼的位置。', kind: 'good' },
    { text: '裸考，碰运气', effect: { delFlags: ['r2_cert'], attr: { spr: -1 } }, result: '分数差了两分。你把教材挂上二手平台，标题写着：九成新，仅翻阅。', kind: 'bad' }
  ] },
{ id: 'ev_r2_cert3', age: [28, 55], once: true, kind: 'good',
  cond: { flags: ['r2_cert_pass'] },
  text: '那本证书派上了用场：一次内部竞聘，硬性条件恰好是你考的那个证。机会只敲有准备的人的门。',
  effect: { attr: { mny: 2, spr: 2 } } },

// ---- 摆摊经济（连锁） ----
{ id: 'ev_r2_stall1', age: [24, 45], once: true,
  text: '摆摊经济正火。你批了一箱小玩意儿，下班后在地铁口支起了人生第一个摊位。',
  choices: [
    { text: '吆喝起来，社恐变社牛', cond: { attr: { chr: { gte: 4 } } }, effect: { setFlags: ['r2_stall'], attr: { mny: 1, chr: 1, spr: 1 } }, result: '第一晚卖出七单。城管来时你收摊的速度，堪称艺术。' },
    { text: '安静摆摊，佛系经营', effect: { setFlags: ['r2_stall'], attr: { mny: 1 } }, result: '你坐在小马扎上看人来人往，随缘成交。晚风一吹，比加班费治愈。' }
  ] },
{ id: 'ev_r2_stall2', age: [25, 50], once: true,
  cond: { flags: ['r2_stall'] },
  text: '摆了一个月，你摸出了门道：哪个路口人流大，什么货走得快，回头客爱聊什么。',
  choices: [
    { text: '扩大规模，辞职专职摆摊', cond: { attr: { mny: { gte: 4 } } }, effect: { setFlags: ['r2_stall_master'], attr: { mny: "rand:-1~4", spr: 2 } }, result: '你把工位换成了摊位。收入有起有落，但每一分都明明白白是自己的。', kind: 'good', big: true },
    { text: '见好就收，回归打工人', effect: { delFlags: ['r2_stall'], attr: { mny: 1, spr: 1 } }, result: '你清了存货。这段摆摊岁月，成了简历之外最生动的注脚。' }
  ] },
{ id: 'ev_r2_stall3', age: [30, 60], once: true, big: true, kind: 'good',
  cond: { flags: ['r2_stall_master'] },
  text: '几年下来，小摊做成了街角的小店面。招牌挂起来那天，第一批老顾客都来捧场。',
  effect: { attr: { mny: 4, spr: 3 } } },

// ---- 骑行热（连锁） ----
{ id: 'ev_r2_ride1', age: [20, 55], once: true,
  text: '你被骑行视频洗了脑，咬咬牙提了一辆公路车。提车那天，你推着它在小区里绕了三圈。',
  effect: { setFlags: ['r2_ride'], attr: { mny: -2, spr: 2, str: 1 } } },
{ id: 'ev_r2_ride2', age: [21, 60], once: true,
  cond: { flags: ['r2_ride'] },
  text: '骑行群组织百公里拉练。集合点上全是锁鞋和专业码表，你低头看了看自己的运动鞋。',
  choices: [
    { text: '跟完全程，拼了', cond: { attr: { str: { gte: 5 } } }, effect: { setFlags: ['r2_ride_pro'], attr: { str: 2, spr: 2 } }, result: '最后一公里是靠意志骑完的。冲线时全队给你鼓掌，腿抖得像筛糠，心里爽得像夺冠。', kind: 'good' },
    { text: '骑半程，量力而行', effect: { attr: { str: 1, spr: 1 } }, result: '五十公里，刚刚好。你悟了：骑行的尽头不是里程，是快乐。' },
    { text: '拍照打卡，原地撤退', effect: { attr: { spr: 1, mny: -1 } }, result: '你请大家喝了电解质水。群友封你为"后勤部长"。' }
  ] },
{ id: 'ev_r2_ride3', age: [25, 65], once: true, big: true, kind: 'good',
  cond: { flags: ['r2_ride_pro'] },
  text: '你完成了心心念念的长途骑行：几百公里，翻山越岭。垭口的风吹过来时，你冲着山谷大喊了一声。',
  effect: { attr: { str: 2, spr: 3, int: 1 } } },

// ---- 流浪猫来福（连锁） ----
{ id: 'ev_r2_cat1', age: [18, 40], once: true,
  text: '加班回家的深夜，一只瘦猫蹲在楼下，冲你"喵"了一声。对视三秒，它跟了你一路。',
  choices: [
    { text: '绑架代替购买，拐回家', effect: { setFlags: ['r2_cat'], attr: { spr: 2, mny: -1 } }, result: '体检、疫苗、猫砂盆，一夜置办齐全。它在你床头踩奶踩到半夜，你给它取名"来福"。', kind: 'good' },
    { text: '喂根火腿肠，狠心离开', effect: { attr: { spr: -1 } }, result: '火腿肠它吃了，人它没留住。你上楼后从窗户往下看，它还在原地。', kind: 'bad' }
  ] },
{ id: 'ev_r2_cat2', age: [19, 50],
  cond: { flags: ['r2_cat'] },
  text: '来福正式登基：你的床是它的，你的椅子是它的，你的工作汇报上全是猫毛。你沦为全职铲屎官，心甘情愿。',
  effect: { attr: { spr: 2, mny: -1 } } },
{ id: 'ev_r2_cat3', age: [30, 75], once: true, kind: 'bad',
  cond: { flags: ['r2_cat'] },
  text: '来福老了，跳不上窗台了。一个安静的下午，它在你怀里睡着了，再也没有醒来。你把它埋在了楼下的桂花树下。',
  effect: { delFlags: ['r2_cat'], attr: { spr: -3 } } },

// ---- 中年新题 ----
{ id: 'ev_r2_parent_group', age: [30, 50],
  cond: { flags: ['has_child'] },
  text: '家长群里，有人凌晨晒娃的奥数作业，有人组织团购进口文具。你看着99+的消息，默默开了免打扰。',
  choices: [
    { text: '佛系围观，绝不内卷', effect: { attr: { spr: 1 } }, result: '你只在接龙时冒泡。孩子的童年和你的血压，都保住了。', kind: 'good' },
    { text: '不行，咱也得支棱起来', effect: { attr: { mny: -2, spr: -1, int: 1 } }, result: '你连夜报了三个班。孩子看你的眼神，像看一个陌生的卷王。', kind: 'bad' }
  ] },
{ id: 'ev_r2_marathon', age: [30, 55],
  text: '马拉松热席卷全城，同事人手一双碳板跑鞋。抽签结果出来，你中签了。',
  choices: [
    { text: '科学备赛，冲击完赛', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { str: 2, spr: 2, mny: -1 } }, result: '冲过终点线那一刻，志愿者给你挂上奖牌。四十二公里，你一步一步量完了。', kind: 'good', big: true },
    { text: '迷你跑，重在参与', effect: { attr: { str: 1, spr: 1 } }, result: '五公里欢乐跑，边跑边拍照。奖牌一样闪，罪一点没少受——还好只有五公里。' },
    { text: '转让名额，沙发观赛', effect: { attr: { spr: 1 } }, result: '你在朋友圈看完了全程直播。跑者的快乐你不懂，沙发的好他们不知道。' }
  ] },
{ id: 'ev_r2_baduanjin', age: [35, 65],
  text: '你开始练八段锦，又跟风尝试了晒背。同事笑你未老先衰，你说这叫"中式养生的觉醒"。',
  effect: { attr: { str: 1, spr: 1 } } },
{ id: 'ev_r2_job35', age: [33, 45], once: true, kind: 'fate',
  text: '招聘软件上，"35岁以下"的门槛像一堵墙。你投了八十份简历，回复寥寥。',
  choices: [
    { text: '降维求生，先干起来', effect: { attr: { mny: 1, spr: -1 } }, result: '你放下面子先上了车。方向盘握在手里，心里反而不慌了。' },
    { text: '死磕老本行，提升硬实力', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 1, mny: 2 } }, result: '你把证书和项目经验重新打磨。三个月后，猎头的电话来了。', kind: 'good' },
    { text: '正好，试试自己干', cond: { attr: { mny: { gte: 5 } } }, effect: { attr: { mny: "rand:-2~3", spr: 1 } }, result: '与其被人挑，不如自己当老板。小生意开张，前途未卜，但空气是自由的。' }
  ] },
{ id: 'ev_r2_pension', age: [35, 60],
  text: '你开始认真研究养老：个人养老金、定投、增额寿。算完账发现，体面退休需要一笔不小的数字。',
  choices: [
    { text: '强制储蓄，雷打不动', cond: { attr: { mny: { gte: 5 } } }, effect: { attr: { mny: -1, spr: 1 } }, result: '看着账户里的数字慢慢长大，你对老年的自己说了声：放心。', kind: 'good' },
    { text: '活在当下，以后再说', effect: { attr: { spr: 1, mny: 1 } }, result: '你把这笔钱换成了全家的一次旅行。养老重要，眼前的笑声也重要。' }
  ] },
{ id: 'ev_r2_wedding_simple', age: [24, 40],
  text: '你参加了一场"三无婚礼"：无接亲、无司仪、无伴郎伴娘，新人自己主持，半小时礼成，直接开席。你觉得清爽极了。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r2_insurance', age: [28, 55],
  text: '做保险的朋友约你"喝下午茶"，PPT放了四十页。你心里警铃大作，但条款听着又确实有道理。',
  choices: [
    { text: '挑实用的买一份', cond: { attr: { mny: { gte: 5 } } }, effect: { attr: { mny: -2, spr: 1 } }, result: '你货比三家，配了最基础的保障。买完之后，睡觉都踏实了三分。', kind: 'good' },
    { text: '全程装傻，礼貌告辞', effect: { attr: { spr: -1 } }, result: '朋友送你到电梯口，笑容淡了。下午茶白喝了，人情欠下了。' },
    { text: '被说动，全家配齐', effect: { attr: { mny: -3, spr: -1 } }, result: '保单厚得像本书。你安慰自己：这是责任，不是消费。' }
  ] },

// ---- 银发冲浪 ----
{ id: 'ev_r2_retire_live', age: [55, 75],
  text: '退休后的新事业：蹲直播间。主播一声"家人们"，你比谁都亲。今晚抢的是十斤装鸡蛋。',
  choices: [
    { text: '抢！手快有手慢无', effect: { attr: { mny: -1, spr: 2 } }, result: '鸡蛋到货，个头不大，快乐不小。你在群里晒出战利品，收获一片"求链接"。', kind: 'good' },
    { text: '只看不买，修炼定力', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 1 } }, result: '你看了仨小时，一分钱没花。主播喊"感谢陪伴"，你确实只贡献了陪伴。' }
  ] },
{ id: 'ev_r2_old_drama', age: [50, 80],
  text: '你迷上了短剧，一集两分钟，讲的是保洁阿姨其实是集团董事长。老伴笑你，结果他看得比你还上头。',
  choices: [
    { text: '付费解锁全集', effect: { attr: { mny: -1, spr: 2 } }, result: '九块九，买不了吃亏。大结局阿姨亮明身份那一刻，你俩鼓起了掌。' },
    { text: '找免费资源', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 1 } }, result: '你找到了免费版。画质糊了点，爽点一个不少。' }
  ] },
{ id: 'ev_r2_college_rush', age: [50, 70],
  text: '老年大学秋季班开抢，智能手机摄影课三秒售罄。你提前十分钟守着，手指悬在屏幕上。',
  choices: [
    { text: '抢到了！', cond: { attr: { luk: { gte: 4 } } }, effect: { attr: { int: 1, spr: 2 } }, result: '你抢到最后一席。第一节课你坐第一排，笔记记得比谁都勤。', kind: 'good' },
    { text: '没抢到，去蹭课', effect: { attr: { spr: 1, int: 1 } }, result: '你去旁听了书法课。老师看你认真，破例给你加了个座。', kind: 'good' }
  ] },
{ id: 'ev_r2_smart_return', age: [55, 80],
  text: '网购的东西不合适，你第一次独立完成退货：拍照、填单、预约上门。成功后你得意地跟子女宣布："我啥都会。"',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r2_grandkid_video', age: [55, 80],
  cond: { flags: ['has_child'] },
  text: '孙辈拉着你拍短视频："就演个反差萌。"视频发出去，点赞破了五千，评论区都在喊"可爱"。',
  effect: { attr: { spr: 2, chr: 1 } } },
{ id: 'ev_r2_health_live', age: [50, 80],
  text: '养生直播间里，"专家"声情并茂地推销灵芝孢子粉，号称包治百病，评论区一水的"已拍"。',
  choices: [
    { text: '划走，顺手举报', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 1 } }, result: '你识破套路反手举报。隔天再看，那个号没了。', kind: 'good' },
    { text: '买两罐试试', effect: { attr: { mny: -2, spr: -1 } }, result: '喝了俩月，啥感觉没有。你把罐子改成了调料罐。', kind: 'bad' }
  ] },
{ id: 'ev_r2_old_esports', age: [70, 90],
  text: '养老院新开了电竞房，你报名学了手游。队友都是二十岁的小年轻，一口一个"大神"，带你上分。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r2_old_ai', age: [70, 95],
  text: '子女给你装了个智能音箱，能聊天能唱戏。深夜睡不着，你跟它唠了半小时。它耐心得很，就是总把话题拐到天气上。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r2_old_delivery', age: [72, 95],
  text: '你学会了点外卖。第一份送到时，你开门对骑手说了三声谢谢。一个人吃饭的日子，突然多了点热乎气。',
  effect: { attr: { spr: 2, str: 1 } } },
{ id: 'ev_r2_old_meme', age: [85, 100],
  text: '孙辈教你玩梗，你学得最溜的一句是"包的"。全家视频会上你一句"包在我身上"，小辈们笑成一片：咱家老宝贝，网感绝了。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r2_century_viral', age: [98, 100], once: true, kind: 'good',
  text: '你的百岁视频被发上网，弹幕飘过一片"接福气""沾沾喜气"。你对着镜头拱手："都有都有，人人有份。"',
  effect: { attr: { spr: 3 } } },

// ---- 罕见横祸（新） ----
{ id: 'ev_r2_wild_spot', age: [16, 35], weight: 3, kind: 'bad', once: true, cond: { chance: 0.05 },
  text: '攻略里那个"小众野生秘境"没有护栏，也没有信号。你踩着湿滑的石头往瀑布边挪，想拍一张没有人的大片。',
  effect: { kill: true, deathText: '在无人管理的"野生网红景点"失足坠亡' } },
{ id: 'ev_r2_ebike_fire', age: [18, 70], weight: 3, kind: 'bad', once: true, cond: { chance: 0.04 },
  text: '深夜，楼道里那辆入户充电的电动车电池突然爆燃。浓烟封住楼梯时，你还在睡梦中。',
  effect: { kill: true, deathText: '电动车电池起火，葬身火场' } },

// ========== v2 · 货币/装备/副本配套事件 ==========
{ id: 'ev_v2_gig_work', age: [16, 28], weight: 12,
  text: '钱包比你的脸还干净。你打开兼职软件，决定给自己找点活干。',
  choices: [
    { text: '去商圈发传单', effect: { coin: 40, attr: { spr: -1 } }, result: '站了一天，腿是酸的，钱包是鼓的。路过镜子时你对自己说：辛苦了，打工人。' },
    { text: '剧本杀店当DM', cond: { attr: { chr: { gte: 5 } } }, effect: { coin: 70, attr: { chr: 1 } }, result: '你声情并茂地带完三车，玩家们鼓掌叫好，老板当场问你能不能长期来。', kind: 'good' },
    { text: '奶茶店摇奶茶', effect: { coin: 60, items: ['it_milktea'] }, result: '打烊前老板让你把做错的那杯带走。全糖去冰，是今天的隐藏工资。', kind: 'good' }
  ] },
{ id: 'ev_v2_flea_market', age: [18, 60], weight: 10,
  text: '周末的旧货市场人声鼎沸。一个不起眼的摊位上，旧书、老物件和几件看不出年头的"装备"堆在一起。',
  choices: [
    { text: '砍价买下一柄旧刀', cond: { attr: { mny: { gte: 3 } } }, effect: { coin: -90, items: ['it_saber'] }, result: '摊主开价三百，你砍到九十。回家一擦，刀身寒光乍现——捡漏这种事，终于轮到你。', kind: 'good' },
    { text: '淘一摞旧书', effect: { coin: -25, items: ['it_book'], attr: { int: 1 } }, result: '五块钱一斤的知识，你扛回了半麻袋。' },
    { text: '只逛不买，练眼力', effect: { attr: { int: 1 } }, result: '你看了三小时，一分钱没花。摊主们都说这年轻人是真能忍。' }
  ] },
{ id: 'ev_v2_lottery_draw', age: [16, 55], weight: 5, once: true, kind: 'good',
  text: '商场周年庆，你的小票抽中了"幸运锦鲤奖"。工作人员比你还激动，拉横幅拍照一条龙。',
  effect: { items: ['it_lotto'], attr: { spr: 2, luk: 1 } } },
{ id: 'ev_v2_dungeon_rumor', age: [16, 45], weight: 8,
  text: '最近城里流传一些奇怪的传闻：旧厂房后巷、城郊的烂尾楼盘，据说敢进去闯一圈的人，出来都发了一笔小财。想去碰碰运气的话，可以去「行动」面板看看副本入口。',
  effect: { attr: { int: 1, luk: 1 } } },
{ id: 'ev_v2_smithy', age: [18, 60], weight: 8,
  text: '老街尽头还开着一家铁匠铺，老师傅光着膀子抡锤，火星四溅。他瞥了你一眼："要点什么？"',
  choices: [
    { text: '打一把趁手的刀', effect: { coin: -120, items: ['it_saber'] }, result: '三天后取货，刀身沉手，寒光内敛。老师傅只说了一句："别拿它干坏事。"', kind: 'good' },
    { text: '修一修家里的旧剑', effect: { coin: -40, attr: { str: 1 } }, result: '旧剑重新开刃。你顺手帮着抡了两锤，胳膊酸了三天，也结实了三天。' },
    { text: '拜师学打铁', cond: { attr: { str: { gte: 6 } } }, effect: { coin: 50, attr: { str: 1, int: 1 } }, result: '你打了一个月的铁，学费全免还领了工钱。老师傅说你是块打铁的料，就是不知道这话算不算夸人。', kind: 'good' }
  ] },
{ id: 'ev_v2_pawnshop', age: [20, 70], weight: 8,
  text: '路过当铺，柜台后的朝奉推了推老花镜："当东西，还是淘东西？"',
  choices: [
    { text: '当掉家里的闲置物件', effect: { coin: 80, attr: { spr: -1 } }, result: '旧相机、旧手表换回一沓现金。东西没了，日子松快了。' },
    { text: '赎一件流当的旧物', cond: { attr: { luk: { gte: 4 } } }, effect: { coin: -60, items: ['it_ring'] }, result: '一枚没人要的旧戒指，你看着顺眼就收了。戴上那天起，运气好得有点离谱。', kind: 'good' }
  ] },
{ id: 'ev_v2_finance', age: [25, 70], weight: 8,
  cond: { attr: { mny: { gte: 5 } } },
  text: '你攒下了一笔闲钱，理财顾问笑得像朵向日葵，问你打算怎么安排。',
  choices: [
    { text: '稳健理财，细水长流', effect: { coin: 100, attr: { spr: 1 } }, result: '一年下来收益不多但稳。你悟了：慢慢变富，也是一种变富。', kind: 'good' },
    { text: '梭哈高风险产品', cond: { attr: { luk: { gte: 6 } } }, effect: { coin: 220, attr: { spr: 1 } }, result: '别人恐慌你贪婪，居然真让你赌赢了。你默默把本金撤了出来——见好就收，是赌赢的前提。', kind: 'good' },
    { text: '全存定期，主打一个稳', effect: { coin: 30, attr: { int: 1 } }, result: '利息跑不赢通胀，但睡得着觉。你觉得值。' }
  ] },
{ id: 'ev_v2_night_stall', age: [18, 45], weight: 10,
  text: '你在夜市支了个小摊，卖自己鼓捣的小玩意儿。城管来了你收摊比谁都快，城管走了你支摊比谁都快。',
  effect: { coin: 60, attr: { spr: 1 } } },
{ id: 'ev_v2_live_sell', age: [20, 45], weight: 7,
  cond: { attr: { chr: { gte: 6 } } },
  text: '朋友拉你进直播间帮忙带货。灯光一打，镜头一对，三万人看着你。',
  choices: [
    { text: '放开嗓子带货', effect: { coin: 120, attr: { chr: 1, spr: 1 } }, result: '"家人们，这个价格我砍了三天三夜！"当晚成交量破纪录，商家塞给你一个大红包。', kind: 'good' },
    { text: '紧张到当场卡壳', effect: { attr: { spr: -1, int: 1 } }, result: '你对着镜头沉默十秒，弹幕齐刷"主播好安静好喜欢"。意外涨粉两千，可你只想找个地缝。', kind: 'bad' }
  ] },
{ id: 'ev_v2_recycle', age: [16, 60], weight: 12,
  text: '你翻出抽屉里吃灰的三部旧手机和一台笔记本，约了上门回收。验机小哥报价那一刻，你体会到了"断舍离"的快乐。',
  effect: { coin: 30, attr: { spr: 1 } } },
{ id: 'ev_v2_boxing_gym', age: [16, 40], weight: 8,
  text: '新开的拳击馆搞体验课，教练是退役拳王，一身腱子肉，笑起来倒挺和蔼。',
  choices: [
    { text: '报名学拳', effect: { coin: -100, skills: ['sk_warcry'], attr: { str: 2 } }, result: '三个月下来，你出拳带风。教练拍着你肩膀："这一嗓子吼出来，气势先赢一半。"你学会了【战吼】。', kind: 'good' },
    { text: '办张卡先围观', effect: { coin: -20, attr: { spr: 1 } }, result: '你在跑步机上挥汗如雨，顺便看完了三场实战。热血沸腾，虽然血是你的，拳是别人的。' }
  ] },
{ id: 'ev_v2_overtime', age: [22, 55], weight: 10, kind: 'bad',
  text: '项目赶工，你连着加了半个月班。工资到账那天多了一笔可观的加班费，镜子里的黑眼圈也同样可观。',
  effect: { coin: 90, attr: { str: -1, spr: -1 } } },
{ id: 'ev_v2_landlord_left', age: [18, 40], weight: 5, once: true,
  text: '退租的老房子里，房东留下一屋子旧物不要了，临走摆摆手："看得上的都归你。"',
  choices: [
    { text: '留下那件旧皮甲', effect: { items: ['it_leather'] }, result: '据说是房东年轻时玩户外穿的，皮面油亮。你穿上对着镜子一照，颇有几分江湖侠客的味道。', kind: 'good' },
    { text: '挂上二手平台全卖了', effect: { coin: 70, attr: { int: 1 } }, result: '旧物一件件拍出，到账提示音此起彼伏。你第一次体会到"闲置变现"四个字的含金量。', kind: 'good' }
  ] },
{ id: 'ev_v2_temple_fair', age: [8, 65], weight: 10,
  text: '庙会上的套圈摊前围满了人，老板笑得胸有成竹："十块钱五个圈，套中啥拿啥！"',
  choices: [
    { text: '买五个圈试试手气', effect: { coin: -10, items: ['it_apple'], attr: { spr: 1 } }, result: '四个圈全空，最后一个稳稳套中一兜苹果。老板鼓掌："好手法！"你怀疑他在安慰你。' },
    { text: '押上全部零花钱', cond: { attr: { luk: { gte: 7 } } }, effect: { coin: -30, items: ['it_ring'], attr: { spr: 2 } }, result: '最后一个圈划出完美弧线，套中角落里的戒指。摊主脸都绿了："小伙子，明天别来了啊。"', kind: 'good' }
  ] }

/* ========== 第三轮扩充：阶段衔接 + 连锁收尾 + 全龄日常（ev_r3_ 前缀） ==========
   本批新增连锁 flag（仅续用旧 flag，不设新结局依赖）：
     青梅线续：qm_together 后续日常
     结拜线续：sworn_gone 和解
     初恋线续：fl_broken / fl_reunited 余韵
     健身线续：fit / fit_body 后续
     写作线续：writer / writer_signed / writer_famous 后续
     考证线续：r2_cert / r2_cert_pass 后续
     摆摊线续：r2_stall / r2_stall_master 后续
     骑行线续：r2_ride / r2_ride_pro 后续
     养猫线续：r2_cat 日常
*/

// ---- 人生阶段过渡（once + fate，进一生回望） ----
,{ id: 'ev_r3_tr_preschool', age: [5, 7], once: true, big: true, kind: 'fate',
  text: '上小学前的那个夏天，母亲握着你的手教你写自己的名字。开学前夜，新书包端端正正摆在床头，你摸着它睡着，梦里全是上课铃。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r3_tr_primary_end', age: [11, 13], once: true, big: true, kind: 'fate',
  text: '小学毕业典礼，校歌唱到一半有人哭了。同学录你写得满满当当，最好看的那一页，留给了最好的朋友。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_tr_middle_first', age: [12, 13], once: true, big: true, kind: 'fate',
  text: '初中开学，教室搬到了四楼，同桌换成陌生人。你在新课本扉页一笔一划写下名字，像给新生活盖了章。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r3_tr_after_zhongkao', age: [15, 16], once: true, big: true, kind: 'fate',
  text: '中考结束，暑假长得像一辈子。你昏睡三天，疯玩一周，然后某个傍晚突然有点想念上学的日子。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_tr_high_first', age: [15, 16], once: true, big: true, kind: 'fate',
  text: '高中开学第一天，黑板右上角写着"距高考还有1000天"。你觉得遥遥无期。后来才知道，弹指一挥。',
  effect: { attr: { int: 1 } } },
{ id: 'ev_r3_tr_after_gaokao', age: [17, 19], once: true, big: true, kind: 'fate',
  text: '高考后的夏天，蝉鸣得肆无忌惮。你把草稿纸撕了折成飞机，从教学楼顶一架架放飞——十二年的重量，原来轻得像纸。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r3_tr_leave_home', age: [18, 19], once: true, big: true, kind: 'fate',
  text: '离家上大学那天，母亲往你包里塞煮鸡蛋，塞到拉链合不上。火车开动时她在站台上挥手，你第一次发现，她那么小。',
  effect: { attr: { spr: -1, int: 1 } } },
{ id: 'ev_r3_tr_graduate', age: [21, 23], once: true, big: true, kind: 'fate',
  text: '大学毕业：拨穗，合影，散伙饭。行李箱轮子的声音在楼道里响了一整天，四年就这么被一个一个拖走了。',
  effect: { attr: { int: 2, spr: -1 } } },
{ id: 'ev_r3_tr_first_job', age: [22, 26], once: true, big: true, kind: 'fate',
  text: '入职第一天，你提前四十分钟到公司楼下，在便利店坐了三首歌的时间。工牌挂上脖子那一刻，学生时代正式杀青。',
  effect: { attr: { mny: 1, spr: 1 } } },
{ id: 'ev_r3_tr_job_hop', age: [26, 40], once: true, big: true, kind: 'fate',
  text: '提离职那天，领导挽留的话术你都能替他说完。抱着纸箱走出写字楼，晚风扑面——世界很大，你想再看看。',
  effect: { attr: { mny: 1, spr: 2 } } },
{ id: 'ev_r3_tr_30', age: [30, 30], once: true, big: true, kind: 'fate',
  text: '三十岁生日，没有想象中的惶恐。二十岁时以为三十岁会拥有一切，真到了才发现：拥有此刻，就够好。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_tr_40', age: [40, 40], once: true, big: true, kind: 'fate',
  text: '四十岁。吹蜡烛前你想了很久，只许了一个愿：家人健康。愿望变少了，是因为终于懂得什么最贵。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_tr_empty_nest', age: [46, 58], once: true, big: true, kind: 'fate',
  cond: { flags: ['has_child'] },
  text: '孩子去外地上大学，家里突然安静得能听见冰箱运行的声音。你做了三个菜，两个人对着一桌子饭，各自多盛了半碗。',
  effect: { attr: { spr: -1 } } },
{ id: 'ev_r3_tr_pre_retire', age: [55, 59], once: true, big: true, kind: 'fate',
  text: '退休倒计时一年。你开始整理三十多年的工作笔记，厚厚一摞，是半辈子的报表和会议，也是半辈子的光阴。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r3_tr_retire_ceremony', age: [57, 63], once: true, big: true, kind: 'fate',
  text: '单位为你办了退休仪式：鲜花、掌声、一本烫金纪念册。你上台讲了五分钟，感谢大家，也谢谢那个加了无数班却没掉队的自己。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r3_tr_60', age: [60, 60], once: true, big: true, kind: 'fate',
  text: '六十岁，耳顺之年。生日宴上你发表感言：前半生听别人的，后半生听自己的——但血压，听医生的。全场笑倒一片。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_tr_movein', age: [72, 85], once: true, big: true, kind: 'fate',
  text: '子女劝你搬去同住。老屋住了一辈子，搬与不搬，都是一道大题。',
  choices: [
    { text: '搬过去，含饴弄孙', effect: { attr: { spr: 2 } }, result: '热闹是真热闹，就是遥控器永远抢不过小的。', kind: 'good' },
    { text: '守住老屋，自由万岁', effect: { attr: { spr: 1 } }, result: '子女隔天一个视频，距离产生的美，刚刚好。' }
  ] },

// ---- 连锁续篇 ----
{ id: 'ev_r3_qm_home', age: [25, 40], once: true, kind: 'good',
  cond: { flags: ['qm_together'] },
  text: '你们搬进了自己的小家。刷墙时他把涂料蹭到你脸上，你反手抹了回去。白墙还没干，日子已经先甜了。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_qm_anniv', age: [28, 50], once: true, kind: 'good',
  cond: { flags: ['qm_together'] },
  text: '结婚纪念日，你们回到当年分冰棍的小卖部门口。店早换了主人，冰棍从五毛涨到了五块。你们分着吃了一根，还是当年的味。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_qm_old', age: [60, 85], once: true, big: true, kind: 'good',
  cond: { flags: ['qm_together'] },
  text: '傍晚散步，你们还是习惯性地走成并排。从分一根冰棍到互相搀扶，六十年一句话没说过"永远"，却一天都没分开过。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r3_sworn_help', age: [30, 55], once: true, kind: 'good',
  cond: { flags: ['sworn'], notFlags: ['sworn_gone'] },
  text: '你资金周转不开，焦头烂额之际，结拜兄弟二话不说转来一笔钱，附言："当年的辣条不能白吃。"你盯着转账记录看了很久。',
  effect: { attr: { mny: 2, spr: 2 } } },
{ id: 'ev_r3_sworn_reconcile', age: [45, 70], once: true, kind: 'fate',
  cond: { flags: ['sworn_gone'] },
  text: '医院走廊里，你和多年不来往的结拜兄弟狭路相逢。对视三秒，他先开口："最近……还好吗？"',
  choices: [
    { text: '从兜里摸出一根辣条递过去', effect: { delFlags: ['sworn_gone'], setFlags: ['sworn'], attr: { spr: 2 } }, result: '两个老头分着一根辣条，笑得像操场角落里的少年。盟约，续期。', kind: 'good' },
    { text: '点点头，擦肩而过', effect: { attr: { spr: -1 } }, result: '走出很远你回了次头，他还站在原地。有些门，关上了就难再开。', kind: 'bad' }
  ] },
{ id: 'ev_r3_sworn_win', age: [35, 60], once: true, big: true, kind: 'good',
  cond: { flags: ['sworn_partner'], notFlags: ['sworn_gone'] },
  text: '合伙的生意熬过了最难的三年，终于开始盈利。分红那天你们没去大酒店，蹲在路边摊碰杯：辣条盟约，果然靠谱。',
  effect: { attr: { mny: 3, spr: 2 } } },
{ id: 'ev_r3_fl_letter', age: [20, 35], once: true,
  cond: { flags: ['fl_broken'] },
  text: '整理旧物，翻出一封当年没送出去的信。字迹青涩，落款郑重。你读了两遍，最后把它重新夹回那本旧书里。',
  effect: { attr: { spr: -1, int: 1 } } },
{ id: 'ev_r3_fl_photo', age: [30, 55], once: true,
  cond: { flags: ['fl_broken'] },
  text: '同学群有人发了张毕业合影。你和初恋站在最边上，中间隔着三个人。你把照片放大看了很久，笑了，也酸了。',
  effect: { attr: { spr: -1 } } },
{ id: 'ev_r3_fl_gift', age: [35, 55], once: true, kind: 'good',
  cond: { flags: ['fl_reunited'] },
  text: '收到初恋寄来的包裹：当年你借出去的那块橡皮，被塑封得整整齐齐，附言只有四个字——"物归原主"。你笑了半天，把它摆上了书架。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_fit_plateau', age: [21, 50], once: true,
  cond: { flags: ['fit'], notFlags: ['fit_body'] },
  text: '健身第三个月，体重卡在原地一动不动，秤像在嘲笑你。',
  choices: [
    { text: '换计划，加餐加练', cond: { attr: { str: { gte: 4 } } }, effect: { attr: { str: 2 } }, result: '一个月后平台期破了。原来身体和人一样，逼一逼才肯往前走。', kind: 'good' },
    { text: '歇一周再说', effect: { attr: { str: -1, spr: 1 } }, result: '你躺了一周，回来状态反而更好。休息也是训练的一部分——你信了。' }
  ] },
{ id: 'ev_r3_fit_mentor', age: [26, 60], once: true, kind: 'good',
  cond: { flags: ['fit_body'] },
  text: '健身房新来的小伙子动作不对，你顺手带了带。三个月后他练出了线条，逢人就管你叫师父。你摆摆手：都是汗换的。',
  effect: { attr: { spr: 2, chr: 1 } } },
{ id: 'ev_r3_fit_old', age: [55, 80], once: true, big: true, kind: 'good',
  cond: { flags: ['fit_body'] },
  text: '健身房给你颁了面锦旗：本店最年长全勤会员。镜子里你白发配肌肉，违和又威风。年轻人们排队跟你合影，喊你"硬核大爷/大妈"。',
  effect: { attr: { str: 1, spr: 3 } } },
{ id: 'ev_r3_writer_block', age: [25, 45], once: true,
  cond: { flags: ['writer'], notFlags: ['writer_famous'] },
  text: '卡文第三天，文档停在同一句话，光标闪得像在嘲讽你。',
  choices: [
    { text: '出门暴走十公里找灵感', effect: { attr: { int: 1, spr: 1 } }, result: '走到第七公里，情节突然自己长出来了。你蹲在路边记了满满一屏备忘录。', kind: 'good' },
    { text: '硬憋，不信写不出来', effect: { attr: { spr: -1 } }, result: '憋出三千字，第二天早上全删了。写作这事，有时候先认输才赢。', kind: 'bad' }
  ] },
{ id: 'ev_r3_writer_hater', age: [28, 55], once: true,
  cond: { flags: ['writer_signed'] },
  text: '书评区冒出一条千字长评，逐章挑刺，有理有据，字字诛心。',
  choices: [
    { text: '认真读完，挑出三分道理', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 2, spr: -1 } }, result: '下一本书的短板全补上了。你在后记里谢了那位读者，虽然不知道他是谁。', kind: 'good' },
    { text: '拉黑删评，眼不见为净', effect: { attr: { spr: 1 } }, result: '书评区岁月静好。只是偶尔深夜，你还会想起那几句扎心的实话。' }
  ] },
{ id: 'ev_r3_writer_film', age: [35, 65], once: true, big: true, kind: 'good',
  cond: { flags: ['writer_famous'] },
  text: '你的小说被改编成影视剧，开播那晚你守在屏幕前。弹幕刷过一片"原著党狂喜"，你截了图，发了条仅自己可见的朋友圈。',
  effect: { attr: { mny: 3, spr: 2 } } },
{ id: 'ev_r3_cert_group', age: [23, 40], once: true,
  cond: { flags: ['r2_cert'] },
  text: '备考群里认识了几个考友，互相打卡，互相泼冷水。有人凌晨发一句"今日刷题200道"，全群垂死病中惊坐起。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r3_cert_teacher', age: [26, 50], once: true, kind: 'good',
  cond: { flags: ['r2_cert_pass'] },
  text: '同事备考你考过的那个证，天天来请教。你把笔记倾囊相授，像看到当年的自己。他考过那天，比你还激动。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_cert_more', age: [30, 55], once: true,
  cond: { flags: ['r2_cert_pass'] },
  text: '考证这事有点上瘾，你又盯上了一本含金量更高的。',
  choices: [
    { text: '再战一次', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2, mny: 1 } }, result: '又拿下了。书架上的证书排成一列，像你的个人勋章墙。', kind: 'good' },
    { text: '见好就收', effect: { attr: { spr: 1 } }, result: '你把备考时间换成了晚饭后的散步。证书够用就好，日子也是。' }
  ] },
{ id: 'ev_r3_stall_regular', age: [25, 50], once: true, kind: 'good',
  cond: { flags: ['r2_stall'] },
  text: '你的摊位有了回头客：阿姨帮你照看生意，加班晚归的年轻人说"就等你出摊"。小摊成了街角的一盏灯。',
  effect: { attr: { mny: 1, spr: 2 } } },
{ id: 'ev_r3_stall_rain', age: [25, 50], once: true,
  cond: { flags: ['r2_stall'] },
  text: '出摊赶上暴雨，生意泡了汤。隔壁卖烤红薯的大爷默默把大伞挪了一半给你。那晚没赚着钱，但红薯是真甜。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_stall_branch', age: [35, 60], once: true, big: true, kind: 'good',
  cond: { flags: ['r2_stall_master'] },
  text: '你在街对面开了第二家分店，交给最得力的老员工打理。开业那天，来捧场的第一批顾客，还是当年地铁口那一拨。',
  effect: { attr: { mny: 3, spr: 2 } } },
{ id: 'ev_r3_ride_commute', age: [20, 55], once: true,
  cond: { flags: ['r2_ride'] },
  text: '你开始骑车通勤，单程四十分钟。红绿灯都熟了，风也熟了。一个月后，裤腰悄悄松了一格。',
  effect: { attr: { str: 2, spr: 1 } } },
{ id: 'ev_r3_ride_race', age: [25, 60], once: true,
  cond: { flags: ['r2_ride_pro'] },
  text: '业余自行车公开赛，你咬牙刷了报名费。发令枪响，几百辆车涌出去，像一群出笼的鸽子。',
  choices: [
    { text: '跟住第一集团，冲名次', cond: { attr: { str: { gte: 6 } } }, effect: { attr: { str: 2, spr: 2 } }, result: '季军！站上领奖台时腿还在抖。奖牌不大，含金量全是汗水。', kind: 'good' },
    { text: '安全完赛，突破自我', effect: { attr: { str: 1, spr: 2 } }, result: '完赛成绩比自己最好纪录快了两分钟。赢过昨天的自己，也是赢。', kind: 'good' }
  ] },
{ id: 'ev_r3_ride_veteran', age: [50, 70], once: true, big: true, kind: 'good',
  cond: { flags: ['r2_ride_pro'] },
  text: '骑行队来了批新人，看见你车架上贴满的里程贴纸，齐喊"老炮"。领骑那天你把他们拉得只剩背影，然后在坡顶停下来等——传承嘛。',
  effect: { attr: { str: 1, spr: 2 } } },
{ id: 'ev_r3_cat_video', age: [19, 50], once: true,
  cond: { flags: ['r2_cat'] },
  text: '你随手拍的来福视频火了：它一巴掌拍翻你的咖啡，眼神毫无悔意。评论区十万人云吸猫，来福正式出道，你沦为它的经纪人。',
  effect: { coin: 30, attr: { spr: 2 } } },
{ id: 'ev_r3_cat_vet', age: [22, 60], once: true,
  cond: { flags: ['r2_cat'] },
  text: '来福蔫了两天，不吃不喝，平时抢都抢不走的罐头闻都不闻。',
  choices: [
    { text: '连夜送医，砸钱治', effect: { attr: { mny: -2, spr: 1 } }, result: '输液三天，它痊愈出院，回家路上就把脑袋搁在了你胳膊上。', kind: 'good' },
    { text: '先观察两天', effect: { attr: { spr: -2 } }, result: '你守了它两夜没敢睡。好在只是肠胃炎，你抱着失而复得的它，鼻子发酸。' }
  ] },
{ id: 'ev_r3_cat_zen', age: [25, 70], once: true, kind: 'good',
  cond: { flags: ['r2_cat'] },
  text: '朋友说你这两年脾气变好了。你想了想：每天下班回家，都有个毛团子蹲在门口等你——被需要，原来是最好的药。',
  effect: { attr: { spr: 2, chr: 1 } } },

// ---- r3 · 0-9 岁日常 ----
{ id: 'ev_r3_kid_walk_school', age: [6, 9],
  text: '第一次自己上学，母亲在阳台上目送。你背着书包走出巷口，觉得全世界都在看你。',
  choices: [
    { text: '一路小跑，准点到校', effect: { attr: { spr: 1 } }, result: '你第一个到教室，帮老师发完了全班的作业本。', kind: 'good' },
    { text: '路上看蚂蚁搬家，迟到了', effect: { attr: { int: 1, spr: -1 } }, result: '被罚站五分钟。但那队蚂蚁搬家的阵型，你记了一辈子。' }
  ] },
{ id: 'ev_r3_kid_soy_sauce', age: [5, 9], once: true,
  text: '母亲第一次派你独自去打酱油，五块钱攥在手心，汗都攥出来了。',
  choices: [
    { text: '圆满完成任务', effect: { attr: { spr: 2, int: 1 } }, result: '酱油打回来了，找回的零钱一分不少。晚饭那盘菜，你觉得格外香。', kind: 'good' },
    { text: '钱买了糖，酱油忘了', effect: { attr: { spr: 1, int: -1 } }, result: '糖是甜的，母亲的脸是黑的。你含着糖挨训，滋味复杂。', kind: 'bad' }
  ] },
{ id: 'ev_r3_kid_blackout', age: [4, 10],
  text: '夏夜停电，全家把竹床搬上天台。你躺着数星星，听大人讲古，蒲扇的风一下一下，把夜晚扇得很慢。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_kid_sprout', age: [5, 9],
  text: '自然课发的黄豆，你天天浇水、写日记。第七天清晨，杯子里的土顶出一点绿。你举着杯子满楼跑，像举着诺贝尔奖。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r3_kid_injection', age: [4, 9],
  text: '学校组织打预防针，队伍排得很长，针头在白大褂手里闪着寒光。',
  choices: [
    { text: '咬紧牙关不哭', effect: { attr: { str: 1, spr: 1 } }, result: '针扎进去那下你硬是没吭声。老师说你是小男子汉/小女侠，你骄傲了一星期。', kind: 'good' },
    { text: '哭得惊天动地', effect: { attr: { spr: 1 } }, result: '三层楼都听见了。护士塞给你一颗糖，你挂着眼泪说：糖真甜。' }
  ] },
{ id: 'ev_r3_kid_bike_learn', age: [6, 10], once: true,
  text: '学自行车，父亲在后面扶着后座，喊："别回头，往前看！"',
  choices: [
    { text: '蹬！往前看', effect: { attr: { str: 1, spr: 2 } }, result: '骑出二十米你回了头——他早松手了，站在原地鼓掌。那天你学会了骑车，也隐约懂了父爱。', kind: 'good' },
    { text: '回头确认他还在', effect: { attr: { str: -1, spr: -1 } }, result: '车头一歪摔进花坛。他跑过来先笑够了，才把你扶起来。' }
  ] },
{ id: 'ev_r3_kid_piano', age: [5, 10],
  text: '钢琴考级前夜，你错音连篇，母亲的表情比考级曲目还难弹。',
  choices: [
    { text: '突击苦练到深夜', effect: { attr: { int: 1, spr: -1 } }, result: '居然过了。证书到手，你第一时间拿去垫了桌脚——故意的。' },
    { text: '摆烂，临场即兴', effect: { attr: { spr: 1 } }, result: '考级现场你弹出了自己的风格。考官沉默良久，在评语栏写下：富有创造力。' }
  ] },
{ id: 'ev_r3_kid_snow', age: [3, 10],
  text: '人生第一场大雪。你堆了个歪歪扭扭的雪人，把自己的围巾给它戴上。第二天雪人矮了半截，你跟它说了声：辛苦了。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_kid_lost', age: [4, 8], once: true,
  text: '商场人挤人，一转头，母亲不见了。广播声、脚步声，全世界的声音都变大了。',
  choices: [
    { text: '原地站着不动，等', effect: { attr: { spr: 1 } }, result: '十分钟后母亲疯了一样冲过来抱住你。你记住的守则，救了你一次。', kind: 'good' },
    { text: '哭着找穿制服的保安', cond: { attr: { int: { gte: 4 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '广播响起："请某某家长速到服务台。"母亲赶到时，你正吃着保安给的饼干。', kind: 'good' }
  ] },
{ id: 'ev_r3_kid_cicada', age: [6, 11],
  text: '午后你粘了一火柴盒知了，视若珍宝。半夜它们集体大合唱，被母亲连盒请出了家门。你在门缝里跟它们道了晚安。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_kid_homework_summer', age: [7, 12],
  text: '暑假最后一天，两个月的作业摊了一桌。你边哭边写，笔走龙蛇，一夜长大。从此懂了什么叫" deadline 是第一生产力"的童年版。',
  effect: { attr: { int: 1, spr: -1 } } },
{ id: 'ev_r3_kid_teacher_praise', age: [6, 11], kind: 'good',
  cond: { attr: { int: { gte: 5 } } },
  text: '你的作文被当作范文在全班朗读。你低着头假装谦虚，耳朵尖红得透明，放学路上连蹦了三里地。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_kid_secret_base', age: [5, 10],
  text: '你和同桌在小区假山后面建了"秘密基地"，藏了一玻璃罐弹珠和半包辣条。你们拉钩约定：谁也不许说出去，包括未来的老婆。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_kid_grandpa_bike', age: [4, 9],
  text: '外公的二八大杠，你斜坐在横梁上，风从耳边呼呼地过。那是你童年坐过最快的车，比后来所有车都快。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_kid_rain_puddle', age: [3, 9],
  text: '雨后你专挑水坑踩，水花溅多高，笑声就多大。回家挨了顿骂，新鞋湿透。你觉得值。',
  effect: { attr: { spr: 2, str: -1 } } },
{ id: 'ev_r3_kid_report_card', age: [7, 12],
  text: '期末成绩单发下来了，要家长签字。分数嘛，一言难尽。',
  choices: [
    { text: '如实上交，听候发落', effect: { attr: { spr: -1, int: 1 } }, result: '预想中的暴风雨没来。父亲签了字，只说："下次把会的都做对。"' },
    { text: '模仿签名，技术过关', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: -1, spr: -1 } }, result: '老师一个电话打回家，你的"书法生涯"当天退役，附赠混合双打。', kind: 'bad' }
  ] },
{ id: 'ev_r3_kid_money', age: [6, 11],
  text: '这个星期的零花钱到手，五块钱，巨款。怎么花，是个战略问题。',
  choices: [
    { text: '存进小猪储蓄罐', effect: { attr: { mny: 1, int: 1 } }, result: '罐子一天比一天沉。你第一次体会到"积少成多"四个字的重量。', kind: 'good' },
    { text: '全换成干脆面', effect: { attr: { spr: 1 } }, result: '十包干脆面，吃出一张稀有卡。同桌出三倍价钱收购，你理都没理。' },
    { text: '请同桌吃辣条', effect: { attr: { chr: 1, spr: 1 } }, result: '两包辣条换来的友谊，比辣条还经嚼。', kind: 'good' }
  ] },
{ id: 'ev_r3_kid_night', age: [3, 8],
  text: '今晚要自己睡。灯一关，衣柜的影子像怪兽，窗帘缝里漏的光像眼睛。',
  choices: [
    { text: '开小夜灯，战胜恐惧', effect: { attr: { spr: 1, int: 1 } }, result: '后半夜你睡熟了。早上醒来发现：怪兽一晚上都没敢来。', kind: 'good' },
    { text: '抱被子投奔父母大床', effect: { attr: { spr: 1 } }, result: '父亲被挤到床边睡了一夜。第二天他打着哈欠说：今晚继续自己睡。' }
  ] },
{ id: 'ev_r3_kid_perform', age: [5, 9],
  text: '六一汇演，你在《森林的故事》里扮演一棵树——的第三片叶子。',
  choices: [
    { text: '认真演好这片叶子', effect: { attr: { spr: 1, int: 1 } }, result: '你一动不动站了全场，老师说你的叶子最有定力。没有小角色，只有小演员。' },
    { text: '抢戏：叶子成精了', effect: { attr: { chr: 1, spr: 2 } }, result: '你给自己加了抖叶子的戏，全场爆笑。主角哭了，你火了。', kind: 'good' }
  ] },
{ id: 'ev_r3_kid_move', age: [5, 10], once: true, kind: 'fate',
  text: '搬家的卡车开走那天，你扒着车窗看老房子越变越小。新城市、新学校、新口音，一切从头开始。',
  effect: { attr: { spr: -1, int: 1 } } },
{ id: 'ev_r3_kid_cook_egg', age: [7, 12], once: true,
  text: '趁大人不在，你决定下厨煎个蛋，证明自己的实力。',
  choices: [
    { text: '小心翼翼，严格按回忆操作', effect: { attr: { spr: 2, int: 1 } }, result: '蛋边有点糊，但成型了。母亲回来惊喜地拍照发了全家群。', kind: 'good' },
    { text: '自由发挥', effect: { attr: { spr: 1 } }, result: '蛋壳比蛋多，厨房像战场。父亲收拾残局时说：勇气可嘉，下不为例。' }
  ] },
{ id: 'ev_r3_kid_help_bullied', age: [7, 12],
  text: '同桌被高年级学生抢走了文具盒，趴在桌上不敢吭声。',
  choices: [
    { text: '陪他去找老师', effect: { attr: { int: 1, spr: 1 } }, result: '文具盒要回来了。同桌把最喜欢的橡皮送给了你。', kind: 'good' },
    { text: '拉上全班男生去"谈判"', cond: { attr: { str: { gte: 4 } } }, effect: { attr: { str: 1, spr: 1 } }, result: '十几个人往那儿一站，对方乖乖归还。你悟了：团结就是最大的肌肉。', kind: 'good' }
  ] },
{ id: 'ev_r3_kid_firework', age: [4, 10],
  text: '过年你攒了一把摔炮，往地上一撒，"啪"的一声把自己吓得蹦起来。全家笑翻，你拍拍胸口：我是故意的。',
  effect: { attr: { spr: 1 } } },

// ---- r3 · 10-19 岁日常 ----
{ id: 'ev_r3_teen_note', age: [12, 17],
  text: '上课传纸条，传到第五手时被老师凌空截获。全班屏息，老师展开纸条——',
  choices: [
    { text: '一人做事一人当', effect: { attr: { chr: 1, spr: -1 } }, result: '你站起来认了。罚站一节课，但同桌欠你一个人情，记了三年。' },
    { text: '纸条上写的是解题思路', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '老师看完点点头："思路不错，下课来我办公室讲讲。"虚惊一场，还混了顿表扬。', kind: 'good' }
  ] },
{ id: 'ev_r3_teen_military', age: [14, 16],
  text: '军训一周，晒脱一层皮，正步踢得同手同脚。汇演那天你们班居然拿了第一，教官笑得比谁都灿烂。',
  effect: { attr: { str: 1, spr: 2 } } },
{ id: 'ev_r3_teen_phone', age: [13, 17],
  text: '你拥有了人生第一部手机。全家为此开了个短会，主题是"约法三章"。',
  choices: [
    { text: '自觉使用，说到做到', effect: { attr: { int: 1, spr: 1 } }, result: '你成了亲戚圈里"别人家的孩子"——自律版。', kind: 'good' },
    { text: '半夜被窝里偷偷刷', effect: { attr: { int: -1, spr: 1 } }, result: '快乐了半个月，成绩坐了一次滑梯。母亲没收手机时什么都没说，眼神说明了一切。', kind: 'bad' }
  ] },
{ id: 'ev_r3_teen_basketball', age: [12, 18],
  text: '班级篮球赛决赛，最后十秒，落后一分，球传到了你手里。',
  choices: [
    { text: '出手！', cond: { attr: { str: { gte: 4 } } }, effect: { attr: { str: 2, spr: 2 } }, result: '哨响球进，压哨绝杀！全场炸锅，你被队友压在人堆最底下，笑得喘不过气。', kind: 'good' },
    { text: '传给位置更好的队友', effect: { attr: { spr: 2, int: 1 } }, result: '助攻制胜。队友被围在中间，冲你比了个大拇指。有些高光，姓"团队"。', kind: 'good' }
  ] },
{ id: 'ev_r3_teen_diary', age: [12, 16], kind: 'bad',
  text: '母亲收拾房间时"顺便"读了你的日记。晚饭桌上的气氛微妙到能切片。你连夜给日记本配了把锁。',
  effect: { attr: { spr: -2 } } },
{ id: 'ev_r3_teen_competition', age: [13, 18],
  text: '数学奥赛校内选拔，你抱着试一试的心态进了考场。',
  choices: [
    { text: '认真作答，冲集训队', cond: { attr: { int: { gte: 6 } } }, effect: { attr: { int: 2, spr: -1 } }, result: '入选了。集训的日子很苦，但你第一次尝到"和高手过招"的瘾。', kind: 'good' },
    { text: '尽力而为，见见世面', effect: { attr: { int: 1 } }, result: '落选了，但压轴题你解出了一半。天外有天，你记下了。' }
  ] },
{ id: 'ev_r3_teen_valentine', age: [14, 19],
  text: '情人节，课桌抽屉里多了一块巧克力，没留名字。你猜了一星期，问了五个人，谜底至今未解。甜是真的。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_teen_blackout', age: [13, 18],
  text: '晚自习突然停电，全班欢呼。点起蜡烛后，班主任破天荒不讲题，讲起了他当年的高考。那晚没人舍得提前走。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_teen_dorm', age: [13, 19],
  text: '住校第一夜，八个陌生人在熄灯后从老家聊到理想，聊到天蒙蒙亮。宿管的手电扫过来时，全宿舍一秒入睡，演技精湛。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_teen_volunteer_fill', age: [17, 19], once: true, big: true,
  text: '填报志愿那晚，家里开了三次会。热爱的和"好就业的"，在志愿表上打架。',
  choices: [
    { text: '听自己的，选热爱的', effect: { attr: { spr: 2 } }, result: '落笔那一刻你心里很静。路是自己挑的，走起来才有劲。', kind: 'good' },
    { text: '听父母的，选好就业的', effect: { attr: { mny: 2, spr: -1 } }, result: '你妥协了。多年以后你会明白，这不是对错，只是一种人生。' }
  ] },
{ id: 'ev_r3_teen_18', age: [18, 18], once: true, big: true, kind: 'fate',
  text: '十八岁，成人礼。国旗下宣誓时你的声音有点抖。从今天起，法律承认你是个大人了——虽然你觉得自己还不太会装。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_teen_grad_photo', age: [17, 19], once: true,
  text: '拍毕业照那天阳光刺眼。快门响起的瞬间，有人把校服外套抛上了天。多年后你才明白，被定格的不只是脸，是再也回不去的十七岁。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_teen_first_beer', age: [16, 19], kind: 'bad',
  text: '毕业散伙饭，你偷喝了人生第一口啤酒，苦得龇牙咧嘴。同桌笑完，幽幽地说："这就是长大的味道。"',
  effect: { attr: { spr: 1, str: -1 } } },
{ id: 'ev_r3_teen_tutor', age: [14, 18],
  text: '邻居请你给他家小孩补课，一小时二十块。你人生中第一次靠脑子挣钱。',
  choices: [
    { text: '认真备课，倾囊相授', effect: { coin: 40, attr: { int: 1, spr: 1 } }, result: '小孩月考前进了十五名，家长硬塞给你一箱牛奶。知识变现，真香。', kind: 'good' },
    { text: '被熊孩子气到怀疑人生', effect: { coin: 30, attr: { spr: -1 } }, result: '他问你"哥/姐，你当年也这么烦人吗"。你竟无言以对。' }
  ] },
{ id: 'ev_r3_teen_debate', age: [13, 19],
  cond: { attr: { int: { gte: 5 } } },
  text: '校辩论赛决赛，你是四辩。对方三辩咄咄逼人，全场的目光都压了过来。',
  choices: [
    { text: '结辩陈词，火力全开', effect: { skills: ['sk_roast'], attr: { int: 1, spr: 2 } }, result: '你一段结辩赢得满堂彩，评委点评"字字诛心，句句讲理"。你仿佛领悟了【儒雅随和】。', kind: 'good' },
    { text: '稳字当头，守住阵地', effect: { attr: { int: 1, spr: 1 } }, result: '你们以一分惜败，但队长说你是全队的定盘星。' }
  ] },
{ id: 'ev_r3_teen_height', age: [12, 17],
  text: '体检量身高，排到你时你偷偷踮了踮脚。医生头也没抬："脚后跟落地。"全班哄笑。净身高，童叟无欺。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_teen_canteen', age: [12, 19],
  text: '饭卡丢了，补办要一周。这一周你靠同桌接济度日，你俩的革命友谊深了一米，饭量也同步了一米。',
  effect: { attr: { spr: 1, mny: -1 } } },
{ id: 'ev_r3_teen_star_gaze', age: [14, 19],
  text: '晚自习课间，你和同桌溜上天台看星星，聊着谁也说不清楚未来。风很大，理想比风还大。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_teen_online', age: [13, 18],
  text: '游戏里认识三年的网友提出面基，地点约在市中心的奶茶店。',
  choices: [
    { text: '跟家长报备后去见面', effect: { attr: { spr: 2 } }, result: '对方和你想象的一样沙雕。你们从线上队友变成了线下挚友。', kind: 'good' },
    { text: '婉拒，江湖再见', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1 } }, result: '有些友谊适合活在对话框里。你们依然每周开黑，互不越界。' }
  ] },
{ id: 'ev_r3_teen_school_anniv', age: [12, 19],
  text: '校庆恰逢周末回不了家，全宿舍凑钱买了只烤鸭。油污的塑料袋往桌上一铺，就是那晚的满汉全席。',
  effect: { attr: { spr: 2 } } },

// ---- r3 · 20-29 岁日常 ----
{ id: 'ev_r3_y20_club', age: [18, 23],
  text: '社团招新，百团大战，广场热闹得像庙会。你手里攥着三张报名表。',
  choices: [
    { text: '话剧社：圆一个舞台梦', effect: { attr: { chr: 2, spr: 1 } }, result: '第一次登台你演了个龙套，谢幕时手心全是汗。灯光亮起那一刻，值了。', kind: 'good' },
    { text: '辩论队：以理服人', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 2, spr: -1 } }, result: '查资料查到凌晨，赛场上舌战群儒。头发少了，气场强了。', kind: 'good' },
    { text: '都不报，宿舍躺平', effect: { attr: { spr: 1, str: -1 } }, result: '你的大学社团是"被窝研究会"，你是终身会长。' }
  ] },
{ id: 'ev_r3_y20_library', age: [18, 24],
  text: '期末周的图书馆一座难求。你连续一周六点起床占座，咖啡续命。考完走出考场那一刻，恍如隔世，但成绩是真上去了。',
  effect: { attr: { int: 2, spr: -1 } } },
{ id: 'ev_r3_y20_intern', age: [20, 25],
  text: '第一份实习，入职三周，干的活包括但不限于：复印、订饭、取快递。',
  choices: [
    { text: '主动揽活，刷足存在感', effect: { coin: 60, attr: { int: 1 } }, result: '带教老师转正答辩时替你说了句话。打杂不丢人，躺平才丢人。', kind: 'good' },
    { text: '摸鱼到底，混个证明', effect: { coin: 30, attr: { spr: 1 } }, result: '实习证明到手，照片拍得很好看。至于学到了什么，不提也罢。' }
  ] },
{ id: 'ev_r3_y20_thesis', age: [21, 24], once: true,
  text: '毕业论文提交截止前夜，你的查重率还挂在百分之三十。',
  choices: [
    { text: '通宵重写，逐句打磨', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 2, spr: 1 } }, result: '答辩惊艳全场，导师难得地笑了。天亮时的豆浆，是这辈子喝过最香的。', kind: 'good' },
    { text: '东拼西凑，惊险过关', effect: { attr: { spr: -1 } }, result: '查重率百分之二十九点九，擦线通过。你发誓这辈子再也不赌了。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y20_rent', age: [21, 28], once: true,
  text: '第一次租房，中介带你看的"朝南主卧精装修"，窗户对着一面墙。',
  choices: [
    { text: '签了再说，独立万岁', effect: { attr: { mny: -1, spr: 2 } }, result: '房子不大，但钥匙是你自己的。第一晚你坐在地上吃了顿外卖，觉得特别自由。', kind: 'good' },
    { text: '再看五家，极限拉扯', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 1, int: 1 } }, result: '你砍下来两百月租，还薅到一台二手洗衣机。中介说你是他职业生涯的滑铁卢。', kind: 'good' }
  ] },
{ id: 'ev_r3_y20_salary', age: [22, 28], once: true, big: true,
  text: '人生第一笔工资到账，短信提示音响起时，你反复数了三遍位数。',
  choices: [
    { text: '给父母各转一笔', effect: { attr: { spr: 2 } }, result: '母亲秒回："自己留着花。"然后把截图发遍了所有亲戚群。', kind: 'good' },
    { text: '买下惦记很久的东西', effect: { attr: { mny: -1, spr: 2 } }, result: '用自己挣的钱买喜欢的东西，拆快递的手都是抖的。', kind: 'good' },
    { text: '一分不动，全存起来', effect: { attr: { mny: 2 } }, result: '看着余额，你第一次觉得"安全感"三个字有了具体数字。' }
  ] },
{ id: 'ev_r3_y20_wedding_peer', age: [24, 32],
  text: '大学室友结婚，你随了份子还当了伴郎/伴娘。闹洞房的喧嚣里你突然恍惚：什么时候开始，大家都长成大人了。',
  effect: { attr: { mny: -1, spr: 1 } } },
{ id: 'ev_r3_y20_cui_hun', age: [24, 34], kind: 'bad',
  cond: { notFlags: ['married'] },
  text: '春节回家，三姑问你工资，二姨问你对象，表弟问你游戏段位。你面带微笑，内心弹幕横飞。',
  effect: { attr: { spr: -1 } } },
{ id: 'ev_r3_y20_night_metro', age: [22, 32],
  text: '加完班赶上末班地铁，车厢空荡荡的。对面玻璃映出你的脸：有点累，但眼睛里还有光。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y20_cook', age: [22, 32],
  text: '外卖吃腻了，账单也看不下去了，你决定自己做饭。',
  choices: [
    { text: '照着菜谱一步步来', effect: { attr: { mny: 1, str: 1 } }, result: '三周后你的番茄炒蛋有了妈妈的味道。省下的钱和吃出来的健康，都是赚的。', kind: 'good' },
    { text: '自由发挥，黑暗料理', effect: { attr: { spr: -1 } }, result: '厨房炸了两次之后，你和外卖平台重归于好。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y20_karaoke', age: [20, 30],
  text: '部门团建KTV，话筒传到你手上，全场的目光和起哄声一起涌来。',
  choices: [
    { text: '拿起话筒就是主场', cond: { attr: { chr: { gte: 5 } } }, effect: { attr: { chr: 2, spr: 2 } }, result: '一首成名曲技惊四座。第二天全公司都知道你会唱歌了。', kind: 'good' },
    { text: '微笑摆手，守住果盘', effect: { attr: { spr: 1 } }, result: '你吃光了三盘西瓜。深藏功与名，果盘见真情。' }
  ] },
{ id: 'ev_r3_y20_pet_fish', age: [20, 35],
  text: '出租屋添了缸金鱼，三条。你给它们取名：房东、甲方、工资。每天喂鱼的五分钟，是你一天里最治愈的时刻。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y20_grad_trip', age: [21, 26], once: true, big: true,
  text: '毕业旅行，四个人，绿皮火车，目的地是地图上用圆规画出来的。',
  choices: [
    { text: '硬座三十小时，直达', cond: { attr: { str: { gte: 4 } } }, effect: { attr: { spr: 3, str: -1 } }, result: '到站时腿肿了，但在海边看日出的那一刻，你们谁都没说话。青春最贵的一帧，到手了。', kind: 'good' },
    { text: '穷游变囧途', effect: { attr: { spr: 2, mny: -1 } }, result: '错过车、淋了雨、住错了店，但你们笑了一路。多年后聚会，讲的还是这趟。', kind: 'good' }
  ] },

// ---- r3 · 30-39 岁日常 ----
{ id: 'ev_r3_y30_kindergarten', age: [28, 38],
  cond: { flags: ['has_child'] },
  text: '孩子第一天上幼儿园，抱着你的腿哭得撕心裂肺，老师在一旁使眼色：快走。',
  choices: [
    { text: '狠心扭头就走', effect: { attr: { spr: -1 } }, result: '下午去接，他玩得不肯回家。你在门口又心酸又好笑：小没良心的。' },
    { text: '扒着栏杆偷看半小时', effect: { attr: { spr: 1 } }, result: '老师发来照片：他已经在积木区称王称霸。你的担心，纯属多余。' }
  ] },
{ id: 'ev_r3_y30_parent_meeting', age: [30, 45],
  cond: { flags: ['has_child'] },
  text: '家长会，表扬名单里有你家娃的名字。周围的家长纷纷侧目。',
  choices: [
    { text: '低调微笑，深藏功与名', effect: { attr: { spr: 2 } }, result: '散会路上你给孩子买了他最爱的蛋糕，只字未提表扬的事，让他自己飘。', kind: 'good' },
    { text: '当场记笔记，虚心取经', effect: { attr: { int: 1, spr: 1 } }, result: '学霸家长的笔记你看完沉默了：原来别人家也鸡飞狗跳，只是藏得好。' }
  ] },
{ id: 'ev_r3_y30_renovation', age: [28, 42],
  text: '装修第三个月，预算超了四成，工长每天在群里汇报新噩耗。',
  choices: [
    { text: '咬牙上最好的材料', effect: { attr: { mny: -3, spr: 1 } }, result: '入住那天光脚踩在地板上，你承认：贵的东西，只有付钱那一刻是疼的。' },
    { text: '穷装风，能住就行', effect: { attr: { mny: -1, spr: 1 } }, result: '大白墙配二手家具，被你收拾得清清爽爽。家不在贵，在有人等你回。', kind: 'good' }
  ] },
{ id: 'ev_r3_y30_newboss', age: [28, 45],
  text: '空降的新领导烧了三把火，办公室人人自危，气氛微妙。',
  choices: [
    { text: '主动靠拢，接住机会', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { mny: 2, spr: 1 } }, result: '你递上的方案正中下怀。三个月后部门重组，你是新班子的核心。', kind: 'good' },
    { text: '静观其变，以不变应万变', effect: { attr: { spr: -1 } }, result: '火没烧到你，风也没吹到你。安全，但有点透明。' }
  ] },
{ id: 'ev_r3_y30_peer_layoff', age: [30, 45], kind: 'bad',
  text: '邻座十年的老同事被"优化"了，纸箱收拾得很慢。你帮他抱着那盆绿萝送到电梯口，一路无话。电梯门关上时，他摆了摆手。',
  effect: { attr: { spr: -2 } } },
{ id: 'ev_r3_y30_reunion10', age: [28, 35],
  text: '毕业十年同学会。当年的学渣开了公司，班花素面朝天带着俩娃。酒过三巡，有人举杯："敬我们都没想到的三十岁。"',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y30_parents_stay', age: [28, 40],
  text: '父母来小住半个月。母亲接管了厨房，父亲修好了全屋松动的螺丝。他们走后，冰箱是满的，屋子是空的。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y30_checkup', age: [30, 45], kind: 'bad',
  text: '体检报告上多了三个箭头。你把报告拍照设成手机屏保警示自己，一周后，屏保换成了猫。',
  effect: { attr: { str: -1 } } },
{ id: 'ev_r3_y30_hobby', age: [30, 45],
  text: '你给自己报了个成人兴趣班，每周一次，雷打不动。',
  choices: [
    { text: '吉他：指尖起泡也快乐', effect: { attr: { spr: 2, int: 1 } }, result: '三个月后你能弹完整首曲子。深夜阳台，晚风伴奏，邻居居然没投诉。', kind: 'good' },
    { text: '烘焙：全家一起胖', effect: { attr: { spr: 2, str: -1 } }, result: '你的戚风蛋糕在小区出了名。全家胖了五斤，快乐涨了十斤。', kind: 'good' }
  ] },
{ id: 'ev_r3_y30_teambuild', age: [25, 40],
  text: '公司团建：白天爬山，晚上篝火晚会。行政部说这叫"熔炼团队"。',
  choices: [
    { text: '冲顶拿第一', cond: { attr: { str: { gte: 5 } } }, effect: { attr: { str: 1, spr: 2 } }, result: '你第一个登顶，赢了奖品保温杯。下山时扶着腿软的领导，这波不亏。', kind: 'good' },
    { text: '半山腰的凉亭才是归宿', effect: { attr: { spr: 1 } }, result: '你和另外三个"凉亭组"同事聊了一下午。团建的真谛，被你悟到了。' }
  ] },
{ id: 'ev_r3_y30_friend_notpay', age: [28, 45], kind: 'bad',
  text: '三年前借给朋友的钱至今没还，而对方刚在朋友圈晒了新车。',
  choices: [
    { text: '开口要，亲兄弟明算账', effect: { attr: { mny: 1, spr: -1 } }, result: '钱要回来了，聊天框从此安静了。你买了个人生道理，七五折。' },
    { text: '算了，就当认清一个人', effect: { attr: { spr: -2 } }, result: '你屏蔽了他的朋友圈。有些账不算了，是因为人不值了。' }
  ] },
{ id: 'ev_r3_y30_kid_sports', age: [30, 45],
  cond: { flags: ['has_child'] },
  text: '孩子学校的亲子运动会，家长接力赛，你代表全家出战。',
  choices: [
    { text: '拼了，重现当年风采', cond: { attr: { str: { gte: 4 } } }, effect: { attr: { str: 1, spr: 2 } }, result: '你摔了个屁股蹲儿，爬起来反超一人。孩子笑得最大声，也喊得最响。', kind: 'good' },
    { text: '友谊第一，完赛第二', effect: { attr: { spr: 1 } }, result: '你跑了倒数第一，但孩子说你是他最帅/美的爸爸/妈妈。这奖牌，独一份。', kind: 'good' }
  ] },
{ id: 'ev_r3_y30_balcony_farm', age: [28, 50],
  text: '你在阳台种了盆小番茄。三个月后收获十一颗，酸得眯眼，甜得上头。邻居来讨种子，你豪气地分了一半。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y30_housewarm', age: [28, 45], kind: 'good',
  text: '乔迁之喜，亲戚朋友挤满新房。你掌勺做了十六个菜，累瘫在沙发上时看着满屋子人声，心想：这就是家。',
  effect: { attr: { mny: -1, spr: 2 } } },
{ id: 'ev_r3_y30_drive_test', age: [25, 40],
  text: '科目二，你第五次走进考场。安全员都认识你了，冲你点了点头。',
  choices: [
    { text: '深呼吸，第六次出征', effect: { attr: { spr: 2, mny: -1 } }, result: '过了！签字时手都在抖。驾照到手那天，你绕着小区开了十圈。', kind: 'good' },
    { text: '宣布与方向盘和解', effect: { attr: { spr: 1 } }, result: '从此你是打车软件的高级会员。人生苦短，何必倒库。' }
  ] },
{ id: 'ev_r3_y30_blood', age: [25, 50],
  text: '路过献血车，护士冲你笑："帅哥/美女，了解一下？"',
  choices: [
    { text: '挽起袖子', cond: { attr: { str: { gte: 3 } } }, effect: { attr: { spr: 2, str: -1 } }, result: '半个月后收到短信：您的血液已用于临床救治。四百毫升，换来一整天的好心情。', kind: 'good' },
    { text: '下次一定', effect: { attr: { spr: 1 } }, result: '你默默记下了采血点的位置。善念存着，也是存着。' }
  ] },

// ---- r3 · 40-49 岁日常 ----
{ id: 'ev_r3_y40_alma', age: [38, 55], once: true,
  text: '回母校看老师。班主任头发全白了，却一眼认出你："调皮鬼！"你在办公室坐了一下午，像回了趟青春。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y40_kid_zhongkao', age: [40, 55],
  cond: { flags: ['has_child'] },
  text: '孩子中考前夜，全家大气不敢出，电视静音，走路踮脚。',
  choices: [
    { text: '炖汤陪读，做好后勤', effect: { attr: { spr: 1 } }, result: '孩子考完说，每天深夜那碗汤，比补品管用。' },
    { text: '带他出门散步减压', effect: { attr: { spr: 2 } }, result: '路灯下你们聊了一小时废话。后来他考上理想高中，说那晚的风最管用。', kind: 'good' }
  ] },
{ id: 'ev_r3_y40_career_peak', age: [38, 52], kind: 'good',
  cond: { attr: { mny: { gte: 6 } } },
  text: '你负责的项目拿了行业大奖。领奖台上灯光刺眼，你忽然想起二十年前，那个提前四十分钟坐在便利店里的早晨。',
  effect: { coin: 150, attr: { mny: 2, spr: 2 } } },
{ id: 'ev_r3_y40_old_injury', age: [38, 55], kind: 'bad',
  text: '年轻时落下的旧伤开始在阴雨天准时报到，比天气预报还灵。你终于承认：身体是一本账，迟早要对账。',
  effect: { attr: { str: -1, int: 1 } } },
{ id: 'ev_r3_y40_quit_drink', age: [38, 58],
  text: '今晚又有酒局。看着桌上的白酒，你想起体检报告，默默举起了茶杯。',
  choices: [
    { text: '"以茶代酒，各位见谅"', effect: { attr: { str: 2, spr: 1 } }, result: '从此酒局你只吃菜。三个月后指标回落，同桌劝酒的人换成了请教养生。', kind: 'good' },
    { text: '架不住起哄，又来半斤', effect: { attr: { str: -2, spr: 1 } }, result: '当场很尽兴，凌晨很难受。马桶前你发誓戒酒，下周的酒局，另说。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y40_parents_golden', age: [40, 60], once: true, kind: 'good',
  text: '父母的金婚纪念日，你张罗了一桌菜。二老翻出结婚证，红纸都脆了。五十年，他们也吵，但从没想过散。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r3_y40_hair_dye', age: [38, 58],
  text: '白头发越来越多，理发师热情地推荐染黑套餐。',
  choices: [
    { text: '染！年轻十岁是十岁', effect: { attr: { chr: 1, spr: 1, mny: -1 } }, result: '镜子里的人年轻了五岁。虽然一个月后发根又白了，但那又怎样。' },
    { text: '不染，银发是勋章', effect: { attr: { int: 1, spr: 1 } }, result: '你顶着一头花白出了门。小孩子管你叫爷爷/奶奶，你应得中气十足。', kind: 'good' }
  ] },
{ id: 'ev_r3_y40_relearn', age: [40, 60],
  text: '公司上线全新系统，年轻人一天上手，你对着界面发懵。',
  choices: [
    { text: '熬夜啃教程，不信邪', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 2, spr: 1 } }, result: '一周后你开始反哺新人。他们说：姜还是老的辣，酒还是陈的香。', kind: 'good' },
    { text: '申请调岗，扬长避短', effect: { attr: { spr: -1 } }, result: '你去了更吃经验的岗位。认输不至于，叫识时务。' }
  ] },
{ id: 'ev_r3_y40_neighbor', age: [35, 60],
  text: '楼上每天深夜拖椅子，咯吱声精准踩在你睡点上。今夜你忍无可忍，上楼敲门。',
  choices: [
    { text: '好好沟通，以理服人', effect: { attr: { chr: 1, spr: 1 } }, result: '对方连声道歉，椅子腿全包上了垫。半年后，他成了你的棋友。', kind: 'good' },
    { text: '吵一架再说', effect: { attr: { spr: -1 } }, result: '吵到物业上门调解。椅子不响了，电梯里遇见了也别扭。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y40_college_friend', age: [38, 60],
  text: '大学睡你上铺的兄弟出差路过，俩人撸串到凌晨。聊起当年糗事笑得直拍桌子。散场时他拍拍你："都好好的啊。"',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y40_glasses', age: [42, 60], kind: 'bad',
  text: '最近看手机不自觉越拿越远，胳膊快不够长了。验光师微笑："老花，正常现象。"你配了人生第一副老花镜。',
  effect: { attr: { spr: -1 } } },
{ id: 'ev_r3_y40_kid_college', age: [42, 58], once: true, big: true,
  cond: { flags: ['has_child'] },
  text: '送孩子去大学报到，你抢着扛最重的箱子，上六楼没歇脚。回程高铁上老伴说你一路没说话。你说：风太大，迷了眼。',
  effect: { attr: { spr: -1, int: 1 } } },
{ id: 'ev_r3_y40_old_house', age: [40, 65],
  text: '老家的房子漏雨了，母亲在电话里说得轻描淡写，你听着心里发沉。',
  choices: [
    { text: '出钱彻底翻修，留个根', cond: { attr: { mny: { gte: 5 } } }, effect: { attr: { mny: -2, spr: 2 } }, result: '翻修完你陪父母住了一周。屋檐下听雨，像回到了小时候。', kind: 'good' },
    { text: '简单补补，常回去看看', effect: { attr: { mny: -1, spr: 1 } }, result: '瓦片换新了，你回去的次数也多了。房子和人一样，经不起等。' }
  ] },
{ id: 'ev_r3_y40_gout', age: [38, 60], kind: 'bad',
  text: '大脚趾半夜疼醒，红肿发亮——痛风。医生看着你的体检单："海鲜配啤酒，挺会享受啊。"从此你和火锅清汤面面相觑。',
  effect: { attr: { str: -1, spr: -1 } } },
{ id: 'ev_r3_mountain_road', age: [35, 70], weight: 3, kind: 'bad', once: true, cond: { chance: 0.04 },
  text: '雨后的盘山公路，你哼着歌转过一道弯，前方的山体轰然滑落，泥浆吞没了一切。',
  effect: { kill: true, deathText: '自驾游途中遭遇山体滑坡' } },
{ id: 'ev_r3_y40_anti_fraud_dad', age: [40, 60],
  text: '父亲差点被"免费领鸡蛋"的讲座骗去买天价保健品，幸好邻居多嘴提了一句。',
  choices: [
    { text: '周末回家，给他上防骗课', effect: { attr: { int: 1, spr: 1 } }, result: '你把骗局套路拆给他听。父亲嘴硬："我早看出来了。"但鸡蛋再没去领过。', kind: 'good' },
    { text: '给他手机装反诈App', effect: { attr: { int: 1, spr: 1 } }, result: '字体调成最大号，预警开到最强。科技这东西，用对了就是孝心。', kind: 'good' }
  ] },
{ id: 'ev_r3_y40_yoga', age: [38, 60],
  text: '被同事拉去上瑜伽课，教室里就你一个新手，僵硬得像块木板。',
  choices: [
    { text: '咬牙坚持，每周两节', cond: { attr: { str: { gte: 3 } } }, effect: { attr: { str: 2, spr: 1 } }, result: '半年后老腰得救了，你还能劈个横叉吓唬人。', kind: 'good' },
    { text: '一个下犬式，原地退役', effect: { attr: { spr: 1 } }, result: '你和瑜伽互相放过。教练说"随时欢迎回来"，你们都笑了。' }
  ] },
{ id: 'ev_r3_y40_rainbow', age: [35, 60],
  text: '加班晚归，一场急雨过后，城市上空挂起双彩虹。你把车停在路边看完了全程。回家晚了半小时，值了。',
  effect: { attr: { spr: 2 } } },

// ---- r3 · 50-59 岁日常 ----
{ id: 'ev_r3_y50_hiking', age: [48, 65],
  text: '老同事组了个爬山群，每周六雷打不动拉练，群名就叫"不服老"。',
  choices: [
    { text: '次次不落，争当登顶专业户', cond: { attr: { str: { gte: 4 } } }, effect: { attr: { str: 2, spr: 2 } }, result: '半年爬遍周边十座山。站在山顶吼一嗓子，回声都说你还年轻。', kind: 'good' },
    { text: '去了一次，改报逛公园组', effect: { attr: { spr: 1 } }, result: '你悟了：山的尽头是台阶，公园的尽头是长椅。长椅挺好。' }
  ] },
{ id: 'ev_r3_y50_friend_remarry', age: [45, 65],
  text: '离异多年的老友再婚，婚礼上紧张得直搓手，誓词念得磕磕绊绊。你举杯时想：幸福这事，多晚都不算晚。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y50_downsize', age: [48, 70],
  text: '家里的东西越堆越多，柜门都开始抗议。你下定决心：断舍离。',
  choices: [
    { text: '捐的捐扔的扔，大刀阔斧', effect: { attr: { spr: 2 } }, result: '清出十箱旧物，屋子突然会呼吸了。原来清爽的不只是房间，还有脑子。', kind: 'good' },
    { text: '收拾三天，扔了一支笔', effect: { attr: { spr: -1 } }, result: '每件东西都"还有用"。你宣布断舍离失败，并下单了一个新收纳柜。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y50_teach_phone', age: [45, 62],
  text: '老母亲想学视频通话，说想看看你。她戴着老花镜，手指悬在屏幕上不敢点。',
  choices: [
    { text: '手把手教，教到会为止', effect: { attr: { spr: 2 } }, result: '教了八遍，她终于会了。现在她一天给你打三个视频，你接得心甘情愿。', kind: 'good' },
    { text: '画一本图文说明书', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '步骤画成连环画，她照着按，居然通了。屏幕那头她笑得像朵花。', kind: 'good' }
  ] },
{ id: 'ev_r3_y50_reunion35', age: [48, 60], once: true,
  text: '毕业三十五年聚会，到场的人比上次少了几个。大家默契地不聊退休金，只聊当年谁抄谁的作业。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y50_peizhen', age: [48, 68], kind: 'good',
  text: '医院像座迷宫，你帮一对手足无措的老夫妻挂号、缴费、取报告。老太太硬塞给你两个橘子。那天的橘子，甜了一路。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_y50_health_scare', age: [48, 68], once: true, kind: 'fate',
  text: '体检查出个阴影，复查那两周，你连后事都默默想了一遍。结果出来：虚惊一场。走出医院，你觉得连雾霾都是香的。',
  effect: { items: ['it_ginseng'], attr: { spr: 2, str: 1 } } },
{ id: 'ev_r3_y50_consultant', age: [50, 62], kind: 'good',
  cond: { attr: { mny: { gte: 6 } } },
  text: '老东家返聘你做顾问，一周到岗两天，喝茶、把关、带新人。年轻人围着你问东问西，你慢悠悠地说："急什么。"',
  effect: { coin: 100, attr: { spr: 2 } } },
{ id: 'ev_r3_y50_park_photo', age: [50, 70],
  text: '你迷上拍鸟，扛着二手长焦在公园蹲了三小时，就为翠鸟入水那一瞬。拍到那天，你请全群摄友喝了奶茶。',
  effect: { attr: { spr: 2, mny: -1 } } },
{ id: 'ev_r3_y50_learn_swim', age: [50, 68],
  text: '五十岁学游泳，泳池里全是你这样的"老学员"，泳姿五花八门，勇气整齐划一。',
  choices: [
    { text: '三个月拿下蛙泳', cond: { attr: { str: { gte: 3 } } }, effect: { attr: { str: 2, spr: 2 } }, result: '结业那天你游了来回。五十岁的泳道，照样能劈波斩浪。', kind: 'good' },
    { text: '改练水中走路', effect: { attr: { str: 1, spr: 1 } }, result: '呛了几口水后你找到了快乐：水里散步。医生说这对关节最好。' }
  ] },
{ id: 'ev_r3_y50_handmade', age: [48, 68],
  text: '你腌的酱菜在小区出了名，邻居拎着水果来换，还有人问卖不卖。',
  choices: [
    { text: '收钱？小本生意做起来', effect: { attr: { mny: 1, spr: 2 } }, result: '你挂出收款码，月销三十罐。不为赚钱，就图一句"你腌的菜有人抢"。', kind: 'good' },
    { text: '只送不卖，交个朋友', effect: { attr: { spr: 2, chr: 1 } }, result: '楼道里的香味替你打了广告，换来一整单元的人情味。', kind: 'good' }
  ] },
{ id: 'ev_r3_y50_taiji', age: [50, 75],
  text: '清晨的公园，你加入了太极队。三个月后，下盘稳了，心静了，连跟人拌嘴都慢了半拍，气势反而足了。',
  effect: { attr: { str: 1, spr: 1 } } },
{ id: 'ev_r3_y50_old_cd', age: [48, 70],
  text: '翻出当年的随身听和磁带，装上电池居然还能响。熟悉的旋律一起，你在阳台上站了很久，直到月亮升起来。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y50_sleep_separate', age: [50, 70],
  cond: { flags: ['married'] },
  text: '老伴的呼噜声日益雄浑，你们试过各种偏方，最终达成协议：分房睡，早安吻照旧。爱情的形式会变，内容不会。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y50_grand_dog', age: [50, 75],
  cond: { flags: ['has_child'] },
  text: '孩子出差，把狗寄养在你家。一周后狗跟你最亲。孩子来接时，狗子三步一回头，尾巴摇成了螺旋桨。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y50_market_bargain', age: [48, 75],
  text: '早市砍价成了你的新运动。为五毛钱你来我往大战三回合，摊主笑着认输："哥/姐，服了！"省下的五毛，快乐五块。',
  effect: { attr: { spr: 1, mny: 1 } } },
{ id: 'ev_r3_y50_reunion_home', age: [48, 70], once: true,
  text: '阔别多年，你回了一趟小时候的老街。理发店还在，师傅换成了当年的小学徒。你剪了个头，听了一耳朵旧时光。',
  effect: { attr: { spr: 1, int: 1 } } },
{ id: 'ev_r3_y50_flu', age: [48, 70], kind: 'bad',
  text: '一场重感冒把你放倒整整一周。你躺在床上想明白了：年轻时拿命换钱，中年后拿钱换命，不如一开始就好好吃饭。',
  effect: { attr: { str: -1, int: 1 } } },
{ id: 'ev_r3_y50_study_degree', age: [50, 65],
  text: '开放大学老年班招生，专业五花八门。你盯着招生简章，心里有点痒。',
  choices: [
    { text: '报名！圆一个大学梦', effect: { attr: { int: 2, spr: 2 } }, result: '开学第一课你坐第一排。五十岁的学生证，含金量一点不打折。', kind: 'good' },
    { text: '在家自学网课', effect: { attr: { int: 1, spr: 1 } }, result: '没有文凭，但有学问。你的笔记本比年轻人的还工整。' }
  ] },
{ id: 'ev_r3_y50_partner_check', age: [48, 70],
  cond: { flags: ['married'] },
  text: '你和老伴成了体检搭子，每年相约同一天，报告互查，异常项互相监督。爱情到了这个年纪，变成了"你血压多少"。',
  effect: { attr: { spr: 1, str: 1 } } },
{ id: 'ev_r3_y50_letter_self', age: [50, 70], once: true,
  text: '一个安静的下午，你决定给十年后的自己写封信。',
  choices: [
    { text: '认真写完，封进抽屉', effect: { attr: { spr: 2 } }, result: '落款你写：愿你还在热爱。封好那一刻，心里莫名踏实。', kind: 'good' },
    { text: '写了一半，笑场了', effect: { attr: { spr: 1 } }, result: '生活哪有剧本。你把信纸折成飞机，从阳台放飞了。' }
  ] },

// ---- r3 · 60-69 岁日常 ----
{ id: 'ev_r3_y60_first_pension', age: [58, 65], once: true, kind: 'good',
  text: '第一笔退休金到账。数字不算惊人，但你盯着短信看了三遍——从此每个月的这一天，国家准时请你吃饭。',
  effect: { attr: { mny: 2, spr: 2 } } },
{ id: 'ev_r3_y60_travel_group', age: [58, 75],
  text: '老年旅行团，云南八日游，行程单上写着含六个"文化体验点"——你懂，购物点。',
  choices: [
    { text: '玩得尽兴，捂紧钱包', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 2, mny: -1 } }, result: '风景看了个够，导游的套路一个没接。同行的阿姨向你取经，你倾囊相授。', kind: 'good' },
    { text: '没忍住，抱回一只玉镯', effect: { attr: { mny: -2, spr: 1 } }, result: '回来一鉴定：玻璃的。但你戴着挺好看，就当买了个高兴。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y60_chess', age: [58, 80],
  text: '公园棋摊，你和老对手杀得难解难分，观战的比下棋的还急。一盘棋下一下午，输赢都尽兴。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r3_y60_garden', age: [58, 80],
  text: '小区开辟共享菜园，你起了个大早，抢到一块向阳的好地。',
  choices: [
    { text: '精耕细作，科学种植', effect: { items: ['it_apple'], attr: { spr: 2, str: 1 } }, result: '秋天收获满满一兜，你挨家挨户送。全楼都吃上了你种的果子。', kind: 'good' },
    { text: '随缘种植，听天由命', effect: { attr: { int: 1, spr: 1 } }, result: '菜被虫子吃了大半，但你收获了经验、邻居的笑声，和两条虫子的尊重。' }
  ] },
{ id: 'ev_r3_y60_health_talk', age: [58, 80],
  text: '社区健康讲座，专家讲得声情并茂，结尾照例开始卖货。但来都来了——听完还送一桶油。',
  choices: [
    { text: '只听不买，油照领', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { spr: 1 } }, result: '你拎着油第一个离场。知识免费，油也免费，只花了两小时。', kind: 'good' },
    { text: '被说动，买台理疗仪', effect: { attr: { mny: -2, spr: -1 } }, result: '用了两次，落灰至今。那桶油，是这台仪器唯一的产出。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y60_old_boss_funeral', age: [58, 80], once: true, kind: 'bad',
  text: '老领导的追悼会上，当年的同事聚齐了，头发都白了。散场时大家约好过段时间聚聚——都明白，这话约等于再见。',
  effect: { attr: { spr: -2 } } },
{ id: 'ev_r3_y60_grand_tooth', age: [55, 75],
  cond: { flags: ['has_child'] },
  text: '小孙子掉了第一颗牙，郑重其事地交给你保管。你收进小盒时忽然想起：他爸爸掉牙那年，也是这样交给你的。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y60_fish_zero', age: [55, 80],
  text: '钓鱼一整天，颗粒无收。收竿时隔壁大爷分你两条鲫鱼："拿回去熬汤，别空手回家。"钓鱼佬的情谊，比鱼获实在。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y60_bus_card', age: [60, 70], once: true,
  text: '你领到了老年卡，公交免费。第一天你就琢磨着：把这座生活了一辈子的城市，重新逛一遍。',
  choices: [
    { text: '挑条陌生线路，从头坐到尾', effect: { attr: { spr: 2 } }, result: '城市的另一面，不要钱。你在终点站吃了碗没吃过的面，像出了趟远门。', kind: 'good' },
    { text: '每天坐两站去买菜', effect: { attr: { spr: 1, str: 1 } }, result: '从此菜场的最新行情，你比子女知道得都早。' }
  ] },
{ id: 'ev_r3_y60_knee', age: [60, 80],
  text: '膝盖疼得走不了远路，医生看完片子，给出了两个方案。',
  choices: [
    { text: '置换手术，一步到位', effect: { attr: { mny: -2, str: 1, spr: 1 } }, result: '半年后你健步如飞，爬山群的你又回来了。现代医学，不服不行。', kind: 'good' },
    { text: '保守理疗，慢慢养着', effect: { attr: { str: -1, spr: -1 } }, result: '疼了忍，忍习惯了。只是看见楼梯，心里先怯三分。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y60_ruby', age: [60, 70], once: true, big: true, kind: 'good',
  cond: { flags: ['married'] },
  text: '结婚四十周年，红宝石婚。孩子们起哄问秘诀，老伴抢答："忍。"你补充："忍不住，也得忍。"满堂哄笑，桌下你们的手一直牵着。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r3_y60_lib_volunteer', age: [58, 80], kind: 'good',
  text: '你在社区图书馆当志愿者，整理书架、教孩子找书。有个孩子说你像故事里的"图书管理员爷爷/奶奶"，你美了一整天。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y60_grand_sleepover', age: [58, 80],
  cond: { flags: ['has_child'] },
  text: '孙辈周末来住，缠着你讲故事。你讲了三个，他睡着了你还在讲。掖被角的时候你觉得，所谓传承，就是这样。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y60_old_bike', age: [58, 80], once: true,
  text: '你翻出锈迹斑斑的老自行车，除锈、上油、换胎。骑上街那天，风还是四十年前那个方向。',
  effect: { attr: { str: 1, spr: 2 } } },
{ id: 'ev_r3_y60_market_friend', age: [58, 80],
  text: '早市豆腐摊的大姐记得你的口味："老样子，两块嫩的。"今天她还多舀了一勺豆花送你。',
  choices: [
    { text: '明天带自家酱菜回礼', effect: { attr: { spr: 2 } }, result: '一来二去，你们成了早市搭子。被一座城市记住口味，也算一种归属感。', kind: 'good' },
    { text: '道谢收下，心里记下', effect: { attr: { spr: 1 } }, result: '人情像豆腐，趁热才香。你决定明天还来。' }
  ] },
{ id: 'ev_r3_y60_bird_feed', age: [60, 85],
  text: '你在窗台撒了把小米，从此麻雀天天来打卡。最胖的那只你起名叫"局长"，因为它总是最后一个到，到了先吃。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y60_photo_fix', age: [60, 85],
  text: '老照片泛黄卷边，父亲在照片里还是年轻的模样。你决定给它们做个"手术"。',
  choices: [
    { text: '找人精修，裱起来', effect: { attr: { mny: -1, spr: 2 } }, result: '照片挂上墙，一屋子的人都年轻了。客人来了，你能讲一下午。', kind: 'good' },
    { text: '扫描存档，建家庭云相册', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '全家都能随时翻看。远方的孩子发来消息：爸/妈，看哭了。' }
  ] },
{ id: 'ev_r3_y60_hoard_bag', age: [58, 85],
  text: '你囤的塑料袋占领了一整个抽屉。子女要扔，你急了。后来你想通了：留下十个，其余放手。囤的不是袋子，是过过苦日子的自己——那就留下十个，够了。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y60_nap', age: [58, 85],
  text: '午后雷打不动的半小时午觉，是你的日课。阳光斜过窗台，鸟在叫，世界很吵，你很安静。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y60_relearn_instrument', age: [58, 80],
  text: '老年大学二胡班招生，你零基础报了名，同班同学最年轻的五十五。',
  choices: [
    { text: '勤学苦练，目标《赛马》', cond: { attr: { int: { gte: 4 } } }, effect: { attr: { int: 1, spr: 2 } }, result: '一年后社区汇演，你的《赛马》赢得满堂彩。琴弓一收，抱拳谢幕。', kind: 'good' },
    { text: '改练口琴，邻里友好', effect: { attr: { spr: 1 } }, result: '二胡练了仨月，邻居投诉三次。口琴好多了，至少像音乐。' }
  ] },
{ id: 'ev_r3_y60_reunion50', age: [60, 80], once: true,
  text: '老同学建了个群，五十年的名字一个个亮起来。有人发了张黑白毕业照，你们对着照片认了一晚上自己。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y60_doctor_family', age: [58, 80],
  text: '签约家庭医生后，每月有人上门量血压。小姑娘嘴甜，你总多留她喝杯水。儿女不在身边的日子，多了个惦记你的人。',
  effect: { attr: { spr: 1, str: 1 } } },

// ---- r3 · 70-79 岁日常 ----
{ id: 'ev_r3_y70_reunion_last', age: [70, 85], once: true, kind: 'fate',
  text: '同学聚会的人一年比一年少。今年到场的八个人约定：谁都不许先走。碰杯的声音很轻，情意很重。',
  effect: { attr: { spr: -1, int: 1 } } },
{ id: 'ev_r3_y70_rattan', age: [70, 90],
  text: '阳台的藤椅是你的王座：上午晒太阳，下午打盹，傍晚看楼下小孩疯跑。一天不长，刚好装满。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y70_grand_college', age: [68, 85], once: true, big: true, kind: 'good',
  cond: { flags: ['has_child'] },
  text: '孙辈考上大学的电话打来，你举着听筒手直抖。挂了电话你就翻出压箱底的红包——距开学还有半年，你已经准备好了。',
  effect: { attr: { mny: -1, spr: 3 } } },
{ id: 'ev_r3_y70_false_alarm', age: [68, 85], once: true,
  text: '体检报告上写着"建议复查"，你忐忑了半个月。复查结果：一切正常。你在医院门口吃了碗牛肉面，庆祝重生。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y70_hand_letter', age: [68, 90], once: true,
  text: '你给远方的老战友写了封手写信，字抖得厉害。半个月后收到回信，第一句是："老伙计，字还是那么丑。"你笑出了眼泪。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y70_radio', age: [70, 95],
  text: '那台老收音机还能响。午后你拧开旋钮，戏曲频道正唱着《锁麟囊》。',
  choices: [
    { text: '泡壶茶，听完这一出', effect: { attr: { spr: 2 } }, result: '主持人换了三代，戏还是那出戏。茶喝完，戏散了，心里满满的。', kind: 'good' },
    { text: '拨到新闻频道听听动静', effect: { attr: { int: 1, spr: 1 } }, result: '天下大事听了个遍。饭桌上讲给孙辈听，他们说你比热搜还全。' }
  ] },
{ id: 'ev_r3_y70_fall_scare', age: [70, 90],
  text: '菜市场门口脚下一滑，整个人晃了出去——',
  choices: [
    { text: '一把扶住栏杆', cond: { attr: { str: { gte: 3 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '站稳了。第二天你给自己买了根体面的拐杖，防滑鞋也安排上。服老，是智慧。' },
    { text: '摔坐在地', effect: { attr: { str: -1, spr: 1 } }, result: '三位好心人同时伸手扶你。你道谢道了一路：这世上，还是好人多。', kind: 'good' }
  ] },
{ id: 'ev_r3_y70_old_recipe', age: [68, 90],
  cond: { flags: ['married'] },
  text: '你复刻老伴的拿手菜，试了五次，今天终于对了味。老伴尝了一口说"还差点"，转身又盛了一碗。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y70_choir', age: [65, 85],
  text: '公园合唱团招新，大爷大妈们精神抖擞，排练厅里歌声嘹亮。',
  choices: [
    { text: '报名，亮一嗓子', effect: { attr: { spr: 2, chr: 1 } }, result: '你被分到了低声部。第一次合唱，你眼眶就热了——和声这东西，一个人唱不出来。', kind: 'good' },
    { text: '当忠实听众，场场第一排', effect: { attr: { spr: 1 } }, result: '你带头鼓掌，团员们都认得你。捧场也是一门艺术。' }
  ] },
{ id: 'ev_r3_y70_teach_chess', age: [68, 90],
  cond: { flags: ['has_child'] },
  text: '你教孙辈下象棋，小家伙输了就耍赖要悔棋。你故意让了半子，看他欢呼的样子，想起五十年前，也有人这么让你。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y70_id_photo', age: [70, 90],
  text: '拍新证件照，摄影师说"看这里，笑一个"。照片出来你端详半天：这慈祥的老头/老太太是谁？哦，是我。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y70_queue_doctor', age: [68, 90],
  text: '专家号凌晨放号，儿子帮你抢。候诊三小时，看病五分钟。医嘱不长，就三条。',
  choices: [
    { text: '严格执行，一条不落', effect: { attr: { str: 1, spr: 1 } }, result: '三个月后指标好看了。那张医嘱你折好收着，像一张作战地图。', kind: 'good' },
    { text: '听一半忘一半', effect: { attr: { str: -1 } }, result: '药吃吃停停，下次复诊医生直摇头。身体这本账，糊弄不了。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y70_old_watch', age: [68, 95], once: true,
  text: '戴了半辈子的老手表停了，修表师傅摇摇头：零件不好找了。',
  choices: [
    { text: '再难也要修好', cond: { attr: { mny: { gte: 4 } } }, effect: { attr: { mny: -1, spr: 2 } }, result: '老师傅托人从外地淘来零件。表针重新走动，像一位老朋友回来了。', kind: 'good' },
    { text: '收进抽屉，留个念想', effect: { attr: { spr: 1 } }, result: '表停了，它陪你的那些年没停。你把它和奖状放在了一起。' }
  ] },
{ id: 'ev_r3_y70_winter_sun', age: [70, 95],
  text: '冬日午后，你和老邻居们在墙根排排坐晒太阳。没人说话，也不需要说话。阳光把一排影子晒得暖烘烘的。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y70_travel_scam', age: [65, 85],
  text: '"免费夕阳红一日游"的大巴停在小区门口，传单印得花团锦簇。',
  choices: [
    { text: '识破套路，劝下邻居', cond: { attr: { int: { gte: 5 } } }, effect: { attr: { int: 1, spr: 1 } }, result: '你三言两语拆穿话术，还拉了个防骗互助群。群主，非你莫属。', kind: 'good' },
    { text: '免费的，去就去', effect: { attr: { mny: -1, spr: -1 } }, result: '景点二十分钟，听课一整天。回来的路上你悟了：免费的，最贵。', kind: 'bad' }
  ] },
{ id: 'ev_r3_y70_grand_wedding', age: [70, 90], once: true, big: true, kind: 'good',
  cond: { flags: ['has_child'] },
  text: '孙辈结婚，你被请上主桌。新人敬茶时，你颤巍巍递上红包，只说了三个字："好好过。"那是你一生的经验。',
  effect: { attr: { mny: -1, spr: 3 } } },
{ id: 'ev_r3_y70_night_light', age: [70, 95],
  text: '子女给家里装了感应夜灯，人一走近就亮。你半夜起床，看着脚边那小片光，觉得晚年也被温柔地对待着。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y70_knit', age: [68, 90],
  cond: { gender: 'F' },
  text: '你织的毛衣全家都有份。针脚不如从前密了，但每一件都被抢着穿。线团滚来滚去，滚进去的都是心意。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y70_whittle', age: [68, 90],
  cond: { gender: 'M' },
  text: '你迷上了木工，给重孙做了把小木枪，砂纸磨了三遍，比当年做任何报表都认真。小家伙抱着不撒手，睡觉都搂着。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_y70_dentist', age: [70, 90],
  text: '牙掉了好几颗，医生给出建议：种牙，晚年干饭才有保障。',
  choices: [
    { text: '种！干饭自由不容妥协', effect: { attr: { mny: -2, str: 1, spr: 1 } }, result: '恢复期一过，你啃了根排骨庆祝。七老八十，牙口第一。', kind: 'good' },
    { text: '活动假牙，凑合用', effect: { attr: { mny: -1, spr: -1 } }, result: '假牙泡在杯子里，像你的另一个自己。吃饭不香，但也饿不着。' }
  ] },
{ id: 'ev_r3_y70_first_snow', age: [70, 95],
  text: '今冬第一场雪，你让人推你到楼下。雪花落在手背上，六十年前那个冬天，好像也下过这样一场。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y70_old_unit', age: [70, 90], once: true,
  text: '老单位组织退休人员回厂参观，车间早已改成了文创园。你在自己当年的工位前站了很久——那里现在是一家咖啡店。',
  effect: { attr: { spr: 1, int: 1 } } },
{ id: 'ev_r3_y70_pillow', age: [70, 95],
  text: '睡惯的老枕头塌了，新枕头怎么睡都不对劲。最后还是把旧的拍松继续用。人到晚年，认的不是理，是旧。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y70_legacy_talk', age: [70, 90], once: true, kind: 'fate',
  text: '一个寻常的晚饭后，你把子女叫到跟前，认真地谈起了身后事。',
  choices: [
    { text: '说完心里松快了', effect: { attr: { spr: 2, int: 1 } }, result: '子女红着眼说您想太远。你摆摆手：这不叫晦气，这叫通透。', kind: 'good' },
    { text: '被岔开话题，改天再说', effect: { attr: { spr: 1 } }, result: '饭桌上谁都没再接话，但那晚的汤，每个人都多喝了一碗。' }
  ] },

// ---- r3 · 80-89 岁日常 ----
{ id: 'ev_r3_y80_85', age: [85, 85], once: true, big: true,
  text: '八十五岁生日，吹蜡烛前你郑重宣布："从今天起，我也是有老资格的人了。"全家鼓掌，蛋糕上的奶油都在笑。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y80_wheelchair', age: [80, 95],
  text: '坐上轮椅后，你发现世界变低了：孩子的脸近了，花也近了。护士推你经过长廊，你数完了所有窗户，也数完了所有阳光。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y80_names', age: [80, 98], kind: 'good',
  text: '全家几十口人的名字和生日，你张口就来，连晚辈的期末分数都记得。大脑这块硬盘，最亲的文件夹从不丢。',
  effect: { attr: { int: 1, spr: 1 } } },
{ id: 'ev_r3_y80_candy_pocket', age: [80, 100],
  text: '你的口袋永远装着糖，专发给来看你的小孩。孩子们都喊你"糖果爷爷/奶奶"。这个职称，你非常满意。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y80_old_song', age: [80, 100],
  text: '收音机里响起六十年前的那首歌，你手里的蒲扇停住了。',
  choices: [
    { text: '跟着哼完，一字不差', cond: { attr: { int: { gte: 4 } } }, effect: { attr: { spr: 2, int: 1 } }, result: '词都没忘。记忆这东西，该走的走了，该留的一个没走。', kind: 'good' },
    { text: '让孙辈搜出歌词，全家合唱', effect: { attr: { spr: 2 } }, result: '五音不全的一家人唱得荒腔走板，却把你唱红了眼眶。', kind: 'good' }
  ] },
{ id: 'ev_r3_y80_mirror', age: [80, 100],
  text: '照镜子时你愣了愣：这张脸，皱纹比平坦的地方多。',
  choices: [
    { text: '再看一眼，道道都有来历', effect: { attr: { spr: 1, int: 1 } }, result: '你跟镜子里的老人点了点头。这张脸，是岁月一锤一锤雕出来的。', kind: 'good' },
    { text: '让孙女给拍张美颜的', effect: { attr: { spr: 1, chr: 1 } }, result: '照片磨皮磨得发光，你设成了头像。老伙伴们纷纷打听用的什么软件。' }
  ] },
{ id: 'ev_r3_y80_nurse', age: [80, 100],
  text: '护工小张总把"爷爷/奶奶今天真精神"挂在嘴边。你知道是职业话术，可还是每天都盼着这一句。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y80_family_photo', age: [80, 98], once: true, big: true, kind: 'good',
  text: '补拍全家福，四代人换了三次队形才站下。快门按下的瞬间你喊了声"茄子"，全家笑场——成片反而最好。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r3_y80_love_letter', age: [80, 100], once: true,
  cond: { flags: ['married'] },
  text: '整理箱子底，翻出一沓发黄的信——是老伴当年写给你的。',
  choices: [
    { text: '戴上老花镜，重读一遍', effect: { attr: { spr: 2 } }, result: '字迹淡了，心意没淡。老伴凑过来看了两行，耳朵红了。', kind: 'good' },
    { text: '让孙子录成语音，慢慢听', effect: { attr: { spr: 2 } }, result: '夜里你们一人一只耳机，听六十年前的人，说六十年前的情话。', kind: 'good' }
  ] },
{ id: 'ev_r3_y80_hospital_escape', age: [80, 95], once: true,
  text: '住院第三天，你溜出医院买了根糖葫芦。护士急得满楼找，你举着糖葫芦认错："就想尝尝甜的。"全病房笑倒。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y80_flower', age: [80, 100],
  text: '窗台的月季又开了，是你五十岁那年亲手种下的。',
  choices: [
    { text: '剪一枝，插在床头', effect: { attr: { spr: 2 } }, result: '夜里翻身能闻到香。你记不太清昨天吃了什么，但记得它开花的样子。', kind: 'good' },
    { text: '拍下来发到家族群', effect: { attr: { spr: 1 } }, result: '晚辈们排队点赞。重孙问这花几岁了，你答：四十啦，比你还大。' }
  ] },
{ id: 'ev_r3_y80_memoir', age: [80, 100], once: true,
  text: '社区想给你做口述史，说你这一辈子，就是一部活的年代剧。',
  choices: [
    { text: '讲！三天三夜讲不完', effect: { attr: { int: 1, spr: 2 } }, result: '你的故事存进了档案馆。录音结束那天，志愿者小姑娘说：谢谢您，像读了十年书。', kind: 'good' },
    { text: '摆手：都在心里', effect: { attr: { spr: 1 } }, result: '有些故事只讲给懂的人。你还是留给了饭桌上的孩子们。' }
  ] },
{ id: 'ev_r3_y80_hand_warm', age: [80, 100],
  cond: { flags: ['married'] },
  text: '冬天你和老伴互相焐手，焐了一辈子。今年他的手比你的凉，你攥得比往年都紧。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y80_old_neighbor', age: [80, 98], once: true, kind: 'good',
  text: '养老院隔壁床住进一位老人，一聊——竟是五十年前的老邻居。你们把整条老街的人名对了三天，一个都没落下。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y80_cake', age: [80, 100],
  text: '半夜馋蛋糕，你摸黑去厨房挖了一勺，被值夜的护工逮个正着。俩人分着吃了，约定不告诉医生。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y80_doctor_words', age: [80, 100], kind: 'good',
  text: '复查完，年轻医生看着片子直摇头："这心脏，比我爷爷的都结实。"你把这句话当奖状，逢人复述了一个月。',
  effect: { attr: { spr: 2, str: 1 } } },
{ id: 'ev_r3_y80_last_trip', age: [78, 92], once: true, big: true,
  text: '你让子女带你回了趟出生地。老屋没了，村口的老槐树还在。你摸了摸粗糙的树皮，像跟八十年前的自己，握了握手。',
  effect: { attr: { spr: 2, int: 1 } } },
{ id: 'ev_r3_y80_hearing_aid', age: [78, 98],
  text: '耳朵越来越背，子女劝你配助听器。',
  choices: [
    { text: '配上，世界重新高清', effect: { attr: { str: 1, spr: 1 } }, result: '戴上第一晚，你听了一宿虫鸣。原来安静了这么多年，是错过了这么多。', kind: 'good' },
    { text: '拒绝，安静的频道挺好', effect: { attr: { spr: -1 } }, result: '世界对你调低了音量。好在家人的笑，看得见。' }
  ] },
{ id: 'ev_r3_y80_great_school', age: [80, 98],
  cond: { flags: ['has_child'] },
  text: '重孙上学了，书包比他上半身还大。你拄着拐送到巷口，就像很多年前，送他的爷爷那样。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y80_nap_dream', age: [80, 100],
  text: '午梦里故人都来了，还都是年轻时的模样。醒来你不难过——能在梦里常聚，是岁月给的福利。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y80_rain', age: [80, 100],
  text: '雨夜，你靠在床头听雨。八十多年了，雨声一点没变，听雨的人换了一茬又一茬。',
  effect: { attr: { spr: 1, int: 1 } } },
{ id: 'ev_r3_y80_ac', age: [80, 100],
  text: '三十八度的天你也舍不得开空调，子女在手机上远程给你打开了。凉风一起你直嘟囔浪费，身体却很诚实地往风口挪了挪。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y80_gift', age: [80, 100], once: true,
  cond: { flags: ['has_child'] },
  text: '你想给重孙留点什么，比钱更经得起时间的东西。',
  choices: [
    { text: '写下家传菜谱和家训', effect: { attr: { spr: 2, int: 1 } }, result: '薄薄一本，孩子们双手接过去。你说：味道会淡，道理不会。', kind: 'good' },
    { text: '每年录一段生日视频', effect: { attr: { spr: 2 } }, result: '镜头里的你一年比一年慢，说的"好好长大"一年比一年重。', kind: 'good' }
  ] },
{ id: 'ev_r3_winter_cold', age: [82, 100], weight: 4, kind: 'bad', once: true, cond: { chance: 0.05 },
  text: '这个冬天特别冷，暖气烧得很足，窗外落着雪。某个安静的深夜，你在睡梦中停止了呼吸。',
  effect: { kill: true, deathText: '没能熬过这个滴水成冰的冬天' } },

// ---- r3 · 90-100 岁日常 ----
{ id: 'ev_r3_y90_95', age: [95, 95], once: true, big: true,
  text: '九十五岁生日，蛋糕上的数字蜡烛快摆不下了。你许愿的声音很小，只有蛋糕听见了。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_record', age: [90, 100], once: true, kind: 'good',
  text: '你刷新了家族的长寿纪录。家族群里晚辈排队"接寿气"，你挨个发红包，备注统一写着：都给我好好活。',
  effect: { attr: { mny: -1, spr: 2 } } },
{ id: 'ev_r3_y90_candy2', age: [90, 100],
  text: '兜里揣糖的习惯一辈子没改掉。来做志愿者的孩子们围着你，一人一颗。糖不稀奇，稀奇的是发糖的人九十多了。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_letter_future', age: [90, 100], once: true,
  text: '一个念头冒出来：给一百年后的人写封信。',
  choices: [
    { text: '提笔写完，封进铁盒', cond: { attr: { int: { gte: 4 } } }, effect: { attr: { spr: 2, int: 1 } }, result: '开头你写：见字如面，来自一百年前。铁盒交给重孙，使命必达。', kind: 'good' },
    { text: '写不动，口述给重孙记', effect: { attr: { spr: 2 } }, result: '小家伙记了满满三页，错别字不少，诚意满分。', kind: 'good' }
  ] },
{ id: 'ev_r3_y90_old_tree', age: [90, 100],
  text: '小区那棵老银杏，据说是和你同岁栽下的。秋风里你们一个坐在轮椅上，一个站在原地，谁也没催谁。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_reporter', age: [92, 100],
  text: '又有媒体来采访长寿秘诀。这次你说："别学我，我年轻时熬夜干活那会儿，你们还没出生。"全场笑翻，这段又没播成。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_memory_piece', age: [90, 100], kind: 'bad',
  text: '有些日子开始从日历上脱落。你把最重要的名字写在卡片上随身带着——忘了全世界，也不能忘了他们。',
  effect: { attr: { spr: -1 } } },
{ id: 'ev_r3_y90_hold_great', age: [90, 100], kind: 'good',
  cond: { flags: ['has_child'] },
  text: '你又抱了抱最小的那个重孙。他软得像团云，你抖得像片叶。相隔近一个世纪的两个生命，碰了碰鼻尖。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r3_y90_recipe', age: [90, 100],
  text: '你的事迹上了新闻，全网都在求你的长寿食谱。',
  choices: [
    { text: '公开：杂粮粥配好心态', effect: { attr: { spr: 2 } }, result: '食谱转发百万。有人评论：道理都懂，就是活不到用上的那天——先好好活。', kind: 'good' },
    { text: '保密：家家有本难念的经', effect: { attr: { spr: 1 } }, result: '你笑而不语。真正的秘方你心里有数：熬得住，看得开。' }
  ] },
{ id: 'ev_r3_y90_last_photo', age: [90, 100], once: true, kind: 'fate',
  text: '春节前拍全家福，你被簇拥在正中间。摄影师喊"看镜头"，你却挨个看了看身边的每一个人——他们，才是你的镜头。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_sun_move', age: [90, 100],
  text: '午后，你在阳台上追着太阳挪椅子，挪一次，打一个盹。',
  choices: [
    { text: '跟太阳赛到底', effect: { attr: { spr: 2 } }, result: '太阳下山时你宣布：今日战平，明天接着赛。', kind: 'good' },
    { text: '裹上毯子直接睡', effect: { attr: { spr: 2, str: 1 } }, result: '一觉睡到晚饭香。护工说你打呼的声音，像只满足的老猫。' }
  ] },
{ id: 'ev_r3_y90_milk_name', age: [90, 100],
  text: '九十多岁了，母亲喊你乳名的声音还常在耳边。家族聚会上重孙问"太爷爷/太奶奶小名叫什么"，你笑而不答。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y90_arm_wrestle', age: [90, 100],
  text: '隔壁床九十九岁的老伙计找你掰手腕。两只枯瘦的手较了三分钟劲，不分胜负，倒把护工吓白了头。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_winter_count', age: [90, 100],
  text: '你数着，这是人生第九十几个冬天。暖气很足，茶很热。窗外下不下雪，都不打紧了。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y90_quiet', age: [90, 100],
  text: '一个无所事事的午后：没人来访，没有安排。你慢慢喝完一盏茶，觉得这样的空白，也是人生的正文。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_party_prep', age: [96, 99], once: true,
  text: '全家偷偷筹备你的百岁宴，名单列了三页。你假装不知道，每天多吃半碗饭——得给他们留足准备时间。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_tablet', age: [90, 100],
  text: '重孙教你用平板电脑，你的手指在屏幕上戳得小心翼翼。',
  choices: [
    { text: '学会视频通话，天天查岗', effect: { attr: { spr: 2, int: 1 } }, result: '现在你每天和五个城市的家人视频。九十岁的网瘾老人，上线。', kind: 'good' },
    { text: '用它听戏，足矣', effect: { attr: { spr: 1 } }, result: '平板成了随身戏台。科技的尽头，对你来说是一出《贵妃醉酒》。' }
  ] },
{ id: 'ev_r3_y90_nurse_birthday', age: [90, 100],
  text: '护工小姑娘过生日，你让子女送来一块蛋糕。她愣住了："您怎么知道？"你说：惦记人这件事，我练了九十年。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_hum', age: [90, 100],
  text: '你哼着年轻时的小调给重孙催眠。他睡着了，你还哼着。曲子里有煤油灯、绿皮车，和一整个远去的年代。',
  effect: { attr: { spr: 1 } } },
{ id: 'ev_r3_y90_regret_none', age: [90, 100], once: true,
  text: '重孙趴在你膝头问：太爷爷/太奶奶，你这辈子后悔吗？',
  choices: [
    { text: '"后悔没早点想开"', effect: { attr: { spr: 2 } }, result: '他把这句话写进了作文，老师给了满分，评语：好一位哲学家。', kind: 'good' },
    { text: '"后悔的事，都成了故事"', effect: { attr: { spr: 2, int: 1 } }, result: '一句话，够他琢磨很多年。你摸摸他的头：慢慢琢磨，不急。', kind: 'good' }
  ] },
{ id: 'ev_r3_y90_town_gift', age: [92, 100], once: true, kind: 'good',
  text: '镇上送来一块"期颐之瑞"的寿匾，扎着红绸花。你让挂在堂屋正中，进门先看见——这是岁月发的军功章。',
  effect: { attr: { spr: 3 } } },
{ id: 'ev_r3_y90_clock', age: [90, 100],
  text: '老座钟走了一个甲子，钟摆不紧不慢。今天它忽然慢了五分钟。',
  choices: [
    { text: '戴上老花镜，亲自调准', effect: { attr: { int: 1, spr: 1 } }, result: '调准了。你拍拍钟壳：老伙计，谁也不许先认输。', kind: 'good' },
    { text: '随它去，慢就慢吧', effect: { attr: { spr: 1 } }, result: '慢五分钟的世界，也不耽误什么。到了这把年纪，最富余的就是时间。' }
  ] },
{ id: 'ev_r3_y90_dream_young', age: [90, 100],
  text: '梦里你变回了七岁，在田埂上疯跑，母亲在村口喊你回家吃饭。醒来枕头是暖的，嘴角是翘的。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_r3_y90_stars', age: [90, 100],
  text: '夜里睡不着，你让人推你看星星。银河还是那条银河。小时候你替爷爷数过，现在，轮到重孙替你数了。',
  effect: { attr: { spr: 2 } } }


/* ========== 行动联动里程碑事件（行动计数触发） ========== */
,{ id: 'ev_link_study3', age: [7, 80], once: true, big: true, kind: 'fate',
  cond: { flags: ['act_study_3'] },
  text: '这些年你雷打不动地学习充电，知识开始滚雪球。某天你忽然发现，曾经觉得艰深的东西，如今读来竟毫不费力。',
  choices: [
    { text: '继续深造（需智力≥10）', cond: { attr: { int: { gte: 10 } } }, effect: { attr: { int: 2 } }, result: '你沉下心再进一步，学问这东西，越嚼越有味。', kind: 'good' },
    { text: '知识变现', effect: { coin: 80 }, result: '你把学到的东西整理成课挂到网上，第一笔睡后收入到账。', kind: 'good' }
  ] },
{ id: 'ev_link_gym3', age: [12, 75], once: true, big: true, kind: 'good',
  cond: { flags: ['act_gym_3'] },
  text: '坚持健身的这些日子，镜子不会骗人：肩线出来了，上楼不喘了，同事追着问你报了哪个教练。',
  effect: { attr: { str: 2, chr: 1 } } },
{ id: 'ev_link_social3', age: [16, 75], once: true, big: true, kind: 'good',
  cond: { flags: ['act_social_3'] },
  text: '你的人脉网悄悄织成了。一个酒局上加过联系方式的朋友，今天忽然给你介绍了一个意想不到的机会。',
  effect: { coin: 60, attr: { spr: 1 } } },
{ id: 'ev_link_parttime3', age: [16, 60], once: true, big: true, kind: 'good',
  cond: { flags: ['act_parttime_3'] },
  text: '打了这么多份零工，你摸清了哪行辛苦哪行赚钱。有人出价让你长期合作——副业这条路，通了。',
  effect: { coin: 100, attr: { mny: 1 } } },
{ id: 'ev_link_invest3', age: [20, 75], once: true, big: true, kind: 'good',
  cond: { flags: ['act_invest_3'] },
  text: '几轮涨跌下来，你终于有了自己的投资纪律。不贪、不慌、不梭哈，收益曲线开始稳稳向上。',
  effect: { attr: { mny: 2 } } },
{ id: 'ev_link_study8', age: [10, 85], once: true, big: true, kind: 'fate',
  cond: { flags: ['act_study_8'] },
  text: '八年如一日。你已经成了别人口中的"学霸"——有人慕名来请教，有媒体想采访你的学习方法。',
  effect: { attr: { int: 2 }, coin: 50 } },
{ id: 'ev_link_gym8', age: [14, 80], once: true, big: true, kind: 'fate',
  cond: { flags: ['act_gym_8'] },
  text: '健身房把"年度最佳会员"的锦旗颁给了你。八年的汗水，把你锻成了另一个人。',
  effect: { attr: { str: 2, chr: 1, spr: 1 } } },
{ id: 'ev_link_stroll5', age: [10, 90], once: true, big: true, kind: 'good',
  cond: { flags: ['act_stroll_5'] },
  text: '这座城市的每条巷子你都走过。朋友说你是一本活地图，你说，你只是在认真地和生活约会。',
  effect: { attr: { spr: 2 } } },
{ id: 'ev_link_rest5', age: [10, 95], once: true, big: true, kind: 'good',
  cond: { flags: ['act_rest_5'] },
  text: '你大概是全天下最会休息的人。别人焦头烂额的时候，你泡着澡哼着歌，把"松弛感"活成了日常。',
  effect: { attr: { spr: 2, str: 1 } } }
];
