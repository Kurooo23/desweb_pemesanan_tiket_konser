/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',  // boleh kamu tambah ts/tsx kalau mau
  ],
  theme: {
    extend: {
      colors: {
        'bg-body': '#0b0d12',
        'bg-black': '#000000',
        'bg-bg-body': '#0b0d12',
        'bg-soft': '#0f131b',
        'bg-bg-soft': '#0f131b',
        'bg-mute': '#111826',
        'border-soft': '#222938',
        'border-hover': '#2b3243',
        brand: '#6B0A00',
        'brand-soft': '#8c1105',
        'brand-yellow': '#f7c86a',
        'brand-yellow': '#f5af3d',
      },
        borderRadius: {'2xl': '1rem',},
    },
  },
  plugins: [],
}