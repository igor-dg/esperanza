<template>
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-primary-dark mb-8">Calle Francia</h1>
      
      <!-- Tarjetas de tráfico actual -->  
      <div v-if="error" class="bg-red-50 p-4 rounded-md">
        <p class="text-red-700">{{ error }}</p>
      </div>
  
      <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TrafficCard
          title="Tráfico Hoy"
          :value="todayTraffic"
          :time="currentTime"
          type="today"
        />
        
        <TrafficCard
          title="Tráfico Ayer"
          :value="yesterdayTraffic"
          type="yesterday"
        />
      </div>
  
      <p class="mt-4 text-sm text-gray-500 text-center">
        Última actualización: {{ lastUpdateTime }}
      </p>
  
      <!-- Gráficos de análisis -->
      <div class="container mx-auto px-4 py-8">
    <TrafficDashboard />
  </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import TrafficDashboard from '@/components/TrafficDashboard.vue'
  import TrafficCard from '@/components/TrafficCard.vue'
  import { obtenerDatosTrafico } from '@/services/trafficService'
  
  export default {
    name: 'DataAnalysisView',
    components: {
      TrafficCard,
      TrafficDashboard
    },
    setup() {
      const todayTraffic = ref(0)
      const yesterdayTraffic = ref(0)
      const currentTime = ref('')
      const loading = ref(true)
      const error = ref(null)
      const lastUpdateTime = ref('')
      let updateInterval = null
  
      const updateTrafficData = async () => {
        try {
          loading.value = true
          error.value = null
  
          const data = await obtenerDatosTrafico()
          
          todayTraffic.value = data.today
          yesterdayTraffic.value = data.yesterday
          currentTime.value = data.currentTime
          lastUpdateTime.value = new Date().toLocaleTimeString('es-ES')
          
          loading.value = false
        } catch (err) {
          error.value = err.message
          loading.value = false
        }
      }
  
      onMounted(async () => {
        await updateTrafficData()
        // Actualizar datos cada 15 minutos
        updateInterval = setInterval(updateTrafficData, 15 * 60 * 1000)
      })
  
      onBeforeUnmount(() => {
        if (updateInterval) {
          clearInterval(updateInterval)
        }
      })
  
      return {
        todayTraffic,
        yesterdayTraffic,
        currentTime,
        loading,
        error,
        lastUpdateTime
      }
    }
  }
  </script>