/* 物品数据。slot: weapon兵刃 / armor衣甲 / trinket饰品 / use消耗品 */
var ITEMS = [
  /* 兵刃 */
  { id: 'it_sword', name: '青铜剑', slot: 'weapon', rarity: 0, desc: '入门利器，胜在结实。', atk: 8, price: 60 },
  { id: 'it_saber', name: '环首刀', slot: 'weapon', rarity: 1, desc: '刀背厚重，砍瓜切菜。', atk: 14, price: 120 },
  { id: 'it_swordqi_blade', name: '承影剑', slot: 'weapon', rarity: 2, desc: '剑身隐有流光，附带剑气。', atk: 20, skill: 'sk_swordqi', price: 260 },
  { id: 'it_thunder_fan', name: '雷文扇', slot: 'weapon', rarity: 3, desc: '扇动间隐有雷鸣，可引天雷。', atk: 28, skill: 'sk_thunder', price: 480 },
  { id: 'it_mic', name: '定制麦克风', slot: 'weapon', rarity: 2, desc: '粉色涂装，音浪即是武器。', atk: 16, skill: 'sk_encore', price: 300 },
  { id: 'it_keyboard', name: '机械键盘', slot: 'weapon', rarity: 1, desc: '键帽翻飞，字字诛心。', atk: 12, skill: 'sk_roast', price: 130 },
  { id: 'it_gun', name: '改装手枪', slot: 'weapon', rarity: 2, desc: '末世硬通货，七步之内又准又快。', atk: 22, price: 280 },
  /* 衣甲 */
  { id: 'it_cloth', name: '粗布短打', slot: 'armor', rarity: 0, desc: '聊胜于无的防护。', def: 4, hp: 20, price: 40 },
  { id: 'it_leather', name: '皮甲', slot: 'armor', rarity: 1, desc: '鞣制精良，行动轻便。', def: 8, hp: 40, price: 110 },
  { id: 'it_iron', name: '玄铁重铠', slot: 'armor', rarity: 2, desc: '刀枪不入，就是有点费腰。', def: 14, hp: 80, price: 250 },
  { id: 'it_hoodie', name: '粉色卫衣', slot: 'armor', rarity: 1, desc: ' oversize 款，可爱即是正义。', def: 6, hp: 50, price: 100 },
  { id: 'it_vest', name: '防弹背心', slot: 'armor', rarity: 2, desc: '关键时刻能保命。', def: 12, hp: 70, price: 240 },
  { id: 'it_robe', name: '云纹道袍', slot: 'armor', rarity: 3, desc: '灵丝织就，万法不沾。', def: 18, hp: 120, price: 460 },
  /* 饰品 */
  { id: 'it_ring', name: '幸运戒指', slot: 'trinket', rarity: 1, desc: '戴上它，抽奖手气都好了。', hp: 30, price: 90 },
  { id: 'it_amulet', name: '护身符', slot: 'trinket', rarity: 1, desc: '庙里求来的，主打一个心安。', def: 4, hp: 30, price: 80 },
  { id: 'it_jade2', name: '暖玉吊坠', slot: 'trinket', rarity: 2, desc: '温润养人，附带回春之效。', hp: 60, skill: 'sk_heal', price: 220 },
  { id: 'it_bamboo_hat', name: '旧斗笠', slot: 'trinket', rarity: 2, desc: '斗笠压眉，生人勿近。', def: 6, hp: 60, price: 200 },
  { id: 'it_crown', name: '荆棘之冠', slot: 'trinket', rarity: 3, desc: '伤人也伤己，攻击力大增。', atk: 10, hp: 80, price: 420 },
  /* 消耗品 */
  { id: 'it_apple', name: '大红苹果', slot: 'use', rarity: 0, desc: '一天一苹果，医生远离我。', price: 15, use: { attr: { str: 1 } } },
  { id: 'it_ginseng', name: '老山参', slot: 'use', rarity: 1, desc: '大补元气。', price: 60, use: { attr: { str: 2 } } },
  { id: 'it_book', name: '五年高考三年模拟', slot: 'use', rarity: 0, desc: '读完头皮发麻，但确实涨知识。', price: 25, use: { attr: { int: 1 } } },
  { id: 'it_milktea', name: '全糖奶茶', slot: 'use', rarity: 0, desc: '快乐水的含金量。', price: 20, use: { attr: { spr: 2 } } },
  { id: 'it_elixir', name: '筑基丹', slot: 'use', rarity: 2, desc: '药香扑鼻，可固本培元。', price: 180, use: { attr: { str: 3, int: 1 } } },
  { id: 'it_lotto', name: '未知盲盒', slot: 'use', rarity: 1, desc: '开之前，它同时是宝贝和废纸。', price: 50, use: { coin: 80 } }
];
