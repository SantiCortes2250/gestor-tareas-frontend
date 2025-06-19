<template>
  <button @click="logout">Cerrar sesión</button>
</template>

<script setup>
import api from '../../axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
  try {
    await api.post('/api/logout');

    // Elimina el token y el usuario del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirige al login
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.response?.data || error);
  }
};
</script>