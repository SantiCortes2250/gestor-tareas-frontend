# 📝 Gestor de Tareas - Laravel + Vue.js

Aplicación fullstack de gestión de tareas con autenticación, roles de usuario y CRUD completo. Construido con **Laravel (API REST)** y **Vue.js 3 (Frontend SPA)**.

## 🚀 Demo en vivo

🔗 [Frontend en Vercel](https://gestor-tareas-frontend.vercel.app)  
🔗 [Backend en Render](https://gestor-tareas-api.onrender.com)

## 🧰 Stack Tecnológico

- Laravel 11 + Sanctum (API y autenticación)
- Vue 3 + Vue Router (SPA)
- TailwindCSS (Estilos)
- Axios (HTTP cliente)
- SQLite / PostgreSQL (Base de datos)
- Render (Backend) + Vercel (Frontend)

## ✨ Funcionalidades

- Registro e inicio de sesión con Sanctum
- Roles: Usuario y Administrador
- CRUD de tareas: crear, editar, eliminar, marcar como completada
- Vistas separadas para usuario normal y administrador
- Validaciones, alertas y filtros de estado

## 🖼️ Capturas

![Pantalla principal](./screenshots/dashboard.png)
![Formulario de login](./screenshots/login.png)

## 📦 Instalación

### Backend

```bash
git clone https://github.com/tuusuario/gestor-tareas-api.git
cd gestor-tareas-api
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
