import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Reveal from './components/Reveal';
import HowItWorks from './components/HowItWorks';
import StatsBar from './components/StatsBar';
import QuickScheduler from './components/QuickScheduler';
import CareFocusSection from './components/CareFocusSection';
import ProShowcase from './components/ProShowcase';
import { organizationSchema, websiteSchema } from './schemas';
import perroImg from './assets/perro.webp';
import { WHATSAPP_CITA_URL, PHONE_TEL_URL, PHONE_DISPLAY, GBP_REVIEW_URL } from './config';

const Icon = {
  home: (
    <svg className="w-7 h-7 text-mv-darkblue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.5a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V15a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V9.75M8.25 21h8.25" />
    </svg>
  ),
  flask: (
    <svg className="w-7 h-7 text-mv-darkblue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  scissors: (
    <svg className="w-7 h-7 text-mv-darkblue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 1 1-2.122-5.122 3 3 0 0 1 2.122 5.122ZM7.848 8.25a3 3 0 1 0 2.122 5.122 3 3 0 0 0-2.122-5.122Zm0 0L18 15.75M16.152 8.25l-1.536.887m1.536-.887a3 3 0 1 0 2.122-5.122 3 3 0 0 0-2.122 5.122Zm0 0L6 15.75" />
    </svg>
  ),
  plane: (
    <svg className="w-7 h-7 text-mv-darkblue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  ),
};

interface Service {
  num: string;
  icon: ReactNode;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    num: '01',
    icon: Icon.home,
    title: 'Consulta y Vacunación',
    desc: 'Atención médica integral y esquemas de vacunación en la tranquilidad de tu hogar.',
  },
  {
    num: '02',
    icon: Icon.flask,
    title: 'Exámenes de Laboratorio',
    desc: 'Toma de muestras a domicilio y análisis clínicos completos con entrega ágil.',
  },
  {
    num: '03',
    icon: Icon.scissors,
    title: 'Cirugías',
    desc: 'Procedimientos quirúrgicos con protocolos anestésicos seguros y seguimiento posoperatorio.',
  },
  {
    num: '04',
    icon: Icon.plane,
    title: 'Certificados de Viaje',
    desc: 'Documentación sanitaria oficial y certificados para viajes nacionales e internacionales.',
  },
];

const heroBenefits: { icon: ReactNode; text: string }[] = [
  {
    icon: (
      <svg className="w-4 h-4 text-mv-blue shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.5a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V15a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V9.75" />
      </svg>
    ),
    text: 'Atención en casa para reducir el estrés del traslado',
  },
  {
    icon: (
      <svg className="w-4 h-4 text-mv-blue shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    text: 'Equipo de médicos veterinarios titulados',
  },
  {
    icon: (
      <svg className="w-4 h-4 text-mv-blue shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    text: 'Agenda directa por WhatsApp en menos de 5 minutos',
  },
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

      {/* ===== HERO EDITORIAL ===== */}
      <section className="bg-gradient-to-b from-white to-slate-50 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-4">
                <span className="text-mv-blue">Atención a domicilio</span>
                <span aria-hidden="true">·</span>
                <span>Sincelejo</span>
                <span aria-hidden="true">·</span>
                <span>Montería</span>
                <span aria-hidden="true">·</span>
                <span>Costa Caribe</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-mv-darkblue leading-[1.12] mb-5 text-balance">
                Cuidado médico y <span className="text-mv-blue">bienestar</span> para tu mascota
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mb-7 leading-relaxed max-w-xl">
                El médico veterinario llega hasta tu casa: consulta, vacunación y procedimientos sin el estrés del traslado. Y si tienes finca, asesoramos tu producción animal en toda la Costa Caribe.
              </p>

              {/* Beneficios limpios sin emojis */}
              <ul className="space-y-3 mb-8">
                {heroBenefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200/70 flex items-center justify-center shrink-0">
                      {b.icon}
                    </span>
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA principal único + contacto telefónico sutil */}
              <div className="flex flex-wrap items-center gap-5">
                <a
                  href={WHATSAPP_CITA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-mv-orange text-white text-sm font-semibold rounded-xl shadow-md shadow-mv-orange/25 hover:bg-mv-orange/90 transition-all duration-150 whitespace-nowrap shrink-0"
                >
                  Agendar por WhatsApp
                </a>
                <a
                  href={PHONE_TEL_URL}
                  className="inline-flex items-center gap-2 text-sm font-medium text-mv-darkblue hover:text-mv-blue transition-colors whitespace-nowrap shrink-0 tabular-nums"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <span>Llamar {PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg aspect-[4/5] max-h-[480px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-lg">
                <img
                  src={perroImg}
                  alt="Perro de pelaje blanco y negro con correa verde, sentado sobre rocas frente al mar"
                  width="600"
                  height="800"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Pre-agendador interactivo rápido */}
          <div className="mt-12 lg:mt-14">
            <QuickScheduler />
          </div>
        </div>
      </section>

      {/* ===== CIFRAS (confianza, datos reales) ===== */}
      <StatsBar />

      {/* ===== SERVICIOS ===== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-medium text-mv-blue tracking-wide mb-2">
                Atención clínica donde nos necesites
              </p>
              <h2 className="text-3xl lg:text-4xl font-display font-semibold tracking-tight text-mv-darkblue">
                Servicios a Domicilio
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-sm">
              Protocolos clínicos seguros y seguimiento personalizado en la comodidad de tu hogar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.num} delay={i * 70}>
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-mv-blue/40 hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center">
                      {s.icon}
                    </span>
                    <span className="text-xs font-semibold tabular-nums text-slate-400">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-mv-darkblue mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
      <HowItWorks />

      {/* ===== MASCOTAS / PRODUCCIÓN (selector interactivo por perfil) ===== */}
      <CareFocusSection />

      {/* ===== MISTERVET PRO (showcase interactivo por módulo) ===== */}
      <ProShowcase />

      {/* ===== CTA FINAL + RESEÑA ===== */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-semibold tracking-tight text-mv-darkblue mb-3 text-balance">
            ¿Tu mascota necesita atención hoy?
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Escríbenos por WhatsApp y coordina tu visita a domicilio con nuestro equipo de médicos veterinarios titulados.
          </p>
          <div className="flex flex-wrap gap-5 justify-center items-center">
            <a
              href={WHATSAPP_CITA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-mv-orange text-white text-sm font-semibold rounded-xl shadow-md shadow-mv-orange/25 hover:bg-mv-orange/90 transition-all duration-150 whitespace-nowrap shrink-0"
            >
              Agendar por WhatsApp
            </a>
            <a
              href={GBP_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-mv-darkblue hover:text-mv-blue transition-colors whitespace-nowrap shrink-0"
            >
              <svg className="w-4 h-4 text-mv-amber" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
              </svg>
              <span>Dejar una reseña en Google</span>
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Tu reseña ayuda a otras familias en Sincelejo y Montería a encontrarnos.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
