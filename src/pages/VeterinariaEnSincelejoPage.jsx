import CityPage from '../components/CityPage';

const services = [
  {
    title: 'Consulta y Vacunación',
    desc: 'Atención médica integral a domicilio para perros, gatos y otras mascotas en Sincelejo. Incluye examen físico completo, diagnóstico y aplicación de vacunas importadas con registro digital del carnet.',
  },
  {
    title: 'Exámenes de Laboratorio',
    desc: 'Tomamos muestras en tu hogar en Sincelejo y procesamos hemogramas, bioquímicas, coprologías y pruebas rápidas. Resultados con interpretación veterinaria en 24-48 horas.',
  },
  {
    title: 'Cirugías y Hospitalización',
    desc: 'Coordinamos procedimientos quirúrgicos (esterilizaciones, cesáreas, extirpación de tumores) con quirófano equipado y hospitalización postoperatoria con monitoreo continuo.',
  },
  {
    title: 'Certificados de Viaje',
    desc: 'Documentación sanitaria y certificados veterinarios para viajes nacionales e internacionales desde Sincelejo, incluyendo cumplimiento de requisitos del ICA y aerolíneas.',
  },
  {
    title: 'Urgencias a Domicilio',
    desc: 'Atendemos urgencias en Sincelejo y zonas cercanas: intoxicaciones, traumatismos, cuadros gastrointestinales y otras emergencias. Coordinación previa por WhatsApp.',
  },
  {
    title: 'Desparasitación y Control',
    desc: 'Planes personalizados de desparasitación interna y externa según la edad, especie y estilo de vida de tu mascota. Productos de calidad y registro digital de cada dosis.',
  },
];

const areas = [
  'Centro de Sincelejo',
  'Barrio La Antonio Lenis',
  'El Carmen',
  'San Felipe',
  'La Concepción',
  'Las Peñitas',
  'Santa Lucía',
  'Villa Colombia',
  'Los Bolívar',
  'El Limón',
  'Corozal',
  'Sampués',
  'San Juan de Betulia',
];

const faqs = [
  {
    q: '¿El servicio veterinario en Sincelejo es realmente a domicilio?',
    a: 'Sí, atendemos exclusivamente a domicilio en Sincelejo y su área metropolitana. El médico veterinario se desplaza a tu hogar con todo el equipo necesario para consultas, vacunación, exámenes de laboratorio básicos y procedimientos que no requieran quirófano. Para cirugías y hospitalización el paciente debe trasladarse a nuestra sede de coordinación.',
  },
  {
    q: '¿Cuánto cuesta una consulta veterinaria a domicilio en Sincelejo?',
    a: 'El valor de la consulta a domicilio incluye el desplazamiento hasta tu ubicación en Sincelejo, la consulta clínica completa y la orientación al propietario. Los procedimientos adicionales (vacunas, exámenes de laboratorio, medicamentos) se cotizan según el caso. Te recomendamos escribirnos por WhatsApp con la especie, edad y motivo de consulta para darte una cotización exacta.',
  },
  {
    q: '¿Atienden urgencias veterinarias en Sincelejo en la noche o fines de semana?',
    a: 'Sí, atendemos urgencias en Sincelejo fuera del horario habitual con recargo por servicio de urgencia. Te recomendamos contactarnos por WhatsApp antes para recibir indicaciones de primeros auxilios y confirmar la disponibilidad inmediata. En casos críticos estabilizamos al paciente y coordinamos remisión si es necesario.',
  },
  {
    q: '¿Atienden perros, gatos y otras especies en Sincelejo?',
    a: 'Sí, además de perros y gatos atendemos conejos, aves, reptiles y otros animales de compañía no convencionales en Sincelejo. Cada especie tiene requerimientos clínicos específicos y nuestro enfoque se adapta a ellos, desde la manipulación hasta los protocolos de medicación.',
  },
  {
    q: '¿Llevan registro digital de mi mascota en Sincelejo?',
    a: 'Sí, cada paciente en Sincelejo tiene una historia clínica digital con todas las consultas, vacunas, exámenes, medicamentos y procedimientos realizados. Esto nos permite dar continuidad al tratamiento y compartir la información contigo cuando la necesites, incluso si en el futuro cambias de veterinario.',
  },
];

export default function VeterinariaEnSincelejoPage() {
  return (
    <CityPage
      city="Sincelejo"
      region="Sucre"
      type="veterinaria"
      title="Veterinaria a Domicilio en Sincelejo | MisterVet"
      description="Servicio veterinario a domicilio en Sincelejo, Sucre. Consultas, vacunación, cirugías, exámenes de laboratorio, urgencias y certificados de viaje con médico veterinario titulado. Agenda por WhatsApp."
      path="/veterinaria-en-sincelejo"
      intro="En MisterVet llevamos atención veterinaria profesional directamente a tu hogar en Sincelejo y zonas aledañas. Sabemos que trasladar a tu mascota puede ser estresante para ella y para ti, por eso nuestro médico veterinario titulado se desplaza con todo el equipo necesario para ofrecer consulta clínica, vacunación, exámenes de laboratorio básicos y procedimientos sin que tu compañero salga de su entorno familiar. Atendemos perros, gatos, conejos, aves y otras mascotas con un enfoque preventivo, diagnóstico oportuno y seguimiento personalizado."
      services={services}
      areas={areas}
      faqs={faqs}
      keywords={['veterinaria Sincelejo', 'veterinario a domicilio Sincelejo', 'consulta veterinaria Sincelejo', 'vacunación perros Sincelejo', 'urgencias veterinarias Sincelejo', 'veterinaria Sucre']}
    />
  );
}
