const quarkShare = {
  url: "https://pan.quark.cn/s/5c7e7589489c",
  code: "BiEM5"
};

const externalWork = (title, poster) => ({
  type: "external",
  title,
  poster: `./posters/${poster}.jpg`,
  url: quarkShare.url,
  code: quarkShare.code
});

const playableWork = (title, src) => ({ type: "video", title, src });

window.workMediaLibrary = {
  ai: {
    advertising: [
      playableWork("我的世界", "./mov/ai-advertising/minecraft.mp4"),
      playableWork("姆明山谷", "./mov/ai-advertising/moomin-valley.mp4"),
      playableWork("动森游戏", "./mov/ai-advertising/animal-crossing.mp4"),
      externalWork("可乐广告", "coke"),
      externalWork("POP MART 广告", "popmart")
    ],
    story: [
      playableWork("荒唐的婚礼", "./mov/ai-story/wedding.mp4"),
      playableWork("图书馆邂逅", "./mov/ai-story/library-meet-cute.mp4"),
      externalWork("小王子", "little-prince"),
      externalWork("会读心的男人", "mind-reading-man"),
      externalWork("纸飞机", "paper-plane"),
      externalWork("小猫流浪记", "stray-kitten"),
      externalWork("午夜图书馆奇遇", "midnight-library")
    ],
    product: [
      playableWork("Dzine Video Enhance", "./mov/ai-product/dzine-video-enhance-web.mp4"),
      externalWork("Ani 宣传素材", "ani-promo")
    ]
  },
  documentary: {
    documentary: [
      externalWork("追风少年（重剪版）", "chasing-wind"),
      externalWork("鱼群的两种预言", "fish-prophecies")
    ],
    interview: [
      playableWork("从前慢", "./mov/interview/from-before.mp4")
    ],
    shortFilm: [
      playableWork("绩点为王", "./mov/short-film/grade-kings.mp4"),
      playableWork("致陌生人（重剪版）", "./mov/short-film/stranger-web.mp4")
    ]
  },
  writing: { fiction: [], screenplay: [] }
};
