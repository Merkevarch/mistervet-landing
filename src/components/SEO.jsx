import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.mistervet.co';
const SITE_NAME = 'MisterVet';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Componente SEO reutilizable.
 *
 * Props:
 *  - title: título de la página (sin sufijo, se añade automáticamente " | MisterVet")
 *  - titleTemplate: si es false, no se añade sufijo
 *  - description: meta description (150-160 caracteres ideal)
 *  - path: ruta de la página (ej: "/mascotas") para construir canonical y og:url
 *  - image: URL absoluta o relativa de la imagen OG
 *  - type: og:type ("website", "article", etc.)
 *  - keywords: array de palabras clave
 *  - noindex: si es true, agrega noindex
 *  - jsonLd: objeto o array de objetos JSON-LD para structured data
 */
export default function SEO({
  title,
  titleTemplate = true,
  description,
  path = '/',
  image,
  type = 'website',
  keywords = [],
  noindex = false,
  jsonLd = null,
}) {
  const fullTitle = titleTemplate ? `${title} | ${SITE_NAME}` : title;
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
  const ogImage = image
    ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
    : DEFAULT_IMAGE;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Title */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_CO" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLdArray.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

// Helpers para schemas JSON-LD comunes

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'VeterinaryBusiness',
  name: 'MisterVet',
  description: 'Medicina veterinaria integral para mascotas y producción animal en Colombia.',
  url: SITE_URL,
  telephone: '+573017653440',
  email: 'contacto@mistervet.co',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
  },
  areaServed: 'Colombia',
  medicalSpecialty: ['VeterinaryMedicine', 'VeterinarySurgery'],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
  },
  sameAs: ['https://wa.me/573017653440'],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MisterVet',
  url: SITE_URL,
  description: 'Medicina veterinaria integral para mascotas y producción animal.',
  inLanguage: 'es-CO',
};

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
