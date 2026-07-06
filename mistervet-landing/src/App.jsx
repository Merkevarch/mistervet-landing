import { useState } from 'react';
import logoDibujo from './assets/logo-dibujo.png';
import perroImg from './assets/perro.png';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const APP_URL = 'https://app.mistervet.co';
const SETUP_URL = 'https://app.mistervet.co/setup';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';

// Iconos SVG correctos (Heroicons)
const Icon = {
  home: (
    <svg className="w-10 h-10 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.5a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V15a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V9.75M8.25 21h8.25" />
    </svg>
  ),
  flask: (
    <svg className="w-10 h-10 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  scissors: (
    <svg className="w-10 h-10 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 1 1-2.122-5.122 3 3 0 0 1 2.122 5.122ZM7.848 8.25a3 3 0 1 0 2.122 5.122 3 3 0 0 0-2.122-5.122Zm0 0L18 15.75M16.152 8.25l-1.536.887m1.536-.887a3 3 0 1 0 2.122-5.122 3 3 0 0 0-2.122 5.122Zm0 0L6 15.75" />
    </svg>
  ),
  plane: (
    <svg className="w-10 h-10 text-mv-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  ),
  menu: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
};

const services = [
  { icon: Icon.home, title: 'Consulta y Vacunación', desc: 'Atención médica integral y planes de vacunación para todas las especies.' },
  { icon: Icon.flask, title: 'Exámenes de Laboratorio', desc: 'Análisis clínicos completos con resultados rápidos y confiables.' },
  { icon: Icon.scissors, title: 'Cirugías', desc: 'Procedimientos quirúrgicos con tecnología de punta y protocolos seguros.' },
  { icon: Icon.plane, title: 'Certificados de Viaje', desc: 'Documentación sanitaria y certificados para viajes nacionales e internacionales.' },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 logo-container">
              <img src={logoDibujo} alt="MisterVet" className="h-10 w-auto" />
              <span className="text-2xl text-mv-darkblue font-brand">MisterVet</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#mascotas" className="text-sm text-slate-600 hover:text-mv-darkblue transition-colors">Mascotas</a>
              <a href="#produccion" className="text-sm text-slate-600 hover:text-mv-darkblue transition-colors">Producción y Ganadería</a>
              <a href="#software" className="text-sm text-slate-600 hover:text-mv-darkblue transition-colors">MisterVet Pro</a>
              <a
                href={APP_URL}
                className="px-4 py-2 text-sm font-medium text-mv-darkblue border border-mv-darkblue rounded-lg hover:bg-mv-darkblue hover:text-white transition-colors"
              >
                Acceder al Sistema
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              {mobileMenuOpen ? Icon.close : Icon.menu}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
              <a href="#mascotas" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600 hover:text-mv-darkblue">Mascotas</a>
              <a href="#produccion" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600 hover:text-mv-darkblue">Producción y Ganadería</a>
              <a href="#software" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600 hover:text-mv-darkblue">MisterVet Pro</a>
              <a href={APP_URL} className="block px-4 py-2 text-sm font-medium text-center text-white bg-mv-darkblue rounded-lg">Acceder al Sistema</a>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-mv-blue/10 rounded-full mb-5">
                <span className="w-2 h-2 bg-mv-blue rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-mv-blue">Software SaaS para clínicas veterinarias</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-display text-mv-darkblue leading-tight mb-5">
                Gestiona tu clínica veterinaria con <span className="text-mv-blue">tecnología inteligente</span>
              </h1>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                MisterVet Pro es el software todo-en-uno que simplifica la administración de tu clínica. Pacientes, consultas, cirugías, laboratorio, facturación e inventario — todo desde un solo lugar.
              </p>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Diseñado por veterinarios para veterinarios. Sin instalaciones, sin contratos, accesible desde cualquier dispositivo.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={SETUP_URL}
                  className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
                >
                  Crear cuenta gratis
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-mv-darkblue text-mv-darkblue font-semibold rounded-xl hover:bg-mv-darkblue hover:text-white transition-all"
                >
                  Hablar por WhatsApp
                </a>
              </div>

              {/* Badges de confianza */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  Plan gratis para siempre
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  Sin tarjeta de crédito
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  Soporte en español
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <img src={perroImg} alt="Mascota" className="max-h-[400px] lg:max-h-[500px] object-contain object-bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Servicios a Domicilio</h2>
            <p className="text-slate-500">Atención profesional donde nos necesites</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{s.icon}</div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MASCOTAS / PRODUCCIÓN ===== */}
      <section className="bg-white py-16 lg:py-24 pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div id="mascotas">
              <span className="text-sm font-bold text-mv-orange uppercase tracking-wide">Servicios Clínicos</span>
              <h2 className="text-3xl font-display text-mv-darkblue mt-2 mb-4">Cuidado para Mascotas</h2>
              <p className="text-slate-600 leading-relaxed">
                Ofrecemos atención médica completa para perros, gatos y otras mascotas. Desde consultas de rutina y vacunación hasta cirugías y hospitalización. Nuestro equipo está comprometido con el bienestar de tu compañero.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Consulta general y especializada</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Vacunación y desparasitación</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Cirugías y hospitalización</li>
                <li className="flex items-center gap-2"><span className="text-mv-orange">●</span> Laboratorio y exámenes diagnósticos</li>
              </ul>
            </div>
            <div id="produccion" className="md:border-l md:pl-16">
              <span className="text-sm font-bold text-mv-amber uppercase tracking-wide">Consultoría de Campo</span>
              <h2 className="text-3xl font-display text-mv-darkblue mt-2 mb-4">Producción y Ganadería</h2>
              <p className="text-slate-600 leading-relaxed">
                Asesoría técnica y manejo sanitario para fincas y sistemas de producción pecuaria. Optimizamos la productividad y el bienestar animal con protocolos basados en evidencia.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><span className="text-mv-amber">●</span> Manejo sanitario en bovinos y porcinos</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">●</span> Planes de vacunación y desparasitación</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">●</span> Consultoría reproductiva</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">●</span> Visitas técnicas programadas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISTERVET PRO (SaaS) ===== */}
      <section id="software" className="bg-mv-darkblue text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-mv-amber mb-4">
                SaaS Multi-tenant para Colegas
              </span>
              <h2 className="text-3xl lg:text-4xl font-display mb-4">Impulsado por MisterVet Pro</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                El software de gestión veterinaria más completo de Colombia. Administra pacientes, consultas, cirugías, hospitalización, laboratorio, POS, inventario y más — todo en un solo lugar.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><span className="text-mv-amber">✓</span> Gestión completa de pacientes y propietarios</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">✓</span> Punto de venta (POS) con facturación</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">✓</span> Historia clínica digital y recetas</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">✓</span> Planes desde gratis hasta $90.000/mes</li>
              </ul>
              <a
                href={SETUP_URL}
                className="inline-block px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
              >
                Registrar mi Veterinaria
              </a>
            </div>
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🐾</div>
                <p className="text-slate-400 text-sm">Captura de pantalla del software</p>
                <p className="text-slate-500 text-xs mt-1">(Próximamente)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
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
                <li><a href={APP_URL} className="hover:text-white transition-colors">Acceder al Sistema</a></li>
                <li><a href={SETUP_URL} className="hover:text-white transition-colors">Registrar mi Veterinaria</a></li>
                <li><a href="#mascotas" className="hover:text-white transition-colors">Servicios para Mascotas</a></li>
                <li><a href="#software" className="hover:text-white transition-colors">MisterVet Pro</a></li>
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
                <li className="text-slate-500">Sincelejo - Montería, Colombia</li>
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
    </div>
  );
}
