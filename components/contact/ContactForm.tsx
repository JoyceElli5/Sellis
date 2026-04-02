'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { buildWhatsAppUrl, buildContactMessage } from '@/lib/whatsapp';

type FieldKey = 'name' | 'phone' | 'subject' | 'message';

const initial = { name: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
  const [fields, setFields] = useState(initial);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const set =
    (k: FieldKey) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, phone, message } = fields;
    if (!name || !phone || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    const msg = buildContactMessage(fields);
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const inputClass =
    'w-full rounded-spa-sm border-[1.5px] border-cream-dark bg-off-white px-4 py-3 text-[0.9rem] text-text-primary outline-none transition-all duration-300 focus:border-gold focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,168,112,0.12)]';

  if (sent) {
    return (
      <div className="rounded-spa-lg bg-white p-10 text-center shadow-spa-md max-md:px-5 max-md:py-7">
        <div className="mb-3 text-[2.8rem]">✅</div>
        <h3 className="mb-2">Message Sent!</h3>
        <p className="mb-6 text-[0.9rem]">WhatsApp opened with your message. We&apos;ll reply as soon as possible.</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setSent(false);
            setFields(initial);
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-spa-lg bg-white p-10 shadow-spa-md max-md:px-5 max-md:py-7">
      <h3 className="mb-2 text-2xl">Send Us a Message</h3>
      <p className="mb-7 text-[0.875rem]">Have a question? We&apos;ll get back to you promptly.</p>

      <form onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="mb-4 rounded-spa-sm border border-red-300 bg-red-50 px-4 py-3 text-center text-[0.85rem] text-red-800">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="c-name" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
            Your Name <span className="text-gold-dark">*</span>
          </label>
          <input id="c-name" type="text" value={fields.name} onChange={set('name')} placeholder="Your full name" className={inputClass} />
        </div>
        <div className="mb-5">
          <label htmlFor="c-phone" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
            Phone / WhatsApp <span className="text-gold-dark">*</span>
          </label>
          <input id="c-phone" type="tel" value={fields.phone} onChange={set('phone')} placeholder="+233 XX XXX XXXX" className={inputClass} />
        </div>
        <div className="mb-5">
          <label htmlFor="c-subject" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
            Subject
          </label>
          <input
            id="c-subject"
            type="text"
            value={fields.subject}
            onChange={set('subject')}
            placeholder="e.g. Question about hair services"
            className={inputClass}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="c-message" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
            Message <span className="text-gold-dark">*</span>
          </label>
          <textarea
            id="c-message"
            value={fields.message}
            onChange={set('message')}
            rows={5}
            placeholder="Write your message here…"
            className={`${inputClass} min-h-[120px] resize-y`}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-spa-sm border-0 bg-gradient-to-br from-gold-dark to-gold py-4 font-sans text-[0.88rem] font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(168,134,90,0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(168,134,90,0.5)]"
        >
          💬 &nbsp;Send via WhatsApp
        </button>
      </form>
    </div>
  );
}
