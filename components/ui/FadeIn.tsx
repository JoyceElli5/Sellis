'use client';

import type { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type Direction = 'up' | 'left' | 'right';

const directionClasses: Record<Direction, string> = {
  up: 'translate-y-7 [&.visible]:translate-y-0',
  left: '-translate-x-7 [&.visible]:translate-x-0',
  right: 'translate-x-7 [&.visible]:translate-x-0',
};

type FadeInProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
};

/**
 * Wraps children in a div that fades in when it enters the viewport.
 */
export default function FadeIn({ children, direction = 'up', delay = 0, className = '' }: FadeInProps) {
  const ref = useScrollAnimation('visible');
  const dirClass = directionClasses[direction] ?? directionClasses.up;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out [&.visible]:opacity-100 ${dirClass} opacity-0 ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
