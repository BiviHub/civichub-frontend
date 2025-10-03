import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

// Fallback logic
if (!baseURL) {
    const port = window.location.port;

    // Local development fallbacks
    if (port === '44301') {
        baseURL = 'https://localhost:44301/api';
    } else if (port === '7207') {
        baseURL = 'https://localhost:7207/api';
    } else {
        // Default to proxy path for Netlify (production)
        baseURL = '/api';
    }
}

const api = axios.create({
    baseURL,
    withCredentials: true, // Enable credentials for CORS
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;