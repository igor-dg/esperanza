<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Totales mensuales</h3>
    <div v-if="error" class="text-red-600 mb-4">
      {{ error }}
    </div>
    <div id="monthlyChart" class="w-full h-96"></div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import ApexCharts from 'apexcharts'
import _ from 'lodash'

export default {
  name: 'MonthlyTotals',
  
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
      2021: '#0EA5E9', // Celeste
      2022: '#EAB308', // Amarillo
      2023: '#EC4899', // Rosa fuerte
      2024: '#84CC16', // Verde lima
      2025: '#6366F1'  // Índigo
    }

    const processYearData = (year) => {
      try {
        const yearData = props.yearlyData[year]
        if (!yearData || !yearData.data) return []
        
        // Agrupar por mes y sumar vehículos
        return _.chain(yearData.data)
          .map(item => ({
            date: new Date(item[0]),
            vehicles: parseInt(item[2])
          }))
          .groupBy(item => item.date.getMonth())
          .map((monthData, month) => ({
            x: parseInt(month) + 1,
            y: _.sumBy(monthData, 'vehicles')
          }))
          .sortBy('x')
          .value()
      } catch (error) {
        console.error(`Error procesando datos del año ${year}:`, error)
        return []
      }
    }

    const initChart = () => {
      try {
        const seriesData = AVAILABLE_YEARS.map(year => ({
          name: `Total ${year}`,
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
            size: 4
          },
          xaxis: {
            type: 'category',
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            tickPlacement: 'on'
          },
          yaxis: {
            title: {
              text: 'Total Vehículos'
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
            y: {
              formatter: (value) => {
                return new Intl.NumberFormat('es-ES').format(value) + ' vehículos'
              }
            }
          }
        }

        if (document.querySelector("#monthlyChart")) {
          chart = new ApexCharts(document.querySelector("#monthlyChart"), options)
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