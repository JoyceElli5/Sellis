import type { Metadata } from 'next';
import Script from 'next/script';
import Hero from '@/components/home/Hero';
// import Intro from '@/components/home/Intro';
import FeaturedServices from '@/components/home/FeaturedServices';
// import WhyUs from '@/components/home/WhyUs';
// import Testimonials from '@/components/home/Testimonials';
import FeaturedServices from '@/components/home/FeaturedServices';
import WhyUs from '@/components/home/WhyUs';
import CtaSection from '@/components/home/CtaSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnnouncementModal from '@/components/AnnouncementModal';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sellisbeautyspa.com';

export const metadata: Metadata = {
  title: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
  description:
    'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Accra, Ghana.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
    description:
      'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Accra, Ghana.',
    url: siteUrl,
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'Sellis Beauty Spa' }],
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Sellis Beauty Spa',
  description:
    'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Accra, Ghana.',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Accra',
    addressCountry: 'GH',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  sameAs: ['https://instagram.com/sellisbeautyspa'],
};

export default function HomePage() {
  return (
    <main>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AnnouncementModal />
      <Navbar />
      <Hero />
      <Intro />
      <FeaturedServices />
      <WhyUs />
      <CtaSection />
      <Footer />
    </main>
  );
}
