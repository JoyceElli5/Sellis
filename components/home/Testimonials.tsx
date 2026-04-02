import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';

const reviews = [
  {
    initial: 'A',
    name: 'Abena K.',
    text: 'The Swedish massage at Sellis was absolutely divine. The ambience, the service, the attention to detail — I felt like royalty. Will definitely be coming back!',
  },
  {
    initial: 'E',
    name: 'Efua M.',
    text: 'Got my lashes done here — classic cat eye set — and I received so many compliments. The lash tech is incredibly skilled and so gentle. My new go-to spa!',
  },
  {
    initial: 'S',
    name: 'Selina D.',
    text: 'My braids and deep cleansing facial were done to perfection. The team is professional, friendly and the space is so clean and beautiful. Highly recommend!',
  },
] as const;

export default function Testimonials() {
  return (
    <section className="section bg-off-white">
      <div className="container">
        <FadeIn>
          <SectionHeader label="Happy Clients" title="What Our Clients Say" />
        </FadeIn>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.1}>
              <div className="rounded-spa-lg border border-transparent bg-white p-7 shadow-spa-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-light hover:shadow-spa-md">
                <div className="mb-3.5 font-serif text-[3.2rem] leading-none text-gold-light">&ldquo;</div>
                <p className="mb-5 text-[0.9rem] italic leading-loose">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light font-serif text-base font-bold text-white">
                    {r.initial}
                  </div>
                  <div>
                    <span className="block text-[0.875rem] font-bold text-text-primary">{r.name}</span>
                    <div className="mt-0.5 text-[0.72rem] text-gold">★★★★★</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
