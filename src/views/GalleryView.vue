<!-- src/views/GalleryView.vue -->
<template>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Cabecera de la página -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-primary-dark">Documentación Visual</h1>
        <p class="mt-2 text-lg text-primary">Evidencia fotográfica de los problemas generados por el cambio de sentido</p>
      </div>
  
      <!-- Usar el componente mejorado -->
      <EnhancedGallery v-if="!loading && !error" />
      
      <!-- Estado de carga -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-primary">Cargando imágenes...</p>
      </div>
  
      <!-- Estado de error -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600">{{ error }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useGalleryStore } from '@/stores/galleryStore'
  import { normalizeImageUrl } from '@/utils/normalizeImageUrl.js'
  import EnhancedGallery from '@/components/EnhancedGallery.vue'
  
  export default {
    name: 'GalleryView',
    components: {
    EnhancedGallery
  },
  setup() {
    // Usar el store de galería
    const galleryStore = useGalleryStore()
    
    // Obtener referencias a las propiedades del store
    const loading = computed(() => galleryStore.loading)
    const error = computed(() => galleryStore.error)
    
    onMounted(async () => {
      // Cargar imágenes desde el store si no están ya cargadas
      if (galleryStore.images.length === 0) {
        await galleryStore.loadGalleryImages()
      }
    })
    
    return {
      loading,
      error
    }
  }
}
</script>