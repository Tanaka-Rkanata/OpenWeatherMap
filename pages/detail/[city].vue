<script setup lang="ts">
const route = useRoute()
const city = route.params.city
</script>

<template>
  <div>
    <h1>都市名: {{ city }}</h1>
  </div>
</template>
