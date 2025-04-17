<template>
  <v-app-bar color="primary" dark flat style="position: static;">
    <div class="d-flex justify-space-between align-center w-100"
      style="max-width: 1920px; margin: 0 auto; padding: 0 24px;">
      <v-toolbar-title class="text-h6 font-weight-bold">
        天気予報アプリ
      </v-toolbar-title>

      <div class="text-caption text-right font-weight-bold" style="color: #cfd8dc;">
        <span>{{ today }}</span>
        <transition name="fade">
          <span class="ml-2 d-inline-block" style="width: 100px; text-align: center;">
            {{ time }}
          </span>
        </transition>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const today = new Date().toLocaleDateString('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
})

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
</script>

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
