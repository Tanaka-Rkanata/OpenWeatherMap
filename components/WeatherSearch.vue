<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { WeatherResponse } from '~/types/weather'

const props = defineProps<{
  weatherData: WeatherResponse | null
  error: any
  onSearch: (city: string) => void
}>()


const city = ref('')
const mapContainer = ref<HTMLElement | null>(null)

function searchWeather() {
  if (!city.value || city.value.trim() === '') {
    alert('都道府県名を入力してください')
    return
  }
  props.onSearch(city.value)
  console.log('入力内容:', city.value)
}

const cities = [
  { name: '札幌', lat: 43.0642, lon: 141.3469 },
  { name: '東京', lat: 35.6895, lon: 139.6917 },
  { name: '名古屋', lat: 35.1815, lon: 136.9066 },
  { name: '大阪', lat: 34.6937, lon: 135.5023 },
  { name: '福岡', lat: 33.5902, lon: 130.4017 }
]

onMounted(async () => {
  const L = await import('leaflet')
  const map = L.map(mapContainer.value!).setView([36.2048, 138.2529], 5)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  const config = useRuntimeConfig()
  const apiKey = config.public.openWeatherApiKey

  for (const city of cities) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric&lang=ja`
    const { data } = await useFetch<WeatherResponse>(url)

    const weather = data.value
    if (weather) {
      const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      const icon = L.icon({ iconUrl, iconSize: [32, 32] })
      L.marker([city.lat, city.lon], { icon })
        .bindPopup(`<strong>${city.name}</strong><br>${weather.weather[0].description}<br>${weather.main.temp}℃`)
        .addTo(map)
    }
  }
})
</script>

<template>
  <v-text-field v-model="city" label="都道府県名を日本語で入力（例：東京都）" outlined class="mb-1 full-width-icon-reset" />

  <v-btn color="primary" @click="searchWeather">天気を取得</v-btn>

  <v-alert v-if="error" type="error" class="mt-4">
    {{ error.message }}
  </v-alert>

  <v-card v-if="weatherData" class="mt-4" elevation="3">
    <v-card-title>{{ weatherData.name }} の天気</v-card-title>
    <v-card-text>
      <div>天候: {{ (weatherData as WeatherResponse).weather[0].description }}</div>
      <div>気温: {{ (weatherData as WeatherResponse).main.temp }} ℃</div>
      <div>湿度: {{ (weatherData as WeatherResponse).main.humidity }} %</div>
    </v-card-text>
  </v-card>


  <v-row justify="center" class="mt-4" v-if="weatherData">
    <v-btn :to="`/detail/${weatherData.name}`" color="secondary">
      詳細を見る
    </v-btn>
  </v-row>

  <div ref="mapContainer" style="height: 500px; margin-top: 30px;" />
</template>

<style scoped>
.full-width-icon-reset {
  display: block !important;
  width: 100% !important;
}
</style>
