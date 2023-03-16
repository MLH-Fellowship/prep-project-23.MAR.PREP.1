import { useEffect } from "react";

import {
    MapContainer,
    TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "./LocationMarker";

function Map({ city, handleCityChange }) {
    const position = [51.505, -0.09];

    const getLocation = async (city) => {
        let locationData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_APIKEY}`);
        locationData = await locationData.json();
        console.log("The locationData is: ", locationData);
        const lat = locationData.coord.lat;
        const lon = locationData.coord.lon;
        console.log("lat = ", lat);
        console.log("lon = ", lon);
    }

    useEffect(() => {
        getLocation(city);
      }, [city]);

    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}
                style={{
                    height: "90vh",
                    width: "100%",
                    borderRadius: "1rem",
                    minHeight: "300px",
                }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker handleCityChange={handleCityChange} />
            </MapContainer>
        </div>
    )
}

export default Map