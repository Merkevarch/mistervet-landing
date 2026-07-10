import CityPage from '../components/CityPage';

const services = [
  {
    title: 'Consulta y Vacunación',
    desc: 'Atención médica integral a domicilio para perros, gatos y otras mascotas en Montería. Examen físico completo, planes de vacunación adaptados a la región y registro digital del carnet sanitario.',
  },
  {
    title: 'Exámenes de Laboratorio',
    desc: 'Hemogramas, bioquímicas, coprologías, pruebas rápidas y diagnóstico de enfermedades tropicales prevalentes en el Córdoba. Resultados con interpretación veterinaria en 24-48 horas.',
  },
  {
    title: 'Cirugías y Hospitalización',
    desc: 'Esterilizaciones, cesáreas, extirpación de tumores y otros procedimientos quirúrgicos con quirófano equipado. Hospitalización postoperatoria con monitoreo continuo y seguimiento.',
  },
  {
    title: 'Certificados de Viaje',
    desc: 'Certificados veterinarios y documentación sanitaria para viajes nacionales e internacionales desde Montería, incluyendo cumplimiento de requisitos del ICA y aerolíneas.',
  },
  {
    title: 'Urgencias a Domicilio',
    desc: 'Atendemos urgencias veterinarias en Montería: intoxicaciones, picaduras de animales ponzoñosos, traumatismos, cuadros gastrointestinales. Coordinación previa por WhatsApp.',
  },
  {
    title: 'Desparasitación y Control',
    desc: 'Planes personalizados de desparasitación considerando la alta prevalencia de parásitos en el clima tropical de Montería. Productos de calidad y registro digital de cada dosis.',
  },
];

const areas = [
  'Centro de Montería',
  'Barrio La Castellana',
  'LosÁngeles',
  'El Recreo',
  'Santa Mónica',
  'La Pradera',
  'Vivero',
  'Panamericano',
  'El Edén',
  'La Castellana',
  'Cereté',
  'San Pelayo',
  'Ciénaga de Oro',
];

const faqs = [
  {
    q: '¿El servicio veterinario en Montería es a domicilio?',
    a: 'Sí, en MisterVet atendemos exclusivamente a domicilio en Montería y su área metropolitana. Nuestro médico veterinario se desplaza a tu hogar con todo el equipo necesario para consultas, vacunación, exámenes de laboratorio básicos y procedimientos que no requieran quirófano. Para cirugías y hospitalización el paciente debe trasladarse a la sede de coordinación.',
  },
  {
    q: '¿Consideran las enfermedades tropicales de Montería en sus diagnósticos?',
    a: 'Sí, nuestro enfoque considera la epidemiología local del Córdoba: alta prevalencia de leptospirosis, ehrlichiosis transmitida por garrapatas, parásitos gastrointestinales favorecidos por el clima tropical, y enfermedades transmitidas por vectores. Esto nos permite hacer diagnósticos más precisos y recomendar planes preventivos adaptados a la realidad de Montería.',
  },
  {
    q: '¿Cuánto cuesta una consulta veterinaria a domicilio en Montería?',
    a: 'El valor incluye el desplazamiento hasta tu ubicación en Montería, la consulta clínica completa y la orientación al propietario. Los procedimientos adicionales (vacunas, exámenes, medicamentos) se cotizan según el caso. Te recomendamos escribirnos por WhatsApp con la especie, edad y motivo de consulta para darte una cotización exacta.',
  },
  {
    q: '¿Atienden urgencias veterinarias en Montería fuera del horario habitual?',
    a: 'Sí, atendemos urgencias en Montería fuera del horario habitual con recargo por servicio de urgencia. Te recomendamos contactarnos por WhatsApp antes para recibir indicaciones de primeros auxilios y confirmar disponibilidad inmediata. En casos críticos estabilizamos al paciente y coordinamos remisión si es necesario.',
  },
  {
    q: '¿Atienden perros, gatos y otras especies en Montería?',
    a: 'Sí, además de perros y gatos atendemos conejos, aves, reptiles y otros animales de compañía en Montería. Cada especie tiene requerimientos clínicos específicos y nuestro enfoque se adapta a ellos, desde la manipulación hasta los protocolos de medicación.',
  },
];

export default function VeterinariaEnMonteriaPage() {
  return (
    <CityPage
      city="Montería"
      region="Córdoba"
      type="veterinaria"
      title="Veterinaria a Domicilio en Montería | MisterVet"
      description="Servicio veterinario a domicilio en Montería, Córdoba. Consultas, vacunación, cirugías, exámenes de laboratorio, urgencias y certificados de viaje con médico veterinario titulado. Agenda por WhatsApp."
      path="/veterinaria-en-monteria"
      intro="En MisterVet llevamos atención veterinaria profesional directamente a tu hogar en Montería y el área metropolitana. Nuestro médico veterinario titulado se desplaza con todo el equipo necesario para consulta clínica, vacunación, exámenes de laboratorio y procedimientos, sin que tu mascota tenga que salir de su entorno. Conocemos la epidemiología local del Córdoba y adaptamos nuestros planes preventivos a las enfermedades más frecuentes en la región, garantizando una atención que combina rigor clínico con conocimiento del contexto tropical en el que viven tus animales."
      services={services}
      areas={areas}
      faqs={faqs}
      keywords={['veterinaria Montería', 'veterinario a domicilio Montería', 'consulta veterinaria Montería', 'vacunación perros Montería', 'urgencias veterinarias Montería', 'veterinaria Córdoba']}
    />
  );
}
