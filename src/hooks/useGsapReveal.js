import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap.config';

/**
 * Attach a GSAP ScrollTrigger fade-up reveal to a container ref.
 * Children with class `.reveal` will animate in with optional stagger.
 *
 * @param {object} options
 * @param {number} options.stagger  - stagger delay between children (default 0)
 * @param {number} options.y        - starting Y offset (default 30)
 * @param {string} options.start    - ScrollTrigger start position (default 'top 85%')
 */
export function useGsapReveal({ stagger = 0, y = 30, start = 'top 85%' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const targets = ref.current.querySelectorAll('.reveal');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets.length ? targets : ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: stagger || 0,
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger, y, start]);

  return ref;
}
