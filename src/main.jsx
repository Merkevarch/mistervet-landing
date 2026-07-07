import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPost from './pages/BlogPost.jsx'
import MascotasPage from './pages/MascotasPage.jsx'
import ProduccionPage from './pages/ProduccionPage.jsx'
import SoftwarePage from './pages/SoftwarePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mascotas" element={<MascotasPage />} />
        <Route path="/produccion" element={<ProduccionPage />} />
        <Route path="/software" element={<SoftwarePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
