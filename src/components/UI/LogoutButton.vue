<template>
  <button @click="logout">Cerrar sesión</button>
</template>

<script setup>
const logout = async () => {
  await api.post('/logout')
  localStorage.removeItem('user')
  router.push('/login')
}

</script>
