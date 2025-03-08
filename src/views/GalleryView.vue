<!-- src/views/GalleryView.vue -->
<template>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Cabecera de la página -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-primary-dark">Documentación Visual</h1>
        <p class="mt-2 text-lg text-primary">Evidencia fotográfica de los problemas generados por el cambio de sentido</p>
      </div>
  
      <!-- Estado de carga -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-primary">Cargando imágenes...</p>
      </div>
  
      <!-- Estado de error -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600">{{ error }}</div>
      </div>
  
      <!-- Filtros de categorías -->
      <div v-if="!loading && !error" class="mb-8">
        <div class="flex flex-wrap gap-2">
          <button
            @click="activeTag = 'all'"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="[
              activeTag === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-lighter hover:text-primary'
            ]"
          >
            Todas
          </button>
          <button
            v-for="tag in availableTags"
            :key="tag"
            @click="activeTag = tag"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="[
              activeTag === tag
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-lighter hover:text-primary'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
  
      <!-- Galería de imágenes -->
      <div v-if="!loading && !error && filteredImages.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(image, index) in filteredImages"
          :key="image.id"
          class="relative group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
          @click="openLightbox(index)"
        >
          <!-- Imagen con efecto hover -->
          <div class="aspect-square overflow-hidden">
            <img
              :src="image.thumbnailUrl"
              :alt="image.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <!-- Overlay con información -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 class="text-white font-medium text-sm">{{ image.title }}</h3>
            <div class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in image.tags"
                :key="tag"
                class="text-xs px-2 py-0.5 bg-primary/80 text-white rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Mensaje de no resultados -->
      <div v-else-if="!loading && !error && !filteredImages.length" class="text-center py-12">
        <p class="text-primary">No se encontraron imágenes para la categoría seleccionada.</p>
      </div>
  
      <!-- Componente Lightbox (modal para ver imágenes ampliadas) -->
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        @click.self="closeLightbox"
      >
        <div class="relative max-w-6xl max-h-[90vh] px-4 py-4">
          <!-- Botones de navegación -->
          <button
            v-if="filteredImages.length > 1"
            @click.stop="prevImage"
            class="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-r-lg z-10 hover:bg-black/80"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            v-if="filteredImages.length > 1"
            @click.stop="nextImage"
            class="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-l-lg z-10 hover:bg-black/80"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
  
          <!-- Botón de cierre -->
          <button
            @click.stop="closeLightbox"
            class="absolute top-4 right-4 text-white hover:text-red-500 z-10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
  
          <!-- Imagen actual -->
          <div class="flex flex-col items-center">
            <img
              v-if="currentImage"
              :src="currentImage.imageUrl"
              :alt="currentImage.title"
              class="max-h-[75vh] max-w-full object-contain"
            />
            
            <!-- Información de la imagen -->
            <div class="mt-4 text-white bg-black/50 p-4 rounded-lg w-full max-w-2xl">
              <h3 class="text-xl font-bold">{{ currentImage?.title }}</h3>
              <p class="text-sm text-gray-300 mt-1">{{ currentImage?.date }}</p>
              <p class="mt-2">{{ currentImage?.description }}</p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span
                  v-for="tag in currentImage?.tags"
                  :key="tag"
                  class="text-xs px-2 py-1 bg-primary text-white rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useGalleryStore } from '@/stores/galleryStore'
  
  export default {
    name: 'GalleryView',
    setup() {
      // Usar el store de galería
      const galleryStore = useGalleryStore()
      
      // Estado local
      const activeTag = ref('all')
      const lightboxOpen = ref(false)
      const currentImageIndex = ref(0)
  
      // Obtener referencias a las propiedades del store
      const loading = computed(() => galleryStore.loading)
      const error = computed(() => galleryStore.error)
      
      // Obtener todas las etiquetas disponibles
      const availableTags = computed(() => galleryStore.getAllTags)
  
      // Imágenes filtradas por etiqueta
      const filteredImages = computed(() => {
        if (activeTag.value === 'all') {
          return galleryStore.images
        }
        return galleryStore.getImagesByTag(activeTag.value)
      })
  
      // Imagen actual en el lightbox
      const currentImage = computed(() => {
        return filteredImages.value[currentImageIndex.value] || null
      })
  
      // Abrir lightbox
      const openLightbox = (index) => {
        currentImageIndex.value = index
        lightboxOpen.value = true
        // Evitar scroll del cuerpo cuando el lightbox está abierto
        document.body.style.overflow = 'hidden'
      }
  
      // Cerrar lightbox
      const closeLightbox = () => {
        lightboxOpen.value = false
        // Restaurar scroll
        document.body.style.overflow = 'auto'
      }
  
      // Navegar a la imagen anterior
      const prevImage = () => {
        if (currentImageIndex.value > 0) {
          currentImageIndex.value--
        } else {
          currentImageIndex.value = filteredImages.value.length - 1
        }
      }
  
      // Navegar a la siguiente imagen
      const nextImage = () => {
        if (currentImageIndex.value < filteredImages.value.length - 1) {
          currentImageIndex.value++
        } else {
          currentImageIndex.value = 0
        }
      }
  
      // Eventos de teclado para navegación
      const handleKeyDown = (e) => {
        if (!lightboxOpen.value) return
        
        switch (e.key) {
          case 'ArrowLeft':
            prevImage()
            break
          case 'ArrowRight':
            nextImage()
            break
          case 'Escape':
            closeLightbox()
            break
        }
      }
  
      onMounted(async () => {
        // Cargar imágenes desde el store
        await galleryStore.loadGalleryImages()
        
        // Añadir event listener para navegación con teclado
        window.addEventListener('keydown', handleKeyDown)
      })
      
      onBeforeUnmount(() => {
        // Limpiar el event listener al desmontar el componente
        window.removeEventListener('keydown', handleKeyDown)
      })
  
      return {
        loading,
        error,
        activeTag,
        lightboxOpen,
        availableTags,
        filteredImages,
        currentImage,
        openLightbox,
        closeLightbox,
        prevImage,
        nextImage
      }
    }
  }
  </script>
  
  <style scoped>
  /* Animaciones para el lightbox */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s;
  }
  
  .slide-enter-from {
    transform: translateX(50px);
    opacity: 0;
  }
  
  .slide-leave-to {
    transform: translateX(-50px);
    opacity: 0;
  }
  </style>