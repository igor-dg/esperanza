// src/plugins/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Lista de rutas que requieren autenticación
const protectedRoutes = [
  '/content.php',  // Solo para peticiones POST
  '/admin-content.php'
]

// Interceptor para agregar el token solo cuando sea necesario
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    const isProtectedRoute = protectedRoutes.some(route => 
      config.url?.includes(route) && config.method === 'post'
    )
    
    if (token && isProtectedRoute) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance