<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import api from '../../axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await api.get('/sanctum/csrf-cookie')
  await api.post('/login', { email: email.value, password: password.value })
  const { data } = await api.get('/api/user')
  localStorage.setItem('user', JSON.stringify(data))
  router.push('/tasks')
}
</script>
