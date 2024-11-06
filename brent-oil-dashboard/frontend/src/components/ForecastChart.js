// src/components/ForecastChart.js
import React, { useEffect, useState } from "react";
import { getForecast } from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ForecastChart = () => {
  const [forecastData, setForecastData] = useState([]);
  const [forecastSteps, setForecastSteps] = useState(10); // Default forecast steps to 10

  // Fetch forecast data when forecastSteps change
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getForecast(forecastSteps);
        console.log("Forecast data:", data); // Log to see the data structure

        // Format the data with dynamic "Year 1", "Year 2", etc.
        const formattedData = data.map((item, index) => ({
          year: `Year ${index + 1}`, // Label for the x-axis, "Year 1", "Year 2", etc.
          price: item, // Assuming 'item' is the price for each step
        }));
        setForecastData(formattedData); // Update the state with the formatted data
      } catch (error) {
        console.error("Failed to fetch forecast data", error);
      }
    };

    fetchForecast();
  }, [forecastSteps]); // Re-fetch when forecastSteps change

  // Handle the change in the forecast step selection
  const handleStepsChange = (event) => {
    setForecastSteps(Number(event.target.value)); // Update forecast steps based on user input
  };

  return (
    <div>
      <h2>Brent Oil Price Forecast</h2>

      {/* Dropdown or number input for selecting forecast steps */}
      <div>
        <label htmlFor="forecast-steps">Select Forecast Steps: </label>
        <select
          id="forecast-steps"
          value={forecastSteps}
          onChange={handleStepsChange}
        >
          {/* Provide options for 1 year to 20 years (or any range you prefer) */}
          {[5, 10, 15, 20].map((option) => (
            <option key={option} value={option}>
              {option} Year{option > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      {forecastData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" /> {/* Dynamic years as x-axis labels */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading forecast data...</p>
      )}
    </div>
  );
};

export default ForecastChart;
