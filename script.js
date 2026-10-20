const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const copyButton = document.querySelector("[data-copy]");
const copyStatus = document.querySelector("[data-copy-status]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-36% 0px -56% 0px", threshold: 0 }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

const workFilters = Array.from(document.querySelectorAll("[data-work-filter]"));

const showCopyStatus = (message) => {
  if (!copyStatus) return;
  copyStatus.textContent = message;
  window.clearTimeout(showCopyStatus.timer);
  showCopyStatus.timer = window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2200);
};

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const value = copyButton.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      showCopyStatus("WeChat copied.");
    } catch {
      showCopyStatus(`WeChat: ${value}`);
    }
  });
}

const photoSources = [
  "./pic/photo-01.jpeg",
  "./pic/photo-02.jpeg",
  "./pic/photo-03.jpeg",
  "./pic/photo-04.jpeg",
  "./pic/photo-05.jpeg",
  "./pic/photo-06.jpeg",
  "./pic/photo-07.jpeg",
  "./pic/photo-08.jpeg",
  "./pic/photo-09.jpeg",
  "./pic/photo-10.jpeg",
  "./pic/photo-11.jpeg"
];

const portfolioViews = {
  all: [
    { title: "AI 视频作品", meta: "01 / AI VIDEO", description: "生成影像的实验与创作", href: "./ai-video.html", visual: "media", className: "portfolio-ai", mediaKey: "ai" },
    { title: "纪实/访谈/电影短片", meta: "02 / DOCUMENTARY", description: "从现实观察到人物与故事", href: "./video.html", visual: "media", className: "portfolio-film", mediaKey: "documentary" },
    { title: "文字创作", meta: "03 / WRITING", description: "剧本与虚构写作", href: "./writing.html", visual: "writing-image", src: "./assets/writing-fiction-lowpoly.png", alt: "低多边形夜间书房中的打开的书", className: "portfolio-writing" },
    { title: "摄影审美", meta: "04 / PHOTOGRAPHY", description: "在日常光线与空间里收集片刻", href: "./photography.html", visual: "image", src: "./pic/photo-01.jpeg", alt: "摄影作品预览", className: "portfolio-photo", sources: photoSources }
  ],
  ai: [
    { title: "广告型", meta: "AI VIDEO / 01", description: "广告影像", href: "./ai-video.html#advertising", visual: "media", className: "portfolio-ai", mediaKey: "ai.advertising" },
    { title: "剧情型", meta: "AI VIDEO / 02", description: "剧情影像", href: "./ai-video.html#story", visual: "media", className: "portfolio-ai", mediaKey: "ai.story" },
    { title: "产品宣推物料", meta: "AI VIDEO / 03", description: "产品与品牌影像", href: "./ai-video.html#product", visual: "media", className: "portfolio-ai", mediaKey: "ai.product" }
  ],
  documentary: [
    { title: "纪实", meta: "DOCUMENTARY / 01", description: "现实观察与记录", href: "./video.html#documentary", visual: "media", className: "portfolio-film", mediaKey: "documentary.documentary" },
    { title: "访谈", meta: "INTERVIEW / 02", description: "人物与对话", href: "./video.html#interview", visual: "media", className: "portfolio-film", mediaKey: "documentary.interview" },
    { title: "电影短片", meta: "SHORT FILM / 03", description: "短片叙事与影像表达", href: "./video.html#short-film", visual: "media", className: "portfolio-film", mediaKey: "documentary.shortFilm" }
  ],
  photography: [
    { title: "摄影审美", meta: "PHOTO ESSAY / 11 FRAMES", description: "在日常光线与空间里收集片刻", href: "./photography.html", visual: "image", src: "./pic/photo-01.jpeg", alt: "摄影审美作品预览", className: "portfolio-photo", sources: photoSources }
  ],
  writing: [
    { title: "虚构写作", meta: "WRITING / FICTION", description: "短篇与虚构作品", href: "./writing.html#fiction", visual: "writing-image", src: "./assets/writing-fiction-lowpoly.png", alt: "低多边形夜间书房中的打开的书", className: "portfolio-writing" },
    { title: "剧本", meta: "WRITING / SCREENPLAY", description: "剧本与戏剧写作", href: "./writing.html#screenplay", visual: "writing-image", src: "./assets/writing-stage-lowpoly.png", alt: "低多边形空舞台、幕布与聚光灯", className: "portfolio-writing" }
  ]
};

