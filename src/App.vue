<template>
  <div id="app">
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/tasks" v-if="user">Mis Tareas</router-link>
      <router-link to="/login" v-if="!user">Iniciar Sesión</router-link>
      <router-link to="/register" v-if="!user">Registrarse</router-link>
      <button v-if="user" @click="logout">Cerrar Sesión</button>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from './axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  const data = localStorage.getItem('user')
  if (data) {
    user.value = JSON.parse(data)
  }
})

const logout = async () => {
  await api.post('/logout')
  localStorage.removeItem('user')
  user.value = null
  router.push('/login')
}
</script>

<style scoped>
nav {
  background: #f5f5f5;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

main {
  padding: 2rem;
}
</style>
