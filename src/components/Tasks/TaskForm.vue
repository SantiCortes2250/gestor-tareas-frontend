<template>
  <n-form
    :model="form"
    label-placement="top"
    @submit.prevent="handleSubmit"
    class="space-y-4"
  >
    <n-form-item label="Título">
      <n-input v-model:value="form.title" placeholder="Ingrese un título" />
    </n-form-item>

    <n-form-item label="Descripción">
      <n-input
        v-model:value="form.description"
        type="textarea"
        placeholder="Ingrese una descripción"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
    </n-form-item>

    <n-button type="primary" attr-type="submit" block>
      {{ props.isEdit ? 'Actualizar Tarea' : 'Crear Tarea' }}
    </n-button>
  </n-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '../../axios'
import { createDiscreteApi } from "naive-ui"

const props = defineProps({
  task: Object,
  isEdit: Boolean
})

const emit = defineEmits(['saved'])

const form = ref({
  title: '',
  description: ''
})

const { message } = createDiscreteApi(["message"]);

watch(
  () => props.task,
  (task) => {
    if (props.isEdit && task) {
      form.value.title = task.title
      form.value.description = task.description
    } else {
      form.value.title = ''
      form.value.description = ''
    }
  },
  { immediate: true }
)

const handleSubmit = async () => {
  try {
    if (props.isEdit && props.task?.id) {
      await api.put(`/api/tasks/${props.task.id}`, {
        title: form.value.title,
        description: form.value.description
      })
      message.success('Tarea actualizada con éxito')
    } else {
      await api.post('/api/tasks', {
        title: form.value.title,
        description: form.value.description
      })
      message.success('Tarea creada con éxito')
    }

    emit('saved')
    form.value.title = ''
    form.value.description = ''
  } catch (error) {
    console.error('Error al guardar la tarea:', error.response?.data || error)
    message.error('Error al guardar la tarea')
  }
}
</script>
