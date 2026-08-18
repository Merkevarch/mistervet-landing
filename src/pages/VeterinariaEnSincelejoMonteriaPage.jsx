import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../schemas';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';
const PHONE_DISPLAY = '+57 301 765 3440';
const GBP_REVIEW_URL = 'https://g.page/r/CdNFFd3TuBNREBM/review';

const services = [
  {
    title: 'Consulta y Vacunación',
    desc: 'Atención veterinaria a domicilio en Sincelejo y Montería con sus alrededores. Planes de vacunación adaptados al perfil de cada mascota: edad, especie, estilo de vida y riesgo epidemiológico regional. Incluye anamnesis, examen físico completo y orientación al propietario.',
  },
  {
    title: 'Exámenes de Laboratorio',
    desc: 'Diagnóstico de enfermedades prevalentes en Sucre y Córdoba: leptospirosis (favorecida por el clima tropical y la presencia de roedores), ehrlichiosis y anaplasmosis transmitidas por garrapatas, babesiosis y parasitosis gastrointestinales. Resultados con interpretación veterinaria e integración con la historia clínica del paciente.',
  },
  {
    title: 'Cirugías y Hospitalización',
    desc: 'Procedimientos quirúrgicos generales y especializados con protocolos de bioseguridad, monitoreo anestésico y recuperación postoperatoria. Coordinación logística para pacientes de Sincelejo, Montería y alrededores, con traslado a la sede cuando se requiere infraestructura quirúrgica.',
  },
  {
    title: 'Certificados de Viaje',
    desc: 'Documentación sanitaria y certificados veterinarios para viajes desde Sincelejo o Montería hacia otras ciudades de Colombia. Cumplimiento de requisitos del ICA, aerolíneas y terminales terrestres. Orientación sobre tiempos mínimos de vacunación y trámites.',
  },
  {
    title: 'Urgencias a Domicilio',
    desc: 'Atención de urgencias veterinarias en Sincelejo, Montería y sus zonas metropolitanas: picaduras de animales ponzoñosos, intoxicaciones, traumatismos, cuadros gastrointestinales agudos. Coordinación previa por WhatsApp para confirmar disponibilidad y dar indicaciones de primeros auxilios.',
  },
  {
    title: 'Desparasitación Tropical',
    desc: 'Planes de desparasitación adaptados al clima tropical de Sucre y Córdoba, donde la alta prevalencia de parásitos internos y externos requiere esquemas estratégicos y rotación de principios activos para evitar resistencia.',
  },
];

const areas = [
  'Sincelejo (Sucre)',
  'Montería (Córdoba)',
  'Corozal',
  'Sampués',
  'San Marcos',
  'San Juan de Betulia',
  'San Pedro',
  'Cereté',
  'San Pelayo',
  'Lorica',
  'Ciénaga de Oro',
  'Planeta Rica',
];

