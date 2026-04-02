'use client';

import { useEffect, useState } from 'react';
import type { ServiceCategoryData } from '@/data/services';

type CategoryNavProps = {
  categories: Record<string, ServiceCategoryData>;
};

export default function CategoryNav({ categories }: CategoryNavProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-cat-id]');
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80',
      10
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            setActive(entry.target.dataset.catId ?? null);
          }
        });
      },
      { threshold: 0.25, rootMargin: `-${navHeight + 60}px 0px -30% 0px` }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(`cat-${id}`);
    if (!target) return;
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80',
      10
    );
    const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 68;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-[var(--nav-height)] z-[100] border-b border-cream-dark bg-white shadow-spa-sm">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-2 px-6 py-4">
        {Object.values(categories).map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`rounded-full border-[1.5px] border-cream-dark bg-transparent px-5 py-2 font-sans text-[0.76rem] font-bold uppercase tracking-wide text-text-secondary transition-all duration-300 hover:border-transparent hover:bg-gradient-to-br hover:from-gold-dark hover:to-gold hover:text-white hover:shadow-[0_4px_16px_rgba(168,134,90,0.3)] max-[520px]:px-3 max-[520px]:py-1.5 max-[520px]:text-[0.68rem] ${
              active === cat.id
                ? 'border-transparent bg-gradient-to-br from-gold-dark to-gold text-white shadow-[0_4px_16px_rgba(168,134,90,0.3)]'
                : ''
            }`}
            onClick={() => scrollTo(cat.id)}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
