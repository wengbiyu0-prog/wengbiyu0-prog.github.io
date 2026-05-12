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
