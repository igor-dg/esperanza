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
      const allTags = state.images
        .filter(img => img.tags && Array.isArray(img.tags))
        .flatMap(img => img.tags)
      return [...new Set(allTags)]
    }
  },
  
  actions: {
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