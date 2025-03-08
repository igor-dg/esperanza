export function normalizeImageUrl(url) {
    // Si ya es una URL completa, devuélvela tal cual
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // De lo contrario, prepende la URL base de uploads
    return `${import.meta.env.VITE_UPLOADS_URL}/${url}`;
  }
  