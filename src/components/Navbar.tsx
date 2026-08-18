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
          <div className="hidden md:flex items-center gap-6">
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
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
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
              href={APP_URL}
              className="block px-4 py-2 text-sm font-medium text-center text-white bg-mv-darkblue rounded-lg"
            >
              Acceder al Sistema
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
