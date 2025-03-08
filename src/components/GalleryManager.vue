<!-- src/components/GalleryManager.vue -->
<template>
    <div class="space-y-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-primary-dark">Galería de Imágenes</h2>
        <button
          @click="addImage"
          class="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors duration-200 flex items-center gap-2"
        >
          <PlusIcon class="w-5 h-5" />
          Añadir Imagen
        </button>
      </div>
  
      <!-- Lista de imágenes -->
      <draggable 
        v-model="images" 
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
              
              <!-- Miniatura -->
              <div class="h-12 w-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  :src="element.thumbnailUrl || '/api/placeholder/48/48'" 
                  :alt="element.title"
                  class="h-full w-full object-cover"
                />
              </div>
              
              <div class="flex-grow font-medium text-primary-dark truncate">
                {{ element.title || `Imagen ${index + 1}` }}
              </div>
              
              <div class="flex space-x-2">
                <span
                  v-for="tag in element.tags.slice(0, 2)"
                  :key="tag"
                  class="px-2 py-1 bg-primary-lighter text-primary text-xs rounded-full"
                >
                  {{ tag }}
                </span>
                <span v-if="element.tags.length > 2" class="text-xs text-gray-500 px-1">
                  +{{ element.tags.length - 2 }}
                </span>
              </div>
              
              <button
                @click.stop="toggleExpand(index)"
                class="text-primary hover:text-primary-dark"
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
            <div v-if="expandedIndex === index" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <!-- Título -->
              <div>
                <label class="block text-sm font-medium text-primary-dark mb-1">Título</label>
                <input
                  v-model="element.title"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                />
              </div>
              
              <!-- Fecha -->
              <div>
                <label class="block text-sm font-medium text-primary-dark mb-1">Fecha</label>
                <input
                  v-model="element.date"
                  type="text"
                  placeholder="ej. 15 de marzo, 2025"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                />
              </div>
              
              <!-- Descripción -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-primary-dark mb-1">Descripción</label>
                <textarea
                  v-model="element.description"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                ></textarea>
              </div>
              
              <!-- Etiquetas -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-primary-dark mb-1">Etiquetas</label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <div 
                    v-for="(tag, tagIndex) in element.tags" 
                    :key="tagIndex"
                    class="inline-flex items-center bg-primary-lighter text-primary px-2 py-1 rounded-full text-sm"
                  >
                    {{ tag }}
                    <button 
                      @click="removeTag(index, tagIndex)"
                      class="ml-1 text-primary hover:text-red-500"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="newTag"
                    type="text"
                    placeholder="Nueva etiqueta"
                    class="block flex-grow rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                    @keyup.enter="addTag(index)"
                  />
                  <button
                    @click="addTag(index)"
                    class="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark"
                  >
                    Añadir
                  </button>
                </div>
              </div>
              
              <!-- Carga de archivos -->
              <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Imagen principal -->
                <div>
                  <label class="block text-sm font-medium text-primary-dark mb-1">Imagen principal</label>
                  <div class="mt-1 flex items-center">
                    <div class="bg-gray-100 rounded-md overflow-hidden mr-4" style="width: 100px; height: 100px;">
                      <img 
                        :src="element.imageUrl || '/api/placeholder/100/100'" 
                        alt="Vista previa"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex-1">
                      <input
                        @change="handleImageUpload($event, index, 'main')"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        :id="`main-image-${element.id}`"
                      />
                      <label 
                        :for="`main-image-${element.id}`"
                        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
                      >
                        Cambiar imagen
                      </label>
                    </div>
                  </div>
                </div>
                
                <!-- Miniatura -->
                <div>
                  <label class="block text-sm font-medium text-primary-dark mb-1">Miniatura</label>
                  <div class="mt-1 flex items-center">
                    <div class="bg-gray-100 rounded-md overflow-hidden mr-4" style="width: 100px; height: 100px;">
                      <img 
                        :src="element.thumbnailUrl || '/api/placeholder/100/100'" 
                        alt="Vista previa de miniatura"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex-1">
                      <input
                        @change="handleImageUpload($event, index, 'thumbnail')"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        :id="`thumbnail-${element.id}`"
                      />
                      <label 
                        :for="`thumbnail-${element.id}`"
                        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
                      >
                        Cambiar miniatura
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Acciones -->
              <div class="md:col-span-2 flex justify-end mt-4">
                <button
                  @click.stop="removeImage(index)"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  title="Eliminar imagen"
                >
                  <Trash2 class="w-4 h-4 mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </template>
      </draggable>
      
      <!-- Mensaje sin imágenes -->
      <div v-if="images.length === 0" class="text-center py-10 bg-gray-50 rounded-lg">
        <ImageIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay imágenes</h3>
        <p class="mt-1 text-sm text-gray-500">Comienza añadiendo tu primera imagen a la galería.</p>
        <div class="mt-6">
          <button
            @click="addImage"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark focus:outline-none"
          >
            <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
            Añadir imagen
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue'
  import { PlusIcon, Trash2, ImageIcon } from 'lucide-vue-next'
  import draggable from 'vuedraggable'
  import { api } from '@/services/api'
  import { useGalleryStore } from '@/stores/galleryStore'
  
  export default {
    name: 'GalleryManager',
    components: {
      PlusIcon,
      Trash2,
      ImageIcon,
      draggable
    },
    
    props: {
      modelValue: {
        type: Array,
        default: () => []
      }
    },
    
    emits: ['update:modelValue', 'change'],
    
    setup(props, { emit }) {
      // Estado local
      const galleryStore = useGalleryStore()
      const images = ref([...props.modelValue])
      const expandedIndex = ref(null)
      const newTag = ref('')
      
      // Observar cambios en los props
      watch(() => props.modelValue, (newVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(images.value)) {
          images.value = [...newVal]
        }
      })
      
      // Observar cambios en las imágenes locales
      watch(images, (newVal) => {
        emit('update:modelValue', newVal)
        emit('change', newVal)
      }, { deep: true })
      
      // Expandir/contraer panel de edición
      const toggleExpand = (index) => {
        expandedIndex.value = expandedIndex.value === index ? null : index
      }
      
      // Añadir nueva imagen
      const addImage = () => {
        const newImage = {
          id: Date.now(),
          title: '',
          description: '',
          date: new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          imageUrl: null,
          thumbnailUrl: null,
          tags: []
        }
        
        images.value.push(newImage)
        // Expandir automáticamente la nueva imagen
        expandedIndex.value = images.value.length - 1
      }
      
      // Eliminar imagen
      const removeImage = (index) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
          images.value.splice(index, 1)
          expandedIndex.value = null
        }
      }
      
      // Añadir etiqueta
      const addTag = (imageIndex) => {
        if (!newTag.value.trim()) return
        
        // Verificar si la etiqueta ya existe
        if (!images.value[imageIndex].tags.includes(newTag.value.trim())) {
          images.value[imageIndex].tags.push(newTag.value.trim())
        }
        
        newTag.value = ''
      }
      
      // Eliminar etiqueta
      const removeTag = (imageIndex, tagIndex) => {
        images.value[imageIndex].tags.splice(tagIndex, 1)
      }
      
      // Gestionar subida de imágenes
      const handleImageUpload = async (event, imageIndex, type) => {
        const file = event.target.files[0]
        if (!file) return
        
        try {
          const response = await api.uploadGalleryImage(file)
          
          if (type === 'main') {
            images.value[imageIndex].imageUrl = response.imageUrl
          } else if (type === 'thumbnail') {
            images.value[imageIndex].thumbnailUrl = response.thumbnailUrl
          }
        } catch (error) {
          console.error('Error al subir la imagen:', error)
          alert('Error al subir la imagen. Por favor, inténtalo de nuevo.')
        }
      }
      
      return {
        images,
        expandedIndex,
        newTag,
        toggleExpand,
        addImage,
        removeImage,
        addTag,
        removeTag,
        handleImageUpload
      }
    }
  }
  </script>
  