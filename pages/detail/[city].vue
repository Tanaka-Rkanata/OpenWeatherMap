<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useWeather } from '~/composables/useWeather'
import type { WeatherResponse } from '~/types/weather'


const route = useRoute()
const city = route.params.city as string

const { data, error } = await useWeather(city)
const weatherData = data.value as WeatherResponse | null
</script>


<template>
  <v-container>
    <h2 class="text-h5 mb-4">{{ city }} の詳細な天気情報</h2>

    <v-alert v-if="error" type="error">データの取得に失敗しました。</v-alert>

    <v-card v-if="weatherData" elevation="2">
      <v-card-title>
        <img :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" alt="weather" style="width:48px; vertical-align:middle;" />
        {{ weatherData.weather[0].description }}
      </v-card-title>
      <v-card-text>
        <p>気温: {{ weatherData.main.temp }} ℃</p>
        <p>体感温度: {{ weatherData.main.feels_like }} ℃</p>
        <p>湿度: {{ weatherData.main.humidity }} %</p>
        <p>気圧: {{ weatherData.main.pressure }} hPa</p>
        <p>風速: {{ weatherData.wind.speed }} m/s</p>
        <p>雲量: {{ weatherData.clouds.all }} %</p>
        <p>視程: {{ weatherData.visibility / 1000 }} km</p>
        <p>日の出: {{ new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() }}</p>
        <p>日の入り: {{ new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() }}</p>
      </v-card-text>
    </v-card>

    <v-btn class="mt-4" to="/" color="primary">← トップへ戻る</v-btn>
  </v-container>
</template>


