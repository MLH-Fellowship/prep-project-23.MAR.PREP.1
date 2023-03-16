export function getCurrentLocation(setIsLoaded, setResults, setCity, setError) {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser")
    } else {
      navigator.geolocation.getCurrentPosition(
        function(position){
          const {latitude, longitude} = position.coords;
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setResults(result);
                setCity(result.name);
              })
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
              })
        },
        function(error) {
          console.error(`Error: ${error.message}`);
        }
      )   
    }
  }
  