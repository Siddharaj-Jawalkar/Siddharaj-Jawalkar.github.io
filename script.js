const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const counters = document.querySelectorAll("[data-count]");
const formatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

const animateCounter = (element) => {
  const target = Number(element.getAttribute("data-count"));
  const suffix = target === 4.5 ? "+" : "%";
  const start = performance.now();
  const duration = 1100;

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${formatter.format(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const revealElements = document.querySelectorAll(".reveal, .reveal-item");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.12,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const revealVisibleNow = () => {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
      element.classList.add("is-visible");
      revealObserver.unobserve(element);
    }
  });
};

window.addEventListener("hashchange", () => requestAnimationFrame(revealVisibleNow));
window.addEventListener("load", revealVisibleNow);
