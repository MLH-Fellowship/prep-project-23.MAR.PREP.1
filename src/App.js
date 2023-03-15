import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
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
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
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
            <img  src={weather(results.weather[0].main)} className= "bg_img"></img>
          </>}
        </div>
      </div>
    </>
  }
}

export default App;
