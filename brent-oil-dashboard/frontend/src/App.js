// // src/App.js
// import React, { useEffect, useState } from 'react';
// import { getForecast, getPrices, getMetrics } from './api/api';
// import ForecastChart from './components/ForecastChart';
// import HistoricalChart from './components/HistoricalChart';
// import MetricsDisplay from './components/MetricsDisplay';
// import './styles.css';

// const App = () => {
//     const [forecastData, setForecastData] = useState([]); // Forecast data initialized as an empty array
//     const [historicalData, setHistoricalData] = useState([]); // Historical data initialized as an empty array
//     const [metrics, setMetrics] = useState([]); // Metrics initialized as an empty array
//     const [loading, setLoading] = useState(true);
//     const [steps, setSteps] = useState(5); // Number of forecast steps

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const forecast = await getForecast(steps);
//                 setForecastData(forecast);

//                 const prices = await getPrices();
//                 console.log("Historical Prices Response:", prices);
//                 setHistoricalData(Array.isArray(prices) ? prices : []);

//                 const metricsData = await getMetrics();
//                 console.log("Metrics Response:", metricsData);
//                 setMetrics(Array.isArray(metricsData) ? metricsData : []);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [steps]); // Refetch data if the number of steps changes

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="App">
//             <h1>Brent Oil Dashboard</h1>
//             <ForecastChart forecastData={forecastData} />
//             <HistoricalChart historicalData={historicalData} />
//             <MetricsDisplay metrics={metrics} />
//         </div>
//     );
// };

// export default App;


import React from 'react';
import TestAPI from './components/TestAPI'; // Import the TestAPI component

const App = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Financial Dashboard</h1>
            <TestAPI />
        </div>
    );
};

export default App; 
