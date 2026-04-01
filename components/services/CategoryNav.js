'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CategoryNav.module.css';

export default function CategoryNav({ categories }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-cat-id]');
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80', 10);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.catId);
        });
      },
      { threshold: 0.25, rootMargin: `-${navHeight + 60}px 0px -30% 0px` }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const target = document.getElementById(`cat-${id}`);
    if (!target) return;
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80', 10);
    const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 68;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {Object.values(categories).map((cat) => (
          <button
            key={cat.id}
            className={`${styles.btn} ${active === cat.id ? styles.active : ''}`}
            onClick={() => scrollTo(cat.id)}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
