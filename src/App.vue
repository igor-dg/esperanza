<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            
            <!-- Navigation Links -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
    <router-link
      v-for="link in navigationLinks"
      :key="link.to"
      :to="link.to"
      class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 transition-colors duration-200"
      :class="[route.path === link.to ? 'border-primary text-primary-dark' : 'border-transparent hover:border-primary-light hover:text-primary']"
    >
      {{ link.text }}
    </router-link>
  </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state -->
      <div class="sm:hidden">
    <div class="pt-2 pb-3 space-y-1">
      <router-link
        v-for="link in navigationLinks"
        :key="link.to"
        :to="link.to"
        class="block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
        :class="[route.path === link.to ? 'bg-primary-lighter text-primary-dark border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-primary']"
      >
        {{ link.text }}
      </router-link>
    </div>
  </div>
    </nav>

    <!-- Page Content -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex space-x-6 md:order-2">
            <a 
              href="mailto:calleesperanzakalea@gmail.com" 
              class="text-gray-500 hover:text-primary transition-colors duration-200"
            >
              calleesperanzakalea@gmail.com
            </a>
          </div>
          <p class="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
            © 2025 Iniciativa Vecinal Calle La Esperanza. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const navigationLinks = [
  { to: '/', text: 'Inicio' },
  { to: '/documents', text: 'Documentación' },
  { to: '/data', text: 'Datos y Análisis' },
  { to: '/legal', text: 'Marco Legal' },
  { to: '/contact', text: 'Contacto' },
  { to: '/admin/content', text: 'Gestor de contenidos' }
]
</script>

<style scoped>
.router-link-active {
  color: var(--color-primary-dark);
}

/* Smooth page transitions */
:deep(.fade-enter-active),
:deep(.fade-leave-active) {
  transition: opacity 0.3s ease;
}

:deep(.fade-enter-from),
:deep(.fade-leave-to) {
  opacity: 0;
}
</style>