type SectionHeaderProps = {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
};

export default function SectionHeader({ label, title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-[60px] text-center ${light ? 'text-white' : ''}`}>
      {label && (
        <span
          className={`mb-2.5 inline-block text-[0.7rem] font-bold uppercase tracking-[3.5px] ${light ? 'text-gold-light' : 'text-gold-dark'}`}
        >
          {label}
        </span>
      )}
      <h2 className={`mb-0 ${light ? 'text-white' : 'text-text-primary'}`}>{title}</h2>
      <div
        className={`mx-auto my-3.5 h-0.5 w-14 rounded-sm ${
          light ? 'bg-gradient-to-r from-gold to-transparent' : 'bg-gradient-to-r from-gold-dark to-gold-light'
        }`}
      />
      {subtitle && (
        <p
          className={`mx-auto max-w-[500px] text-[0.95rem] ${light ? 'text-white/60' : 'text-text-secondary'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
