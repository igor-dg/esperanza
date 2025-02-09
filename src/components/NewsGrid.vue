<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-gray-900">Últimas Noticias</h2>
      <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
        Cobertura mediática sobre el proceso de cambio
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-gray-600">Cargando noticias...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- News grid -->
    <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="article in newsMetadata" 
        :key="article.url"
        class="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
      >
        <div class="relative h-48" v-if="article.image">
          <img 
            :src="article.image" 
            :alt="article.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
        </div>

        <div class="p-6">
          <div class="flex items-center text-sm text-gray-500 mb-3">
            <span>{{ article.siteName }}</span>
          </div>

          <div class="flex items-center space-x-2 text-sm text-gray-600 mb-3">
            <time 
              :datetime="article.publishDate" 
              class="flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(article.publishDate) }}
            </time>
          </div>

          <a 
            :href="article.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="group"
          >
            <h3 class="text-xl font-semibold text-gray-900 group-hover:text-primary mb-2">
              {{ article.title }}
            </h3>
            <p class="text-gray-600 line-clamp-3">{{ article.description }}</p>
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'

export default {
  name: 'NewsGrid',
  setup() {
    const loading = ref(true)
    const error = ref(null)
    const newsMetadata = ref([])

    const fetchMetadata = async (url) => {
      try {
        const response = await fetch(`https://idg.eus/esperanzakalea/get-news-metadata.php?url=${encodeURIComponent(url)}`)
        if (!response.ok) throw new Error('Error fetching metadata')
        const data = await response.json()
        return {
          ...data,
          publishDate: data.publishDate || null
        }
      } catch (error) {
        console.error('Error fetching metadata:', error)
        return null
      }
    }

    const formatDate = (isoDate) => {
      if (!isoDate) return ''
      try {
        const date = new Date(isoDate)
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (error) {
        console.error('Error formatting date:', error)
        return ''
      }
    }

    const loadNews = async () => {
      loading.value = true
      error.value = null
      try {
        // Cargar las URLs desde el gestor de contenidos
        const data = await api.loadContent()
        const newsItems = data.news || []
        
        // Obtener metadatos para cada URL
        const metadataPromises = newsItems.map(news => fetchMetadata(news.url))
        const results = await Promise.all(metadataPromises)
        newsMetadata.value = results.filter(item => item !== null)
      } catch (err) {
        error.value = 'Error cargando las noticias'
        console.error('Error loading news:', err)
      } finally {
        loading.value = false
      }
    }

    const handleImageError = (event) => {
      event.target.src = '/images/placeholder-news.jpg'
    }

    onMounted(() => {
      loadNews()
    })

    return {
      loading,
      error,
      newsMetadata,
      handleImageError,
      formatDate
    }
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>