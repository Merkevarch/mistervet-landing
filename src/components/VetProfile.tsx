import { vetProfile, isPlaceholder } from '../data/trust';
import { WHATSAPP_CITA_URL } from '../config';

/**
 * "Conoce a tu veterinario" — la sección que pone rostro y credenciales
 * al servicio. Para una web de atención a DOMICILIO es la señal de
 * confianza más importante: la familia sabe exactamente quién va a
 * entrar a su casa.
 *
 * Mientras el propietario envía sus datos reales, se muestra el hueco
 * con marcadores visibles (no inventamos credenciales).
 */
export default function VetProfile() {
  const pending = isPlaceholder(vetProfile.name);

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-bold text-mv-orange uppercase tracking-wide">
            Quién te atiende
          </span>
          <h2 className="text-3xl font-display text-mv-darkblue mt-2 mb-2">
            Conoce a tu veterinario
          </h2>
          <p className="text-slate-500">
            La persona que llegará a tu casa o a tu finca
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Foto (o hueco pendiente) */}
          <div className="md:col-span-2 flex justify-center">
            {vetProfile.photo ? (
              <img
                src={vetProfile.photo}
                alt={`${vetProfile.name}, ${vetProfile.degree}`}
                width="480"
                height="600"
                className="w-64 sm:w-72 lg:w-80 aspect-[4/5] object-cover rounded-2xl shadow-xl ring-4 ring-mv-blue/10"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-64 sm:w-72 lg:w-80 aspect-[4/5] rounded-2xl border-2 border-dashed border-mv-amber/60 bg-mv-amber/5 flex flex-col items-center justify-center text-center p-6">
                <span className="text-5xl mb-3" aria-hidden="true">🩺</span>
                <p className="text-sm font-medium text-mv-darkblue">
                  Aquí irá tu foto profesional
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Con batas o en ambiente de trabajo genera aún más confianza
                </p>
              </div>
            )}
          </div>

          {/* Datos */}
          <div className="md:col-span-3">
            {pending ? (
              <p className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg bg-mv-amber/10 border border-dashed border-mv-amber/60 text-xs font-medium text-amber-700">
                ⏳ Pendiente: nombre, universidad y tarjeta profesional
              </p>
            ) : (
              <p className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg bg-emerald-50 text-xs font-medium text-emerald-700">
                ✓ Médico veterinario titulado
              </p>
            )}

            <h3 className="text-2xl font-display text-mv-darkblue mb-1">
              {pending ? '[Tu nombre completo]' : vetProfile.name}
            </h3>
            <p className="text-mv-blue font-medium mb-4">{vetProfile.degree}</p>

            {/* Credenciales */}
            <ul className="space-y-2 text-sm text-slate-600 mb-5">
              <li className="flex items-center gap-2">
                <span className="text-mv-orange">🎓</span>
                {isPlaceholder(vetProfile.university) ? (
                  <span className="text-slate-400">[Universidad donde te graduaste]</span>
                ) : (
                  <span>Graduado de {vetProfile.university}</span>
                )}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mv-orange">🪪</span>
                {isPlaceholder(vetProfile.license) ? (
                  <span className="text-slate-400">[Nº de tarjeta profesional]</span>
                ) : (
                  <span>Tarjeta profesional {vetProfile.license}</span>
                )}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mv-orange">📍</span>
                <span>Sincelejo y Montería · Costa Caribe colombiana</span>
              </li>
            </ul>

            {/* Bio */}
            {vetProfile.bio.map((paragraph, i) => (
              <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3">
                {paragraph}
              </p>
            ))}

            <a
              href={WHATSAPP_CITA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-mv-blue hover:text-mv-orange transition-colors"
            >
              Agendar cita por WhatsApp
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
