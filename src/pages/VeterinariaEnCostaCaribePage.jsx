import CityPage from '../components/CityPage';

const services = [
  {
    title: 'Consulta y Vacunación',
    desc: 'Atención veterinaria a domicilio en toda la Costa Caribe colombiana. Cobertura en Sincelejo, Montería, Cartagena, Barranquilla, Santa Marta, Valledupar y Riohacha, con planes de vacunación adaptados a la epidemiología regional.',
  },
  {
    title: 'Exámenes de Laboratorio',
    desc: 'Diagnóstico de enfermedades tropicales prevalentes en el Caribe colombiano: leptospirosis, ehrlichiosis, anaplasmosis, babesiosis y parasitosis gastrointestinales. Resultados con interpretación veterinaria.',
  },
  {
    title: 'Cirugías y Hospitalización',
    desc: 'Procedimientos quirúrgicos con coordinación logística para pacientes de toda la región Caribe. Quirófano equipado, protocolos de bioseguridad y hospitalización postoperatoria con monitoreo continuo.',
  },
  {
    title: 'Certificados de Viaje',
    desc: 'Documentación sanitaria y certificados para viajes entre ciudades del Caribe colombiano o hacia el interior del país. Cumplimiento de requisitos del ICA, aerolíneas y terminales terrestres.',
  },
  {
    title: 'Urgencias a Domicilio',
    desc: 'Atención de urgencias veterinarias en la Costa Caribe: picaduras de animales ponzoñosos, intoxicaciones, traumatismos, cuadros gastrointestinales agudos. Coordinación previa por WhatsApp.',
  },
  {
    title: 'Desparasitación Tropical',
    desc: 'Planes de desparasitación adaptados al clima tropical del Caribe colombiano, donde la alta prevalencia de parásitos internos y externos requiere esquemas estratégicos y rotación de principios activos.',
  },
];

const areas = [
  'Sincelejo (Sucre)',
  'Montería (Córdoba)',
  'Cartagena (Bolívar)',
  'Barranquilla (Atlántico)',
  'Santa Marta (Magdalena)',
  'Valledupar (Cesar)',
  'Riohacha (La Guajira)',
  'Cereté (Córdoba)',
  'Corozal (Sucre)',
  'Magangué (Bolívar)',
  'Soledad (Atlántico)',
];

const faqs = [
  {
    q: '¿En qué ciudades de la Costa Caribe atienden?',
    a: 'Actualmente cubrimos las principales ciudades de la Costa Caribe colombiana: Sincelejo, Montería, Cartagena, Barranquilla, Santa Marta, Valledupar y Riohacha, además de sus áreas metropolitanas y municipios cercanos. Para ubicaciones fuera del casco urbano te recomendamos escribirnos por WhatsApp para confirmar disponibilidad y costo de desplazamiento.',
  },
  {
    q: '¿El servicio es siempre a domicilio?',
    a: 'Sí, nuestro modelo de servicio en la Costa Caribe es predominantemente a domicilio. El médico veterinario se desplaza a tu ubicación con todo el equipo necesario para consultas, vacunación, exámenes básicos y procedimientos. Para cirugías y hospitalización coordinamos el traslado del paciente a la sede correspondiente.',
  },
  {
    q: '¿Consideran las enfermedades típicas del Caribe colombiano?',
    a: 'Sí, nuestro enfoque clínico está adaptado a la epidemiología del Caribe colombiano: leptospirosis (favorecida por el clima tropical y la presencia de roedores), ehrlichiosis y anaplasmosis transmitidas por garrapatas, babesiosis, parasitosis gastrointestinales, y enfermedades transmitidas por vectores que son más prevalentes en esta región. Esto nos permite diagnósticos más precisos y planes preventivos adaptados.',
  },
  {
    q: '¿Cómo agendo una cita veterinaria en la Costa Caribe?',
    a: 'El canal principal es WhatsApp (+57 301 765 3440). Escríbenos con tu ubicación (ciudad y barrio), la especie y edad de tu mascota, y el motivo de consulta. Te confirmaremos disponibilidad, cotización y agendamos la visita. Para urgencias fuera de horario también atendemos con recargo.',
  },
  {
    q: '¿Atienden otras especies además de perros y gatos?',
    a: 'Sí, además de perros y gatos atendemos conejos, aves, reptiles, cerdos y otras especies de compañía o producción menor en la Costa Caribe. Para animales de producción mayor (bovinos, equinos, porcinos en finca) contamos con el servicio de consultoría pecuaria, que se agenda aparte.',
  },
];

export default function VeterinariaEnCostaCaribePage() {
  return (
    <CityPage
      city="Costa Caribe"
      region="Caribe Colombiano"
      type="veterinaria"
      title="Veterinaria a Domicilio en la Costa Caribe | MisterVet"
      description="Servicio veterinario a domicilio en la Costa Caribe colombiana: Sincelejo, Montería, Cartagena, Barranquilla, Santa Marta, Valledupar y Riohacha. Consultas, vacunación, cirugías, urgencias y desparasitación tropical. Médico veterinario titulado."
      path="/veterinaria-en-costa-caribe"
      intro="MisterVet ofrece servicio veterinario a domicilio en toda la Costa Caribe colombiana, cubriendo Sincelejo, Montería, Cartagena, Barranquilla, Santa Marta, Valledupar y Riohacha, así como sus áreas metropolitanas. Nuestro enfoque combina la atención clínica de excelencia con un profundo conocimiento de la epidemiología regional: las enfermedades tropicales prevalentes en el Caribe (leptospirosis, ehrlichiosis, anaplasmosis, parasitosis) requieren un abordaje diferente al de regiones templadas, y nuestros planes preventivos están diseñados para esa realidad."
      services={services}
      areas={areas}
      faqs={faqs}
      keywords={['veterinaria Costa Caribe', 'veterinario a domicilio Caribe', 'veterinaria Cartagena', 'veterinaria Barranquilla', 'veterinaria Santa Marta', 'veterinaria Sincelejo', 'veterinaria Montería', 'veterinaria Valledupar']}
    />
  );
}
