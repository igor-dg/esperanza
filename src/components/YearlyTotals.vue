<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Total Anual de Tráfico</h3>
      <div v-if="loadError" class="text-red-600 mb-4">
        {{ loadError }}
      </div>
      <div id="yearlyTotalChart" class="w-full h-80"></div>
      <p class="text-sm text-gray-500 mt-4">
        * Datos disponibles desde el 25 de agosto de 2021
      </p>
    </div>
  </template>
  
  <script>
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import ApexCharts from 'apexcharts'
  import _ from 'lodash'
  
  export default {
    name: 'YearlyTotals',
    setup() {
        const baseUrl = import.meta.env.BASE_URL

      let chart = null
      const loadError = ref(null)
      const AVAILABLE_YEARS = [2021, 2022, 2023, 2024, 2025]

      const YEAR_COLORS = {
  2021: '#0EA5E9', // Celeste
  2022: '#EAB308', // Amarillo
  2023: '#EC4899', // Rosa fuerte
  2024: '#84CC16', // Verde lima
  2025: '#6366F1'  // Índigo
}

      const processYearData = async (year) => {
        try {
          console.log(`Procesando total del año ${year}...`)
          
          const response = await fetch(`${baseUrl}${year}.json`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          
          // Sumar todos los vehículos del año
          const yearlyTotal = _.chain(data.data)
            .map(item => parseInt(item[2]))
            .sum()
            .value()

          return yearlyTotal
        } catch (error) {
          console.error(`Error procesando datos del año ${year}:`, error)
          loadError.value = `Error cargando datos del año ${year}: ${error.message}`
          return 0
        }
      }
  
      const initChart = async () => {
        try {
          const yearlyTotals = await Promise.all(
            AVAILABLE_YEARS.map(async year => ({
              x: year.toString(),
              y: await processYearData(year)
            }))
          )
  
          const options = {
            series: [{
              name: 'Total Vehículos',
              data: yearlyTotals
            }],
            chart: {
              type: 'bar',
              height: 345,
              fontFamily: 'inherit',
              toolbar: {
                show: false
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '60%',
                borderRadius: 4,
                distributed: true // Permite colores individuales para cada barra
              },
            },
            colors: AVAILABLE_YEARS.map(year => YEAR_COLORS[year]),
            dataLabels: {
              enabled: true,
              formatter: (value) => {
                return new Intl.NumberFormat('es-ES').format(value)
              },
              style: {
                fontSize: '12px',
                colors: ['#000000']
              }
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
              },
            },
            xaxis: {
              type: 'category',
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
              show: false // Ocultamos la leyenda ya que cada barra tiene su propio color
            },
            annotations: {
              points: [{
                x: '2021',
                y: 0,
                marker: {
                  size: 0
                },
                label: {
                  text: '* Datos parciales',
                  borderColor: '#999',
                  style: {
                    background: '#fff',
                    color: '#999',
                    fontSize: '11px'
                  },
                  offsetY: -15
                }
              }]
            }
          }
  
          chart = new ApexCharts(document.querySelector("#yearlyTotalChart"), options)
          await chart.render()
        } catch (error) {
          console.error('Error inicializando el gráfico:', error)
          loadError.value = `Error inicializando el gráfico: ${error.message}`
        }
      }
  
      onMounted(() => {
        initChart()
      })
  
      onBeforeUnmount(() => {
        if (chart) {
          chart.destroy()
        }
      })
  
      return {
        loadError
      }
    }
  }
  </script>