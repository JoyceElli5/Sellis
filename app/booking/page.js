import { Suspense } from 'react';
import PageHero from '@/components/ui/PageHero';
import BookingForm from '@/components/booking/BookingForm';
import BookingSidebar from '@/components/booking/BookingSidebar';
import styles from './booking.module.css';

export const metadata = {
  title: 'Book an Appointment',
  description: 'Book your beauty treatment at Sellis Beauty Spa. Quick booking — confirmed via WhatsApp.',
};

export default function BookingPage() {
  return (
    <main>
      <PageHero
        label="Sellis Beauty Spa"
        title="Book Your Appointment"
        subtitle="Fill in the form below and we'll confirm your booking on WhatsApp. It only takes a minute."
      />
      <section className={styles.section}>
        <div className="container">
          <div className={styles.layout}>
            <Suspense fallback={<div>Loading form…</div>}>
              <BookingForm />
            </Suspense>
            <BookingSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}
