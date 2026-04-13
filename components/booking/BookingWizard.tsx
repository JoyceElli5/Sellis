'use client';

import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import type { ServiceCategoryData } from '@/data/services';
import { buildWhatsAppUrl, buildBookingMessage } from '@/lib/whatsapp';
import HIcon from '@/components/ui/HIcon';
import ServiceQuickView, { type QuickViewSelection } from '@/components/services/ServiceQuickView';
import {
  CheckmarkCircle02Icon,
  WhatsappIcon,
  InformationCircleIcon,
  ArrowLeft01Icon,
} from '@hugeicons/core-free-icons';

type FieldKey = 'name' | 'phone' | 'service' | 'date' | 'time' | 'notes';

const emptyFields = { name: '', phone: '', service: '', date: '', time: '', notes: '' };

const selectChevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A870' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")] bg-[length:12px_7px] bg-[right_14px_center] bg-no-repeat pr-10";

const categories = Object.values(servicesData);

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<1 | 2>(1);
  const [fields, setFields] = useState(emptyFields);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? '');
  const [quickView, setQuickView] = useState<QuickViewSelection | null>(null);

  const serviceFromUrl = searchParams.get('service');

  useEffect(() => {
    if (serviceFromUrl) {
      setFields((f) => ({ ...f, service: serviceFromUrl }));
      setStep(2);
    }
  }, [serviceFromUrl]);

  const today = new Date().toISOString().split('T')[0] ?? '';

  const set =
    (k: FieldKey) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));

  const chooseService = (value: string) => {
    setFields((f) => ({ ...f, service: value }));
    setStep(2);
    setError('');
  };

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
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  const fieldClass =
    'w-full appearance-none rounded-spa-sm border-[1.5px] border-cream-dark bg-off-white px-4 py-3 text-[0.9rem] text-text-primary outline-none transition-all duration-300 focus:border-gold focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,168,112,0.12)]';

  const activeCategories = categories.filter((c) => c.id === activeId);

  if (sent) {
    return (
      <div className="rounded-spa-lg bg-white p-12 text-center shadow-spa-md max-md:px-5 max-md:py-7">
        <div className="mb-4 flex justify-center">
          <HIcon icon={CheckmarkCircle02Icon} size={56} strokeWidth={1.6} className="text-gold-dark" />
        </div>
        <h3 className="mb-2.5">Booking sent</h3>
        <p className="mb-7 text-[0.9rem] text-text-secondary">
          WhatsApp opened with your booking details. We&apos;ll confirm your appointment shortly.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setSent(false);
            setFields(emptyFields);
            setStep(1);
          }}
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[3px] text-gold-dark">Booking</p>
          <h2 className="font-serif text-2xl text-text-primary max-md:text-xl">
            {step === 1 ? 'Choose your treatment' : 'Your details'}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-wide text-text-secondary">
          <span className={step === 1 ? 'text-gold-dark' : 'text-text-light'}>1 · Service</span>
          <span className="text-cream-dark">—</span>
          <span className={step === 2 ? 'text-gold-dark' : 'text-text-light'}>2 · Confirm</span>
        </div>
      </div>

      {step === 1 && (
        <div className="rounded-spa-lg bg-white p-6 shadow-spa-md max-md:px-4 max-md:py-5 md:p-10">
          <p className="mb-6 text-[0.9rem] text-text-secondary">
            Browse by category, tap info for more, then choose a service to continue.
          </p>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={`shrink-0 rounded-full border-[1.5px] px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-wide transition-all ${
                    active
                      ? 'border-transparent bg-gradient-to-br from-gold-dark to-gold text-white shadow-[0_4px_14px_rgba(168,134,90,0.35)]'
                      : 'border-cream-dark bg-transparent text-brown-mid hover:border-gold/50'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="flex min-w-max gap-5">
              {activeCategories.map((cat) => {
                const services = cat.services
                  ? cat.services
                  : Object.values(cat.subcategories ?? {}).flatMap((s) => s.services);

                return services.map((svc, i) => {
                  const subcategory = cat.subcategories
                    ? Object.values(cat.subcategories).find((sub) =>
                        sub.services.some((s) => s.name === svc.name)
                      )?.label
                    : undefined;
                  const bookValue = subcategory
                    ? `${cat.title} › ${subcategory} › ${svc.name}`
                    : `${cat.title} › ${svc.name}`;

                  return (
                    <PickerServiceCard
                      key={`${cat.id}-${svc.name}-${i}`}
                      name={svc.name}
                      price={svc.price}
                      image={svc.image}
                      category={cat}
                      onChoose={() => chooseService(bookValue)}
                      onQuickView={() =>
                        setQuickView({
                          category: {
                            id: cat.id,
                            title: cat.title,
                            description: cat.description,
                            gradient: cat.gradient,
                            coverImage: cat.coverImage,
                          },
                          service: svc,
                          subcategory,
                        })
                      }
                    />
                  );
                });
              })}
            </div>
          </div>

          <p className="mt-8 text-center text-[0.82rem] text-text-secondary">
            Already know what you want?{' '}
            <Link href="/contact" className="font-bold text-gold-dark underline-offset-2 hover:underline">
              Message us
            </Link>
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-spa-lg bg-white p-6 shadow-spa-md max-md:px-4 max-md:py-5 md:p-10">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mb-6 inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-wide text-gold-dark hover:text-brown-mid"
          >
            <HIcon icon={ArrowLeft01Icon} size={18} strokeWidth={1.8} />
            Change service
          </button>

          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="mb-4 rounded-spa-sm border border-red-300 bg-red-50 px-4 py-3 text-center text-[0.85rem] text-red-800">
                {error}
              </div>
            )}

            <div className="mb-6 rounded-spa-sm border border-cream-dark bg-cream/40 px-4 py-3">
              <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-wide text-text-secondary">
                Selected service
              </p>
              <p className="font-serif text-[1.05rem] text-text-primary">{fields.service || '—'}</p>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="bw-name"
                  className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary"
                >
                  Full name <span className="text-gold-dark">*</span>
                </label>
                <input
                  id="bw-name"
                  type="text"
                  value={fields.name}
                  onChange={set('name')}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={fieldClass}
                />
              </div>
              <div>
                <label
                  htmlFor="bw-phone"
                  className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary"
                >
                  Phone <span className="text-gold-dark">*</span>
                </label>
                <input
                  id="bw-phone"
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
              <label
                htmlFor="bw-service"
                className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary"
              >
                Service <span className="text-gold-dark">*</span>
              </label>
              <select
                id="bw-service"
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
                <label
                  htmlFor="bw-date"
                  className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary"
                >
                  Preferred date <span className="text-gold-dark">*</span>
                </label>
                <input
                  id="bw-date"
                  type="date"
                  value={fields.date}
                  onChange={set('date')}
                  min={today}
                  className={fieldClass}
                />
              </div>
              <div>
                <label
                  htmlFor="bw-time"
                  className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary"
                >
                  Preferred time <span className="text-gold-dark">*</span>
                </label>
                <input
                  id="bw-time"
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
              <label
                htmlFor="bw-notes"
                className="mb-2 block text-[0.73rem] font-bold uppercase tracking-wide text-text-secondary"
              >
                Additional notes
              </label>
              <textarea
                id="bw-notes"
                value={fields.notes}
                onChange={set('notes')}
                placeholder="Special requests, allergies…"
                rows={4}
                className={`${fieldClass} min-h-24 resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2.5 w-full cursor-pointer rounded-spa-sm border-0 bg-gradient-to-br from-gold-dark to-gold py-4 font-sans text-[0.88rem] font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(168,134,90,0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(168,134,90,0.5)] disabled:cursor-not-allowed disabled:opacity-75"
            >
              {loading ? (
                'Opening WhatsApp…'
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  <HIcon icon={WhatsappIcon} size={18} strokeWidth={1.8} />
                  Send booking via WhatsApp
                </span>
              )}
            </button>
          </form>
        </div>
      )}

      <ServiceQuickView
        isOpen={!!quickView}
        onClose={() => setQuickView(null)}
        selection={quickView}
      />
    </>
  );
}

