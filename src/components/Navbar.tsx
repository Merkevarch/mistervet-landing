import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoDibujo from '../assets/logo-dibujo.webp';
import { APP_URL, WHATSAPP_CITA_URL } from '../config';

interface NavLink {
  to: string;
  label: string;
}

const navLinks: NavLink[] = [
  { to: '/mascotas', label: 'Mascotas' },
  { to: '/produccion', label: 'Producción y Ganadería' },
  { to: '/software', label: 'MisterVet Pro' },
  { to: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 logo-container">
            <img src={logoDibujo} alt="MisterVet" className="h-10 w-auto" />
            <span className="text-2xl text-mv-darkblue font-brand">MisterVet</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  isActive(link.to)
                    ? 'text-mv-darkblue font-medium'
                    : 'text-slate-600 hover:text-mv-darkblue'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* CTA WhatsApp (escritorio grande) */}
            <a
              href={WHATSAPP_CITA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#25D366] rounded-lg shadow-sm hover:bg-[#1DA851] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Agendar
            </a>
            <a
              href={APP_URL}
              className="px-4 py-2 text-sm font-medium text-mv-darkblue border border-mv-darkblue rounded-lg hover:bg-mv-darkblue hover:text-white transition-colors"
            >
              Acceder al Sistema
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-slate-200 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm ${
                  isActive(link.to)
                    ? 'text-mv-darkblue font-medium'
                    : 'text-slate-600 hover:text-mv-darkblue'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_CITA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm font-semibold text-center text-white bg-[#25D366] rounded-lg"
            >
              💬 Agendar por WhatsApp
            </a>
            <a
              href={APP_URL}
              className="block px-4 py-2 text-sm font-medium text-center text-mv-darkblue border border-mv-darkblue rounded-lg"
            >
              Acceder al Sistema
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
