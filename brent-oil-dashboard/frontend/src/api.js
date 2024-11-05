import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const getPrices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/prices`);
        return response.data;
    } catch (error) {
        console.error("Error fetching prices:", error);
        throw error; // Rethrow the error for handling in components
    }
};

export const getForecast = async (steps) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forecast`, { steps });
        return response.data.forecast;
    } catch (error) {
        console.error("Error fetching forecast:", error);
        throw error;
    }
};
