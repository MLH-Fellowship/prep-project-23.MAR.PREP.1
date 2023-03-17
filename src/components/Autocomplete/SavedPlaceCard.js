import { useState, useEffect } from "react";
import axios from "axios";

const SavedPlaceCard = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeather(response.data);
    };
    fetchWeather();
  }, [city.name]);

  return (
    <div className="Results__card">
      <h2>{city.name}</h2>
      {weather ? (
        <>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp)}°C</p>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default SavedPlaceCard;
