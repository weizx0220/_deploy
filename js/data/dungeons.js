/* 传统副本数据（v2）。格式与数值基准见 _schema.md v2 章节。
   基准：16岁普通玩家 HP≈100 / ATK≈12 / DEF≈4。
   难度1: HP60-100 ATK8-12 DEF2-4；难度3: HP200-300 ATK18-25 DEF6-10；难度5: HP450-600 ATK30-40 DEF12-18。
   每个副本尾王强度约为前一场敌人的 1.4 倍。 */
var DUNGEONS = [
  /* ===== 全世界通用 ===== */
  {
    id: 'dg_rats', name: '下水道清理', world: '*', minAge: 16, difficulty: 1,
    desc: '市政悬赏：下水道鼠患成灾，清理掉它们，按尾巴结账。',
    enemies: [
      { name: '变异硕鼠', hp: 65, atk: 9, def: 2, skills: ['sk_bite'], intro: '一只猫大小的老鼠从污水里窜出，红着眼扑来。' },
      { name: '鼠王', hp: 92, atk: 13, def: 3, skills: ['sk_bite', 'sk_warcry'], intro: '鼠王戴着易拉罐拉环做的王冠："吱——这是朕的江山！"' }
    ],
    reward: { coin: 70, items: ['it_apple'], attr: { str: 1 } },
    cooldown: 3
  },
  {
    id: 'dg_graveyard', name: '乱葬岗夜行', world: '*', minAge: 18, difficulty: 2,
    desc: '城郊乱葬岗夜夜有哭声，进去的人都说看到了"老朋友"。',
    enemies: [
      { name: '游荡怨魂', hp: 110, atk: 13, def: 4, skills: ['sk_dark'], intro: '半透明的怨魂飘在半空："你也来陪我吗？"' },
      { name: '腐臭行尸', hp: 130, atk: 14, def: 5, skills: ['sk_smash'], intro: '行尸拖着断腿挪过来，每一步都掉点什么。' },
      { name: '乱葬岗尸王', hp: 185, atk: 19, def: 7, skills: ['sk_dark', 'sk_smash'], intro: '尸王从最大的坟包里坐起："吵到我睡觉了，你知道吗。"' }
    ],
    reward: { coin: 150, items: ['it_amulet'], attr: { spr: 1 } },
    cooldown: 5
  },
  {
    id: 'dg_abyss', name: '深渊裂隙', world: '*', minAge: 20, difficulty: 3,
    desc: '地表裂开一道缝，往下看的人都说深渊也在看他们。',
    enemies: [
      { name: '影魔', hp: 200, atk: 18, def: 6, skills: ['sk_dark'], intro: '影子从墙上剥离下来，凝成一张没有五官的脸。' },
      { name: '深渊猎犬', hp: 240, atk: 21, def: 8, skills: ['sk_bite'], intro: '三颗头的猎犬流着岩浆般的涎水，低吼逼近。' },
      { name: '深渊凝视者', hp: 335, atk: 29, def: 11, skills: ['sk_dark', 'sk_poison'], intro: '巨大的独眼睁开："你凝视深渊，深渊想收门票。"' }
    ],
    reward: { coin: 240, items: ['it_ring', 'it_ginseng'], attr: { luk: 1 } },
    cooldown: 6
  },

  /* ===== 现实都市 life ===== */
  {
    id: 'dg_loan', name: '网贷催收小队', world: 'life', minAge: 18, difficulty: 1,
    desc: '你不过借了三千，他们却能打出一支军队的架势。今天做个了断。',
    enemies: [
      { name: '电话催收员', hp: 60, atk: 8, def: 2, skills: ['sk_money'], intro: '"通讯录我们都备份了哦。"催收员晃了晃手机。' },
      { name: '催收精英', hp: 70, atk: 10, def: 3, skills: ['sk_money'], intro: '西装革履的精英推了推眼镜："利滚利，很公平。"' },
      { name: '催收队长', hp: 100, atk: 14, def: 4, skills: ['sk_money', 'sk_warcry'], intro: '队长带着大喇叭登场："今天不还钱，谁也别想下班！"' }
    ],
    reward: { coin: 85, items: ['it_cloth'], attr: { mny: 1 } },
    cooldown: 4
  },
  {
    id: 'dg_office', name: '深夜写字楼', world: 'life', minAge: 20, difficulty: 2,
    desc: '凌晨两点的写字楼灯火通明，加班的怨念在这里凝成了实体。',
    enemies: [
      { name: '加班怨灵', hp: 115, atk: 13, def: 4, skills: ['sk_dark'], intro: '怨灵顶着黑眼圈飘来："这个需求……很简单……"' },
      { name: 'PUA主管', hp: 135, atk: 15, def: 5, skills: ['sk_warcry'], intro: '主管端着咖啡："年轻人，我这是为你好。"' },
      { name: '卷王总监', hp: 190, atk: 20, def: 7, skills: ['sk_warcry', 'sk_double'], intro: '总监双眼放光："007是福报！谁赞成，谁反对？！"' }
    ],
    reward: { coin: 140, items: ['it_milktea', 'it_book'], attr: { int: 1 } },
    cooldown: 5
  },

  /* ===== 武侠 novel_wuxia ===== */
  {
    id: 'dg_heifeng', name: '黑风寨', world: 'novel_wuxia', minAge: 16, difficulty: 2,
    desc: '黑风寨劫财劫色劫外卖，官府悬赏三百两，江湖人称"新手村第一课"。',
    enemies: [
      { name: '黑风寨喽啰', hp: 120, atk: 14, def: 4, skills: ['sk_slash'], intro: '喽啰抡起朴刀："此山是我开，此树是我栽！"' },
      { name: '二当家', hp: 145, atk: 16, def: 6, skills: ['sk_smash'], intro: '二当家扛着狼牙棒："台词背完了？那就开打吧。"' },
      { name: '大当家·黑旋风', hp: 200, atk: 21, def: 8, skills: ['sk_slash', 'sk_smash'], intro: '大当家独眼一瞪："十年来，你是第七十个来送死的侠客。"' }
    ],
    reward: { coin: 165, items: ['it_saber'], attr: { str: 1 } },
    cooldown: 4
  },
  {
    id: 'dg_swordtomb', name: '剑冢', world: 'novel_wuxia', minAge: 20, difficulty: 3,
    desc: '剑魔归隐之地，埋剑三千。闯冢者胜则得名剑，败则留剑。',
    enemies: [
      { name: '守剑石人', hp: 210, atk: 18, def: 9, skills: ['sk_shield'], intro: '石人胸口插着断剑，缓缓举起石臂拦路。' },
      { name: '断剑残魂', hp: 250, atk: 22, def: 7, skills: ['sk_swordqi'], intro: '残魂执半截断剑："剑虽断，意未消。"' },
      { name: '剑魔', hp: 350, atk: 31, def: 10, skills: ['sk_swordqi', 'sk_double'], intro: '剑魔长发遮面："纵横江湖三十载，求一败而不可得。"' }
    ],
    reward: { coin: 265, items: ['it_swordqi_blade'], attr: { str: 1 } },
    cooldown: 6
  },

  /* ===== 武侠(仙侠向) novel_wuxian ===== */
  {
    id: 'dg_beastvalley', name: '万兽谷', world: 'novel_wuxian', minAge: 18, difficulty: 3,
    desc: '谷中妖兽横行，相传谷主已通灵智，会背九九乘法表。',
    enemies: [
      { name: '獠牙妖狼', hp: 200, atk: 20, def: 6, skills: ['sk_bite'], intro: '妖狼龇出半尺长的獠牙，口水滴在石上滋滋作响。' },
      { name: '碧鳞毒蟒', hp: 240, atk: 22, def: 8, skills: ['sk_poison'], intro: '毒蟒从树冠垂下："嘶嘶——晚餐自己送上门了。"' },
      { name: '万兽谷主', hp: 335, atk: 30, def: 11, skills: ['sk_thunder', 'sk_bite'], intro: '谷主九尾一展，雷光缠绕："乘法表背到几了？打不过我可要抽查。"' }
    ],
    reward: { coin: 250, items: ['it_thunder_fan', 'it_ginseng'], attr: { str: 1 } },
    cooldown: 6
  },

  /* ===== 霸总 novel_bazong ===== */
  {
    id: 'dg_board', name: '董事会夺权战', world: 'novel_bazong', minAge: 22, difficulty: 2,
    desc: '集团顶层会议室，一场没有硝烟的战争。赢了的人签字，输了的人走人。',
    enemies: [
      { name: '股东代表', hp: 115, atk: 13, def: 4, skills: ['sk_money'], intro: '股东代表敲着报表："股价跌了三个点，你拿什么赔？"' },
      { name: '法务精英', hp: 140, atk: 16, def: 6, skills: ['sk_rule'], intro: '法务精英翻开合同："第三百二十一条，你自己看。"' },
      { name: '冷面总裁', hp: 195, atk: 21, def: 8, skills: ['sk_rule', 'sk_money'], intro: '总裁转动指间的钢笔："整个集团都是我的，包括你的工位。"' }
    ],
    reward: { coin: 155, items: ['it_vest'], attr: { mny: 1 } },
    cooldown: 5
  },

  /* ===== 末世 novel_moshi ===== */
  {
    id: 'dg_lab', name: '第七实验室', world: 'novel_moshi', minAge: 18, difficulty: 3,
    desc: '灾难的源头。警报仍在循环播放："实验体收容失效，请勿投喂。"',
    enemies: [
      { name: '失控实验体', hp: 210, atk: 19, def: 7, skills: ['sk_mutant'], intro: '实验体撞碎培养舱，浑浊的营养液淌了一地。' },
      { name: '变异守卫', hp: 250, atk: 22, def: 8, skills: ['sk_bite', 'sk_shield'], intro: '曾经的保安队长皮肤灰绿，仍习惯性地敬礼，然后扑来。' },
      { name: '实验母体', hp: 350, atk: 30, def: 11, skills: ['sk_mutant', 'sk_poison'], intro: '母体睁开十几只眼睛："欢迎回家，第1024号样本。"' }
    ],
    reward: { coin: 245, items: ['it_gun'], attr: { int: 1 } },
    cooldown: 6
  },

  /* ===== 修仙 xiuxian ===== */
  {
    id: 'dg_demoncave', name: '万妖洞', world: 'xiuxian', minAge: 100, difficulty: 4,
    desc: '洞窟深处妖气冲天，无数小妖进进出出，像极了早晚高峰。',
    enemies: [
      { name: '巡山小妖', hp: 330, atk: 26, def: 10, skills: ['sk_bite'], intro: '小妖敲着锣："大王叫我来巡山——哎？有修士！"' },
      { name: '赤焰妖将', hp: 390, atk: 30, def: 12, skills: ['sk_fire'], intro: '妖将浑身冒火："洞主正在闭关渡劫，闲人免进，死人除外。"' },
      { name: '万妖洞主', hp: 545, atk: 40, def: 16, skills: ['sk_fire', 'sk_warcry'], intro: '洞主现出百丈真身："三千年了，还没人敢掀我的洞府！"' }
    ],
    reward: { coin: 330, items: ['it_elixir'], attr: { str: 1 } },
    cooldown: 7
  },
  {
    id: 'dg_demonlock', name: '锁妖塔', world: 'xiuxian', minAge: 120, difficulty: 5,
    desc: '上古仙门镇妖之所，塔高九层，层层皆镇压着毁天灭地的大魔。',
    enemies: [
      { name: '镇塔剑奴', hp: 450, atk: 30, def: 13, skills: ['sk_swordqi'], intro: '剑奴跪在塔门前，声音沙哑："回头吧，塔底的东西，不该醒。"' },
      { name: '雷狱魔将', hp: 520, atk: 36, def: 16, skills: ['sk_thunder'], intro: '魔将挣脱锁链，雷光缠身："九千年！我数了九千年的雷！"' },
      { name: '塔底大魔', hp: 730, atk: 48, def: 21, skills: ['sk_dark', 'sk_thunder', 'sk_double'], intro: '大魔睁开竖瞳，整座塔都在颤抖："放我出去，许你三界共主。"' }
    ],
    reward: { coin: 430, items: ['it_jade2', 'it_elixir'], attr: { str: 1, spr: 1 } },
    cooldown: 8
  }
];
