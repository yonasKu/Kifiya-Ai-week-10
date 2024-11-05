import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

const HistoricalChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No historical data available.</p>; // Handle empty data
    }

    const chartData = {
        labels: data.map(entry => entry.Date),
        datasets: [
            {
                label: 'Historical Prices',
                data: data.map(entry => entry.Price),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            }
        ]
    };

    return (
        <div>
            <h2>Historical Brent Oil Prices</h2>
            <Line data={chartData} />
        </div>
    );
};

export default HistoricalChart;
