<template>
  <div>
    <TaskForm @added="fetchTasks" />
    <TaskList :tasks="tasks" @updated="fetchTasks" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskForm from '../components/Tasks/TaskForm.vue'
import TaskList from '../components/Tasks/TaskList.vue'
import api from '../axios'

const tasks = ref([])

const fetchTasks = async () => {
  const { data } = await api.get('/api/tasks')
  tasks.value = data
}

onMounted(fetchTasks)
</script>
