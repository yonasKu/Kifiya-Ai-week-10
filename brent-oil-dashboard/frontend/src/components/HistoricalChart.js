import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const HistoricalChart = ({ historicalData }) => {
    if (!Array.isArray(historicalData) || historicalData.length === 0) {
        return <p>No historical data available.</p>; // Handle empty historical data case
    }

    const data = {
        labels: historicalData.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Historical Prices',
                data: historicalData,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Historical Prices</h2>
            <Line data={data} />
        </div>
    );
};

export default HistoricalChart;
