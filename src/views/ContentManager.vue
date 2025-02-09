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
                : 'border-transparent text-gray-500 hover:text-accent hover:bg-accent-lighter/50',
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
                class="text-gray-500 hover:text-gray-700"
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
<!-- Template para la sección de Marco Legal -->
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
          <div class="text-sm text-gray-500">
            {{ element.category }}
          </div>
          <button
            @click.stop="toggleLegalExpand(index)"
            class="text-gray-500 hover:text-gray-700"
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
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
import { SaveIcon, PlusIcon, Trash2 } from 'lucide-vue-next'
import { api } from '@/services/api'
import { adminApi } from '@/services/adminApi'
import draggable from 'vuedraggable'
import UnsavedChangesDialog from '@/components/UnsavedChangesDialog.vue'
import ToastNotification from '@/components/ToastNotification.vue'
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
    UnsavedChangesDialog,
    ToastNotification
  },
  data() {
    return {
      activeTab: 'news',
      tabs: [
        { id: 'news', name: 'Noticias' },
        { id: 'documents', name: 'Documentos' },
        { id: 'legal', name: 'Marco Legal' }
      ],
      newsItems: [],
      documents: [],
      legalDocuments: [],
      expandedIndex: null,
      initialContent: null,
      showUnsavedDialog: false,
      navigationIntent: null,
      expandedLegalIndex: null,
      legalDocuments: []
    }
  },
  computed: {
    // Verifica si hay cambios en el contenido
    hasChanges() {
      if (!this.initialContent) return false

      return (
        JSON.stringify(this.newsItems) !== JSON.stringify(this.initialContent.news) ||
        JSON.stringify(this.documents) !== JSON.stringify(this.initialContent.documents) ||
        JSON.stringify(this.legalDocuments) !== JSON.stringify(this.initialContent.legalDocuments)
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
        legalDocuments: this.legalDocuments
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

    // Método para cargar el contenido existente
    async loadContent() {
    try {
      await this.contentStore.loadContent()
      this.newsItems = [...this.contentStore.news]
      this.documents = [...this.contentStore.documents]
      this.legalDocuments = [...this.contentStore.legalDocuments]
      this.initialContent = {
        news: [...this.contentStore.news],
        documents: [...this.contentStore.documents],
        legalDocuments: [...this.contentStore.legalDocuments]
      }
    } catch (error) {
      console.error('Error al cargar el contenido:', error)
      this.$refs.toast?.error('Error al cargar el contenido')
    }
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