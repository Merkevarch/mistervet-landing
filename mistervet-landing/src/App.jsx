import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        {/* ESPACIO PARA TU LOGO REAL */}
        <div className="flex items-center gap-2">
          {/* Cuando tengas el archivo del logo, descomenta la línea de abajo o asegúrate de que exista en assets */}
          {/* <img src="/src/assets/logo.png" alt="MisterVet Logo" className="h-8 w-auto" /> */}
          <span className="text-3xl md:text-4xl font-brand tracking-wide text-mv-darkblue">MisterVet</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-base font-medium text-slate-600">
          <a href="#mascotas" className="hover:text-mv-orange transition-colors">Mascotas</a>
          <a href="#produccion" className="hover:text-mv-orange transition-colors">Producción y Ganadería</a>
          <a href="#software" className="hover:text-mv-blue transition-colors">MisterVet Pro</a>
        </div>
        <a href="[https://app.mistervet.co](https://app.mistervet.co)" className="border border-mv-darkblue text-mv-darkblue text-sm font-semibold px-5 py-2.5 rounded hover:bg-mv-darkblue hover:text-white transition-all">
          Acceder al Sistema
        </a>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-thin text-mv-darkblue leading-tight tracking-tight">
            Medicina veterinaria integral y <span className="font-normal text-mv-blue">tecnología de vanguardia.</span>
          </h1>
          <p className="text-slate-600 max-w-lg text-lg leading-relaxed">
            Ofrecemos atención médica clínica especializada a domicilio para tus mascotas y consultoría técnica de alto nivel para optimizar la producción ganadera, porcina y ovina.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="mailto:contacto@mistervet.co" className="bg-mv-orange text-white text-base font-medium px-8 py-4 rounded shadow-md hover:bg-opacity-90 transition-all">
              Contactar por Correo
            </a>
            <a href="[https://wa.me/tu_numero_aqui](https://wa.me/tu_numero_aqui)" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 text-slate-700 text-base font-medium px-8 py-4 rounded hover:bg-slate-100 transition-all">
              WhatsApp Directo
            </a>
          </div>
        </div>
        {/* CONTENEDOR PREPARADO PARA LA IMAGEN PRINCIPAL */}
        <div className="bg-slate-200 rounded-2xl h-[450px] overflow-hidden flex items-center justify-center border border-slate-300 shadow-inner">
          {/* <img src="/src/assets/principal.jpg" alt="Veterinaria Integral" className="w-full h-full object-cover" /> */}
          <span className="text-slate-400 font-light italic text-sm">[Fotografía Optimizada con Nanobanana]</span>
        </div>
      </header>

      {/* BLOQUE 1: SERVICIOS */}
      <section className="bg-white border-t border-b border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div id="mascotas" className="space-y-5">
            <div className="text-xs font-bold text-mv-orange uppercase tracking-widest">Servicios Clínicos</div>
            <h2 className="text-3xl font-light text-mv-darkblue">Cuidado para Mascotas</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Atención médica integral a domicilio para perros y gatos. Evita el estrés del traslado con consultas preventivas, planes vacunales, diagnósticos y tratamientos oportunos directamente en la comodidad de su hogar.
            </p>
          </div>
          <div id="produccion" className="space-y-5 md:border-l md:border-slate-100 md:pl-16">
            <div className="text-xs font-bold text-mv-amber uppercase tracking-widest">Consultoría de Campo</div>
            <h2 className="text-3xl font-light text-mv-darkblue">Producción y Ganadería</h2>
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
            <a href="[https://app.mistervet.co](https://app.mistervet.co)" className="inline-block bg-mv-orange text-white text-base font-semibold px-8 py-4 rounded hover:bg-opacity-90 transition-all shadow-lg">
              Registrar mi Veterinaria
            </a>
          </div>
          {/* CONTENEDOR PREPARADO PARA EL MOCKUP DEL SOFTWARE */}
          <div className="bg-slate-900 bg-opacity-40 border border-slate-700 h-80 rounded-xl overflow-hidden flex items-center justify-center shadow-2xl">
            {/* <img src="/src/assets/mockup-software.png" alt="MisterVet Pro Dashboard" className="w-full h-full object-cover" /> */}
            <span className="text-slate-500 text-sm italic">[Mockup Interfaz del Software SaaS]</span>
          </div>
        </div>
      </section>
    </div>
  );
}