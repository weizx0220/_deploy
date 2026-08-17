/* 成就数据 · 浮生若梦
 * 契约要点：
 * - check(L, save)：L.attr/L.flags 一律防御式访问（(L.attr.int||0)、(L.flags||{})），不得抛异常。
 * - 跨文件 flag 依赖：box_opened / immortal_body / ascended / tribulation_failed /
 *   cthulhu_touched / cthulhu_vessel / jade_pendant / hunxiu / hunxiu_master /
 *   biz_empire / biz_bankrupt / superstar / world_* / *_win / married / has_child。
 * - save.stats.lives（轮回数）、save.endings（结局图鉴）由存档提供。
 */
var ACHIEVEMENTS = [

  /* ============ 寿命 ============ */
  { id: 'ac_age60', name: '花甲重开', desc: '活过六十岁，把一甲子的风雨都喝成了茶。', hidden: false, when: 'life',
    check: function (L) { return (L.age || 0) >= 60; } },
  { id: 'ac_age80', name: '耄耋之寿', desc: '活过八十岁，街坊说起你都要竖一竖大拇指。', hidden: false, when: 'life',
    check: function (L) { return (L.age || 0) >= 80; } },
  { id: 'ac_age100', name: '期颐之年', desc: '活过一百岁，阎王的生死簿上你的名字被翻得起了毛边。', hidden: false, when: 'life',
    check: function (L) { return (L.age || 0) >= 100; } },
  { id: 'ac_age150', name: '与彭祖把臂', desc: '以一百五十岁高龄谢幕，送走了一个又一个时代。', hidden: false, when: 'end',
    check: function (L) { return (L.age || 0) >= 150; } },
  { id: 'ac_age200', name: '两百年一梦', desc: '以二百岁以上的高龄谢幕，史书得为你单开一页。', hidden: true, when: 'end',
    check: function (L) { return (L.age || 0) >= 200; } },

  /* ============ 属性 ============ */
  { id: 'ac_chr15', name: '玉树临风', desc: '颜值达到 15，出门买个菜都能被围观。', hidden: false, when: 'life',
    check: function (L) { return ((L.attr && L.attr.chr) || 0) >= 15; } },
  { id: 'ac_int15', name: '才高八斗', desc: '智力达到 15，世上难有你解不开的题。', hidden: false, when: 'life',
    check: function (L) { return ((L.attr && L.attr.int) || 0) >= 15; } },
  { id: 'ac_str15', name: '铜皮铁骨', desc: '体质达到 15，感冒见你都绕道走。', hidden: false, when: 'life',
    check: function (L) { return ((L.attr && L.attr.str) || 0) >= 15; } },
  { id: 'ac_mny15', name: '家财万贯', desc: '财富达到 15，钱对你来说真的只是数字。', hidden: false, when: 'life',
    check: function (L) { return ((L.attr && L.attr.mny) || 0) >= 15; } },
  { id: 'ac_spr15', name: '知足常乐', desc: '快乐达到 15，你笑起来连阴天都放晴。', hidden: false, when: 'life',
    check: function (L) { return ((L.attr && L.attr.spr) || 0) >= 15; } },
  { id: 'ac_chr25', name: '倾国倾城', desc: '谢幕时颜值达到 25，史书工笔也画不出你三分颜色。', hidden: true, when: 'end',
    check: function (L) { return ((L.attr && L.attr.chr) || 0) >= 25; } },
  { id: 'ac_int25', name: '智近乎妖', desc: '谢幕时智力达到 25，天机在你面前像本摊开的书。', hidden: true, when: 'end',
    check: function (L) { return ((L.attr && L.attr.int) || 0) >= 25; } },
  { id: 'ac_str25', name: '肉身成圣', desc: '谢幕时体质达到 25，岁月在你身上几乎留不下痕迹。', hidden: true, when: 'end',
    check: function (L) { return ((L.attr && L.attr.str) || 0) >= 25; } },
  { id: 'ac_mny25', name: '富可敌国', desc: '谢幕时财富达到 25，国库见了你的账本都要沉默。', hidden: true, when: 'end',
    check: function (L) { return ((L.attr && L.attr.mny) || 0) >= 25; } },
  { id: 'ac_spr25', name: '极乐人间', desc: '谢幕时快乐达到 25，你这一生，是真的快活过。', hidden: true, when: 'end',
    check: function (L) { return ((L.attr && L.attr.spr) || 0) >= 25; } },
  { id: 'ac_all10', name: '五维俱全', desc: '五项属性同时不低于 10，德智体美劳全面发展的别人家的孩子。', hidden: false, when: 'life',
    check: function (L) {
      var a = L.attr || {};
      return (a.chr || 0) >= 10 && (a.int || 0) >= 10 && (a.str || 0) >= 10 &&
             (a.mny || 0) >= 10 && (a.spr || 0) >= 10;
    } },
  { id: 'ac_luk15', name: '气运如虹', desc: '谢幕时气运达到 15，锦鲤见你要叫一声祖师爷。', hidden: false, when: 'end',
    check: function (L) { return ((L.attr && L.attr.luk) || 0) >= 15; } },
  { id: 'ac_beauty_brain', name: '才貌双全', desc: '谢幕时颜值与智力皆达 12，老天爷追着喂饭的典型。', hidden: false, when: 'end',
    check: function (L) {
      var a = L.attr || {};
      return (a.chr || 0) >= 12 && (a.int || 0) >= 12;
    } },
  { id: 'ac_workhorse', name: '卷王本王', desc: '谢幕时智力、财富皆达 10 而快乐不超过 3——赢了一切，除了睡眠。', hidden: false, when: 'end',
    check: function (L) {
      var a = L.attr || {};
      return (a.int || 0) >= 10 && (a.mny || 0) >= 10 && (a.spr || 0) <= 3;
    } },
  { id: 'ac_old_strong', name: '老当益壮', desc: '九十岁高龄体质仍不低于 10，广场上最靓的领舞。', hidden: false, when: 'end',
    check: function (L) { return (L.age || 0) >= 90 && ((L.attr && L.attr.str) || 0) >= 10; } },

  /* ============ 路线 · 修仙 ============ */
  { id: 'ac_route_xiuxian', name: '踏入仙途', desc: '走上修仙之路，从此人间功名皆是过眼云烟。', hidden: false, when: 'life',
    check: function (L) { return L.route === 'xiuxian'; } },
  { id: 'ac_box_open', name: '百年启盒', desc: '在百岁之后开启那只神秘小盒，盒中乾坤，非亲见不能言。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.box_opened); } },
  { id: 'ac_box_keeper', name: '与盒偕老', desc: '怀揣着神秘小盒活到九十岁，它陪你比任何人都久。', hidden: true, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.has_box) && (L.age || 0) >= 90; } },
  { id: 'ac_immortal', name: '长生久视', desc: '修得护体道身，寿元不再听天命安排。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.immortal_body); } },
  { id: 'ac_ascend', name: '羽化登仙', desc: '渡过天劫，白日飞升，人间从此只留你的传说。', hidden: false, when: 'end',
    check: function (L) { return !!(L.flags && L.flags.ascended); } },
  { id: 'ac_tribulation', name: '兵解之殇', desc: '渡劫失败兵解而去，雷云散时，连叹息都是焦的。', hidden: false, when: 'end',
    check: function (L) { return !!(L.flags && L.flags.tribulation_failed); } },

  /* ============ 路线 · 书中界 ============ */
  { id: 'ac_route_novel', name: '跌落书中', desc: '一头栽进书页里，墨香扑面，再回头已非人间。', hidden: false, when: 'life',
    check: function (L) { return L.route === 'novel'; } },
  { id: 'ac_novel_any', name: '书中自有乾坤', desc: '进入任意一方书中界，纸上江湖也是江湖。', hidden: false, when: 'life',
    check: function (L) {
      var f = L.flags || {};
      return !!(f.world_wuxia || f.world_wuxian || f.world_bazong || f.world_moshi);
    } },
  { id: 'ac_world_wuxia', name: '仗剑江湖客', desc: '进入武侠书中界，从此快马轻裘，快意恩仇。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.world_wuxia); } },
  { id: 'ac_world_wuxian', name: '问道寻仙者', desc: '进入仙侠书中界，一人一剑，向长生处去。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.world_wuxian); } },
  { id: 'ac_world_bazong', name: '豪门局中人', desc: '进入霸总书中界，落地窗前整座城市都是你的背景板。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.world_bazong); } },
  { id: 'ac_world_moshi', name: '末世执火人', desc: '进入末世书中界，在废土之上，你仍选择点一盏灯。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.world_moshi); } },
  { id: 'ac_wuxia_win', name: '武林神话', desc: '在武侠界达成圆满结局，你的名号被说书人讲了百年。', hidden: false, when: 'end',
    check: function (L) { return !!(L.flags && L.flags.wuxia_win); } },
  { id: 'ac_wuxian_win', name: '剑道独尊', desc: '在仙侠界达成圆满结局，一剑光寒，万仙俯首。', hidden: false, when: 'end',
    check: function (L) { return !!(L.flags && L.flags.wuxian_win); } },
  { id: 'ac_bazong_win', name: '豪门圆满', desc: '在霸总界达成圆满结局，狗血淋头之后竟是岁月静好。', hidden: false, when: 'end',
    check: function (L) { return !!(L.flags && L.flags.bazong_win); } },
  { id: 'ac_moshi_win', name: '末日黎明', desc: '在末世界达成圆满结局，你为废土挣来了一个天亮。', hidden: false, when: 'end',
    check: function (L) { return !!(L.flags && L.flags.moshi_win); } },

  /* ============ 路线 · 其他 ============ */
  { id: 'ac_superstar', name: '顶流加冕', desc: '成为顶流巨星，你的名字挂在满城灯火之上。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.superstar); } },
  { id: 'ac_biz_empire', name: '商业帝国', desc: '建起自己的商业帝国，财经杂志封面常年被你承包。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.biz_empire); } },
  { id: 'ac_cthulhu_touched', name: '被注视者', desc: '被不可名状之物注视，你的梦里从此多了潮汐声。', hidden: true, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.cthulhu_touched); } },
  { id: 'ac_cthulhu_vessel', name: '邪神容器', desc: '成为邪神的容器，你睁开眼时，星辰为之错位。', hidden: true, when: 'end',
    check: function (L) { return !!(L.flags && L.flags.cthulhu_vessel); } },
  { id: 'ac_hunxiu', name: '魂灯初燃', desc: '踏入魂修一途，以魂为灯，照见生死的背面。', hidden: true, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.hunxiu); } },
  { id: 'ac_hunxiu_master', name: '魂归太虚', desc: '魂修大成，转世而去时连孟婆都要敬你三分。', hidden: true, when: 'end',
    check: function (L) { return !!(L.flags && L.flags.hunxiu_master); } },
  { id: 'ac_jade_life', name: '玉佑平生', desc: '戴着随身玉佩活到八十岁，它替你挡过的灾，比你想象的多。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.jade_pendant) && (L.age || 0) >= 80; } },

  /* ============ 经历 ============ */
  { id: 'ac_married', name: '喜结连理', desc: '步入婚姻，从此柴米油盐里也能开出花来。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.married); } },
  { id: 'ac_child', name: '膝下承欢', desc: '有了自己的子女，半夜冲奶粉的日子痛并快乐着。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.has_child); } },
  { id: 'ac_family', name: '儿孙绕膝', desc: '七十岁后仍有家有口，堂前笑语不断，此生足矣。', hidden: false, when: 'end',
    check: function (L) {
      var f = L.flags || {};
      return !!f.married && !!f.has_child && (L.age || 0) >= 70;
    } },
  { id: 'ac_bankrupt', name: '千金散尽', desc: '经历一次破产，从云端跌到泥里，滋味一言难尽。', hidden: false, when: 'life',
    check: function (L) { return !!(L.flags && L.flags.biz_bankrupt); } },
  { id: 'ac_comeback', name: '东山再起', desc: '破产之后再度攒下十数财富，牌桌上最狠的是回来的人。', hidden: false, when: 'life',
    check: function (L) {
      return !!(L.flags && L.flags.biz_bankrupt) && ((L.attr && L.attr.mny) || 0) >= 10;
    } },

  /* ============ 轮回与图鉴 ============ */
  { id: 'ac_first_life', name: '初历红尘', desc: '完成第一世，轮回殿的册子上添了你的第一笔。', hidden: false, when: 'end',
    check: function (L, save) { return ((save && save.stats && save.stats.lives) || 0) >= 1; } },
  { id: 'ac_lives5', name: '五世轮回', desc: '历经五世，孟婆汤的配方你都快背下来了。', hidden: false, when: 'end',
    check: function (L, save) { return ((save && save.stats && save.stats.lives) || 0) >= 5; } },
  { id: 'ac_lives10', name: '十世浮沉', desc: '历经十世，人间的剧本你看了大半，仍愿意再走一遭。', hidden: false, when: 'end',
    check: function (L, save) { return ((save && save.stats && save.stats.lives) || 0) >= 10; } },
  { id: 'ac_lives20', name: '轮回座上客', desc: '历经二十世，奈何桥头的鬼差见了你都点头打招呼。', hidden: true, when: 'end',
    check: function (L, save) { return ((save && save.stats && save.stats.lives) || 0) >= 20; } },
  { id: 'ac_endings10', name: '图鉴小成', desc: '结局图鉴集满十种，命运的岔路你走熟了不少。', hidden: false, when: 'end',
    check: function (L, save) { return ((save && save.endings && save.endings.length) || 0) >= 10; } },
  { id: 'ac_endings25', name: '阅尽千帆', desc: '结局图鉴集满二十五种，世间收场，鲜有你不曾见过的。', hidden: false, when: 'end',
    check: function (L, save) { return ((save && save.endings && save.endings.length) || 0) >= 25; } },
  { id: 'ac_endings40', name: '万象归藏', desc: '结局图鉴集满四十种，连轮回殿的判官都要向你讨教。', hidden: true, when: 'end',
    check: function (L, save) { return ((save && save.endings && save.endings.length) || 0) >= 40; } },

  /* ============ 谢幕姿态 ============ */
  { id: 'ac_die_young', name: '昙花一现', desc: '未满五岁便离开人间，像一滴未及落地的朝露。', hidden: false, when: 'end',
    check: function (L) { return (L.age || 0) <= 4; } },
  { id: 'ac_die_mid', name: '天妒英才', desc: '未及不惑之年便撒手人寰，故事停在最可惜的一页。', hidden: false, when: 'end',
    check: function (L) { var a = L.age || 0; return a >= 5 && a <= 39; } },
  { id: 'ac_lonely', name: '孤舟蓑笠', desc: '年过七十五仍未成婚，一人一伞，也走完了长长的雨巷。', hidden: false, when: 'end',
    check: function (L) { return (L.age || 0) >= 75 && !(L.flags && L.flags.married); } },
  { id: 'ac_die_poor', name: '两袖清风', desc: '年过七十而财富不足 2，来时干净，去时也干净。', hidden: false, when: 'end',
    check: function (L) { return (L.age || 0) >= 70 && ((L.attr && L.attr.mny) || 0) <= 2; } },
  { id: 'ac_die_happy', name: '含笑九泉', desc: '八十岁后带着不低于 12 的快乐谢幕，这辈子，值了。', hidden: false, when: 'end',
    check: function (L) { return (L.age || 0) >= 80 && ((L.attr && L.attr.spr) || 0) >= 12; } },

  /* ============ 趣味梗 ============ */
  { id: 'ac_unworthy', name: '人间不值得', desc: '快乐跌到 0 以下仍咬牙活到六十岁——嘴上说不值得，身体却很诚实。', hidden: false, when: 'life',
    check: function (L) { return (L.age || 0) >= 60 && ((L.attr && L.attr.spr) || 0) <= 0; } },
  { id: 'ac_fun_soul', name: '有趣的灵魂', desc: '颜值不超过 1 却依然喜结连理，证明了灵魂真的会发光。', hidden: false, when: 'life',
    check: function (L) {
      return ((L.attr && L.attr.chr) || 0) <= 1 && !!(L.flags && L.flags.married);
    } },
  { id: 'ac_poor_happy', name: '穷开心', desc: '财富不超过 1 而快乐不低于 12，兜里空空，笑声朗朗。', hidden: false, when: 'life',
    check: function (L) {
      var a = L.attr || {};
      return (a.mny || 0) <= 1 && (a.spr || 0) >= 12;
    } },
  { id: 'ac_rich_sad', name: '黄金的枷锁', desc: '财富不低于 15 而快乐不超过 2，金山压顶，笑不出来。', hidden: false, when: 'life',
    check: function (L) {
      var a = L.attr || {};
      return (a.mny || 0) >= 15 && (a.spr || 0) <= 2;
    } },
  { id: 'ac_stupid_rich', name: '傻人有傻福', desc: '智力不超过 2 却攒下 12 以上财富，财运这东西不讲道理。', hidden: true, when: 'life',
    check: function (L) {
      var a = L.attr || {};
      return (a.int || 0) <= 2 && (a.mny || 0) >= 12;
    } },
  { id: 'ac_unlucky', name: '天煞孤星', desc: '气运跌到 -3 以下，出门踩坑都踩得比别人专业。', hidden: true, when: 'life',
    check: function (L) { return ((L.attr && L.attr.luk) || 0) <= -3; } }
];
