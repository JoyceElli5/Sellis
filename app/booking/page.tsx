import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/ui/PageHero';
import BookingForm from '@/components/booking/BookingForm';
import BookingSidebar from '@/components/booking/BookingSidebar';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Book your beauty treatment at Sellis Beauty Spa. Quick booking — confirmed via WhatsApp.',
};

export default function BookingPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Sellis Beauty Spa"
        title="Book Your Appointment"
        subtitle="Fill in the form below and we'll confirm your booking on WhatsApp. It only takes a minute."
        imageUrl="/sellis2.jpeg"
      />
      <section className="bg-off-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-14 max-[1100px]:gap-10 lg:grid-cols-[1fr_400px]">
            <Suspense
              fallback={
                <div className="rounded-spa-lg border border-cream-dark bg-white p-8 text-center text-text-secondary shadow-spa-sm">
                  Loading form…
                </div>
              }
            >
              <div className="motion-fade-up">
                <BookingForm />
              </div>
            </Suspense>
            <div className="motion-fade-up motion-delay-1">
              <BookingSidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
