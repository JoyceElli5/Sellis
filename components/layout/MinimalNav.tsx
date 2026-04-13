'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/booking', label: 'Book' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function MinimalNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith('/admin')) return null;

  const close = () => setOpen(false);
  const isHome = pathname === '/';

  return (
    <>
      <nav
        className="fixed left-0 right-0 top-0 z-[1000] h-[var(--nav-height)] border-b border-cream-dark/80 bg-[rgba(254,252,250,0.96)] shadow-spa-sm backdrop-blur-[12px]"
        aria-label="Main"
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 max-md:px-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            onClick={close}
            aria-label="Sellis Beauty Spa home"
          >
            <Image
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-auto rounded object-contain"
              priority={isHome}
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-bold tracking-[2px] text-brown-dark">SELLIS</span>
              <span className="text-[0.55rem] font-bold uppercase tracking-[2.5px] text-gold-dark">
                Beauty Spa
              </span>
            </div>
          </Link>

          <ul className="hidden list-none items-center gap-7 md:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-[0.72rem] font-bold uppercase tracking-[1px] transition-colors ${
                      active ? 'text-gold-dark' : 'text-text-secondary hover:text-gold-dark'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/booking"
                className="inline-block rounded-full bg-gradient-to-br from-gold-dark to-gold px-5 py-2 text-[0.72rem] font-bold uppercase tracking-wide text-white shadow-[0_4px_14px_rgba(168,134,90,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,134,90,0.45)]"
              >
                Book now
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="flex flex-col gap-1.5 border-0 bg-transparent p-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span
              className={`block h-0.5 w-6 rounded-sm bg-brown-dark transition-all ${open ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span className={`block h-0.5 w-6 rounded-sm bg-brown-dark transition-all ${open ? 'opacity-0' : ''}`} />
            <span
              className={`block h-0.5 w-6 rounded-sm bg-brown-dark transition-all ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed left-0 right-0 top-[var(--nav-height)] z-[999] flex-col border-t border-cream-dark bg-[rgba(254,252,250,0.98)] py-3 shadow-spa-md backdrop-blur-[12px] md:hidden ${open ? 'flex' : 'hidden'}`}
        role="navigation"
        aria-hidden={!open}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="border-b border-cream-dark/70 px-6 py-3 text-[0.82rem] font-bold uppercase tracking-wide text-text-secondary hover:text-gold-dark"
            onClick={close}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/booking"
          className="mx-6 mt-3 block rounded-full bg-gradient-to-br from-gold-dark to-gold py-3 text-center text-[0.76rem] font-bold uppercase tracking-wide text-white"
          onClick={close}
        >
          Book appointment
        </Link>
      </div>
    </>
  );
}
