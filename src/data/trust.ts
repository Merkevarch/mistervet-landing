/**
 * ⚠️ DATOS DE CONFIANZA — PENDIENTES DE COMPLETAR POR EL PROPIETARIO.
 *
 * Este archivo centraliza los datos personales que alimentan las secciones
 * de confianza de la web (perfil del veterinario, cifras y testimonios).
 *
 * El propietario respondió que los enviaría por chat. Mientras tanto, los
 * campos pendientes usan el prefijo "[COMPLETAR" y las secciones se
 * renderizan en "modo pendiente" (visible en local, no debe subirse a
 * producción sin completar).
 *
 * Cuando lleguen los datos reales, basta con editar este archivo:
 * los componentes se muestran completos automáticamente.
 */

/** true si un valor sigue siendo marcador de posición */
export const isPlaceholder = (value: string): boolean => value.startsWith('[COMPLETAR');

// ─── Perfil del veterinario ────────────────────────────────────────────────

export interface VetProfileData {
  name: string;
  degree: string;
  university: string;
  /** Número de tarjeta profesional (Colegio de Médicos Veterinarios) */
  license: string;
  /** Párrafos de presentación (2 máximo recomendado) */
  bio: string[];
  /** Ruta de la foto (import de asset). null = pendiente de subir. */
  photo: string | null;
}

export const vetProfile: VetProfileData = {
  name: '[COMPLETAR: nombre completo]',
  degree: 'Médico Veterinario',
  university: '[COMPLETAR: universidad]',
  license: '[COMPLETAR: nº de tarjeta profesional]',
  bio: [
    'Detrás de MisterVet hay un médico veterinario titulado que atiende a cada paciente como si fuera el único: escuchando al dueño, explicando cada diagnóstico con palabras claras y acompañando la recuperación hasta el final.',
    'La misma dedicación que ponemos con las mascotas en Sincelejo y Montería la llevamos a las fincas de la Costa Caribe, con planes sanitarios a la medida de cada sistema de producción.',
  ],
  photo: null,
};

// ─── Cifras (barra de estadísticas) ────────────────────────────────────────

export interface StatItem {
  /** null = pendiente de que el propietario confirme la cifra */
  value: number | null;
  suffix: string;
  label: string;
}

/**
 * Los municipios (12) y departamentos (7) se derivan de la cobertura
 * publicada en la propia web; el resto queda a la espera de cifras reales.
 */
export const stats: StatItem[] = [
  { value: null, suffix: '+', label: 'Pacientes atendidos' },
  { value: null, suffix: '', label: 'Años de experiencia' },
  { value: 12, suffix: '', label: 'Municipios con cobertura' },
  { value: 7, suffix: '', label: 'Departamentos en el Caribe' },
];

// ─── Testimonios ───────────────────────────────────────────────────────────

export interface TestimonialItem {
  /** Reseña textual (real, aportada por el propietario) */
  text: string;
  name: string;
  location: string;
}

export const testimonials: TestimonialItem[] = [
  { text: '[COMPLETAR: reseña real del cliente 1]', name: '[Nombre]', location: '[Municipio]' },
  { text: '[COMPLETAR: reseña real del cliente 2]', name: '[Nombre]', location: '[Municipio]' },
  { text: '[COMPLETAR: reseña real del cliente 3]', name: '[Nombre]', location: '[Municipio]' },
];

/** true si falta algún dato por completar en las secciones de confianza */
export const trustIncomplete: boolean =
  isPlaceholder(vetProfile.name) ||
  testimonials.some((t) => isPlaceholder(t.text)) ||
  stats.some((s) => s.value === null);
