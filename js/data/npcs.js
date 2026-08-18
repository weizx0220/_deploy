/* NPC 数据：人际关系系统。
   meet: { age:[min,max], attr?, chance } 满足后自动结识（每年检查一次）
   gift: 偏好礼物类型（送礼时好感翻倍）
   vibe: 一句话性格 */
var NPCS = [
  { id: 'np_lin', name: '林小满', gender: 'F', vibe: '青梅竹马的邻家女孩，笑起来有梨涡。',
    meet: { age: [6, 12], chance: 0.6 }, gift: 'food',
    intro: '巷口跳皮筋的女孩主动分了你半根冰棍。她叫林小满。' },
  { id: 'np_zhou', name: '周野', gender: 'M', vibe: '睡你上铺的损友，嘴欠但讲义气。',
    meet: { age: [13, 19], chance: 0.6 }, gift: 'fun',
    intro: '开学第一天，上铺探下个头："兄弟，带纸了吗？"——周野，从此祸害你多年。' },
  { id: 'np_su', name: '苏教授', gender: 'F', vibe: '严厉又护短的恩师，眼光毒辣。',
    meet: { age: [17, 25], chance: 0.5, attr: { int: { gte: 5 } } }, gift: 'book',
    intro: '你的论文被苏教授当众夸了三分钟，又被她私下批注了四十处。她说："孺子可教。"' },
  { id: 'np_chen', name: '老陈', gender: 'M', vibe: '棋摊常客，退休老炮儿，嘴上没把门。',
    meet: { age: [22, 70], chance: 0.5 }, gift: 'tea',
    intro: '棋摊上看你观棋不语，老陈把马往前一拱："小伙子，来一局？"' },
  { id: 'np_may', name: '阿May', gender: 'F', vibe: '工位斜对面的同事，瓜比谁都多。',
    meet: { age: [22, 35], chance: 0.5 }, gift: 'fun',
    intro: '午休时阿May把椅子滑过来："哎，听说了吗……"你从此掌握了全公司的情报网。' },
  { id: 'np_han', name: '韩笑', gender: 'M', vibe: '网上认识的怪才，头像永远是默认。',
    meet: { age: [14, 30], chance: 0.4 }, gift: 'book',
    intro: '论坛里和你吵了三百楼的ID，线下见面居然是个腼腆的家伙。韩笑，网友见光不死的那种。' },
  { id: 'np_qin', name: '秦姨', gender: 'F', vibe: '热心肠邻居，饺子管够。',
    meet: { age: [0, 60], chance: 0.5 }, gift: 'food',
    intro: '对门秦姨端来一碗刚出锅的饺子："一个人住？以后饭点闻着香味就过来。"' },
  { id: 'np_yan', name: '严教练', gender: 'M', vibe: '健身房阎王，爱你就要虐你。',
    meet: { age: [16, 45], chance: 0.4, attr: { str: { gte: 4 } } }, gift: 'tea',
    intro: '你卧推的第三天，严教练过来扶正你的手腕："姿势不对。以后跟着我练。"' }
];

/* 礼物类型 */
var GIFTS = [
  { id: 'food', name: '一篮点心', price: 20 },
  { id: 'book', name: '一本好书', price: 25 },
  { id: 'fun', name: '新奇玩意儿', price: 30 },
  { id: 'tea', name: '一罐好茶', price: 35 }
];

/* 关系阶段 */
var REL_STAGES = [
  { min: 0, name: '相识' },
  { min: 20, name: '朋友' },
  { min: 50, name: '挚友' },
  { min: 80, name: '莫逆' }
];

/* 互动文案 */
var NPC_TEXTS = {
  chat: ['你们天南海北聊了一下午，从八卦聊到人生。', '几句话不对付又笑作一团，时间就这么过去了。', '安静的下午，有一搭没一搭地聊着，很舒服。'],
  gift_good: ['对方眼睛一亮，翻来覆去看了好几遍，珍重地收下了。', '「你怎么知道我想要这个！」对方开心得像个孩子。'],
  gift_normal: ['对方道了谢，笑容礼貌。礼物嘛，心意到了就行。'],
  outing: ['你们逛了一整天，照片拍了几百张，快乐是真实的。', '这趟出门有点疯，但多年后想起来一定会笑。', '春风正好，人也正好。']
};
