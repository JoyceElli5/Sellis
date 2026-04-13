import HIcon from '@/components/ui/HIcon';
import { Time01Icon, NoteDoneIcon, MapPinIcon, WhatsappIcon } from '@hugeicons/core-free-icons';

export default function BookingSidebar() {
  return (
    <aside className="flex flex-col gap-[18px]">
      <div className="flex gap-2.5 rounded-spa-md border border-green-300 bg-green-50 p-4 text-[0.82rem] leading-relaxed text-green-800">
        <span className="mt-0.5 shrink-0 text-lg">
          <HIcon icon={WhatsappIcon} size={18} strokeWidth={1.8} />
        </span>
        <span>
          When you tap <strong>Send booking via WhatsApp</strong>, WhatsApp will open with your details pre-filled. Simply hit{' '}
          <em>Send</em> and we&apos;ll confirm your appointment shortly.
        </span>
      </div>

      <div className="rounded-spa-md border border-cream-dark bg-white p-6 shadow-spa-sm">
        <div className="mb-3.5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-spa-sm bg-gradient-to-br from-gold-pale to-cream-dark text-lg">
            <HIcon icon={Time01Icon} size={18} strokeWidth={1.8} className="text-gold-dark" />
          </div>
          <h4 className="text-[0.92rem]">Opening Hours</h4>
        </div>
        <ul className="list-none">
          <li className="flex justify-between gap-2 border-b border-dashed border-cream-dark py-1.5 text-[0.83rem] leading-relaxed text-text-secondary last:border-b-0">
            <span>Monday – Friday</span>
            <strong className="font-semibold text-text-primary">8:00 AM – 8:00 PM</strong>
          </li>
          <li className="flex justify-between gap-2 border-b border-dashed border-cream-dark py-1.5 text-[0.83rem] leading-relaxed text-text-secondary last:border-b-0">
            <span>Saturday</span>
            <strong className="font-semibold text-text-primary">8:00 AM – 8:00 PM</strong>
          </li>
          <li className="flex justify-between gap-2 border-b border-dashed border-cream-dark py-1.5 text-[0.83rem] leading-relaxed text-text-secondary last:border-b-0">
            <span>Sunday</span>
            <strong className="font-semibold text-text-primary">10:00 AM – 6:00 PM</strong>
          </li>
        </ul>
      </div>

      <div className="rounded-spa-md border border-cream-dark bg-white p-6 shadow-spa-sm">
        <div className="mb-3.5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-spa-sm bg-gradient-to-br from-gold-pale to-cream-dark text-lg">
            <HIcon icon={NoteDoneIcon} size={18} strokeWidth={1.8} className="text-gold-dark" />
          </div>
          <h4 className="text-[0.92rem]">Booking Policy</h4>
        </div>
        <ul className="list-none">
          <li className="flex justify-between gap-2 border-b border-dashed border-cream-dark py-1.5 text-[0.83rem] leading-relaxed text-text-secondary last:border-b-0">
            <span>Cancellations</span>
            <strong className="font-semibold text-text-primary">24 hrs notice</strong>
          </li>
          <li className="flex justify-between gap-2 border-b border-dashed border-cream-dark py-1.5 text-[0.83rem] leading-relaxed text-text-secondary last:border-b-0">
            <span>Late arrivals</span>
            <strong className="font-semibold text-text-primary">15 min grace</strong>
          </li>
          <li className="flex justify-between gap-2 border-b border-dashed border-cream-dark py-1.5 text-[0.83rem] leading-relaxed text-text-secondary last:border-b-0">
            <span>Walk-ins</span>
            <strong className="font-semibold text-text-primary">Subject to availability</strong>
          </li>
        </ul>
      </div>

      <div className="rounded-spa-md border border-cream-dark bg-white p-6 shadow-spa-sm">
        <div className="mb-3.5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-spa-sm bg-gradient-to-br from-gold-pale to-cream-dark text-lg">
            <HIcon icon={MapPinIcon} size={18} strokeWidth={1.8} className="text-gold-dark" />
          </div>
          <h4 className="text-[0.92rem]">Find Us</h4>
        </div>
        <p className="text-[0.84rem] leading-loose text-text-secondary">
          Accra, Ghana
          <br />
          <a
            href="https://wa.me/233XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-dark no-underline hover:underline"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>

    </aside>
  );
}
