/* 肉鸽爬塔「幽冥幻境」数据 —— 八层心魔幻塔，映照闯入者内心的恐惧与欲望
 * 顶层变量：ROGUE_MOBS(普通怪) / ROGUE_ELITES(精英) / ROGUE_BOSSES(塔主) / ROGUE_EVENTS(奇遇)
 * 数值基准（玩家约 HP100 / ATK12 / DEF4 起步，逐层成长）：
 *   普通怪 hp 70-110 / atk 9-14 / def 2-5
 *   精英   hp 160-220 / atk 18-24 / def 5-9
 *   塔主   hp 380-500 / atk 28-38 / def 10-16（双技能）
 */
var ROGUE_MOBS = [
  { id: 'rgm_fear', name: '恐惧化身', hp: 88, atk: 12, def: 3, skills: ['sk_dark'],
    intro: '你心里最怕的那件事，在这里长出了手脚。' },
  { id: 'rgm_sloth', name: '懒惰软泥', hp: 110, atk: 9, def: 5, skills: ['sk_bite'],
    intro: '它懒得追你，只是在地上摊成一片，等你主动躺进来。' },
  { id: 'rgm_neihao', name: '内耗小鬼', hp: 76, atk: 13, def: 2, skills: ['sk_bite'],
    intro: '"要不算了吧"——它趴在你左肩说。"必须做完"——它在你右肩说。' },
  { id: 'rgm_emo', name: 'emo幽灵', hp: 70, atk: 11, def: 2, skills: ['sk_dark'],
    intro: '凌晨三点没发出去的朋友圈，在这里成精了。' },
  { id: 'rgm_anxiety', name: '焦虑蜂群', hp: 72, atk: 14, def: 2, skills: ['sk_thunder'],
    intro: '嗡嗡声仔细一听，全是你明天要交的东西。' },
  { id: 'rgm_shekong', name: '社恐面具', hp: 82, atk: 10, def: 3, skills: ['sk_bite'],
    intro: '它替你参加过一百场不想去的聚会，现在它说轮到你了。' },
  { id: 'rgm_rust', name: '拖延锈怪', hp: 105, atk: 11, def: 5, skills: ['sk_smash'],
    intro: '"再玩五分钟"，它说这句话的时候，已经在原地锈了三十年。' },
  { id: 'rgm_compare', name: '攀比精', hp: 84, atk: 12, def: 3, skills: ['sk_dark'],
    intro: '它每吞掉一个"别人家的孩子"，就长高一分。它现在很高。' },
  { id: 'rgm_insomnia', name: '失眠守夜人', hp: 92, atk: 13, def: 4, skills: ['sk_thunder'],
    intro: '数羊数到第九万只时，羊开始数它。' },
  { id: 'rgm_quit', name: '退堂鼓乐师', hp: 80, atk: 10, def: 3, skills: ['sk_smash'],
    intro: '鼓声一响，你的决心就矮了三分。' }
];
var ROGUE_ELITES = [
  { id: 'rge_regret', name: '遗憾骑士', hp: 200, atk: 20, def: 7, skills: ['sk_smash', 'sk_dark'],
    intro: '铠甲里没有骑士，只有一句反复擦拭的"当初要是"。' },
  { id: 'rge_perfect', name: '完美主义典狱长', hp: 185, atk: 22, def: 8, skills: ['sk_thunder', 'sk_smash'],
    intro: '它把你所有"还不够好"的瞬间铸成了牢房，狱卒也是你。' },
  { id: 'rge_desire', name: '欲望司秤人', hp: 175, atk: 19, def: 6, skills: ['sk_dark', 'sk_fire'],
    intro: '它称量你的贪念，精确到克，然后按克收费。' },
  { id: 'rge_mirror', name: '比较之镜魔', hp: 165, atk: 24, def: 5, skills: ['sk_dark', 'sk_thunder'],
    intro: '镜子里的人过得都比你好。它专门负责让你相信这一点。' },
  { id: 'rge_foodie', name: '深夜放毒主播', hp: 215, atk: 18, def: 9, skills: ['sk_poison', 'sk_fire'],
    intro: '它在凌晨十二点点开烧烤直播，观看人数：你一个。惩罚：也是你。' }
];
var ROGUE_BOSSES = [
  { id: 'rgb_void', name: '虚无之主', hp: 420, atk: 32, def: 12, skills: ['sk_dark', 'sk_smash'],
    intro: '雾王座上坐着一片空白。它什么都不在乎，包括赢你——这才是最可怕的。' },
  { id: 'rgb_obsession', name: '执念之母', hp: 500, atk: 28, def: 16, skills: ['sk_dark', 'sk_poison'],
    intro: '她把每一个"放不下"都抱在怀里，轻轻哄着，哄了它们一辈子。' },
  { id: 'rgb_id', name: '本我饕餮', hp: 390, atk: 38, def: 10, skills: ['sk_bite', 'sk_fire'],
    intro: '它先吃掉了"节制"，又吃掉了"以后再说"，现在正在吃菜单。' },
  { id: 'rgb_self', name: '心魔·另一个你', hp: 450, atk: 34, def: 13, skills: ['sk_thunder', 'sk_dark'],
    intro: '塔顶的镜子先眨了眼。然后，镜子里的你走了出来。' }
];
var ROGUE_EVENTS = [
  { id: 'rgev_mirror', text: '拐角处立着一面落地镜。镜中的你比你先眨了眼。', choices: [
    { text: '一拳打碎镜子', effect: { attr: { str: 1, spr: -1 } }, result: '玻璃碎了一地。每一片里，都有一个你在笑。' },
    { text: '对它微笑致意', effect: { attr: { spr: 1 } }, result: '镜中的你也笑了。这次它慢了半拍，你赢了。' },
    { text: '绕开它继续走', result: '身后传来很轻的一声叹息。你没有回头。' }
  ] },
  { id: 'rgev_well', text: '一口古井，井水幽深，映不出你的脸，只映出一枚铜钱的光。', choices: [
    { text: '掬水喝一口（回复25%生命）', heal: 0.25, result: '清冽回甘，疲劳尽去。水里有谁轻轻说了声"不客气"。' },
    { text: '投币许愿', effect: { coin: -30, attr: { luk: 1 } }, result: '井底传来一声轻笑。似乎有什么变了，又似乎没有。' },
    { text: '把井绳拉上来看个究竟', effect: { items: ['it_lotto'], attr: { str: -1 } }, result: '桶里没有水，只有一个湿漉漉的盲盒。你拎着它，手心发凉。' }
  ] },
  { id: 'rgev_voice', text: '浓雾深处，有人用你的声音喊你的名字。喊到第三声时，带上了哭腔。', choices: [
    { text: '大声回应', effect: { attr: { spr: -1 }, items: ['it_amulet'] }, result: '雾里丢出来一枚护身符。"拿着吧，"那声音说，"你比我更需要它。"' },
    { text: '捂住耳朵快步离开', heal: 0.1, result: '喊声渐渐远了。你走出很远才发现，一直在哭的是你自己。' }
  ] },
  { id: 'rgev_fire', text: '一堆没人看守的篝火，火边烤着两个馒头，签子上写着：饿了就吃，别客气。', choices: [
    { text: '吃一个馒头（回复30%生命）', heal: 0.3, result: '馒头是热的，烤得刚刚好。你朝雾里道了声谢，没人应答。' },
    { text: '留些铜钱在火边', effect: { coin: -20, attr: { spr: 1 } }, result: '火苗欢快地跳了一下。这座塔里，原来也有公平交易。' },
    { text: '把火踩灭', effect: { coin: 40, attr: { luk: -1 } }, result: '灰烬里露出几枚前人留下的铜钱。你捡起来时，总觉得背后一凉。' }
  ] },
  { id: 'rgev_door', text: '一扇贴满封条的木门。封条上的字你都认得，因为那全是你的笔迹。', choices: [
    { text: '撕开封条推门而入', effect: { items: ['it_jade2'], attr: { str: -1 } }, result: '门后空无一物，只有桌上静静躺着一枚暖玉。你忘了是什么时候放进去的。' },
    { text: '再补上一张新封条', effect: { coin: -10, attr: { luk: 1 } }, result: '门里传来一声如释重负的呼气。有些事，不知道比知道便宜。' },
    { text: '绕门而行', result: '你走出去很远，身后传来门轴转动的吱呀声。你越走越快。' }
  ] },
  { id: 'rgev_ghost_bet', text: '一个半透明的老者在摆赌摊，骰子是两颗眼珠子。"押大押小？赌注随你，我押你的明天。"', choices: [
    { text: '押一把大的', effect: { coin: 80, attr: { spr: -1 } }, result: '你赢了钱。老者把眼珠按回眼眶："明天见。"你忽然不确定这是祝福还是通知。' },
    { text: '押上零钱意思一下', effect: { coin: -30, attr: { luk: 1 } }, result: '你输了。老者摆摆手："输得好，输是攒人品。"骰子在你掌心眨了眨眼。' },
    { text: '掀了他的赌摊', effect: { attr: { str: 1, mny: -1 } }, result: '老者笑呵呵地消失了，只顺走了你口袋里的零钱。就当学费。' }
  ] },
  { id: 'rgev_statue', text: '一尊石像蹲在路中央哭泣，眼泪落地即凝成珠子。它哭的样子，很像某个深夜的你。', choices: [
    { text: '坐下来陪它一会儿', heal: 0.25, result: '石像渐渐不哭了。它用石指碰了碰你的肩，一股暖流漫过全身。' },
    { text: '捡走它的眼泪', effect: { items: ['it_ginseng'], attr: { spr: -1 } }, result: '泪珠入手即化成一株老山参。你收获了补品，以及一声很轻的、失望的石裂声。' }
  ] },
  { id: 'rgev_merchant', text: '雾中支着一家当铺，掌柜不收钱财，只收记忆。"童年那段，出三百；初恋那段，面议。"', choices: [
    { text: '当掉一段童年', effect: { coin: 150, attr: { spr: -2 } }, result: '铜钱沉甸甸的。你想不起七岁那年夏天发生了什么，只知道那天似乎很亮。' },
    { text: '赎回一段记忆', effect: { coin: -80, attr: { spr: 2 } }, result: '掌柜从柜底取出一个纸包：原来是你弄丢的、某个很普通的快乐下午。' },
    { text: '问问能不能学点手艺', effect: { skills: ['sk_shield'] }, result: '掌柜教你一手"把心墙砌高"的本事。"防身的，"他说，"这年头用得着。"' }
  ] },
  { id: 'rgev_feast', text: '楼梯尽头摆着一桌盛宴，热气腾腾，餐具只有一副——摆着你的名牌。', choices: [
    { text: '入座，大快朵颐（回复40%生命）', heal: 0.4, effect: { attr: { str: -1 } }, result: '每道菜都是你最爱的味道，味道好得不真实。吃完你打了个寒颤：太合心意的东西，多半有诈。' },
    { text: '只尝一口汤', heal: 0.15, result: '汤是温的，像谁的手心。你放下汤匙，向空席道谢，转身离开。' },
    { text: '掀了桌子', effect: { skills: ['sk_fire'], attr: { spr: 1 } }, result: '盘盏碎裂声里，你胸中郁气一扫而空。掌心残留的烫意，凝成一式烈火掌。' }
  ] },
  { id: 'rgev_exit', text: '一整面墙上用红漆写满了"出口"两个字，层层叠叠，笔迹从工整到癫狂。', choices: [
    { text: '对着"出口"撞过去', effect: { attr: { str: -1 }, items: ['it_elixir'] }, result: '墙纹丝不动。但你撞上墙时，怀里多了一枚丹药——像是墙退给你的医药费。' },
    { text: '用粉笔在墙上画一扇门', effect: { skills: ['sk_heal'] }, result: '门没有开。但画门时你心里异常平静，那段安宁沉淀下来，化作一式回春诀。' },
    { text: '靠着墙睡一会儿', heal: 0.2, result: '你睡得很沉。梦里有人一遍遍写着"出口"，写到后来，改成了"回家"。' }
  ] }
];
