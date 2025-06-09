<template>
  <div class="p-6 max-w-sm mx-auto">
    <h1 class="text-xl mb-4">Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="mb-2 p-2 w-full border" />
      <input v-model="password" type="password" placeholder="Contraseña" class="mb-4 p-2 w-full border" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Entrar</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    await api.get('/sanctum/csrf-cookie') // CSRF setup para Sanctum
    await api.post('/login', { email: email.value, password: password.value })
    router.push('/')
  } catch (err) {
    error.value = 'Credenciales incorrectas'
  }
}
</script>
