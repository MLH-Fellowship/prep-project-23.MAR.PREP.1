import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/map/Map";
import News from './News/News.js';
import logo from "./mlh-prep.png";
import Bookmarks from "./components/Autocomplete/Bookmarks";
import VoiceButton from "./components/alan-ai/VoiceButton";
import Suggestion from "./components/Suggestions/Suggestion";
import Autocomplete from "./components/Autocomplete";
import AQI from "./components/AQICard";
import SavedPlaces from "./components/Autocomplete/SavedPlaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [dateTime, setDateTime] = useState("");
  const [minTimestamp, setMinTimestamp] = useState(new Date().toISOString());
  const [maxTimestamp, setMaxTimestamp] = useState("");
  const [results, setResults] = useState(null);

  const [showBookmarks, setShowBookmarks] = useState(false);
  const [updateIcon, setUpdateIcon] = useState(false);

  const weather = (weatherType) => {
    switch (weatherType) {
      case "Rain":
        return "https://media.giphy.com/media/G0Odfjd78JTpu/giphy.gif";
      case "Clouds":
        return "https://i.pinimg.com/originals/56/92/a6/5692a6ad885acf2b870911694ad1b010.gif";
      case "Snow":
        return "https://i.pinimg.com/originals/39/3d/c6/393dc67bfedcfad62a1ae4c2dd83cbbd.gif";
      case "Clear":
        return "https://i.pinimg.com/originals/eb/03/6c/eb036c3b4ab6ac086f8da8ed8ac76eda.gif";
      case "Haze":
        return "https://i.makeagif.com/media/10-16-2018/rjxI8k.gif";
      case "Mist":
        return "https://i.pinimg.com/originals/83/e3/82/83e3828dc9e7af959262feaf7f1c46f7.gif ";
      case "Thunderstorm":
        return "https://media.giphy.com/media/13ZEwDgIZtK1y/giphy.gif";
      default:
        return "https://i.pinimg.com/originals/eb/03/6c/eb036c3b4ab6ac086f8da8ed8ac76eda.gif";
    }
  };
  const[showNews, setShowNews] = useState(false);

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
              toast.success("Forecast data retrieved successfully!");
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
            toast.error(
              "Error ${error.code}: ${error.message}. Please check your internet connection and try again."
            );
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

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser.");
      toast.error("Sorry, geolocation is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
          )
            .then((res) => res.json())
            .then((result) => {
              setIsLoaded(true);
              setResults(result);
              setCity(result.name);
              toast.info(
                `Weather forecast data for ${result.name} was updated!`
              );
            })
            .catch((error) => {
              setIsLoaded(true);
              setError(error);
              toast.error(
                "Error ${error.code}: ${error.message}. Please check your internet connection and try again."
              );
            });
        },
        function (error) {
          console.error(`Error: ${error.message}`);
        }
      );
    }
  }, []);

  const handleCityChange = (city) => {
    if (city) {
      setCity(city);
    } else {
      toast.warning("Please enter a valid city name.");
    }
  };

  const currentTimeFormat = `${minTimestamp.split("T")[0]} ${
    minTimestamp.split("T")[1].split(".")[0]
  }`;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
      <div className="header">
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <button className="top-headlines-button" onClick={() => setShowNews(!showNews)}>{!showNews ? "Top Headlines": "Hide Headlines"}</button>
      </div>
       {showNews && <News /> }
        <div>
          <h2>Enter a city below 👇</h2>
          <div className="input-container">
            {!showBookmarks && <Autocomplete setCity={setCity} />}
            {results && <Bookmarks results={results} updateIcon={updateIcon} />}
          </div>
          <div>
            <SavedPlaces
              display={setShowBookmarks}
              setUpdateIcon={setUpdateIcon}
            />
          </div>
          <h2>Select a date and time </h2>
          <input
            type="datetime-local"
            value={dateTime}
            min={currentTimeFormat}
            max={maxTimestamp}
            onChange={(event) => setDateTime(event.target.value)}
          />
          <Map city={city} handleCityChange={handleCityChange} />

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
                <img
                  src={weather(results.weather[0].main)}
                  className="bg_img"
                ></img>
              </>
            )}
            {isLoaded && !results && (
              <h2>
                No results found for {city} at {dateTime}
              </h2>
            )}
          </div>
          {city && <AQI city={city} />}
        </div>

        <ToastContainer />

        <VoiceButton handleCityChange={handleCityChange} />


        <Suggestion
          weatherType={
            results?.weather[0]?.main ? results.weather[0].main : null
          }
          isLoaded={isLoaded}
        ></Suggestion>
        <Footer></Footer>
      </>
    );
  }
}

export default App;
