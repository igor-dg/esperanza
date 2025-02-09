// src/stores/content.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { adminApi } from '@/services/adminApi'

export const useContentStore = defineStore('content', {
  state: () => ({
    news: [],
    documents: [],
    legalDocuments: [],
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
      } catch (error) {
        console.error('Error saving content:', error)
        throw error
      }
    }
  }
})