import React, { useEffect, useState } from "react";
import axios from "axios";
// import qs from "qs";

const Recommender = ({ city, weather }) => {
  const moodData = [
    {
      weather: "",
    },
  ];

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const auth_token = Buffer.from(
    `${clientId}:${clientSecret}`,
    "utf-8"
  ).toString("base64");

  const [authToken, setAuthToken] = useState("");

  const getAuth = async () => {
    try {
      const token_url = "https://accounts.spotify.com/api/token";
      const data = qs.stringify({ grant_type: "client_credentials" });

      const response = await axios.post(token_url, data, {
        headers: {
          Authorization: `Basic ${auth_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //return access token
      console.log(response.data.access_token);
      setAuthToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      //on fail, log the error in console
      console.log(error);
    }
  };

  return (
    <div>
      <h2>recommended songs</h2>
      <p>{city}</p>
    </div>
  );
};

export default Recommender;
