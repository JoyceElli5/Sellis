import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';
import BookingSidebar from '@/components/booking/BookingSidebar';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Book your beauty treatment at Sellis Beauty Spa. Quick booking — confirmed via WhatsApp.',
};

export default function BookingPage() {
  return (
    <main>
      <header className="border-b border-cream-dark bg-gradient-to-br from-brown-dark via-[#5C3328] to-gold-dark pb-12 pt-[calc(var(--nav-height)+40px)] text-center max-md:pb-10 max-md:pt-[calc(var(--nav-height)+28px)]">
        <div className="container relative z-[2]">
          <span className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[3px] text-gold-light">
            Sellis Beauty Spa
          </span>
          <h1 className="mb-2 text-white">Book your visit</h1>
          <p className="mx-auto max-w-[460px] text-[0.95rem] text-white/75">
            Choose a service, then add your preferred time. We confirm on WhatsApp.
          </p>
        </div>
      </header>
      <section className="bg-off-white py-16 max-md:py-12">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-14 max-[1100px]:gap-10 lg:grid-cols-[1fr_400px]">
            <Suspense
              fallback={
                <div className="rounded-spa-lg border border-cream-dark bg-white p-8 text-center text-text-secondary shadow-spa-sm">
                  Loading…
                </div>
              }
            >
              <BookingWizard />
            </Suspense>
            <BookingSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}
