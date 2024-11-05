import React from 'react';
import { Bar } from 'react-chartjs-2';

function EventCorrelationChart({ data }) {
    const chartData = {
        labels: data.event,
        datasets: [{
            label: 'Event Correlation with Prices',
            data: data.correlation,
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
    };

    return <Bar data={chartData} />;
}

export default EventCorrelationChart;
