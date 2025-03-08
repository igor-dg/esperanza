// src/services/api.js
import axios from '@/plugins/axios'

export const api = {
    async uploadFile(file, type) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', type)
        
        try {
            const response = await axios.post('/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            // Asumimos que response.data ya es un objeto JSON
            if (response.data && response.data.data) {
                return {
                    url: `${import.meta.env.VITE_ASSETS_URL}/${type}/${response.data.data.pdfUrl}`,
                    thumbnailUrl: `${import.meta.env.VITE_ASSETS_URL}/thumbnails/${response.data.data.thumbnailUrl}`
                }
            } else {
                console.error('Unexpected response format:', response.data)
                throw new Error('Invalid server response format')
            }
        } catch (error) {
            console.error('Upload error:', error)
            console.error('Server response:', error.response?.data)
            throw error
        }
    },

    async uploadGalleryImage(file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', 'gallery')
        
        try {
            const response = await axios.post('/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            if (response.data && response.data.data) {
                return {
                    imageUrl: `${import.meta.env.VITE_ASSETS_URL}/gallery/${response.data.data.imageUrl}`,
                    thumbnailUrl: `${import.meta.env.VITE_ASSETS_URL}/thumbnails/${response.data.data.thumbnailUrl}`
                }
            } else {
                throw new Error('Invalid server response format')
            }
        } catch (error) {
            console.error('Error uploading gallery image:', error)
            throw error
        }
    },

    async uploadLegalImage(file) {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await axios.post('/uploadLegalImage.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        return {
          thumbnailUrl: `${import.meta.env.VITE_ASSETS_URL}/${response.data.data.thumbnailUrl}`
        }
    },

    async saveContent(content) {
        const response = await axios.post('/content.php', content)
        return response.data
    },

    async loadContent() {
    const response = await axios.get('/content.php', {
        params: { _t: new Date().getTime() } // Evitar caché
    });
    return response.data;
}
}