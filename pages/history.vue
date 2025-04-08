<script setup lang="ts">
import { ref } from 'vue'
const city = ref('')
const weatherData = ref<any>(null)
const error = ref<any>(null)

async function getWeather() {
  const { data, error: fetchError } = await useWeather(city.value)
  weatherData.value = data.value
  error.value = fetchError.value
}
</script>

<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">天気予報アプリ</h1>
    <input
      v-model="city"
      placeholder="都市名（例：Tokyo）"
      class="border p-2 rounded w-full mb-4"
    />
    <button @click="getWeather" class="bg-blue-500 text-white px-4 py-2 rounded">
      検索
    </button>

    <div v-if="weatherData" class="mt-6">
      <h2 class="text-lg font-semibold">{{ weatherData.name }} の天気</h2>
      <p>天候: {{ weatherData.weather[0].description }}</p>
      <p>気温: {{ weatherData.main.temp }} ℃</p>
      <p>湿度: {{ weatherData.main.humidity }} %</p>
    </div>

    <p v-if="error" class="text-red-500 mt-4">天気情報が取得できませんでした。</p>
  </div>
</template>