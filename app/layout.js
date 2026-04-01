import { Playfair_Display, Raleway } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
    template: '%s | Sellis Beauty Spa',
  },
  description:
    'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Ghana.',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${raleway.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
