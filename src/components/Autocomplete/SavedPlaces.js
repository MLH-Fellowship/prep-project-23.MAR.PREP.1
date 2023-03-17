import { useEffect, useState } from "react";
import SavedPlaceCard from "./SavedPlaceCard";

const SavedPlaces = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getArrayCities = localStorage.getItem("cities");
    if (getArrayCities) {
      const addCitiesInArray = JSON.parse(getArrayCities);
      setCities(addCitiesInArray);
    }
  }, []);

  return (
    <div>
      {cities.map((city) => (
        <SavedPlaceCard key={city.name} city={city} />
      ))}
    </div>
  );
};

export default SavedPlaces;
