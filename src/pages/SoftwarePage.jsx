import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO, { buildBreadcrumbSchema } from '../components/SEO';
import mockupSoftware from '../assets/mockup-software.png';

const APP_URL = 'https://app.mistervet.co';
const SETUP_URL = 'https://app.mistervet.co/setup';
const WHATSAPP_URL = 'https://wa.me/573017653440';

const features = [
  {
    title: 'Gestión de Pacientes y Propietarios',
    desc: 'Ficha digital completa con historial clínico, vacunas, alergias, peso, fotos y datos de contacto del propietario. Búsqueda rápida por nombre, documento o número de chip. Cada paciente queda vinculado a su propietario y al establecimiento veterinario.',
    icon: 'patients',
  },
  {
    title: 'Historia Clínica Digital',
    desc: 'Registro estructurado de consultas con anamnesis, examen físico, diagnósticos CIE veterinarios, tratamiento y notas evolutivas. Plantillas personalizables por tipo de consulta y soporte para imágenes y archivos adjuntos.',
    icon: 'history',
  },
  {
    title: 'Cirugías y Hospitalización',
    desc: 'Programación de cirugías con protocolo anestésico, monitorización y hoja de recuperación. Módulo de hospitalización con control de jaulas, medicamentos administrados, signos vitales y alta del paciente.',
    icon: 'surgery',
  },
  {
    title: 'Laboratorio Clínico',
    desc: 'Registro de exámenes de laboratorio con plantillas por tipo (hemograma, bioquímica, coprología, urianálisis), captura de resultados y comparación con valores de referencia. Integración con la historia clínica del paciente.',
    icon: 'lab',
  },
  {
    title: 'Punto de Venta (POS)',
    desc: 'Facturación integrada con inventario. Productos y servicios en un solo ticket, descuentos por ítem, métodos de pago múltiples, devoluciones y reportes de cierre de caja. Compatible con la regulación colombiana de facturación electrónica.',
    icon: 'pos',
  },
  {
    title: 'Inventario y Proveedores',
    desc: 'Control de stock con alertas de stock mínimo, lotes, fechas de vencimiento y kardex por producto. Gestión de proveedores, órdenes de compra y recepción de mercancía con ajuste automático del inventario.',
    icon: 'inventory',
  },
  {
    title: 'Recetas y Documentos Legales',
    desc: 'Generación de recetas médicas con plantillas personalizables, fórmulas magistrales, certificados de vacunación, certificados de viaje y consentimientos informados. Todo con el membrete de tu veterinaria y descarga en PDF.',
    icon: 'prescription',
  },
  {
    title: 'Citas y Agenda',
    desc: 'Calendario visual por profesional, especie y tipo de cita. Recordatorios automáticos por WhatsApp o correo. Bloqueos de agenda, sobrecupos y reprogramación con arrastrar y soltar.',
    icon: 'calendar',
  },
  {
    title: 'Reportes y Dashboard',
    desc: 'Indicadores en tiempo real: facturación diaria/mensual, pacientes nuevos, servicios más vendidos, productos por agotarse, tasa de retorno y más. Exportación a Excel para análisis externo.',
    icon: 'dashboard',
  },
];

const plans = [
  {
    name: 'Trial',
    price: '$0',
    period: '/ mes',
    desc: 'Para veterinarias que están iniciando y quieren digitalizar su operación sin costo.',
    features: [
      '30 mascotas',
      '2 usuarios',
      'Ventas ilimitadas',
      'Sin expiración',
    ],
    cta: 'Comenzar Gratis',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$50.000',
    period: '/ mes',
    desc: 'Para veterinarias en crecimiento que necesitan usuarios ilimitados y soporte prioritario.',
    features: [
      '200 mascotas',
      'Usuarios ilimitados',
      'Ventas ilimitadas',
      'Soporte prioritario',
    ],
    cta: 'Elegir Plan Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$90.000',
    period: '/ mes',
    desc: 'Para clínicas con altos volúmenes o equipos grandes que requieren atención dedicada.',
    features: [
      'Mascotas ilimitadas',
      'Usuarios ilimitados',
      'Ventas ilimitadas',
      'Soporte 24/7',
    ],
    cta: 'Contactar Ventas',
    highlight: false,
  },
];

