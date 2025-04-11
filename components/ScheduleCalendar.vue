<script setup lang="ts">
import { ref } from 'vue'
import { VCalendar } from 'vuetify/labs/VCalendar'

const selectedDate = ref<string[]>([])
const events = ref<{ name: string; start: string; color: string }[]>([])

const dialog = ref(false)
const newEvent = ref({ name: '', start: '', color: 'blue' })

function openDialog({ date }: { date: string }) {
  newEvent.value = {
    name: '',
    start: date,
    color: 'blue'
  }
  dialog.value = true
}

function addEvent() {
  if (newEvent.value.name) {
    events.value.push({ ...newEvent.value })
  }
  dialog.value = false
}
</script>
<template>
  <div style="height: 600px">
    <v-calendar v-model="selectedDate" :events="events" type="month" color="primary" locale="ja-JP"
      @click:date="openDialog" />


    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>予定を追加</v-card-title>
        <v-card-text>
          <v-text-field v-model="newEvent.name" label="イベント名" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addEvent">追加</v-btn>
          <v-spacer />
          <v-btn text @click="dialog = false">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>