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
  effect: { kill: true, deathText: '电动车电池起火，葬身火场' } }

];
