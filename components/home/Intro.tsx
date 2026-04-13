import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import HIcon from '@/components/ui/HIcon';
import { FlowerIcon, SparklesIcon } from '@hugeicons/core-free-icons';

const stats = [
  { n: '6+', l: 'Service Categories' },
  { n: '50+', l: 'Treatments Available' },
  { n: '5★', l: 'Client Satisfaction' },
] as const;

export default function Intro() {
  return (
    <section className="section bg-off-white" id="about">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-20 max-[900px]:gap-10 lg:grid-cols-2">
          <div>
            <FadeIn>
              <span className="mb-2.5 block text-[0.7rem] font-bold uppercase tracking-[3.5px] text-gold-dark">
                Welcome to Sellis
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2>
                Where Beauty Meets <em className="italic">Luxury</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="divider ml-0" />
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mb-3.5 text-[0.95rem]">
                At Sellis Beauty Spa, we believe every woman deserves to feel confident, pampered, and radiant. Our
                skilled team delivers premium beauty and wellness services in a tranquil, elegant space designed with
                you in mind.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mb-3.5 text-[0.95rem]">
                From transformative hair services and rejuvenating facials to relaxing massages and flawless nail art —
                we bring together the finest treatments under one roof.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Link href="/services" className="btn btn-primary mt-2 inline-flex">
                View All Services
              </Link>
            </FadeIn>

            <div className="mt-10 grid grid-cols-3 gap-5 border-t border-cream-dark pt-8 max-[520px]:grid-cols-2">
              {stats.map((s, i) => (
                <FadeIn key={s.n} delay={0.2 + i * 0.1}>
                  <div className="text-center">
                    <span className="block font-serif text-[2.2rem] font-bold leading-none text-gold-dark">{s.n}</span>
                    <span className="mt-1.5 block text-[0.7rem] font-bold uppercase tracking-wide text-text-light">
                      {s.l}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn direction="right" className="relative max-[900px]:order-first">
            <div className="relative aspect-[4/5] overflow-hidden rounded-spa-lg bg-gradient-to-br from-gold-pale to-pink-blush">
              <div className="flex h-full flex-col items-center justify-center gap-3 text-gold-dark/50">
                <span className="text-5xl">
                  <HIcon icon={FlowerIcon} size={52} strokeWidth={1.6} />
                </span>
                <span className="text-[0.75rem] font-semibold uppercase tracking-[2px]">Add your spa photo here</span>
              </div>
            </div>
            <div className="absolute -left-[18px] bottom-7 flex items-center gap-3 rounded-spa-md bg-white p-3.5 pl-4 shadow-spa-lg max-[900px]:left-0">
              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-dark to-gold text-xl">
                <HIcon icon={SparklesIcon} size={20} strokeWidth={1.8} className="text-white" />
              </div>
              <div>
                <strong className="block font-serif text-[0.82rem] text-text-primary">Premium Quality</strong>
                <span className="text-[0.68rem] font-medium text-text-light">Products &amp; Services</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
