import type { Metadata } from 'next';
import { servicesData } from '@/data/services';
import PageHero from '@/components/ui/PageHero';
import CategoryNav from '@/components/services/CategoryNav';
import ServiceCategory from '@/components/services/ServiceCategory';
import CtaSection from '@/components/home/CtaSection';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'Browse our full menu of luxury beauty treatments — hair, facials, spa, nails, waxing, and lashes.',
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        label="Sellis Beauty Spa"
        title="Our Services & Pricing"
        subtitle="Browse our full menu of luxury beauty treatments. Every price includes expert care and premium products."
      />

      <CategoryNav categories={servicesData} />

      {Object.values(servicesData).map((category) => (
        <ServiceCategory key={category.id} category={category} />
      ))}

      <CtaSection
        heading="Found Something You Love?"
        subtext="Book your appointment in minutes — we'll confirm via WhatsApp."
      />
    </main>
  );
}
