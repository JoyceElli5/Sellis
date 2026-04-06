type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden pb-[84px] pt-[148px] text-center bg-[linear-gradient(150deg,#1a0e09_0%,#3D2B1F_35%,#7A5040_65%,#C9A870_100%)] border-b border-white/10">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1733342654514-820af792c969?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbiUyMGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D')` }}
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] bg-black/60" aria-hidden />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-br from-[rgba(26,14,9,0.7)] via-[rgba(61,43,31,0.5)] to-[rgba(168,134,90,0.2)]"
        aria-hidden
      />

      <div className="container relative z-[4]">
        {label && (
          <span className="mb-3 block text-[0.68rem] font-bold uppercase tracking-[4px] text-[#e2c598]">
            {label}
          </span>
        )}
        <h1 className="mb-3.5 text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">{title}</h1>
        {subtitle && <p className="mx-auto max-w-[480px] text-white/85 font-light">{subtitle}</p>}
      </div>
    </header>
  );
}
