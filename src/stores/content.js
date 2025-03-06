// src/stores/content.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { adminApi } from '@/services/adminApi'

export const useContentStore = defineStore('content', {
  state: () => ({
    news: [],
    documents: [],
    legalDocuments: [],
    announcements: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async loadContent() {
      this.loading = true
      this.error = null
      try {
        const data = await api.loadContent()
        this.news = data.news || []
        this.documents = data.documents || []
        this.legalDocuments = data.legalDocuments || []
        this.announcements = data.announcements || []

        // Inicializar con el anuncio de reunión si no existe
        if (!this.announcements.find(a => a.type === 'meeting')) {
          this.announcements.push({
            id: Date.now(),
            title: 'Reunión informativa vecinal',
            type: 'meeting',
            description: 'Información sobre la reunión del 6 de marzo',
            active: false // Inicialmente desactivado
          })
        }

      } catch (error) {
        console.error('Error loading content:', error)
        this.error = 'Error al cargar el contenido'
        throw error
      } finally {
        this.loading = false
      }
    },

    async saveContent(payload) {
      try {
        await adminApi.saveContent(payload)
        // Actualizar el estado local con los nuevos datos
        this.news = payload.news
        this.documents = payload.documents
        this.legalDocuments = payload.legalDocuments
        this.announcements = payload.announcements || []
      } catch (error) {
        console.error('Error saving content:', error)
        throw error
      }
    }
  },
  getters: {
    getActiveAnnouncements: (state) => {
      return state.announcements.filter(a => a.active)
    },
    
    getMeetingModalStatus: (state) => {
      const meetingAnnouncement = state.announcements.find(a => a.type === 'meeting')
      return meetingAnnouncement ? meetingAnnouncement.active : false
    }
  }
})