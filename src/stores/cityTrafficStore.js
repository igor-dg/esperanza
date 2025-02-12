// stores/cityTrafficStore.js
import { defineStore } from 'pinia'
import { cityTrafficHistorical } from '@/services/CityTrafficHistorical'
import _ from 'lodash'

export const useCityTrafficStore = defineStore('cityTraffic', {
  state: () => ({
    streetsData: {},
    loading: false,
    error: null,
    lastUpdate: null
  }),

  getters: {
    getYearlyTotals: (state) => {
      if (!state.streetsData || Object.keys(state.streetsData).length === 0) return {}

      const yearlyTotals = {}
      
      Object.entries(state.streetsData).forEach(([streetName, streetData]) => {
        if (!streetData.data || !streetData.data.data) return

        // Agrupar por año y sumar totales
        const yearlyData = _.chain(streetData.data.data)
          .groupBy(item => item[0].substring(0, 4)) // Agrupar por año
          .mapValues(yearData => 
            _.sumBy(yearData, item => parseInt(item[1])) // Sumar vehículos
          )
          .value()

        yearlyTotals[streetName] = yearlyData
      })

      return yearlyTotals
    }
  },

  actions: {
    async fetchAllStreetsData() {
      // Si los datos tienen menos de 1 hora, retornarlos
      if (this.lastUpdate && (Date.now() - this.lastUpdate) < 3600000) {
        return this.streetsData
      }

      try {
        this.loading = true
        this.error = null
        
        const data = await cityTrafficHistorical.getAllStreetsData()
        
        // Organizar datos por calle
        this.streetsData = data.reduce((acc, street) => {
          acc[street.name] = {
            metterId: street.metterId,
            data: street.data
          }
          return acc
        }, {})
        
        this.lastUpdate = Date.now()
        return this.streetsData
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})