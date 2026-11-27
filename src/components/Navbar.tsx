import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoDibujo from '../assets/logo-dibujo.webp';
import { APP_URL } from '../config';

interface NavLink {
  to: string;
  label: string;
}

const navLinks: NavLink[] = [
  { to: '/mascotas', label: 'Mascotas' },
  { to: '/produccion', label: 'Ganadería' },
  { to: '/software', label: 'MisterVet Pro' },
  { to: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zona 1: Marca (un solo lockup limpio) */}
          <Link to="/" className="flex items-center gap-2 logo-container whitespace-nowrap shrink-0">
            <img src={logoDibujo} alt="MisterVet" className="h-9 w-auto" />
            <span className="text-2xl text-mv-darkblue font-brand">MisterVet</span>
          </Link>

          {/* Zona 2: Enlaces tipográficos con indicador sutil */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full after:bg-mv-darkblue after:transition-transform after:duration-200 after:origin-left ${
                    active
                      ? 'text-mv-darkblue after:scale-x-100'
                      : 'text-slate-600 hover:text-mv-darkblue after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zona 3: Acción única en barra superior */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href={APP_URL}
              className="px-4 py-2 text-sm font-medium text-mv-darkblue border border-mv-darkblue/30 rounded-xl hover:bg-mv-darkblue hover:text-white hover:border-mv-darkblue transition-all duration-150 whitespace-nowrap shrink-0"
            >
              Acceder al Sistema
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-slate-600 hover:text-mv-darkblue cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-slate-200/80 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1 text-sm ${
                  isActive(link.to)
                    ? 'text-mv-darkblue font-semibold'
                    : 'text-slate-600 hover:text-mv-darkblue'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={APP_URL}
              className="block px-4 py-2.5 text-sm font-medium text-center text-mv-darkblue border border-mv-darkblue/30 rounded-xl hover:bg-mv-darkblue hover:text-white transition-colors"
            >
              Acceder al Sistema
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
