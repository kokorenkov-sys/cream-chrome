document.documentElement.classList.add("js");

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const testimonials = Array.from(document.querySelectorAll(".testimonial"));
const demoForms = document.querySelectorAll("form");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const parallaxItems = Array.from(document.querySelectorAll("[data-parallax], .parallax-section"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Keep the mobile header compact while preserving normal anchor navigation.
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Открыть меню");
    }
  });
}

// Lightweight carousel for the first prototype. Content remains visible without JS.
if (testimonials.length > 1) {
  let activeIndex = 0;

  window.setInterval(() => {
    testimonials[activeIndex].classList.remove("active");
    activeIndex = (activeIndex + 1) % testimonials.length;
    testimonials[activeIndex].classList.add("active");
  }, 5000);
}

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

if (parallaxItems.length && !reduceMotion.matches) {
  let ticking = false;

  const updateParallax = () => {
    const viewportCenter = window.innerHeight / 2;

    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0.035);
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = viewportCenter - itemCenter;
      const offset = Math.max(-46, Math.min(46, distance * speed));

      item.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
    });

    ticking = false;
  };

  const requestParallax = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
}

demoForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});
