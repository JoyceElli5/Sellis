'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true when the page has scrolled past `threshold` pixels.
 * Used by Navbar to switch from transparent to solid background.
 */
export function useNavScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll(); // run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
