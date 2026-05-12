const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const copyButton = document.querySelector("[data-copy]");
const copyStatus = document.querySelector("[data-copy-status]");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

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
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
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
