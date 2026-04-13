import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import MinimalNav from '@/components/layout/MinimalNav';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
    template: '%s | Sellis Beauty Spa',
  },
  description:
    'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Ghana.',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <MinimalNav />
        {children}
      </body>
    </html>
  );
}
