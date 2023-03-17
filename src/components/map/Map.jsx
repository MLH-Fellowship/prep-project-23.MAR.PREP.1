import { useEffect, useState } from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "./LocationMarker";

function Map({ city, handleCityChange }) {
  const [position, setPosition] = useState(null);

  const handlePositionChange = (lat, lon) => {
    setPosition([lat, lon]);
  };

  const getLocation = async (city) => {
    let locationData = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_APIKEY}`
    );

    locationData = await locationData.json();
    if (locationData && locationData.length !== 0) {
      let lat = locationData[0]?.lat;
      let lon = locationData[0]?.lon;

      handlePositionChange(lat, lon);
    }
  };

  useEffect(() => {
    if (city) getLocation(city);
  }, [city]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "10px",
      }}
    >
      <MapContainer
        center={position ? position : [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          width: "50vw",
          minHeight: "300px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          city={city}
          position={position}
          handleCityChange={handleCityChange}
          handlePositionChange={handlePositionChange}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
