// src/components/TestAPI.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { getPrices, getForecast, getMetrics, getEvents } from '../api/api';

const TestAPI = () => {
    const [prices, setPrices] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [metrics, setMetrics] = useState({});
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [filteredPrices, setFilteredPrices] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = async () => {
        try {
            const pricesData = await getPrices();
            setPrices(pricesData);
            setFilteredPrices(pricesData); // Initially set filtered prices to all prices

            const forecastData = await getForecast(5);
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

    const filterData = () => {
        if (startDate && endDate) {
            const filtered = prices.filter(priceData => {
                const priceDate = new Date(priceData.Date).getTime();
                return priceDate >= new Date(startDate).getTime() && priceDate <= new Date(endDate).getTime();
            });
            setFilteredPrices(filtered);
        } else {
            setFilteredPrices(prices);
        }
    };

    return (
        <div>
            <h2>API Test Results</h2>
            {error && <div>Error: {error}</div>}
            
            <div>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button onClick={filterData}>Filter</button>
            </div>

            <h3>Prices</h3>
            <LineChart width={800} height={400} data={filteredPrices}>
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>

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
