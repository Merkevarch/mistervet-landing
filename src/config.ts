/**
 * Configuración centralizada de marca y contacto para MisterVet.
 *
 * Todas las constantes que se usan a lo largo de la app (URLs externas,
 * teléfono, email, enlaces de redes) viven aquí para evitar duplicación
 * y permitir actualizarlas desde un único lugar.
 *
 * Uso:
 *   import { WHATSAPP_URL, CONTACT_EMAIL } from '../config';
 */

// ─── Contacto ────────────────────────────────────────────────────────────
// WHATSAPP_URL es el enlace "limpio" (sin mensaje) — úsalo en schemas
// JSON-LD (sameAs) o donde se necesite la URL a secias.
export const WHATSAPP_URL = 'https://wa.me/573017653440';

// Enlaces con mensaje pre-escrito para CTAs (mejoran conversión:
// el cliente ya llega al chat con el texto listo para enviar).
export const WHATSAPP_CITA_URL =
  'https://wa.me/573017653440?text=' +
  encodeURIComponent('Hola MisterVet, quiero agendar una cita para mi mascota.');
export const WHATSAPP_GANADERIA_URL =
  'https://wa.me/573017653440?text=' +
  encodeURIComponent('Hola MisterVet, me interesa una visita técnica para mi finca.');
export const WHATSAPP_PRO_URL =
  'https://wa.me/573017653440?text=' +
  encodeURIComponent('Hola, me interesa el plan Enterprise de MisterVet Pro.');

export const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';
export const PHONE_DISPLAY = '+57 301 765 3440';
export const PHONE_INTERNATIONAL = '+573017653440';
export const PHONE_TEL_URL = 'tel:+573017653440';

// ─── App MisterVet Pro (SaaS) ────────────────────────────────────────────
export const APP_URL = 'https://app.mistervet.co';
export const SETUP_URL = 'https://app.mistervet.co/setup';

// ─── Web principal ──────────────────────────────────────────────────────
export const SITE_URL = 'https://www.mistervet.co';
export const SITE_NAME = 'MisterVet';
export const SITE_LOCALE = 'es_CO';

// ─── Google Business Profile ────────────────────────────────────────────
// Perfil público de Google Business (ver reseñas). El de reseña añade /review.
export const GBP_PROFILE_URL = 'https://g.page/r/CdNFFd3TuBNREBM';
export const GBP_REVIEW_URL = 'https://g.page/r/CdNFFd3TuBNREBM/review';

// ─── Cobertura ──────────────────────────────────────────────────────────
export interface CoverageConfig {
  cities: string[];
  departments: string[];
  surroundings: Record<string, string[]>;
}

export const PETS_COVERAGE: CoverageConfig = {
  cities: ['Sincelejo', 'Montería'],
  departments: ['Sucre', 'Córdoba'],
  surroundings: {
    Sucre: ['Corozal', 'Sampués', 'San Marcos', 'San Juan de Betulia', 'San Pedro'],
    Córdoba: ['Cereté', 'San Pelayo', 'Lorica', 'Ciénaga de Oro', 'Planeta Rica'],
  },
};

export interface LivestockCoverageConfig {
  region: string;
  departments: string[];
}

export const LIVESTOCK_COVERAGE: LivestockCoverageConfig = {
  region: 'Costa Caribe',
  departments: ['Sucre', 'Córdoba', 'Bolívar', 'Magdalena', 'Cesar', 'Atlántico', 'La Guajira'],
};

// ─── Horario ─────────────────────────────────────────────────────────────
export interface BusinessHoursConfig {
  days: string[];
  opens: string;
  closes: string;
}

export const BUSINESS_HOURS: BusinessHoursConfig = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '08:00',
  closes: '18:00',
};
