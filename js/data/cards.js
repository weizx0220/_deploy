/* 卡牌数据（肉鸽卡牌战斗）。type: atk 攻击 / skill 技能
   字段：cost 能量, dmg 伤害, hits 多段, block 格挡, heal 回血, draw 抽牌,
        str 力量（本场攻击+str）, poison 中毒（每回合结算）, pierce 无视格挡 */
var CARDS = [
  /* 初始/凡品 */
  { id: 'c_strike', name: '打击', type: 'atk', cost: 1, dmg: 6, rarity: 0, desc: '造成 6 点伤害', icon: 'slash' },
  { id: 'c_guard', name: '格挡', type: 'skill', cost: 1, block: 5, rarity: 0, desc: '获得 5 点格挡', icon: 'shield' },
  { id: 'c_focus', name: '凝神', type: 'skill', cost: 0, draw: 1, rarity: 0, desc: '抽 1 张牌', icon: 'eye' },
  { id: 'c_spark', name: '电光', type: 'atk', cost: 0, dmg: 3, rarity: 0, desc: '造成 3 点伤害', icon: 'bolt' },
  /* 良品 */
  { id: 'c_heavy', name: '重劈', type: 'atk', cost: 2, dmg: 11, rarity: 1, desc: '造成 11 点伤害', icon: 'slash2' },
  { id: 'c_quick', name: '连击', type: 'atk', cost: 1, dmg: 4, hits: 2, rarity: 1, desc: '造成 4 点伤害两次', icon: 'dbl' },
  { id: 'c_heal', name: '回气', type: 'skill', cost: 1, heal: 6, rarity: 1, desc: '回复 6 点生命', icon: 'cross' },
  { id: 'c_ironwall', name: '铁壁', type: 'skill', cost: 2, block: 12, rarity: 1, desc: '获得 12 点格挡', icon: 'shield2' },
  { id: 'c_pierce', name: '破甲刺', type: 'atk', cost: 1, dmg: 5, pierce: true, rarity: 1, desc: '无视格挡，造成 5 点伤害', icon: 'dart' },
  { id: 'c_meditate', name: '冥想', type: 'skill', cost: 0, heal: 3, draw: 1, rarity: 1, desc: '回复 3 点生命，抽 1 张牌', icon: 'moon' },
  /* 上品 */
  { id: 'c_fireball', name: '烈火符', type: 'atk', cost: 2, dmg: 14, rarity: 2, desc: '造成 14 点伤害', icon: 'fire' },
  { id: 'c_poison', name: '淬毒刃', type: 'atk', cost: 1, dmg: 3, poison: 4, rarity: 2, desc: '造成 3 点伤害，附加 4 层中毒', icon: 'drop' },
  { id: 'c_warcry', name: '战吼', type: 'skill', cost: 1, str: 2, rarity: 2, desc: '本场战斗攻击 +2', icon: 'horn' },
  { id: 'c_drain', name: '吸血咒', type: 'atk', cost: 2, dmg: 8, heal: 4, rarity: 2, desc: '造成 8 点伤害，回复 4 点生命', icon: 'fang' },
  { id: 'c_flurry', name: '乱舞', type: 'atk', cost: 2, dmg: 4, hits: 3, rarity: 2, desc: '造成 4 点伤害三次', icon: 'star' },
  { id: 'c_shieldwiz', name: '灵盾术', type: 'skill', cost: 1, block: 4, draw: 1, rarity: 2, desc: '获得 4 点格挡，抽 1 张牌', icon: 'orb' },
  /* 天品 */
  { id: 'c_thunder', name: '九霄神雷', type: 'atk', cost: 3, dmg: 22, rarity: 3, desc: '造成 22 点伤害', icon: 'thunder' },
  { id: 'c_barrier', name: '金钟罩', type: 'skill', cost: 3, block: 20, rarity: 3, desc: '获得 20 点格挡', icon: 'bell' },
  { id: 'c_godslay', name: '弑神一击', type: 'atk', cost: 3, dmg: 16, pierce: true, hits: 1, rarity: 3, desc: '无视格挡，造成 16 点伤害', icon: 'godslay' },
  { id: 'c_phoenix', name: '凤凰涅槃', type: 'skill', cost: 2, heal: 14, draw: 1, rarity: 3, desc: '回复 14 点生命，抽 1 张牌', icon: 'phoenix' }
];

/* 旧技能 → 卡牌 映射（拥有的技能/天赋/装备会往牌组里塞对应卡牌） */
var SKILL_TO_CARD = {
  sk_slash: 'c_heavy', sk_heal: 'c_heal', sk_shield: 'c_ironwall',
  sk_poison: 'c_poison', sk_fire: 'c_fireball', sk_thunder: 'c_thunder',
  sk_double: 'c_quick', sk_warcry: 'c_warcry',
  sk_encore: 'c_phoenix', sk_roast: 'c_warcry', sk_divine_thunder: 'c_thunder',
  sk_swordqi: 'c_pierce', sk_rule: 'c_godslay', sk_money: 'c_drain', sk_mutant: 'c_fireball'
};
