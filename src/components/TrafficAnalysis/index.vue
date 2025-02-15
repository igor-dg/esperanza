# TrafficAnalysis/index.vue
<template>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <!-- Header and navigation container -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-red-200">
        <h1 class="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Prueba Análisis de Tráfico - Vitoria-Gasteiz</h1>

      <!-- Tabs -->
      <div class="border-b border-gray-200 md:border-none w-full md:w-auto">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[
              currentTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Tab content -->
    <div class="mt-8">
      <SingleStreetAnalysis v-if="currentTab === 'single'" />
      <CityComparison v-if="currentTab === 'comparison'" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SingleStreetAnalysis from './components/SingleStreetAnalysis/index.vue'
import CityComparison from './components/CityComparison/index.vue'

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