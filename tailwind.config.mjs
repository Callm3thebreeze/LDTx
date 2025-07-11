/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4', // Verde muy claro (backgrounds)
          100: '#dcfce7', // Verde claro (tags, badges)
          200: '#bbf7d0', // Verde suave
          300: '#86efac', // Verde medio-claro
          400: '#4ade80', // Verde medio
          500: '#22c55e', // Verde estándar
          600: '#16a34a', // Verde principal (botones, links) ← Más usado
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
