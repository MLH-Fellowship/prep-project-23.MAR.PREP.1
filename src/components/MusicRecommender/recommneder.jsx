import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";

const Recommender = ({ city, weather }) => {
  const [songs, setSongs] = useState([]);

  const clientId = "fa8c44b84bf34a6d9f7a16dfd6a5b740";
  const clientSecret = "17f6323c3cac4b218aa9040cdc0f194e";

  const auth_token = Buffer.from(
    `${clientId}:${clientSecret}`,
    "utf-8"
  ).toString("base64");

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
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  };

  const spotifyRecommendationURI = `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical&seed_tracks=0c6xIDDpzE81m2q797ordA&limit=15`;

  const getRecommendations = async () => {
    const access_token = await getAuth();

    const response = await axios.get(spotifyRecommendationURI, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // console.log(response.data.tracks);

    const tracks = response.data.tracks;

    tracks.forEach((track) => {
      const trackObj = {
        albumId: track.album.id,
        artist: track.artists[0].name,
        albumName: track.album.name,
        coverImg: track.album.images[0].url,
      };
      setSongs(songs => [...songs, trackObj]);
    });
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div>
      <h2>recommended songs</h2>
    </div>
  );
};

export default Recommender;