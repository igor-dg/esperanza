// stores/trafficStore.js
import { defineStore } from 'pinia';
import { trafficHistorical } from '../services/TrafficHistorical';

export const useTrafficStore = defineStore('traffic', {
    state: () => ({
        yearlyData: {},
        loading: false,
        error: null
    }),

    actions: {
        async fetchYearData(year) {
            // Si ya tenemos los datos y no han pasado más de 1 hora, retornarlos
            if (this.yearlyData[year]?.timestamp && 
                (Date.now() - this.yearlyData[year].timestamp) < 3600000) {
                return this.yearlyData[year].data;
            }

            try {
                this.loading = true;
                const data = await trafficHistorical.getYearData(year);
                this.yearlyData[year] = {
                    data,
                    timestamp: Date.now()
                };
                return data;
            } catch (error) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchMultipleYears(years) {
            return Promise.all(years.map(year => this.fetchYearData(year)));
        }
    }
});