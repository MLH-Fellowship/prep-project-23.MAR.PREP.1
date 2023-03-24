import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ForecastChart({ forecastInfo }) {
  const [forecastTimeSpan, setForecastTimeSpan] = useState("5D");
  const [forecastDataPoints, setForecastDataPoints] = useState([]);

  useEffect(() => {
    if (forecastInfo.list) {
      if (forecastTimeSpan === "5D") {
        const parsedForecastData = forecastInfo.list.map(
          ({ dt_txt, main: { temp } }) => ({
            date: dt_txt.slice(5, 10) + " ",
            temperature: temp,
          })
        );
        setForecastDataPoints(parsedForecastData);
      } else {
        const current = forecastInfo.list[0].dt;
        var idx = 0;
        while (forecastInfo.list[idx].dt - current <= 24 * 60 * 60) {
          idx++;
        }
        console.log(forecastInfo.list[0]);
        const parsedForecastData = forecastInfo.list
          .slice(0, idx)
          .map(({ dt_txt, main: { temp } }) => ({
            date: dt_txt.slice(10, 16),
            temperature: temp,
          }));
        setForecastDataPoints(parsedForecastData);
      }
    }
  }, [forecastInfo, forecastTimeSpan]);

  function toggleForecastTimeSpan() {
    forecastTimeSpan === "1D"
      ? setForecastTimeSpan("5D")
      : setForecastTimeSpan("1D");
  }

  return (
    <div className="forecast-container">
      <div className="forecast-chart">
        <div className="forecast-chart-header">
          <h2>Temperature Forecast</h2>
          <button
            className="forecast-chart-toggle"
            onClick={toggleForecastTimeSpan}
          >
            Show{" "}
            {forecastTimeSpan === "1D" ? "5 Day Forecast" : "1 Day Forecast"}
          </button>
        </div>
        <ResponsiveContainer width="95%" height={300}>
          <LineChart data={forecastDataPoints}>
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {/* <Legend /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ForecastChart;
