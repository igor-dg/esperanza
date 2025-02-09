<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Panel de Gestión
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="password" class="sr-only">Contraseña</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                :disabled="loading"
              />
            </div>
          </div>
  
          <div v-if="error" class="text-red-600 text-sm text-center">
            {{ error }}
          </div>
  
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              :disabled="loading"
            >
              <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? 'Accediendo...' : 'Acceder' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { auth } from '@/services/auth'
  
  export default {
    name: 'LoginView',
    setup() {
      const router = useRouter()
      const password = ref('')
      const error = ref('')
      const loading = ref(false)

      onMounted(async () => {
        if (await auth.checkAuth()) {
          router.push('/admin/content')
        }
      })
  
      const handleLogin = async () => {
        error.value = ''
        loading.value = true
  
        try {
          const loginResponse = await auth.login(password.value)
          console.log('Login exitoso, redirigiendo...')
          
          // Intentar la redirección directamente después del login exitoso
          await router.push('/admin/content')
        } catch (e) {
          console.error('Error durante el login:', e)
          error.value = e.response?.data?.error || 'Error al iniciar sesión'
          loading.value = false
        }
      }
  
      return {
        password,
        error,
        loading,
        handleLogin
      }
    }
  }
  </script>