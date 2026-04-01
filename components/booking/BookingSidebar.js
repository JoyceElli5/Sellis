import Link from 'next/link';
import styles from './BookingSidebar.module.css';

export default function BookingSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.waNote}>
        <span className={styles.waIcon}>📲</span>
        <span>
          When you click <strong>Send Booking</strong>, WhatsApp will open with your details
          pre-filled. Simply hit <em>Send</em> and we&apos;ll confirm your appointment shortly.
        </span>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardIcon}>🕐</div>
          <h4>Opening Hours</h4>
        </div>
        <ul className={styles.list}>
          <li><span>Monday – Friday</span><strong>8:00 AM – 8:00 PM</strong></li>
          <li><span>Saturday</span><strong>8:00 AM – 8:00 PM</strong></li>
          <li><span>Sunday</span><strong>10:00 AM – 6:00 PM</strong></li>
        </ul>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardIcon}>📋</div>
          <h4>Booking Policy</h4>
        </div>
        <ul className={styles.list}>
          <li><span>Cancellations</span><strong>24 hrs notice</strong></li>
          <li><span>Late arrivals</span><strong>15 min grace</strong></li>
          <li><span>Walk-ins</span><strong>Subject to availability</strong></li>
        </ul>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardIcon}>📍</div>
          <h4>Find Us</h4>
        </div>
        <p className={styles.cardText}>
          Accra, Ghana<br />
          <a href="https://wa.me/233XXXXXXXXX" target="_blank" rel="noopener" className={styles.waLink}>
            💬 Message us on WhatsApp
          </a>
        </p>
      </div>

      <Link href="/services" className="btn btn-outline" style={{textAlign:'center', display:'block'}}>
        Browse All Services
      </Link>
    </aside>
  );
}
