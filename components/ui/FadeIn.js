'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './FadeIn.module.css';

/**
 * Wraps children in a div that fades in when it enters the viewport.
 * direction: 'up' | 'left' | 'right'
 */
export default function FadeIn({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useScrollAnimation('visible');

  const dirClass = {
    up:    styles.fadeUp,
    left:  styles.fadeLeft,
    right: styles.fadeRight,
  }[direction] ?? styles.fadeUp;

  return (
    <div
      ref={ref}
      className={`${styles.base} ${dirClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
