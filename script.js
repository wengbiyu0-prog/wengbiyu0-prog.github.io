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
