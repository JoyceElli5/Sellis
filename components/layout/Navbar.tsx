'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useNavScroll } from '@/hooks/useNavScroll';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/booking', label: 'Booking' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Navbar() {
  const scrolled = useNavScroll(60);
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const navBase =
    'fixed left-0 right-0 top-0 z-[1000] h-[var(--nav-height)] transition-[background,box-shadow] duration-300 ease-out';
  const navState = scrolled
    ? 'bg-[rgba(254,252,250,0.97)] shadow-spa-sm backdrop-blur-[12px]'
    : 'bg-transparent';

  const logoName = scrolled ? 'text-brown-dark' : 'text-white';
  const logoSub = scrolled ? 'text-gold-dark' : 'text-gold-light';
  const linkColor = scrolled
    ? 'text-text-secondary after:bg-gold hover:text-gold-dark'
    : 'text-white after:bg-gold hover:text-gold-light';
  const burgerBar = scrolled ? 'bg-brown-dark' : 'bg-white';

  return (
    <>
      <nav className={`${navBase} ${navState}`} aria-label="Main">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-11 max-md:px-5">
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

          <ul className="hidden list-none items-center gap-[38px] md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative pb-1 text-[0.78rem] font-bold uppercase tracking-[1.2px] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-[width] after:duration-300 hover:after:w-full ${linkColor}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/booking"
                className="inline-block rounded-full bg-gradient-to-br from-gold-dark to-gold px-6 py-2.5 text-[0.76rem] font-bold uppercase tracking-wide text-white !no-underline shadow-[0_4px_16px_rgba(168,134,90,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(168,134,90,0.5)]"
              >
                Book Now
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="flex flex-col gap-1.5 border-0 bg-transparent p-1.5 md:hidden"
            onClick={toggle}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span
              className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ${burgerBar} ${open ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ${burgerBar} ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ${burgerBar} ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed left-0 right-0 top-[var(--nav-height)] z-[999] flex-col border-t border-cream-dark bg-[rgba(254,252,250,0.98)] py-4 pb-6 shadow-spa-lg backdrop-blur-[12px] md:hidden ${open ? 'flex' : 'hidden'}`}
        role="navigation"
        aria-hidden={!open}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block border-b border-cream-dark px-9 py-3.5 text-[0.85rem] font-bold uppercase tracking-wide text-text-secondary transition-colors hover:text-gold-dark"
            onClick={close}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/booking"
          className="mx-9 mt-4 block rounded-full bg-gradient-to-br from-gold-dark to-gold py-3.5 text-center text-[0.76rem] font-bold uppercase tracking-wide text-white !no-underline shadow-[0_4px_16px_rgba(168,134,90,0.35)] transition-all hover:-translate-y-0.5"
          onClick={close}
        >
          Book Appointment
        </Link>
      </div>
    </>
  );
}
