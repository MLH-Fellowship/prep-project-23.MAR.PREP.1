import { useState, useEffect } from "react";
import axios from "axios";

const SavedPlaceCard = ({ city }) => {
  const [weather, setWeather] = useState(null);

  // receiving each city from the localStorage and displaying the data on the modal
  const fetchWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
    );
    setWeather(response.data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="Results__card">
      <h2>{city.name}</h2>
      {weather ? (
        <>
          <div className="Results__card__weather animate__animated animate__fadeIn">
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
          </div>
          <div style={{ display: 'table', border: '2px dashed blue', borderRadius: '5px', padding: '10px' }}>
  <div style={{ display: 'table-row' }}>
    <div style={{ display: 'table-cell', fontWeight: 'bold' }}>Temperature:</div>
    <div style={{ display: 'table-cell' }}>{Math.round(weather.main.temp)}°C</div>
  </div>
  <div style={{ display: 'table-row' }}>
    <div style={{ display: 'table-cell', fontWeight: 'bold' }}>Humidity:</div>
    <div style={{ display: 'table-cell' }}>{weather.main.humidity}%</div>
  </div>
  <div style={{ display: 'table-row' }}>
    <div style={{ display: 'table-cell', fontWeight: 'bold' }}>Wind Speed:</div>
    <div style={{ display: 'table-cell' }}>{weather.wind.speed} m/s</div>
  </div>
  <div style={{ display: 'table-row' }}>
    <div style={{ display: 'table-cell', fontWeight: 'bold' }}>Pressure:</div>
    <div style={{ display: 'table-cell' }}>{weather.main.pressure} hPa</div>
  </div>
</div>

        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default SavedPlaceCard;
