import Link from 'next/link';
import styles from './ServiceItem.module.css';

export default function ServiceItem({ service, category, subcategory }) {
  const bookingValue = subcategory
    ? `${category} › ${subcategory} › ${service.name}`
    : `${category} › ${service.name}`;
  const href = `/booking?service=${encodeURIComponent(bookingValue)}`;

  return (
    <div className={styles.item}>
      <div className={styles.name}>{service.name}</div>
      {service.note && <div className={styles.note}>※ {service.note}</div>}
      <div className={styles.footer}>
        <span className={styles.price}>{service.price}</span>
        <Link href={href} className={styles.bookBtn}>Book Now</Link>
      </div>
    </div>
  );
}
