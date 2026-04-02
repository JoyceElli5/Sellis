import Link from 'next/link';
import type { ServiceEntry } from '@/data/services';

type ServiceItemProps = {
  service: ServiceEntry;
  category: string;
  subcategory?: string;
};

export default function ServiceItem({ service, category, subcategory }: ServiceItemProps) {
  const bookingValue = subcategory
    ? `${category} › ${subcategory} › ${service.name}`
    : `${category} › ${service.name}`;
  const href = `/booking?service=${encodeURIComponent(bookingValue)}`;

  return (
    <div className="flex flex-col gap-2 rounded-spa-md border border-cream-dark bg-white px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-light hover:shadow-spa-md">
      <div className="flex-1 font-serif text-[0.94rem] font-semibold text-text-primary">{service.name}</div>
      {service.note && <div className="text-[0.7rem] italic text-text-light">※ {service.note}</div>}
      <div className="mt-1.5 flex items-center justify-between gap-2.5">
        <span className="whitespace-nowrap font-serif text-lg font-bold text-gold-dark">{service.price}</span>
        <Link
          href={href}
          className="inline-block shrink-0 whitespace-nowrap rounded-full bg-gradient-to-br from-gold-dark to-gold px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-white no-underline transition-all hover:scale-105 hover:shadow-[0_4px_12px_rgba(168,134,90,0.35)]"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
