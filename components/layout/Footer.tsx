import Link from 'next/link';
import Image from 'next/image';

const serviceLinks = [
  { href: '/services#cat-hair', label: 'Hair Services' },
  { href: '/services#cat-facials', label: 'Facials' },
  { href: '/services#cat-spa', label: 'Spa & Massage' },
  { href: '/services#cat-nails', label: 'Nails' },
  { href: '/services#cat-waxing', label: 'Waxing' },
  { href: '/services#cat-lashes', label: 'Lashes & Brows' },
] as const;

export default function Footer() {
  return (
    <footer className="bg-brown-dark pb-0 pt-16 text-white/65">
      <div className="container grid grid-cols-1 gap-10 pb-[52px] md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1.2fr_1.2fr]">
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.834a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
            </a>
            <a
              href="https://x.com/sellisbeautyspa"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[0.9rem] text-white/65 transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href="https://tiktok.com/@sellisbeautyspa"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[0.9rem] text-white/65 transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a
              href="https://wa.me/233XXXXXXXXX"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[0.9rem] text-white/65 transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a
              href="https://facebook.com/sellisbeautyspa"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-[0.9rem] text-white/65 transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-5 font-sans text-[0.72rem] font-bold uppercase tracking-[2.5px] text-gold-light">
            Quick Links
          </h5>
          <nav className="flex flex-col gap-2.5">
            {(['/', '/services', '/booking', '/contact'] as const).map((href, i) => {
              const labels = ['Home', 'Our Services', 'Book Appointment', 'Contact Us'] as const;
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
            Spa Policies & Guidelines
          </h5>
          <ul className="flex flex-col gap-3 text-[0.82rem] leading-[1.65] text-white/50 list-none">
            <li className="flex items-start gap-2.5 before:content-['•'] before:text-gold before:mt-0.5">
              <span><strong>Cancellations:</strong> Please provide us with at least 24 hours notice to avoid a service fee.</span>
            </li>
            <li className="flex items-start gap-2.5 before:content-['•'] before:text-gold before:mt-0.5">
              <span><strong>Arrival Time:</strong> We recommend arriving 10 minutes early. Late arrivals may result in a shortened treatment.</span>
            </li>
            <li className="flex items-start gap-2.5 before:content-['•'] before:text-gold before:mt-0.5">
              <span><strong>Quiet Environment:</strong> Kindly keep mobile phones on silent mode while in the spa area.</span>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-5 font-sans text-[0.72rem] font-bold uppercase tracking-[2.5px] text-gold-light">
            Contact Us
          </h5>
          <ul className="flex list-none flex-col gap-3 text-[0.83rem] leading-relaxed text-white/50">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-gold">📍</span>
              <span>Accra, Ghana</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-gold">📞</span>
              <span>+233 XX XXX XXXX</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-gold">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.834a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </span>
              <div className="flex flex-col gap-1">
                <a
                  href="https://tiktok.com/@sellisbeautyspa"
                  className="text-white/50 transition-colors hover:text-gold-light flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="opacity-75 mr-1.5 flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                  </span>@sellisbeautyspa
                </a>
                <a
                  href="https://instagram.com/sellisbeautyspa"
                  className="text-white/50 transition-colors hover:text-gold-light flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="opacity-75 mr-1.5 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.834a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
                  </span>@sellisbeautyspa
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-gold">🕐</span>
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
        <p className="text-[0.76rem] text-white/[0.38]">Crafted with 💛 for beauty lovers</p>
      </div>
    </footer>
  );
}
