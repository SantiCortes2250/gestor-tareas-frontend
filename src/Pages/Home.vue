<template>
  <div>
    <h1>Bienvenido a la app de tareas</h1>
    <p v-if="!user">Inicia sesión o regístrate para comenzar.</p>
    <p v-else>Hola, {{ user.name }}. Puedes ver tus <router-link to="/tasks">tareas</router-link>.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const user = computed(() => {
  const data = localStorage.getItem('user')
  return data ? JSON.parse(data) : null
})
</script>
