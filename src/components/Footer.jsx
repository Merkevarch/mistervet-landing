import { Link } from 'react-router-dom';
import logoDibujo from '../assets/logo-dibujo.png';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const APP_URL = 'https://app.mistervet.co';
const SETUP_URL = 'https://app.mistervet.co/setup';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Contacto */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoDibujo} alt="MisterVet" className="h-8 w-auto" />
              <span className="text-xl text-white font-brand">MisterVet</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Medicina veterinaria integral y tecnología para clínicas veterinarias en Colombia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mascotas" className="hover:text-white transition-colors">Servicios para Mascotas</Link></li>
              <li><Link to="/produccion" className="hover:text-white transition-colors">Producción y Ganadería</Link></li>
              <li><Link to="/software" className="hover:text-white transition-colors">MisterVet Pro</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><a href={APP_URL} className="hover:text-white transition-colors">Acceder al Sistema</a></li>
              <li><a href={SETUP_URL} className="hover:text-white transition-colors">Registrar mi Veterinaria</a></li>
            </ul>
          </div>

          {/* Contacto directo */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: +57 301 765 3440
                </a>
              </li>
              <li>
                <a href={CONTACT_EMAIL} className="hover:text-white transition-colors">
                  contacto@mistervet.co
                </a>
              </li>
              <li className="text-slate-500">Colombia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} MisterVet. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-xs">
            <a href={APP_URL + '/terminos'} className="hover:text-white transition-colors">Términos de Servicio</a>
            <a href={APP_URL + '/privacidad'} className="hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
