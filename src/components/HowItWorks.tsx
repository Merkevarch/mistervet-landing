import { ReactNode } from 'react';
import Reveal from './Reveal';

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: ReactNode;
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Escríbenos por WhatsApp',
    desc: 'Cuéntanos qué necesita tu mascota o tu finca. Respondemos rápido y sin formularios eternos.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Agenda tu visita',
    desc: 'Coordinamos el día y la franja horaria que mejor te funcione dentro de tu zona de cobertura.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Atención donde estés',
    desc: 'El médico veterinario llega a tu casa o finca con el equipo clínico necesario, sin traslados estresantes.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.5a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V15a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V9.75" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Seguimiento incluido',
    desc: 'Explicamos el diagnóstico con claridad y acompañamos la evolución del paciente hasta su recuperación.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
];

/**
 * "¿Cómo funciona?" — línea editorial continua de 4 pasos sin emojis ni badges repetitivos.
 */
export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-mv-blue tracking-wide mb-2">
            Proceso simple en cuatro pasos
          </p>
          <h2 className="text-3xl lg:text-4xl font-display font-semibold tracking-tight text-mv-darkblue mb-3 text-balance">
            ¿Cómo funciona el servicio?
          </h2>
          <p className="text-slate-600 leading-relaxed">
            De tu primer mensaje a la recuperación de tu mascota, con agenda directa en menos de 5 minutos.
          </p>
        </div>

        <div className="relative">
          {/* Línea horizontal continua en escritorio */}
          <div
            className="hidden lg:block absolute top-6 left-6 right-6 h-px bg-slate-200"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 75}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-mv-darkblue flex items-center justify-center relative z-10 shadow-xs">
                      {step.icon}
                    </span>
                    <span className="text-xs font-semibold tabular-nums text-slate-400 tracking-wider">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-mv-darkblue mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
