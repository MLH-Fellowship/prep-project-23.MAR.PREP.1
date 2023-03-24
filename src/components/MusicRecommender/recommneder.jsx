import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import {Buffer} from 'buffer';

import "./recommender.css";

const Recommender = ({ moodProps }) => {
  const [songs, setSongs] = useState([]);

  const [currentSong, setCurrentSong] = useState(0);
  const [mood, setMood] = useState(moodProps);

  useEffect(() => {
    console.log(mood);
  }, [mood])
  

  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  const auth_token = Buffer.from(
    `${clientId}:${clientSecret}`,
    "utf-8"
  ).toString("base64");

  const spotifyRecommendationURI = `https://api.spotify.com/v1/recommendations?${getParams(
    mood
  )}&limit=10`;

  useEffect(() => {
    const sliceAlbum = (album) => {
      if (album.indexOf("(") !== -1) {
        const newAlbumName = album.substring(0, album.indexOf("("));
        return setAlbumLength(newAlbumName);
      } else {
        return setAlbumLength(album);
      }
    };

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

    const getRecommendations = async () => {
      const access_token = await getAuth();

      const response = await axios.get(spotifyRecommendationURI, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const tracks = response.data.tracks;

      tracks.forEach((track, key) => {
        const trackObj = {
          num: key,
          albumId: track.album.id,
          artist: track.artists[0].name,
          albumName: sliceAlbum(track.album.name),
          coverImg: track.album.images[0].url,
        };
        setSongs((songs) => [...songs, trackObj]);
      });
    };

    getRecommendations();
  }, [auth_token, spotifyRecommendationURI]);

  const setAlbumLength = (album) => {
    if (album.length > 12) {
      album = album.slice(0, 13);
      return album + "..";
    } else return album;
  };

  const nextHandler = () => {
    if (currentSong + 1 === songs.length) {
      setCurrentSong(0);
    } else {
      setCurrentSong((currentSong) => currentSong + 1);
    }
  };

  const prevHandler = () => {
    if (currentSong === 0) {
      setCurrentSong(songs.length - 1);
    } else {
      setCurrentSong((currentSong) => currentSong - 1);
    }
  };

  const albumNumber = (number) => {
    if (number === songs.length) {
      return number + ".";
    } else if (number < 10) {
      return "0" + number + ".";
    }
  };

  return (
    <div>
      <h2 className="heading" >Recommended Songs</h2>
      {songs.length !== 0 ? (
        <>
          <div className="recommendations">
            <div className="hero-img">
              <img
                className="album-cover"
                src={songs[currentSong].coverImg}
                alt="album-cover"
              />
            </div>
            <div className="song-num">
              <span>{albumNumber(songs[currentSong].num + 1)}</span>
            </div>
            <div className="album-name">
              <span>{songs[currentSong].albumName}</span>
            </div>
            <div className="artist-name">
              <span>{songs[currentSong].artist}</span>
            </div>
          </div>
          <div className="spotify-widget">
            <iframe
              src={`https://open.spotify.com/embed/album/${songs[currentSong].albumId}?utm_source=generator`}
              width="100%"
              height="80"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="music-recommender"
            ></iframe>
          </div>
          <div className="button-container">
            <button onClick={prevHandler} className="scroll-left nav-arrow">
              <span></span>Prev
            </button>
            <button className="scroll-right nav-arrow" onClick={nextHandler}>
              Next<span></span>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

const getParams = (mood) => {
  switch (mood) {
    case "Energetic":
      return "seed_genres=pop,rock,hip-hop,electronic&min_energy=0.6&max_energy=1&min_valence=0.6&max_valence=1";
    case "Upbeat":
      return "seed_genres=pop,rock,hip-hop,electronic&min_energy=0.5&max_energy=0.8&min_valence=0.6&max_valence=1";
    case "Happy":
      return "seed_genres=pop&min_energy=0.5&max_energy=1&min_valence=0.7&max_valence=1";
    case "Rebellious":
      return "seed_genres=rock,hip-hop&min_energy=0.8&max_energy=1&min_valence=0.2&max_valence=0.8";
    case "Passionate":
      return "seed_genres=rock&min_energy=0.5&max_energy=0.8&min_valence=0.6&max_valence=0.9";
    case "Confident":
      return "seed_genres=hip-hop&min_energy=0.7&max_energy=1&min_valence=0.6&max_valence=1";
    case "Futuristic":
      return "seed_genres=electronic&min_energy=0.5&max_energy=1&min_valence=0.6&max_valence=1";
    case "Calm":
      return "seed_genres=jazz,classical&min_energy=0&max_energy=0.4&min_valence=0&max_valence=0.4";
    case "Relaxing":
      return 'seed_genres=reggae&energy=0.4&valence=0.5';
    case "Sophisticated":
      return "seed_genres=jazz,classical&min_energy=0&max_energy=0.4&min_valence=0.4&max_valence=0.7";
    case "Uplifting":
      return "seed_genres=classical&min_energy=0.5&max_energy=1&min_valence=0.7&max_valence=1";
    case "Melancholic":
      return "seed_genres=blues&min_energy=0&max_energy=0.4&min_valence=0&max_valence=0.4&min_acousticness=0.6&max_acousticness=1";
    case "Introspective":
      return "seed_genres=blues&min_energy=0.4&max_energy=0.7&min_valence=0.3&max_valence=0.6&min_acousticness=0.5&max_acousticness=0.9";
    case "Emotional":
      return "seed_genres=blues,rnb&min_energy=0.4&max_energy=0.7&min_valence=0.4&max_valence=0.7&min_acousticness=0.3&max_acousticness=0.8";
    case "Nostalgic":
      return "seed_genres=country&min_energy=0.4&max_energy=0.6&min_valence=0.5&max_valence=0.8";
    case "Sentimental":
      return "seed_genres=country&min_energy=0.3&max_energy=0.4&min_valence=0.4&max_valence=0.6";
    case "Positive":
      return "seed_genres=reggae&min_energy=0.6&max_energy=0.8&min_valence=0.8&max_valence=1&max_acousticness=0.3";
    case "Spiritual":
      return "seed_genres=reggae&min_energy=0.4&max_energy=0.6&min_valence=0.6&max_valence=0.8&max_acousticness=0.2";
    default:
      return "seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical&seed_tracks=0c6xIDDpzE81m2q797ordA";
  }
};

export default Recommender;
