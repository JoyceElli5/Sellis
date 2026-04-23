import Link from 'next/link';

const HERO_IMAGE =
  '/sellis3.jpeg';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(150deg,#1a0e09_0%,#3D2B1F_35%,#7A5040_65%,#C9A870_100%)]" aria-label="Hero">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 z-1 bg-black/60" aria-hidden />
      <div
        className="absolute inset-0 z-2 bg-linear-to-br from-[rgba(26,14,9,0.55)] via-[rgba(61,43,31,0.30)] to-[rgba(168,134,90,0.10)]"
        aria-hidden
      />

      <div className="relative z-4 mx-auto grid w-full max-w-[1240px] grid-cols-1 items-end gap-10 px-10 pb-20 pt-32 max-md:px-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
        <div
          className="motion-fade-up mb-7 inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/18 px-5 py-2 backdrop-blur-md"
          aria-hidden
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          <span className="text-[0.66rem] font-bold uppercase tracking-[3px] text-gold-light">
            Modern Luxury Spa
          </span>
        </div>

        <h1 className="motion-fade-up motion-delay-1 mb-5 max-w-[760px] text-[clamp(2.4rem,6.2vw,5.2rem)] leading-[1.02] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
          Come in heavy.
          <br />
          <span className="text-gold-light">Leave weightless.</span>
        </h1>

        <p className="motion-fade-up motion-delay-2 mb-10 max-w-[560px] text-[1.03rem] leading-[1.8] text-white/78">
          Deep tissue recovery, skin reset facials, and calming rituals designed for real life stress. This is not a brochure spa. This is your reset button.
        </p>

        <div className="motion-fade-up motion-delay-3 flex flex-wrap items-center gap-3.5 max-md:flex-col max-md:items-stretch">
          <Link href="/booking" className="btn btn-primary max-md:text-center">
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/50 bg-transparent px-[34px] py-3.5 text-[0.85rem] font-bold tracking-wide text-white transition-all duration-300 hover:border-white hover:bg-white/10 max-md:text-center"
          >
            Explore Services
          </Link>
        </div>
        </div>

        <div className="motion-fade-up motion-delay-3 surface-card hidden border-white/15 bg-white/7 p-6 text-white backdrop-blur-md lg:block">
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[2px] text-gold-light">Most Booked This Week</p>
          <h3 className="mb-1 text-white">Stress Relief Massage</h3>
          <p className="mb-5 text-[0.9rem] text-white/72">90 minutes of deep pressure + hot stone finishing to unlock neck, back and shoulder tension.</p>
          <div className="flex items-center justify-between border-t border-white/20 pt-4">
            <span className="text-xl font-bold text-gold-light">From GHs 280</span>
            <Link href="/booking?service=Massage%20%E2%80%BA%20Stress%20Relief%20Massage" className="btn btn-white btn-sm">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-[4%] top-1/2 z-3 hidden h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-gold/20 md:block float-slow"
        aria-hidden
      >
        <div className="absolute inset-6 rounded-full border border-gold/15" />
        <div className="absolute inset-[50px] rounded-full border border-gold/[0.07]" />
      </div>

      <div className="pointer-events-none absolute -left-16 top-1/4 z-2 h-44 w-44 rounded-full bg-gold/20 blur-3xl float-slow" aria-hidden />
      <div className="pointer-events-none absolute -right-10 bottom-20 z-2 h-40 w-40 rounded-full bg-pink-blush/25 blur-3xl float-slow" aria-hidden />

      <div
        className="absolute bottom-10 left-1/2 z-4 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[2px] text-white/45"
        aria-hidden
      >
        <div className="h-14 w-px animate-scroll-pulse bg-linear-to-b from-transparent to-gold/70" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
