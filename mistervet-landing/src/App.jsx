import React from 'react';
import logoDibujo from './assets/logo-dibujo.png';
import perroImg from './assets/perro.png';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        {/* ESPACIO PARA TU LOGO REAL */}
          <div className="flex items-center gap-3">
            <img src={logoDibujo} alt="MisterVet Logo" className="h-10 w-auto object-contain" />
            <span className="text-3xl md:text-4xl font-brand tracking-wide text-mv-darkblue">MisterVet</span>
          </div>
        
        <div className="hidden md:flex gap-8 text-base font-medium text-slate-600">
          <a href="#mascotas" className="hover:text-mv-orange transition-colors">Mascotas</a>
          <a href="#produccion" className="hover:text-mv-orange transition-colors">Producción y Ganadería</a>
          <a href="#software" className="hover:text-mv-blue transition-colors">MisterVet Pro</a>
        </div>
        <a href="[https://app.mistervet.co](https://app.mistervet.co)" className="border border-mv-darkblue text-mv-darkblue text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-mv-darkblue hover:text-white transition-all hover:scale-105 transition-transform">
          Acceder al Sistema
        </a>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6 items-center py-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-5xl font-thin text-mv-darkblue leading-tight tracking-tight">
            Medicina veterinaria integral y <span className="font-normal text-mv-blue">tecnología de vanguardia.</span>
          </h1>
          <p className="text-slate-600 max-w-lg text-lg leading-relaxed">
            Ofrecemos atención médica clínica especializada a domicilio para tus mascotas y consultoría técnica de alto nivel para optimizar la producción ganadera, porcina y ovina.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="mailto:contacto@mistervet.co" className="bg-mv-orange text-white text-base font-medium px-8 py-4 rounded-full shadow-md hover:bg-opacity-90 transition-all hover:scale-105 transform duration-200">
              Contactar por Correo
            </a>
            <a href="[https://wa.me/tu_numero_aqui](https://wa.me/tu_numero_aqui)" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 text-slate-700 text-base font-medium px-8 py-4 rounded-full hover:bg-slate-100 transition-all hover:scale-105 transform duration-200">
              WhatsApp Directo
            </a>
          </div>
        </div>
        <div className="relative h-[500px] md:h-[600px]">
          <img src={perroImg} alt="Perro MisterVet" className="w-full h-full object-contain object-bottom" />
        </div>
      </header>

      {/* SECCIÓN: SERVICIOS A DOMICILIO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-mv-darkblue">Nuestros Servicios a Domicilio</h2>
            <p className="text-slate-600 mt-4 max-w-lg mx-auto">Atención veterinaria integral sin estrés, directamente en tu hogar.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Consulta y Vacunación a Domicilio", icon: "home", desc: "Atención profesional sin estresar a la mascota." },
              { title: "Toma de Exámenes en Casa", icon: "flask", desc: "Muestras de laboratorio en la comodidad del hogar." },
              { title: "Especialistas y Cirugías", icon: "scissors", desc: "Conexión directa con clínicas aliadas de la red 24h." },
              { title: "Certificados de Viaje", icon: "plane", desc: "Trámites nacionales e internacionales sin complicaciones." }
            ].map((serv, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 mb-4 text-mv-blue">
                  {serv.icon === "home" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0L21.75 12M4.5 9.75v10.125A1.5 1.5 0 006 21.375h12A1.5 1.5 0 0020.25 20.125V9.75M8.25 21.375h7.5"/></svg>}
                  {serv.icon === "flask" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H5.25A2.25 2.25 0 003 6v3m0 6v3.75a2.25 2.25 0 002.25 2.25h3m12 0h3a2.25 2.25 0 002.25-2.25V15M5.25 9l4.5-4.5m12 0L12 12m0 0l-4.5 4.5M12 12v7.5"/></svg>}
                  {serv.icon === "scissors" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M3 12c3-3 6-3 9 0s6 3 9 3"/></svg>}
                  {serv.icon === "plane" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9-9m-9-9v18"/></svg>}
                </div>
                <h3 className="font-light text-lg text-mv-darkblue mb-2">{serv.title}</h3>
                <p className="text-sm text-slate-600">{serv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 1: SERVICIOS */}
      <section className="bg-white border-b border-slate-100 py-24 pt-0 md:pt-0">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div id="mascotas" className="space-y-5">
            <div className="text-s font-bold text-mv-orange uppercase tracking-widest">Servicios Clínicos</div>
            <h2 className="text-4xl font-light text-mv-darkblue">Cuidado para Mascotas</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Atención médica integral a domicilio para perros y gatos. Evita el estrés del traslado con consultas preventivas, planes vacunales, diagnósticos y tratamientos oportunos directamente en la comodidad de su hogar.
            </p>
          </div>
          <div id="produccion" className="space-y-5 md:border-l md:border-slate-100 md:pl-16">
            <div className="text-s font-bold text-mv-amber uppercase tracking-widest">Consultoría de Campo</div>
            <h2 className="text-4xl font-light text-mv-darkblue">Producción y Ganadería</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Asesoría corporativa y clínica especializada para explotaciones de bovinos, porcinos y ovinos. Nos enfocamos en la optimización de hatos, control sanitario estricto y mejora de índices productivos.
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE 2: MISTER VET PRO */}
      <section id="software" className="bg-mv-darkblue text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-mv-blue bg-opacity-25 text-mv-blue border border-mv-blue border-opacity-30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              SaaS Multitenant para Colegas
            </div>
            <h2 className="text-4xl font-light text-white tracking-tight">Impulsado por MisterVet Pro</h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Gestionamos nuestra práctica con software de desarrollo propio. Si eres un médico veterinario buscando modernizar tu clínica, gestionar expedientes e historias clínicas con total agilidad, regístrate y prueba nuestro ecosistema digital.
            </p>
            <a href="[https://app.mistervet.co](https://app.mistervet.co)" className="inline-block bg-mv-orange text-white text-base font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all shadow-lg hover:scale-105 transform duration-200">
              Registrar mi Veterinaria
            </a>
          </div>
          {/* CONTENEDOR PREPARADO PARA EL MOCKUP DEL SOFTWARE */}
          <div className="bg-slate-900 bg-opacity-40 border border-slate-700 h-80 rounded-xl overflow-hidden flex items-center justify-center shadow-2xl hover:shadow-2xl transition-shadow">
            {/* <img src="/src/assets/mockup-software.png" alt="MisterVet Pro Dashboard" className="w-full h-full object-cover" /> */}
            <span className="text-slate-500 text-sm italic">[Mockup Interfaz del Software SaaS]</span>
          </div>
        </div>
      </section>
    </div>
  );
}