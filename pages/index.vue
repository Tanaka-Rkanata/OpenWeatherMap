<script setup lang="ts">
import { ref } from 'vue'
import WeatherSearch from '~/components/WeatherSearch.vue'
import NewsList from '~/components/NewsList.vue'
import ScheduleCalendar from '~/components/ScheduleCalendar.vue'

const weatherData = ref<any>(null)
const error = ref<any>(null)
const { data: newsData } = await useNews()

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
  <v-container fluid class="mt-4">
    <v-row dense align="start" justify="space-around">

      <v-col cols="12" md="3" class="px-2">
        <WeatherSearch :weatherData="weatherData" :error="error" :onSearch="getWeather" />
      </v-col>

      <v-col cols="12" md="4" class="px-2">
        <NewsList :news-data="newsData" />
      </v-col>

      <v-col cols="12" md="5" class="px-2">
        <ScheduleCalendar />
      </v-col>
    </v-row>
  </v-container>
</template>
