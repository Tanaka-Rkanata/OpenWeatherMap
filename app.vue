<script setup lang="ts">
import { ref } from 'vue'
import header from './components/Header.vue'
import WeatherSearch from '~/components/WeatherSearch.vue'
import NewsList from '~/components/NewsList.vue'
import ScheduleCalendar from '~/components/ScheduleCalendar.vue'
</script>

<template>
  <v-app class="d-flex flex-column fill-height">
    <Header />

    <v-main class="flex-grow-1 pa-0 ma-0" >
      <v-container style="max-width: 1920px;">
        <NuxtPage />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

