import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Layer 1: background photo */}
      <div className={styles.bgImage} aria-hidden="true" />
      {/* Layer 2: dark overlay via ::before (in CSS) */}
      {/* Layer 3: warm gradient blend */}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.badge} aria-hidden="true">
          <span>Premium Beauty &amp; Wellness</span>
        </div>

        <h1>
          Luxury Beauty<br />
          &amp; <em>Spa Experience</em>
        </h1>

        <p className={styles.tagline}>
          Your sanctuary for beauty, wellness, and relaxation.
          Discover expert treatments crafted just for you.
        </p>

        <div className={styles.actions}>
          <Link href="/booking" className="btn btn-primary">Book Appointment</Link>
          <Link href="/services" className={styles.outlineLight}>Explore Services</Link>
        </div>
      </div>

      {/* Decorative ring */}
      <div className={styles.ring} aria-hidden="true" />

      {/* Scroll indicator */}
      <div className={styles.scroll} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
