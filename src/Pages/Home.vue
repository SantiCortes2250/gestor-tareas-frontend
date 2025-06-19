<template>
  <n-layout  style="height: 100vh">
     <!-- NAVBAR -->
      <n-layout-header
        bordered
        class="flex justify-between items-center px-6 py-3"
      >
        <!-- Logo -->
        <div class="flex items-center gap-2 text-xl font-bold">
          <img src="/src/assets/images/logo.png" alt="logo" class="w-15 h-15" />
           Bienvenido, {{ user?.name ?? "Invitado" }}
        </div>

        <!-- Logout -->
        <n-button
          circle
          strong
          secondary
          type="error"
          @click="confirmLogout"
        >
          <template #icon>
            <n-icon>
              <LogoutIcon />
            </n-icon>
          </template>
        </n-button>
      </n-layout-header>
    <!-- SIDEBAR -->
     <n-flex>
      
       <n-layout-sider width="280" bordered content-style="padding: 12px;">
         <n-menu
           :options="menuOptions"
           :value="activeMenu"
           @update:value="(key) => (activeMenu = key)"
         />
       </n-layout-sider>
       <!-- MAIN LAYOUT -->
       <n-layout>
         <!-- CONTENIDO -->
         <n-layout-content class="p-6 overflow-y-auto">
           <component :is="componentMap[activeMenu]" />
         </n-layout-content>
       </n-layout>
     </n-flex>
  </n-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { LogOutOutline as LogoutIcon } from '@vicons/ionicons5'

import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  NButton,
  NIcon,
  useDialog
} from 'naive-ui'

import TaskList from '@/components/Tasks/TaskList.vue'
import TaskForm from '@/components/Tasks/TaskForm.vue'

// Estado
const router = useRouter()
const dialog = useDialog()
const activeMenu = ref('list')
const user = ref(JSON.parse(localStorage.getItem('user')) || { name: 'Invitado' })

// Opciones del menú lateral
const menuOptions = [
  {
    label: 'Ver Tareas',
    key: 'list',
  },
  {
    label: 'Crear Tarea',
    key: 'create',
  }
]

// Relación entre menú y componente
const componentMap = {
  list: TaskList,
  create: TaskForm,
}

// Confirmación de cierre de sesión
const confirmLogout = () => {
  dialog.warning({
    title: 'Cerrar sesión',
    content: '¿Estás seguro que deseas cerrar sesión?',
    positiveText: 'Sí, cerrar',
    negativeText: 'Cancelar',
    onPositiveClick: () => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      router.push('/')
    }
  })
}
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
