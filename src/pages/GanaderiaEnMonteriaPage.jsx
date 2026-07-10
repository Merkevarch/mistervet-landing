import CityPage from '../components/CityPage';

const services = [
  {
    title: 'Manejo Sanitario en Bovinos',
    desc: 'Programas sanitarios integrales para hatos lecheros y de ceba en Montería y Córdoba. Incluye vacunación contra aftosa, brucelosis, rabia bovina y carbón sintomático, con énfasis en leptospirosis por la alta prevalencia regional.',
  },
  {
    title: 'Consultoría Reproductiva',
    desc: 'Mejora de los índices reproductivos del hato en fincas de Córdoba: revisión ginecológica, diagnóstico de gestación, programas de inseminación artificial, control de abortos y análisis de intervalos parto-concepción.',
  },
  {
    title: 'Manejo Sanitario en Porcinos',
    desc: 'Asesoría técnica para granjas porcícolas en Montería y el departamento de Córdoba: manejo de cerdas y lechones, protocolos de vacunación, control de patologías prevalentes y optimización de la conversión alimenticia.',
  },
  {
    title: 'Planes de Vacunación ICA',
    desc: 'Calendarios estratégicos alineados con las jornadas del ICA en Córdoba, con registro detallado de cada aplicación para cumplir requisitos de trazabilidad, comercialización y certificaciones de Buenas Prácticas Pecuarias.',
  },
  {
    title: 'Visitas Técnicas Programadas',
    desc: 'Rutas de visita periódica a tu finca en Montería y Córdoba con revisión de animales, evaluación de instalaciones, revisión de registros productivos y capacitación al personal en manejo y bioseguridad.',
  },
  {
    title: 'Análisis de Registros Productivos',
    desc: 'Interpretación de indicadores zootécnicos del hato: mortalidad, morbilidad, ganancia de peso, producción de leche, intervalo entre partos y eficiencia reproductiva. Convertimos datos en decisiones.',
  },
];

const areas = [
  'Montería y zona urbana',
  'Cereté',
  'San Pelayo',
  'Ciénaga de Oro',
  'Lorica',
  'Montelíbano',
  'Tierralta',
  'Planeta Rica',
  'Sahagún',
  'Chinú',
  'Cotorra',
  'Puerto Escondido',
];

const faqs = [
  {
    q: '¿Ofrecen consultoría pecuaria para fincas en Montería y Córdoba?',
    a: 'Sí, brindamos asesoría técnica veterinaria para fincas y sistemas de producción bovina, porcina y de otras especies en Montería y todo el departamento de Córdoba. Trabajamos con hatos lecheros, de ceba, doble propósito y sistemas porcícolas, adaptando los planes sanitarios a las condiciones específicas de la región Sinú-San Jorge, donde la epidemiología tropical presenta retos particulares.',
  },
  {
    q: '¿Córdoba tiene retos sanitarios específicos que consideren?',
    a: 'Sí, Córdoba es uno de los departamentos con mayor prevalencia de leptospirosis bovina del país, favorecida por el clima tropical, la presencia de roedores y las aguas estancadas. También hay alta circulación de rabia silvestre transmitida por vampiros en zonas de bosque seco tropical, anaplasmosis y babesiosis transmitidas por garrapatas, y parasitosis gastrointestinales. Nuestros planes sanitarios priorizan estas enfermedades regionales.',
  },
  {
    q: '¿Cómo funciona el programa de visitas técnicas a mi finca en Córdoba?',
    a: 'Establecemos un calendario de visitas periódicas según el tamaño y las necesidades de tu finca en Córdoba. En cada visita revisamos el hato, evaluamos instalaciones, supervisamos protocolos sanitarios, revisamos registros productivos y capacitamos al personal. Las visitas son la base para dar continuidad al plan sanitario y detectar oportunidades de mejora de manera oportuna.',
  },
  {
    q: '¿Atienden fincas lecheras y de ceba en Montería?',
    a: 'Sí, atendemos sistemas de leche, ceba y doble propósito en Montería y Córdoba. La cuenca lechera del Sinú medio es una zona de alta producción y conocemos sus particularidades: manejo de mastitis en climas cálidos, control de garrapatas con resistencia a ixodicidas, y reproducción en condiciones de estrés térmico. En ceba priorizamos ganancia de peso y prevención de enfermedades respiratorias y digestivas.',
  },
  {
    q: '¿Ayudan con las jornadas de vacunación del ICA en Córdoba?',
    a: 'Sí, coordinamos los planes sanitarios con las jornadas oficiales del ICA en Córdoba (aftosa, brucelosis) y complementamos con vacunación contra rabia bovina, carbón sintomático y otras enfermedades según el riesgo de tu finca. Llevamos registro detallado de cada aplicación para cumplir requisitos de trazabilidad y comercialización.',
  },
];

export default function GanaderiaEnMonteriaPage() {
  return (
    <CityPage
      city="Montería"
      region="Córdoba"
      type="ganaderia"
      title="Consultoría Pecuaria y Ganadería en Montería | MisterVet"
      description="Consultoría veterinaria para fincas y hatos bovinos en Montería y Córdoba. Manejo sanitario, vacunación ICA, consultoría reproductiva, visitas técnicas y análisis de registros productivos. Médico veterinario titulado."
      path="/ganaderia-en-monteria"
      intro="MisterVet ofrece asesoría técnica veterinaria para fincas y sistemas de producción pecuaria en Montería y todo el departamento de Córdoba, una de las regiones ganaderas más importantes de Colombia. Trabajamos con productores bovinos, porcinos y de otras especies para optimizar la productividad, garantizar la sanidad animal y mejorar la rentabilidad con protocolos basados en evidencia científica y adaptados a la epidemiología tropical del Sinú-San Jorge, donde la leptospirosis, rabia silvestre, anaplasmosis y babesiosis son retos sanitarios permanentes."
      services={services}
      areas={areas}
      faqs={faqs}
      keywords={['ganadería Montería', 'consultoría pecuaria Córdoba', 'veterinario fincas Montería', 'vacunación bovinos Córdoba', 'manejo sanitario Montería', 'consultoría ganadera Córdoba', 'leptospirosis bovina Córdoba']}
    />
  );
}
