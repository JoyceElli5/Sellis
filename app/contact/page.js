import PageHero from '@/components/ui/PageHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import styles from './contact.module.css';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sellis Beauty Spa — WhatsApp, Instagram, or send us a message.',
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Sellis Beauty Spa"
        title="Get In Touch"
        subtitle="We'd love to hear from you. Reach out via WhatsApp, Instagram, or the form below."
      />
      <section className={styles.section}>
        <div className="container">
          <div className={styles.layout}>
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
