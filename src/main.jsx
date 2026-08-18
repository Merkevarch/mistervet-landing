import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPost from './pages/BlogPost.jsx'
import MascotasPage from './pages/MascotasPage.jsx'
import ProduccionPage from './pages/ProduccionPage.jsx'
import SoftwarePage from './pages/SoftwarePage.jsx'
import VeterinariaEnSincelejoMonteriaPage from './pages/VeterinariaEnSincelejoMonteriaPage.jsx'
import GanaderiaEnCostaCaribePage from './pages/GanaderiaEnCostaCaribePage.jsx'
import CoberturaPage from './pages/CoberturaPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
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

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
