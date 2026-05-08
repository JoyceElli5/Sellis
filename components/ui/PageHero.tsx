import Image from 'next/image';

type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
};

export default function PageHero({ label, title, subtitle, imageUrl }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden bg-linear-to-br from-brown-dark via-[#5C3328] to-gold-dark pb-[84px] pt-[148px] text-center">
      {imageUrl && (
        <>
          <Image src={imageUrl} alt="" fill className="object-cover" unoptimized priority />
          <div className="absolute inset-0 bg-black/45" aria-hidden />
        </>
      )}
      <div
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[500px] w-[500px] rounded-full bg-gold/8"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] -left-[5%] h-[300px] w-[300px] rounded-full bg-pink-blush/6"
        aria-hidden
      />
      <div className="container relative z-2">
        {label && (
          <span className="motion-fade-up mb-3 block text-[0.68rem] font-bold uppercase tracking-[4px] text-gold-light">
            {label}
          </span>
        )}
        <h1 className="motion-fade-up motion-delay-1 mb-3.5 text-white">{title}</h1>
        {subtitle && <p className="motion-fade-up motion-delay-2 mx-auto max-w-[480px] text-white/70">{subtitle}</p>}
      </div>
    </header>
  );
}
