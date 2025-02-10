// services/trafficService.js
const BASE_URL = import.meta.env.VITE_API_URL;

export const trafficHistorical = {
    async getYearData(year) {
        try {
            const response = await fetch(`${BASE_URL}/traffic_data.php?year=${year}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching data for year ${year}:`, error);
            throw error;
        }
    }
};