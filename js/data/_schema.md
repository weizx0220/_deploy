# 数据契约（所有数据文件必须严格遵守）

本游戏是纯前端网页游戏，无构建步骤。所有数据文件通过 `<script>` 标签按序加载，
**必须**满足以下硬性规则：

- 每个文件只定义一个顶层 `var XXX = [ ... ];`（不要用 `const/let`、不要用 import/export、不要用箭头函数以外的 ES6 之外的特性；可以用模板字符串以外的语法时请谨慎——**禁止使用模板字符串反引号**，字符串一律用单/双引号，需要拼接用 `+`）。
- 文件必须是合法 JS，能通过 `node --check`。
- 文本为简体中文，风格：现实向 / 幽默玩梗 / 玄幻修仙 / 戏剧化 皆可，忌低俗、忌政治敏感。
- id 全表唯一，前缀按文件规定。

## 属性键

| 键 | 含义 | 备注 |
|---|---|---|
| chr | 颜值 | 0-10 起步，事件可增减，可超 10 |
| int | 智力 | 同上 |
| str | 体质 | **str<=0 会病死** |
| mny | 家境/财富 | 同上 |
| spr | 快乐 | 同上 |
| luk | 气运 | 隐藏属性，玩家不可见（除非 flag `luck_revealed`） |

## 天赋文件 `talents.js` → `var TALENTS = [...]`

```js
{
  id: 't_xxx',            // 必须 t_ 前缀，全表唯一
  name: '天赋名',          // 2-6 字
  rarity: 0,              // 0凡品 1良品 2上品 3天品；天品全表不超过 8 个
  desc: '一句话描述',      // ≤40 字，可幽默
  attr: { chr: 1, int: -1 },   // 可选，开局属性加减（-3~+4 之间，天品可更高）
  flags: ['has_box'],     // 可选，终身标记
  exclusive: 'g_xxx',     // 可选，同组互斥
  unlock: 'u_rare'        // 可选，轮回殿解锁后才入池；全表 u_rare 天赋 6-10 个
}
```

### 必须包含的契约天赋（id 与 flags 固定，文案可发挥）：
- `t_box` 神秘的小盒子，rarity 3，flags:['has_box']，desc 暗示"百岁之后方可开启"
- `t_cthulhu` 不可名状之影，rarity 2，flags:['cthulhu_touched']，attr 可有正有负
- `t_jade` 随身玉佩，rarity 2，flags:['jade_pendant']
- `t_biz` 商业奇才，rarity 1，flags:['biz_mind']
- `t_star` 星光熠熠，rarity 1，flags:['star_aura']
- `t_luck` 天眷之人，rarity 2，flags:['luck_revealed']，attr:{luk:5}

## 事件文件 → 各文件定义 `var EVENTS_XXX = [...]`

```js
{
  id: 'ev_xxx',           // 全表唯一，前缀见各文件分工
  age: [18, 30],          // 触发年龄闭区间（修仙池可写 [100, 500]）
  pool: 'life',           // 可选，默认 'life'。取值：'life' | 'xiuxian' | 'novel_wuxia' | 'novel_wuxian' | 'novel_bazong' | 'novel_moshi'
  weight: 10,             // 可选默认10；罕见事件 3-5，常见 10-20
  once: true,             // 可选默认 false；剧情事件建议 true
  big: true,              // 可选；人生关键节点（会进"一生回望"）
  kind: 'good',           // 可选 'good'|'bad'|'fate'；默认普通
  cond: {                 // 可选，全部条件可组合
    attr: { int: { gte: 6 }, mny: { lt: 3 } },   // gte/gt/lte/lt/eq
    talent: 't_box',      // 或数组（任一满足）
    notTalent: 't_xxx',
    flags: ['a'],         // 需全部有
    anyFlag: ['a','b'],   // 任一
    notFlags: ['c'],
    gender: 'M',          // 'M'|'F'
    route: 'xiuxian',
    minAge: 18,
    chance: 0.3           // 额外概率门槛
  },
  text: '事件正文',        // 或 function (L) { return '...' + L.attr.int + '...'; }  L=life，可用 L.attr/L.age/L.name/L.gender
  effect: {               // 自动事件用（与 choices 二选一）
    attr: { spr: 1, str: -1 },        // 可用 "rand:-2~3" 随机区间
    setFlags: ['x'], delFlags: ['y'],
    setPool: 'xiuxian', setRoute: 'xiuxian', setAge: 100,
    kill: true, deathText: '死因描述（必须写）'
  },
  choices: [              // 选项事件用（与 effect 二选一）
    { text: '迎难而上', cond: { attr: { int: { gte: 7 } } },   // cond 可选，不满足则按钮置灰
      effect: { attr: { int: 1 }, setFlags: ['faced'] },
      result: '你咬牙挺了过去。', kind: 'good', big: true }     // result 可为 function(L)；big 默认 true
  ]
}
```

