// src/services/adminApi.js
import axios from '@/plugins/axios'
import { auth } from '@/services/auth'

export const adminApi = {
    async saveContent(content) {
        try {
            const token = auth.getToken();
            console.log('Token antes de enviar:', token);
            console.log('AdminApi - Content a enviar:', content);
            
            if (!token) {
                throw new Error('No hay token de autenticación o ha expirado');
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            
            console.log('Configuración de la petición:', config);
            
            const response = await axios.post('/admin-content.php', content, config);
            console.log('AdminApi - Respuesta:', response);
            return response.data;
        } catch (error) {
            console.error('Error completo:', error);
            
            if (error.response?.status === 401) {
                auth.logout();
                throw new Error('Sesión expirada');
            }
            
            throw error;
        }
    }
}