import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  suffix?: string;
}

/**
 * Contador que anima de 0 al valor final cuando entra en pantalla.
 * Con prefers-reduced-motion muestra el valor final directamente.
 */
const shouldSkipAnimation = () =>
  typeof window !== 'undefined' &&
  (navigator.userAgent.includes('MisterVetPrerender') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

export default function CountUp({ value, suffix = '' }: CountUpProps) {
  const [display, setDisplay] = useState(() => (shouldSkipAnimation() ? value : 0));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldSkipAnimation()) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();

        const duration = 1400; // ms
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cúbico
          setDisplay(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const shown = shouldSkipAnimation() ? value : display;

  return (
    <span ref={ref}>
      {shown.toLocaleString('es-CO')}
      {suffix}
    </span>
  );
}
