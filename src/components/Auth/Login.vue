<template>
  <div class="flex justify-center items-center min-h-screen">

    <n-card title="Iniciar Sesión" class="max-w-md mx-auto shadow-xl rounded-4xl">
      <n-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-placement="top"
      >
        <n-form-item label="Correo" path="email">
          <n-input
            v-model:value="form.email"
            placeholder="Correo electrónico"
          >
            <template #prefix>
              <n-icon>
                <mail-outline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
  
        <n-form-item label="Contraseña" path="password">
          <n-input
            v-model:value="form.password"
            type="password"
            placeholder="Contraseña"
            show-password-on="mousedown"
          >
            <template #prefix>
              <n-icon>
                <lock-closed-outline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
  
        <n-button
          type="primary"
          block
          :loading="loading"
          @click="handleLogin"
        >
          Iniciar sesión
        </n-button>
      </n-form>
       <p class="py-4">¿No tienes cuenta? <router-link to="/register" class="text-green-700 underline">Regístrate aquí</router-link></p>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { createDiscreteApi } from "naive-ui"
import { MailOutline, LockClosedOutline } from "@vicons/ionicons5"
import api from "../../axios"

const router = useRouter()
const { message } = createDiscreteApi(["message"])
const formRef = ref(null)
const loading = ref(false)

const form = ref({
  email: "",
  password: "",
})

const rules = {
  email: {
    required: true,
    message: "El correo es obligatorio",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "La contraseña es obligatoria",
    trigger: "blur",
  },
}

const handleLogin = async () => {
  await formRef.value?.validate(async (errors) => {
    if (errors) return
    try {
      loading.value = true
      const res = await api.post("/api/login", {
        email: form.value.email,
        password: form.value.password,
      })

      const token = res.data.access_token
      const user = res.data.user

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      message.success("Inicio de sesión exitoso")
      router.push("/home")
    } catch (error) {
      message.error("Credenciales inválidas")
    } finally {
      loading.value = false
    }
  })
}
</script>
