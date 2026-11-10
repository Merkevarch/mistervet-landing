/**
 * Cifras de confianza de MisterVet — confirmadas por el propietario.
 *
 * Decisiones del propietario:
 * - Sin perfil individual del veterinario: la atención la presta un equipo
 *   de médicos veterinarios (varios profesionales, con rotación), así que
 *   no se publica un nombre/credencial concreta.
 * - Sin testimonios en la web por ahora: las reseñas se gestionan en el
 *   perfil de Google Business (config.ts → GBP_PROFILE_URL).
 * - Cifras reales: más de 5 años de experiencia y más de 200 mascotas
 *   tratadas. Cobertura: Montería y Sincelejo, con algunas zonas cercanas.
 */

export interface StatItem {
  /** Cifra a mostrar (se anima con CountUp) */
  value: number;
  /** Texto que sigue al número, p. ej. "+" para "5+" */
  suffix: string;
  /** Etiqueta bajo el número */
  label: string;
  /** Línea pequeña adicional (p. ej. nombres de las ciudades) */
  detail?: string;
}

export const stats: StatItem[] = [
  { value: 5, suffix: '+', label: 'Años de experiencia' },
  { value: 200, suffix: '+', label: 'Mascotas tratadas' },
  {
    value: 2,
    suffix: '',
    label: 'Ciudades',
    detail: 'Montería, Sincelejo y zonas cercanas',
  },
];
