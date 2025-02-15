# TrafficAnalysis/components/CityComparison/components/CityTrafficChart.vue
<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Comparativa de tráfico por calles</h3>
    
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">
      <Loader2 class="h-8 w-8 animate-spin mx-auto mb-2 text-primary-light" />
      <p class="text-primary">Cargando datos de tráfico...</p>
    </div>

    <!-- Error state -->
    <div v-if="error" class="text-red-600 mb-4">
      {{ error }}
    </div>

    <!-- Chart container con dimensiones explícitas -->
    <div v-show="!loading && !error" class="relative" style="min-height: 400px;">
      <div ref="chartRef" class="w-full absolute inset-0"></div>
    </div>
    
    <p class="text-sm text-gray-500 mt-4">
      * Datos disponibles desde el 25 de agosto de 2021
    </p>
    <p class="text-sm text-gray-500 mt-4">
      ** El medidor de la calle Los Herrán está fuera de servicio actualmente
    </p>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useCityTrafficStore } from '@/stores/cityTrafficStore'
import ApexCharts from 'apexcharts'
import { Loader2 } from 'lucide-vue-next'
import _ from 'lodash'

export default {
  name: 'CityTrafficChart',
  
  components: {
    Loader2
  },

  setup() {
    const cityTrafficStore = useCityTrafficStore()
    const loading = ref(true)
    const error = ref(null)
    const chartRef = ref(null)
    let chart = null

    const STREET_COLORS = {
      'Francia': '#0EA5E9',
      'Manuel Iradier': '#EAB308',
      'Florida': '#EC4899',
      'Domingo Beltrán': '#84CC16',
      'Reyes Católicos': '#6366F1',
      'Coronación': '#F97316',
      'Los Herrán': '#14B8A6'
    }

    const processYearlyData = (data) => {
      return _.chain(data)
        .groupBy(item => item[0].substring(0, 4))
        .mapValues(yearGroup => 
          _.sumBy(yearGroup, item => parseInt(item[1]))
        )
        .value()
    }

    const initChart = async (streetsData) => {
      try {
        await nextTick()
        
        const years = ['2021', '2022', '2023', '2024', '2025']
        const processedData = {}

        Object.entries(streetsData).forEach(([streetName, streetInfo]) => {
          if (streetInfo.data && streetInfo.data.data) {
            processedData[streetName] = processYearlyData(streetInfo.data.data)
          }
        })

        const series = Object.keys(processedData).map(street => ({
          name: street,
          data: years.map(year => processedData[street][year] || 0)
        }))

        const options = {
          series,
          chart: {
            type: 'bar',
            height: 400,
            width: '100%',
            fontFamily: 'inherit',
            stacked: false,
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              borderRadius: 4
            }
          },
          colors: Object.values(STREET_COLORS),
          dataLabels: {
            enabled: false
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: years,
            labels: {
              style: {
                fontWeight: 500
              }
            }
          },
          yaxis: {
            title: {
              text: 'Total Vehículos'
            },
            labels: {
              formatter: (value) => {
                return new Intl.NumberFormat('es-ES', {
                  notation: 'compact',
                  compactDisplay: 'short'
                }).format(value)
              }
            }
          },
          tooltip: {
            y: {
              formatter: (value) => {
                return new Intl.NumberFormat('es-ES').format(value) + ' vehículos'
              }
            }
          },
          legend: {
            position: 'right',
            offsetY: 40
          }
        }

        if (chart) {
          chart.destroy()
        }

        if (chartRef.value) {
          chart = new ApexCharts(chartRef.value, options)
          await chart.render()
        }
      } catch (err) {
        error.value = `Error inicializando el gráfico: ${err.message}`
        console.error('Error en initChart:', err)
      }
    }

    const loadData = async () => {
      try {
        loading.value = true
        error.value = null
        
        await cityTrafficStore.fetchAllStreetsData()
        const streetsData = cityTrafficStore.streetsData
        
        if (Object.keys(streetsData).length > 0) {
          await initChart(streetsData)
        } else {
          error.value = 'No hay datos disponibles'
        }
      } catch (err) {
        error.value = 'Error cargando los datos de tráfico: ' + err.message
        console.error('Error loading traffic data:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadData()
    })

    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy()
      }
    })

    return {
      loading,
      error,
      chartRef
    }
  }
}
</script>