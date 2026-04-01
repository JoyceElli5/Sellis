import styles from './PageHero.module.css';

export default function PageHero({ label, title, subtitle }) {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        {label && <span className={styles.label}>{label}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}
