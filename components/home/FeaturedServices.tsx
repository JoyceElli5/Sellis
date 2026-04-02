import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';

const cards = [
  {
    icon: '✂️',
    title: 'Hair Services',
    desc: 'From relaxing and braiding to stylish ponytails and installations — every hair type handled with care.',
    href: '/services#cat-hair',
    cta: 'Explore Hair',
  },
  {
    icon: '🧖‍♀️',
    title: 'Spa & Massage',
    desc: 'Unwind with Swedish, deep tissue, hot stone, or aromatherapy massages. Pure relaxation awaits.',
    href: '/services#cat-spa',
    cta: 'Explore Spa',
  },
  {
    icon: '💅',
    title: 'Nails',
    desc: 'Classic manicures, pedicures, gel polish, acrylics and nail art — your nails deserve the best.',
    href: '/services#cat-nails',
    cta: 'Explore Nails',
  },
  {
    icon: '🌸',
    title: 'Facials',
    desc: 'Deep cleansing and derma-planing treatments to leave your skin fresh, clear and glowing.',
    href: '/services#cat-facials',
    cta: 'Explore Facials',
  },
  {
    icon: '👁️',
    title: 'Lashes & Brows',
    desc: 'Microblading, ombré brows, classic and volume lash sets — frame your eyes beautifully.',
    href: '/services#cat-lashes',
    cta: 'Explore Lashes',
  },
  {
    icon: '🌿',
    title: 'Waxing',
    desc: 'Gentle and precise waxing for every part of your body. Smooth skin, lasting results.',
    href: '/services#cat-waxing',
    cta: 'Explore Waxing',
  },
] as const;

export default function FeaturedServices() {
  return (
    <section className="section bg-cream" id="services-preview">
      <div className="container">
        <FadeIn>
          <SectionHeader
            label="What We Offer"
            title="Our Signature Services"
            subtitle="Explore our most-loved treatments, crafted to bring out your natural beauty"
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={(i % 3) * 0.1}>
              <div className="group relative overflow-hidden rounded-spa-lg border border-transparent bg-white p-8 shadow-spa-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-light hover:shadow-spa-lg">
                <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-dark to-gold-light transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-spa-md bg-gradient-to-br from-gold-pale to-cream-dark text-2xl">
                  {c.icon}
                </div>
                <h3 className="mb-2.5 text-lg">{c.title}</h3>
                <p className="mb-5 text-[0.875rem] leading-relaxed">{c.desc}</p>
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold tracking-wide text-gold-dark transition-[gap] duration-300 after:content-['→'] hover:gap-2.5"
                >
                  {c.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-12 text-center">
            <Link href="/services" className="btn btn-primary">
              View Full Service Menu
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
