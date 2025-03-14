# ContentManager.vue
<template>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Header con fondo sutil -->
      <div class="mb-8 bg-accent-lighter p-6 rounded-lg">
        <h1 class="text-3xl font-bold text-accent-dark">Gestor de Contenidos</h1>
        <p class="mt-2 text-lg text-accent">Administra el contenido de la web</p>
      </div>

    <!-- Tabs de navegación -->
    <div class="mb-8">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="handleTabChange(tab.id)"
            :class="[
              activeTab === tab.id
                ? 'border-accent bg-accent-lighter text-accent-dark'
                : 'border-transparent text-primary hover:text-accent hover:bg-accent-lighter/50',
              'w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm transition-all duration-200'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Contenido de los tabs -->
    <div class="mt-8">
      <!-- Gestor de Noticias -->
<div v-if="activeTab === 'news'" class="space-y-6">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold">URLs de Noticias</h2>
    <button
      @click="addNews"
      class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
    >
      Añadir URL
    </button>
  </div>

  <!-- Lista de URLs con draggable -->
  <draggable 
    v-model="newsItems" 
    class="space-y-4"
    handle=".drag-handle"
    :animation="150"
    item-key="id"
  >
    <template #item="{element, index}">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center gap-4">
          <div 
            class="drag-handle cursor-move text-gray-400 hover:text-gray-600"
            title="Arrastrar para reordenar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
            </svg>
          </div>
          <div class="flex-grow">
            <input
              v-model="element.url"
              type="url"
              placeholder="https://..."
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <button
            @click="removeNews(index)"
            class="px-4 py-2 text-red-600 hover:text-red-800"
          >
            Eliminar
          </button>
        </div>
      </div>
    </template>
  </draggable>
</div>
      <!-- Gestor de Documentos -->
      <div v-if="activeTab === 'documents'" class="space-y-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-accent-dark">Documentos</h2>
        <button
          @click="addDocument"
          class="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors duration-200 flex items-center gap-2"
          >
          <PlusIcon class="w-5 h-5" />
          Añadir Documento
        </button>
      </div>

      <!-- Lista de documentos -->
      <draggable 
        v-model="documents" 
        class="space-y-4"
        handle=".drag-handle"
        :animation="150"
        item-key="id"
      >
        <template #item="{element, index}">
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-accent hover:border-accent-dark transition-colors duration-200">
                <!-- Encabezado colapsado -->
            <div class="flex items-center gap-4 mb-4 cursor-pointer" @click="toggleExpand(index)">
              <div 
                class="drag-handle cursor-move text-accent hover:text-accent-dark"
                title="Arrastrar para reordenar"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                </svg>
              </div>
              <div class="flex-grow font-medium text-accent-dark">
                {{ element.title || `Documento ${index + 1}` }}
              </div>
              <div class="text-sm text-accent">
                {{ element.type }}
              </div>
              <button
                @click.stop="toggleExpand(index)"
                class="text-primary hover:text-gray-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    :d="expandedIndex === index ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'"
                  />
                </svg>
              </button>
            </div>

            <!-- Contenido expandido -->
            <div v-if="expandedIndex === index" class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                <label class="block text-sm font-medium text-gray-700">Título</label>
                <input
                  v-model="element.title"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 hover:border-accent transition-colors duration-200"
                  />
              </div>
              <div>
                <label class="block text-sm font-medium text-accent-dark mb-1 group-hover:text-accent transition-colors duration-200">Tipo</label>
                 <select
                  v-model="element.type"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 hover:border-accent transition-colors duration-200"
                  >
                  <option value="Correspondencia">Correspondencia</option>
                  <option value="Informes">Informes</option>
                  <option value="Nota de Prensa">Nota de Prensa</option>
                  <option value="Acta">Acta</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-accent-dark mb-1 group-hover:text-accent transition-colors duration-200">Fecha</label>
                <input
    v-model="element.date"
    type="date"
    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 hover:border-accent transition-colors duration-200"
                  />
