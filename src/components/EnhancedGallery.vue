<!-- src/components/EnhancedGallery.vue -->
<template>
    <div class="enhanced-gallery">
      <!-- Gallery Controls -->
      <div class="mb-6 flex flex-wrap justify-between items-center">
        <!-- View Switcher -->
        <div class="view-switcher flex space-x-2 mb-4 md:mb-0">
          <button 
            @click="viewMode = 'grid'" 
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'grid' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-primary-lighter hover:text-primary'
            ]"
          >
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Cuadrícula
            </span>
          </button>
          <button 
            @click="viewMode = 'list'" 
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'list' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-primary-lighter hover:text-primary'
            ]"
          >
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Lista
            </span>
          </button>
        </div>
        
        <!-- Sort Options -->
        <div class="sort-options">
          <select 
            v-model="sortOption" 
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="newest">Más recientes primero</option>
            <option value="oldest">Más antiguos primero</option>
            <option value="titleAsc">Título (A-Z)</option>
            <option value="titleDesc">Título (Z-A)</option>
          </select>
        </div>
      </div>
      
      <!-- Filter Tags -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2">
          <button
            @click="activeTag = 'all'"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
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
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeTag === tag
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-lighter hover:text-primary'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
      
      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(image, index) in sortedAndFilteredImages"
          :key="image.id"
          class="relative group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
          @click="openLightbox(index)"
        >
          <!-- Image with hover effect -->
          <div class="aspect-square overflow-hidden">
            <img
              :src="normalizeImageUrl(image.thumbnailUrl)"
              :alt="image.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              @error="handleImageError"
            />
          </div>
          <!-- Overlay with information -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 class="text-white font-medium text-sm">{{ image.title }}</h3>
            <p v-if="image.date" class="text-white/80 text-xs mt-1">{{ formatDate(image.date) }}</p>
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
      
      <!-- List View -->
      <div v-if="viewMode === 'list'" class="space-y-3">
        <div
          v-for="(image, index) in sortedAndFilteredImages"
          :key="image.id"
          class="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          @click="openLightbox(index)"
        >
          <div class="h-20 w-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
            <img
              :src="normalizeImageUrl(image.thumbnailUrl)"
              :alt="image.title"
              class="h-full w-full object-cover"
              @error="handleImageError"
            />
          </div>
          <div class="flex-grow">
            <h3 class="font-medium text-primary-dark">{{ image.title }}</h3>
            <p v-if="image.date" class="text-sm text-gray-500">{{ formatDate(image.date) }}</p>
            <p v-if="image.description" class="text-sm text-gray-600 line-clamp-2 mt-1">{{ image.description }}</p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in image.tags"
                :key="tag"
                class="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="flex-shrink-0 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- No Results Message -->
      <div v-if="!loading && !error && sortedAndFilteredImages.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-primary mt-4">No se encontraron imágenes para la categoría seleccionada.</p>
      </div>
      
      <!-- Enhanced Lightbox -->
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        @click.self="closeLightbox"
      >
        <div class="relative max-w-6xl w-full max-h-[90vh] px-4 py-4">
          <!-- Navigation Buttons -->
          <button
            v-if="sortedAndFilteredImages.length > 1"
            @click.stop="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            aria-label="Imagen anterior"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            v-if="sortedAndFilteredImages.length > 1"
            @click.stop="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            aria-label="Siguiente imagen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
  
          <!-- Action Buttons -->
          <div class="absolute top-4 right-4 flex space-x-2 z-10">
            <button
              @click.stop="toggleFullscreen"
              class="bg-black/50 text-white p-2 rounded-lg hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              :title="isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'"
            >
              <svg v-if="isFullscreen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
            
            <button
              @click.stop="closeLightbox"
              class="bg-black/50 text-white p-2 rounded-lg hover:bg-red-500 transition-colors focus:outline-none"
              title="Cerrar"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
  
          <!-- Current Image -->
          <div class="flex flex-col items-center">
            <img
              v-if="currentImage"
              :src="normalizeImageUrl(currentImage.imageUrl)"
              :alt="currentImage.title"
              class="max-h-[75vh] max-w-full object-contain"
              @error="handleImageError"
            />
            
            <!-- Counter -->
            <div class="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {{ currentImageIndex + 1 }} / {{ sortedAndFilteredImages.length }}
            </div>
            
            <!-- Image Information -->
            <div class="mt-4 text-white bg-black/60 p-4 rounded-lg w-full max-w-2xl">
              <h3 class="text-xl font-bold">{{ currentImage?.title }}</h3>
              <p v-if="currentImage?.date" class="text-sm text-gray-300 mt-1">{{ formatDate(currentImage.date) }}</p>
              <p v-if="currentImage?.description" class="mt-2">{{ currentImage?.description }}</p>
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
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import { useGalleryStore } from '@/stores/galleryStore';
  import { normalizeImageUrl } from '@/utils/normalizeImageUrl';
  
  export default {
    name: 'EnhancedGallery',
    props: {
      showControls: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      // Use the gallery store
      const galleryStore = useGalleryStore();
      
      // Local state
      const activeTag = ref('all');
      const lightboxOpen = ref(false);
      const currentImageIndex = ref(0);
      const viewMode = ref('grid'); // 'grid' or 'list'
      const sortOption = ref('newest'); // 'newest', 'oldest', 'titleAsc', 'titleDesc'
      const isFullscreen = ref(false);
      
      // Store references
      const loading = computed(() => galleryStore.loading);
      const error = computed(() => galleryStore.error);
      
      // Get all available tags
      const availableTags = computed(() => galleryStore.getAllTags);
      
      // Sort and filter images
      const sortedAndFilteredImages = computed(() => {
        // First filter by tag
        let images = activeTag.value === 'all'
          ? galleryStore.images
          : galleryStore.getImagesByTag(activeTag.value);
        
        // Then sort the filtered images
        return [...images].sort((a, b) => {
          switch (sortOption.value) {
            case 'newest':
              return new Date(b.date || 0) - new Date(a.date || 0);
            case 'oldest':
              return new Date(a.date || 0) - new Date(b.date || 0);
            case 'titleAsc':
              return (a.title || '').localeCompare(b.title || '');
            case 'titleDesc':
              return (b.title || '').localeCompare(a.title || '');
            default:
              return 0;
          }
        });
      });
      
      // Current image in lightbox
      const currentImage = computed(() => {
        return sortedAndFilteredImages.value[currentImageIndex.value] || null;
      });
      
      // Format dates nicely
      const formatDate = (dateString) => {
        if (!dateString) return '';
        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        try {
          const date = new Date(dateString);
          return date.toLocaleDateString('es-ES', options);
        } catch (e) {
          return dateString;
        }
      };
      
      // Handle image load errors
      const handleImageError = (event) => {
        event.target.src = '/images/placeholder-image.jpg';
      };
      
      // Open lightbox
      const openLightbox = (index) => {
        currentImageIndex.value = index;
        lightboxOpen.value = true;
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      };
      
      // Close lightbox
      const closeLightbox = () => {
        lightboxOpen.value = false;
        isFullscreen.value = false;
        // Restore scroll
        document.body.style.overflow = 'auto';
        
        // Exit fullscreen if active
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      };
      
      // Navigate to previous image
      const prevImage = () => {
        if (currentImageIndex.value > 0) {
          currentImageIndex.value--;
        } else {
          currentImageIndex.value = sortedAndFilteredImages.value.length - 1;
        }
      };
      
      // Navigate to next image
      const nextImage = () => {
        if (currentImageIndex.value < sortedAndFilteredImages.value.length - 1) {
          currentImageIndex.value++;
        } else {
          currentImageIndex.value = 0;
        }
      };
      
      // Toggle fullscreen
      const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
          const lightboxEl = document.querySelector('.fixed.z-50');
          if (lightboxEl) {
            lightboxEl.requestFullscreen().then(() => {
              isFullscreen.value = true;
            }).catch(err => {
              console.error('Error attempting to enable fullscreen:', err);
            });
          }
        } else {
          document.exitFullscreen().then(() => {
            isFullscreen.value = false;
          }).catch(err => {
            console.error('Error attempting to exit fullscreen:', err);
          });
        }
      };
      
      // Keyboard navigation
      const handleKeyDown = (e) => {
        if (!lightboxOpen.value) return;
        
        switch (e.key) {
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
          case 'Escape':
            closeLightbox();
            break;
          case 'f':
            toggleFullscreen();
            break;
        }
      };
      
      onMounted(async () => {
        // Load images from store if not already loaded
        if (galleryStore.images.length === 0) {
          await galleryStore.loadGalleryImages();
        }
        
        // Add keyboard event listener
        window.addEventListener('keydown', handleKeyDown);
        
        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => {
          isFullscreen.value = !!document.fullscreenElement;
        });
      });
      
      onBeforeUnmount(() => {
        // Clean up event listeners
        window.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('fullscreenchange', () => {});
      });
      
      return {
        // State
        loading,
        error,
        activeTag,
        lightboxOpen,
        viewMode,
        sortOption,
        isFullscreen,
        currentImageIndex,
        
        // Computed
        availableTags,
        sortedAndFilteredImages,
        currentImage,
        
        // Methods
        normalizeImageUrl,
        formatDate,
        handleImageError,
        openLightbox,
        closeLightbox,
        prevImage,
        nextImage,
        toggleFullscreen
      };
    }
  };
  </script>
  
  <style scoped>
  /* Optional: Add smooth transitions for the lightbox */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  /* Line clamp for descriptions */
  .line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>