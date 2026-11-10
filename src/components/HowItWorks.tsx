import Reveal from './Reveal';

const steps = [
  {
    icon: '💬',
    title: 'Escríbenos',
    desc: 'Cuéntanos qué necesita tu mascota (o tu finca) por WhatsApp. Respondemos rápido, sin formularios eternos.',
  },
  {
    icon: '📅',
    title: 'Agenda tu visita',
    desc: 'Coordinamos juntos el día y la hora que mejor te sirvan dentro de tu zona de cobertura.',
  },
  {
    icon: '🏠',
    title: 'Atención donde estés',
    desc: 'El médico veterinario llega a tu casa o finca con el equipo necesario. Sin traslados estresantes.',
  },
  {
    icon: '❤️',
    title: 'Seguimiento incluido',
    desc: 'Te explicamos el diagnóstico con palabras claras y acompañamos la evolución hasta la recuperación.',
  },
];

/**
 * "¿Cómo funciona?" — reduce la incertidumbre del primer contacto mostrando
 * el proceso completo en 4 pasos. Conecta directamente con el CTA de WhatsApp.
 */
export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-bold text-mv-blue uppercase tracking-wide">
            Fácil y sin complicaciones
          </span>
          <h2 className="text-3xl font-display text-mv-darkblue mt-2 mb-2">
            ¿Cómo funciona el servicio?
          </h2>
          <p className="text-slate-500">De tu primer mensaje a la recuperación de tu mascota</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="relative bg-white rounded-2xl p-6 text-center h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Número de paso */}
                <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-mv-blue/10 text-mv-blue text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-mv-blue/10 flex items-center justify-center text-2xl">
                  <span aria-hidden="true">{step.icon}</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Una cita normal se agenda en menos de 5 minutos de chat.
        </p>
      </div>
    </section>
  );
}
