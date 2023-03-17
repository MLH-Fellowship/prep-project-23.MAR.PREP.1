import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
import Suggestion from "./components/Suggestion";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);

  const [weatherType , setWeatherType] = useState("");

  useEffect(() => {
    // eslint-disable-next-line no-useless-concat
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 'burla' + "&units=metric" + "&appid=" + '71b52e36f8fd3004c954ae4904da8749')
      .then(res => res.json())
      .then(
        (result) => {
          
          //  console.log("hello"+result["weather"][0].main)
          if (result['cod'] === 200) {
            setIsLoaded(false)
            setWeatherType(result['weather'][0].main)
            
            console.log(result['weather'][0].main+"j");
            
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
  }, [city])

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
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
      </div>
      <Suggestion weatherType={weatherType} isLoaded={isLoaded}></Suggestion>
    </>
  }
}

export default App;
