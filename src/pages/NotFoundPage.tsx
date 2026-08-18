import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { WHATSAPP_URL } from '../config';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title="Página no encontrada (404)"
        titleTemplate={false}
        description="La página que buscas no existe o ha sido movida."
        path="/404"
        noindex
      />
      <Navbar />

      <section className="bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-7xl lg:text-8xl font-display text-mv-darkblue mb-4 leading-none">
            4<span className="text-mv-orange">0</span>4
          </div>
          <h1 className="text-2xl lg:text-3xl font-display text-mv-darkblue mb-3">
            Página no encontrada
          </h1>
          <p className="text-base text-slate-600 mb-8 leading-relaxed">
            La página que buscas no existe, fue movida o la URL está mal escrita.
            Quizá la información que buscas está en nuestras páginas principales.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Link
              to="/"
              className="px-5 py-2.5 bg-mv-darkblue text-white font-semibold rounded-xl shadow-lg shadow-mv-darkblue/30 hover:bg-mv-darkblue/90 transition-all hover:scale-105"
            >
              Volver al inicio
            </Link>
            <Link
              to="/mascotas"
              className="px-5 py-2.5 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
            >
              Servicios para mascotas
            </Link>
            <Link
              to="/produccion"
              className="px-5 py-2.5 border-2 border-mv-darkblue text-mv-darkblue font-semibold rounded-xl hover:bg-mv-darkblue hover:text-white transition-all"
            >
              Producción y ganadería
            </Link>
          </div>

          <div className="bg-slate-100 rounded-2xl p-5 text-sm text-slate-600">
            <p className="mb-2">¿Necesitas ayuda para encontrar lo que buscas?</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mv-blue hover:underline font-medium"
            >
              Escríbenos por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
