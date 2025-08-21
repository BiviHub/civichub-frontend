import axios from 'axios';


let baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
    const port = window.location.port;

    if (port === '44301') {
        baseURL = 'https://localhost:44301/api';
    } else if (port === '7207') {
        baseURL = 'https://localhost:7207/api';
    } else {
        baseURL = 'https://localhost:44301/api';
    }
}

const api = axios.create({
    baseURL,
});

api.interceptors.request.use((config) => {


        const token = localStorage.getItem('token');
        if (token ) {
            config.headers.Authorization = `Bearer ${token}`;
        }

    return config;
});

export default api;



