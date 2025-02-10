<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Comparativa de tráfico anual (IMD)</h3>
    <div v-if="error" class="text-red-600 mb-4">
      {{ error }}
    </div>
    <div id="chart" class="w-full h-96"></div>
    <p class="text-sm text-gray-500 mt-2">
      * IMD: Intensidad Media Diaria calculada sobre períodos de 7 días
      <br/>
      * Incluye factor de corrección semanal para normalizar días laborables y festivos
    </p>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import ApexCharts from 'apexcharts'
import _ from 'lodash'

export default {
  name: 'YearlyComparison',
  
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

    const getDayType = (dateStr) => {
      const date = new Date(dateStr)
      const day = date.getDay()
      if (day === 0) return 'domingo'
      if (day === 6) return 'sabado'
      return 'laboral'
    }

    const getDayOfYear = (dateStr) => {
      const date = new Date(dateStr)
      const start = new Date(date.getFullYear(), 0, 0)
      const diff = date - start
      const oneDay = 1000 * 60 * 60 * 24
      return Math.floor(diff / oneDay)
    }

    const CORRECTION_FACTORS = {
      laboral: 1.0,    // Día base
      sabado: 1.15,    // Factor para compensar menor tráfico
      domingo: 1.3     // Factor para compensar menor tráfico
    }

    const calculateIMD = (data) => {
      if (!data || !Array.isArray(data)) return []

      return _.chain(data)
        .map(item => ({
          date: item[0],
          vehicles: parseInt(item[2])
        }))
        // Agrupamos por semanas usando el día del año
        .groupBy(item => {
          const dayOfYear = getDayOfYear(item.date)
          // Redondeamos al lunes de la semana
          return Math.floor(dayOfYear / 7) * 7
        })
        .map((weekData, weekDayOfYear) => {
          const totalTraffic = _.sumBy(weekData, item => {
            const dayType = getDayType(item.date)
            return item.vehicles * CORRECTION_FACTORS[dayType]
          })
          
          const imd = Math.round(totalTraffic / 7)
          
          return {
            x: parseInt(weekDayOfYear),
            y: imd
          }
        })
        .sortBy('x')
        .value()
    }

    const processYearData = (year) => {
      const yearData = props.yearlyData[year]
      if (!yearData || !yearData.data) return []
      return calculateIMD(yearData.data)
    }

    const initChart = () => {
      try {
        const seriesData = AVAILABLE_YEARS.map(year => ({
          name: `IMD ${year}`,
          data: processYearData(year),
          color: YEAR_COLORS[year]
        }))

        const options = {
          series: seriesData,
          chart: {
            type: 'line',
            height: 380,
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
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 2,
            curve: 'smooth'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
          xaxis: {
            type: 'numeric',
            min: 0,
            max: 365,
            tickAmount: 12,
            labels: {
              formatter: (value) => {
                const date = new Date(2024, 0, value)
                return date.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short'
                })
              }
            }
          },
          yaxis: {
            title: {
              text: 'Intensidad Media Diaria (IMD)'
            },
            labels: {
              formatter: (value) => {
                return new Intl.NumberFormat('es-ES').format(value)
              }
            }
          },
          legend: {
            position: 'top',
            horizontalAlign: 'center'
          },
          tooltip: {
            x: {
              formatter: (value) => {
                const date = new Date(2024, 0, value)
                return date.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long'
                })
              }
            },
            y: {
              formatter: (value) => {
                return new Intl.NumberFormat('es-ES').format(value) + ' vehículos/día'
              }
            }
          }
        }

        if (document.querySelector("#chart")) {
          chart = new ApexCharts(document.querySelector("#chart"), options)
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