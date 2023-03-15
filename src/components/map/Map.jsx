import React from "react";

import {
    MapContainer,
    TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "./LocationMarker";

function Map({ handleCityChange }) {
    const position = [51.505, -0.09]

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