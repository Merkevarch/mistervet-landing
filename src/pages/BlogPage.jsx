import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoDibujo from '../assets/logo-dibujo.png';
import { getAllPosts } from '../blog/postsLoader';

const WHATSAPP_URL = 'https://wa.me/573017653440';
const APP_URL = 'https://app.mistervet.co';
const CONTACT_EMAIL = 'mailto:contacto@mistervet.co';

const categoryColors = {
  Mascotas: 'bg-mv-blue/10 text-mv-blue',
  Ganadería: 'bg-mv-amber/10 text-mv-amber',
  General: 'bg-slate-100 text-slate-600',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* ===== BLOG HEADER ===== */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-display text-mv-darkblue mb-3">Blog MisterVet</h1>
          <p className="text-slate-600">Consejos y guías sobre medicina veterinaria, mascotas y producción animal</p>
        </div>
      </section>

      {/* ===== ARTÍCULOS ===== */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-slate-400 py-12">No hay artículos disponibles.</p>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${categoryColors[post.category] || categoryColors.General}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(post.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">{post.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>
                  <span className="inline-block mt-3 text-sm font-medium text-mv-blue">Leer más →</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

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
