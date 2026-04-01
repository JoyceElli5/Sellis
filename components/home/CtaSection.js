import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import styles from './CtaSection.module.css';

export default function CtaSection({ heading = 'Book Your Luxury Experience Today', subtext = 'Treat yourself to the self-care you deserve. Your appointment is just a click away.' }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <FadeIn><span className={styles.label}>Ready to Glow?</span></FadeIn>
        <FadeIn delay={0.1}><h2>{heading}</h2></FadeIn>
        <FadeIn delay={0.2}><p>{subtext}</p></FadeIn>
        <FadeIn delay={0.3}>
          <div className={styles.actions}>
            <Link href="/booking" className="btn btn-primary">Book Appointment</Link>
            <Link href="/contact" className="btn btn-outline">Get In Touch</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
