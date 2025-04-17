<template>
  <v-footer color="primary" dark class="pa-2 mt-2">
    <v-container class="text-center">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <div class="text-caption text-white">
            &copy; {{ year }} 天気予報アプリ - All rights reserved.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
