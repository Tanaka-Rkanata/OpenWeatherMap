export default defineNuxtConfig({
  compatibilityDate: '2025-04-07',
  components: true,
  devtools: { enabled: true },
  plugins: ['~/plugins/vuetify.ts'],
  runtimeConfig: {
    public: {
      openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
      geoDbApiKey: process.env.GEODB_API_KEY,
      newsApiKey: process.env.NEWS_API_KEY,
    }
  },
  css: [
    'vuetify/styles',
    'leaflet/dist/leaflet.css'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  experimental: {
    renderJsonPayloads: true
  },
})