type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-brown-dark via-[#5C3328] to-gold-dark pb-[84px] pt-[148px] text-center">
      <div
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[500px] w-[500px] rounded-full bg-gold/[0.08]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] -left-[5%] h-[300px] w-[300px] rounded-full bg-pink-blush/[0.06]"
        aria-hidden
      />
      <div className="container relative z-[2]">
        {label && (
          <span className="mb-3 block text-[0.68rem] font-bold uppercase tracking-[4px] text-gold-light">
            {label}
          </span>
        )}
        <h1 className="mb-3.5 text-white">{title}</h1>
        {subtitle && <p className="mx-auto max-w-[480px] text-white/70">{subtitle}</p>}
      </div>
    </header>
  );
}
