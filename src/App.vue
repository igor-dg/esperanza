<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow hidden sm:block">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Navigation Links -->
            <div class="sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-for="link in navigationLinks"
                :key="link.to"
                :to="link.to"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary border-b-2 border-primary.light transition-colors duration-200"
                :class="[route.path === link.to ? 'border-primary-light text-primary-light' : 'border-transparent hover:border-primary-light hover:text-primary']"
              >
                {{ link.text }}
              </router-link> 
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Floating Mobile Menu Button -->
    <button 
      class="sm:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-accent text-white shadow-lg hover:bg-accent-dark transition-colors duration-200" 
      @click="toggleMenu"
    >
      <MenuIcon class="w-6 h-6" />
    </button>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMenuOpen" 
      class="sm:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300"
      @click="isMenuOpen = false"
    ></div>

    <!-- Mobile Menu Panel -->
    <div 
      v-if="isMenuOpen" 
      class="sm:hidden fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300"
    >
      <div class="pt-16 px-4">
        <router-link
          v-for="link in navigationLinks"
          :key="link.to"
          :to="link.to"
          class="block py-2 text-gray-900 font-medium hover:text-accent-dark transition-colors duration-200"
          @click="isMenuOpen = false"
        >
          {{ link.text }}
        </router-link>
      </div>
    </div>

    <!-- Page Content -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-[var(--color-accent-dark)] border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex space-x-6 md:order-2">
            <a 
              href="mailto:calleesperanzakalea@gmail.com" 
              class="text-gray-300 hover:text-primary transition-colors duration-200"
            >
              calleesperanzakalea@gmail.com
            </a>
          </div>
          <p class="mt-8 text-base text-gray-300 md:mt-0 md:order-1">
            ©idg 2025 Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Menu as MenuIcon } from 'lucide-vue-next';
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const navigationLinks = [
  { to: '/', text: 'Inicio' },
  { to: '/trafico', text: 'Datos y Análisis' },
  { to: '/documents', text: 'Documentación' },
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