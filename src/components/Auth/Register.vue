<template>
  <form @submit.prevent="handleRegister">
    <input v-model="name" placeholder="Nombre" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button type="submit">Registrarse</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import api from "../../axios";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

const handleRegister = async () => {
  try {
    await api.get("/sanctum/csrf-cookie");
    await api.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    const { data } = await api.get("/api/user");
    localStorage.setItem("user", JSON.stringify(data));
    router.push("/tasks");
  } catch (error) {
    console.error("Error en registro:", error.response?.data || error);
  }
};
</script>
