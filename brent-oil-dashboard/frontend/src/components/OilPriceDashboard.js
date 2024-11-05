// import React, { useEffect, useState } from 'react'; 
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { getPrices, getForecast, getMetrics, getEvents } from '../api/api';

// const OilPriceDashboard = () => {
//     const [prices, setPrices] = useState([]);
//     const [forecast, setForecast] = useState([]);
//     const [events, setEvents] = useState([]);
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [filteredPrices, setFilteredPrices] = useState([]);

//     // Fetch data from API
//     const fetchData = async () => {
//         try {
//             const pricesData = await getPrices();
//             const forecastData = await getForecast();
//             const eventsData = await getEvents();

//             // Assuming pricesData, forecastData, and eventsData have the correct structure
//             setPrices(pricesData); // This should be an array of objects with "Date" and "Price"
//             setForecast(forecastData.FittedPrices); // Assuming forecastData has FittedPrices as an array
//             setEvents(eventsData); // Assuming eventsData is an object with event details
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     // Filter prices based on date range
//     const filterPrices = () => {
//         if (!startDate || !endDate) return;
//         const filtered = prices.filter(price => {
//             const date = new Date(price.Date); // Use "Date" key for filtering
//             return date >= startDate && date <= endDate;
//         });
//         setFilteredPrices(filtered);
//     };

//     useEffect(() => {
//         fetchData(); // Fetch data when component mounts
//     }, []);

//     useEffect(() => {
//         filterPrices(); // Filter prices when date range or prices change
//     }, [startDate, endDate, prices]);

//     return (
//         <div>
//             <h1>Brent Oil Price Dashboard</h1>
//             <div>
//                 <label>Select Date Range:</label>
//                 <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
//                 <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
//             </div>
//             <h2>Historical Prices</h2>
//             <LineChart width={600} height={300} data={filteredPrices.length ? filteredPrices : prices}>
//                 <XAxis dataKey="Date" /> {/* Ensure the key matches your data */}
//                 <YAxis />
//                 <Tooltip />
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <Line type="monotone" dataKey="Price" stroke="#8884d8" /> {/* Ensure the key matches your data */}
//             </LineChart>
//             <h2>Forecast</h2>
//             <pre>{JSON.stringify(forecast, null, 2)}</pre> {/* Display forecast results */}
//             <h2>Events</h2>
//             <pre>{JSON.stringify(events, null, 2)}</pre> {/* Display event data */}
//         </div>
//     );
// };

// export default OilPriceDashboard;
