import React from 'react';
export default function App() {
return (
<div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
{/* NAVBAR */}
<nav className="bg-white border-b border-slate-100 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
{/* LOGO CON FUENTE CORPORATIVA LOCAL */}
<div className="text-3xl font-brand tracking-wide text-mv-darkblue">
MisterVet
</div>
<div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
<a href="#mascotas" className="hover:text-mv-orange transition-colors">Mascotas</a>
<a href="#produccion" className="hover:text-mv-orange transition-colors">Producción y Ganadería</a>
<a href="#software" className="hover:text-mv-blue transition-colors">MisterVet Pro</a>
</div>
<a href="https://app.mistervet.co" className="border border-mv-darkblue text-mv-darkblue text-xs font-semibold px-4 py-2 rounded hover:bg-mv-darkblue hover:text-white transition-all">
Acceder al Sistema
</a>
</nav>
{/* HERO SECTION */}
<header className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
<div className="space-y-6">
{/* TÍTULO PRINCIPAL CON FUENTE ROBOTO THIN LOCAL */}
<h1 className="text-4xl md:text-5xl font-thin text-mv-darkblue leading-tight">
Medicina veterinaria integral y <span className="font-normal text-mv-blue">tecnología de vanguardia.</span>
</h1>
<p className="text-slate-600 max-w-lg text-base">
Ofrecemos atención médica clínica especializada a domicilio para tus mascotas y consultoría técnica de alto nivel para optimizar la producción ganadera, porcina y ovina.
</p>
<div className="flex flex-wrap gap-4 pt-2">
<a href="mailto:contacto@mistervet.co" className="bg-mv-orange text-white text-sm font-medium px-6 py-3 rounded shadow-md hover:bg-opacity-90 transition-all">
Contactar por Correo
</a>
<a href="https://wa.me/tu_numero_aqui" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-6 py-3 rounded hover:bg-slate-100 transition-all">
WhatsApp Directo
</a>
</div>
</div>
<div className="bg-slate-200 rounded-2xl h-80 flex items-center justify-center border border-slate-300 text-slate-400 font-light italic">
[Espacio para Fotografía]
</div>
</header>
{/* BLOQUE 1: SERVICIOS */}
<section className="bg-white border-t border-b border-slate-100 py-16">
<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
<div id="mascotas" className="space-y-4">
<div className="text-xs font-semibold text-mv-orange uppercase tracking-wider">Servicios Clínicos</div>
<h2 className="text-2xl font-light text-mv-darkblue">Cuidado para Mascotas</h2>
<p className="text-slate-600 text-sm">
Atención médica integral a domicilio para perros y gatos. Evita el estrés del traslado con consultas preventivas, planes vacunales, diagnósticos y tratamientos oportunos directamente en la comodidad de su hogar.
</p>
</div>
<div id="produccion" className="space-y-4 md:border-l md:border-slate-100 md:pl-12">
<div className="text-xs font-semibold text-mv-amber uppercase tracking-wider">Consultoría de Campo</div>
<h2 className="text-2xl font-light text-mv-darkblue">Producción y Ganadería</h2>
<p className="text-slate-600 text-sm">
Asesoría corporativa y clínica especializada para explotaciones de bovinos, porcinos y ovinos. Nos enfocamos en la optimización de hatos, control sanitario estricto y mejora de índices productivos.
</p>
</div>
</div>
</section>
{/* BLOQUE 2: MISTER VET PRO */}
<section id="software" className="bg-mv-darkblue text-white py-20 px-6">
<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
<div className="space-y-6">
<div className="inline-block bg-mv-blue bg-opacity-25 text-mv-blue border border-mv-blue border-opacity-30 text-xs font-semibold px-3 py-1 rounded-full">
SaaS Multitenant para Colegas
</div>
<h2 className="text-3xl font-light text-white">Impulsado por MisterVet Pro</h2>
<p className="text-slate-300 text-sm leading-relaxed">
Gestionamos nuestra práctica con software de desarrollo propio. Si eres un médico veterinario buscando modernizar tu clínica, gestionar expedientes e historias clínicas con total agilidad, regístrate y prueba nuestro ecosistema digital.
</p>
<a href="https://app.mistervet.co" className="inline-block bg-mv-orange text-white text-sm font-semibold px-6 py-3 rounded hover:bg-opacity-90 transition-all">
Registrar mi Veterinaria
</a>
</div>
<div className="bg-slate-900 bg-opacity-40 border border-slate-700 h-72 rounded-xl flex items-center justify-center text-slate-500 text-xs italic">
[Mockup Interfaz del Software SaaS]
</div>
</div>
</section>
</div>
);
}