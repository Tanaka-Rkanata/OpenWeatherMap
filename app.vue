<script setup lang="ts">
import { ref } from 'vue'
import WeatherSearch from '~/components/WeatherSearch.vue'
import NewsList from '~/components/NewsList.vue'
import ScheduleCalendar from '~/components/ScheduleCalendar.vue'

const weatherData = ref<any>(null)
const error = ref<any>(null)

// 日付
const today = new Date().toLocaleDateString('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
})

// 時刻
const time = ref('')
onMounted(() => {
  setInterval(() => {
    time.value = new Date().toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }, 1000)
})

const getWeather = async (city: string) => {
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

const { data: newsData } = await useNews()
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark flat>
      <div class="d-flex justify-space-between align-center w-100"
        style="max-width: 1920px; margin: 0 auto; padding: 0 24px;">
        <v-toolbar-title class="text-h6 font-weight-bold">
          天気予報アプリ
        </v-toolbar-title>

        <div class="text-caption text-right font-weight-bold" style="color: #cfd8dc;">
          <span class="">{{ today }}</span>
          <transition name="fade">
            <span class="ml-2 d-inline-block" style="width: 100px; text-align: center;">
              {{ time }}
            </span>
          </transition>
        </div>
      </div>
    </v-app-bar>


    <v-main>
      <v-container style="max-width: 1920px;">
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
