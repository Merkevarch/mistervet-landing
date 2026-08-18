import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../schemas';
import { getPostBySlug } from '../blog/postsLoader';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const SITE_URL = 'https://www.mistervet.co';

const categoryColors = {
  Mascotas: 'bg-mv-blue/10 text-mv-blue',
  Ganadería: 'bg-mv-amber/10 text-mv-amber',
  General: 'bg-slate-100 text-slate-600',
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-mv-blue hover:underline">← Volver al blog</Link>
        </div>
      </div>
    );
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MisterVet',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: post.category,
    inLanguage: 'es-CO',
    url: postUrl,
    image: `${SITE_URL}/og-image.png`,
  };

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Inicio', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <SEO
        title={post.title}
        titleTemplate={true}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        keywords={[post.category, 'medicina veterinaria', 'MisterVet', post.title.toLowerCase().split(':')[0]]}
        jsonLd={[articleSchema, breadcrumb]}
      />
      <Navbar />

      {/* ===== ARTÍCULO ===== */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/blog" className="text-sm text-slate-500 hover:text-mv-blue mb-6 inline-block">
          ← Volver al blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${categoryColors[post.category] || categoryColors.General}`}>
              {post.category}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(post.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display text-mv-darkblue mb-4">{post.title}</h1>
          <p className="text-slate-500 text-sm">Por {post.author}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10">
          <div className="prose prose-slate max-w-none
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-800 [&_h1]:mb-4 [&_h1]:mt-6
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:mb-3 [&_h2]:mt-6
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-700 [&_h3]:mb-2 [&_h3]:mt-4
            [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-slate-600
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-slate-600
            [&_li]:mb-1
            [&_strong]:text-slate-800 [&_strong]:font-semibold
            [&_a]:text-mv-blue [&_a]:underline
            [&_blockquote]:border-l-4 [&_blockquote]:border-mv-blue [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500
            [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4
            [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold
            [&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm
            [&_hr]:border-slate-200 [&_hr]:my-6
            [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-mv-darkblue rounded-2xl p-6 text-center">
          <h3 className="text-white font-bold text-lg mb-2">¿Necesitas ayuda con tu mascota o tu finca?</h3>
          <p className="text-slate-300 text-sm mb-4">Contáctanos y recibe atención profesional</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-mv-orange text-white font-semibold rounded-xl hover:bg-mv-orange/90 transition-colors"
          >
            Agendar Cita
          </a>
        </div>
      </article>

      <Footer />
    </div>
  );
}