const workGrid = document.querySelector("[data-work-grid]");

const mediaEntriesFor = (key) => key.split(".").reduce((value, part) => value?.[part], window.workMediaLibrary) || [];
const flattenMediaEntries = (value) => Array.isArray(value)
  ? value.flatMap(flattenMediaEntries)
  : value && typeof value === "object" && !value.type
    ? Object.values(value).flatMap(flattenMediaEntries)
    : value ? [value] : [];
const mediaPathsFor = (key) => flattenMediaEntries(mediaEntriesFor(key))
  .filter((item) => item.type === "video" && item.src)
  .map((item) => item.src);
const posterPathsFor = (key) => flattenMediaEntries(mediaEntriesFor(key))
  .filter((item) => item.type === "external" && item.poster)
  .map((item) => item.poster);

const buildPortfolioCard = (item, index) => {
  const card = document.createElement("a");
  card.className = `portfolio-card ${item.className || ""}`;
  card.href = item.href;
  card.dataset.workCard = "";
  card.dataset.category = item.category || "";

  const visual = document.createElement("div");
  visual.className = `portfolio-visual ${item.visual === "concept" ? "writing-visual" : ""} ${item.visual === "book" ? "book-visual" : ""} ${item.visual === "writing-image" ? "writing-image-visual" : ""}`;
  if (item.visual === "media") {
    const mediaPaths = mediaPathsFor(item.mediaKey);
    const posterPaths = posterPathsFor(item.mediaKey);
    if (mediaPaths.length) {
      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.preload = "metadata";
      video.src = mediaPaths[0];
      video.dataset.reelSources = mediaPaths.join("|");
      visual.append(video);
    } else if (posterPaths.length) {
      const image = document.createElement("img");
      image.src = posterPaths[0];
      image.alt = `${item.title} 首帧`;
      if (posterPaths.length > 1) image.dataset.imageSources = posterPaths.join("|");
      visual.append(image);
    } else {
      const label = document.createElement("span");
      label.textContent = item.meta;
      const state = document.createElement("strong");
      state.textContent = "影片待上传";
      visual.append(label, state);
    }
  } else if (item.visual === "image") {
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    if (item.sources) image.dataset.imageSources = item.sources.join("|");
    if (item.sources) image.dataset.imageCount = String(item.sources.length);
    visual.append(image);
  } else if (item.visual === "writing-image") {
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    visual.append(image);
  } else if (item.visual === "video") {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.preload = "metadata";
    video.src = item.sources[0];
    video.dataset.reelSources = item.sources.join("|");
    visual.append(video);
  } else if (item.visual === "concept") {
    const title = document.createElement("span");
    title.innerHTML = "WORDS<br>IN FRAME";
    const mark = document.createElement("i");
    mark.textContent = "文思灵境";
    visual.append(title, mark);
  } else if (item.visual === "book") {
    const spine = document.createElement("span");
    spine.textContent = item.cover;
    const type = document.createElement("i");
    type.textContent = "OPEN BOOK";
    visual.append(spine, type);
  }

  const meta = document.createElement("div");
  meta.className = "portfolio-meta";
  const metaLabel = document.createElement("span");
  metaLabel.textContent = item.meta;
  meta.append(metaLabel);
  if ((item.visual === "image" && item.sources) || (item.visual === "media" && posterPathsFor(item.mediaKey).length > 1 && !mediaPathsFor(item.mediaKey).length)) {
    const count = document.createElement("span");
    count.dataset.imageCountLabel = "";
    const total = item.sources?.length || posterPathsFor(item.mediaKey).length;
    count.textContent = `01 / ${String(total).padStart(2, "0")}`;
    meta.append(count);
  }

  const heading = document.createElement("h3");
  heading.textContent = item.title;
  const description = document.createElement("p");
  description.textContent = item.description;
  card.append(visual, meta, heading, description);
  card.style.setProperty("--card-order", String(index));
  return card;
};

