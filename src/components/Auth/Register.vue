<template>
  <div class="flex justify-center items-center min-h-screen">
    <n-card style="width: 400px" title="Registrarse" bordered class="shadow-xl rounded-4xl">
      <n-form @submit.prevent="handleRegister" :model="form" :rules="rules" ref="formRef">
        <n-form-item label="Nombre" path="name">
          <n-input v-model:value="form.name" placeholder="Tu nombre" />
        </n-form-item>

        <n-form-item label="Email" path="email">
          <n-input v-model:value="form.email" placeholder="correo@ejemplo.com" />
        </n-form-item>

        <n-form-item label="Contraseña" path="password">
          <n-input v-model:value="form.password" type="password" show-password-on="click" />
        </n-form-item>

        <n-button type="primary" block attr-type="submit" :loading="loading">
          Registrarse
        </n-button>
      </n-form>
      <p class="py-4">¿Ya tienes cuenta? <router-link to="/" class="text-green-700 underline">Inicia sesión</router-link></p>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createDiscreteApi } from "naive-ui"
import { useRouter } from "vue-router";
import api from "../../axios";

const router = useRouter();
const { message } = createDiscreteApi(["message"]);

const formRef = ref(null);
const loading = ref(false);
const form = ref({
  name: "",
  email: "",
  password: "",
});

const rules = {
  name: { required: true, message: "Nombre obligatorio", trigger: "blur" },
  email: [
    { required: true, message: "Correo obligatorio", trigger: "blur" },
    { type: "email", message: "Correo inválido", trigger: "blur" },
  ],
  password: { required: true, message: "Contraseña requerida", trigger: "blur" },
};

const handleRegister = async () => {
  await formRef.value?.validate(async (errors) => {
    if (errors) return;

    loading.value = true;
    try {
      const response = await api.post("/api/register", form.value);

      const token = response.data.access_token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      message.success("Registro exitoso. Redirigiendo...");
      router.push("/home");
    } catch (error) {
      message.error(error.response?.data?.message || "Error al registrar");
    } finally {
      loading.value = false;
    }
  });
};
</script>
