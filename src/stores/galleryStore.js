// src/stores/galleryStore.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { adminApi } from '@/services/adminApi'

export const useGalleryStore = defineStore('gallery', {
  state: () => ({
    images: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getImageById: (state) => (id) => {
      return state.images.find(image => image.id === id) || null
    },
    
    getImagesByTag: (state) => (tag) => {
      return state.images.filter(image => image.tags && image.tags.includes(tag))
    },
    
    getAllTags: (state) => {
        const allCategories = state.images
            .map(img => img.category)
            .filter(category => category)
        return [...new Set(allCategories)]
    }
  },
  computed: {
    getCategoryName() {
      const categoryMap = {
        'atasco': 'Atasco',
        'inseguridad': 'Inseguridad',
        'aparcamiento': 'Aparcamiento irregular',
        'camiones': 'Carga y descarga',
        'francia': 'Calle Francia',
        'congestion': 'Congestión'
      }
      return (category) => categoryMap[category] || category
    }
  },
  actions: {
    normalizeGalleryItem(item) {
        return {
          id: item.id || Date.now(),
          title: item.title || '',
          description: item.description || '',
          category: item.category || 'problemas', // Valor por defecto
          date: item.date || new Date().toISOString().split('T')[0],
          imageUrl: item.imageUrl || '',
          thumbnailUrl: item.thumbnailUrl || '',
          tags: Array.isArray(item.tags) ? item.tags : [],
          order: item.order || 0
        };
      },

    async loadGalleryImages() {
      this.loading = true
      this.error = null
      
      try {
        const data = await api.loadContent()
        // Usar los datos de la galería del API
        this.images = data.gallery || []
      } catch (error) {
        console.error('Error loading gallery images:', error)
        this.error = 'Error al cargar la galería de imágenes'
        this.images = []
      } finally {
        this.loading = false
      }
    },
    
    async saveGalleryImages() {
      try {
        // Obtener todo el contenido actual
        const currentContent = await api.loadContent()
        
        // Actualizar solo las imágenes de la galería
        const payload = {
          ...currentContent,
          gallery: this.images
        }
        
        // Guardar en el backend
        await adminApi.saveContent(payload)
        return true
      } catch (error) {
        console.error('Error saving gallery images:', error)
        throw error
      }
    },
    
    // Añadir una nueva imagen
    addImage(image) {
      // Asegurar que tiene un ID único
      const newImage = {
        ...image,
        id: image.id || Date.now()
      }
      
      this.images.push(newImage)
    },
    
    // Actualizar una imagen existente
    updateImage(updatedImage) {
      const index = this.images.findIndex(img => img.id === updatedImage.id)
      if (index !== -1) {
        this.images[index] = { ...updatedImage }
      }
    },
    
    // Eliminar una imagen
    removeImage(id) {
      this.images = this.images.filter(img => img.id !== id)
    }
  }
})