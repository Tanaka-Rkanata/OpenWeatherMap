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
  <v-container class="mt-6" max-width="500px">
    <v-text-field
      v-model="city"
      label="都市名を入力"
      prepend-icon="mdi-city"
      outlined
      class="mb-4"
    />

    <v-btn color="primary" @click="getWeather">天気を取得</v-btn>

    <v-alert
      v-if="error"
      type="error"
      class="mt-4"
    >
      天気情報が取得できませんでした。
    </v-alert>

    <v-card v-if="weatherData" class="mt-4" elevation="3">
      <v-card-title>{{ weatherData.name }} の天気</v-card-title>
      <v-card-text>
        <div>天候: {{ weatherData.weather[0].description }}</div>
        <div>気温: {{ weatherData.main.temp }} ℃</div>
        <div>湿度: {{ weatherData.main.humidity }} %</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
