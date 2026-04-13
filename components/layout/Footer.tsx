import Link from 'next/link';
import Image from 'next/image';
import HIcon from '@/components/ui/HIcon';
import { Facebook01Icon, InstagramIcon, WhatsappIcon, MapPinIcon, Call02Icon, Time01Icon, HeartCheckIcon } from '@hugeicons/core-free-icons';

const serviceLinks = [
  { href: '/booking', label: 'Hair Services' },
  { href: '/booking', label: 'Facials' },
  { href: '/booking', label: 'Spa & Massage' },
  { href: '/booking', label: 'Nails' },
  { href: '/booking', label: 'Waxing' },
  { href: '/booking', label: 'Lashes & Brows' },
] as const;

export default function Footer() {
  return (
    <footer className="bg-brown-dark pb-0 pt-16 text-white/65">
      <div className="container grid grid-cols-1 gap-10 pb-[52px] md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Sellis Beauty Spa"
              width={46}
              height={46}
              className="rounded object-contain opacity-85"
            />
            <div>
              <span className="block font-serif text-xl font-bold tracking-[2px] text-white">SELLIS</span>
              <span className="block text-[0.55rem] font-bold uppercase tracking-[3px] text-gold-light">
                Beauty Spa
              </span>
            </div>
          </div>
          <p className="mb-5 text-[0.84rem] leading-loose text-white/50">
            Your sanctuary for luxury beauty, wellness, and relaxation. We bring out the best version of you.
          </p>
          <div className="flex gap-2.5">
            <a
              href="https://instagram.com/sellisbeautyspa"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[0.9rem] text-white/65 transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <HIcon icon={InstagramIcon} size={18} strokeWidth={1.8} />
            </a>
            <a
              href="https://wa.me/233XXXXXXXXX"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[0.9rem] text-white/65 transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <HIcon icon={WhatsappIcon} size={18} strokeWidth={1.8} />
            </a>
            <a
              href="https://facebook.com/sellisbeautyspa"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[0.9rem] text-white/65 transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <HIcon icon={Facebook01Icon} size={18} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-5 font-sans text-[0.72rem] font-bold uppercase tracking-[2.5px] text-gold-light">
            Quick Links
          </h5>
          <nav className="flex flex-col gap-2.5">
            {(['/', '/booking', '/contact'] as const).map((href, i) => {
              const labels = ['Home', 'Book appointment', 'Contact'] as const;
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 text-[0.84rem] text-white/50 transition-colors before:text-[0.65rem] before:text-gold before:content-['—'] hover:text-gold-light"
                >
                  {labels[i]}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <h5 className="mb-5 font-sans text-[0.72rem] font-bold uppercase tracking-[2.5px] text-gold-light">
            Services
          </h5>
          <nav className="flex flex-col gap-2.5">
            {serviceLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 text-[0.84rem] text-white/50 transition-colors before:text-[0.65rem] before:text-gold before:content-['—'] hover:text-gold-light"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h5 className="mb-5 font-sans text-[0.72rem] font-bold uppercase tracking-[2.5px] text-gold-light">
            Contact Us
          </h5>
          <ul className="flex list-none flex-col gap-3 text-[0.83rem] leading-relaxed text-white/50">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-gold"><HIcon icon={MapPinIcon} size={18} strokeWidth={1.8} /></span>
              <span>Accra, Ghana</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-gold"><HIcon icon={Call02Icon} size={18} strokeWidth={1.8} /></span>
              <span>+233 XX XXX XXXX</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-gold"><HIcon icon={InstagramIcon} size={18} strokeWidth={1.8} /></span>
              <a
                href="https://instagram.com/sellisbeautyspa"
                className="text-white/50 transition-colors hover:text-gold-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                @sellisbeautyspa
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-gold"><HIcon icon={Time01Icon} size={18} strokeWidth={1.8} /></span>
              <span>
                Mon–Sat: 8am – 8pm
                <br />
                Sun: 10am – 6pm
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container flex flex-wrap items-center justify-between gap-2.5 border-t border-white/[0.08] py-5 max-md:flex-col max-md:text-center">
        <p className="text-[0.76rem] text-white/[0.38]">
          &copy; {new Date().getFullYear()} Sellis Beauty Spa. All rights reserved.
        </p>
        <p className="flex items-center gap-1.5 text-[0.76rem] text-white/[0.38]">
          Crafted with <HIcon icon={HeartCheckIcon} size={14} strokeWidth={1.8} className="text-gold" /> for beauty lovers
        </p>
      </div>
    </footer>
  );
}