</div>
              <div>
                <label class="block text-sm font-medium text-accent-dark mb-1 group-hover:text-accent transition-colors duration-200">Tipo</label>
                 <select
                  v-model="element.status"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="Enviado">Enviado</option>
                  <option value="Recibido">Recibido</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-accent-dark mb-1 group-hover:text-accent transition-colors duration-200">Fecha</label>
                <input
                  v-model="element.reference"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 hover:border-accent transition-colors duration-200"
                  />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-accent-dark mb-1 group-hover:text-accent transition-colors duration-200">Descripción</label>
                  <textarea
                  v-model="element.description"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 hover:border-accent transition-colors duration-200"
                  ></textarea>
              </div>

              <!-- File uploads -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-accent-dark mb-1">PDF del documento</label>
                  <div class="flex items-center space-x-2">
                  <input
                    @change="handleDocumentUpload($event, index)"
                    type="file"
                    accept=".pdf"
                    class="hidden"
                    :id="'pdf-' + element.id"
                  />
                  <label 
                    :for="'pdf-' + element.id"
                    class="px-4 py-2 bg-accent-lighter hover:bg-accent-light text-accent-dark rounded cursor-pointer transition-colors duration-200"
                    >
                    Seleccionar PDF
                  </label>
                  <span v-if="element.pdfUrl" class="text-sm text-green-600">
                    PDF subido ✓
                  </span>
                </div>
                
              </div>
              <div class="md:col-span-2 flex justify-end mt-4">
                <button
                  @click.stop="removeDocument(index)"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                    title="Eliminar documento"
                >
                  <Trash2 class="w-4 h-4 mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>

      <!-- Gestor de Marco Legal -->
<div v-if="activeTab === 'legal'" class="space-y-6">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold">Marco Legal</h2>
    <button
      @click="addLegalDocument"
      class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center gap-2"
    >
      <PlusIcon class="w-5 h-5" />
      Añadir Documento Legal
    </button>
  </div>

  <!-- Lista de documentos legales -->
  <draggable 
    v-model="legalDocuments" 
    class="space-y-4"
    handle=".drag-handle"
    :animation="150"
    item-key="id"
  >
    <template #item="{element, index}">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <!-- Encabezado colapsado -->
        <div class="flex items-center gap-4 mb-4 cursor-pointer" @click="toggleLegalExpand(index)">
          <div 
            class="drag-handle cursor-move text-gray-400 hover:text-gray-600"
            title="Arrastrar para reordenar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
            </svg>
          </div>
          <div class="flex-grow font-medium text-gray-700">
            {{ element.title || `Documento Legal ${index + 1}` }}
          </div>
          <div class="text-sm text-primary">
            {{ element.category }}
          </div>
          <button
            @click.stop="toggleLegalExpand(index)"
            class="text-primary hover:text-gray-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="expandedLegalIndex === index ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'"
              />
            </svg>
          </button>
        </div>

        <!-- Contenido expandido -->
        <div v-if="expandedLegalIndex === index" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Título</label>
            <input
              v-model="element.title"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              v-model="element.category"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="mobility">Movilidad</option>
              <option value="urban">Urbanismo</option>
              <option value="environment">Medio Ambiente</option>
              <option value="legal">Marco Legal</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Fuente</label>
            <input
              v-model="element.source"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Última actualización</label>
            <input
              v-model="element.lastUpdated"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="YYYY"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">URL del documento</label>
            <input
              v-model="element.url"
              type="url"
              placeholder="https://..."
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              v-model="element.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            ></textarea>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Artículos Relevantes</label>
            <textarea
              v-model="element.relevantArticles"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            ></textarea>
          </div>

          <!-- Solo imagen de portada -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Imagen de portada</label>
            <div class="flex items-center space-x-2">
              <input
                @change="handleLegalImageUpload($event, index)"
                type="file"
                accept="image/*"
                class="hidden"
                :id="'cover-' + element.id"
              />
              <label 
                :for="'cover-' + element.id"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
              >
                Seleccionar imagen
              </label>
              <span v-if="element.imageUrl" class="text-sm text-green-600">
                Imagen subida ✓
              </span>
            </div>
          </div>

          <div class="md:col-span-2 flex justify-end mt-4">
            <button
              @click.stop="removeLegalDocument(index)"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              title="Eliminar documento"
            >
              <Trash2 class="w-4 h-4 mr-2" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </template>
  </draggable>
</div>

