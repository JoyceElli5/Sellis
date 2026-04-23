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
    <html lang="en" className={googleSansFlex.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
