import { useEffect } from "react";
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

function LocationMarker({
  city,
  position,
  handleCityChange,
  handlePositionChange,
}) {
  const map = useMapEvent("click", async (e) => {
    if (!e.latlng) return;
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${process.env.REACT_APP_APIKEY}`
    );

    res = await res.json();

    handleCityChange(res.name);
    handlePositionChange(e.latlng.lat, e.latlng.lng);
    map.flyTo(e.latlng, map.getZoom());
  });

  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are at {city}</Popup>
    </Marker>
  );
}

export default LocationMarker;
