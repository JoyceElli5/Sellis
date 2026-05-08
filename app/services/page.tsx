import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sellisbeautyspa.com';

export const metadata: Metadata = {
  title: 'Our Services & Pricing',
  description:
    'Browse our full menu of luxury beauty treatments in Accra, Ghana — hair, nails, waxing, lashes, facials and more. Every price includes expert care and premium products.',
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: 'Our Services & Pricing | Sellis Beauty Spa',
    description:
      'Browse our full menu of luxury beauty treatments in Accra, Ghana — hair, nails, waxing, lashes, facials and more.',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'Sellis Beauty Spa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services & Pricing | Sellis Beauty Spa',
    description:
      'Browse our full menu of luxury beauty treatments in Accra, Ghana — hair, nails, waxing, lashes, facials and more.',
    images: ['/logo.png'],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
