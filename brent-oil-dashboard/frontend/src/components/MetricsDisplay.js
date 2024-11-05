import React from 'react';

function MetricsDisplay({ metrics }) {
    return (
        <div>
            <h3>Performance Metrics</h3>
            <p>MAE: {metrics.MAE}</p>
            <p>MSE: {metrics.MSE}</p>
            <p>R2 Score: {metrics.R2}</p>
        </div>
    );
}

export default MetricsDisplay;
