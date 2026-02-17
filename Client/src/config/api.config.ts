// Configuración de la API
// En producción, esto se puede configurar con variables de entorno

const getApiUrl = (): string => {
	// En desarrollo, usar localhost
	if (import.meta.env.DEV) {
		return import.meta.env.VITE_API_URL || "http://localhost:3000";
	}
	
	// En producción, usar la URL del servidor o variable de entorno
	return import.meta.env.VITE_API_URL || window.location.origin;
};

export const API_BASE_URL = getApiUrl();
export const API_URL = `${API_BASE_URL}/api`;

