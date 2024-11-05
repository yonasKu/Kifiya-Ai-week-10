import React from 'react';

const MetricsDisplay = ({ metrics }) => {
    return (
        <div>
            <h2>Metrics</h2>
            <ul>
                {metrics.map((metric, index) => (
                    <li key={index}>{metric.name}: {metric.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default MetricsDisplay;
