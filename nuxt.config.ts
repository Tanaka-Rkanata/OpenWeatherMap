export default defineNuxtConfig({
  compatibilityDate: '2025-04-07',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      openWeatherApiKey: process.env.OPENWEATHER_API_KEY
    }
  },
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
})