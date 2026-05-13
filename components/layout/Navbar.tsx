'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useNavScroll } from '@/hooks/useNavScroll';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/booking', label: 'Booking' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Navbar() {
  const scrolled = useNavScroll(60);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navBase =
    'fixed left-0 right-0 top-0 z-[1000] h-[var(--nav-height)] transition-[background,box-shadow,padding] duration-300 ease-smooth';
  const navState = scrolled
    ? 'bg-[rgba(254,252,250,0.96)] shadow-spa-sm backdrop-blur-[14px]'
    : 'bg-transparent backdrop-blur-sm';

  const logoName = scrolled ? 'text-brown-dark' : 'text-white';
  const logoSub = scrolled ? 'text-gold-dark' : 'text-gold-light';
  const linkColor = scrolled
    ? 'text-text-secondary after:bg-gold hover:text-gold-dark'
    : 'text-white after:bg-gold hover:text-gold-light';
  const burgerBar = scrolled ? 'bg-brown-dark' : 'bg-white';

  return (
    <>
      <nav className={`${navBase} ${navState}`} aria-label="Main">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            onClick={close}
            aria-label="Sellis Beauty Spa home"
          >
            <Image
              src="/logo.png"
              alt="Sellis Beauty Spa"
              width={54}
              height={54}
              className="h-[54px] w-auto rounded object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`font-serif text-xl font-bold tracking-[2px] transition-colors duration-400 ${logoName}`}
              >
                SELLIS
              </span>
              <span
                className={`text-[0.58rem] font-bold uppercase tracking-[3px] transition-colors duration-400 ${logoSub}`}
              >
                Beauty Spa
              </span>
            </div>
          </Link>

          <ul className="hidden list-none items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group relative pb-1 text-[0.78rem] font-bold uppercase tracking-[1.2px] transition-colors duration-300 ${linkColor}`}
                >
                  {l.label}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/booking"
                className="inline-flex items-center rounded-xl bg-linear-to-br from-gold-dark to-gold px-5 py-3 text-[0.78rem] font-bold uppercase tracking-wide text-white no-underline! shadow-[0_4px_16px_rgba(168,134,90,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(168,134,90,0.5)]"
              >
                Book Now
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="relative z-1001 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/15 backdrop-blur-sm transition-colors hover:bg-black/30 md:hidden"
            onClick={toggle}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`absolute block h-0.5 w-5 rounded-sm transition-all duration-300 ${burgerBar} ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
            <span className={`absolute block h-0.5 w-5 rounded-sm transition-all duration-300 ${burgerBar} ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute block h-0.5 w-5 rounded-sm transition-all duration-300 ${burgerBar} ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-998 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={close}
            aria-hidden
          >
            <motion.div
              key="mobile-nav-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 right-0 rounded-t-[26px] border-t border-cream-dark bg-[rgba(254,252,250,0.98)] p-8 pt-10 shadow-spa-lg"
              onClick={(e) => e.stopPropagation()}
              role="navigation"
              aria-label="Mobile menu"
            >
              <div className="flex flex-col items-center gap-6">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      className="text-[1.22rem] font-semibold text-text-primary transition-colors hover:text-gold-dark"
                      onClick={close}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/booking"
                  onClick={close}
                  className="flex w-full items-center justify-center rounded-xl border border-gold-dark px-4 py-3 text-sm font-semibold text-gold-dark transition-colors hover:bg-gold-dark hover:text-white"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/services"
                  onClick={close}
                  className="flex w-full items-center justify-center rounded-xl bg-brown-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
