<!-- src/views/HomeView.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Modal de información de reunión -->
    <MeetingModal />
    
    <!-- Hero Section -->
    <div class="bg-primary-lighter">
      <div class="max-w-7xl mx-auto pt-2 pb-16 md:pt-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex justify-center">
            <img src="/logo.svg" alt="Calle La Esperanza Logo" class="h-96 w-auto"/>
          </div>
          <h1 class="text-4xl font-bold text-primary-dark sm:text-5xl md:text-6xl">
            Calle La Esperanza
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-primary sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Portal informativo sobre el proceso de modificación del sentido de circulación
          </p>
        </div>
      </div>
    </div>

    <!-- Sección de Reunión -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <MeetingSection />
    </div>

    <!-- Situación Actual -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl">
          Situación Actual
        </h2>
        <p class="mt-4 max-w-2xl text-xl text-primary lg:mx-auto">
          El cambio de sentido está generando problemas significativos que requieren una solución urgente
        </p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <!-- Congestión -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-primary-dark">Aumento del tráfico</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-primary">
              La Calle Francia ha experimentado un aumento del 23% en el tráfico durante los dos últimos años, alcanzando 3.710.206 vehículos en 2024.
            </dd>
          </div>

          <!-- Seguridad -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-primary-dark">Riesgos de seguridad</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-primary">
              Se han generado puntos conflictivos para peatones y conductores, especialmente en la zona peatonal cercana al Artium.
            </dd>
          </div>

          <!-- Impacto ZBE -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-primary-dark">Impacto en la ZBE</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-primary">
              La medida contradice el Real Decreto 1052/2022 sobre Zonas de Bajas Emisiones, que busca evitar la concentración de tráfico en áreas adyacentes.
            </dd>
          </div>

          <!-- Participación -->
          <div class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-primary-dark">Falta de participación</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-primary">
              No hubo un proceso de participación ciudadana efectivo, y muchos vecinos se enteraron del cambio tras su implementación.
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Documentación Section -->
    <div class="bg-primary-lighter">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-primary-light sm:text-4xl">
          <span class="block">Documentación completa</span>
          <span class="block text-primary-dark">Accede a toda la información del proceso</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <router-link
              to="/documents"
              class="btn btn-primary"
            >
              Ver documentación
            </router-link>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <router-link
              to="/contact"
              class="btn btn-outline"
            >
              Contacto
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Galería Section -->
    <div class="bg-primary-lighter">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 class="text-3xl font-extrabold text-primary-dark sm:text-4xl">
              Galería de imágenes
            </h2>
            <p class="mt-3 max-w-3xl text-lg text-primary">
              Estamos documentando fotográficamente el impacto del cambio de sentido. Las imágenes muestran la congestión, problemas de seguridad y otros efectos negativos generados por esta modificación.
            </p>
            <div class="mt-8">
              <div class="inline-flex rounded-md shadow">
                <router-link
                  to="/galeria"
                  class="btn btn-primary inline-flex items-center"
                >
                  Ver galería
                  <svg class="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
          
          <!-- Grid de miniaturas dinámicas -->
          <div class="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:ml-8">
            <div v-if="loading" class="col-span-full py-10 flex items-center justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
            
            <template v-else>
              <!-- Mostrar hasta 5 imágenes de la galería -->
              <div 
                v-for="(image, index) in galleryPreview" 
                :key="image.id"
                class="col-span-1 flex justify-center py-8 px-8 bg-white rounded-lg shadow-md"
              >
                <div class="h-20 w-20 rounded-lg overflow-hidden relative bg-gray-200">
                  <img 
                    :src="getImageUrl(image.thumbnailUrl)" 
                    :alt="image.title || `Imagen ${index + 1}`" 
                    class="h-full w-full object-cover"
                    @error="handleImageError"
                  />
                </div>
              </div>
              
              <!-- "Ver más" para el último espacio -->
              <div class="col-span-1 flex justify-center py-8 px-8 bg-white rounded-lg shadow-md group relative overflow-hidden">
                <div class="h-20 w-20 rounded-lg flex items-center justify-center bg-primary-lighter">
                  <span class="text-primary font-bold text-2xl">+</span>
                </div>
                <router-link 
                  to="/galeria" 
                  class="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span class="text-white font-medium">Ver más</span>
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Section -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <NewsGrid />
    </div>
  </div>
</template>

<script>
import NewsGrid from '../components/NewsGrid.vue'
import MeetingModal from '../components/MeetingModal.vue'
import MeetingSection from '../components/MeetingSection.vue'
import { ref, computed, onMounted } from 'vue'
import { useContentStore } from '@/stores/content'
import { useGalleryStore } from '@/stores/galleryStore'
import { normalizeImageUrl } from '@/utils/normalizeImageUrl.js'

export default {
  name: 'HomeView',
  components: {
    NewsGrid,
    MeetingModal,
    MeetingSection
  },
  setup() {
    const contentStore = useContentStore()
    const galleryStore = useGalleryStore()
    const loading = ref(true)
    
    // Obtener una vista previa de la galería (5 imágenes como máximo)
    const galleryPreview = computed(() => {
      // Tomar hasta 5 imágenes de la galería
      return galleryStore.images.slice(0, 5);
    });

    // Función para normalizar URLs de imágenes
    const getImageUrl = (path) => {
  return normalizeImageUrl(path, {
    baseUrl: import.meta.env.VITE_ASSETS_URL
  });
};

    // Manejar errores de carga de imágenes
    const handleImageError = (event) => {
      event.target.src = '/images/placeholder-image.jpg';
    };
    
    onMounted(async () => {
      // Cargar el contenido para asegurar que tenemos la configuración más reciente
      loading.value = true
      try {
        await contentStore.loadContent()
        await galleryStore.loadGalleryImages()
      } catch (error) {
        console.error('Error al cargar contenido:', error)
      } finally {
        loading.value = false
      }
    })
    
    return {
      galleryPreview,
      loading,
      getImageUrl,
      handleImageError
    }
  }
}
</script>