import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LIVESTOCK_COVERAGE,
  PETS_COVERAGE,
  WHATSAPP_CITA_URL,
  WHATSAPP_GANADERIA_URL,
} from '../config';
import Reveal from './Reveal';

type CareTrack = 'mascotas' | 'produccion';

const tracks: Record<
  CareTrack,
  {
    kicker: string;
    title: string;
    description: string;
    items: string[];
    coverageLabel: string;
    coverageList: string[];
    ctaLabel: string;
    ctaHref: string;
    detailLink: string;
    detailLabel: string;
  }
> = {
  mascotas: {
    kicker: 'Atención clínica a domicilio',
    title: 'Cuidado integral para perros y gatos en casa',
    description:
      'Llevamos la consulta veterinaria hasta la puerta de tu hogar para evitar el estrés del traslado, las salas de espera y el contacto con otros animales.',
    items: [
      'Consulta médica general y seguimiento de evolución',
      'Esquemas de vacunación y desparasitación personalizados',
      'Toma de muestras para laboratorio clínico sin salir de casa',
      'Cirugías programadas y certificados sanitarios de viaje',
    ],
    coverageLabel: 'Cobertura urbana y municipios cercanos',
    coverageList: [
      ...PETS_COVERAGE.cities,
      ...Object.values(PETS_COVERAGE.surroundings).flat().slice(0, 6),
    ],
    ctaLabel: 'Agendar consulta a domicilio',
    ctaHref: WHATSAPP_CITA_URL,
    detailLink: '/mascotas',
    detailLabel: 'Explorar todos los servicios para mascotas',
  },
  produccion: {
    kicker: 'Consultoría pecuaria de campo',
    title: 'Sanidad y productividad para fincas y hatos',
    description:
      'Acompañamiento médico veterinario en campo para sistemas bovinos y porcinos con protocolos sanitarios y reproductivos basados en evidencia.',
    items: [
      'Manejo sanitario integral en ganadería bovina y porcicultura',
      'Planes de vacunación, desparasitación y control de vectores',
      'Consultoría reproductiva e indicadores zootécnicos',
      'Sistematización del hato y visitas técnicas en la región Caribe',
    ],
    coverageLabel: `Cobertura regional en ${LIVESTOCK_COVERAGE.region}`,
    coverageList: LIVESTOCK_COVERAGE.departments,
    ctaLabel: 'Solicitar visita técnica',
    ctaHref: WHATSAPP_GANADERIA_URL,
    detailLink: '/produccion',
    detailLabel: 'Explorar consultoría para fincas',
  },
};

/**
 * Sección interactiva con selector segmentado entre Mascotas y Ganadería.
 * Reemplaza los dos bloques estáticos por un espacio editorial amplio,
 * mostrando cobertura real y acciones directas por perfil.
 */
export default function CareFocusSection() {
  const [activeTrack, setActiveTrack] = useState<CareTrack>('mascotas');
  const current = tracks[activeTrack];

  return (
    <section className="bg-white py-16 lg:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-mv-blue tracking-wide mb-2">
              Dos líneas de atención especializada
            </p>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold tracking-tight text-mv-darkblue text-balance">
              Medicina veterinaria para tu hogar o tu finca
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Línea de servicio veterinario"
            className="inline-flex p-1 bg-slate-100 rounded-xl self-start md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTrack === 'mascotas'}
              onClick={() => setActiveTrack('mascotas')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTrack === 'mascotas'
                  ? 'bg-white text-mv-darkblue shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Para tu Mascota
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTrack === 'produccion'}
              onClick={() => setActiveTrack('produccion')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTrack === 'produccion'
                  ? 'bg-white text-mv-darkblue shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Finca y Ganadería
            </button>
          </div>
        </div>

        <Reveal>
          <div
            role="tabpanel"
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-10"
          >
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-mv-orange tracking-wide mb-2">
                {current.kicker}
              </p>
              <h3 className="text-2xl lg:text-3xl font-display font-semibold tracking-tight text-mv-darkblue mb-4 text-balance">
                {current.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {current.description}
              </p>

              <ul className="space-y-3 mb-8">
                {current.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <svg
                      className="w-5 h-5 text-mv-blue shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-5">
                <a
                  href={current.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-mv-orange text-white text-sm font-semibold rounded-xl hover:bg-mv-orange/90 transition-all duration-150 whitespace-nowrap shrink-0"
                >
                  {current.ctaLabel}
                </a>
                <Link
                  to={current.detailLink}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-mv-darkblue hover:text-mv-blue transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{current.detailLabel}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-10">
              <p className="text-xs font-medium text-slate-500 mb-3">
                {current.coverageLabel}
              </p>
              <p className="text-sm font-medium text-mv-darkblue leading-relaxed mb-4">
                {current.coverageList.join(' · ')}
              </p>
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span>Atención por equipo médico veterinario titulado</span>
                <Link to="/cobertura" className="font-medium text-mv-blue hover:underline whitespace-nowrap shrink-0 ml-3">
                  Ver mapa y zonas
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
