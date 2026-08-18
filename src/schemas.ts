/**
 * Schemas JSON-LD centralizados para structured data (SEO).
 *
 * Separado de SEO.jsx para no romper react-refresh (que solo permite
 * exports de componentes en archivos de componentes).
 *
 * Uso:
 *   import { organizationSchema, buildBreadcrumbSchema } from '../schemas';
 */

import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  WHATSAPP_URL,
  CONTACT_EMAIL,
  PHONE_INTERNATIONAL,
  BUSINESS_HOURS,
} from './config';

// Tipos auxiliares para JSON-LD
type JsonLdSchema = {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const organizationSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'VeterinaryBusiness',
  name: SITE_NAME,
  description: 'Medicina veterinaria integral para mascotas y producción animal en Colombia.',
  url: SITE_URL,
  telephone: PHONE_INTERNATIONAL,
  email: CONTACT_EMAIL.replace('mailto:', ''),
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
  },
  areaServed: 'Colombia',
  medicalSpecialty: ['VeterinaryMedicine', 'VeterinarySurgery'],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: BUSINESS_HOURS.days,
    opens: BUSINESS_HOURS.opens,
    closes: BUSINESS_HOURS.closes,
  },
  sameAs: [WHATSAPP_URL],
};

export const websiteSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Medicina veterinaria integral para mascotas y producción animal.',
  inLanguage: SITE_LOCALE.replace('_', '-'),
};

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]): JsonLdSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
