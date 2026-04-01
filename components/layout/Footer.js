import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const serviceLinks = [
  { href: '/services#cat-hair',    label: 'Hair Services' },
  { href: '/services#cat-facials', label: 'Facials' },
  { href: '/services#cat-spa',     label: 'Spa & Massage' },
  { href: '/services#cat-nails',   label: 'Nails' },
  { href: '/services#cat-waxing',  label: 'Waxing' },
  { href: '/services#cat-lashes',  label: 'Lashes & Brows' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="Sellis Beauty Spa" width={46} height={46} className={styles.logoImg} />
            <div>
              <span className={styles.logoName}>SELLIS</span>
              <span className={styles.logoSub}>Beauty Spa</span>
            </div>
          </div>
          <p className={styles.tagline}>
            Your sanctuary for luxury beauty, wellness, and relaxation. We bring out the best version of you.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com/sellisbeautyspa" className={styles.social} target="_blank" rel="noopener" aria-label="Instagram">📷</a>
            <a href="https://wa.me/233XXXXXXXXX"            className={styles.social} target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
            <a href="https://facebook.com/sellisbeautyspa"  className={styles.social} target="_blank" rel="noopener" aria-label="Facebook">📘</a>
          </div>
        </div>

        {/* Quick links */}
        <div className={styles.col}>
          <h5 className={styles.colTitle}>Quick Links</h5>
          <nav className={styles.colLinks}>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/booking">Book Appointment</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h5 className={styles.colTitle}>Services</h5>
          <nav className={styles.colLinks}>
            {serviceLinks.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h5 className={styles.colTitle}>Contact Us</h5>
          <ul className={styles.contactList}>
            <li><span className={styles.fi}>📍</span><span>Accra, Ghana</span></li>
            <li><span className={styles.fi}>📞</span><span>+233 XX XXX XXXX</span></li>
            <li>
              <span className={styles.fi}>📷</span>
              <a href="https://instagram.com/sellisbeautyspa" target="_blank" rel="noopener">@sellisbeautyspa</a>
            </li>
            <li><span className={styles.fi}>🕐</span><span>Mon–Sat: 8am – 8pm<br />Sun: 10am – 6pm</span></li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} Sellis Beauty Spa. All rights reserved.</p>
        <p>Crafted with 💛 for beauty lovers</p>
      </div>
    </footer>
  );
}
