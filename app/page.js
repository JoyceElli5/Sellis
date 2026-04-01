import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import FeaturedServices from '@/components/home/FeaturedServices';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import CtaSection from '@/components/home/CtaSection';

export const metadata = {
  title: 'Sellis Beauty Spa | Luxury Beauty & Spa Experience',
  description: 'Your sanctuary for luxury beauty, hair, spa, nails, waxing and lash treatments in Ghana.',
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <FeaturedServices />
      <WhyUs />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