<!-- Gestor de Galería -->
<div v-if="activeTab === 'gallery'" class="space-y-6">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold">Galería de Imágenes</h2>
    <button
      @click="addGalleryItem"
      class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center gap-2"
    >
      <PlusIcon class="w-5 h-5" />
      Añadir imagen
    </button>
  </div>

  <!-- Lista de imágenes -->
  <draggable 
    v-model="gallery" 
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    handle=".drag-handle"
    :animation="150"
    item-key="id"
  >
    <template #item="{element, index}">
      <div 
        class="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
      >
        <!-- Miniatura y controles superiores -->
        <div class="relative mb-4">
          <!-- Imagen de vista previa -->
          <div class="h-48 rounded-md overflow-hidden bg-gray-100">
            <img 
              v-if="element.thumbnailUrl" 
              :src="getImageUrl(element.thumbnailUrl)" 
              :alt="element.title || 'Imagen de galería'" 
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
              <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Controles -->
          <div class="absolute top-2 right-2 flex space-x-1">
            <div 
              class="drag-handle cursor-move p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              title="Arrastrar para reordenar"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
            
            <button
              @click="removeGalleryItem(index)"
              class="p-2 bg-white rounded-full shadow-sm hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
              title="Eliminar imagen"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Formulario de datos -->
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              v-model="element.title"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              v-model="element.description"
              rows="2"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                v-model="element.category"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                <option value="atasco">Atasco</option>
                <option value="inseguridad">Inseguridad</option>
                <option value="aparcamiento">Aparcamiento irregular</option>
                <option value="camiones">Carga y descarga</option>
                <option value="francia">Calle Francia</option>
                <option value="congestion">Congestión</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input
                v-model="element.date"
                type="date"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </div>
          
          <!-- Subida de imagen -->
          <div v-if="!element.imageUrl">
            <label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
            <div class="flex items-center space-x-2">
              <input
                @change="(e) => handleGalleryImageUpload(e, index)"
                type="file"
                accept="image/*"
                class="hidden"
                :id="`gallery-image-${element.id}`"
              />
              <label 
                :for="`gallery-image-${element.id}`"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer transition-colors"
              >
                Seleccionar imagen
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>
  </draggable>

  <!-- Mensaje si no hay imágenes -->
  <div v-if="!gallery.length" class="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">No hay imágenes en la galería</h3>
    <p class="mt-1 text-sm text-gray-500">Empieza añadiendo una nueva imagen a la galería.</p>
    <div class="mt-6">
      <button
        @click="addGalleryItem"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Nueva imagen
      </button>
    </div>
  </div>
</div>
    </div>

    <!-- Botón de guardar -->
    <div class="mt-8 flex justify-end">
        <button
        @click="saveChanges"
        :disabled="!hasChanges"
        :class="[
          'px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2',
          hasChanges
            ? 'bg-accent text-white hover:bg-accent-dark shadow-lg hover:shadow-xl'
            : 'bg-gray-200 text-primary cursor-not-allowed'
        ]"
      >
        <SaveIcon v-if="hasChanges" class="w-5 h-5" />
        <SaveIcon v-else class="w-5 h-5 opacity-50" />
        Guardar Cambios
      </button>
    </div>

    <UnsavedChangesDialog
  :model-value="showUnsavedDialog"
  @update:model-value="showUnsavedDialog = $event"
  @save="handleSaveAndNavigate"
  @discard="handleDiscardAndNavigate"
/>
<ToastNotification ref="toast" />
<div class="absolute top-4 right-4">
    <button 
    @click="handleLogout"
    class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
>
    Cerrar sesión
</button>
    </div>
  </div>
</template>

<script>
import { SaveIcon, 
  PlusIcon, 
  Trash2, 
  Calendar, 
  RefreshCw,
  AlertTriangle,
  Info,
  AlertCircle } from 'lucide-vue-next'
import { api } from '@/services/api'
import { adminApi } from '@/services/adminApi'
import draggable from 'vuedraggable'
import UnsavedChangesDialog from '@/components/UnsavedChangesDialog.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import GalleryManager from '@/components/GalleryManager.vue'
import { auth } from '@/services/auth'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'

