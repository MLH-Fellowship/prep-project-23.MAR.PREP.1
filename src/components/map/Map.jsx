import React from "react";
import leaflet from "leaflet";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
    const position = [51.505, -0.09]
    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "1rem",
                    minHeight: "300px",

                }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map