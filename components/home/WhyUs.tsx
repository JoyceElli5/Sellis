import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import HIcon from '@/components/ui/HIcon';
import { Mortarboard02Icon, SparklesIcon, FlowerIcon, HeartCheckIcon } from '@hugeicons/core-free-icons';

const items = [
  {
    icon: Mortarboard02Icon,
    title: 'Expert Team',
    desc: 'Our trained and certified specialists bring skill, precision, and passion to every treatment.',
  },
  {
    icon: SparklesIcon,
    title: 'Premium Products',
    desc: 'We use only top-quality products to ensure the best results for your skin and hair.',
  },
  {
    icon: FlowerIcon,
    title: 'Relaxing Atmosphere',
    desc: 'Step into a serene, beautifully designed space where every visit feels like a retreat.',
  },
  {
    icon: HeartCheckIcon,
    title: 'Personalised Care',
    desc: 'Every client is unique. We tailor every service to your individual needs and preferences.',
  },
] as const;

export default function WhyUs() {
  return (
    <section className="section relative overflow-hidden bg-gradient-to-br from-brown-dark to-[#4A2C1C] before:pointer-events-none before:absolute before:-right-20 before:-top-20 before:z-0 before:h-[380px] before:w-[380px] before:rounded-full before:bg-gold/[0.05]">
      <div className="container relative z-[1]">
        <FadeIn>
          <SectionHeader
            label="Why Sellis"
            title="The Sellis Difference"
            subtitle="We go beyond beauty — we create an experience"
            light
          />
        </FadeIn>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className="rounded-spa-lg border border-gold/20 bg-white/5 px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:bg-gold/10">
                <div className="mx-auto mb-4 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-gold/25 bg-gradient-to-br from-gold/20 to-gold/10 text-2xl">
                  <HIcon icon={item.icon} size={26} strokeWidth={1.8} className="text-gold-light" />
                </div>
                <h4 className="mb-2.5 text-base text-gold-light">{item.title}</h4>
                <p className="text-[0.84rem] leading-relaxed text-white/60">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
