const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('#year');
if (year) {
  year.textContent = new Date().getFullYear();
}


// ===== Version 2.0 interactions =====

const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 16);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-card').forEach((element) => {
  revealObserver.observe(element);
});

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, {
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0
});

sections.forEach((section) => navObserver.observe(section));

if (!reducedMotion) {
  const sakuraLayer = document.querySelector('.sakura-layer');
  const petalCount = window.innerWidth < 700 ? 7 : 12;

  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'sakura-petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${12 + Math.random() * 12}s`;
    petal.style.animationDelay = `${-Math.random() * 20}s`;
    petal.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
    petal.style.opacity = `${0.28 + Math.random() * 0.42}`;
    petal.style.transform = `scale(${0.7 + Math.random() * 0.8})`;
    sakuraLayer?.appendChild(petal);
  }

  const parallax = document.querySelector('[data-parallax]');
  if (parallax) {
    window.addEventListener('pointermove', (event) => {
      if (window.innerWidth < 850) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      parallax.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, { passive: true });

    window.addEventListener('pointerleave', () => {
      parallax.style.transform = 'translate3d(0, 0, 0)';
    });
  }
}
