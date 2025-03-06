// src/stores/announcement.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { adminApi } from '@/services/adminApi'

export const useAnnouncementStore = defineStore('announcement', {
  state: () => ({
    announcements: [],
    loading: false,
    error: null
  }),
  
  getters: {
    activeAnnouncements: (state) => {
      return state.announcements.filter(announcement => announcement.active);
    },
    meetingModalActive: (state) => {
      const meetingModal = state.announcements.find(a => a.type === 'meeting');
      return meetingModal ? meetingModal.active : false;
    }
  },

  actions: {
    async loadAnnouncements() {
      this.loading = true;
      this.error = null;
      try {
        const data = await api.loadContent();
        this.announcements = data.announcements || [];
      } catch (error) {
        console.error('Error loading announcements:', error);
        this.error = 'Error al cargar los anuncios';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async saveAnnouncements() {
      try {
        // Obtenemos el contenido actual para mantener otros datos
        const currentContent = await api.loadContent();
        
        // Actualizamos solo los anuncios
        const payload = {
          ...currentContent,
          announcements: this.announcements
        };
        
        await adminApi.saveContent(payload);
      } catch (error) {
        console.error('Error saving announcements:', error);
        throw error;
      }
    },
    
    toggleAnnouncementStatus(id) {
      const index = this.announcements.findIndex(a => a.id === id);
      if (index !== -1) {
        this.announcements[index].active = !this.announcements[index].active;
      }
    }
  }
});