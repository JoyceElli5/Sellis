import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import './globals.css';

const googleSansFlex = localFont({
  src: '../public/Google_Sans_Flex/GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf',
  variable: '--font-google-sans-flex',
  display: 'swap',
  weight: '100 900',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sellisbeautyspa.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
    template: '%s | Sellis Beauty Spa',
  },
  description:
    'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Accra, Ghana.',
  keywords: [
    'beauty spa Ghana',
    'luxury spa Accra',
    'hair salon Accra',
    'nail salon Ghana',
    'waxing Accra',
    'lash extensions Ghana',
    'Sellis Beauty Spa',
    'spa treatments Accra',
    'beauty treatments Ghana',
    'facial Accra',
  ],
  authors: [{ name: 'Sellis Beauty Spa' }],
  creator: 'Sellis Beauty Spa',
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: siteUrl,
    siteName: 'Sellis Beauty Spa',
    title: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
    description:
      'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Accra, Ghana.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Sellis Beauty Spa logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
    description:
      'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Accra, Ghana.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={googleSansFlex.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
