<template>
  <div class="login-page">
    <h2>Iniciar Sesión</h2>
    <Login />
    <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
  </div>
</template>

<script setup>
import Login from '@/components/Auth/Login.vue';
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>
