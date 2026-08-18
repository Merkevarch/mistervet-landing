import CityPage from '../components/CityPage';

const services = [
  {
    title: 'Manejo Sanitario en Bovinos',
    desc: 'Programas sanitarios integrales para hatos bovinos en la Costa Caribe colombiana. Cobertura en Sucre, Córdoba, Bolívar, Magdalena, Cesar, Atlántico y La Guajira, con énfasis en las enfermedades tropicales prevalentes en cada región.',
  },
  {
    title: 'Consultoría Reproductiva',
    desc: 'Mejora de los índices reproductivos del hato en fincas del Caribe colombiano: revisión ginecológica, diagnóstico de gestación, programas de inseminación artificial, control de abortos y análisis de eficiencia reproductiva.',
  },
  {
    title: 'Manejo Sanitario en Porcinos',
    desc: 'Asesoría técnica para granjas porcícolas en la Costa Caribe: manejo de cerdas y lechones, protocolos de vacunación, control de patologías prevalentes en clima tropical y optimización de la conversión alimenticia.',
  },
  {
    title: 'Planes de Vacunación ICA',
    desc: 'Calendarios estratégicos alineados con las jornadas del ICA en cada departamento del Caribe colombiano, con registro detallado para cumplir requisitos de trazabilidad y comercialización.',
  },
  {
    title: 'Visitas Técnicas Programadas',
    desc: 'Rutas de visita periódica a tu finca en la Costa Caribe con revisión de animales, evaluación de instalaciones, revisión de registros productivos y capacitación al personal en manejo y bioseguridad.',
  },
  {
    title: 'Análisis de Registros Productivos',
    desc: 'Interpretación de indicadores zootécnicos del hato en fincas del Caribe: mortalidad, morbilidad, ganancia de peso, producción de leche, intervalo entre partos y eficiencia reproductiva.',
  },
];

const areas = [
  'Sucre (Sincelejo, Corozal, San Marcos)',
  'Córdoba (Montería, Cereté, Lorica, Montelíbano)',
  'Bolívar (Cartagena, Magangué, Carmen de Bolívar)',
  'Magdalena (Santa Marta, Ciénaga, Fundación)',
  'Cesar (Valledupar, Agustín Codazzi, Bosconia)',
  'Atlántico (Barranquilla, Soledad, Sabanalarga)',
  'La Guajira (Riohacha, Maicao, Fonseca)',
];

const faqs = [
  {
    q: '¿En qué departamentos de la Costa Caribe atienden fincas?',
    a: 'Actualmente cubrimos los siete departamentos de la región Caribe colombiana: Sucre, Córdoba, Bolívar, Magdalena, Cesar, Atlántico y La Guajira. Para ubicaciones fuera del casco urbano te recomendamos escribirnos por WhatsApp para confirmar disponibilidad y costo de desplazamiento.',
  },
  {
    q: '¿Qué enfermedades regionales del Caribe consideran en sus planes sanitarios?',
    a: 'Nuestros planes sanitarios para fincas en el Caribe colombiano priorizan las enfermedades prevalentes en la región: leptospirosis (favorecida por el clima tropical y la presencia de roedores), rabia silvestre transmitida por vampiros en zonas boscosas, anaplasmosis y babesiosis transmitidas por garrapatas, parasitosis gastrointestinales, y mastitis en sistemas lecheros. Adaptamos los protocolos según el departamento y el sistema productivo.',
  },
  {
    q: '¿Trabajan con fincas lecheras y de ceba en la Costa Caribe?',
    a: 'Sí, atendemos sistemas de producción de leche, ceba y doble propósito en toda la Costa Caribe. La región tiene importantes cuencas lecheras (Sinú medio, valle del Cauca) y zonas de ceba con retos sanitarios particulares. En lechería priorizamos control de mastitis y reproducción; en ceba priorizamos ganancia de peso y prevención de enfermedades respiratorias y digestivas.',
  },
  {
    q: '¿Cómo funciona el programa de visitas técnicas en la Costa Caribe?',
    a: 'Establecemos un calendario de visitas periódicas según el tamaño y las necesidades de tu finca. Dada la extensión geográfica del Caribe colombiano, organizamos rutas por departamento para optimizar costos de desplazamiento y frecuencia. En cada visita revisamos el hato, evaluamos instalaciones, supervisamos protocolos sanitarios y capacitamos al personal.',
  },
  {
    q: '¿Coordinan con las jornadas del ICA en la Costa Caribe?',
    a: 'Sí, coordinamos los planes sanitarios con las jornadas oficiales del ICA en cada departamento del Caribe (aftosa, brucelosis) y complementamos con vacunación contra rabia bovina, carbón sintomático y otras enfermedades según el riesgo de tu finca. Llevamos registro detallado de cada aplicación para cumplir requisitos de trazabilidad y comercialización.',
  },
];

export default function GanaderiaEnCostaCaribePage() {
  return (
    <CityPage
      city="Costa Caribe"
      region="Caribe Colombiano"
      type="ganaderia"
      title="Consultoría Pecuaria y Ganadería en la Costa Caribe | MisterVet"
      description="Consultoría veterinaria para fincas y hatos bovinos en la Costa Caribe colombiana: Sucre, Córdoba, Bolívar, Magdalena, Cesar, Atlántico y La Guajira. Manejo sanitario, vacunación ICA, consultoría reproductiva y visitas técnicas."
      path="/ganaderia-en-costa-caribe"
      intro="MisterVet ofrece asesoría técnica veterinaria para fincas y sistemas de producción pecuaria en toda la Costa Caribe colombiana, cubriendo los siete departamentos de la región: Sucre, Córdoba, Bolívar, Magdalena, Cesar, Atlántico y La Guajira. La ganadería del Caribe colombiano enfrenta desafíos sanitarios particulares por el clima tropical, la epidemiología regional y la diversidad de sistemas productivos, desde hatos doble propósito en sabanas hasta sistemas intensivos en el valle del Sinú. Nuestro equipo conoce estos retos y diseña planes sanitarios adaptados a cada realidad."
      services={services}
      areas={areas}
      faqs={faqs}
      keywords={['ganadería Costa Caribe', 'consultoría pecuaria Caribe', 'veterinario fincas Caribe', 'vacunación bovinos Caribe', 'manejo sanitario Caribe', 'consultoría ganadera Colombia', 'ganadería tropical Caribe']}
    />
  );
}
