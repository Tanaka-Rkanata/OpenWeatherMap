<script setup lang="ts">
const route = useRoute()
const city = route.params.city as string
const { data, error } = await useWeather(city)
const weather = data.value as {
  name: string
  weather: { description: string }[]
  main: { temp: number; humidity: number }
}
</script>

<template>
  <v-container class="mt-6" max-width="500px">
    <v-btn variant="text" to="/" prepend-icon="mdi-arrow-left">
      戻る
    </v-btn>

    <v-alert
      v-if="error"
      type="error"
      class="mt-4"
    >
      天気情報の取得に失敗しました。
    </v-alert>

    <v-card v-if="data" class="mt-4" elevation="3">
  <v-card-title>{{ weather.name }} の詳細天気</v-card-title>
  <v-card-text>
    <div>天候: {{ weather.weather[0].description }}</div>
    <div>気温: {{ weather.main.temp }} ℃</div>
    <div>湿度: {{ weather.main.humidity }} %</div>
  </v-card-text>
</v-card>
  </v-container>
</template>

