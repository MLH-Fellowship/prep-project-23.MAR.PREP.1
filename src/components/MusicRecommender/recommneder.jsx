import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";

const Recommender = ({ city, weather }) => {
  const moodData = [
    {
      weather: "",
    },
  ];

  const clientId = "fa8c44b84bf34a6d9f7a16dfd6a5b740";
  const clientSecret = "17f6323c3cac4b218aa9040cdc0f194e";

  // console.log(process.env.SPOTIFY_CLIENT_ID);
  // console.log(clientSecret);

  const auth_token = Buffer.from(
    `${clientId}:${clientSecret}`,
    "utf-8"
  ).toString("base64");

  console.log(auth_token);

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

      console.log(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  };

  const spotifyRecommendationURI = `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical&seed_tracks=0c6xIDDpzE81m2q797ordA&limit=10`;

  const getRecommendations = async () => {
    const access_token = await getAuth();

    const response = await axios.get(spotifyRecommendationURI, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(response.data.tracks);

    // console.log(response.data.tracks.);
    // artist --> res.data.tracks.artists.name
    // cover image --> res.data.tracks.album.images[2].url
    // song name --> res.data.tracks.name
  };

  const getAlbum = async () => {
    // "https://open.spotify.com/album/6adnqzJgMLO8oJmzP0Kp28"
    // https://open.spotify.com/embed/album/3lS1y25WAhcqJDATJK70Mq?utm_source=generator

    const access_token = await getAuth();

    const response = await axios.get('https://open.spotify.com/embed/album/6adnqzJgMLO8oJmzP0Kp28?utm_source=generator', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(response.data);
  }

  useEffect(() => {
    getRecommendations();
    // getAlbum();
  }, []);

  return (
    <div>
      <h2>recommended songs</h2>
      <p>{city}</p>
      <iframe src="https://open.spotify.com/embed/album/3lS1y25WAhcqJDATJK70Mq?utm_source=generator" width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  );
};

export default Recommender;
