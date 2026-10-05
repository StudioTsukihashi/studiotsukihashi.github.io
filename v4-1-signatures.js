
(() => {
  const layer = document.querySelector("[data-sakura-layer]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!layer || reduceMotion) return;

  const petalCount = Math.min(34, Math.max(18, Math.round(window.innerWidth / 48)));

  const rand = (min, max) => Math.random() * (max - min) + min;

  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "sakura-petal";
    petal.style.setProperty("--x", `${rand(-4, 102)}vw`);
    petal.style.setProperty("--size", `${rand(7, 15)}px`);
    petal.style.setProperty("--opacity", rand(.35, .82).toFixed(2));
    petal.style.setProperty("--duration", `${rand(13, 24)}s`);
    petal.style.setProperty("--sway", `${rand(2.8, 6.8)}s`);
    petal.style.setProperty("--delay", `${rand(-24, 0)}s`);
    petal.style.setProperty("--drift-a", `${rand(-4, 7)}vw`);
    petal.style.setProperty("--drift-b", `${rand(-9, 11)}vw`);
    petal.style.setProperty("--drift-c", `${rand(-13, 15)}vw`);
    layer.appendChild(petal);
  }
})();
