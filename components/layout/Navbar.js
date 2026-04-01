'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useNavScroll } from '@/hooks/useNavScroll';
import styles from './Navbar.module.css';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/booking',  label: 'Booking' },
  { href: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const scrolled = useNavScroll(60);
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close  = () => setOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} onClick={close} aria-label="Sellis Beauty Spa home">
            <Image src="/logo.png" alt="Sellis Beauty Spa" width={54} height={54} className={styles.logoImg} priority />
            <div className={styles.logoText}>
              <span className={styles.logoName}>SELLIS</span>
              <span className={styles.logoSub}>Beauty Spa</span>
            </div>
          </Link>

          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/booking" className={styles.bookBtn}>Book Now</Link>
            </li>
          </ul>

          <button
            className={`${styles.hamburger} ${open ? styles.open : ''}`}
            onClick={toggle}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`} role="navigation">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={close}>
            {l.label}
          </Link>
        ))}
        <Link href="/booking" className={`${styles.bookBtn} ${styles.mobileBook}`} onClick={close}>
          Book Appointment
        </Link>
      </div>
    </>
  );
}
