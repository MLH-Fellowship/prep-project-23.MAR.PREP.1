import React, { useEffect, useState } from "react";
import axios from "axios";
// import qs from "qs";

const Recommender = ({ setCity }) => {
  // get user location
  // get waether of the user
  // filter data acc to user loc
  //

  const [currentLocation, setCurrentLocation] = useState();

  const getUserLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    const city = location.data.city;
    // setCurrentLocation(city);
    console.log(city);
    setCity(city)
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <h2>recommended songs</h2>
    </div>
  );
};

export default Recommender;
