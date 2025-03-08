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
      return state.images.filter(image => image.tags.includes(tag))
    },
    
    getAllTags: (state) => {
      const allTags = state.images.flatMap(img => img.tags)
      return [...new Set(allTags)]
    }
  },
  
  actions: {
    async loadGalleryImages() {
      this.loading = true
      this.error = null
      
      try {
        const data = await api.loadContent()
        // Cuando se implemente en el backend, se usará data.galleryImages
        // Por ahora, usar datos de prueba si no hay datos en la API
        this.images = data.galleryImages || this.getExampleImages()
      } catch (error) {
        console.error('Error loading gallery images:', error)
        this.error = 'Error al cargar la galería de imágenes'
        // Usar datos de ejemplo en caso de error
        this.images = this.getExampleImages()
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
          galleryImages: this.images
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
        id: Date.now()
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
    },
    
    // Método para proporcionar datos de ejemplo durante el desarrollo
    getExampleImages() {
      return [
        {
          id: 1,
          title: 'Congestión en hora punta',
          description: 'Tráfico detenido en Calle Francia durante la hora punta de la tarde. La acumulación de vehículos provoca ruido y contaminación en la zona residencial.',
          date: '15 de febrero, 2025',
          imageUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_1.jpeg',
          thumbnailUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_1.jpeg',
          tags: ['Congestión', 'Contaminación']
        },
        {
          id: 2,
          title: 'Vehículos invadiendo zona peatonal',
          description: 'Vehículos circulando por la zona peatonal de la Calle Esperanza, generando un riesgo para los viandantes.',
          date: '8 de marzo, 2025',
          imageUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_2.jpeg',
          thumbnailUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_2.jpeg',
          tags: ['Seguridad', 'Peatones']
        },
        {
          id: 3,
          title: 'Coches en doble fila',
          description: 'Vehículos estacionados en doble fila obstaculizando el tráfico y reduciendo la visibilidad.',
          date: '22 de febrero, 2025',
          imageUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_3.jpeg',
          thumbnailUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_3.jpeg',
          tags: ['Aparcamiento', 'Congestión']
        },
        {
          id: 4,
          title: 'Cruce peligroso',
          description: 'El cambio de sentido ha generado un punto conflictivo en este cruce donde no existía anteriormente.',
          date: '1 de marzo, 2025',
          imageUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_4.jpeg',
          thumbnailUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_4.jpeg',
          tags: ['Seguridad', 'Infraestructura']
        },
        {
          id: 5,
          title: 'Paso de peatones con poca visibilidad',
          description: 'Los vehículos estacionados reducen la visibilidad en este paso de peatones, generando situaciones de riesgo.',
          date: '10 de marzo, 2025',
          imageUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_5.jpeg',
          thumbnailUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_5.jpeg',
          tags: ['Seguridad', 'Peatones']
        },
        {
          id: 6, 
          title: 'Contaminación acústica',
          description: 'El aumento del tráfico ha incrementado los niveles de ruido en la zona residencial.',
          date: '5 de marzo, 2025',
          imageUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_6.jpeg',
          thumbnailUrl: 'https://idg.eus/esperanzakalea/img/Esperantza_6.jpeg',
          tags: ['Contaminación', 'Calidad de vida']
        }
      ]
    }
  }
})