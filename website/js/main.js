/**
 * SELLIS BEAUTY SPA — Main JS
 * Handles: sticky nav, hamburger menu, scroll animations,
 *          active nav link highlighting, smooth scroll
 */

/* ── Sticky Navigation ────────────────────────────────────── */
const nav = document.querySelector('.nav');

function handleNavScroll() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load

/* ── Hamburger / Mobile Nav ───────────────────────────────── */
const hamburger  = document.querySelector('.hamburger');
const mobileNav  = document.querySelector('.nav-mobile');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when any link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Close mobile nav on outside click
document.addEventListener('click', e => {
  if (mobileNav && mobileNav.classList.contains('open')) {
    if (!nav.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

/* ── Active Nav Link ──────────────────────────────────────── */
(function setActiveLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === current || href.endsWith(current))) {
      link.classList.add('active');
    }
  });
})();

/* ── Scroll Animations (Intersection Observer) ────────────── */
const animatedElements = document.querySelectorAll(
  '.fade-in, .fade-in-left, .fade-in-right'
);

if (animatedElements.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animatedElements.forEach(el => observer.observe(el));
}

/* ── Smooth Scroll for anchor links ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY
                     - parseInt(getComputedStyle(document.documentElement)
                         .getPropertyValue('--nav-height'), 10) - 20;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ── Toast Helper (used across pages) ────────────────────── */
function showToast(title, message, duration = 4000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// Expose globally
window.showToast = showToast;
