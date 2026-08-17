/* 技能数据。mult 伤害倍率；heal/shield 按最大生命比例；dot 每回合持续伤害；cd 冷却回合 */
var SKILLS = [
  /* 通用 */
  { id: 'sk_slash', name: '重击', desc: '蓄力一击 ×1.6', mult: 1.6, cd: 2 },
  { id: 'sk_heal', name: '回春诀', desc: '回复 25% 生命', heal: 0.25, cd: 3 },
  { id: 'sk_shield', name: '铁壁', desc: '获得 30% 护盾', shield: 0.3, cd: 3 },
  { id: 'sk_poison', name: '淬毒刃', desc: '×1.1 并附加持续伤害', mult: 1.1, dot: 4, cd: 2 },
  { id: 'sk_fire', name: '烈火掌', desc: '烈焰燎原 ×1.9', mult: 1.9, cd: 3 },
  { id: 'sk_thunder', name: '引雷术', desc: '天雷轰顶 ×2.2', mult: 2.2, cd: 4 },
  { id: 'sk_double', name: '二连斩', desc: '快速两击 ×1.4', mult: 1.4, cd: 1 },
  { id: 'sk_warcry', name: '破胆怒吼', desc: '气势压制 ×1.5', mult: 1.5, cd: 2 },
  /* 怪物用 */
  { id: 'sk_bite', name: '撕咬', desc: '', mult: 1.3, cd: 0 },
  { id: 'sk_smash', name: '猛击', desc: '', mult: 1.5, cd: 0 },
  { id: 'sk_dark', name: '暗蚀', desc: '', mult: 1.4, dot: 3, cd: 0 },
  /* 角色模板 */
  { id: 'sk_encore', name: '安可曲', desc: '塔菲的歌声，回复 20% 生命', heal: 0.2, cd: 2 },
  { id: 'sk_roast', name: '儒雅随和', desc: '嘴炮输出 ×1.7', mult: 1.7, cd: 2 },
  { id: 'sk_divine_thunder', name: '神雷天降', desc: '登神之威 ×2.4', mult: 2.4, cd: 3 },
  /* 世界特色 */
  { id: 'sk_swordqi', name: '剑气纵横', desc: '剑气外放 ×1.8', mult: 1.8, cd: 2 },
  { id: 'sk_rule', name: '规则抹杀', desc: '无限流专属 ×2.0', mult: 2.0, cd: 3 },
  { id: 'sk_money', name: '钞能力', desc: '金钱的力量 ×1.8', mult: 1.8, cd: 2 },
  { id: 'sk_mutant', name: '异能爆发', desc: '末世异能 ×1.8', mult: 1.8, cd: 2 }
];
