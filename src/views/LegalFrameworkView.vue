<template>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Marco Legal</h1>
        <p class="mt-2 text-lg text-gray-600">Normativa y documentación pública relevante</p>
      </div>
  
      <!-- Estado de carga -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando documentación legal...</p>
      </div>
  
      <!-- Estado de error -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600">{{ error }}</div>
      </div>
  
      <div v-else>
        <!-- Filtros y búsqueda -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <!-- Categorías -->
          <div class="flex-1">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="activeCategory = category.id"
                class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                :class="[
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-lighter hover:text-primary'
                ]"
              >
                {{ getCategoryName(category.id) }}
              </button>
            </div>
          </div>
  
          <!-- Búsqueda -->
          <div class="relative w-full sm:w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar normativa..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
  
        <!-- Grid de documentos -->
        <div v-if="filteredDocuments.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="doc in filteredDocuments"
            :key="doc.id"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <!-- Imagen de portada -->
            <div class="relative h-48 bg-gray-100">
              <img
                :src="doc.imageUrl || '/api/placeholder/400/250'"
                :alt="doc.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-2 right-2">
                <span class="px-2 py-1 text-xs font-medium bg-white rounded-full text-primary">
                  {{ getCategoryName(doc.category) }}
                </span>
              </div>
            </div>
  
            <!-- Contenido -->
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ doc.title }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ doc.description }}</p>
  
              <!-- Extracto relevante -->
              <div class="mb-4 p-3 bg-primary-lighter rounded-md">
                <h4 class="text-sm font-medium text-primary-dark mb-1">Artículos relevantes:</h4>
                <p class="text-sm text-gray-700">{{ doc.relevantArticles }}</p>
              </div>
  
              <!-- Metadatos -->
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ doc.lastUpdated }}
                </span>
                <span class="mx-2">·</span>
                <span>{{ doc.source }}</span>
              </div>
  
              <!-- Acciones -->
              <div class="flex gap-2">
                <a
                  :href="doc.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-primary text-sm font-medium rounded-md text-primary hover:bg-primary-lighter"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Ver documentación
                </a>
              </div>
            </div>
          </div>
        </div>
  
        <!-- No hay resultados -->
        <div v-else class="text-center py-12">
          <p class="text-gray-500">No se encontraron documentos que coincidan con los criterios de búsqueda.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '@/services/api'
  
  export default {
    name: 'LegalFrameworkView',
    data() {
      return {
        loading: true,
        error: null,
        activeCategory: 'all',
        searchQuery: '',
        categories: [
          { id: 'all', name: 'Todos' },
          { id: 'mobility', name: 'Movilidad' },
          { id: 'urban', name: 'Urbanismo' },
          { id: 'environment', name: 'Medio Ambiente' },
          { id: 'legal', name: 'Marco Legal' }
        ],
        documents: []
      }
    },
    computed: {
      filteredDocuments() {
        return this.documents.filter(doc => {
          const matchesCategory = this.activeCategory === 'all' || doc.category === this.activeCategory
          const matchesSearch = !this.searchQuery || 
            doc.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            doc.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            doc.relevantArticles.toLowerCase().includes(this.searchQuery.toLowerCase())
          return matchesCategory && matchesSearch
        })
      }
    },
    methods: {
      async loadLegalDocuments() {
        this.loading = true
        this.error = null
        try {
          const data = await api.loadContent()
          this.documents = data.legalDocuments || []
        } catch (err) {
          console.error('Error cargando documentos legales:', err)
          this.error = 'Error al cargar la documentación legal'
        } finally {
          this.loading = false
        }
      },
      getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId)
        return category ? category.name : categoryId
      }
    },
    mounted() {
      this.loadLegalDocuments()
    }
  }
  </script>