const renderWorkView = (viewName) => {
  if (!workGrid || !portfolioViews[viewName]) return;
  workFilters.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.workFilter === viewName));
  });
  workGrid.replaceChildren(...portfolioViews[viewName].map(buildPortfolioCard));
  startPortfolioReels(workGrid);
};

workFilters.forEach((filter) => {
  const activate = () => renderWorkView(filter.dataset.workFilter);
  filter.addEventListener("click", activate);
  filter.addEventListener("pointerenter", activate);
  filter.addEventListener("focus", activate);
});

if (workGrid) renderWorkView("all");

const formatCount = (index, total) =>
  `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

let portfolioReelTimers = [];

function startPortfolioReels(root) {
  portfolioReelTimers.forEach(window.clearInterval);
  portfolioReelTimers = [];
  root.querySelectorAll("[data-reel-sources]").forEach((video) => {
    const sources = video.dataset.reelSources.split("|");
    if (sources.length < 2) return;
    let index = 0;
    portfolioReelTimers.push(window.setInterval(() => {
      index = (index + 1) % sources.length;
      video.src = sources[index];
      video.play().catch(() => {});
    }, 10000));
  });

  root.querySelectorAll("[data-image-sources]").forEach((image) => {
    const sources = image.dataset.imageSources.split("|");
    if (sources.length < 2) return;
    let index = 0;
    portfolioReelTimers.push(window.setInterval(() => {
      index = (index + 1) % sources.length;
      image.src = sources[index];
      const count = image.closest(".portfolio-card").querySelector("[data-image-count-label]");
      if (count) count.textContent = formatCount(index, sources.length);
    }, 5000));
  });
}

const flipbook = document.querySelector("[data-flipbook]");

if (flipbook) {
  const image = flipbook.querySelector("[data-book-image]");
  const prevImage = flipbook.querySelector("[data-book-prev-image]");
  const counter = flipbook.querySelector("[data-book-count]");
  const thumbs = Array.from(flipbook.querySelectorAll("[data-book-thumb]"));
  const prev = flipbook.querySelector("[data-book-prev]");
  const next = flipbook.querySelector("[data-book-next]");
  let index = 0;
  let isTurning = false;

  const showBookPage = (nextIndex) => {
    index = (nextIndex + photoSources.length) % photoSources.length;
    const previousIndex = (index - 1 + photoSources.length) % photoSources.length;
    image.src = photoSources[index];
    prevImage.src = photoSources[previousIndex];
    counter.textContent = formatCount(index, photoSources.length);
    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === index);
    });
  };

  const turnBookPage = (nextIndex, direction) => {
    if (isTurning) return;
    isTurning = true;
    flipbook.classList.add(direction === "prev" ? "is-turning-prev" : "is-turning-next");
    window.setTimeout(() => showBookPage(nextIndex), 280);
    window.setTimeout(() => {
      flipbook.classList.remove("is-turning-prev", "is-turning-next");
      isTurning = false;
    }, 680);
  };

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.addEventListener("click", () => {
      const direction = thumbIndex < index ? "prev" : "next";
      turnBookPage(thumbIndex, direction);
    });
  });

  prev.addEventListener("click", () => turnBookPage(index - 1, "prev"));
  next.addEventListener("click", () => turnBookPage(index + 1, "next"));
}

const videoRoom = document.querySelector("[data-video-room]");

if (videoRoom) {
  const main = videoRoom.querySelector("[data-video-main]");
  const left = videoRoom.querySelector("[data-video-left]");
  const right = videoRoom.querySelector("[data-video-right]");
  const counter = videoRoom.querySelector("[data-video-count]");
  const title = videoRoom.querySelector("[data-video-title]");
  const prev = videoRoom.querySelector("[data-video-prev]");
  const next = videoRoom.querySelector("[data-video-next]");
  let index = 0;

  const setRoomVideo = (nextIndex) => {
    index = (nextIndex + videoSources.length) % videoSources.length;
    const nextIndexValue = (index + 1) % videoSources.length;
    const prevIndexValue = (index - 1 + videoSources.length) % videoSources.length;
    main.src = videoSources[index].src;
    left.src = videoSources[prevIndexValue].src;
    right.src = videoSources[nextIndexValue].src;
    counter.textContent = formatCount(index, videoSources.length);
    title.textContent = videoSources[index].title;
    left.parentElement.classList.toggle("is-empty", !videoSources[prevIndexValue]);
    right.parentElement.classList.toggle("is-empty", !videoSources[nextIndexValue]);
    main.play().catch(() => {});
  };

  next.addEventListener("click", () => setRoomVideo(index + 1));
  prev.addEventListener("click", () => setRoomVideo(index - 1));
  setRoomVideo(0);
}

const album = document.querySelector("[data-album]");

if (album) {
  const image = album.querySelector("[data-album-image]");
  const counter = album.querySelector("[data-album-count]");
  const thumbs = Array.from(album.querySelectorAll("[data-album-thumb]"));
  const prev = album.querySelector("[data-album-prev]");
  const next = album.querySelector("[data-album-next]");
  let index = 0;

  const showAlbumImage = (nextIndex) => {
    index = (nextIndex + thumbs.length) % thumbs.length;
    image.src = thumbs[index].dataset.src;
    counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(thumbs.length).padStart(2, "0")}`;
    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === index);
    });
  };

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.addEventListener("click", () => showAlbumImage(thumbIndex));
  });

  prev.addEventListener("click", () => showAlbumImage(index - 1));
  next.addEventListener("click", () => showAlbumImage(index + 1));
}

