import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { organizationSchema, buildBreadcrumbSchema } from '../schemas';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';
const GBP_REVIEW_URL = 'https://g.page/r/CdNFFd3TuBNREBM/review';

const livestockDepartments = [
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
        title="Cobertura | Veterinaria en Sincelejo y Montería · Ganadería en Costa Caribe"
        description="Cobertura de MisterVet: atención veterinaria a domicilio para mascotas en Sincelejo y Montería con alrededores, y consultoría pecuaria para fincas en los 7 departamentos de la Costa Caribe colombiana."
        path="/cobertura"
        type="website"
        keywords={['cobertura veterinaria', 'veterinaria Sincelejo', 'veterinaria Montería', 'ganadería Costa Caribe', 'consultoría pecuaria Caribe', 'veterinaria Colombia']}
        jsonLd={[organizationSchema, breadcrumb]}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-mv-blue/10 text-mv-blue rounded-full text-xs font-bold uppercase tracking-wide mb-4">
            Cobertura
          </span>
          <h1 className="text-4xl lg:text-5xl font-display text-mv-darkblue leading-tight mb-5">
            Dónde <span className="text-mv-blue">atendemos</span>
          </h1>
          <p className="text-base text-slate-600 mb-4 leading-relaxed">
            En MisterVet tenemos dos líneas de servicio con coberturas diferentes. La atención veterinaria para mascotas se ofrece a domicilio en Sincelejo y Montería con sus alrededores, mientras que la consultoría pecuaria para fincas cubre toda la región Caribe colombiana. Conoce el detalle de cada una y verifica si llegamos a tu ubicación.
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

      {/* ===== MASCOTAS — cobertura limitada ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-mv-orange/10 text-mv-orange rounded-full text-xs font-bold uppercase tracking-wide mb-3">
              🐾 Mascotas
            </span>
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Veterinaria a domicilio</h2>
            <p className="text-slate-500">Cobertura en Sincelejo y Montería con sus alrededores</p>
          </div>

          <Link
            to="/veterinaria-en-sincelejo-y-monteria"
            className="block bg-slate-50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-8"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-mv-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-mv-orange font-bold text-sm">📍</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Sincelejo y Montería con alrededores</h3>
                <p className="text-xs text-slate-500 mt-1">Alrededores cubiertos:</p>
                <p className="text-xs text-slate-600 mt-0.5">Sucre: Corozal, Sampués, San Marcos, San Juan de Betulia, San Pedro</p>
                <p className="text-xs text-slate-600 mt-0.5">Córdoba: Cereté, San Pelayo, Lorica, Ciénaga de Oro, Planeta Rica</p>
              </div>
            </div>
            <span className="text-sm font-medium text-mv-orange">
              Ver servicio veterinario en Sincelejo y Montería →
            </span>
          </Link>

          <div className="bg-mv-orange/5 border border-mv-orange/20 rounded-2xl p-5 text-center">
            <p className="text-sm text-slate-600 leading-relaxed">
              ¿Estás en otro municipio de Sucre o Córdoba? Escríbenos por WhatsApp: en algunos casos podemos coordinar visitas puntuales o referirte a un colega de confianza en tu zona.
            </p>
          </div>
        </div>
      </section>

      {/* ===== GANADERÍA — cobertura regional ===== */}
      <section className="bg-slate-50 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-mv-amber/10 text-mv-amber rounded-full text-xs font-bold uppercase tracking-wide mb-3">
              🐂 Ganadería y Producción
            </span>
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Consultoría pecuaria regional</h2>
            <p className="text-slate-500">Cobertura en los 7 departamentos de la Costa Caribe colombiana</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {livestockDepartments.map((d, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-mv-amber/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-mv-amber font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{d.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{d.cities}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/ganaderia-en-costa-caribe"
              className="inline-block px-6 py-3 border-2 border-mv-amber text-mv-amber font-semibold rounded-xl hover:bg-mv-amber hover:text-white transition-all"
            >
              Ver detalle de cobertura pecuaria →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-mv-darkblue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-display mb-3">¿Quieres confirmar si llegamos a tu ubicación?</h2>
          <p className="text-slate-300 mb-6">Escríbenos por WhatsApp con tu municipio y el servicio que necesitas</p>
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
            Tu opinión ayuda a otras familias y productores de la región a encontrar atención veterinaria confiable. Si MisterVet ya atendió a tu mascota o visitó tu finca, déjanos una reseña en Google — toma solo 2 minutos y nos ayudas muchísimo a crecer.
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
