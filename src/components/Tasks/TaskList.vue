<template>
  <n-card title="Lista de Tareas" class="mt-4">
    <n-data-table
      :columns="columns"
      :data="tasks"
      :bordered="true"
      :pagination="pagination"
      class="mb-6"
    />

    <!-- Modal para editar/crear -->
    <n-modal v-model:show="showModal" title="Tarea" preset="dialog">
      <TaskForm :task="selectedTask" :isEdit="isEdit" @saved="onSaved" />
    </n-modal>
  </n-card>
</template>

<script setup>
import { ref, onMounted, h } from "vue";
import api from "../../axios";
import TaskForm from "./TaskForm.vue";
import { NButton, useDialog } from "naive-ui";
import { createDiscreteApi } from "naive-ui"

const tasks = ref([]);
const selectedTask = ref(null);
const isEdit = ref(false);
const showModal = ref(false);
const { message } = createDiscreteApi(["message"]);
const dialog = useDialog(); // para mostrar confirmación de eliminación

const fetchTasks = async () => {
  try {
    const { data } = await api.get("/api/tasks");
    tasks.value = data;
    isEdit.value = false;
    selectedTask.value = null;
  } catch (error) {
    console.error("Error al obtener tareas:", error.response?.data || error);
  }
};

const remove = async (id) => {
  try {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  } catch (error) {
    console.error("Error al eliminar tarea:", error.response?.data || error);
  }
};

const confirmDelete = (id) => {
  dialog.warning({
    title:'Confirmar eliminación',
    content: '¿Estás seguro de que deseas eliminar esta tarea?',
    positiveText: 'Sí, eliminar',
    negativeText: 'Cancelar',
    draggable: true,
    onPositiveClick: () => {
      remove(id);
      message.success("Tarea eliminada con éxito");
    },
    onNegativeClick: () => {
      message.error("Eliminación cancelada");
    },
  });
};

const edit = (task) => {
  selectedTask.value = task;
  isEdit.value = true;
  showModal.value = true;
};

const onSaved = () => {
  showModal.value = false;
  fetchTasks();
};

// Columnas para la tabla
const columns = [
  {
    title: "ID",
    key: "id",
    width: 60,
  },
  {
    title: "Título",
    key: "title",
  },
  {
    title: "Descripción",
    key: "description",
  },
  {
    title: "Acciones",
    key: "actions",
    width: 180,
    render(row) {
      return [
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: "margin-right: 8px",
            onClick: () => edit(row),
          },
          { default: () => "Editar" }
        ),
        h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => confirmDelete(row.id),
          },
          { default: () => "Eliminar" }
        ),
      ];
    },
  },
];

const pagination = {
  pageSize: 5,
};

onMounted(fetchTasks);
</script>
