/**
 * SELLIS BEAUTY SPA — Services Page JS
 * Dynamically renders all service categories from data.js
 * and handles the sticky category filter tab navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('services-container');
  const navBar    = document.getElementById('services-nav-inner');

  if (!container) return;

  // ── Build category nav tabs ──────────────────────────────
  Object.values(servicesData).forEach(cat => {
    const btn = document.createElement('button');
    btn.className   = 'cat-btn';
    btn.textContent = cat.title;
    btn.dataset.target = cat.id;
    btn.addEventListener('click', () => scrollToCategory(cat.id));
    navBar.appendChild(btn);
  });

  // ── Render each category ─────────────────────────────────
  Object.values(servicesData).forEach(cat => {
    const section = document.createElement('section');
    section.className    = 'service-category';
    section.id           = `cat-${cat.id}`;
    section.dataset.catId = cat.id;

    let innerHtml = `
      <div class="container">
        <div class="category-header fade-in">
          <div class="cat-icon">${cat.icon}</div>
          <div class="cat-title-group">
            <span>Our Services</span>
            <h2>${cat.title}</h2>
          </div>
        </div>`;

    if (cat.subcategories) {
      // Category has subcategories (Lashes & Brows)
      Object.values(cat.subcategories).forEach(sub => {
        innerHtml += `<div class="subcategory-label">${sub.label}</div>`;
        innerHtml += `<div class="services-list">`;
        sub.services.forEach(svc => {
          innerHtml += buildServiceCard(svc, cat.title, sub.label);
        });
        innerHtml += `</div>`;
      });
    } else {
      innerHtml += `<div class="services-list">`;
      cat.services.forEach(svc => {
        innerHtml += buildServiceCard(svc, cat.title);
      });
      innerHtml += `</div>`;
    }

    innerHtml += `</div>`;
    section.innerHTML = innerHtml;
    container.appendChild(section);
  });

  // ── Stagger animation on service cards ───────────────────
  document.querySelectorAll('.service-item').forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 8) * 0.05}s`;
  });

  // Trigger main.js observers on newly created elements
  const event = new Event('services-rendered');
  document.dispatchEvent(event);

  // ── Active tab on scroll ──────────────────────────────────
  const sections = document.querySelectorAll('.service-category');
  const buttons  = document.querySelectorAll('.cat-btn');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.catId;
        buttons.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.target === id);
        });
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80', 10) + 60}px 0px -30% 0px`,
  });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Animate fade-in elements created dynamically ──────────
  const animObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => animObserver.observe(el));
});

/* ── Build a single service item card ─────────────────────── */
function buildServiceCard(svc, category, subcategory) {
  const bookingUrl = buildBookingUrl(svc, category, subcategory);
  return `
    <div class="service-item">
      <div class="service-item-name">${svc.name}</div>
      ${svc.note ? `<div class="service-item-note">※ ${svc.note}</div>` : ''}
      <div class="service-item-footer">
        <span class="service-item-price">${svc.price}</span>
        <a href="${bookingUrl}" class="service-book-btn">Book Now</a>
      </div>
    </div>`;
}

/* ── Build pre-filled booking page URL ────────────────────── */
function buildBookingUrl(svc, category, subcategory) {
  const label = subcategory
    ? `${category} › ${subcategory} › ${svc.name}`
    : `${category} › ${svc.name}`;
  return `booking.html?service=${encodeURIComponent(label)}`;
}

/* ── Smooth-scroll to a category section ─────────────────── */
function scrollToCategory(id) {
  const target = document.getElementById(`cat-${id}`);
  if (!target) return;
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80',
    10
  );
  // +60 accounts for the sticky services-nav-bar
  const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 68;
  window.scrollTo({ top: offset, behavior: 'smooth' });
}
