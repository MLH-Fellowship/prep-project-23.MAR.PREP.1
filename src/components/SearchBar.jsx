import { useRef, useState } from "react";

const CitySearchBar = ({ setCity }) => {
  const inputRef = useRef();
  const [suggestedCities, setSuggestedCities] = useState([]);
  let reqTimeoutId = null;

  // Fetch suggested cities
  const handleInputChange = async (e) => {
    if (reqTimeoutId) {
      clearTimeout(reqTimeoutId);
    }

    const inputValue = inputRef.current.value;

    reqTimeoutId = fetchSuggestedCities(inputValue, setSuggestedCities);
  };

  const handleEnterKey = async (e) => {
    const inputValue = inputRef.current.value;

    // Trigger only for enter key press
    if (e.code === "Enter") {
      setCity(inputValue);
    }
  };

  // Handle city selection from the datalist
  const handleCitySelect = async (e) => {
    const selectedCityName = e.currentTarget.value;

    suggestedCities.forEach((city) => {
      if (city.name === selectedCityName) {
        setCity(city.name);
        return;
      }
    });
  };

  return (
    <div className="input-container">
      <i className="fa fa-map-marker input-icon" aria-hidden="true"></i>
      <input
        ref={inputRef}
        list="cities"
        name="search"
        type="text"
        defaultValue=""
        placeholder="Enter a city"
        autoComplete="off"
        onKeyDown={handleEnterKey}
        onChange={handleInputChange}
        onInput={handleCitySelect}
      />

      <datalist id="cities">
        {suggestedCities.length > 0 &&
          suggestedCities.map((city, i) => (
            <option
              key={i}
              value={city.name}
            >{`${city.name}, ${city.country}`}</option>
          ))}
      </datalist>
    </div>
  );
};

export const fetchSuggestedCities = (query, setFunc) =>
  setTimeout(async () => {
    if (!query || query.trim() === "") {
      setFunc([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${process.env.REACT_APP_GEO_API}`
      );
      const res = await response.json();

      const cities = res.features
        .map((feature) => {
          return {
            name: feature?.properties?.city ?? null,
            country: feature?.properties?.country ?? null,
          };
        })
        .filter((city) => city.name !== null);

      // Remove duplicates
      setFunc([
        ...new Map(cities.map((item) => [item["name"], item])).values(),
      ]);
    } catch (err) {
      console.error(err);
      setFunc([]);
    }
  }, 200);


export default CitySearchBar;
