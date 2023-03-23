import "./styles.css";
import React, { useEffect, useState } from "react";

const AQI = ({ city }) => {
  const [latLon, setLatLon] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    if (!city) return;

    const getLatLong = async () => {
      const data = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_APIKEY}`
      );

      const res = await data.json();
      console.log("RES", res);

      setLatLon({
        lat: res[0].lat,
        lon: res[0].lon,
      });
    };

    getLatLong();
  }, [city]);

  useEffect(() => {
    if (!latLon) return;

    const getAQI = async () => {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latLon.lat}&lon=${latLon.lon}&appid=${process.env.REACT_APP_APIKEY}`
      );

      const res = await data.json();
      console.log("AQI", res);

      setAqiData(res.list[0].main.aqi);
    };

    getAQI();
  }, [latLon]);

  const aqi = [
    {
      color: "#2CC937",
      text: "Good",
    },
    {
      color: "#99C140",
      text: "Fair",
    },
    {
      color: "#E7B417",
      text: "Neutral",
    },
    {
      color: "#DB7B2A",
      text: "Poor",
    },
    {
      color: "#CC3232",
      text: "Worst",
    },
  ];

  return (
    <section className="info-container">
      <div className="aqi-container">
        {aqi.map((item, index) => (
          <div
            className="aqi-box"
            key={index}
            style={{
              backgroundColor: item.color,
              border: index + 1 === aqiData ? "2px solid #fff" : "none",
              opacity: index + 1 === aqiData ? 1 : 0.8,
            }}
          />
        ))}
      </div>
      <div className="aqi-indicator">
        {aqi.map((item, index) => {
          return (
            <div className="aqi-indicator-box" key={index}>
              <div
                className="aqi-indicator-circle"
                style={{
                  backgroundColor: item.color,
                }}
              />
              <p className="aqi-indicator-text">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AQI;
