// src/components/TestAPI.js
import React, { useEffect, useState } from 'react';
import { getPrices, getForecast, getMetrics, getEvents } from '../api/api';

const TestAPI = () => {
    const [prices, setPrices] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [metrics, setMetrics] = useState({});
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            // Fetching data from the API endpoints
            const pricesData = await getPrices();
            setPrices(pricesData);

            const forecastData = await getForecast(5); // Adjust the number of steps as necessary
            setForecast(forecastData.forecast);

            const metricsData = await getMetrics();
            setMetrics(metricsData);

            const eventsData = await getEvents();
            setEvents(eventsData);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>API Test Results</h2>
            {error && <div>Error: {error}</div>}
            <h3>Prices</h3>
            <pre>{JSON.stringify(prices, null, 2)}</pre>

            <h3>Forecast</h3>
            <pre>{JSON.stringify(forecast, null, 2)}</pre>

            <h3>Metrics</h3>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>

            <h3>Events</h3>
            <pre>{JSON.stringify(events, null, 2)}</pre>
        </div>
    );
};

export default TestAPI;