const mediaRoom = document.querySelector("[data-media-room]");

if (mediaRoom) {
  const library = window.workMediaLibrary?.[mediaRoom.dataset.mediaRoom] || {};
  const dialog = mediaRoom.querySelector("[data-media-dialog]");
  const player = dialog.querySelector("[data-media-player]");
  const empty = dialog.querySelector("[data-media-empty]");
  const external = dialog.querySelector("[data-media-external]");
  const externalPoster = dialog.querySelector("[data-media-poster]");
  const externalLink = dialog.querySelector("[data-media-link]");
  const externalCode = dialog.querySelector("[data-media-code]");
  const title = dialog.querySelector("[data-media-dialog-title]");
  const kicker = dialog.querySelector("[data-media-dialog-kicker]");
  const count = dialog.querySelector("[data-media-count]");
  const prev = dialog.querySelector("[data-media-prev]");
  const next = dialog.querySelector("[data-media-next]");
  let currentItems = [];
  let currentIndex = 0;

  const showMediaItem = (index) => {
    currentIndex = (index + currentItems.length) % currentItems.length;
    const item = currentItems[currentIndex];
    title.textContent = item.title;
    empty.hidden = true;
    count.textContent = formatCount(currentIndex, currentItems.length);
    prev.disabled = currentItems.length < 2;
    next.disabled = currentItems.length < 2;
    if (item.type === "external") {
      player.pause();
      player.removeAttribute("src");
      player.hidden = true;
      external.hidden = false;
      externalPoster.src = item.poster;
      externalLink.href = item.url;
      externalCode.textContent = item.code;
      return;
    }
    external.hidden = true;
    player.hidden = false;
    player.src = item.src;
    player.load();
    player.play().catch(() => {});
  };

  const openMedia = (key, button) => {
    currentItems = Array.isArray(library[key]) ? library[key] : [];
    currentIndex = 0;
    title.textContent = button.querySelector("strong")?.textContent || button.textContent.trim();
    kicker.textContent = `${mediaRoom.dataset.mediaRoom.toUpperCase()} / ${key.toUpperCase()}`;
    if (currentItems.length) {
      showMediaItem(0);
    } else {
      player.pause();
      player.removeAttribute("src");
      player.hidden = true;
      external.hidden = true;
      empty.hidden = false;
      count.textContent = "00 / 00";
      prev.disabled = true;
      next.disabled = true;
    }
    if (!dialog.open) dialog.showModal();
  };

  mediaRoom.querySelectorAll("[data-play-category]").forEach((button) => {
    button.addEventListener("click", () => openMedia(button.dataset.playCategory, button));
  });
  dialog.querySelector("[data-media-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    player.pause();
    player.removeAttribute("src");
    external.hidden = true;
  });
  prev.addEventListener("click", () => showMediaItem(currentIndex - 1));
  next.addEventListener("click", () => showMediaItem(currentIndex + 1));
}

