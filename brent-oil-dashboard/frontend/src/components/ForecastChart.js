// ForecastChart.js
import React, { useEffect, useState } from "react";
import { getForecast } from "../api/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForecastChart = () => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getForecast(10); // Fetch forecast for the next 10 steps
        console.log("Forecast data:", data); // Log to see the data structure
        setForecastData(data);
      } catch (error) {
        console.error("Failed to fetch forecast data", error);
      }
    };

    fetchForecast();
  }, []);

  const chartData = {
    labels: forecastData.map((_, index) => `Step ${index + 1}`),
    datasets: [
      {
        label: "Forecasted Price",
        data: forecastData,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: "Forecast Step" } },
      y: { title: { display: true, text: "Price (USD)" } },
    },
  };

  return (
    <div>
      <h2>Brent Oil Price Forecast</h2>
      {forecastData.length > 0 ? (
        <Line
          key={forecastData.toString()}
          data={chartData}
          options={options}
        />
      ) : (
        <p>Loading forecast data...</p>
      )}
    </div>
  );
};

export default ForecastChart;
