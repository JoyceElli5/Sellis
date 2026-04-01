'use client';

import { useState } from 'react';
import { buildWhatsAppUrl, buildContactMessage } from '@/lib/whatsapp';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [fields, setFields] = useState({ name: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, message } = fields;
    if (!name || !phone || !message) { setError('Please fill in all required fields.'); return; }
    const msg = buildContactMessage(fields);
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  if (sent) {
    return (
      <div className={styles.success}>
        <div className={styles.check}>✅</div>
        <h3>Message Sent!</h3>
        <p>WhatsApp opened with your message. We&apos;ll reply as soon as possible.</p>
        <button className="btn btn-primary" onClick={() => { setSent(false); setFields({ name:'', phone:'', subject:'', message:'' }); }}>
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h3>Send Us a Message</h3>
      <p>Have a question? We&apos;ll get back to you promptly.</p>

      <form onSubmit={handleSubmit} noValidate>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.group}>
          <label htmlFor="c-name">Your Name <span className={styles.req}>*</span></label>
          <input id="c-name" type="text" value={fields.name} onChange={set('name')} placeholder="Your full name" />
        </div>
        <div className={styles.group}>
          <label htmlFor="c-phone">Phone / WhatsApp <span className={styles.req}>*</span></label>
          <input id="c-phone" type="tel" value={fields.phone} onChange={set('phone')} placeholder="+233 XX XXX XXXX" />
        </div>
        <div className={styles.group}>
          <label htmlFor="c-subject">Subject</label>
          <input id="c-subject" type="text" value={fields.subject} onChange={set('subject')} placeholder="e.g. Question about hair services" />
        </div>
        <div className={styles.group}>
          <label htmlFor="c-message">Message <span className={styles.req}>*</span></label>
          <textarea id="c-message" value={fields.message} onChange={set('message')} rows={5} placeholder="Write your message here…" />
        </div>

        <button type="submit" className={styles.submit}>
          💬 &nbsp;Send via WhatsApp
        </button>
      </form>
    </div>
  );
}