const faqs = [
  {
    q: '¿En qué ciudades atienden mascotas?',
    a: 'Actualmente ofrecemos servicio veterinario a domicilio para mascotas en Sincelejo (Sucre) y Montería (Córdoba), junto con sus municipios cercanos. En Sucre cubrimos Corozal, Sampués, San Marcos, San Juan de Betulia y San Pedro. En Córdoba cubrimos Cereté, San Pelayo, Lorica, Ciénaga de Oro y Planeta Rica. Para ubicaciones fuera de esta zona te recomendamos escribirnos por WhatsApp para confirmar disponibilidad o referirte a un colega de confianza.',
  },
  {
    q: '¿El servicio es siempre a domicilio?',
    a: 'Sí, nuestro modelo de servicio en Sincelejo y Montería es predominantemente a domicilio. El médico veterinario se desplaza a tu ubicación con todo el equipo necesario para consultas, vacunación, exámenes básicos y procedimientos. Para cirugías y hospitalización coordinamos el traslado del paciente a la sede correspondiente.',
  },
  {
    q: '¿Consideran las enfermedades típicas de la región?',
    a: 'Sí, nuestro enfoque clínico está adaptado a la epidemiología de Sucre y Córdoba: leptospirosis (favorecida por el clima tropical y la presencia de roedores, especialmente en zonas del valle del Sinú), ehrlichiosis y anaplasmosis transmitidas por garrapatas, babesiosis, parasitosis gastrointestinales, y enfermedades transmitidas por vectores prevalentes en la región. Esto nos permite diagnósticos más precisos y planes preventivos adaptados.',
  },
  {
    q: '¿Cómo agendo una cita veterinaria en Sincelejo o Montería?',
    a: 'El canal principal es WhatsApp (' + PHONE_DISPLAY + '). Escríbenos con tu ubicación (ciudad y barrio o municipio), la especie y edad de tu mascota, y el motivo de consulta. Te confirmaremos disponibilidad, cotización y agendamos la visita. Para urgencias fuera de horario también atendemos con recargo.',
  },
  {
    q: '¿Atienden otras especies además de perros y gatos?',
    a: 'Sí, además de perros y gatos atendemos conejos, aves, reptiles y otras mascotas de compañía no convencionales en Sincelejo, Montería y alrededores. Para animales de producción mayor (bovinos, equinos, porcinos en finca) contamos con el servicio de consultoría pecuaria, que se agenda aparte y cubre toda la Costa Caribe colombiana.',
  },
  {
    q: '¿Atienden en otras ciudades de la Costa Caribe?',
    a: 'Para mascotas, nuestra cobertura se concentra en Sincelejo y Montería con sus alrededores. No atendemos mascotas en Cartagena, Barranquilla, Santa Marta, Valledupar o Riohacha. Sin embargo, nuestra línea de consultoría pecuaria para fincas y ganadería sí cubre los 7 departamentos de la Costa Caribe colombiana.',
  },
];

