import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../schemas';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';

const services = [
  {
    title: 'Manejo Sanitario en Bovinos',
    desc: 'Diseño e implementación de programas sanitarios integrales para hatos lecheros y de ceba. Incluye calendarios de vacunación, desparasitación estratégica, manejo de mastitis, control de patologías reproductivas y protocolos de bioseguridad adaptados a las condiciones específicas de cada finca.',
    icon: (
      <svg className="w-8 h-8 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    title: 'Consultoría Reproductiva',
    desc: 'Evaluación y mejora de los índices reproductivos del hato: revisión ginecológica, diagnóstico de gestación, manejo de toros, programas de inseminación artificial, control de abortos y análisis de intervalos parto-concepción para optimizar la eficiencia productiva.',
    icon: (
      <svg className="w-8 h-8 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: 'Manejo Sanitario en Porcinos',
    desc: 'Asesoría técnica para granjas porcícolas en todas las etapas productivas: crianza, levante, ceba y reproducción. Manejo de patologías prevalentes, protocolos de vacunación, manejo de cerdas y lechones, y optimización de la conversión alimenticia desde la perspectiva sanitaria.',
    icon: (
      <svg className="w-8 h-8 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Planes de Vacunación y Desparasitación',
    desc: 'Calendarios estratégicos diseñados según la región, el sistema de producción y el perfil epidemiológico local. Trabajamos con productos de calidad comprobada y registramos cada aplicación para cumplir con los requisitos de trazabilidad exigidos por el ICA y los compradores.',
    icon: (
      <svg className="w-8 h-8 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M14.25 3.104v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M5 14.5l-1.43 1.43c-1.232 1.232-.65 3.318 1.067 3.611A48.309 48.309 0 0 0 12 21c2.773 0 5.491-.235 8.135-.687 1.718-.293 2.3-2.379 1.067-3.61L19 14.5" />
      </svg>
    ),
  },
  {
    title: 'Visitas Técnicas Programadas',
    desc: 'Rutas de visita periódicas a la finca con revisión de animales, evaluación de instalaciones, revisión de registros productivos y reuniones con el personal para capacitación y ajuste de protocolos. La constancia en la visita es clave para detectar tendencias y prevenir problemas.',
    icon: (
      <svg className="w-8 h-8 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: 'Análisis de Registros Productivos',
    desc: 'Interpretación de los indicadores zootécnicos del hato: mortalidad, morbilidad, ganancia de peso, producción de leche, intervalo entre partos y eficiencia reproductiva. Convertimos los registros en decisiones: identificamos cuellos de botella y proponemos planes de mejora medibles.',
    icon: (
      <svg className="w-8 h-8 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: 'Mejor Rentabilidad',
    desc: 'La prevención sanitaria reduce pérdidas por mortalidad, baja productividad y descarte prematuro. Cada peso invertido en un plan sanitario bien ejecutado se traduce en mejor conversión, mayor producción y animales que alcanzan su potencial genético.',
  },
  {
    title: 'Trazabilidad y Cumplimiento',
    desc: 'Llevamos registros detallados de cada intervención sanitaria, lo que facilita las auditorías del ICA, los requisitos de los compradores y el acceso a mercados que exigen certificaciones específicas como Buenas Prácticas Pecuarias.',
  },
  {
    title: 'Decisiones Basadas en Datos',
    desc: 'La interpretación periódica de los registros productivos permite identificar oportunidades de mejora que a simple vista pasan desapercibidas. Trabajamos con indicadores clave y los comparamos con benchmarks del sector para orientar las decisiones.',
  },
  {
    title: 'Capacitación del Personal',
    desc: 'El éxito de cualquier programa sanitario depende del personal que lo ejecuta día a día. Incluimos capacitación al equipo de la finca en manejo, aplicación de medicamentos, identificación temprana de problemas y registro adecuado de la información.',
  },
];

export default function ProduccionPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Consultoría veterinaria para producción animal y ganadería',
    provider: {
      '@type': 'VeterinaryBusiness',
      name: 'MisterVet',
      telephone: '+573017653440',
      email: 'contacto@mistervet.co',
      url: 'https://www.mistervet.co',
      areaServed: 'Colombia',
    },
    areaServed: 'Colombia',
    description: 'Asesoría técnica veterinaria para fincas y sistemas de producción pecuaria: manejo sanitario en bovinos y porcinos, consultoría reproductiva, planes de vacunación y desparasitación, visitas técnicas programadas y análisis de registros productivos.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'COP',
    },
  };

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Inicio', path: '/' },
    { name: 'Producción y Ganadería', path: '/produccion' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title="Producción y Ganadería | Consultoría Veterinaria Pecuaria"
        description="Asesoría técnica veterinaria para fincas y sistemas de producción pecuaria en Colombia: manejo sanitario en bovinos y porcinos, consultoría reproductiva, planes de vacunación, visitas técnicas y análisis de registros productivos."
        path="/produccion"
        type="website"
        keywords={['consultoría veterinaria', 'ganadería Colombia', 'producción bovina', 'manejo sanitario bovinos', 'consultoría pecuaria', 'veterinario fincas', 'reproducción bovina', 'planes de vacunación ganadería', 'porcicultura']}
        jsonLd={[serviceSchema, breadcrumb]}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold text-mv-amber uppercase tracking-wide">Consultoría de Campo</span>
            <h1 className="text-4xl lg:text-5xl font-display text-mv-darkblue leading-tight mt-2 mb-5">
              Producción y <span className="text-mv-amber">Ganadería</span> con respaldo profesional
            </h1>
            <p className="text-base text-slate-600 mb-4 leading-relaxed">
              Asesoría técnica veterinaria para fincas y sistemas de producción pecuaria. Trabajamos codo a codo con productores bovinos, porcinos y de otras especies para optimizar la productividad, garantizar la sanidad animal y mejorar la rentabilidad de la operación con protocolos basados en evidencia científica.
            </p>
            <p className="text-base text-slate-600 mb-6 leading-relaxed">
              No se trata únicamente de atender animales enfermos: nuestro enfoque es preventivo y se apoya en el análisis continuo de los indicadores productivos y reproductivos del hato. La meta es anticiparnos a los problemas antes de que impacten la caja de la finca.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
              >
                Solicitar Visita Técnica
              </a>
              <a
                href={CONTACT_EMAIL}
                className="px-6 py-3 border-2 border-mv-darkblue text-mv-darkblue font-semibold rounded-xl hover:bg-mv-darkblue hover:text-white transition-all"
              >
                Contactar por Correo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Servicios Pecuarios</h2>
            <p className="text-slate-500">Soluciones técnicas para sistemas de producción animal</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  {s.icon}
                  <h3 className="text-base font-bold text-slate-800">{s.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className="bg-slate-50 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">¿Por qué invertir en asesoría veterinaria?</h2>
            <p className="text-slate-500">El impacto real en tu sistema de producción</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-mv-darkblue mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENFOQUE ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Metodología de Trabajo</h2>
            <p className="text-slate-500">Cómo implementamos un plan sanitario exitoso</p>
          </div>
          <div className="grid sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mv-amber/10 flex items-center justify-center">
                <span className="text-xl font-bold text-mv-amber">1</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm">Diagnóstico</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visita inicial, evaluación del hato, instalaciones y registros existentes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mv-amber/10 flex items-center justify-center">
                <span className="text-xl font-bold text-mv-amber">2</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm">Plan Sanitario</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diseño de protocolos de vacunación, desparasitación y manejo adaptados a la finca.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mv-amber/10 flex items-center justify-center">
                <span className="text-xl font-bold text-mv-amber">3</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm">Implementación</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Capacitación del personal, visitas técnicas periódicas y seguimiento de protocolos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mv-amber/10 flex items-center justify-center">
                <span className="text-xl font-bold text-mv-amber">4</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm">Evaluación</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Análisis de indicadores, ajustes al plan y reportes de impacto productivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-mv-darkblue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-display mb-3">¿Quieres mejorar los indicadores de tu finca?</h2>
          <p className="text-slate-300 mb-6">Coordinemos una visita técnica de diagnóstico sin compromiso</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
            >
              Hablar por WhatsApp
            </a>
            <Link
              to="/mascotas"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-mv-darkblue transition-all"
            >
              Ver Servicios para Mascotas
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
