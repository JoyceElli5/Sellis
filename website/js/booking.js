/**
 * SELLIS BEAUTY SPA — Booking Page JS
 *
 * - Populates the service dropdown from data.js
 * - Pre-selects service if ?service= query param is present
 * - On submit → builds a WhatsApp message and redirects
 */

/* ── WhatsApp number (replace XXXXXXXXX with real digits) ── */
const WHATSAPP_NUMBER = '233XXXXXXXXX';

document.addEventListener('DOMContentLoaded', () => {
  populateServiceDropdown();
  preselectFromUrl();
  setupForm();
  setMinDate();
});

/* ── Populate service <select> ──────────────────────────── */
function populateServiceDropdown() {
  const select = document.getElementById('service');
  if (!select) return;

  // Placeholder option
  const placeholder = document.createElement('option');
  placeholder.value    = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select a service…';
  select.appendChild(placeholder);

  // Group by category using <optgroup>
  Object.values(servicesData).forEach(cat => {
    const group = document.createElement('optgroup');
    group.label = cat.title;

    if (cat.subcategories) {
      Object.values(cat.subcategories).forEach(sub => {
        sub.services.forEach(svc => {
          group.appendChild(makeOption(
            `${cat.title} › ${sub.label} › ${svc.name}`,
            `${svc.name} (${sub.label}) — ${svc.price}`
          ));
        });
      });
    } else {
      cat.services.forEach(svc => {
        group.appendChild(makeOption(
          `${cat.title} › ${svc.name}`,
          `${svc.name} — ${svc.price}`
        ));
      });
    }

    select.appendChild(group);
  });
}

function makeOption(value, label) {
  const opt   = document.createElement('option');
  opt.value   = value;
  opt.textContent = label;
  return opt;
}

/* ── Pre-select service from URL param ───────────────────── */
function preselectFromUrl() {
  const params  = new URLSearchParams(window.location.search);
  const service = params.get('service');
  if (!service) return;

  const select = document.getElementById('service');
  if (!select) return;

  // Find matching option
  for (const opt of select.options) {
    if (opt.value === service) {
      opt.selected = true;
      break;
    }
  }
}

/* ── Set minimum selectable date to today ────────────────── */
function setMinDate() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

/* ── Form submission → WhatsApp redirect ─────────────────── */
function setupForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const phone   = form.querySelector('#phone').value.trim();
    const service = form.querySelector('#service').value;
    const date    = form.querySelector('#date').value;
    const time    = form.querySelector('#time').value;
    const notes   = form.querySelector('#notes').value.trim();

    // Basic validation
    if (!name || !phone || !service || !date || !time) {
      showFormError('Please fill in all required fields.');
      return;
    }

    // Format date nicely
    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-GB', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    // Format time nicely
    const [h, m]  = time.split(':').map(Number);
    const ampm    = h >= 12 ? 'PM' : 'AM';
    const hour12  = ((h % 12) || 12);
    const formattedTime = `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;

    // Build WhatsApp message
    const lines = [
      '✨ *Sellis Beauty Spa — Booking Request* ✨',
      '',
      `👤 *Name:* ${name}`,
      `📞 *Phone:* ${phone}`,
      `💆 *Service:* ${service}`,
      `📅 *Date:* ${formattedDate}`,
      `⏰ *Time:* ${formattedTime}`,
    ];

    if (notes) {
      lines.push(`📝 *Notes:* ${notes}`);
    }

    lines.push('', '_Sent via Sellis Beauty Spa website_');

    const message = lines.join('\n');
    const encoded = encodeURIComponent(message);
    const url     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    // Open WhatsApp in new tab
    window.open(url, '_blank', 'noopener,noreferrer');

    // Show success feedback
    showFormSuccess();
    form.reset();
  });
}

/* ── UI helpers ──────────────────────────────────────────── */
function showFormError(msg) {
  const existing = document.querySelector('.form-feedback');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = 'form-feedback form-feedback--error';
  el.textContent = msg;
  el.style.cssText = `
    background:#fef2f2; border:1px solid #fca5a5; color:#b91c1c;
    border-radius:6px; padding:12px 16px; font-size:0.85rem;
    margin-bottom:16px; text-align:center;
  `;

  const form = document.getElementById('booking-form');
  form.insertBefore(el, form.firstChild);
  setTimeout(() => el.remove(), 5000);
}

function showFormSuccess() {
  const btn = document.querySelector('.form-submit');
  const original = btn.innerHTML;

  btn.innerHTML = '✅ &nbsp;Opening WhatsApp…';
  btn.disabled  = true;
  btn.style.opacity = '0.85';

  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled  = false;
    btn.style.opacity = '';
  }, 4000);

  if (window.showToast) {
    showToast(
      'Booking sent! 🎉',
      'We\'ll confirm your appointment on WhatsApp shortly.'
    );
  }
}
