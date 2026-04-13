import type { Metadata } from 'next';
import Link from 'next/link';
import LandingExperience from '@/components/home/LandingExperience';
import CtaSection from '@/components/home/CtaSection';
import AnnouncementModal from '@/components/AnnouncementModal';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
  description:
    'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Ghana.',
};

export default function HomePage() {
  return (
    <main>
      <AnnouncementModal />
      <LandingExperience>
        <section
          className="flex min-h-[calc(100vh-var(--nav-height))] flex-col justify-center bg-gradient-to-b from-cream to-off-white px-6 pb-16 pt-[calc(var(--nav-height)+48px)] text-center max-md:pt-[calc(var(--nav-height)+32px)]"
        >
          <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[4px] text-gold-dark">
            Sellis Beauty Spa
          </p>
          <h1 className="mx-auto mb-4 max-w-[520px] font-serif text-text-primary">
            Calm, luxury care — booked in minutes
          </h1>
          <p className="mx-auto mb-10 max-w-[440px] text-[0.98rem] text-text-secondary">
            Pick your treatment, choose a time, and send your request on WhatsApp. We&apos;ll confirm with you
            personally.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/booking" className="btn btn-primary">
              Start booking
            </Link>
            <Link href="/contact" className="btn btn-outline btn-sm">
              Contact
            </Link>
          </div>
        </section>
        <CtaSection
          heading="Prefer to browse first?"
          subtext="Everything we offer is in the booking flow — same treatments, same prices, with full details on each card."
        />
        <Footer />
      </LandingExperience>
    </main>
  );
}
