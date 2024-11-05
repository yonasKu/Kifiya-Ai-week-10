//ForecastChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

const ForecastChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No forecast data available.</p>; // Handle empty data
    }

    // Generate future dates starting from today
    const currentDate = new Date();
    const futureDates = Array.from({ length: data.length }, (_, i) => {
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + i + 1); // +1 to start from the next day
        return futureDate.toLocaleDateString('en-US'); // Format date as needed
    });

    const chartData = {
        labels: futureDates, // Use generated future dates as labels
        datasets: [
            {
                label: 'Forecast Prices',
                data: data,
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
            }
        ]
    };

    return (
        <div>
            <h2>Forecasted Brent Oil Prices</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ForecastChart;
