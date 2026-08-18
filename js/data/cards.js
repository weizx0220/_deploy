/* 卡牌数据 v2（百分比制）：dmg/block/heal 均为百分比——
   dmg 按敌方最大生命 % 结算，block/heal 按己方最大生命 % 结算，
   poison 每层每回合造成敌方最大生命 1.5% 伤害。
   力量（str 字段）每点使攻击牌伤害 +1%（敌方最大生命）。 */
var CARDS = [
  /* 初始/凡品 */
  { id: 'c_strike', name: '打击', type: 'atk', cost: 1, dmg: 10, rarity: 0, desc: '造成敌方最大生命 10% 的伤害', icon: 'slash' },
  { id: 'c_guard', name: '格挡', type: 'skill', cost: 1, block: 10, rarity: 0, desc: '获得己方最大生命 10% 的格挡', icon: 'shield' },
  { id: 'c_focus', name: '凝神', type: 'skill', cost: 0, draw: 1, rarity: 0, desc: '抽 1 张牌', icon: 'eye' },
  { id: 'c_spark', name: '电光', type: 'atk', cost: 0, dmg: 5, rarity: 0, desc: '造成敌方最大生命 5% 的伤害', icon: 'bolt' },
  /* 良品 */
  { id: 'c_heavy', name: '重劈', type: 'atk', cost: 2, dmg: 17, rarity: 1, desc: '造成敌方最大生命 17% 的伤害', icon: 'slash2' },
  { id: 'c_quick', name: '连击', type: 'atk', cost: 1, dmg: 6, hits: 2, rarity: 1, desc: '两次攻击，各造成 6% 伤害', icon: 'dbl' },
  { id: 'c_heal', name: '回气', type: 'skill', cost: 1, heal: 8, rarity: 1, desc: '回复己方最大生命 8%', icon: 'cross' },
  { id: 'c_ironwall', name: '铁壁', type: 'skill', cost: 2, block: 18, rarity: 1, desc: '获得己方最大生命 18% 的格挡', icon: 'shield2' },
  { id: 'c_pierce', name: '破甲刺', type: 'atk', cost: 1, dmg: 8, pierce: true, rarity: 1, desc: '无视格挡，造成 8% 伤害', icon: 'dart' },
  { id: 'c_meditate', name: '冥想', type: 'skill', cost: 0, heal: 4, draw: 1, rarity: 1, desc: '回复 4% 生命，抽 1 张牌', icon: 'moon' },
  /* 上品 */
  { id: 'c_fireball', name: '烈火符', type: 'atk', cost: 2, dmg: 21, rarity: 2, desc: '造成敌方最大生命 21% 的伤害', icon: 'fire' },
  { id: 'c_poison', name: '淬毒刃', type: 'atk', cost: 1, dmg: 5, poison: 4, rarity: 2, desc: '造成 5% 伤害，附加 4 层中毒', icon: 'drop' },
  { id: 'c_warcry', name: '战吼', type: 'skill', cost: 1, str: 3, rarity: 2, desc: '本场战斗攻击伤害 +3%', icon: 'horn' },
  { id: 'c_drain', name: '吸血咒', type: 'atk', cost: 2, dmg: 12, heal: 6, rarity: 2, desc: '造成 12% 伤害，回复 6% 生命', icon: 'fang' },
  { id: 'c_flurry', name: '乱舞', type: 'atk', cost: 2, dmg: 6, hits: 3, rarity: 2, desc: '三次攻击，各造成 6% 伤害', icon: 'star' },
  { id: 'c_shieldwiz', name: '灵盾术', type: 'skill', cost: 1, block: 6, draw: 1, rarity: 2, desc: '获得 6% 格挡，抽 1 张牌', icon: 'orb' },
  /* 天品 */
  { id: 'c_thunder', name: '九霄神雷', type: 'atk', cost: 3, dmg: 32, rarity: 3, desc: '造成敌方最大生命 32% 的伤害', icon: 'thunder' },
  { id: 'c_barrier', name: '金钟罩', type: 'skill', cost: 3, block: 30, rarity: 3, desc: '获得己方最大生命 30% 的格挡', icon: 'bell' },
  { id: 'c_godslay', name: '弑神一击', type: 'atk', cost: 3, dmg: 24, pierce: true, rarity: 3, desc: '无视格挡，造成 24% 伤害', icon: 'godslay' },
  { id: 'c_phoenix', name: '凤凰涅槃', type: 'skill', cost: 2, heal: 20, draw: 1, rarity: 3, desc: '回复 20% 生命，抽 1 张牌', icon: 'phoenix' }
];

/* 旧技能 → 卡牌 映射（习得技能/天赋/装备会将对应卡牌加入你的收藏） */
var SKILL_TO_CARD = {
  sk_slash: 'c_heavy', sk_heal: 'c_heal', sk_shield: 'c_ironwall',
  sk_poison: 'c_poison', sk_fire: 'c_fireball', sk_thunder: 'c_thunder',
  sk_double: 'c_quick', sk_warcry: 'c_warcry',
  sk_encore: 'c_phoenix', sk_roast: 'c_warcry', sk_divine_thunder: 'c_thunder',
  sk_swordqi: 'c_pierce', sk_rule: 'c_godslay', sk_money: 'c_drain', sk_mutant: 'c_fireball'
};

/* 固定底牌（不可移除） */
var BASE_DECK = ['c_strike', 'c_strike', 'c_strike', 'c_guard', 'c_guard', 'c_guard', 'c_spark', 'c_focus'];
