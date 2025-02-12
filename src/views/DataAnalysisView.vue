# TrafficAnalysis/index.vue
<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between border-b border-gray-200 pb-4">
      <h1 class="text-3xl font-bold text-primary-dark">Análisis de Tráfico</h1>
      
      <div class="flex space-x-4">
        <button
          @click="currentTab = 'single'"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="[
            currentTab === 'single'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-primary-lighter text-primary-dark hover:bg-primary-light'
          ]"
        >
          Calle Francia
        </button>
        
        <button
          @click="currentTab = 'comparison'"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="[
            currentTab === 'comparison'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-primary-lighter text-primary-dark hover:bg-primary-light'
          ]"
        >
          Comparativa Ciudad
        </button>
      </div>
    </div>

    <!-- Tab content -->
    <div class="mt-6">
      <SingleStreetAnalysis v-if="currentTab === 'single'" />
      <CityComparison v-if="currentTab === 'comparison'" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SingleStreetAnalysis from '@/components/SingleStreetAnalysis/index.vue'
import CityComparison from '@/components/CityComparison/index.vue'

export default {
  name: 'TrafficAnalysis',
  components: {
    SingleStreetAnalysis,
    CityComparison
  },
  setup() {
    const currentTab = ref('single')
    const tabs = [
      { id: 'single', name: 'Calle Francia' },
      { id: 'comparison', name: 'Comparativa Ciudad' }
    ]

    return {
      currentTab,
      tabs
    }
  }
}
</script>