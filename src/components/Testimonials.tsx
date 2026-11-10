import { testimonials, isPlaceholder } from '../data/trust';
import { GBP_PROFILE_URL } from '../config';

/**
 * Testimonios de clientes reales + enlace al perfil de Google.
 *
 * ⚠️ Los textos pendientes se muestran como huecos visibles — nunca se
 * inventan reseñas. Cuando el propietario envíe las reales, basta con
 * editar src/data/trust.ts.
 */
export default function Testimonials() {
  const pending = testimonials.some((t) => isPlaceholder(t.text));

  return (
    <section className="bg-slate-50 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-bold text-mv-orange uppercase tracking-wide">
            Lo que dicen nuestros clientes
          </span>
          <h2 className="text-3xl font-display text-mv-darkblue mt-2 mb-2">
            Familias que ya confían en MisterVet
          </h2>
          <p className="text-slate-500">Experiencias reales de Sincelejo, Montería y la Costa</p>
        </div>

        {pending && (
          <p className="text-center mb-6 text-xs text-slate-400">
            ⏳ Pendiente: reseñas reales del propietario (nunca publicamos testimonios inventados)
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const itemPending = isPlaceholder(t.text);
            return (
              <figure
                key={i}
                className={`bg-white rounded-2xl p-6 flex flex-col ${
                  itemPending
                    ? 'border-2 border-dashed border-mv-amber/50 opacity-70'
                    : 'shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
                }`}
              >
                {/* Estrellas */}
                <div className="flex gap-1 mb-3 text-mv-amber" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} aria-hidden="true">★</span>
                  ))}
                </div>
                <blockquote className="text-sm text-slate-600 leading-relaxed flex-1">
                  {itemPending ? (
                    <span className="text-slate-400 italic">
                      [Aquí irá la reseña real del cliente {i + 1}]
                    </span>
                  ) : (
                    <>“{t.text}”</>
                  )}
                </blockquote>
                <figcaption className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm font-bold text-slate-800">
                    {itemPending ? '[Nombre del cliente]' : t.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {itemPending ? '[Municipio]' : t.location}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p className="text-center mt-8 text-sm text-slate-500">
          ¿Quieres ver más?{' '}
          <a
            href={GBP_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mv-blue font-medium hover:underline"
          >
            Consulta nuestras reseñas en Google
          </a>
        </p>
      </div>
    </section>
  );
}
