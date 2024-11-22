// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5164/api', // Замените на ваш базовый URL API
    timeout: 10000, // Время ожидания запроса в миллисекундах
});

// Опционально: добавьте интерсепторы для обработки запросов/ответов
axiosInstance.interceptors.request.use(
    (config) => {
        // Добавьте токены или другую информацию, если нужно
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data; // Упрощаем ответ
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
