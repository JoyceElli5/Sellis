import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <section className={`section ${styles.intro}`} id="about">
      <div className="container">
        <div className={styles.grid}>

          {/* Text */}
          <div className={styles.text}>
            <FadeIn><span className={styles.label}>Welcome to Sellis</span></FadeIn>
            <FadeIn delay={0.1}><h2>Where Beauty Meets <em>Luxury</em></h2></FadeIn>
            <FadeIn delay={0.2}><div className="divider" style={{marginLeft:0}} /></FadeIn>
            <FadeIn delay={0.2}>
              <p className={styles.para}>
                At Sellis Beauty Spa, we believe every woman deserves to feel confident,
                pampered, and radiant. Our skilled team delivers premium beauty and wellness
                services in a tranquil, elegant space designed with you in mind.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className={styles.para}>
                From transformative hair services and rejuvenating facials to relaxing massages
                and flawless nail art — we bring together the finest treatments under one roof.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Link href="/services" className="btn btn-primary" style={{marginTop:'8px'}}>
                View All Services
              </Link>
            </FadeIn>

            {/* Stats */}
            <div className={styles.stats}>
              {[
                { n: '6+',  l: 'Service Categories' },
                { n: '50+', l: 'Treatments Available' },
                { n: '5★',  l: 'Client Satisfaction' },
              ].map((s, i) => (
                <FadeIn key={s.n} delay={0.2 + i * 0.1}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>{s.n}</span>
                    <span className={styles.statLabel}>{s.l}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Image column */}
          <FadeIn direction="right" className={styles.imageCol}>
            <div className={styles.frame}>
              {/* Replace with an actual <Image> when you have a spa photo */}
              <div className={styles.placeholder}>
                <span>🌸</span>
                <span>Add your spa photo here</span>
              </div>
            </div>
            <div className={styles.badge}>
              <div className={styles.badgeIcon}>✨</div>
              <div>
                <strong>Premium Quality</strong>
                <span>Products &amp; Services</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
