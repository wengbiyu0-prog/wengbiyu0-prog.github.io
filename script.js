const navLinks = Array.from(document.querySelectorAll(".rail-links a"));
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

const videoSources = [
  { src: "./mov/video-01.mp4", title: "Screening 01" },
  { src: "./mov/video-02.mp4", title: "Screening 02" },
  { src: "./mov/video-03.mp4", title: "Screening 03" }
];

const formatCount = (index, total) =>
  `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

const homePhotoImage = document.querySelector("[data-home-photo-image]");
const homePhotoCount = document.querySelector("[data-home-photo-count]");

if (homePhotoImage && homePhotoCount) {
  let photoIndex = 0;
  window.setInterval(() => {
    photoIndex = (photoIndex + 1) % photoSources.length;
    homePhotoImage.src = photoSources[photoIndex];
    homePhotoCount.textContent = formatCount(photoIndex, photoSources.length);
  }, 5000);
}

const homeVideo = document.querySelector("[data-home-video]");
const homeVideoCount = document.querySelector("[data-home-video-count]");

if (homeVideo && homeVideoCount) {
  let videoIndex = 0;
  let videoTimer = 0;
  let switchingVideo = false;

  const playHomeVideo = () => {
    switchingVideo = false;
    window.clearTimeout(videoTimer);
    homeVideo.src = videoSources[videoIndex].src;
    homeVideoCount.textContent = formatCount(videoIndex, videoSources.length);
    const start = () => {
      homeVideo.currentTime = 0;
      homeVideo.play().catch(() => {});
      videoTimer = window.setTimeout(nextHomeVideo, 10000);
    };
    if (homeVideo.readyState >= 1) {
      start();
    } else {
      homeVideo.addEventListener("loadedmetadata", start, { once: true });
      homeVideo.load();
    }
  };

  const nextHomeVideo = () => {
    if (switchingVideo) return;
    switchingVideo = true;
    videoIndex = (videoIndex + 1) % videoSources.length;
    playHomeVideo();
  };

  homeVideo.addEventListener("ended", nextHomeVideo);
  playHomeVideo();
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