function PickerServiceCard({
  name,
  price,
  image,
  category,
  onChoose,
  onQuickView,
}: {
  name: string;
  price: string;
  image: string;
  category: ServiceCategoryData;
  onChoose: () => void;
  onQuickView: () => void;
}) {
  return (
    <div className="group relative h-[360px] w-[260px] shrink-0 cursor-default overflow-hidden rounded-[20px]">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ background: category.gradient }}
      >
        <Image src={image} alt="" fill className="object-cover opacity-65" unoptimized />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
        }}
      />
      <div className="relative z-[2] flex h-full flex-col px-5 pb-5 pt-5">
        <div
          className="self-start rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white backdrop-blur-sm"
        >
          {category.title}
        </div>
        <div className="mt-auto">
          <h3
            className="mb-1.5 font-serif text-[1.15rem] font-bold leading-snug text-white"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            {name}
          </h3>
          <p className="mb-4 font-serif text-base font-bold text-gold-light">{price}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onChoose}
              className="flex-1 rounded-full bg-gradient-to-br from-gold-dark to-gold py-2.5 text-center text-[0.78rem] font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-95"
            >
              Choose
            </button>
            <button
              type="button"
              onClick={onQuickView}
              aria-label="Service details"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <HIcon icon={InformationCircleIcon} size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
