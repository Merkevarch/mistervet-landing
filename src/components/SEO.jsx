import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, SITE_LOCALE } from '../config';

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
 *
 * Para schemas JSON-LD (Organization, Breadcrumb, etc.) importarlos desde '../schemas'.
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
      <meta property="og:locale" content={SITE_LOCALE} />

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
