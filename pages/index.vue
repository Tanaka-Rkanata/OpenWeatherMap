<script setup lang="ts">
import { ref } from 'vue'
import WeatherSearch from '~/components/WeatherSearch.vue'
import NewsList from '~/components/NewsList.vue'
import ScheduleCalendar from '~/components/ScheduleCalendar.vue'

const city = ref('')
const weatherData = ref<any>(null)
const error = ref<any>(null)
const { data: newsData, error: newsError } = await useNews()

async function getWeather(city: string) {
  console.log('親で受け取った city:', city)
  const location = await useCity(city)

  if (!location) {
    error.value = { message: '都道府県が見つかりませんでした。' }
    weatherData.value = null
    return
  }

  const config = useRuntimeConfig()
  const apiKey = config.public.openWeatherApiKey
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric&lang=ja`

  const { data, error: fetchError } = await useFetch(url)
  weatherData.value = data.value
  error.value = fetchError.value
}
</script>

<template>
  <v-container class="mt-6" max-width="600px">
    <WeatherSearch :weatherData="weatherData" :error="error" :onSearch="getWeather" />

    <NewsList :news-data="newsData" />

    <ScheduleCalendar />
  </v-container>
</template>

<style scoped>
.full-width-icon-reset {
  display: block !important;
  width: 100% !important;
}
</style>