const writingRoom = document.querySelector("[data-writing-room]");

if (writingRoom) {
  const crystalPrompt = writingRoom.querySelector("[data-crystal-prompt]");
  const crystalSparkles = writingRoom.querySelector("[data-crystal-sparkles]");
  const crystalMessage = "你想进入另一个空间吗？";
  [...crystalMessage].forEach((character, index) => {
    const particle = document.createElement("span");
    particle.textContent = character;
    particle.style.setProperty("--delay", `${index * 34}ms`);
    particle.style.setProperty("--scatter-x", `${Math.sin(index * 2.13) * 34}px`);
    particle.style.setProperty("--scatter-y", `${Math.cos(index * 1.71) * 30}px`);
    crystalPrompt.append(particle);
  });
  Array.from({ length: 12 }, (_, index) => {
    const spark = document.createElement("i");
    spark.style.setProperty("--angle", `${index * 30}deg`);
    spark.style.setProperty("--orbit-delay", `${index * -210}ms`);
    crystalSparkles.append(spark);
  });

  const library = window.workMediaLibrary?.writing || {};
  const dialog = writingRoom.querySelector("[data-reader-dialog]");
  const title = dialog.querySelector("[data-reader-title]");
  const category = dialog.querySelector("[data-reader-category]");
  const pageText = dialog.querySelector("[data-reader-content]");
  const pageLabel = dialog.querySelector("[data-reader-page]");
  const pageCount = dialog.querySelector("[data-reader-count]");
  const empty = dialog.querySelector("[data-reader-empty]");
  let pages = [];
  let pageIndex = 0;

  const renderReaderPage = () => {
    const current = pages[pageIndex];
    pageText.textContent = current?.content || "";
    pageText.hidden = !current;
    empty.hidden = Boolean(current);
    pageLabel.textContent = formatCount(pageIndex, pages.length || 1);
    pageCount.textContent = formatCount(pageIndex, pages.length || 1);
    dialog.querySelector("[data-reader-prev]").disabled = pageIndex === 0;
    dialog.querySelector("[data-reader-next]").disabled = pageIndex >= pages.length - 1;
  };

  writingRoom.querySelectorAll("[data-read-category]").forEach((book) => {
    book.addEventListener("click", () => {
      const key = book.dataset.readCategory;
      const works = Array.isArray(library[key]) ? library[key] : [];
      pages = works.flatMap((work) => (work.pages || [{ title: work.title, content: work.content }]).map((item) => ({ title: work.title, ...item })));
      pageIndex = 0;
      title.textContent = works[0]?.title || book.getAttribute("aria-label").replace(/^打开/, "");
      category.textContent = key === "fiction" ? "FICTION / 虚构写作" : "SCREENPLAY / 剧本";
      renderReaderPage();
      if (!dialog.open) dialog.showModal();
    });
  });

  dialog.querySelector("[data-reader-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-reader-prev]").addEventListener("click", () => {
    pageIndex = Math.max(0, pageIndex - 1);
    renderReaderPage();
  });
  dialog.querySelector("[data-reader-next]").addEventListener("click", () => {
    pageIndex = Math.min(pages.length - 1, pageIndex + 1);
    renderReaderPage();
  });
}
