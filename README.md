# 📝 Gestor de Tareas - Vue.js + Laravel

Aplicación **Fullstack** de gestión de tareas construida con **Vue 3** en el frontend y **Laravel 11 API REST** como backend. Implementa autenticación basada en **tokens** usando Laravel Sanctum.

## 🚀 Demo en Vivo

🔗 **Frontend:** [https://tasks3-app.netlify.app](https://tasks3-app.netlify.app)  
🔗 **Backend (API):** [https://laravel-api-nj2d.onrender.com/api/status](https://laravel-api-nj2d.onrender.com/api/status)

---

## 🧱 Stack Tecnológico

- ✅ **Vue 3** + **Vue Router** (SPA)
- ✅ **TailwindCSS** (Estilos)
- ✅ **Axios** (HTTP cliente)
- ✅ **Laravel 11** + **Sanctum** (API y autenticación con tokens)
- ✅ **PostgreSQL** (Base de datos en producción)
- ✅ **Render** (Backend)
- ✅ **Netlify** (Frontend)

---

## ✨ Funcionalidades

- 🔐 Registro e inicio de sesión autenticado con tokens
- 🧑‍🤝‍🧑 Roles: Usuario y Administrador
- ✅ CRUD completo de tareas:
  - Crear nueva tarea
  - Editar
  - Eliminar
  - Marcar como completada
- 👁️‍🗨️ Vistas diferenciadas según rol
- ⚠️ Validaciones y mensajes de error amigables
- 🔎 Filtros por estado (completadas / pendientes)

---


![Dashboard](./screenshots/dashboard.png)
![Login](./screenshots/login.png)

---

## 🛠️ Instalación Local (Desarrolladores)

### 📦 Frontend

```bash
git clone https://github.com/tuusuario/gestor-tareas-frontend.git
cd gestor-tareas-frontend
npm install
npm run dev
