import { Link } from 'react-router-dom';
import logoDibujo from '../assets/logo-dibujo.webp';
import {
  WHATSAPP_CITA_URL,
  PHONE_TEL_URL,
  APP_URL,
  SETUP_URL,
  CONTACT_EMAIL,
  PHONE_DISPLAY,
  GBP_REVIEW_URL,
  SITE_NAME,
} from '../config';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* NAP */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoDibujo} alt="MisterVet" className="h-8 w-auto" />
              <span className="text-xl text-white font-brand">MisterVet</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Medicina veterinaria integral y tecnología para clínicas veterinarias en Colombia.
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-mv-amber">📞</span>
                <a href={PHONE_TEL_URL} className="hover:text-white transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mv-amber">💬</span>
                <a href={WHATSAPP_CITA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp directo
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-mv-amber">✉️</span>
                <a href={CONTACT_EMAIL} className="hover:text-white transition-colors">
                  contacto@mistervet.co
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mv-amber mt-0.5">📍</span>
                <span className="text-slate-500 text-sm leading-relaxed">
                  🐾 <strong className="text-slate-400">Mascotas:</strong> Sincelejo y Montería con alrededores<br/>
                  🐂 <strong className="text-slate-400">Ganadería:</strong> Costa Caribe, Colombia
                </span>
              </li>
            </ul>
            {/* CTA Reseña Google */}
            <a
              href={GBP_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-colors"
            >
              <span className="text-mv-amber">⭐</span>
              <span>Deja tu reseña en Google</span>
            </a>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mascotas" className="hover:text-white transition-colors">Servicios para Mascotas</Link></li>
              <li><Link to="/produccion" className="hover:text-white transition-colors">Producción y Ganadería</Link></li>
              <li><Link to="/software" className="hover:text-white transition-colors">MisterVet Pro (Software)</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog Veterinario</Link></li>
              <li><a href={APP_URL} className="hover:text-white transition-colors">Acceder al Sistema</a></li>
              <li><a href={SETUP_URL} className="hover:text-white transition-colors">Registrar mi Veterinaria</a></li>
            </ul>
          </div>

          {/* Cobertura */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Cobertura</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cobertura" className="hover:text-white transition-colors">Ver cobertura completa</Link></li>
              <li><span className="text-slate-500 text-xs uppercase tracking-wide">🐾 Mascotas:</span></li>
              <li><Link to="/veterinaria-en-sincelejo-y-monteria" className="hover:text-white transition-colors">Veterinaria en Sincelejo y Montería</Link></li>
              <li><span className="text-slate-500 text-xs uppercase tracking-wide mt-2 inline-block">🐂 Ganadería:</span></li>
              <li><Link to="/ganaderia-en-costa-caribe" className="hover:text-white transition-colors">Ganadería en Costa Caribe</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-xs">
            <a href={APP_URL + '/terminos'} className="hover:text-white transition-colors">Términos de Servicio</a>
            <a href={APP_URL + '/privacidad'} className="hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
