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
import VeterinariaEnSincelejoPage from './pages/VeterinariaEnSincelejoPage.jsx'
import VeterinariaEnMonteriaPage from './pages/VeterinariaEnMonteriaPage.jsx'
import VeterinariaEnCostaCaribePage from './pages/VeterinariaEnCostaCaribePage.jsx'
import GanaderiaEnSincelejoPage from './pages/GanaderiaEnSincelejoPage.jsx'
import GanaderiaEnMonteriaPage from './pages/GanaderiaEnMonteriaPage.jsx'
import GanaderiaEnCostaCaribePage from './pages/GanaderiaEnCostaCaribePage.jsx'

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

          {/* Páginas locales - Veterinaria */}
          <Route path="/veterinaria-en-sincelejo" element={<VeterinariaEnSincelejoPage />} />
          <Route path="/veterinaria-en-monteria" element={<VeterinariaEnMonteriaPage />} />
          <Route path="/veterinaria-en-costa-caribe" element={<VeterinariaEnCostaCaribePage />} />

          {/* Páginas locales - Ganadería */}
          <Route path="/ganaderia-en-sincelejo" element={<GanaderiaEnSincelejoPage />} />
          <Route path="/ganaderia-en-monteria" element={<GanaderiaEnMonteriaPage />} />
          <Route path="/ganaderia-en-costa-caribe" element={<GanaderiaEnCostaCaribePage />} />

          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