export default {
    setup() {
        const contentStore = useContentStore();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await auth.logout();
            router.push('/admin/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return {
        contentStore,
        handleLogout
    };
},
  name: 'ContentManager',
  components: {
    draggable,
    SaveIcon,
    PlusIcon,
    Trash2,
    Calendar,
    GalleryManager,
  RefreshCw,
  AlertTriangle,
  Info,
  AlertCircle,
    UnsavedChangesDialog,
    ToastNotification
  },
  data() {
    return {
      activeTab: 'news',
      tabs: [
        { id: 'news', name: 'Noticias' },
        { id: 'documents', name: 'Documentos' },
        { id: 'legal', name: 'Marco Legal' },
        { id: 'gallery', name: 'Galería' },
        { id: 'announcements', name: 'Anuncios' }
      ],
      newsItems: [],
      documents: [],
      legalDocuments: [],
      gallery: [],
      expandedIndex: null,
      initialContent: null,
      showUnsavedDialog: false,
      navigationIntent: null,
      expandedLegalIndex: null,
      legalDocuments: [],
      expandedAnnouncementIndex: null,
      announcements: [],
    }
  },
  computed: {
    // Verifica si hay cambios en el contenido
    hasChanges() {
      if (!this.initialContent) return false

      return (
        JSON.stringify(this.newsItems) !== JSON.stringify(this.initialContent.news) ||
        JSON.stringify(this.documents) !== JSON.stringify(this.initialContent.documents) ||
        JSON.stringify(this.legalDocuments) !== JSON.stringify(this.initialContent.legalDocuments) ||
        JSON.stringify(this.announcements) !== JSON.stringify(this.initialContent.announcements) ||
    JSON.stringify(this.gallery) !== JSON.stringify(this.initialContent.gallery)
      )
    }
  },
  methods: {
    // Métodos para noticias
    addNews() {
      this.newsItems.push({
        id: Date.now(), // Necesario para draggable
        url: ''
      })
    },
    removeNews(index) {
      this.newsItems.splice(index, 1)
    },

    // Métodos para documentos
addDocument() {
  this.documents.push({
    id: Date.now(),
    title: '',
    type: 'Correspondencia',
    status: 'Pendiente',
    description: '',
    reference: '',
    date: '',
    thumbnailUrl: null,
    pdfUrl: null
  })
},

removeDocument(index) {
  this.documents.splice(index, 1)
},

async handleDocumentUpload(event, index) {
  const file = event.target.files[0]
  if (file) {
    try {
      console.log('Subiendo archivo:', file)
      const response = await api.uploadFile(file, 'documents')
      console.log('Respuesta de uploadFile:', response)
      
      if (response && response.url) {
        this.documents[index].pdfUrl = response.url
        this.documents[index].thumbnailUrl = response.thumbnailUrl
        this.$refs.toast.success('Documento subido correctamente')
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
      
    } catch (error) {
      console.error('Error completo:', error)
      console.error('Respuesta del servidor:', error.response)
      this.$refs.toast.error('Error al subir el documento: ' + (error.response?.data?.message || error.message || 'Error desconocido'))
    }
  }
},

toggleExpand(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index
    },

    // Métodos para documentos legales
    addLegalDocument() {
    this.legalDocuments.push({
      id: Date.now(),
      title: '',
      category: 'legal',
      description: '',
      relevantArticles: '',
      imageUrl: null,
      url: '',
      source: '',
      lastUpdated: new Date().getFullYear().toString(),
    })
  },

  removeLegalDocument(index) {
    this.legalDocuments.splice(index, 1)
  },

  toggleLegalExpand(index) {
    this.expandedLegalIndex = this.expandedLegalIndex === index ? null : index
  },

  async handleLegalImageUpload(event, index) {
  const file = event.target.files[0]
  if (file) {
    try {
      const response = await api.uploadLegalImage(file)
      this.legalDocuments[index].imageUrl = response.thumbnailUrl
      this.$refs.toast.success('Imagen subida correctamente')
    } catch (error) {
      console.error('Error al subir la imagen:', error)
      this.$refs.toast.error('Error al subir la imagen')
    }
  }
},

    // Método para guardar todos los cambios
    async saveChanges() {
    if (!this.hasChanges) return

    try {
      const payload = {
        news: this.newsItems,
        documents: this.documents,
        legalDocuments: this.legalDocuments,
        announcements: this.announcements,
        gallery: this.gallery
      }
      
      await this.contentStore.saveContent(payload)
      this.initialContent = JSON.parse(JSON.stringify(payload))
      this.$refs.toast?.success('Cambios guardados correctamente')
    } catch (error) {
        console.error('Error al guardar los cambios:', error)
        
        if (error.response?.status === 401) {
            this.$refs.toast?.error('Sesión expirada. Por favor, vuelva a iniciar sesión')
            // Opcional: redirigir al login
            this.$router.push('/admin/login')
        } else {
            this.$refs.toast?.error('Error al guardar los cambios: ' + 
                (error.response?.data?.message || 'Error desconocido'))
        }
    }
},

// Obtener URL completa para imágenes
getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${import.meta.env.VITE_ASSETS_URL}/${path}`;
},

// Manejar error de carga de imagen
handleImageError(event) {
  event.target.src = '/images/placeholder-image.jpg';
},

// Añadir nuevo elemento a la galería
addGalleryItem() {
  const newItem = {
    id: Date.now(),
    title: '',
    description: '',
    category: 'estado-actual',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '',
    thumbnailUrl: '',
    tags: [],
    order: this.gallery?.length + 1 || 1
  };
  
  this.gallery = [...(this.gallery || []), newItem];
  
  this.$nextTick(() => {
    const lastCard = document.querySelector('.gallery-item:last-child');
    if (lastCard) {
      lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
},

// Eliminar elemento de la galería
removeGalleryItem(index) {
  if (confirm('¿Está seguro de que desea eliminar esta imagen?')) {
    // Si la imagen ya está en el servidor, deberíamos considerar eliminarla físicamente también
    this.gallery.splice(index, 1);
    
    // Reordenar las imágenes restantes
    this.gallery.forEach((item, i) => {
      item.order = i + 1;
    });
  }
},

// Subir imagen para elemento de galería
async handleGalleryImageUpload(event, index) {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    this.$refs.toast.info('Subiendo imagen...');
    
    const response = await api.uploadGalleryImage(file);
    
    // Actualizar la imagen en el array de la galería
    this.gallery[index].imageUrl = response.imageUrl;
    this.gallery[index].thumbnailUrl = response.thumbnailUrl;
    
    this.$refs.toast.success('Imagen subida correctamente');
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    this.$refs.toast.error('Error al subir la imagen: ' + (error.response?.data?.message || error.message));
  }
},

/**
 * Normaliza la estructura de un elemento de galería
 * @param {Object} item - Elemento de galería a normalizar
 * @returns {Object} - Elemento normalizado con todos los campos requeridos
 */
 normalizeGalleryItem(item) {
  return {
    id: item.id || Date.now(),
    title: item.title || '',
    description: item.description || '',
    category: item.category || 'estado-actual',
    date: item.date || new Date().toISOString().split('T')[0],
    imageUrl: item.imageUrl || '',
    thumbnailUrl: item.thumbnailUrl || '',
    tags: Array.isArray(item.tags) ? item.tags : [], // Aseguramos que tags sea un array
    order: item.order || 0
  };
},
    // Método para cargar el contenido existente
    async loadContent() {
  try {
    await this.contentStore.loadContent();
    this.newsItems = [...this.contentStore.news];
    this.documents = [...this.contentStore.documents];
    this.legalDocuments = [...this.contentStore.legalDocuments];
    this.announcements = [...this.contentStore.announcements || []];
    this.gallery = (this.contentStore.gallery || []).map(item => this.normalizeGalleryItem(item));
    
    this.initialContent = {
      news: [...this.contentStore.news],
      documents: [...this.contentStore.documents],
      legalDocuments: [...this.contentStore.legalDocuments],
      announcements: [...this.contentStore.announcements || []],
      gallery: [...this.gallery]
    };
  } catch (error) {
    console.error('Error al cargar el contenido:', error);
    this.$refs.toast?.error('Error al cargar el contenido');
  }
},
  // Métodos para anuncios
  addAnnouncement() {
    this.announcements.push({
      id: Date.now(),
      title: 'Nuevo anuncio',
      type: 'info',
      description: '',
      active: false
    });
  },
  
  removeAnnouncement(index) {
    this.announcements.splice(index, 1);
  },
  
  toggleAnnouncementStatus(id) {
    const index = this.announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.announcements[index].active = !this.announcements[index].active;
    }
  },
  
  getAnnouncementIcon(type) {
    const icons = {
      'meeting': Calendar,
      'update': RefreshCw,
      'alert': AlertTriangle,
      'info': Info
    };
    return icons[type] || Info;
  },

async handleTabChange(newTab) {
      this.activeTab = newTab;
  },

  async handleSaveAndNavigate() {
  try {
    await this.saveChanges(); // Guarda los cambios
    if (this.navigationIntent) {
      this.$router.push(this.navigationIntent); // Navega a la ruta deseada
    }
    this.showUnsavedDialog = false;
    this.navigationIntent = null;
  } catch (error) {
    console.error('Error al guardar:', error);
  }
},

async handleDiscardAndNavigate() {
  try {
    this.showUnsavedDialog = false;
    // Actualizamos el estado inicial para que hasChanges sea false
    this.initialContent = JSON.parse(JSON.stringify({
      news: this.newsItems,
      documents: this.documents,
      legalDocuments: this.legalDocuments
    }));
    
    // Esperamos a que el diálogo se cierre antes de navegar
    await this.$nextTick();
    
    if (this.navigationIntent) {
      await this.$router.push(this.navigationIntent);
    }
    this.navigationIntent = null;
  } catch (error) {
    console.error('Error al navegar:', error);
  }
}
  },
  created() {
    // Prevenir cerrar la ventana si hay cambios
    this.beforeUnloadListener = (e) => {
      if (this.hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', this.beforeUnloadListener);
  },

  mounted() {
    this.loadContent();
  },

beforeUnmount() {
    window.removeEventListener('beforeunload', this.beforeUnloadListener);
},
beforeRouteLeave(to, from, next) {
  if (this.hasChanges) {
    this.showUnsavedDialog = true;
    this.navigationIntent = to.path;
    next(false);
  } else {
    next();
  }
}
}
</script>