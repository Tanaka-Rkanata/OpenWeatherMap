<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useForecastWeather } from '~/composables/useForecastWeather'

const route = useRoute()
const city = route.params.city as string

const { current, dailyForecasts, error } = await useForecastWeather(city)

const summarizedForecast = computed(() => {
  if (!dailyForecasts || !Array.isArray(dailyForecasts)) return []

  const grouped: Record<string, string[]> = {}

  dailyForecasts.forEach(item => {
    const date = item.dt_txt.split(' ')[0]
    const desc = item.weather[0].description
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(desc)
  })

  return Object.entries(grouped).map(([date, descriptions]) => {
    const summary = [...new Set(descriptions)].join('のち')
    const icon = dailyForecasts.find(d => d.dt_txt.startsWith(date))?.weather[0].icon || '01d'
    const weekday = new Date(date).toLocaleDateString('ja-JP', {
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    })
    return { date: weekday, summary, icon }
  })
})
</script>

<template>
  <v-container>
    <h2 class="text-h5 mb-4">{{ city }} の天気予報</h2>

    <v-alert v-if="error" type="error">
      データの取得に失敗しました。
    </v-alert>

    <!-- 今日の天気 -->
    <v-card v-if="current" class="mb-6" elevation="2">
      <v-card-title>
        <img :src="`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`" alt="weather icon"
          style="width:48px; vertical-align:middle;" />
        {{ current.weather[0].description }}
      </v-card-title>
      <v-card-text>
        <img :src="`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`" alt="weather icon" />
        <p>天気: {{ current.weather[0].description }}</p>
        <p>気温: {{ current.main.temp }} ℃</p>
        <p>湿度: {{ current.main.humidity }} %</p>
        <p>風速: {{ current.wind.speed }} m/s</p>
      </v-card-text>
    </v-card>

    <!-- 一週間の天気 -->
    <v-card v-if="dailyForecasts" elevation="2" class="mt-4">
      <v-card-title>週間天気予報</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col v-for="(day, i) in summarizedForecast.slice(0, 5)" :key="i" cols="12" sm="6" md="4">
            <v-card outlined class="mb-2 text-center">
              <v-card-title>
                {{ day.date }}
              </v-card-title>
              <v-card-text>
                <img :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" alt="icon" style="width: 48px;" />
                <p>{{ day.summary }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>


    <v-btn class="mt-4" to="/" color="primary">← トップへ戻る</v-btn>
  </v-container>
</template>
