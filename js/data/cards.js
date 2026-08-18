/* 卡牌数据 v3（自身攻击百分比制）：
   dmg  = 自身攻击力的 %（如打击=100%攻击）
   block/heal = 自身最大生命的 %
   weak  = 使敌方虚弱（其攻击 -25%），持续回合数
   vuln  = 使敌方易伤（其受伤 +25%），持续回合数
   poison= 中毒层数，每层每回合造成敌方最大生命 1.5% 伤害
   str   = 本场战斗攻击伤害 +N%
   类型配色：atk 朱砂红 / skill 青玉绿；稀有度越高特效越强 */
var CARDS = [
  /* 初始/凡品 */
  { id: 'c_strike', name: '打击', type: 'atk', cost: 1, dmg: 85, rarity: 0, desc: '造成 85% 攻击的伤害', icon: 'slash' },
  { id: 'c_guard', name: '格挡', type: 'skill', cost: 1, block: 6, rarity: 0, desc: '获得最大生命 6% 的格挡', icon: 'shield' },
  { id: 'c_focus', name: '凝神', type: 'skill', cost: 0, draw: 1, rarity: 0, desc: '抽 1 张牌', icon: 'eye' },
  { id: 'c_spark', name: '电光', type: 'atk', cost: 0, dmg: 60, rarity: 0, desc: '造成 60% 攻击的伤害', icon: 'bolt' },
  /* 良品 */
  { id: 'c_heavy', name: '重劈', type: 'atk', cost: 2, dmg: 175, rarity: 1, desc: '造成 175% 攻击的伤害', icon: 'slash2' },
  { id: 'c_quick', name: '连击', type: 'atk', cost: 1, dmg: 60, hits: 2, rarity: 1, desc: '两次攻击，各 60%', icon: 'dbl' },
  { id: 'c_heal', name: '回气', type: 'skill', cost: 1, heal: 8, rarity: 1, desc: '回复最大生命 8%', icon: 'cross' },
  { id: 'c_ironwall', name: '铁壁', type: 'skill', cost: 2, block: 20, rarity: 1, desc: '获得最大生命 20% 的格挡', icon: 'shield2' },
  { id: 'c_pierce', name: '破甲刺', type: 'atk', cost: 1, dmg: 80, pierce: true, rarity: 1, desc: '无视格挡，造成 80% 攻击', icon: 'dart' },
  { id: 'c_meditate', name: '冥想', type: 'skill', cost: 0, heal: 4, draw: 1, rarity: 1, desc: '回复 4% 生命，抽 1 张牌', icon: 'moon' },
  { id: 'c_weaken', name: '挫志咒', type: 'atk', cost: 1, dmg: 60, weak: 3, rarity: 1, desc: '造成 60% 攻击，使敌方虚弱 3 回合', icon: 'drop' },
  { id: 'c_expose', name: '破绽指', type: 'atk', cost: 1, dmg: 70, vuln: 3, rarity: 1, desc: '造成 70% 攻击，使敌方易伤 3 回合', icon: 'eye' },
  /* 上品 */
  { id: 'c_fireball', name: '烈火符', type: 'atk', cost: 2, dmg: 210, rarity: 2, desc: '造成 210% 攻击的伤害', icon: 'fire' },
  { id: 'c_poison', name: '淬毒刃', type: 'atk', cost: 1, dmg: 50, poison: 3, rarity: 2, desc: '造成 50% 攻击，附加 3 层中毒', icon: 'drop' },
  { id: 'c_warcry', name: '战吼', type: 'skill', cost: 1, str: 15, rarity: 2, desc: '本场战斗攻击伤害 +15%', icon: 'horn' },
  { id: 'c_drain', name: '吸血咒', type: 'atk', cost: 2, dmg: 120, heal: 6, rarity: 2, desc: '造成 120% 攻击，回复 6% 生命', icon: 'fang' },
  { id: 'c_flurry', name: '乱舞', type: 'atk', cost: 2, dmg: 55, hits: 3, rarity: 2, desc: '三次攻击，各 55%', icon: 'star' },
  { id: 'c_shieldwiz', name: '灵盾术', type: 'skill', cost: 1, block: 8, draw: 1, rarity: 2, desc: '获得 8% 格挡，抽 1 张牌', icon: 'orb' },
  { id: 'c_roar', name: '破胆啸', type: 'skill', cost: 1, block: 8, weak: 2, rarity: 2, desc: '获得 8% 格挡，使敌方虚弱 2 回合', icon: 'horn' },
  { id: 'c_curse', name: '蚀骨咒', type: 'skill', cost: 2, vuln: 3, poison: 2, rarity: 2, desc: '使敌方易伤 3 回合并附加 2 层中毒', icon: 'moon' },
  /* 天品 */
  { id: 'c_thunder', name: '九霄神雷', type: 'atk', cost: 3, dmg: 320, rarity: 3, desc: '造成 320% 攻击的伤害', icon: 'thunder' },
  { id: 'c_barrier', name: '金钟罩', type: 'skill', cost: 3, block: 32, rarity: 3, desc: '获得最大生命 32% 的格挡', icon: 'bell' },
  { id: 'c_godslay', name: '弑神一击', type: 'atk', cost: 3, dmg: 240, pierce: true, rarity: 3, desc: '无视格挡，造成 240% 攻击', icon: 'godslay' },
  { id: 'c_phoenix', name: '凤凰涅槃', type: 'skill', cost: 2, heal: 22, draw: 1, rarity: 3, desc: '回复 22% 生命，抽 1 张牌', icon: 'phoenix' },
  { id: 'c_execute', name: '绝命斩', type: 'atk', cost: 2, dmg: 140, execute: true, rarity: 3, desc: '造成 140% 攻击；若敌方处于易伤，则 280%', icon: 'slash2' },
  /* 扩充批次 */
  { id: 'c_swift', name: '疾风剑', type: 'atk', cost: 1, dmg: 80, draw: 1, rarity: 1, desc: '造成 80% 攻击，抽 1 张牌', icon: 'bolt' },
  { id: 'c_gale', name: '旋风斩', type: 'atk', cost: 1, dmg: 45, hits: 2, rarity: 1, desc: '两次攻击，各 45%', icon: 'dbl' },
  { id: 'c_bulwark', name: '不动如山', type: 'skill', cost: 2, block: 26, rarity: 2, desc: '获得最大生命 26% 的格挡', icon: 'shield2' },
  { id: 'c_bloodrage', name: '燃血诀', type: 'skill', cost: 0, selfDmg: 5, str: 20, rarity: 2, desc: '自损 5% 生命，本场攻击 +20%', icon: 'fire' },
  { id: 'c_needle', name: '暴雨梨花针', type: 'atk', cost: 2, dmg: 25, hits: 5, rarity: 2, desc: '五次攻击，各 25%', icon: 'star' },
  { id: 'c_siphon', name: '摄灵术', type: 'skill', cost: 1, draw: 2, heal: 3, rarity: 2, desc: '抽 2 张牌，回复 3% 生命', icon: 'orb' },
  { id: 'c_mirrorblade', name: '镜花水月', type: 'skill', cost: 2, block: 12, vuln: 1, rarity: 2, desc: '获得 12% 格挡，使敌方易伤 1 回合', icon: 'moon' },
  { id: 'c_laststand', name: '背水一战', type: 'atk', cost: 1, dmg: 90, laststand: true, rarity: 3, desc: '造成 90% 攻击；生命低于 40% 时 200%', icon: 'slash2' },
  { id: 'c_toxic', name: '万毒蚀心', type: 'skill', cost: 2, poison: 4, vuln: 3, rarity: 3, desc: '附加 4 层中毒，并使敌方易伤 3 回合', icon: 'drop' },
  { id: 'c_zenith', name: '天人合一', type: 'skill', cost: 3, draw: 2, block: 15, str: 10, rarity: 3, desc: '抽 2 张牌，获得 15% 格挡，攻击 +10%', icon: 'phoenix' }
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
