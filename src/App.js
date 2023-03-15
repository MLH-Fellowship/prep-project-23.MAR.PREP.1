import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [dateTime, setDateTime] = useState("");
  const [minTimestamp, setMinTimestamp] = useState(new Date().toISOString());
  const [maxTimestamp, setMaxTimestamp] = useState("");
  const [results, setResults] = useState(null);
  

  const weather = (weatherType) => {
		switch (weatherType) {
			case 'Rain':
				return 'https://media.giphy.com/media/G0Odfjd78JTpu/giphy.gif';
			case 'Clouds':
				return 'https://i.pinimg.com/originals/56/92/a6/5692a6ad885acf2b870911694ad1b010.gif';
			case 'Snow':
				return 'https://i.pinimg.com/originals/39/3d/c6/393dc67bfedcfad62a1ae4c2dd83cbbd.gif';
			case 'Clear':
				return 'https://i.pinimg.com/originals/eb/03/6c/eb036c3b4ab6ac086f8da8ed8ac76eda.gif';
			case 'Haze':
				return 'https://i.makeagif.com/media/10-16-2018/rjxI8k.gif';
			case 'Mist':
				return 'https://i.pinimg.com/originals/83/e3/82/83e3828dc9e7af959262feaf7f1c46f7.gif ';
      case 'Thunderstorm':
        return "https://media.giphy.com/media/13ZEwDgIZtK1y/giphy.gif";
			default:
				return 'https://i.pinimg.com/originals/eb/03/6c/eb036c3b4ab6ac086f8da8ed8ac76eda.gif';
		}
	};

  useEffect(() => {
    // make sure current time (minTimestamp) is up to date
    setMinTimestamp(new Date().toISOString().slice(0, 16));

    // get the last timestamp available (maxTimestamp) from the forecast endpoint
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&dt=${dateTime}&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === "200") {
          setMaxTimestamp(result.list.slice(-1)[0].dt_txt);
        }
      });

    // if a date/time was chosen, get forecast data for chosen time and update results state
    function getChosenForecast(forecastArr) {
      let i = 0;
      const chosenTimestamp = new Date(dateTime);
      while (
        i < forecastArr.length &&
        chosenTimestamp.getTime() > new Date(forecastArr[i].dt_txt).getTime()
      ) {
        i++;
      }
      return forecastArr[i];
    }
    if (dateTime !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.cod !== "200") {
              setIsLoaded(false);
            } else {
              const chosenForecast = getChosenForecast(result.list);
              Object.assign(chosenForecast, result.city); // update chosenForecast object to include needed city info
              chosenForecast.sys.country = result.city.country;
              setResults(chosenForecast);
              setIsLoaded(true);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result["cod"] !== 200) {
              setIsLoaded(false);
            } else {
              setResults(result);
              setIsLoaded(true);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [city, dateTime]);

  const currentTimeFormat = `${minTimestamp.split("T")[0]} ${
    minTimestamp.split("T")[1].split(".")[0]
  }`;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <h2>Select a date and time </h2>
          <input
            type="datetime-local"
            value={dateTime}
            min={currentTimeFormat}
            max={maxTimestamp}
            onChange={(event) => setDateTime(event.target.value)}
          />
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
            {isLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
                <img  src={weather(results.weather[0].main)} className= "bg_img"></img>
          </>
            )}
            {isLoaded && !results && (
              <h2>
                No results found for {city} at {dateTime}
              </h2>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
