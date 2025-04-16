<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const selectedDate = ref<unknown[]>([])
const dialog = ref(false)

const events = ref<{ name: string; start: string; comment?: string; color: string }[]>([])

const newEvent = ref({
  name: '',
  comment: '',
  start: '',
  color: 'blue'
})

function openDialog({ date }: { date: string }) {
  console.log('クリックされた日付:', date)
  newEvent.value = {
    name: '',
    comment: '',
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

function formatEventText(event: { name: string; comment?: string }) {
  return event.comment ? `${event.name}（${event.comment}）` : event.name
}

onMounted(() => {
  const saved = localStorage.getItem('calendar-events')
  if (saved) {
    events.value = JSON.parse(saved)
  }
})

watch(events, (newEvents) => {
  localStorage.setItem('calendar-events', JSON.stringify(newEvents))
}, { deep: true })
</script>

<template>
  <div style="height: 600px">
    <v-calendar
      v-model="selectedDate"
      :events="events"
      type="week"
      color="primary"
      @click:date="openDialog"
      :event-text="formatEventText"
    />

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>予定を追加</v-card-title>
        <v-card-text>
          <v-text-field v-model="newEvent.name" label="イベント名" />
          <v-textarea v-model="newEvent.comment" label="コメント" rows="3" auto-grow />
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

