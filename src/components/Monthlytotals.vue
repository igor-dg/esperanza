<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Totales mensuales</h3>
      <div v-if="loadError" class="text-red-600 mb-4">
        {{ loadError }}
      </div>
      <div id="monthlyChart" class="w-full h-96"></div>
    </div>
  </template>
  
  <script>
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import ApexCharts from 'apexcharts'
  import _ from 'lodash'
  
  export default {
    name: 'MonthlyTotals',
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
          console.log(`Procesando datos mensuales del año ${year}...`)
          
          const response = await fetch(`${baseUrl}${year}.json`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          
          // Agrupar por mes y sumar vehículos
          const monthlyData = _.chain(data.data)
            .map(item => ({
              date: new Date(item[0]),
              vehicles: parseInt(item[2])
            }))
            .groupBy(item => item.date.getMonth())
            .map((monthData, month) => ({
  x: parseInt(month) + 1,  // Asegura que enero sea 1, febrero 2, etc.
  y: _.sumBy(monthData, 'vehicles')
}))
            .sortBy('x')
            .value()

          return monthlyData
          
        } catch (error) {
          console.error(`Error procesando datos del año ${year}:`, error)
          loadError.value = `Error cargando datos del año ${year}: ${error.message}`
          return []
        }
      }
  
      const initChart = async () => {
        try {
          const seriesData = await Promise.all(
            AVAILABLE_YEARS.map(async year => ({
              name: `Total ${year}`,
              data: await processYearData(year),
              color: YEAR_COLORS[year]
            }))
          )
  
          const options = {
            series: seriesData,
            chart: {
              type: 'line',
              height: 380,
              fontFamily: 'inherit',
              toolbar: {
                show: false
              },
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
  tickPlacement: 'on'  // Asegura que cada punto se asocie correctamente con su mes
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
  
          chart = new ApexCharts(document.querySelector("#monthlyChart"), options)
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