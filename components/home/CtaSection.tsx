import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

type CtaSectionProps = {
  heading?: string;
  subtext?: string;
};

export default function CtaSection({
  heading = 'Book Your Luxury Experience Today',
  subtext = 'Treat yourself to the self-care you deserve. Your appointment is just a click away.',
}: CtaSectionProps) {
  return (
    <section className="section bg-gradient-to-br from-gold-pale to-pink-blush text-center">
      <div className="container">
        <FadeIn>
          <span className="mb-2.5 inline-block text-[0.7rem] font-bold uppercase tracking-[3.5px] text-gold-dark">
            Ready to Glow?
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mb-3.5">{heading}</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mx-auto mb-9 max-w-[440px] text-[0.98rem]">{subtext}</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/booking" className="btn btn-primary">
              Book Appointment
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Get In Touch
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
