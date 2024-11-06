// // src/App.js

import "./styles.css";
import React from "react";

import ForecastChart from "./components/ForecastChart";
import HistoricalChart from "./components/HistoricalChart";
import MetricsDisplay from "./components/MetricsDisplay";

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Financial Dashboard</h1>
      {/* <TestAPI /> */}
      <HistoricalChart />

      <ForecastChart />

      <MetricsDisplay />
    </div>
  );
};

export default App;
