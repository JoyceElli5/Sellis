import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './WhyUs.module.css';

const items = [
  { icon: '🎓', title: 'Expert Team',         desc: 'Our trained and certified specialists bring skill, precision, and passion to every treatment.' },
  { icon: '✨', title: 'Premium Products',     desc: 'We use only top-quality products to ensure the best results for your skin and hair.' },
  { icon: '🌺', title: 'Relaxing Atmosphere',  desc: 'Step into a serene, beautifully designed space where every visit feels like a retreat.' },
  { icon: '💛', title: 'Personalised Care',    desc: 'Every client is unique. We tailor every service to your individual needs and preferences.' },
];

export default function WhyUs() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <FadeIn><SectionHeader label="Why Sellis" title="The Sellis Difference" subtitle="We go beyond beauty — we create an experience" light /></FadeIn>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className={styles.item}>
                <div className={styles.icon}>{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
