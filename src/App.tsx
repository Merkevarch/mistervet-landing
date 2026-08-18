import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { organizationSchema, websiteSchema } from './schemas';
import perroImg from './assets/perro.jpg';
import mockupSoftware from './assets/mockup-software.webp';
import { WHATSAPP_URL, SETUP_URL, CONTACT_EMAIL } from './config';

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
};

interface Service {
  icon: ReactNode;
  title: string;
  desc: string;
}

const services: Service[] = [
  { icon: Icon.home, title: 'Consulta y Vacunación', desc: 'Atención médica integral y planes de vacunación para todas las especies.' },
  { icon: Icon.flask, title: 'Exámenes de Laboratorio', desc: 'Análisis clínicos completos con resultados rápidos y confiables.' },
  { icon: Icon.scissors, title: 'Cirugías', desc: 'Procedimientos quirúrgicos con tecnología de punta y protocolos seguros.' },
  { icon: Icon.plane, title: 'Certificados de Viaje', desc: 'Documentación sanitaria y certificados para viajes nacionales e internacionales.' },
];

export default function App(): ReactNode {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title="MisterVet | Medicina Veterinaria Integral para Mascotas y Producción Animal"
        titleTemplate={false}
        description="Medicina veterinaria integral en Colombia: atención a mascotas (consulta, vacunación, cirugías, laboratorio) y consultoría pecuaria para fincas y ganadería. Servicio a domicilio con médico veterinario titulado."
        path="/"
        keywords={['veterinaria', 'veterinario', 'medicina veterinaria', 'consulta veterinaria', 'cirugía veterinaria', 'mascotas', 'ganadería', 'producción animal', 'MisterVet', 'Colombia', 'veterinaria a domicilio']}
        jsonLd={[organizationSchema, websiteSchema]}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-display text-mv-darkblue leading-tight mb-5">
                Cuidado y <span className="text-mv-blue">bienestar</span> para tu mascota
              </h1>
              <p className="text-base text-slate-600 mb-4 leading-relaxed">
                En <strong>MisterVet</strong> creemos que la confianza se construye con conocimiento, compromiso y una atención cercana. Ofrecemos medicina veterinaria profesional para mascotas y producción animal, respaldada por un médico veterinario titulado y un enfoque integral orientado a la prevención, el diagnóstico y el tratamiento.
              </p>
              <p className="text-base text-slate-600 mb-4 leading-relaxed">
                Cada paciente recibe una atención personalizada, acompañada de comunicación constante y decisiones clínicas fundamentadas, porque entendemos que detrás de cada animal hay una familia, un proyecto o un patrimonio que merece el mayor cuidado.
              </p>
              <p className="text-base font-medium text-mv-darkblue mb-6 leading-relaxed">
                Con la tranquilidad de saber que tus animales están en manos profesionales.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-2">
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
              <img src={perroImg} alt="Mascota" className="max-h-[400px] lg:max-h-[500px] object-contain object-bottom" loading="eager" fetchPriority="high" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section className="bg-white py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
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

      {/* ===== MASCOTAS / PRODUCCIÓN (resumen en home, con link a páginas dedicadas) ===== */}
      <section className="bg-white py-10 lg:py-16 pt-0">
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
              <Link
                to="/mascotas"
                className="inline-block mt-4 text-sm font-medium text-mv-blue hover:underline"
              >
                Ver todos los servicios para mascotas →
              </Link>
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
              <Link
                to="/produccion"
                className="inline-block mt-4 text-sm font-medium text-mv-amber hover:underline"
              >
                Conoce el servicio de producción →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISTERVET PRO (SaaS) ===== */}
      <section id="software" className="bg-mv-darkblue text-white py-10 lg:py-16">
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
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2"><span className="text-mv-amber">✓</span> Gestión completa de pacientes y propietarios</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">✓</span> Punto de venta (POS) con facturación</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">✓</span> Historia clínica digital y recetas</li>
                <li className="flex items-center gap-2"><span className="text-mv-amber">✓</span> Planes desde gratis hasta $90.000/mes</li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href={SETUP_URL}
                  className="inline-block px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
                >
                  Registrar mi Veterinaria
                </a>
                <Link
                  to="/software"
                  className="inline-block px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-mv-darkblue transition-all"
                >
                  Conocer más
                </Link>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 overflow-hidden">
              <img
                src={mockupSoftware}
                alt="MisterVet Pro - Captura del software"
                className="w-full rounded-lg shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
