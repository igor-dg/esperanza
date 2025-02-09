<template>
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Comparativa Anual de Tráfico (IMD)</h3>
      <div v-if="loadError" class="text-red-600 mb-4">
        {{ loadError }}
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
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import ApexCharts from 'apexcharts'
  import _ from 'lodash'
  
  export default {
    name: 'YearlyComparison',
    setup() {
        const baseUrl = import.meta.env.BASE_URL

      let chart = null
      const loadError = ref(null)
      const loading = ref(true)

      const AVAILABLE_YEARS = [2021, 2022, 2023, 2024, 2025]

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

      const YEAR_COLORS = {
  2021: '#0EA5E9', // Celeste
  2022: '#EAB308', // Amarillo
  2023: '#EC4899', // Rosa fuerte
  2024: '#84CC16', // Verde lima
  2025: '#6366F1'  // Índigo
}

      const CORRECTION_FACTORS = {
        laboral: 1.0,    // Día base
        sabado: 1.15,    // Factor para compensar menor tráfico
        domingo: 1.3     // Factor para compensar menor tráfico
      }

      const calculateIMD = (data) => {
        return _.chain(data)
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
              x: parseInt(weekDayOfYear), // día del año (0-365)
              y: imd
            }
          })
          .sortBy('x')
          .value()
      }

      const processYearData = async (year) => {
        try {
          console.log(`Procesando datos IMD del año ${year}...`)
          
          const response = await fetch(`${baseUrl}${year}.json`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          
          const dailyData = _.chain(data.data)
            .map(item => ({
              date: item[0],
              vehicles: parseInt(item[2])
            }))
            .value()

          return calculateIMD(dailyData)
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
              name: `IMD ${year}`,
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
                show: true
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
              size: 1
            },
            xaxis: {
              type: 'numeric',
              title: {
                text: 'Día del año'
              },
              min: 0,
              max: 365,
              tickAmount: 12,
              labels: {
                formatter: (value) => {
                  // Convertimos el día del año a fecha
                  const date = new Date(2024, 0, value) // Usamos 2024 como año base (bisiesto)
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
  
          chart = new ApexCharts(document.querySelector("#chart"), options)
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