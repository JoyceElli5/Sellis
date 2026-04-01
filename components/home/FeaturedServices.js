import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './FeaturedServices.module.css';

const cards = [
  { icon: '✂️', title: 'Hair Services',   desc: 'From relaxing and braiding to stylish ponytails and installations — every hair type handled with care.', href: '/services#cat-hair',    cta: 'Explore Hair' },
  { icon: '🧖‍♀️', title: 'Spa & Massage',  desc: 'Unwind with Swedish, deep tissue, hot stone, or aromatherapy massages. Pure relaxation awaits.',       href: '/services#cat-spa',     cta: 'Explore Spa' },
  { icon: '💅', title: 'Nails',           desc: 'Classic manicures, pedicures, gel polish, acrylics and nail art — your nails deserve the best.',        href: '/services#cat-nails',   cta: 'Explore Nails' },
  { icon: '🌸', title: 'Facials',         desc: 'Deep cleansing and derma-planing treatments to leave your skin fresh, clear and glowing.',              href: '/services#cat-facials', cta: 'Explore Facials' },
  { icon: '👁️', title: 'Lashes & Brows',  desc: 'Microblading, ombré brows, classic and volume lash sets — frame your eyes beautifully.',               href: '/services#cat-lashes',  cta: 'Explore Lashes' },
  { icon: '🌿', title: 'Waxing',          desc: 'Gentle and precise waxing for every part of your body. Smooth skin, lasting results.',                  href: '/services#cat-waxing',  cta: 'Explore Waxing' },
];

export default function FeaturedServices() {
  return (
    <section className={`section ${styles.section}`} id="services-preview">
      <div className="container">
        <FadeIn><SectionHeader label="What We Offer" title="Our Signature Services" subtitle="Explore our most-loved treatments, crafted to bring out your natural beauty" /></FadeIn>

        <div className={styles.grid}>
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={(i % 3) * 0.1}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <Link href={c.href} className={styles.cardLink}>{c.cta}</Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{textAlign:'center', marginTop:'48px'}}>
            <Link href="/services" className="btn btn-primary">View Full Service Menu</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
