import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import logoDibujo from '../assets/logo-dibujo.png';
import { getPostBySlug } from '../blog/postsLoader';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const APP_URL = 'https://app.mistervet.co';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';

const categoryColors = {
  Mascotas: 'bg-mv-blue/10 text-mv-blue',
  Ganadería: 'bg-mv-amber/10 text-mv-amber',
  General: 'bg-slate-100 text-slate-600',
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 logo-container">
              <img src={logoDibujo} alt="MisterVet" className="h-10 w-auto" />
              <span className="text-2xl text-mv-darkblue font-brand">MisterVet</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm text-slate-600 hover:text-mv-darkblue transition-colors">Inicio</Link>
              <Link to="/blog" className="text-sm text-mv-darkblue font-medium">Blog</Link>
              <a
                href={APP_URL}
                className="px-4 py-2 text-sm font-medium text-mv-darkblue border border-mv-darkblue rounded-lg hover:bg-mv-darkblue hover:text-white transition-colors"
              >
                Acceder al Sistema
              </a>
            </div>
            <button
              className="md:hidden text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              )}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-600 hover:text-mv-darkblue">Inicio</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-mv-darkblue font-medium">Blog</Link>
              <a href={APP_URL} className="block px-4 py-2 text-sm font-medium text-center text-white bg-mv-darkblue rounded-lg">Acceder al Sistema</a>
            </div>
          )}
        </div>
      </nav>

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

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoDibujo} alt="MisterVet" className="h-8 w-auto" />
                <span className="text-xl text-white font-brand">MisterVet</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Medicina veterinaria integral y tecnología para clínicas veterinarias en Colombia.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href={APP_URL} className="hover:text-white transition-colors">Acceder al Sistema</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    WhatsApp: +57 301 765 3440
                  </a>
                </li>
                <li>
                  <a href={CONTACT_EMAIL} className="hover:text-white transition-colors">
                    contacto@mistervet.co
                  </a>
                </li>
                <li className="text-slate-500">Colombia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} MisterVet. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
