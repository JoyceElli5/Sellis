'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { servicesData } from '@/data/services';
import { buildWhatsAppUrl, buildBookingMessage } from '@/lib/whatsapp';
import styles from './BookingForm.module.css';

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [fields, setFields] = useState({ name: '', phone: '', service: '', date: '', time: '', notes: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  // Pre-select service from URL ?service= param
  useEffect(() => {
    const svc = searchParams.get('service');
    if (svc) setFields((f) => ({ ...f, service: svc }));
  }, [searchParams]);

  const today = new Date().toISOString().split('T')[0];

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const { name, phone, service, date, time } = fields;
    if (!name || !phone || !service || !date || !time) {
      setError('Please fill in all required fields.');
      return;
    }
    const msg = buildBookingMessage(fields);
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 800);
  };

  if (sent) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✅</div>
        <h3>Booking Sent!</h3>
        <p>WhatsApp opened with your booking details. We&apos;ll confirm your appointment shortly.</p>
        <button className="btn btn-primary" onClick={() => { setSent(false); setFields({ name:'', phone:'', service:'', date:'', time:'', notes:'' }); }}>
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h2>Reserve Your Spot</h2>
      <p>All fields marked <span className={styles.req}>*</span> are required.</p>

      <form onSubmit={handleSubmit} noValidate>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.row}>
          <div className={styles.group}>
            <label htmlFor="name">Full Name <span className={styles.req}>*</span></label>
            <input id="name" type="text" value={fields.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" />
          </div>
          <div className={styles.group}>
            <label htmlFor="phone">Phone Number <span className={styles.req}>*</span></label>
            <input id="phone" type="tel" value={fields.phone} onChange={set('phone')} placeholder="+233 XX XXX XXXX" autoComplete="tel" />
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="service">Service <span className={styles.req}>*</span></label>
          <select id="service" value={fields.service} onChange={set('service')}>
            <option value="" disabled>Select a service…</option>
            {Object.values(servicesData).map((cat) => (
              <optgroup key={cat.id} label={cat.title}>
                {cat.subcategories
                  ? Object.values(cat.subcategories).flatMap((sub) =>
                      sub.services.map((svc) => (
                        <option key={`${cat.id}-${sub.label}-${svc.name}`} value={`${cat.title} › ${sub.label} › ${svc.name}`}>
                          {svc.name} ({sub.label}) — {svc.price}
                        </option>
                      ))
                    )
                  : cat.services.map((svc) => (
                      <option key={`${cat.id}-${svc.name}`} value={`${cat.title} › ${svc.name}`}>
                        {svc.name} — {svc.price}
                      </option>
                    ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label htmlFor="date">Preferred Date <span className={styles.req}>*</span></label>
            <input id="date" type="date" value={fields.date} onChange={set('date')} min={today} />
          </div>
          <div className={styles.group}>
            <label htmlFor="time">Preferred Time <span className={styles.req}>*</span></label>
            <input id="time" type="time" value={fields.time} onChange={set('time')} min="08:00" max="20:00" />
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="notes">Additional Notes</label>
          <textarea id="notes" value={fields.notes} onChange={set('notes')} placeholder="Any special requests, allergies or details we should know…" rows={4} />
        </div>

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? 'Opening WhatsApp…' : '📲  Send Booking via WhatsApp'}
        </button>
      </form>
    </div>
  );
}
