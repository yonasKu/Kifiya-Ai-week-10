import React, { useEffect, useState } from 'react';
import { getMetrics, getEvents } from '../api/api'; // Import your API functions
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const MetricsDisplay = () => {
    const [metrics, setMetrics] = useState(null);
    const [events, setEvents] = useState(null);

    // Fetch Metrics and Events data
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await getMetrics();
                setMetrics(data); // Store the response data
            } catch (error) {
                console.error("Failed to fetch metrics:", error);
            }
        };

        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data); // Store the response data
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchMetrics();
        fetchEvents();
    }, []);

    // Return loading state if data is not yet available
    if (!metrics || !events) return <div className="loading">Loading...</div>;

    // Prepare the chart data for Fitted Prices (Line Chart)
    const chartData = {
        labels: metrics['Fitted Prices'].map((_, index) => index + 1), // x-axis labels (index of prices)
        datasets: [
            {
                label: 'Fitted Prices',
                data: metrics['Fitted Prices'],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
            }
        ]
    };

    // Prepare the chart data for Events Correlation (Bar Chart)
    const eventChartData = {
        labels: Object.keys(events), // Event names (GDP, Unemployment, etc.)
        datasets: [
            {
                label: 'Correlation',
                data: Object.values(events), // Correlation values
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className="metrics-display">
            <div className="section">
                <h2 className="section-title">Fitted Prices (Line Chart)</h2>
                <Line data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            bodyColor: '#fff',
                            titleColor: '#fff',
                            callbacks: {
                                label: (context) => `Price: $${context.raw}`,
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Time (Index)',
                                font: { size: 14 },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price (USD)',
                                font: { size: 14 },
                            },
                        },
                    },
                }} />
            </div>

            <div className="section model-metrics">
                <h3 className="section-title">Model Metrics</h3>
                <div className="metrics-list">
                    <p><strong>Mean Absolute Error (MAE):</strong> {metrics['MAE']}</p>
                    <p><strong>Root Mean Squared Error (RMSE):</strong> {metrics['RMSE']}</p>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Correlation of Events (Bar Chart)</h2>
                <Bar data={eventChartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Events',
                                font: { size: 14 },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Correlation Value',
                                font: { size: 14 },
                            },
                            beginAtZero: true,
                        },
                    },
                }} />
            </div>
        </div>
    );
};

export default MetricsDisplay;
