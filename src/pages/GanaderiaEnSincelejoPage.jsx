import CityPage from '../components/CityPage';

const services = [
  {
    title: 'Manejo Sanitario en Bovinos',
    desc: 'Diseño e implementación de programas sanitarios para hatos lecheros y de ceba en Sincelejo y Sucre. Incluye vacunación contra aftosa, brucelosis, rabia bovina y carbón sintomático, además de protocolos de bioseguridad.',
  },
  {
    title: 'Consultoría Reproductiva',
    desc: 'Mejora de los índices reproductivos del hato en fincas de Sucre: revisión ginecológica, diagnóstico de gestación, manejo de toros, programas de inseminación artificial y control de abortos.',
  },
  {
    title: 'Manejo Sanitario en Porcinos',
    desc: 'Asesoría técnica para granjas porcícolas en Sincelejo y alrededores: manejo de cerdas y lechones, protocolos de vacunación, control de patologías prevalentes y optimización de la conversión alimenticia.',
  },
  {
    title: 'Planes de Vacunación ICA',
    desc: 'Calendarios estratégicos de vacunación alineados con las jornadas del ICA en Sucre, con registro de cada aplicación para cumplir requisitos de trazabilidad y comercialización.',
  },
  {
    title: 'Visitas Técnicas Programadas',
    desc: 'Rutas de visita periódica a tu finca en Sincelejo con revisión de animales, evaluación de instalaciones, revisión de registros productivos y capacitación al personal.',
  },
  {
    title: 'Análisis de Registros Productivos',
    desc: 'Interpretación de indicadores zootécnicos del hato: mortalidad, morbilidad, ganancia de peso, producción de leche, intervalo entre partos y eficiencia reproductiva. Decisiones basadas en datos.',
  },
];

const areas = [
  'Sincelejo y zona urbana',
  'Corozal',
  'Sampués',
  'San Juan de Betulia',
  'El Roble',
  'Colosó',
  'Chalán',
  'San Onofre',
  'Tolu',
  'Tolú Viejo',
  'San Pedro',
  'Los Palmitos',
];

const faqs = [
  {
    q: '¿Ofrecen consultoría pecuaria para fincas en Sincelejo y Sucre?',
    a: 'Sí, brindamos asesoría técnica veterinaria para fincas y sistemas de producción bovina, porcina y de otras especies pecuarias en Sincelejo y todo el departamento de Sucre. Trabajamos con hatos lecheros, de ceba, doble propósito y sistemas porcícolas, adaptando los planes sanitarios a las condiciones específicas de cada finca y al perfil epidemiológico de la región.',
  },
  {
    q: '¿Cómo funciona el programa de visitas técnicas a mi finca en Sucre?',
    a: 'Establecemos un calendario de visitas periódicas según el tamaño y las necesidades de tu finca en Sucre. En cada visita revisamos el hato, evaluamos instalaciones, supervisamos los protocolos sanitarios, revisamos los registros productivos y capacitamos al personal. Las visitas son la base para dar continuidad al plan sanitario y detectar oportunidades de mejora de manera oportuna.',
  },
  {
    q: '¿Ayudan con las jornadas de vacunación del ICA en Sucre?',
    a: 'Sí, coordinamos los planes sanitarios con las jornadas oficiales del ICA en Sucre (aftosa, brucelosis) y complementamos con vacunación contra rabia bovina, carbón sintomático y otras enfermedades según el riesgo de tu finca. Llevamos registro detallado de cada aplicación para que cumplas con los requisitos de trazabilidad y comercialización.',
  },
  {
    q: '¿Atienden fincas lecheras y de ceba en Sincelejo?',
    a: 'Sí, atendemos tanto sistemas de producción de leche como de ceba y doble propósito en Sincelejo y Sucre. Cada sistema tiene objetivos productivos y desafíos sanitarios diferentes, y nuestro enfoque se adapta a ellos: en lechería priorizamos control de mastitis y reproducción, en ceba priorizamos ganancia de peso y prevención de enfermedades respiratorias y digestivas.',
  },
  {
    q: '¿Cómo coticen sus servicios de consultoría pecuaria en Sucre?',
    a: 'La cotización depende del tamaño del hato, la frecuencia de las visitas, los servicios incluidos (vacunación, desparasitación, análisis de laboratorio, etc.) y la ubicación de la finca. Te recomendamos escribirnos por WhatsApp con los detalles de tu finca (especie, número de animales, ubicación, objetivo productivo) para darte una cotización personalizada.',
  },
];

export default function GanaderiaEnSincelejoPage() {
  return (
    <CityPage
      city="Sincelejo"
      region="Sucre"
      type="ganaderia"
      title="Consultoría Pecuaria y Ganadería en Sincelejo | MisterVet"
      description="Consultoría veterinaria para fincas y hatos bovinos en Sincelejo y Sucre. Manejo sanitario, vacunación ICA, consultoría reproductiva, visitas técnicas y análisis de registros productivos. Médico veterinario titulado."
      path="/ganaderia-en-sincelejo"
      intro="MisterVet ofrece asesoría técnica veterinaria para fincas y sistemas de producción pecuaria en Sincelejo y todo el departamento de Sucre. Trabajamos codo a codo con productores bovinos, porcinos y de otras especies para optimizar la productividad, garantizar la sanidad animal y mejorar la rentabilidad de la operación con protocolos basados en evidencia científica y adaptados a las condiciones de la región Sabanera. Nuestro enfoque es preventivo: anticiparnos a los problemas antes de que impacten la caja de la finca."
      services={services}
      areas={areas}
      faqs={faqs}
      keywords={['ganadería Sincelejo', 'consultoría pecuaria Sucre', 'veterinario fincas Sincelejo', 'vacunación bovinos Sucre', 'manejo sanitario Sincelejo', 'consultoría ganadera Sucre']}
    />
  );
}