export default function VeterinariaEnSincelejoMonteriaPage() {
  // Schema Service con areaServed específico
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Servicio veterinario a domicilio para mascotas en Sincelejo y Montería',
    provider: {
      '@type': 'VeterinaryBusiness',
      name: 'MisterVet',
      telephone: '+573017653440',
      email: 'contacto@mistervet.co',
      url: 'https://www.mistervet.co',
      areaServed: [
        { '@type': 'City', name: 'Sincelejo' },
        { '@type': 'AdministrativeArea', name: 'Sucre' },
        { '@type': 'City', name: 'Montería' },
        { '@type': 'AdministrativeArea', name: 'Córdoba' },
      ],
    },
    areaServed: [
      { '@type': 'City', name: 'Sincelejo' },
      { '@type': 'AdministrativeArea', name: 'Sucre' },
      { '@type': 'City', name: 'Montería' },
      { '@type': 'AdministrativeArea', name: 'Córdoba' },
    ],
    description: 'Servicio veterinario a domicilio para mascotas en Sincelejo (Sucre) y Montería (Córdoba) con sus alrededores: consulta general, vacunación, desparasitación, cirugías, urgencias y diagnósticos de laboratorio.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'COP',
    },
  };

  // Schema FAQPage para rich snippets
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

  // Schema Breadcrumb
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Inicio', path: '/' },
    { name: 'Mascotas', path: '/mascotas' },
    { name: 'Sincelejo y Montería', path: '/veterinaria-en-sincelejo-y-monteria' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title="Veterinaria a Domicilio en Sincelejo y Montería | MisterVet"
        description="Servicio veterinario a domicilio en Sincelejo (Sucre) y Montería (Córdoba) con alrededores. Consultas, vacunación, cirugías, urgencias y desparasitación tropical. Médico veterinario titulado."
        path="/veterinaria-en-sincelejo-y-monteria"
        type="website"
        keywords={['veterinaria Sincelejo', 'veterinaria Montería', 'veterinario a domicilio Sincelejo', 'veterinario a domicilio Montería', 'veterinaria Sucre', 'veterinaria Córdoba', 'consulta veterinaria Sincelejo', 'vacunación perros Montería', 'urgencias veterinarias Sincelejo']}
        jsonLd={[serviceSchema, faqSchema, breadcrumb]}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 bg-mv-orange/10 text-mv-orange rounded-full text-xs font-bold uppercase tracking-wide mb-4">
            Veterinaria a Domicilio · Sincelejo y Montería
          </span>
          <h1 className="text-4xl lg:text-5xl font-display text-mv-darkblue leading-tight mb-5">
            Veterinaria a domicilio en <span className="text-mv-orange">Sincelejo</span> y <span className="text-mv-orange">Montería</span>
          </h1>
          <p className="text-base text-slate-600 mb-4 leading-relaxed">
            MisterVet ofrece servicio veterinario a domicilio para mascotas en Sincelejo (Sucre) y Montería (Córdoba), junto con sus municipios cercanos. Nuestro enfoque combina la atención clínica de excelencia con un profundo conocimiento de la epidemiología regional: las enfermedades tropicales prevalentes en Sucre y Córdoba (leptospirosis, ehrlichiosis, anaplasmosis, parasitosis) requieren un abordaje diferente al de regiones templadas, y nuestros planes preventivos están diseñados para esa realidad.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
            >
              Agendar Cita Veterinaria
            </a>
            <a
              href={CONTACT_EMAIL}
              className="px-6 py-3 border-2 border-mv-darkblue text-mv-darkblue font-semibold rounded-xl hover:bg-mv-darkblue hover:text-white transition-all"
            >
              Contactar por Correo
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            📍 Servicio a domicilio en Sincelejo y Montería con alrededores · 📞 {PHONE_DISPLAY}
          </p>
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Servicios veterinarios</h2>
            <p className="text-slate-500">Atención profesional con médico veterinario titulado</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ZONAS DE COBERTURA ===== */}
      <section className="bg-slate-50 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Zonas de cobertura</h2>
            <p className="text-slate-500">Nos desplazamos a tu ubicación en Sincelejo, Montería y alrededores</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-mv-darkblue mb-2">📍 Sincelejo (Sucre)</h3>
              <p className="text-xs text-slate-500 mb-3">Casco urbano y municipios cercanos:</p>
              <ul className="space-y-1.5 text-sm text-slate-700">
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Corozal</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Sampués</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> San Marcos</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> San Juan de Betulia</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> San Pedro</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-mv-darkblue mb-2">📍 Montería (Córdoba)</h3>
              <p className="text-xs text-slate-500 mb-3">Casco urbano y municipios cercanos:</p>
              <ul className="space-y-1.5 text-sm text-slate-700">
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Cereté</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> San Pelayo</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Lorica</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Ciénaga de Oro</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Planeta Rica</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {areas.map((area, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-mv-orange/10 text-mv-orange rounded-full text-sm font-medium"
              >
                📍 {area}
              </span>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            ¿No ves tu municipio? Escríbenos por WhatsApp, en algunos casos podemos coordinar una visita puntual.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Preguntas frecuentes</h2>
            <p className="text-slate-500">Resolvemos las dudas más comunes sobre nuestro servicio</p>
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

      {/* ===== CTA FINAL ===== */}
      <section className="bg-mv-darkblue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-display mb-3">
            ¿Necesitas un veterinario en Sincelejo o Montería?
          </h2>
          <p className="text-slate-300 mb-6">
            Atención profesional a domicilio con médico veterinario titulado. Agenda tu cita hoy mismo.
          </p>
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
              Ver consultoría pecuaria
            </Link>
          </div>
        </div>
      </section>

      {/* ===== RESEÑA GOOGLE ===== */}
      <section className="bg-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-3">
            <div className="flex items-center gap-1 text-2xl">
              <span className="text-mv-amber">★</span>
              <span className="text-mv-amber">★</span>
              <span className="text-mv-amber">★</span>
              <span className="text-mv-amber">★</span>
              <span className="text-mv-amber">★</span>
            </div>
          </div>
          <h2 className="text-xl font-display text-mv-darkblue mb-2">¿Ya atendimos a tu mascota?</h2>
          <p className="text-sm text-slate-600 mb-5">
            Tu reseña en Google ayuda a otras familias de Sincelejo y Montería a encontrar atención veterinaria confiable. Toma solo 2 minutos.
          </p>
          <a
            href={GBP_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-mv-darkblue text-mv-darkblue font-semibold rounded-xl hover:bg-mv-darkblue hover:text-white transition-all"
          >
            <span className="text-mv-amber">★</span>
            Dejar reseña en Google
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
