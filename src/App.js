import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [dateTime, setDateTime] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (dateTime !== "") {
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&dt=${dateTime}&appid=${process.env.REACT_APP_APIKEY}`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setResults(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    } else {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
        .then(res => res.json())
        .then(
          (result) => {
            if (result['cod'] !== 200) {
              setIsLoaded(false)
            } else {
              setIsLoaded(true);
              setResults(result);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [city, dateTime])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
        <h2>Select a date and time </h2>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={event => setDateTime(event.target.value)}
        />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && results.list && (
            <>
                {results.list.map(item => {
                  if (item.dt_txt === dateTime) {
                    return (
                      <div key={item.dt}>
                        <h3>{item.weather[0].main}</h3>
                        <p>Feels like {item.main.feels_like}°C</p>
                        <i><p>{results.city.name}, {results.city.country}</p></i>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
            </>
          )}
          {isLoaded && !results && (
            <h2>No results found for {city} at {dateTime}</h2>
          )}
        </div>
      </div>
    </>
  }
}

export default App;
