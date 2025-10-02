import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

// Fallback for development/localhost, override for production
if (!baseURL) {
    const port = window.location.port;

    if (port === '44301') {
        baseURL = 'https://localhost:44301/api';
    } else if (port === '7207') {
        baseURL = 'https://localhost:7207/api';
    } else {
        // Default to live backend URL for production
        baseURL = 'http://sirraph-001-site1.stempurl.com/api';
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