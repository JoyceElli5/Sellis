'use client';

import { useEffect, useRef, type RefObject } from 'react';

const defaultOptions: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, adds the CSS class `visibleClass`
 * (default: 'visible'). Used by the FadeIn component.
 */
export function useScrollAnimation(
  visibleClass = 'visible',
  options?: IntersectionObserverInit
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const merged: IntersectionObserverInit = { ...defaultOptions, ...optionsRef.current };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add(visibleClass);
        observer.unobserve(el);
      }
    }, merged);

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleClass]);

  return ref;
}
