import { stats } from '../data/trust';
import CountUp from './CountUp';

/**
 * Barra de cifras sobre banda azul: experiencia, pacientes y cobertura.
 * Datos reales confirmados por el propietario (src/data/trust.ts).
 */
export default function StatsBar() {
  return (
    <section className="bg-mv-darkblue text-white py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display text-mv-amber leading-none mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300">{stat.label}</p>
              {stat.detail ? (
                <p className="mt-1 text-[10px] sm:text-xs text-slate-400 leading-snug">
                  {stat.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
