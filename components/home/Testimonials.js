import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Testimonials.module.css';

const reviews = [
  { initial: 'A', name: 'Abena K.', text: 'The Swedish massage at Sellis was absolutely divine. The ambience, the service, the attention to detail — I felt like royalty. Will definitely be coming back!' },
  { initial: 'E', name: 'Efua M.',  text: 'Got my lashes done here — classic cat eye set — and I received so many compliments. The lash tech is incredibly skilled and so gentle. My new go-to spa!' },
  { initial: 'S', name: 'Selina D.', text: 'My braids and deep cleansing facial were done to perfection. The team is professional, friendly and the space is so clean and beautiful. Highly recommend!' },
];

export default function Testimonials() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <FadeIn><SectionHeader label="Happy Clients" title="What Our Clients Say" /></FadeIn>
        <div className={styles.grid}>
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.1}>
              <div className={styles.card}>
                <div className={styles.quote}>&ldquo;</div>
                <p className={styles.text}>{r.text}</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{r.initial}</div>
                  <div>
                    <span className={styles.name}>{r.name}</span>
                    <div className={styles.stars}>★★★★★</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
