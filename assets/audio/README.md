# 音频素材清单

## 当前状态：全部就位 ✅

**BGM（6 首，mp4 容器/AAC 音轨，浏览器可直接播放）**

| 文件名 | 用途 |
|---|---|
| `bgm_title.mp4` | 标题界面 |
| `bgm_draw.mp4` | 抽签界面 |
| `bgm_life.mp4` | 人生推进（默认） |
| `bgm_xiuxian.mp4` | 修仙路线（自动切换） |
| `bgm_novel.mp4` | 书中界（自动切换） |
| `bgm_summary.mp4` | 一生总结 |

`备选/` 目录是未选用的候选曲目。想换哪一首，直接用备选里的同名替换，或把新文件改成上面的文件名即可（mp3/ogg/m4a 也行，但需同步改 `js/audio.js` 里 `BGM_FILES` 的扩展名）。

**音效（5 个，来自 Mixkit 免费可商用库）**

| 文件名 | 用途 | 来源 |
|---|---|---|
| `sfx_flip.mp3` | 天赋卡翻转（翻页声） | Mixkit "Page turn single" |
| `sfx_stamp.mp3` | 盖章/成就（木头敲击） | Mixkit "Wood hard hit" |
| `sfx_tick.mp3` | 按钮点击 | Mixkit "Classic click" |
| `sfx_doom.mp3` | 死亡落幕（教堂钟声） | Mixkit "Church bell calling" |
| `sfx_thunder.mp3` | 渡劫雷劫 | Mixkit "Fast thunder impact" |

音效在代码里做了时长截断（如雷声原 29 秒，播 2.8 秒淡出），想调整改 `js/audio.js` 的 `SFX_MAXLEN`。

缺文件时的行为：自动回退到内置 WebAudio 合成音效，不会报错或静音。
