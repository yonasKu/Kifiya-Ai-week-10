// import React, { useState, useEffect } from 'react';
// import { getForecast, getPrices, getEvents, getMetrics } from './api';
// import HistoricalChart from './components/HistoricalChart';
// import ForecastChart from './components/ForecastChart';
// import EventCorrelationChart from './components/EventCorrelationChart';
// import MetricsDisplay from './components/MetricsDisplay';

// function App() {
//     const [historicalData, setHistoricalData] = useState([]);
//     const [forecastData, setForecastData] = useState([]);
//     const [eventData, setEventData] = useState([]);
//     const [metrics, setMetrics] = useState({});
//     const [steps, setSteps] = useState(5);

//     useEffect(() => {
//         async function fetchData() {
//             const prices = await getPrices();
//             setHistoricalData(prices);
//             const events = await getEvents();
//             setEventData(events);
//             const metricsData = await getMetrics();
//             setMetrics(metricsData);
//         }
//         fetchData();
//     }, []);

//     const handleForecast = async () => {
//         const forecast = await getForecast(steps);
//         setForecastData(forecast);
//     };

//     return (
//         <div>
//             <h1>Brent Oil Dashboard</h1>
//             <div>
//                 <h2>Historical Prices</h2>
//                 <HistoricalChart data={historicalData} />
//             </div>
//             <div>
//                 <h2>Forecast</h2>
//                 <input
//                     type="number"
//                     value={steps}
//                     onChange={(e) => setSteps(e.target.value)}
//                     placeholder="Number of Steps"
//                 />
//                 <button onClick={handleForecast}>Get Forecast</button>
//                 <ForecastChart data={forecastData} />
//             </div>
//             <div>
//                 <h2>Event Correlations</h2>
//                 <EventCorrelationChart data={eventData} />
//             </div>
//             <div>
//                 <h2>Performance Metrics</h2>
//                 <MetricsDisplay metrics={metrics} />
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import HistoricalChart from './components/HistoricalChart';
import ForecastChart from './components/ForecastChart';

const App = () => {
    const [historicalData, setHistoricalData] = useState([]);
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/prices');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHistoricalData(data);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        fetchHistoricalData();
    }, []);

    const fetchForecastData = async (steps) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/forecast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ steps }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setForecastData(data.forecast);
        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    };

    // Fetch forecast data for the next 5 steps (example)
    useEffect(() => {
        fetchForecastData(5);
    }, []);

    return (
        <div>
            <h1>Brent Oil Dashboard</h1>
            <HistoricalChart data={historicalData} />
            <ForecastChart data={forecastData} />
        </div>
    );
};

export default App;
