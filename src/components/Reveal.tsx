import { ReactNode, useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Retardo en ms — útil para escalonar tarjetas de una misma fila */
  delay?: number;
  className?: string;
}

/**
 * Aparición sutil al hacer scroll (fade + 16px de subida).
 *
 * - Usa IntersectionObserver nativo (sin librerías).
 * - Respeta prefers-reduced-motion: aparece sin animación.
 * - Mejora progresiva: el CSS solo oculta el contenido cuando el
 *   documento lleva la clase "js-reveal" (la añade main.tsx). Sin JS,
 *   todo el contenido queda visible — seguro para SEO y prerender.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Usuarios con movimiento reducido: mostrar directamente.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
