import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../schemas';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';
const PHONE_DISPLAY = '+57 301 765 3440';
const GBP_REVIEW_URL = 'https://g.page/r/CdNFFd3TuBNREBM/review';

/**
 * Página de aterrizaje local reutilizable.
 *
 * Props:
 *  - city: nombre de la ciudad (ej: "Sincelejo")
 *  - region: región (ej: "Sucre", "Costa Caribe")
 *  - type: "veterinaria" | "ganaderia"
 *  - title: H1 de la página
 *  - description: meta description
 *  - path: ruta de la página (ej: "/veterinaria-en-sincelejo")
 *  - intro: párrafo introductorio
 *  - services: array de { title, desc }
 *  - areas: barrios/zonas cubiertas en la ciudad
 *  - faqs: array de { q, a }
 *  - keywords: array de palabras clave
 */
export default function CityPage({
  city,
  region,
  type,
  title,
  description,
  path,
  intro,
  services,
  areas,
  faqs,
  keywords,
}) {
  const isVeterinaria = type === 'veterinaria';
  const accentText = isVeterinaria ? 'text-mv-orange' : 'text-mv-amber';
  const badgeBg = isVeterinaria ? 'bg-mv-orange/10' : 'bg-mv-amber/10';
  const ctaLabel = isVeterinaria ? 'Agendar Cita Veterinaria' : 'Solicitar Visita Técnica';

  // Schema LocalBusiness con areaServed
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryBusiness',
    name: 'MisterVet',
    description: `${isVeterinaria ? 'Servicio veterinario a domicilio' : 'Consultoría veterinaria pecuaria'} en ${city}, ${region}.`,
    url: `https://www.mistervet.co${path}`,
    telephone: '+573017653440',
    email: 'contacto@mistervet.co',
    areaServed: [
      { '@type': 'City', name: city },
      { '@type': 'AdministrativeArea', name: region },
    ],
    address: {
      '@type': 'PostalAddress',
      addressRegion: region,
      addressCountry: 'CO',
    },
    availableService: services.map((s) => ({
      '@type': 'Service',
      name: s.title,
      description: s.desc,
    })),
  };

  // Schema FAQPage para rich snippets
  const faqSchema = faqs && faqs.length > 0 ? {
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
  } : null;

  // Schema Breadcrumb
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Inicio', path: '/' },
    { name: isVeterinaria ? 'Mascotas' : 'Producción y Ganadería', path: isVeterinaria ? '/mascotas' : '/produccion' },
    { name: city, path },
  ]);

  const jsonLd = [localBusinessSchema, breadcrumb];
  if (faqSchema) jsonLd.push(faqSchema);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title={title}
        description={description}
        path={path}
        type="website"
        keywords={keywords}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className={`inline-block px-3 py-1 ${badgeBg} ${accentText} rounded-full text-xs font-bold uppercase tracking-wide mb-4`}>
            {isVeterinaria ? 'Veterinaria a Domicilio' : 'Consultoría Pecuaria'} · {city}
          </span>
          <h1 className="text-4xl lg:text-5xl font-display text-mv-darkblue leading-tight mb-5">
            {title.split('|')[0].trim()}
          </h1>
          <p className="text-base text-slate-600 mb-4 leading-relaxed">{intro}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
            >
              {ctaLabel}
            </a>
            <a
              href={CONTACT_EMAIL}
              className="px-6 py-3 border-2 border-mv-darkblue text-mv-darkblue font-semibold rounded-xl hover:bg-mv-darkblue hover:text-white transition-all"
            >
              Contactar por Correo
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            📍 Servicio a domicilio en {city} y zonas aledañas · 📞 {PHONE_DISPLAY}
          </p>
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">
              {isVeterinaria ? `Servicios veterinarios en ${city}` : `Servicios pecuarios en ${city}`}
            </h2>
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
      {areas && areas.length > 0 && (
        <section className="bg-slate-50 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display text-mv-darkblue mb-2">Zonas de cobertura en {city}</h2>
              <p className="text-slate-500">Nos desplazamos a tu ubicación dentro del área metropolitana</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {areas.map((area, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 ${badgeBg} ${accentText} rounded-full text-sm font-medium`}
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      {faqs && faqs.length > 0 && (
        <section className="bg-white py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display text-mv-darkblue mb-2">Preguntas frecuentes</h2>
              <p className="text-slate-500">Resolvemos las dudas más comunes sobre nuestro servicio en {city}</p>
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
      )}

      {/* ===== CTA FINAL ===== */}
      <section className="bg-mv-darkblue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-display mb-3">
            ¿Necesitas {isVeterinaria ? 'un veterinario' : 'un consultor pecuario'} en {city}?
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
              to={isVeterinaria ? "/produccion" : "/mascotas"}
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-mv-darkblue transition-all"
            >
              Ver otros servicios
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
          <h2 className="text-xl font-display text-mv-darkblue mb-2">¿Ya {isVeterinaria ? 'atendimos a tu mascota' : 'visitamos tu finca'} en {city}?</h2>
          <p className="text-sm text-slate-600 mb-5">
            Tu reseña en Google ayuda a otras familias y productores de {region} a encontrar atención veterinaria confiable. Toma solo 2 minutos.
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
