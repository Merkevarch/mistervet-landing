import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO, { buildBreadcrumbSchema } from '../components/SEO';
import perroImg from '../assets/perro.jpg';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';

const services = [
  {
    title: 'Consulta General y Especializada',
    desc: 'Evaluación clínica completa con diagnóstico, plan terapéutico y seguimiento personalizado para cada paciente. Incluye anamnesis detallada, examen físico exhaustivo y orientación al propietario sobre el manejo en casa, la administración de medicamentos y los signos de alarma que requieren atención adicional.',
    icon: (
      <svg className="w-8 h-8 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: 'Vacunación y Desparasitación',
    desc: 'Esquemas de vacunación y desparasitación adaptados a la edad, especie, estilo de vida y riesgo epidemiológico de tu mascota. Trabajamos con biológicos de alta calidad y llevamos un registro digital de cada dosis, refuerzos y fechas de aplicación para que nunca te olvides de una vacuna importante.',
    icon: (
      <svg className="w-8 h-8 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: 'Cirugías y Hospitalización',
    desc: 'Procedimientos quirúrgicos generales y especializados con protocolos de bioseguridad, monitoreo anestésico y recuperación postoperatoria. Contamos con quirófano equipado, área de hospitalización separada por especies y atención continua durante el período crítico de recuperación.',
    icon: (
      <svg className="w-8 h-8 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 1 1-2.122-5.122 3 3 0 0 1 2.122 5.122ZM7.848 8.25a3 3 0 1 0 2.122 5.122 3 3 0 0 0-2.122-5.122Zm0 0L18 15.75M16.152 8.25l-1.536.887m1.536-.887a3 3 0 1 0 2.122-5.122 3 3 0 0 0-2.122 5.122Zm0 0L6 15.75" />
      </svg>
    ),
  },
  {
    title: 'Laboratorio y Diagnóstico',
    desc: 'Análisis clínicos, hematología, bioquímica, coprología y pruebas rápidas con resultados confiables en tiempo corto. La interpretación de cada examen la realiza el médico veterinario, integrando los hallazgos con el cuadro clínico para tomar decisiones terapéuticas precisas y oportunas.',
    icon: (
      <svg className="w-8 h-8 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M14.25 3.104v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M5 14.5l-1.43 1.43c-1.232 1.232-.65 3.318 1.067 3.611A48.309 48.309 0 0 0 12 21c2.773 0 5.491-.235 8.135-.687 1.718-.293 2.3-2.379 1.067-3.61L19 14.5" />
      </svg>
    ),
  },
  {
    title: 'Odontología Veterinaria',
    desc: 'Limpieza dental ultrasónica, extracciones, tratamiento de enfermedad periodontal y recomendaciones de higiene bucal. La salud oral impacta directamente sobre el bienestar general, la alimentación y la longevidad de tu mascota, por eso la incluimos como parte del chequeo anual.',
    icon: (
      <svg className="w-8 h-8 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Certificados de Viaje',
    desc: 'Documentación sanitaria y certificados veterinarios para viajes nacionales e internacionales, incluyendo cumplus de requisitos de aerolíneas y países destino. Te orientamos sobre los tiempos mínimos de vacunación, pruebas serológicas y trámites ante el ICA para evitar contratiempos.',
    icon: (
      <svg className="w-8 h-8 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: '¿Atienden especies además de perros y gatos?',
    a: 'Sí. Además de perros y gatos, atendemos conejos, aves, reptiles y otros animales de compañía no convencionales. Cada especie tiene requerimientos clínicos específicos y nuestro enfoque se adapta a ellos, desde la manipulación hasta los protocolos de medicación y manejo.',
  },
  {
    q: '¿Ofrecen servicio a domicilio?',
    a: 'Sí, contamos con atención a domicilio programada para consultas, vacunación y procedimientos que no requieran infraestructura de clínica. La disponibilidad depende de la zona y se agenda con anticipación. Para cirugías y hospitalización el paciente debe trasladarse a la sede.',
  },
  {
    q: '¿Cómo manejan las urgencias?',
    a: 'Las urgencias se atienden por orden de llegada y prioridad clínica. Te recomendamos contactarnos por WhatsApp antes de trasladar al animal para recibir indicaciones de primeros auxilios y confirmar disponibilidad inmediata. En casos críticos estabilizamos al paciente y coordinamos remisión si es necesario.',
  },
  {
    q: '¿Llevan un registro digital de mi mascota?',
    a: 'Sí. Cada paciente tiene una historia clínica digital con todas las consultas, vacunas, exámenes, medicamentos y procedimientos realizados. Esto nos permite dar continuidad al tratamiento y compartir la información contigo cuando la necesites, incluso si cambias de veterinario en el futuro.',
  },
];

export default function MascotasPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Servicios veterinarios para mascotas',
    provider: {
      '@type': 'VeterinaryBusiness',
      name: 'MisterVet',
      telephone: '+573017653440',
      email: 'contacto@mistervet.co',
      url: 'https://www.mistervet.co',
      areaServed: 'Colombia',
    },
    areaServed: 'Colombia',
    description: 'Atención médica veterinaria completa para perros, gatos y otras mascotas: consulta general y especializada, vacunación, desparasitación, cirugías, hospitalización, laboratorio clínico, odontología veterinaria y certificados de viaje.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'COP',
    },
  };

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Inicio', path: '/' },
    { name: 'Mascotas', path: '/mascotas' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title="Servicios Veterinarios para Mascotas"
        description="Atención médica veterinaria completa para perros, gatos y otras mascotas en Colombia: consulta general, vacunación, desparasitación, cirugías, hospitalización, laboratorio clínico, odontología y certificados de viaje. Servicio a domicilio."
        path="/mascotas"
        type="website"
        keywords={['veterinaria para mascotas', 'veterinario mascotas Colombia', 'consulta veterinaria', 'vacunación perros gatos', 'cirugía veterinaria', 'odontología veterinaria', 'certificados de viaje mascotas', 'laboratorio veterinario']}
        jsonLd={[serviceSchema, faqSchema, breadcrumb]}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-sm font-bold text-mv-orange uppercase tracking-wide">Servicios Clínicos</span>
              <h1 className="text-4xl lg:text-5xl font-display text-mv-darkblue leading-tight mt-2 mb-5">
                Cuidado integral para tus <span className="text-mv-blue">mascotas</span>
              </h1>
              <p className="text-base text-slate-600 mb-4 leading-relaxed">
                En MisterVet entendemos que tu mascota es parte de tu familia. Por eso ofrecemos atención médica veterinaria completa para perros, gatos y otras mascotas, con un enfoque preventivo, diagnóstico oportuno y tratamiento eficaz. Cada visita es una oportunidad para fortalecer el vínculo entre tú y tu compañero.
              </p>
              <p className="text-base text-slate-600 mb-6 leading-relaxed">
                Nuestro compromiso va más allá de resolver la enfermedad del momento: trabajamos en educación al propietario, planes de prevención adaptados al estilo de vida de cada animal y seguimiento a largo plazo, porque sabemos que la prevención sigue siendo la mejor medicina.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
                >
                  Agendar Cita
                </a>
                <a
                  href={CONTACT_EMAIL}
                  className="px-6 py-3 border-2 border-mv-darkblue text-mv-darkblue font-semibold rounded-xl hover:bg-mv-darkblue hover:text-white transition-all"
                >
                  Contactar por Correo
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <img src={perroImg} alt="Mascota" className="max-h-[400px] lg:max-h-[500px] object-contain object-bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Servicios para Mascotas</h2>
            <p className="text-slate-500">Atención profesional con enfoque preventivo y terapéutico</p>
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

      {/* ===== ENFOQUE ===== */}
      <section className="bg-slate-50 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Nuestro Enfoque</h2>
            <p className="text-slate-500">Cómo trabajamos para darle a tu mascota la mejor atención</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mv-blue/10 flex items-center justify-center">
                <span className="text-xl font-bold text-mv-blue">1</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Escucha</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Anamnesis detallada y escucha activa del propietario para entender el contexto completo del paciente.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mv-blue/10 flex items-center justify-center">
                <span className="text-xl font-bold text-mv-blue">2</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Diagnóstico</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Examen físico riguroso apoyado en laboratorio y herramientas diagnósticas cuando es necesario.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mv-blue/10 flex items-center justify-center">
                <span className="text-xl font-bold text-mv-blue">3</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Seguimiento</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Plan terapéutico claro, educación al propietario y seguimiento hasta la recuperación completa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Preguntas Frecuentes</h2>
            <p className="text-slate-500">Resolvemos las dudas más comunes sobre atención a mascotas</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-mv-darkblue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-display mb-3">¿Tu mascota necesita atención?</h2>
          <p className="text-slate-300 mb-6">Agenda una cita y recibe atención profesional personalizada</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
            >
              Agendar por WhatsApp
            </a>
            <Link
              to="/produccion"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-mv-darkblue transition-all"
            >
              Ver Producción y Ganadería
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
