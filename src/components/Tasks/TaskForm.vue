<template>
  <form @submit.prevent="addTask">
    <input v-model="title" placeholder="Nueva tarea" />
    <button type="submit">Agregar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import api from '../../axios'

const title = ref('')
const emit = defineEmits(['added'])

const addTask = async () => {
  if (!title.value.trim()) return
  await api.post('/api/tasks', { title: title.value })
  title.value = ''
  emit('added') // notifica al padre que se agregó una tarea
}
</script>
