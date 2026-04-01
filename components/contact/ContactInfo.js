import styles from './ContactInfo.module.css';

export default function ContactInfo() {
  return (
    <div className={styles.info}>
      <div className={styles.header}>
        <span className={styles.label}>Reach Out</span>
        <h2>We&apos;re Here For You</h2>
        <div className="divider" style={{marginLeft:0}} />
        <p>Whether you have questions about our services, want to make a booking, or just want to say hello — we&apos;re always happy to help.</p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>📍</div>
        <div>
          <h4>Our Location</h4>
          <p>Accra, Ghana<br /><em className={styles.note}>Exact address shared on booking confirmation</em></p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>📞</div>
        <div>
          <h4>Call / WhatsApp</h4>
          <p>
            <a href="tel:+233XXXXXXXXX">+233 XX XXX XXXX</a><br />
            <a href="https://wa.me/233XXXXXXXXX" target="_blank" rel="noopener" className={styles.waLink}>
              💬 Chat on WhatsApp →
            </a>
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>📷</div>
        <div>
          <h4>Instagram</h4>
          <p>
            <a href="https://instagram.com/sellisbeautyspa" target="_blank" rel="noopener">@sellisbeautyspa</a><br />
            <em className={styles.note}>Follow us for looks, tips &amp; offers</em>
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>🕐</div>
        <div>
          <h4>Opening Hours</h4>
          <p>
            Monday – Friday: <strong>8:00 AM – 8:00 PM</strong><br />
            Saturday: <strong>8:00 AM – 8:00 PM</strong><br />
            Sunday: <strong>10:00 AM – 6:00 PM</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
