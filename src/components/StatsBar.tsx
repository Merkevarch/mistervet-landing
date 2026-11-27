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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-white/15">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tabular-nums tracking-tight text-mv-amber leading-none mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-medium text-slate-200">{stat.label}</p>
              {stat.detail ? (
                <p className="mt-1 text-xs text-slate-400 leading-snug">
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
