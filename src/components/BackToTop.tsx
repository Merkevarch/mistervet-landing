import { useEffect, useState } from 'react';

/**
 * Botón "volver arriba" — solo escritorio (en móvil el espacio inferior
 * derecho pertenece al botón flotante de WhatsApp).
 * Aparece tras desplazarse 600px.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  const scrollTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Volver arriba"
      className="hidden md:flex fixed bottom-6 right-6 z-40 w-11 h-11 items-center justify-center rounded-full bg-mv-darkblue text-white shadow-lg shadow-mv-darkblue/30 hover:bg-mv-blue hover:-translate-y-0.5 transition-all"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
