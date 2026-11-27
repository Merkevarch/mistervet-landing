/**
 * Schemas JSON-LD centralizados para structured data (SEO).
 */

import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  WHATSAPP_URL,
  GBP_PROFILE_URL,
  CONTACT_EMAIL,
  PHONE_INTERNATIONAL,
  BUSINESS_HOURS,
  PETS_COVERAGE,
  LIVESTOCK_COVERAGE,
} from './config';

type JsonLdSchema = {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqSchemaItem {
  q: string;
  a: string;
}

export const organizationSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'VeterinaryBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description:
    'Veterinaria a domicilio en Sincelejo y Montería, consultoría y sistematización ganadera en Costa Caribe, y software veterinario MisterVet Pro en Colombia.',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: PHONE_INTERNATIONAL,
  email: CONTACT_EMAIL.replace('mailto:', ''),
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Sucre y Córdoba',
    addressCountry: 'CO',
  },
  areaServed: [
    ...PETS_COVERAGE.cities.map((city) => ({ '@type': 'City', name: city })),
    ...LIVESTOCK_COVERAGE.departments.map((dept) => ({
      '@type': 'AdministrativeArea',
      name: dept,
    })),
    { '@type': 'Country', name: 'Colombia' },
  ],
  medicalSpecialty: ['VeterinaryMedicine'],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: BUSINESS_HOURS.days,
    opens: BUSINESS_HOURS.opens,
    closes: BUSINESS_HOURS.closes,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Veterinarios y Software MisterVet',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Veterinaria a domicilio en Sincelejo y Montería',
          description:
            'Consulta médica general, vacunación, exámenes de laboratorio y certificados de viaje para perros y gatos en casa.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Consultoría ganadera y sistematización del hato',
          description:
            'Manejo sanitario bovino y porcino, planes reproductivos y sistematización del hato en la Costa Caribe.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'MisterVet Pro',
          applicationCategory: 'VeterinaryManagementApplication',
          operatingSystem: 'Web',
        },
      },
    ],
  },
  sameAs: [WHATSAPP_URL, GBP_PROFILE_URL],
};

export const websiteSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Medicina veterinaria a domicilio, sistematización del hato ganadero y software SaaS para clínicas veterinarias en Colombia.',
  inLanguage: SITE_LOCALE.replace('_', '-'),
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
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

export const buildFaqSchema = (items: FaqSchemaItem[]): JsonLdSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
});
