// src/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000', // cambia si usas otra URL
  withCredentials: true
})

export default api
