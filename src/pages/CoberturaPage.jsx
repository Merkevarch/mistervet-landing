import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO, { organizationSchema, buildBreadcrumbSchema } from '../components/SEO';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';
const GBP_REVIEW_URL = 'https://g.page/r/CdNFFd3TuBNREBM/review';

const coverageCards = [
  {
    type: 'Veterinaria a Domicilio',
    title: 'Veterinaria en la Costa Caribe',
    desc: 'Atención veterinaria profesional a domicilio para mascotas en toda la región Caribe colombiana. Cobertura en Sincelejo, Montería, Cartagena, Barranquilla, Santa Marta, Valledupar y Riohacha, con planes de vacunación adaptados a la epidemiología tropical de la región.',
    icon: '🐾',
    link: '/veterinaria-en-costa-caribe',
    accent: 'mv-orange',
    bg: 'bg-mv-orange/10',
    cta: 'Ver servicios veterinarios',
  },
  {
    type: 'Consultoría Pecuaria',
    title: 'Ganadería en la Costa Caribe',
    desc: 'Asesoría técnica veterinaria para fincas y hatos bovinos, porcinos y de otras especies pecuarias en los siete departamentos de la región Caribe. Manejo sanitario, vacunación ICA, consultoría reproductiva y análisis de registros productivos adaptados a la realidad tropical del Caribe colombiano.',
    icon: '🐂',
    link: '/ganaderia-en-costa-caribe',
    accent: 'mv-amber',
    bg: 'bg-mv-amber/10',
    cta: 'Ver servicios pecuarios',
  },
];

const departments = [
  { name: 'Sucre', cities: 'Sincelejo, Corozal, San Marcos, Sampués' },
  { name: 'Córdoba', cities: 'Montería, Cereté, Lorica, Montelíbano, Sahagún' },
  { name: 'Bolívar', cities: 'Cartagena, Magangué, Carmen de Bolívar' },
  { name: 'Magdalena', cities: 'Santa Marta, Ciénaga, Fundación' },
  { name: 'Cesar', cities: 'Valledupar, Agustín Codazzi, Bosconia' },
  { name: 'Atlántico', cities: 'Barranquilla, Soledad, Sabanalarga' },
  { name: 'La Guajira', cities: 'Riohacha, Maicao, Fonseca' },
];

export default function CoberturaPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Inicio', path: '/' },
    { name: 'Cobertura', path: '/cobertura' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title="Cobertura | Servicio Veterinario en la Costa Caribe Colombiana"
        description="Cobertura de MisterVet en la Costa Caribe colombiana: veterinaria a domicilio para mascotas y consultoría pecuaria para fincas en Sucre, Córdoba, Bolívar, Magdalena, Cesar, Atlántico y La Guajira."
        path="/cobertura"
        type="website"
        keywords={['cobertura veterinaria', 'veterinaria Costa Caribe', 'ganadería Costa Caribe', 'veterinaria Colombia', 'consultoría pecuaria Caribe']}
        jsonLd={[organizationSchema, breadcrumb]}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-mv-blue/10 text-mv-blue rounded-full text-xs font-bold uppercase tracking-wide mb-4">
            Cobertura Regional
          </span>
          <h1 className="text-4xl lg:text-5xl font-display text-mv-darkblue leading-tight mb-5">
            Servicios veterinarios en la <span className="text-mv-blue">Costa Caribe</span> colombiana
          </h1>
          <p className="text-base text-slate-600 mb-4 leading-relaxed">
            MisterVet ofrece atención veterinaria a domicilio para mascotas y consultoría pecuaria para fincas en los siete departamentos de la región Caribe colombiana. Nuestro enfoque combina rigor clínico con conocimiento profundo de la epidemiología tropical del Caribe, adaptando los planes preventivos a las enfermedades más prevalentes en cada zona.
          </p>
          <p className="text-base text-slate-600 mb-6 leading-relaxed">
            Desde Sincelejo y Montería hasta Cartagena, Barranquilla, Santa Marta, Valledupar y Riohacha, nuestro médico veterinario titulado se desplaza con todo el equipo necesario para brindar atención profesional donde nos necesites.
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
            <a
              href={CONTACT_EMAIL}
              className="px-6 py-3 border-2 border-mv-darkblue text-mv-darkblue font-semibold rounded-xl hover:bg-mv-darkblue hover:text-white transition-all"
            >
              Contactar por Correo
            </a>
          </div>
        </div>
      </section>

      {/* ===== SERVICIOS COBERTURA ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Nuestros servicios en la región</h2>
            <p className="text-slate-500">Elige el servicio que necesitas y conoce los detalles de cobertura</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {coverageCards.map((card, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                  {card.icon}
                </div>
                <span className={`text-xs font-bold ${card.accent === 'mv-orange' ? 'text-mv-orange' : 'text-mv-amber'} uppercase tracking-wide mb-2`}>
                  {card.type}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{card.desc}</p>
                <Link
                  to={card.link}
                  className={`inline-block text-sm font-medium ${card.accent === 'mv-orange' ? 'text-mv-orange' : 'text-mv-amber'} hover:underline`}
                >
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEPARTAMENTOS ===== */}
      <section className="bg-slate-50 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Departamentos cubiertos</h2>
            <p className="text-slate-500">Atendemos en los siete departamentos de la región Caribe colombiana</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((d, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-mv-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-mv-blue font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{d.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{d.cities}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            ¿No ves tu municipio en la lista? Escríbenos por WhatsApp, es posible que podamos atenderte o coordinar una visita técnica.
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-mv-darkblue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-display mb-3">¿Estás en la Costa Caribe y necesitas un veterinario?</h2>
          <p className="text-slate-300 mb-6">Contáctanos y coordinamos la visita a tu ubicación</p>
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
              to="/mascotas"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-mv-darkblue transition-all"
            >
              Conocer todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ===== RESEÑAS GOOGLE ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1 text-3xl">
              <span className="text-mv-amber">★</span>
              <span className="text-mv-amber">★</span>
              <span className="text-mv-amber">★</span>
              <span className="text-mv-amber">★</span>
              <span className="text-mv-amber">★</span>
            </div>
          </div>
          <h2 className="text-2xl lg:text-3xl font-display text-mv-darkblue mb-3">¿Ya nos conoces?</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Tu opinión ayuda a otras familias de la Costa Caribe a encontrar atención veterinaria confiable. Si MisterVet ya atendió a tu mascota o visitó tu finca, déjanos una reseña en Google — nos toma 2 minutos escribirla y a nosotros nos ayudas muchísimo a crecer.
          </p>
          <a
            href={GBP_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-mv-darkblue text-white font-semibold rounded-xl shadow-lg shadow-mv-darkblue/30 hover:bg-mv-darkblue/90 transition-all hover:scale-105"
          >
            <span className="text-mv-amber text-xl">★</span>
            <span>Dejar reseña en Google</span>
            <span className="text-sm opacity-75">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
