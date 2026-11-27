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
    <footer className="bg-slate-900 text-slate-400 pt-14 pb-24">
      {/* pb-24: despeja el botón flotante de WhatsApp (móvil) y el de
          "volver arriba" (escritorio) para que no solapen los enlaces legales */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* NAP */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoDibujo} alt="MisterVet" className="h-8 w-auto" />
              <span className="text-xl text-white font-brand">MisterVet</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-sm">
              Medicina veterinaria integral a domicilio, consultoría pecuaria y tecnología para clínicas veterinarias en Colombia.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-mv-amber shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <a href={PHONE_TEL_URL} className="hover:text-white transition-colors tabular-nums">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-mv-amber shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                <a href={WHATSAPP_CITA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp directo
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-mv-amber shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href={CONTACT_EMAIL} className="hover:text-white transition-colors">
                  contacto@mistervet.co
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <svg className="w-4 h-4 text-mv-amber shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="text-slate-400 text-sm leading-relaxed">
                  <strong className="text-slate-300 font-medium">Mascotas:</strong> Sincelejo, Montería y alrededores<br />
                  <strong className="text-slate-300 font-medium">Ganadería:</strong> Costa Caribe, Colombia
                </span>
              </li>
            </ul>
            {/* CTA Reseña Google */}
            <a
              href={GBP_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-mv-amber" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
              </svg>
              <span>Deja tu reseña en Google</span>
            </a>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4">Servicios</h4>
            <ul className="space-y-2.5 text-sm">
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
            <h4 className="text-white font-display font-semibold text-sm mb-4">Cobertura</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/cobertura" className="hover:text-white transition-colors">Ver cobertura completa</Link></li>
              <li className="pt-1">
                <span className="text-slate-500 text-xs font-medium block mb-1">Atención a domicilio</span>
                <Link to="/veterinaria-en-sincelejo-y-monteria" className="hover:text-white transition-colors">Veterinaria en Sincelejo y Montería</Link>
              </li>
              <li className="pt-1">
                <span className="text-slate-500 text-xs font-medium block mb-1">Consultoría de campo</span>
                <Link to="/ganaderia-en-costa-caribe" className="hover:text-white transition-colors">Ganadería en Costa Caribe</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.</p>
          <div className="flex gap-5 text-xs">
            <a href={APP_URL + '/terminos'} className="hover:text-white transition-colors">Términos de Servicio</a>
            <a href={APP_URL + '/privacidad'} className="hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
