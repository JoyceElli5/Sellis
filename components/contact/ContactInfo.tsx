import HIcon from '@/components/ui/HIcon';
import { MapPinIcon, Call02Icon, InstagramIcon, Time01Icon, WhatsappIcon } from '@hugeicons/core-free-icons';

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-1">
        <span className="mb-2.5 block text-[0.7rem] font-bold uppercase tracking-[3.5px] text-gold-dark">Reach Out</span>
        <h2 className="mb-3">We&apos;re Here For You</h2>
        <div className="divider ml-0" />
        <p className="text-[0.94rem]">
          Whether you have questions about our services, want to make a booking, or just want to say hello — we&apos;re
          always happy to help.
        </p>
      </div>

      <div className="flex gap-4 rounded-spa-md border border-cream-dark bg-white p-5 shadow-spa-sm transition-all hover:border-gold-light hover:shadow-spa-md">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-spa-sm bg-gradient-to-br from-gold-dark to-gold text-lg shadow-[0_4px_12px_rgba(168,134,90,0.25)]">
          <HIcon icon={MapPinIcon} size={18} strokeWidth={1.8} className="text-white" />
        </div>
        <div>
          <h4 className="mb-1 text-[0.86rem]">Our Location</h4>
          <p className="text-[0.875rem] leading-relaxed text-text-secondary">
            Accra, Ghana
            <br />
            <em className="text-[0.8rem] italic text-text-light">Exact address shared on booking confirmation</em>
          </p>
        </div>
      </div>

      <div className="flex gap-4 rounded-spa-md border border-cream-dark bg-white p-5 shadow-spa-sm transition-all hover:border-gold-light hover:shadow-spa-md">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-spa-sm bg-gradient-to-br from-gold-dark to-gold text-lg shadow-[0_4px_12px_rgba(168,134,90,0.25)]">
          <HIcon icon={Call02Icon} size={18} strokeWidth={1.8} className="text-white" />
        </div>
        <div>
          <h4 className="mb-1 text-[0.86rem]">Call / WhatsApp</h4>
          <p className="text-[0.875rem] leading-relaxed text-text-secondary">
            <a href="tel:+233XXXXXXXXX" className="text-text-secondary transition-colors hover:text-gold-dark">
              +233 XX XXX XXXX
            </a>
            <br />
            <a
              href="https://wa.me/233XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-dark transition-colors hover:underline"
            >
              <span className="inline-flex items-center gap-1.5">
                <HIcon icon={WhatsappIcon} size={16} strokeWidth={1.8} />
                Chat on WhatsApp
              </span>
            </a>
          </p>
        </div>
      </div>

      <div className="flex gap-4 rounded-spa-md border border-cream-dark bg-white p-5 shadow-spa-sm transition-all hover:border-gold-light hover:shadow-spa-md">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-spa-sm bg-gradient-to-br from-gold-dark to-gold text-lg shadow-[0_4px_12px_rgba(168,134,90,0.25)]">
          <HIcon icon={InstagramIcon} size={18} strokeWidth={1.8} className="text-white" />
        </div>
        <div>
          <h4 className="mb-1 text-[0.86rem]">Instagram</h4>
          <p className="text-[0.875rem] leading-relaxed text-text-secondary">
            <a
              href="https://instagram.com/sellisbeautyspa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors hover:text-gold-dark"
            >
              @sellisbeautyspa
            </a>
            <br />
            <em className="text-[0.8rem] italic text-text-light">Follow us for looks, tips &amp; offers</em>
          </p>
        </div>
      </div>

      <div className="flex gap-4 rounded-spa-md border border-cream-dark bg-white p-5 shadow-spa-sm transition-all hover:border-gold-light hover:shadow-spa-md">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-spa-sm bg-gradient-to-br from-gold-dark to-gold text-lg shadow-[0_4px_12px_rgba(168,134,90,0.25)]">
          <HIcon icon={Time01Icon} size={18} strokeWidth={1.8} className="text-white" />
        </div>
        <div>
          <h4 className="mb-1 text-[0.86rem]">Opening Hours</h4>
          <p className="text-[0.875rem] leading-relaxed text-text-secondary">
            Monday – Friday: <strong>8:00 AM – 8:00 PM</strong>
            <br />
            Saturday: <strong>8:00 AM – 8:00 PM</strong>
            <br />
            Sunday: <strong>10:00 AM – 6:00 PM</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