## 跨文件约定标记（flags，必须照此设置，结局/成就依赖它们）

| flag | 由谁设置 | 含义 |
|---|---|---|
| has_box | 天赋 t_box | 持有神秘小盒 |
| box_opened | events_cultivation | 百岁开盒 |
| immortal_body | events_cultivation | 修仙护体（不再自然死亡） |
| ascended | events_cultivation | 渡劫成功（配合 kill:true 结束此生） |
| tribulation_failed | events_cultivation | 渡劫失败兵解（配合 kill:true） |
| cthulhu_touched | 天赋 t_cthulhu | 被不可名状注视 |
| cthulhu_vessel | events_hidden | 成为邪神容器（配合 kill:true） |
| jade_pendant | 天赋 t_jade | 玉佩护主 |
| hunxiu | events_hidden | 踏入魂修 |
| hunxiu_master | events_hidden | 魂修大成（配合 kill:true 转世） |
| biz_mind | 天赋 t_biz | 商业头脑 |
| biz_empire | events_hidden | 建立商业帝国 |
| biz_bankrupt | events_hidden | 破产 |
| star_aura | 天赋 t_star | 星光 |
| superstar | events_hidden | 成为顶流巨星 |
| world_wuxia / world_wuxian / world_bazong / world_moshi | events_novel | 进入对应书中界（入界事件必须同时 setPool/setRoute/setAge/setFlags） |
| wuxia_win / wuxian_win / bazong_win / moshi_win | events_novel | 对应书中界达成好结局（配合 kill:true 或自然终老） |
| married | events_reality | 已婚 |
| has_child | events_reality | 有子女 |

## 路线 route 取值

`''`（凡人）| `xiuxian` | `novel` | `cthulhu` | `hunxiu` | `biz` | `star`

## 突发事件（events_sudden.js → var EVENTS_SUDDEN）

与常规事件同结构，但必须带 `sudden: true`。突发事件不参与常规年度抽取，
由引擎按年掷骰独立触发（约 13%/年，受轮回殿增益影响），卡牌带红色「突发」标记。
突发事件应有"天降横祸/横财/奇遇"的突兀感与戏剧性，weight 3-8，建议 once:true。

## 重复控制（引擎内置，无需在数据中处理）

- `once:true` 与 kill 事件：终身只触发一次
- 常规可重复事件：同一世 10 年冷却
- 突发事件：同一世 15 年冷却

## 结局文件 `endings.js` → `var ENDINGS = [...]`

```js
{ id: 'ed_xxx', name: '结局名', grade: 'S',   // SSS/SS/S/A/B/C/D/F
  priority: 100,           // 数字越大越优先；特殊结局 50-100，普通 10-40，兜底 1-5
  cond: { flags: ['ascended'] },   // 与事件 cond 同结构；兜底结局不写 cond
  verdict: '一句判词，30字以内',     // 显示在总结页
  desc: '图鉴描述，50字以内' }
```
必须包含：飞升(ascended,SSS)、兵解(tribulation_failed,A)、邪神容器(cthulhu_vessel,SS)、
魂修转世(hunxiu_master,S)、商业帝国(biz_empire,S)、顶流巨星(superstar,S)、
四个书中界胜利结局(对应 wuxia_win 等,A~SS)、
以及兜底结局：寿终正寝(minAge 75 左右,C)、英年早逝(D)、夭折(priority 更高些,F)。
另配 10+ 个按属性的趣味结局（如 int 极高→「国士无双」A、mny 极高→「富甲一方」A、spr 极低→「郁郁而终」D 等）。

