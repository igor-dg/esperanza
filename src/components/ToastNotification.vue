<!-- ToastNotification.vue -->
<template>
    <TransitionGroup 
      name="toast"
      tag="div"
      class="fixed bottom-4 right-4 z-50 space-y-2"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center p-4 rounded-lg shadow-lg min-w-[300px] transform transition-all duration-300"
        :class="[
          toast.type === 'success' ? 'bg-green-50 text-green-800' :
          toast.type === 'error' ? 'bg-red-50 text-red-800' :
          'bg-blue-50 text-blue-800'
        ]"
      >
        <!-- Icono -->
        <div class="flex-shrink-0 mr-3">
          <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5 text-green-500" />
          <XCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-500" />
          <Info v-else class="w-5 h-5 text-blue-500" />
        </div>
  
        <!-- Mensaje -->
        <div class="flex-1 mr-2">
          {{ toast.message }}
        </div>
  
        <!-- Botón cerrar -->
        <button 
          @click="removeToast(toast.id)"
          class="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </template>
  
  <script>
  import { CheckCircle, XCircle, Info, X } from 'lucide-vue-next'
  
  export default {
    name: 'ToastNotification',
    components: {
      CheckCircle,
      XCircle,
      Info,
      X
    },
    data() {
      return {
        toasts: []
      }
    },
    methods: {
      show(message, type = 'info', duration = 3000) {
        const id = Date.now()
        this.toasts.push({ id, message, type })
        
        // Auto-remove after duration
        setTimeout(() => {
          this.removeToast(id)
        }, duration)
      },
      removeToast(id) {
        const index = this.toasts.findIndex(toast => toast.id === id)
        if (index > -1) {
          this.toasts.splice(index, 1)
        }
      },
      success(message, duration) {
        this.show(message, 'success', duration)
      },
      error(message, duration) {
        this.show(message, 'error', duration)
      },
      info(message, duration) {
        this.show(message, 'info', duration)
      }
    }
  }
  </script>
  
  <style scoped>
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }
  
  .toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }
  
  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  </style>