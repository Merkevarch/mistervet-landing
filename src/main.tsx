import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import WhatsAppFloat from './components/WhatsAppFloat.tsx'

// Code-splitting: todas las rutas excepto home (App) se cargan bajo demanda.
// Cada página se convierte en un chunk separado que se descarga solo cuando
// el usuario navega a esa ruta. Esto reduce el first-load de ~500KB a ~200KB.
const MascotasPage = lazy(() => import('./pages/MascotasPage.tsx'))
const ProduccionPage = lazy(() => import('./pages/ProduccionPage.tsx'))
const SoftwarePage = lazy(() => import('./pages/SoftwarePage.tsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.tsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'))
const CoberturaPage = lazy(() => import('./pages/CoberturaPage.tsx'))
const VeterinariaEnSincelejoMonteriaPage = lazy(() => import('./pages/VeterinariaEnSincelejoMonteriaPage.tsx'))
const GanaderiaEnCostaCaribePage = lazy(() => import('./pages/GanaderiaEnCostaCaribePage.tsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'))

// Loading fallback mientras se descarga el chunk de la ruta
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-mv-blue/20 border-t-mv-blue rounded-full animate-spin" />
      <p className="text-sm text-slate-500">Cargando…</p>
    </div>
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        {/* Botón flotante de WhatsApp (solo móvil) presente en todas las rutas */}
        <WhatsAppFloat />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/mascotas" element={<MascotasPage />} />
            <Route path="/produccion" element={<ProduccionPage />} />
            <Route path="/software" element={<SoftwarePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Cobertura regional */}
            <Route path="/cobertura" element={<CoberturaPage />} />
            <Route path="/veterinaria-en-sincelejo-y-monteria" element={<VeterinariaEnSincelejoMonteriaPage />} />
            <Route path="/ganaderia-en-costa-caribe" element={<GanaderiaEnCostaCaribePage />} />

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
