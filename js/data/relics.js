/* 遗物数据（幽冥幻境）。效果逻辑在 cardbattle.js / rogue.js 中按 id 实现。 */
var RELICS = [
  { id: 'r_iron_heart', name: '铁血丹心', rarity: 1, desc: '爬塔期间最大生命 +15%。' },
  { id: 'r_sword_tassel', name: '残剑穗', rarity: 1, desc: '每场战斗打出的第一张攻击牌，伤害 +25%。' },
  { id: 'r_turtle', name: '龟息玉佩', rarity: 1, desc: '每回合第一次获得格挡时，额外 +5%。' },
  { id: 'r_pixiu', name: '墨玉貔貅', rarity: 1, desc: '爬塔中获得的铜钱 +40%。' },
  { id: 'r_dice', name: '灌铅骰子', rarity: 1, desc: '暴击率 +15%。' },
  { id: 'r_thunder_bead', name: '引雷珠', rarity: 2, desc: '战斗开始时，对敌方造成其最大生命 6% 的伤害。' },
  { id: 'r_armor_shard', name: '玄甲残片', rarity: 2, desc: '每场战斗开始时，获得最大生命 10% 的格挡。' },
  { id: 'r_blood_sack', name: '血玉髓', rarity: 2, desc: '每打出一张牌，回复最大生命 1%（至少 1 点）。' },
  { id: 'r_swift_boots', name: '追风靴', rarity: 2, desc: '每回合多抽 1 张牌。' },
  { id: 'r_energy_stone', name: '聚能石', rarity: 2, desc: '每场战斗第一回合能量 +1。' },
  { id: 'r_poison_vial', name: '五毒囊', rarity: 2, desc: '你的中毒伤害每层提高至 2.5%。' },
  { id: 'r_mirror', name: '照妖镜', rarity: 3, desc: '敌方的强化与弱化效果对你减半。' },
  { id: 'r_phoenix', name: '凤凰翎', rarity: 3, desc: '每趟爬塔一次：受到致命伤害时免死，并回复 20% 生命。' },
  { id: 'r_lucky_coin', name: '招财进宝', rarity: 1, desc: '获得时立即入账 80 铜钱。' }
];
