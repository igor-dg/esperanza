<template>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Documentación del Proceso</h1>
        <p class="mt-2 text-lg text-gray-600">Documentos generados y recibidos durante el proceso de modificación</p>
      </div>
  
      <!-- Estado de carga -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando documentos...</p>
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
                {{ category.name }}
              </button>
            </div>
          </div>
  
          <!-- Búsqueda -->
          <div class="relative w-full sm:w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar documentos..."
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
            <!-- PDF thumbnail -->
            <div class="relative h-48 bg-gray-100">
              <img
                :src="doc.thumbnailUrl || '/images/default-thumbnail.png'"
                :alt="doc.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-2 right-2">
                <span 
                  class="px-2 py-1 text-xs font-medium bg-white rounded-full"
                  :class="getTypeClass(doc.type)"
                >
                  {{ doc.type }}
                </span>
              </div>
            </div>
  
            <!-- Contenido -->
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ doc.title }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ doc.description }}</p>
  
              <!-- Estado y metadatos -->
              <div class="mb-4 p-3 bg-gray-50 rounded-md">
                <div class="flex items-center justify-between mb-2">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="getStatusClass(doc.status)"
                  >
                    {{ doc.status }}
                  </span>
                  <span class="text-sm text-gray-500">{{ doc.date }}</span>
                </div>
                <div class="text-sm text-gray-600">
                  <span class="font-medium">Ref:</span> {{ doc.reference }}
                </div>
              </div>
  
              <!-- Acciones -->
              <div class="flex gap-2">
                <a
                  :href="doc.pdfUrl"
                  target="_blank"
                  class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-primary text-sm font-medium rounded-md text-primary hover:bg-primary-lighter"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar
                </a>
                <button
  @click="showPreview(doc)"
  :disabled="!isPreviewable(doc)"
  class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md"
  :class="isPreviewable(doc) ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'"
>
  Vista previa
</button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- No hay resultados -->
        <div v-else class="text-center py-12">
          <p class="text-gray-500">No se encontraron documentos que coincidan con los criterios de búsqueda.</p>
        </div>
      </div>
  
      <!-- Modal de previsualización -->
      <div
        v-if="showPreviewModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closePreview"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <!-- Header del modal -->
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">{{ selectedDocument?.title }}</h3>
            <button
              @click="closePreview"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Contenido del modal -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            <div v-if="selectedDocument" class="bg-white rounded-lg">
              <VuePdfEmbed
                :source="selectedDocument.pdfUrl"
                :page="currentPage"
                @password-requested="handlePasswordRequest"
                @rendered="handleRendered"
                class="w-full h-full"
                style="min-height: 600px;"
              />
              
              <!-- Controles de navegación -->
              <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-4 pb-4">
                <button
                  @click="currentPage > 1 && currentPage--"
                  :disabled="currentPage <= 1"
                  class="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <span class="text-sm">
                  Página {{ currentPage }} de {{ totalPages }}
                </span>
                <button
                  @click="currentPage < totalPages && currentPage++"
                  :disabled="currentPage >= totalPages"
                  class="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VuePdfEmbed from 'vue-pdf-embed'
import { api } from '@/services/api'

export default {
  components: {
    VuePdfEmbed
  },
  name: 'DocumentsView',
  data() {
    return {
      loading: true,
      error: null,
      activeCategory: 'all',
      searchQuery: '',
      showPreviewModal: false,
      selectedDocument: null,
      currentPage: 1,
      totalPages: 0,
      categories: [
        { id: 'all', name: 'Todos' },
        { id: 'Correspondencia', name: 'Correspondencia' },
        { id: 'Informes', name: 'Informes' },
        { id: 'Nota de Prensa', name: 'Notas de Prensa' },
        { id: 'Acta', name: 'Actas' }
      ],
      documents: []
    }
  },
  computed: {
    filteredDocuments() {
      return this.documents.filter(doc => {
        const matchesCategory = this.activeCategory === 'all' || 
          doc.type === this.activeCategory
        const matchesSearch = !this.searchQuery || 
          doc.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      })
    }
  },
  methods: {
    async loadDocuments() {
      this.loading = true
      this.error = null
      try {
        const data = await api.loadContent()
        this.documents = data.documents || []
      } catch (err) {
        console.error('Error cargando documentos:', err)
        this.error = 'Error al cargar los documentos'
      } finally {
        this.loading = false
      }
    },
    isPreviewable(doc) {
  return doc && doc.pdfUrl && doc.pdfUrl.toLowerCase().endsWith('.pdf')
},
    showPreview(doc) {
      this.selectedDocument = doc
      this.showPreviewModal = true
    },
    closePreview() {
      this.showPreviewModal = false
      this.selectedDocument = null
      this.currentPage = 1
      this.totalPages = 0
    },
    handlePasswordRequest() {
      console.log('Este PDF está protegido con contraseña')
    },
    handleRendered(numberOfPages) {
      this.totalPages = numberOfPages
    },
    getTypeClass(type) {
      const classes = {
        'Correspondencia': 'text-blue-700 bg-blue-50',
        'Informes': 'text-green-700 bg-green-50',
        'Nota de Prensa': 'text-purple-700 bg-purple-50',
        'Acta': 'text-orange-700 bg-orange-50'
      }
      return classes[type] || 'text-gray-700 bg-gray-50'
    },
    getStatusClass(status) {
      const classes = {
        'Enviado': 'bg-blue-100 text-blue-800',
        'Recibido': 'bg-green-100 text-green-800',
        'Pendiente': 'bg-yellow-100 text-yellow-800',
        'En proceso': 'bg-purple-100 text-purple-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }
  },
  mounted() {
    this.loadDocuments()
  }
}
  </script>