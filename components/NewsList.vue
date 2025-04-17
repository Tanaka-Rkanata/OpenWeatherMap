<script setup lang="ts">
defineProps<{ newsData: any }>()
</script>

<template>
  <v-card class="" elevation="2">
    <v-card-title class="text-h6 font-weight-bold">最新ニュース</v-card-title>
    <v-divider />
    <v-list v-if="newsData?.articles">
      <v-list-item v-for="(article, i) in newsData.articles" :key="i">
        {{ article.title }}
      </v-list-item>
    </v-list>
  </v-card>
</template>
