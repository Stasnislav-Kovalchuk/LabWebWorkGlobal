import axios from 'axios';

// Новая Почта API
const API_KEY = '4b43b81dfa23afae2dbf44851510a110'; // API Нової Пошти

// Функція для отримання міст
export const fetchCities = async () => {
    try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
            apiKey: API_KEY,
            modelName: 'Address',
            calledMethod: 'getCities',
            methodProperties: {},
        });
        return response.data.data;  // Повертаємо тільки список міст
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

// Функція для отримання складів по вибраному місту
export const fetchWarehouses = async (cityRef) => {
    try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
            apiKey: API_KEY,
            modelName: 'Address',
            calledMethod: 'getWarehouses',
            methodProperties: { CityRef: cityRef },
        });
        return response.data.data;  // Повертаємо список складів
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        throw error;
    }
};
