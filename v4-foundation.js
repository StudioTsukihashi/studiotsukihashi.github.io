
(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".v4-menu-button");
  const navigation = document.querySelector(".v4-nav");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setHeaderState = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
      document.body.style.overflow = isOpen ? "" : "hidden";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  const revealElements = document.querySelectorAll(".v4-reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14 });

    revealElements.forEach((element) => observer.observe(element));
  }

  const parallaxVisual = document.querySelector("[data-parallax-visual]");
  if (parallaxVisual && !reduceMotion) {
    window.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      parallaxVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => {
      parallaxVisual.style.transform = "";
    });
  }
})();