## 成就文件 `achievements.js` → `var ACHIEVEMENTS = [...]`

```js
{ id: 'ac_xxx', name: '成就名', desc: '达成条件描述',
  hidden: false,           // true 则未达成时在图鉴中显示 ???
  when: 'life',            // 'life'=每次事件后检查  'end'=结算时检查
  check: function (L, save) { return L.age >= 100; } }   // L=life(含 attr/flags/route/talents/age)，save=存档
```
注意：check 必须防御式编写（L.attr.int 可能为 undefined 时用 (L.attr.int||0)）。

---

# v2 扩展契约（战斗/物品/副本/肉鸽/主线/模板）

## effect 新增字段（引擎已支持）
- `coin: 50` —— 增减货币（可为负）
- `items: ['it_xxx']` —— 获得物品（id 须存在于 items.js）
- `skills: ['sk_xxx']` —— 习得技能（id 须存在于 skills.js）

## items.js → var ITEMS
```js
{ id:'it_xxx', name:'', slot:'weapon|armor|trinket|use', rarity:0-3, desc:'≤40字',
  atk:0, def:0, hp:0,        // 装备属性（use 类忽略）
  skill:'sk_xxx',            // 可选，武器/饰品附带技能
  price:80,                  // 商店参考价
  use:{ attr:{str:1}, coin:0 } }  // slot=use 时：使用效果
```

## skills.js → var SKILLS
```js
{ id:'sk_xxx', name:'', desc:'≤30字', mult:1.6,  // 伤害倍率（普攻=1）
  heal:0, shield:0, dot:0, cd:2 }                // cd 回合数；heal 按最大生命比例 0.2
```

## dungeons.js → var DUNGEONS（传统副本：连战数场）
```js
{ id:'dg_xxx', name:'', world:'life' 或 '*', minAge:16, difficulty:1-5, desc:'',
  enemies:[{ name:'', hp:80, atk:10, def:3, skills:['sk_xxx'], intro:'登场语' }],  // 2-4 场
  reward:{ coin:80, items:['it_x'], attr:{str:1}, flags:[] },
  cooldown:5 }   // 通关后几年可再打
```
数值基准（16岁普通玩家：HP≈100, ATK≈12, DEF≈4）：难度1敌人 HP60-100/ATK8-12/DEF2-4；难度3 HP200-300/ATK18-25/DEF6-10；难度5 HP450-600/ATK30-40/DEF12-18。

## rogue.js 数据 → var ROGUE_MOBS / ROGUE_ELITES / ROGUE_BOSSES / ROGUE_EVENTS
敌人格式同副本敌人；ROGUE_EVENTS: { text, choices:[{text, effect（同事件effect）, result}] }。

## worlds.js → var WORLDS（6 个）
```js
{ id:'life|novel_wuxia|novel_wuxian|novel_bazong|novel_moshi|xiuxian',
  name:'现实都市', img:'novel_wuxia.png'(assets键), startAge:0, coinName:'铜钱',
  pool:'life', setFlags:[], setRoute:'',
  desc:'选世界界面一句话', intro:'开局旁白（2-3句世界观）',
  mainline:[ { name:'阶段名', hint:'当前目标提示', cond:{同事件cond}, reward:{coin,attr,flags,items}, toast:'达成时的文本' } ] }  // 5 阶段，末阶段奖励设置对应 *_win flag
```
注意：xiuxian 世界 startAge:100、setFlags:['box_opened','immortal_body']、setRoute:'xiuxian'；novel_* 世界 setFlags 对应 world_xxx、setRoute:'novel'。

## templates.js → var TEMPLATES
```js
{ id:'tpl_xxx', name:'', title:'', intro:'简介≤120字', suggest:'life',
  attr:{chr,int,str,mny,spr,luk}, talents:['t_star'],   // 引用现有天赋id
  extraTalents:[{id,name,rarity,desc,attr,flags}],      // 模板专属天赋
  items:['it_xxx'], coin:200, skills:['sk_xxx'] }
```
