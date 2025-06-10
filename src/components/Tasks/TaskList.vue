<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
        {{ task.title }}
      </span>
      <button @click="toggleComplete(task)">✅</button>
      <button @click="deleteTask(task.id)">🗑️</button>
    </li>
  </ul>
</template>

<script setup>
import api from '../../axios'

const props = defineProps({
  tasks: Array,
})

const emit = defineEmits(['updated'])

const toggleComplete = async (task) => {
  await api.put(`/api/tasks/${task.id}`, {
    title: task.title,
    completed: !task.completed,
  })
  emit('updated')
}

const deleteTask = async (id) => {
  await api.delete(`/api/tasks/${id}`)
  emit('updated')
}
</script>
