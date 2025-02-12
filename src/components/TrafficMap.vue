# TrafficAnalysis/components/CityComparison/components/TrafficMap.vue
<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Mapa de medidores de tráfico en tiempo real</h3>
    
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">
      <Loader2 class="h-8 w-8 animate-spin mx-auto mb-2 text-primary-light" />
      <p class="text-primary">Cargando medidores...</p>
    </div>

    <!-- Error state -->
    <div v-if="error" class="text-red-600 mb-4">
      {{ error }}
    </div>

    <!-- Map container -->
    <div ref="mapContainer" class="w-full h-[600px] rounded-lg"></div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  name: 'TrafficMap',
  
  components: {
    Loader2
  },

  setup() {
    const mapContainer = ref(null)
    const loading = ref(true)
    const error = ref(null)
    let map = null

    // Configuración de los medidores destacados con sus IDs y colores
    const HIGHLIGHTED_METERS = {
      4284: { name: 'Francia', color: '#0EA5E9' },
      4178: { name: 'Manuel Iradier', color: '#EAB308' },
      5065: { name: 'Florida', color: '#EC4899' },
      7231: { name: 'Domingo Beltrán', color: '#84CC16' },
      6452: { name: 'Reyes Católicos', color: '#6366F1' },
      7130: { name: 'Coronación', color: '#F97316' },
      4313: { name: 'Los Herrán', color: '#14B8A6' }
    }

    // Lista de medidores excluidos (los mismos que en tu código original)
    const meterIdsExcluidos = [5790, 5791, 5750, 2241, 2242, 2245, 2246, 2261, 4995, 5000, 5002, 5005, 4282, 4172, 4176, 4177, 4964, 4286, 4291, 4299, 4315, 4968, 4973, 4974, 4975, 4319, 4323, 4473, 8568, 8571, 8458, 8463, 9219, 8610, 9135, 8822, 8824, 8826, 8828, 8829, 8613, 8614, 8616, 8619, 8623, 9137, 9262, 9264, 9265, 9577, 9581, 9322, 9208, 8452, 8547, 8551, 1439, 1475, 1347, 1348, 1350, 1354, 1355, 1356, 1358, 7050, 7177, 7178, 7181, 7059, 7204, 7216, 6798, 6547, 6548, 6549, 7228, 7234, 5052, 5054, 5057, 5063, 5067, 5068, 5072, 6448, 6451, 6454, 7124, 7125, 6466, 6478, 7834, 7155, 6446, 11385, 11388, 11516, 11519, 11522, 11524, 10948, 11563, 11565, 10969, 10977, 11396]

    // Crear un icono SVG personalizado para los medidores destacados
    const createColoredIcon = (color) => {
      const svg = `
        <svg width="41" height="31" viewBox="0 0 41 31" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="41" height="31" fill="${color}" rx="4"/>
          <image href="https://idg.eus/img/radar_negro.png" x="0" y="0" width="41" height="31"/>
        </svg>
      `
      return L.divIcon({
        html: svg,
        className: 'custom-marker',
        iconSize: [41, 31],
        iconAnchor: [20, 31],
        popupAnchor: [0, -31]
      })
    }

    // Función para obtener el icono según el tipo de medidor
    const getIcon = (meterId) => {
      if (meterId in HIGHLIGHTED_METERS) {
        return createColoredIcon(HIGHLIGHTED_METERS[meterId].color)
      }
      return new L.Icon({
        iconUrl: 'https://idg.eus/img/radar_negro.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [41, 31],
        iconAnchor: [12, 31],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }

    // Resto de funciones sin cambios...
    const obtenerFlujoVehiculos = async (meterId) => {
      const fecha = new Date()
      const fechaFormateada = `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`
      let paginaActual = 1
      let totalPaginas
      let sumaTotalVehiculos = 0

      try {
        do {
          const url = `https://api.euskadi.eus/traffic/v1.0/flows/byDate/${fechaFormateada}/byMeter/${meterId}?_page=${paginaActual}`
          const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })

          if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`)
          }

          const datos = await respuesta.json()
          sumaTotalVehiculos += datos.flows.reduce((suma, flujo) => suma + parseInt(flujo.totalVehicles, 10), 0)
          
          totalPaginas = datos.totalPages
          paginaActual++
        } while (paginaActual <= totalPaginas)

        return sumaTotalVehiculos
      } catch (error) {
        console.error('Error obteniendo flujo de vehículos:', error)
        throw error
      }
    }

    const mostrarMedidores = (features) => {
      features.forEach(feature => {
        const { meterId, system, description, latitude, longitude } = feature.properties

        if (system === 'OPTIMUS' && !meterIdsExcluidos.includes(parseInt(meterId))) {
          const marker = L.marker(
            [latitude, longitude], 
            { 
              icon: getIcon(parseInt(meterId)),
              zIndexOffset: meterId in HIGHLIGHTED_METERS ? 1000 : 0 // Los medidores destacados aparecen por encima
            }
          ).addTo(map)

          marker.on('click', async function () {
            const nombreCalle = HIGHLIGHTED_METERS[meterId]?.name || ''
            const contenidoInicial = nombreCalle ? 
              `<strong>Calle:</strong> ${nombreCalle}<br>` : ''

            marker.bindPopup(contenidoInicial + "Calculando flujo de vehículos...").openPopup()

            try {
              const totalVehiculos = await obtenerFlujoVehiculos(meterId)
              marker.setPopupContent(
                `${contenidoInicial}
                 <strong>ID:</strong> ${meterId}<br>
                 <strong>Descripción:</strong> ${description}<br>
                 <strong>Total de Vehículos Hoy:</strong> ${totalVehiculos.toLocaleString('es-ES')}`
              ).openPopup()
            } catch (err) {
              marker.setPopupContent(
                `${contenidoInicial}
                 <strong>ID:</strong> ${meterId}<br>
                 <strong>Descripción:</strong> ${description}<br>
                 <strong>Error:</strong> No se pudo obtener el dato de tráfico`
              ).openPopup()
            }
          })
        }
      })
    }

    const obtenerDatos = async () => {
      try {
        let paginaActual = 1
        let totalPaginas

        do {
          const respuesta = await fetch(
            `https://api.euskadi.eus/traffic/v1.0/meters/byMunicipality/01/59?_elements=100&_page=${paginaActual}`,
            {
              method: 'GET',
              headers: {
                'Accept': 'application/geo+json'
              }
            }
          )

          if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`)
          }

          const datos = await respuesta.json()
          totalPaginas = datos.totalPages
          mostrarMedidores(datos.features)
          paginaActual++
        } while (paginaActual <= totalPaginas)
      } catch (error) {
        console.error('Error obteniendo datos de medidores:', error)
        throw error
      }
    }

    const inicializarMapa = () => {
      map = L.map(mapContainer.value, { zoomControl: false }).setView([42.85, -2.67], 15)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      L.control.zoom({ position: "bottomright" }).addTo(map)
    }

    onMounted(async () => {
      try {
        loading.value = true
        error.value = null
        
        inicializarMapa()
        await obtenerDatos()
      } catch (err) {
        error.value = 'Error cargando el mapa: ' + err.message
        console.error('Error:', err)
      } finally {
        loading.value = false
      }
    })

    onBeforeUnmount(() => {
      if (map) {
        map.remove()
      }
    })

    return {
      mapContainer,
      loading,
      error
    }
  }
}
</script>

<style>
.custom-marker {
  background: none;
  border: none;
}
</style>