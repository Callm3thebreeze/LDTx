/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Color principal: Azul #0042AC
        primary: {
          50: '#eff6ff', // Azul muy claro (backgrounds)
          100: '#dbeafe', // Azul claro (tags, badges)
          200: '#bfdbfe', // Azul suave
          300: '#93c5fd', // Azul medio-claro
          400: '#60a5fa', // Azul medio
          500: '#3b82f6', // Azul estándar
          600: '#0042AC', // Azul principal (botones, links) ← Tu color
          700: '#003591', // Azul oscuro
          800: '#002976', // Azul muy oscuro
          900: '#001d5b', // Azul casi negro
        },
        // Color secundario: Azul claro #2F7EFE
        secondary: {
          50: '#f0f9ff', // Azul secundario muy claro
          100: '#e0f2fe', // Azul secundario claro
          200: '#bae6fd', // Azul secundario suave
          300: '#7dd3fc', // Azul secundario medio-claro
          400: '#38bdf8', // Azul secundario medio
          500: '#2F7EFE', // Azul secundario principal ← Tu color
          600: '#005AEB', // Azul secundario oscuro
          700: '#002E78', // Azul secundario muy oscuro
          800: '#075985', // Azul secundario profundo
          900: '#0c4a6e', // Azul secundario casi negro
        },
        // Color de resaltado: Rojo #ED4A44
        highlight: {
          50: '#fef2f2', // Rojo muy claro
          100: '#fee2e2', // Rojo claro
          200: '#fecaca', // Rojo suave
          300: '#fca5a5', // Rojo medio-claro
          400: '#f87171', // Rojo medio
          500: '#ED4A44', // Rojo principal ← Tu color
          600: '#dc2626', // Rojo oscuro
          700: '#b91c1c', // Rojo muy oscuro
          800: '#991b1b', // Rojo profundo
          900: '#7f1d1d', // Rojo casi negro
        },
        // Color de acento: Verde (mantenido de la configuración anterior)
        accent: {
          50: '#f0fdf4', // Verde muy claro
          100: '#dcfce7', // Verde claro
          200: '#bbf7d0', // Verde suave
          300: '#86efac', // Verde medio-claro
          400: '#4ade80', // Verde medio
          500: '#22c55e', // Verde estándar
          600: '#16a34a', // Verde principal (para acentos)
          700: '#15803d', // Verde oscuro
          800: '#166534', // Verde muy oscuro
          900: '#14532d', // Verde casi negro
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
