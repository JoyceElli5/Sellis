import styles from './SectionHeader.module.css';

export default function SectionHeader({ label, title, subtitle, light = false }) {
  return (
    <div className={`${styles.header} ${light ? styles.light : ''}`}>
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      <div className={`divider ${styles.divider}`} />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
