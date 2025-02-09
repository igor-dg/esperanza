import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import axios from './plugins/axios'

const app = createApp(App)
const pinia = createPinia()

// Hacer axios disponible globalmente
app.config.globalProperties.$axios = axios

// Usar tanto router como pinia
app.use(router)
app.use(pinia)
app.mount('#app')

const token = localStorage.getItem('auth_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}