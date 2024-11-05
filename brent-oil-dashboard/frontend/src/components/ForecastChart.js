import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ForecastChart = ({ forecastData }) => {
    const data = {
        labels: forecastData.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Forecast Prices',
                data: forecastData,
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Forecast</h2>
            <Line data={data} />
        </div>
    );
};

export default ForecastChart;
