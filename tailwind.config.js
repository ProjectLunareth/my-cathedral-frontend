/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'quantum-void': '#0f0c29',
        'resonance-glow': '#8a6dff',
        'archetypal-gold': '#ffd166'
      }
    },
  },
  plugins: [],
}