const FeatureIcon = ({ name }) => {
  const icons = {
    patients: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    history: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    surgery: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 1 1-2.122-5.122 3 3 0 0 1 2.122 5.122ZM7.848 8.25a3 3 0 1 0 2.122 5.122 3 3 0 0 0-2.122-5.122Zm0 0L18 15.75M16.152 8.25l-1.536.887m1.536-.887a3 3 0 1 0 2.122-5.122 3 3 0 0 0-2.122 5.122Zm0 0L6 15.75" />
      </svg>
    ),
    lab: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M14.25 3.104v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M5 14.5l-1.43 1.43c-1.232 1.232-.65 3.318 1.067 3.611A48.309 48.309 0 0 0 12 21c2.773 0 5.491-.235 8.135-.687 1.718-.293 2.3-2.379 1.067-3.61L19 14.5" />
      </svg>
    ),
    pos: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-2.28-4.322 2.25 2.25 0 0 0-2.013-1.013H5.106l-.383-1.437A1.125 1.125 0 0 0 3.636 3H2.25M7.5 14.25 5.106 5.272M7.5 14.25h11.218M5.106 5.272 4.5 21h15.75L19.5 5.272" />
      </svg>
    ),
    inventory: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5-.625 8.25c-.996.124-1.926.617-2.59 1.378L8.25 14.25m9-7.5c.248.03.495.05.743.062M19.5 7.5l-1.075 5.36a3 3 0 0 1-.864 1.605L13.5 18.75M3 7.5l1.5 9.75A2.25 2.25 0 0 0 6.75 19.5h9a2.25 2.25 0 0 0 2.25-2.25l1.5-9.75M3 7.5l1.5 9.75A2.25 2.25 0 0 0 6.75 19.5h9a2.25 2.25 0 0 0 2.25-2.25l1.5-9.75" />
      </svg>
    ),
    prescription: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
      </svg>
    ),
    calendar: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    dashboard: (
      <svg className="w-7 h-7 text-mv-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function SoftwarePage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MisterVet Pro',
    applicationCategory: 'VeterinaryManagementApplication',
    operatingSystem: 'Web',
    description: 'Software de gestión veterinaria SaaS multi-tenant para clínicas veterinarias en Colombia. Administra pacientes, consultas, cirugías, hospitalización, laboratorio, POS, inventario y reportes en un solo lugar.',
    url: 'https://www.mistervet.co/software',
    offers: [
      {
        '@type': 'Offer',
        name: 'Trial',
        price: '0',
        priceCurrency: 'COP',
        description: 'Plan gratuito: 30 mascotas, 2 usuarios, ventas ilimitadas, sin expiración.',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '50000',
        priceCurrency: 'COP',
        description: '200 mascotas, usuarios ilimitados, ventas ilimitadas, soporte prioritario.',
      },
      {
        '@type': 'Offer',
        name: 'Enterprise',
        price: '90000',
        priceCurrency: 'COP',
        description: 'Mascotas ilimitadas, usuarios ilimitados, ventas ilimitadas, soporte 24/7.',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'MisterVet',
      url: 'https://www.mistervet.co',
    },
  };

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Inicio', path: '/' },
    { name: 'MisterVet Pro', path: '/software' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title="MisterVet Pro | Software de Gestión Veterinaria SaaS"
        description="Software de gestión veterinaria multi-tenant para clínicas en Colombia. Administra pacientes, historia clínica digital, cirugías, hospitalización, laboratorio, POS, inventario, recetas, citas y reportes. Planes Trial $0, Pro $50.000/mes y Enterprise $90.000/mes."
        path="/software"
        type="website"
        keywords={['software veterinaria', 'sistema gestión veterinaria', 'software veterinario Colombia', 'historia clínica digital veterinaria', 'POS veterinario', 'SaaS veterinaria', 'programa para veterinaria', 'software multi-tenant veterinaria']}
        jsonLd={[softwareSchema, breadcrumb]}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="bg-mv-darkblue text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-mv-amber mb-4">
                SaaS Multi-tenant para Colegas Veterinarios
              </span>
              <h1 className="text-4xl lg:text-5xl font-display leading-tight mb-5">
                MisterVet <span className="text-mv-amber">Pro</span>
              </h1>
              <p className="text-slate-300 leading-relaxed mb-4">
                El software de gestión veterinaria más completo de Colombia. Administra pacientes, consultas, cirugías, hospitalización, laboratorio, POS, inventario y más — todo en un solo lugar, desde cualquier dispositivo con conexión a internet.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                Diseñado por y para médicos veterinarios, MisterVet Pro digitaliza la operación completa de tu veterinaria para que dediques más tiempo a lo que importa: tus pacientes. Multi-tenant, seguro y con planes que se adaptan a tu tamaño.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={SETUP_URL}
                  className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
                >
                  Registrar mi Veterinaria
                </a>
                <a
                  href={APP_URL}
                  className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-mv-darkblue transition-all"
                >
                  Iniciar Sesión
                </a>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 overflow-hidden">
              <img
                src={mockupSoftware}
                alt="MisterVet Pro - Captura del software"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Funcionalidades</h2>
            <p className="text-slate-500">Todo lo que tu veterinaria necesita en una sola plataforma</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <FeatureIcon name={f.icon} />
                  <h3 className="text-base font-bold text-slate-800">{f.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLANS ===== */}
      <section className="bg-slate-50 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">Planes y Precios</h2>
            <p className="text-slate-500">Elige el plan ideal para tu veterinaria</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? 'bg-mv-darkblue text-white shadow-2xl scale-105 border-2 border-mv-amber'
                    : 'bg-white border border-slate-200'
                }`}
              >
                <h3 className={`text-lg font-bold mb-1 ${plan.highlight ? 'text-mv-amber' : 'text-mv-darkblue'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-4 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>
                <div className="mb-4">
                  <span className={`text-3xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-800'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 text-sm ${plan.highlight ? 'text-slate-200' : 'text-slate-600'}`}
                    >
                      <span className={plan.highlight ? 'text-mv-amber' : 'text-mv-blue'}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.name === 'Enterprise' ? WHATSAPP_URL : SETUP_URL}
                  target={plan.name === 'Enterprise' ? '_blank' : undefined}
                  rel={plan.name === 'Enterprise' ? 'noopener noreferrer' : undefined}
                  className={`block text-center px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-mv-orange text-white hover:bg-mv-orange/90'
                      : 'border-2 border-mv-darkblue text-mv-darkblue hover:bg-mv-darkblue hover:text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-mv-darkblue mb-2">¿Por qué elegir MisterVet Pro?</h2>
            <p className="text-slate-500">Diseñado para veterinarias colombianas</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-bold text-mv-darkblue mb-2">Multi-tenant y Seguro</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cada veterinaria tiene su propio espacio aislado con datos encriptados. No compartes información con otras veterinarias y mantienes control total sobre tus registros clínicos, financieros y de inventario.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-bold text-mv-darkblue mb-2">Hecho en Colombia</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pensado para la realidad colombiana: facturación electrónica compatible, soporte para documento y teléfono locales, integraciones con mensajería WhatsApp y precios en pesos colombianos sin sorpresas cambiarias.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-bold text-mv-darkblue mb-2">Sin Instalaciones</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                100% en la nube. No necesitas servidores, ni instalar nada, ni preocuparte por copias de seguridad. Accedes desde tu computador, tablet o celular con tu usuario y contraseña, en cualquier momento y lugar.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-bold text-mv-darkblue mb-2">Soporte Real</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hablas con un equipo que conoce el software y la profesión veterinaria. No call centers ni respuestas automáticas: atención personalizada por WhatsApp y correo, con tiempos de respuesta claros según tu plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-mv-darkblue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-display mb-3">¿Listo para digitalizar tu veterinaria?</h2>
          <p className="text-slate-300 mb-6">Registra tu veterinaria en minutos y empieza a probar gratis</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={SETUP_URL}
              className="px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl shadow-lg shadow-mv-orange/30 hover:bg-mv-orange/90 transition-all hover:scale-105"
            >
              Registrar mi Veterinaria
            </a>
            <Link
              to="/mascotas"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-mv-darkblue transition-all"
            >
              Conocer los Servicios
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
