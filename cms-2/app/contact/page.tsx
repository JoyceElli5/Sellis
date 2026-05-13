import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
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
      <section className="bg-off-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-16 max-[900px]:gap-10 lg:grid-cols-2">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
