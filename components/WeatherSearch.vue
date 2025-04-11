<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  weatherData: any
  error: any
  onSearch: (city: string) => void
}>()

const city = ref('')

function searchWeather() {
  if (!city.value || city.value.trim() === '') {
    alert('都道府県名を入力してください')
    return
  }
  props.onSearch(city.value)
  console.log('入力内容:', city.value)
}

</script>

<template>
  <div>
    <v-text-field v-model="city" label="都道府県名を日本語で入力（例：東京都）" prepend-icon="mdi-map" outlined
      class="mb-1 full-width-icon-reset" />

    <v-btn color="primary" @click="searchWeather">天気を取得</v-btn>

    <v-alert v-if="error" type="error" class="mt-4">
      {{ error.message }}
    </v-alert>

    <v-card v-if="weatherData" class="mt-4" elevation="3">
      <v-card-title>{{ weatherData.name }} の天気</v-card-title>
      <v-card-text>
        <div>天候: {{ weatherData.weather[0].description }}</div>
        <div>気温: {{ weatherData.main.temp }} ℃</div>
        <div>湿度: {{ weatherData.main.humidity }} %</div>
      </v-card-text>
    </v-card>

    <v-row justify="center" class="mt-4" v-if="weatherData">
      <v-btn :to="`/detail/${weatherData.name}`" color="secondary">
        詳細を見る
      </v-btn>
    </v-row>
  </div>
</template>

<style scoped>
.full-width-icon-reset {
  display: block !important;
  width: 100% !important;
}
</style>
