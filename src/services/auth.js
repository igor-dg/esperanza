// src/services/auth.js
import axios from '@/plugins/axios'

export const auth = {
    async login(password) {
        try {
            const response = await axios.post('/auth.php', { password });
            const { token, expires_in } = response.data;
            
            // Guardar token y tiempo de expiración
            localStorage.setItem('auth_token', token);
            localStorage.setItem('token_expiration', Date.now() + (expires_in * 1000));
            
            return true;
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        try {
            // Limpiar headers de autorización
            delete axios.defaults.headers.common['Authorization'];
            
            // Limpiar localStorage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('token_expiration');
            
            return true;
        } catch (error) {
            console.error('Error durante el logout:', error);
            throw error;
        }
    },

    isTokenExpired() {
        const expiration = localStorage.getItem('token_expiration');
        return !expiration || Date.now() > parseInt(expiration);
    },

    getToken() {
        if (this.isTokenExpired()) {
            this.logout();
            return null;
        }
        return localStorage.getItem('auth_token');
    },
    
    async checkAuth() {
        try {
            const token = localStorage.getItem('auth_token')
            if (!token) return false
            
            // Asegurarnos de que el token está configurado en los headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            try {
                await axios.get('/auth.php')
                return true
            } catch (error) {
                if (error.response?.status === 401) {
                    await this.logout()
                }
                return false
            }
        } catch (error) {
            console.error('Error en checkAuth:', error)
            await this.logout()
            return false
        }
    }
}