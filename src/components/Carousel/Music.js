import './carousel.css';
import Player from './Player';
import { useRef, useState, useEffect } from 'react';
import lo1 from "./songs/aot.mp3"
import lo2 from "./songs/demonSlayer.mp3"
import lo3 from "./songs/erased.mp3"
import lo4 from "./songs/JJK.mp3"
import lo5 from "./songs/kimino.mp3"
import lo6 from "./songs/naruto.mp3"
import lo7 from "./songs/neverland.mp3"
import lo8 from "./songs/Norogami.mp3"
import lo9 from "./songs/parasyte.mp3"
import lo10 from "./songs/rumbling.mp3"
import lo11 from "./songs/takemichi.mp3"
import lo12 from "./songs/unravel.mp3"
import lo13 from "./songs/violet.mp3"
import lo14 from "./songs/yourlie.mp3"


const Music = () => {




  var TRACKLIST = [
    {
        id: 1,
        name: "😤",
        anime: '',
        source: lo1
    },
  {
    id: 2,
    name: "😎",
    anime: '',
    source: lo4
  },
  {
    id: 3,
    name: "😍",
    anime: '',
    source: lo5
  },
  {
    id: 4,
    name: "😙",
    anime: '',
    source: lo6
  },
  {
    id: 5,
    name: "😕",
    anime: '',
    source: lo7
  },
  {
    id: 6,
    name: "😉",
    anime: '',
    source: lo8
  },
  {
    id: 7,
    name: "😡",
    anime: '',
    source: lo10
  },
  {
    id: 8,
    name: "😖",
    anime: '',
    source: lo11
  },
  {
    id: 9,
    name: "😭",
    anime: '',
    source: lo12
  },
  {
    id: 10,
    name: "😜",
    anime: '',
    source: lo14
  },
  ]
  

  const [songs, setSongs] = useState(TRACKLIST);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(TRACKLIST[0]);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [isplaying])

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

  }



  return (
    <div className="Music">
      <audio src={currentSong.source} ref={audioElem} onTimeUpdate={onPlaying} />
      <Player songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default Music;