import { stats } from '../data/trust';
import CountUp from './CountUp';

/**
 * Barra de cifras sobre banda azul: pacientes, experiencia, cobertura.
 * Mientras haya cifras pendientes, el hueco se muestra como marcador
 * visible en lugar de un número inventado.
 */
export default function StatsBar() {
  return (
    <section className="bg-mv-darkblue text-white py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display text-mv-amber leading-none mb-2">
                {stat.value === null ? (
                  <span className="text-base sm:text-lg text-mv-amber/80 border border-dashed border-mv-amber/50 rounded-lg px-3 py-2 inline-block">
                    por confirmar
                  </span>
                ) : (
                  <CountUp value={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
