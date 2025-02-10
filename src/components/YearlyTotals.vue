<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Tráfico total anual</h3>
    <div v-if="error" class="text-red-600 mb-4">
      {{ error }}
    </div>
    <div id="yearlyTotalChart" class="w-full h-80"></div>
    <p class="text-sm text-gray-500 mt-4">
      * Datos disponibles desde el 25 de agosto de 2021
    </p>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import ApexCharts from 'apexcharts'
import _ from 'lodash'

export default {
  name: 'YearlyTotals',
  
  props: {
    yearlyData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  setup(props) {
    let chart = null
    const error = ref(null)
    const AVAILABLE_YEARS = [2021, 2022, 2023, 2024, 2025]

    const YEAR_COLORS = {
      2021: '#0EA5E9',
      2022: '#EAB308',
      2023: '#EC4899',
      2024: '#84CC16',
      2025: '#6366F1'
    }

    const processYearData = (yearData) => {
      if (!yearData || !yearData.data) return 0
      return _.chain(yearData.data)
        .map(item => parseInt(item[2]))
        .sum()
        .value()
    }

    const initChart = () => {
      try {
        const yearlyTotals = AVAILABLE_YEARS.map(year => ({
          x: year.toString(),
          y: processYearData(props.yearlyData[year])
        }))

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
            zoom: {
              enabled: false
            },
            selection: {
              enabled: false
            },
            pan: {
              enabled: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 4,
              distributed: true
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
            show: false
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

        if (document.querySelector("#yearlyTotalChart")) {
          chart = new ApexCharts(document.querySelector("#yearlyTotalChart"), options)
          chart.render()
        }
      } catch (err) {
        error.value = `Error inicializando el gráfico: ${err.message}`
        console.error('Error en initChart:', err)
      }
    }

    watch(() => props.yearlyData, (newData) => {
      if (Object.keys(newData).length > 0) {
        if (chart) {
          chart.destroy()
        }
        initChart()
      }
    }, { deep: true })

    onMounted(() => {
      if (Object.keys(props.yearlyData).length > 0) {
        initChart()
      }
    })

    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy()
      }
    })

    return {
      error
    }
  }
}
</script>