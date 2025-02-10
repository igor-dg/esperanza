<template>
    <div class="space-y-6">
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600">Cargando datos de tráfico...</p>
      </div>
  
      <!-- Error state -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>
  
      <!-- Content -->
      <template v-if="!loading && !error">
        <YearlyTotals :yearlyData="yearlyData" />
        <MonthlyTotals :yearlyData="yearlyData" />
        <YearlyComparison :yearlyData="yearlyData" />
      </template>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useTrafficStore } from '@/stores/trafficStore'
  import YearlyTotals from './YearlyTotals.vue'
  import MonthlyTotals from './MonthlyTotals.vue'
  import YearlyComparison from './YearlyComparison.vue'
  
  export default {
    name: 'TrafficDashboard',
    
    components: {
      YearlyTotals,
      MonthlyTotals,
      YearlyComparison
    },
  
    setup() {
      const trafficStore = useTrafficStore()
      const loading = ref(true)
      const error = ref(null)
      const yearlyData = ref({})
      
      const AVAILABLE_YEARS = [2021, 2022, 2023, 2024, 2025]
  
      const loadAllData = async () => {
        try {
          loading.value = true
          error.value = null
          
          // Cargamos todos los años de una vez
          const results = await trafficStore.fetchMultipleYears(AVAILABLE_YEARS)
          
          // Organizamos los datos por año
          AVAILABLE_YEARS.forEach((year, index) => {
            yearlyData.value[year] = results[index]
          })
        } catch (err) {
          error.value = 'Error cargando los datos de tráfico: ' + err.message
          console.error('Error loading traffic data:', err)
        } finally {
          loading.value = false
        }
      }
  
      onMounted(() => {
        loadAllData()
      })
  
      return {
        loading,
        error,
        yearlyData
      }
    }
  }
  </script>