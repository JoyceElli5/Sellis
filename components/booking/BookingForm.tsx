'use client';

import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { servicesData } from '@/data/services';
import { buildWhatsAppUrl, buildBookingMessage } from '@/lib/whatsapp';

type FieldKey = 'name' | 'phone' | 'service' | 'date' | 'time' | 'notes';

const emptyFields = { name: '', phone: '', service: '', date: '', time: '', notes: '' };

const selectChevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A870' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")] bg-[length:12px_7px] bg-[right_14px_center] bg-no-repeat pr-10";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [fields, setFields] = useState(emptyFields);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const svc = searchParams.get('service');
    if (svc) setFields((f) => ({ ...f, service: svc }));
  }, [searchParams]);

  const today = new Date().toISOString().split('T')[0] ?? '';

  const set =
    (k: FieldKey) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
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
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  const fieldClass =
    'w-full appearance-none rounded-spa-sm border-[1.5px] border-cream-dark bg-off-white px-4 py-3 text-[0.9rem] text-text-primary outline-none transition-all duration-300 focus:border-gold focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,168,112,0.12)]';

  if (sent) {
    return (
      <div className="rounded-spa-lg bg-white p-12 text-center shadow-spa-md max-md:px-5 max-md:py-7">
        <div className="mb-4 text-5xl">✅</div>
        <h3 className="mb-2.5">Booking Sent!</h3>
        <p className="mb-7 text-[0.9rem]">WhatsApp opened with your booking details. We&apos;ll confirm your appointment shortly.</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setSent(false);
            setFields(emptyFields);
          }}
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-spa-lg bg-white p-12 shadow-spa-md max-md:px-5 max-md:py-7">
      <h2 className="mb-2">Reserve Your Spot</h2>
      <p className="mb-8 text-[0.9rem]">
        All fields marked <span className="text-gold-dark">*</span> are required.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="mb-4 rounded-spa-sm border border-red-300 bg-red-50 px-4 py-3 text-center text-[0.85rem] text-red-800">
            {error}
          </div>
        )}

        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
              Full Name <span className="text-gold-dark">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={fields.name}
              onChange={set('name')}
              placeholder="Your full name"
              autoComplete="name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
              Phone Number <span className="text-gold-dark">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={fields.phone}
              onChange={set('phone')}
              placeholder="+233 XX XXX XXXX"
              autoComplete="tel"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="service" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
            Service <span className="text-gold-dark">*</span>
          </label>
          <select
            id="service"
            value={fields.service}
            onChange={set('service')}
            className={`${fieldClass} cursor-pointer ${selectChevron}`}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {Object.values(servicesData).map((cat) => (
              <optgroup key={cat.id} label={cat.title}>
                {cat.subcategories
                  ? Object.values(cat.subcategories).flatMap((sub) =>
                      sub.services.map((svc) => (
                        <option
                          key={`${cat.id}-${sub.label}-${svc.name}`}
                          value={`${cat.title} › ${sub.label} › ${svc.name}`}
                        >
                          {svc.name} ({sub.label}) — {svc.price}
                        </option>
                      ))
                    )
                  : cat.services?.map((svc) => (
                      <option key={`${cat.id}-${svc.name}`} value={`${cat.title} › ${svc.name}`}>
                        {svc.name} — {svc.price}
                      </option>
                    ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
              Preferred Date <span className="text-gold-dark">*</span>
            </label>
            <input id="date" type="date" value={fields.date} onChange={set('date')} min={today} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="time" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
              Preferred Time <span className="text-gold-dark">*</span>
            </label>
            <input
              id="time"
              type="time"
              value={fields.time}
              onChange={set('time')}
              min="08:00"
              max="20:00"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="notes" className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary">
            Additional Notes
          </label>
          <textarea
            id="notes"
            value={fields.notes}
            onChange={set('notes')}
            placeholder="Any special requests, allergies or details we should know…"
            rows={4}
            className={`${fieldClass} min-h-24 resize-y`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2.5 w-full cursor-pointer rounded-spa-sm border-0 bg-gradient-to-br from-gold-dark to-gold py-4 font-sans text-[0.88rem] font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(168,134,90,0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(168,134,90,0.5)] disabled:cursor-not-allowed disabled:opacity-75"
        >
          {loading ? 'Opening WhatsApp…' : '📲  Send Booking via WhatsApp'}
        </button>
      </form>
    </div>
  );
}
