// services/CityTrafficHistorical.js
const BASE_URL = import.meta.env.VITE_API_URL;

const STREETS_CONFIG = {
    'Francia': 4284,
    'Manuel Iradier': 4178,
    'Florida': 5065,
    'Domingo Beltrán': 7231,
    'Reyes Católicos': 6452,
    'Coronación': 7130,
    'Los Herrán': 4313
  }
  
  export const cityTrafficHistorical = {
    async getStreetData(metterId) {
      try {
        const response = await fetch(`${BASE_URL}/city_traffic_data.php?metterId=${metterId}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        return data
      } catch (error) {
        console.error(`Error fetching data for meter ${metterId}:`, error)
        throw error
      }
    },
  
    async getAllStreetsData() {
      try {
        const promises = Object.entries(STREETS_CONFIG).map(async ([streetName, metterId]) => {
          const data = await this.getStreetData(metterId)
          return {
            name: streetName,
            metterId,
            data: data
          }
        })
  
        return await Promise.all(promises)
      } catch (error) {
        console.error('Error fetching all streets data:', error)
        throw error
      }
    }
  }