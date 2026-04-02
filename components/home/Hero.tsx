import Link from 'next/link';

const HERO_IMAGE =
  'https://plus.unsplash.com/premium_photo-1733342654514-820af792c969?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbiUyMGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(150deg,#1a0e09_0%,#3D2B1F_35%,#7A5040_65%,#C9A870_100%)]"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] bg-black/52" aria-hidden />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-br from-[rgba(26,14,9,0.55)] via-[rgba(61,43,31,0.30)] to-[rgba(168,134,90,0.10)]"
        aria-hidden
      />

      <div className="relative z-[4] mx-auto max-w-[720px] px-10 text-center max-md:px-5">
        <div
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/20 px-[22px] py-2 backdrop-blur-md"
          aria-hidden
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          <span className="text-[0.68rem] font-bold uppercase tracking-[3px] text-gold-light">
            Premium Beauty &amp; Wellness
          </span>
        </div>

        <h1 className="mb-5 text-[clamp(2.2rem,6vw,4rem)] leading-[1.14] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
          Luxury Beauty
          <br />
          &amp; <em className="italic text-gold-light">Spa Experience</em>
        </h1>

        <p className="mx-auto mb-10 max-w-[460px] text-[1.05rem] font-light leading-[1.9] text-white/80">
          Your sanctuary for beauty, wellness, and relaxation. Discover expert treatments crafted just for you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 max-md:flex-col max-md:items-stretch">
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

      <div
        className="pointer-events-none absolute right-[6%] top-1/2 z-[3] hidden h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-gold/20 md:block"
        aria-hidden
      >
        <div className="absolute inset-6 rounded-full border border-gold/15" />
        <div className="absolute inset-[50px] rounded-full border border-gold/[0.07]" />
      </div>

      <div
        className="absolute bottom-10 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[2px] text-white/45"
        aria-hidden
      >
        <div className="h-14 w-px animate-scroll-pulse bg-gradient-to-b from-transparent to-gold/70" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
