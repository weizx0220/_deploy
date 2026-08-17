/* 存档：localStorage 持久化 + 多档案（轮回者）系统。
   每个档案独立的成就/结局/轮回点；档案列表存于 PROFILE_KEY。 */
var Save = (function () {
  var BASE = 'life_restart_save_v1';
  var PROFILE_KEY = 'life_restart_profiles_v1';

  var defaults = {
    achievements: [],      // 已达成成就 id
    endings: [],           // 已解锁结局 id
    legacy: {
      points: 0,           // 轮回点
      talentSlots: 3,      // 天赋槽 3→5
      attrBonus: 0,        // 初始属性点加成
      unlocks: [],         // 已解锁的稀有天赋入池 id
      extras: []           // 轮回殿增益 id 列表
    },
    stats: {
      lives: 0, maxAge: 0, bestGrade: null
    }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function getItem(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function setItem(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* 隐私模式 */ } }

  /* ---------- 档案列表 ---------- */
  function loadProfiles() {
    try {
      var raw = getItem(PROFILE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && p.list && p.list.length) return p;
      }
    } catch (e) { /* fallthrough */ }
    // 首次运行或迁移：旧单存档并入"无名氏"档案
    var id = 'p' + Date.now();
    var legacyRaw = getItem(BASE);
    var prof = { list: [{ id: id, name: '无名氏' }], current: id };
    if (legacyRaw) setItem(BASE + '_' + id, legacyRaw);   // 旧档数据迁移
    setItem(PROFILE_KEY, JSON.stringify(prof));
    return prof;
  }

  var profiles = loadProfiles();

  function persistProfiles() { setItem(PROFILE_KEY, JSON.stringify(profiles)); }

  function keyOf(id) { return BASE + '_' + id; }

  function loadData(id) {
    try {
      var raw = getItem(keyOf(id));
      if (!raw) return clone(defaults);
      var data = JSON.parse(raw);
      var d = clone(defaults);
      for (var k in data) {
        if (data[k] && typeof data[k] === 'object' && !Array.isArray(data[k])) {
          for (var kk in data[k]) d[k][kk] = data[k][kk];
        } else {
          d[k] = data[k];
        }
      }
      return d;
    } catch (e) {
      return clone(defaults);
    }
  }

  var data = loadData(profiles.current);

  function save() { setItem(keyOf(profiles.current), JSON.stringify(data)); }

  return {
    data: data,
    save: save,

    /* ---------- 档案管理 ---------- */
    listProfiles: function () {
      return profiles.list.map(function (p) {
        return { id: p.id, name: p.name, current: p.id === profiles.current };
      });
    },
    currentProfileName: function () {
      for (var i = 0; i < profiles.list.length; i++) {
        if (profiles.list[i].id === profiles.current) return profiles.list[i].name;
      }
      return '无名氏';
    },
    createProfile: function (name) {
      name = (name || '').trim().slice(0, 10) || '无名氏';
      var id = 'p' + Date.now() + Math.floor(Math.random() * 1000);
      profiles.list.push({ id: id, name: name });
      profiles.current = id;
      persistProfiles();
      this.data = data = loadData(id);
      save();   // 立即落盘，新档案即查即有
      return id;
    },
    switchProfile: function (id) {
      for (var i = 0; i < profiles.list.length; i++) {
        if (profiles.list[i].id === id) {
          profiles.current = id;
          persistProfiles();
          this.data = data = loadData(id);
          return true;
        }
      }
      return false;
    },
    deleteProfile: function (id) {
      if (profiles.list.length <= 1) return false;   // 至少保留一个
      profiles.list = profiles.list.filter(function (p) { return p.id !== id; });
      try { localStorage.removeItem(keyOf(id)); } catch (e) {}
      if (profiles.current === id) {
        profiles.current = profiles.list[0].id;
        this.data = data = loadData(profiles.current);
      }
      persistProfiles();
      return true;
    },

    /* ---------- 数据操作 ---------- */
    addAchievement: function (id) {
      if (data.achievements.indexOf(id) < 0) { data.achievements.push(id); save(); return true; }
      return false;
    },
    addEnding: function (id) {
      if (data.endings.indexOf(id) < 0) { data.endings.push(id); save(); return true; }
      return false;
    },
    addLegacyPoints: function (n) { data.legacy.points += n; save(); },
    spendLegacyPoints: function (n) {
      if (data.legacy.points < n) return false;
      data.legacy.points -= n; save(); return true;
    }
  };
})();
