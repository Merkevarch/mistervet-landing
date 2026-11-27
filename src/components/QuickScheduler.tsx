import { useState } from 'react';
import { LIVESTOCK_COVERAGE, WHATSAPP_URL } from '../config';

type AttentionMode = 'mascotas' | 'ganaderia';

const SERVICES_BY_MODE: Record<AttentionMode, string[]> = {
  mascotas: [
    'Consulta médica general',
    'Vacunación y desparasitación',
    'Exámenes de laboratorio',
    'Certificado de viaje',
  ],
  ganaderia: [
    'Manejo sanitario del hato',
    'Plan de vacunación y desparasitación',
    'Consultoría reproductiva',
    'Sistematización del hato',
    'Visita técnica programada',
  ],
};

const OTHER_LOCATION = 'Otro';

const LOCATIONS_BY_MODE: Record<AttentionMode, string[]> = {
  mascotas: ['Montería', 'Sincelejo', OTHER_LOCATION],
  ganaderia: LIVESTOCK_COVERAGE.departments,
};

/**
 * Pre-agendador interactivo de 2 pasos:
 * Permite seleccionar tipo de atención, servicio y ciudad/departamento para
 * generar un mensaje directo y preciso por WhatsApp sin formularios largos.
 */
export default function QuickScheduler() {
  const [mode, setMode] = useState<AttentionMode>('mascotas');
  const [service, setService] = useState<string>(SERVICES_BY_MODE.mascotas[0]);
  const [location, setLocation] = useState<string>(LOCATIONS_BY_MODE.mascotas[0]);
  const [customLocation, setCustomLocation] = useState<string>('');

  const handleModeChange = (nextMode: AttentionMode) => {
    setMode(nextMode);
    setService(SERVICES_BY_MODE[nextMode][0]);
    setLocation(LOCATIONS_BY_MODE[nextMode][0]);
    setCustomLocation('');
  };

  const handleLocationChange = (nextLocation: string) => {
    setLocation(nextLocation);
    if (nextLocation !== OTHER_LOCATION) {
      setCustomLocation('');
    }
  };

  const services = SERVICES_BY_MODE[mode];
  const locations = LOCATIONS_BY_MODE[mode];
  const isCustomCity = mode === 'mascotas' && location === OTHER_LOCATION;
  const trimmedCustom = customLocation.trim();

  const message =
    mode === 'mascotas'
      ? isCustomCity
        ? trimmedCustom
          ? `Hola MisterVet, quiero agendar a domicilio el servicio de "${service}" en ${trimmedCustom} (validar disponibilidad).`
          : `Hola MisterVet, quiero agendar a domicilio el servicio de "${service}" en otra ciudad (quiero validar disponibilidad).`
        : `Hola MisterVet, quiero agendar a domicilio el servicio de "${service}" en ${location}.`
      : `Hola MisterVet, necesito asesoría para finca: "${service}" en ${location}.`;

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white border border-mv-blue/25 rounded-2xl p-4 sm:p-6 shadow-md shadow-mv-darkblue/5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 pb-4 sm:pb-5 border-b border-slate-100">
        <div>
          <p className="text-xs font-medium text-mv-blue tracking-wide">
            Pre-agendador rápido
          </p>
          <h2 className="text-lg font-display font-semibold text-mv-darkblue tracking-tight">
            Prepara tu solicitud en segundos
          </h2>
        </div>

        {/* Selector de modalidad */}
        <div
          role="tablist"
          aria-label="Tipo de atención"
          className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex p-1 bg-slate-100 rounded-xl"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'mascotas'}
            onClick={() => handleModeChange('mascotas')}
            className={`px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs font-medium rounded-lg transition-all duration-150 text-center whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'mascotas'
                ? 'bg-white text-mv-darkblue shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mascotas a domicilio
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'ganaderia'}
            onClick={() => handleModeChange('ganaderia')}
            className={`px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs font-medium rounded-lg transition-all duration-150 text-center whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'ganaderia'
                ? 'bg-white text-mv-darkblue shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Finca y Ganadería
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-12 gap-4 pt-5 items-end">
        <div className="sm:col-span-5">
          <label
            htmlFor="scheduler-service"
            className="block text-xs font-medium text-slate-600 mb-1.5"
          >
            Servicio requerido
          </label>
          <select
            id="scheduler-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-mv-blue/30 focus:border-mv-blue transition-colors"
          >
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="scheduler-location"
            className="block text-xs font-medium text-slate-600 mb-1.5"
          >
            {mode === 'mascotas' ? 'Ciudad' : 'Departamento'}
          </label>
          <select
            id="scheduler-location"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-mv-blue/30 focus:border-mv-blue transition-colors"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 bg-mv-orange text-white text-sm font-semibold rounded-xl hover:bg-mv-orange/90 transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm"
          >
            <span>{isCustomCity ? 'Validar por WhatsApp' : 'Agendar ahora'}</span>
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
          </a>
        </div>
      </div>

      {isCustomCity && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <label
            htmlFor="scheduler-custom-location"
            className="block text-xs font-medium text-slate-600 mb-1.5"
          >
            Escribe tu ciudad o municipio para validar disponibilidad
          </label>
          <input
            id="scheduler-custom-location"
            type="text"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            placeholder="Ej. Cereté, Corozal, Sahagún..."
            className="w-full sm:max-w-md h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-mv-blue/30 focus:border-mv-blue transition-colors"
          />
        </div>
      )}

      <p className="mt-3.5 text-xs text-slate-500 leading-relaxed">
        Mensaje listo para enviar: <span className="text-slate-700 italic">“{message}”</span>
      </p>
    </div>
  );
}
