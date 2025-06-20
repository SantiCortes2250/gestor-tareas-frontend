import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Pages/Home.vue'
import Login from '../Pages/Login.vue'
import Register from '../Pages/Register.vue'


const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
