
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const process = document.querySelector("[data-process]");
  const journey = document.querySelector("[data-journey]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    process?.classList.add("is-visible");
    journey?.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  if (process) observer.observe(process);
  if (journey) observer.observe(journey);
})();
