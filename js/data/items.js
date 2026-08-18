/* 物品数据。slot: weapon兵刃 / armor衣甲 / trinket饰品 / use消耗品 */
var ITEMS = [
  /* 兵刃 */
  { id: 'it_sword', name: '青铜剑', slot: 'weapon', rarity: 0, desc: '入门利器，胜在结实。', atk: 8, price: 60 },
  { id: 'it_saber', name: '环首刀', slot: 'weapon', rarity: 1, desc: '刀背厚重，砍瓜切菜。', atk: 14, atkPct: 4, price: 120 },
  { id: 'it_swordqi_blade', name: '承影剑', slot: 'weapon', rarity: 2, desc: '剑身隐有流光，附带剑气。', atk: 20, skill: 'sk_swordqi', atkPct: 8, price: 260 },
  { id: 'it_thunder_fan', name: '雷文扇', slot: 'weapon', rarity: 3, desc: '扇动间隐有雷鸣，可引天雷。', atk: 28, skill: 'sk_thunder', atkPct: 12, price: 480 },
  { id: 'it_mic', name: '定制麦克风', slot: 'weapon', rarity: 2, desc: '粉色涂装，音浪即是武器。', atk: 16, skill: 'sk_encore', atkPct: 8, price: 300 },
  { id: 'it_keyboard', name: '机械键盘', slot: 'weapon', rarity: 1, desc: '键帽翻飞，字字诛心。', atk: 12, skill: 'sk_roast', atkPct: 4, price: 130 },
  { id: 'it_gun', name: '改装手枪', slot: 'weapon', rarity: 2, desc: '末世硬通货，七步之内又准又快。', atk: 22, atkPct: 8, price: 280 },
  /* 衣甲 */
  { id: 'it_cloth', name: '粗布短打', slot: 'armor', rarity: 0, desc: '聊胜于无的防护。', def: 4, hp: 20, price: 40 },
  { id: 'it_leather', name: '皮甲', slot: 'armor', rarity: 1, desc: '鞣制精良，行动轻便。', def: 8, hp: 40, hpPct: 4, price: 110 },
  { id: 'it_iron', name: '玄铁重铠', slot: 'armor', rarity: 2, desc: '刀枪不入，就是有点费腰。', def: 14, hp: 80, hpPct: 8, price: 250 },
  { id: 'it_hoodie', name: '粉色卫衣', slot: 'armor', rarity: 1, desc: ' oversize 款，可爱即是正义。', def: 6, hp: 50, hpPct: 4, price: 100 },
  { id: 'it_vest', name: '防弹背心', slot: 'armor', rarity: 2, desc: '关键时刻能保命。', def: 12, hp: 70, hpPct: 8, price: 240 },
  { id: 'it_robe', name: '云纹道袍', slot: 'armor', rarity: 3, desc: '灵丝织就，万法不沾。', def: 18, hp: 120, hpPct: 12, price: 460 },
  /* 饰品 */
  { id: 'it_ring', name: '幸运戒指', slot: 'trinket', rarity: 1, desc: '戴上它，抽奖手气都好了。', hp: 30, hpPct: 3, price: 90 },
  { id: 'it_amulet', name: '护身符', slot: 'charm', rarity: 1, desc: '庙里求来的，主打一个心安。', def: 4, hp: 30, hpPct: 3, price: 80 },
  { id: 'it_jade2', name: '暖玉吊坠', slot: 'charm', rarity: 2, desc: '温润养人，附带回春之效。', hp: 60, skill: 'sk_heal', hpPct: 7, price: 220 },
  { id: 'it_bamboo_hat', name: '旧斗笠', slot: 'head', rarity: 2, desc: '斗笠压眉，生人勿近。', def: 6, hp: 60, hpPct: 7, price: 200 },
  { id: 'it_crown', name: '荆棘之冠', slot: 'head', rarity: 3, desc: '伤人也伤己，攻击力大增。', atk: 10, hp: 80, hpPct: 11, price: 420 },
  /* 头饰 */
  { id: 'it_headband', name: '束发金冠', slot: 'head', rarity: 1, desc: '束发正冠，气度自生。', def: 3, hp: 35, hpPct: 3, price: 95 },
  /* 法宝 */
  { id: 'it_bell', name: '摄魂铃', slot: 'charm', rarity: 2, desc: '铃音一响，敌胆俱寒。', atk: 6, hp: 40, hpPct: 7, price: 230 },
  /* 百分比神装（atkPct/hpPct/defPct 为战斗百分比加成） */
  { id: 'it_zhuxian', name: '诛仙古剑', slot: 'weapon', rarity: 3, desc: '剑鸣一声，万邪辟易。攻击提升 25%。', atk: 20, atkPct: 25, price: 900 },
  { id: 'it_mangpao', name: '不死蟒袍', slot: 'armor', rarity: 3, desc: '蟒纹暗涌，生机不绝。生命提升 25%。', def: 12, hpPct: 25, price: 880 },
  { id: 'it_shanhe', name: '山河社稷图', slot: 'charm', rarity: 3, desc: '一图藏山河。防御提升 30%。', def: 10, defPct: 30, price: 860 },
  { id: 'it_tianji', name: '天机筹', slot: 'trinket', rarity: 3, desc: '算无遗策。攻击与生命各提升 12%。', atkPct: 12, hpPct: 12, price: 800 },
  { id: 'it_wolfhelm', name: '狼首盔', slot: 'head', rarity: 2, desc: '塞北狼王的头颅所制。', def: 6, hp: 60, hpPct: 7, price: 240 },
  { id: 'it_phoenix_pin', name: '凤尾簪', slot: 'head', rarity: 2, desc: '凤羽点翠，顾盼生辉。', atk: 4, hp: 40, hpPct: 7, price: 210 },
  { id: 'it_gourd', name: '乾坤葫芦', slot: 'charm', rarity: 1, desc: '能装五湖四海，也能挡三灾八难。', def: 5, hp: 35, hpPct: 3, price: 120 },
  { id: 'it_dagger', name: '袖里剑', slot: 'weapon', rarity: 1, desc: '藏于袖中，出其不意。', atk: 10, atkPct: 4, price: 100 },
  { id: 'it_monkrobe', name: '百衲衣', slot: 'armor', rarity: 1, desc: '千针万线，皆是祝愿。', def: 7, hp: 45, hpPct: 4, price: 115 },
  { id: 'it_pearl', name: '东珠耳坠', slot: 'trinket', rarity: 1, desc: '珠光温润，衬得人愈发精神。', hp: 40, hpPct: 3, price: 85 },
  /* 消耗品 */
  { id: 'it_apple', name: '大红苹果', slot: 'use', rarity: 0, desc: '一天一苹果，医生远离我。', price: 15, use: { attr: { str: 1 } } },
  { id: 'it_ginseng', name: '老山参', slot: 'use', rarity: 1, desc: '大补元气，亦可吊命疗伤。', price: 60, use: { attr: { str: 2 }, wound: 1 } },
  { id: 'it_book', name: '五年高考三年模拟', slot: 'use', rarity: 0, desc: '读完头皮发麻，但确实涨知识。', price: 25, use: { attr: { int: 1 } } },
  { id: 'it_milktea', name: '全糖奶茶', slot: 'use', rarity: 0, desc: '快乐水的含金量。', price: 20, use: { attr: { spr: 2 } } },
  { id: 'it_elixir', name: '筑基丹', slot: 'use', rarity: 2, desc: '药香扑鼻，可固本培元、活肉生肌。', price: 180, use: { attr: { str: 3, int: 1 }, wound: 2 } },
  { id: 'it_lotto', name: '未知盲盒', slot: 'use', rarity: 1, desc: '开之前，它同时是宝贝和废纸。', price: 50, use: { coin: 80 } }
];
