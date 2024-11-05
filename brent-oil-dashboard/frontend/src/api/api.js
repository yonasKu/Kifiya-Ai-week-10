// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api'; // Ensure this URL matches your Flask backend

export const getPrices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/prices`);
        return response.data; // Return the data directly from the response
    } catch (error) {
        console.error("Error fetching prices:", error);
        throw error; // Rethrow the error for handling in components
    }
};

export const getForecast = async (steps) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forecast`, { steps });
        return response.data.forecast; // Assuming the response contains a forecast field
    } catch (error) {
        console.error("Error fetching forecast:", error);
        throw error;
    }
};

export const getMetrics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/metrics`);
        return response.data; // Return the data directly
    } catch (error) {
        console.error("Error fetching metrics:", error);
        throw error;
    }
};

export const getEvents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events`);
        return response.data; // Return the data directly
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};
