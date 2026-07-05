/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mv-darkblue': '#163E8D',  // Azul oscuro profundo del perro
        'mv-blue': '#2E86DE',      // Azul brillante/celeste vivo
        'mv-orange': '#F15A24',    // Naranja intenso del gato
        'mv-amber': '#FBB03B',     // Amarillo/naranja cálido
      },
    },
  },
  plugins: [],
}