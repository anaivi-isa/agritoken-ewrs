'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('section-visible');
          el.classList.remove('section-hidden');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    el.classList.add('section-hidden');
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
