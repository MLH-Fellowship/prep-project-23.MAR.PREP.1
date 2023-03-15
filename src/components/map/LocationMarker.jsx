import { useState } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import leaflet from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

leaflet.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvent("click", async (e) => {

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${process.env.REACT_APP_APIKEY}`)

        let city = await res.json()
        console.log("MAP data: ", city);

        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}

export default LocationMarker;