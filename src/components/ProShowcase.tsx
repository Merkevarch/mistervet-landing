import { useState } from 'react';
import { Link } from 'react-router-dom';
import mockupSoftware from '../assets/mockup-software.webp';
import { SETUP_URL } from '../config';
import Reveal from './Reveal';

interface ProModule {
  id: string;
  label: string;
  headline: string;
  summary: string;
  points: string[];
}

const modules: ProModule[] = [
  {
    id: 'historia',
    label: 'Historia Clínica',
    headline: 'Expediente clínico digital completo por paciente',
    summary:
      'Registra consultas, anamnesis, exámenes físicos, vacunas, recetas en PDF con tu membrete e imágenes diagnósticas vinculadas al propietario.',
    points: [
      'Plantillas clínicas configurables por especie',
      'Control de cirugías, anestesia y hospitalización',
      'Recetas médicas y certificados descargables',
    ],
  },
  {
    id: 'pos',
    label: 'POS y Facturación',
    headline: 'Caja ágil integrada en tiempo real con inventario',
    summary:
      'Factura servicios médicos y productos en un solo ticket, controla métodos de pago múltiples y genera cierres diarios sin descuadres.',
    points: [
      'Facturación de servicios y venta de farmacia junta',
      'Compatible con normativa colombiana vigente',
      'Reportes diarios y mensuales de ingresos',
    ],
  },
  {
    id: 'agenda',
    label: 'Agenda y Citas',
    headline: 'Calendario organizado por médico y tipo de consulta',
    summary:
      'Visualiza turnos del día, evita cruces de horario y reduce inasistencias enviando recordatorios automáticos a cada propietario.',
    points: [
      'Vista diaria y semanal por profesional',
      'Recordatorios automatizados por WhatsApp o correo',
      'Reprogramación rápida sin perder historial',
    ],
  },
  {
    id: 'inventario',
    label: 'Inventario',
    headline: 'Trazabilidad por lote, vencimiento y stock mínimo',
    summary:
      'Recibe alertas antes de quedarte sin biológicos o insumos críticos, registra órdenes de compra a proveedores y consulta el kardex al instante.',
    points: [
      'Alertas automáticas de stock mínimo y vencimientos',
      'Descuento automático al facturar en POS',
      'Control de proveedores y compras',
    ],
  },
];

/**
 * Showcase interactivo de MisterVet Pro para la portada.
 * Permite explorar los 4 módulos principales sin recargar la página.
 */
export default function ProShowcase() {
  const [activeId, setActiveId] = useState<string>(modules[0].id);
  const active = modules.find((m) => m.id === activeId) ?? modules[0];

  return (
    <section id="software" className="bg-mv-darkblue text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-medium text-mv-amber tracking-wide mb-3">
              Software SaaS Multi-tenant · Para colegas y clínicas
            </p>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold tracking-tight text-balance mb-4">
              Impulsado por MisterVet Pro
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-xl">
              La plataforma diseñada por médicos veterinarios en Colombia para centralizar pacientes, caja, agenda e inventario desde cualquier dispositivo.
            </p>

            {/* Tabs interactivos de módulos */}
            <div
              role="tablist"
              aria-label="Módulos de MisterVet Pro"
              className="flex flex-wrap gap-1.5 p-1 bg-white/10 rounded-xl mb-6 w-fit"
            >
              {modules.map((mod) => {
                const isSelected = mod.id === active.id;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveId(mod.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-mv-darkblue shadow-sm'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {mod.label}
                  </button>
                );
              })}
            </div>

            {/* Panel dinámico del módulo seleccionado */}
            <div
              role="tabpanel"
              className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6"
            >
              <h3 className="text-base font-display font-semibold text-white mb-1.5">
                {active.headline}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {active.summary}
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                {active.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-mv-amber shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={SETUP_URL}
                className="inline-flex items-center justify-center px-6 py-3 bg-mv-orange text-white text-sm font-semibold rounded-xl hover:bg-mv-orange/90 transition-all duration-150 whitespace-nowrap shrink-0"
              >
                Registrar mi Veterinaria
              </a>
              <Link
                to="/software"
                className="inline-flex items-center justify-center px-5 py-3 border border-white/30 text-white text-sm font-medium rounded-xl hover:bg-white hover:text-mv-darkblue transition-all duration-150 whitespace-nowrap shrink-0"
              >
                Planes desde gratis hasta $80.000/mes
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <div className="bg-white/5 rounded-3xl border border-white/15 p-4 sm:p-5 overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-300 pb-3 mb-3 border-b border-white/10">
                  <span className="font-medium text-white">Vista · {active.label}</span>
                  <span>Plan Free (40 mascotas) · Enterprise ilimitado</span>
                </div>
                <img
                  src={mockupSoftware}
                  alt={`MisterVet Pro - Vista del módulo ${active.label}`}
                  className="w-full rounded-xl shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
