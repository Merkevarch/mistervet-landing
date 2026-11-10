import { useState } from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Acordeón de preguntas frecuentes.
 *
 * - Accesible: cada pregunta es un <button> con aria-expanded.
 * - Animación suave de apertura con la técnica grid-rows 0fr→1fr
 *   (sin medir alturas con JS).
 * - El contenido cerrado sigue estando en el DOM, por lo que el
 *   schema FAQPage (JSON-LD) y el prerender SEO no se ven afectados.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  // La primera pregunta se muestra abierta por defecto para invitar a leer.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`bg-slate-50 rounded-2xl overflow-hidden transition-shadow duration-300 ${
              isOpen ? 'shadow-md' : 'hover:shadow-sm'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6 font-bold text-slate-800 hover:text-mv-blue transition-colors cursor-pointer"
            >
              <span className="text-sm sm:text-base">{item.q}</span>
              <svg
                className={`w-5 h-5 flex-shrink-0 text-mv-orange transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out faq-panel ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
