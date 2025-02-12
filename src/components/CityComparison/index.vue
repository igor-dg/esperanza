# TrafficAnalysis/components/CityComparison/index.vue
<template>
  <div class="space-y-8">
    <!-- Gráfico comparativo -->
    <CityTrafficChart />
    
    <!-- Mapa de tráfico -->
    <TrafficMap />
  </div>
</template>

<script>
import CityTrafficChart from '@/components/CityTrafficChart.vue'
import TrafficMap from '@/components/TrafficMap.vue'

export default {
  name: 'CityComparison',
  components: {
    CityTrafficChart,
    TrafficMap
  }
}
</script>