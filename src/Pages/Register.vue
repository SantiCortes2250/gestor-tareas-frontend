<template>
  <div>
    <h2>Registro</h2>
    <Register />
    <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
  </div>
</template>

<script setup>
import Register from '@/components/Auth/Register.vue';
</script>
