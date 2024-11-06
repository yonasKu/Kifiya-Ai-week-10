import React, { useEffect, useState } from "react";
// import { getPrices } from "../api/api"; // Make sure this is your API call
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

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalChart = () => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/prices");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        console.log("Fetched data:", data); // Check the data format in the console

        // Ensure the data is an array and filter out invalid entries
        if (Array.isArray(data)) {
          // Filter out entries where 'Price' is null or undefined
          const filteredData = data.filter(
            (item) => item.Price !== null && item.Price !== undefined
          );
          setHistoricalData(filteredData);
        } else {
          console.error("Fetched data is not an array:", data);
          setHistoricalData([]); // Reset data if the format is incorrect
        }
      } catch (error) {
        console.error("Failed to fetch historical data", error);
        setHistoricalData([]); // Reset data if there is an error
      }
    };

    fetchHistoricalData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: historicalData.map((item) => item.Date), // Use Date for x-axis labels
    datasets: [
      {
        label: "Historical Price",
        data: historicalData.map((item) => item.Price), // Use Price for y-axis data
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,0.4)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: { title: { display: true, text: "Year" } }, // Label for x-axis
      y: { title: { display: true, text: "Price (USD)" } }, // Label for y-axis
    },
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Historical Oil Prices" },
    },
  };

  return (
    <div>
      <h2>Historical Oil Price Chart</h2>
      {historicalData.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading historical data...</p>
      )}
    </div>
  );
};

export default HistoricalChart;
