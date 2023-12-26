// tailwind.config.js
module.exports = {
  content: [
    // Archivos HTML, TypeScript, etc., donde Tailwind buscará clases para extraer
    './src/**/*.html',
    './src/**/*.ts',
  ],
  theme: {
    extend: {
      // Personalización del tema de Tailwind (si es necesario)
    },
  },
  variants: {
    extend: {
      // Habilitar variantes adicionales de Tailwind (si es necesario)
    },
  },
  plugins: [
    // Habilitar plugins de Tailwind (si es necesario)
  ],
  corePlugins: { preflight: false }
}
