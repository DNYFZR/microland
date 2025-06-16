// Microland TR-808 App
import './Mixer.css'
import React, { useState, useEffect } from 'react'
import {Track, Beat } from "../config";

const AudioMixer: React.FC<Track> = ({ trackNames, audioTracks }) => {
  const [playing, setPlaying] = useState(false);
  const [tempo, setTempo] = useState(120); 
  const [currentBeat, setCurrentBeat] = useState(0);
  const barLength = 16;
  
  const [beats, setBeats] = useState<Beat[][]>(
    audioTracks.map((track) => Array(barLength).fill(false).map(() => ({ 
      on: false, 
      audioTrack: track 
    })))
  );
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (playing) {
      if(currentBeat === 0) {
        playBeats(currentBeat);      
      }

      const interval = 60_000 / (4 * tempo);
      intervalId = setInterval(() => {
        const nextBeat = (currentBeat + 1) % 16;
        setCurrentBeat(nextBeat);
        playBeats(nextBeat);
      }, interval);
    }

    return () => clearInterval(intervalId);
  }, [playing, tempo, currentBeat, beats]);

  const playBeats = (index: number) => {
    audioTracks.forEach((track, trackIndex) => {
      if (beats[trackIndex][index].on) {
        new Audio(track.src).play();
      }
    });
  };

  const toggleBeat = (trackIndex: number, beatIndex: number) => {
    setBeats(
      beats.map((track, i) => i === trackIndex ? 
        track.map((beat, j) => j === beatIndex ? { on: !beat.on, audioTrack: beat.audioTrack } : beat) 
        : track
      )
    );
  };

  const handlePlayPause = () => {
    if(playing){
      setPlaying(false);
      setCurrentBeat(0);
    } else {
      setPlaying(true);
    }
  };

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(playing) {
      setPlaying(false);
    }

    setCurrentBeat(0);
    setTempo(parseInt(e.target.value, 10));
  };

  return (
    <>
      <button onClick={handlePlayPause} onKeyDown={(e) => {
        // if user presses space -> trigger play / stop event
        if(e.key == " ") {
          e.preventDefault();
          handlePlayPause();
        }
      }}>{playing ? '⏹️' : '▶️'}</button>
    
      <b>Tempo (BPM) :</b> 
      <input type="number" min="1" max="256" step="1" value={tempo} onChange={handleTempoChange}/>
      
      {audioTracks.map((_, trackIndex) => (
        <div key={trackIndex} className='drumpad-container'>
          <label className='drumpad-label'>{trackNames[trackIndex]}</label>
          {beats[trackIndex].map((beat, beatIndex) => (
            <div key={beatIndex} className='drumpad'>
              <input type="checkbox" id={`${trackIndex}-${beatIndex}`} checked={beat.on} onChange={() => toggleBeat(trackIndex, beatIndex)}/>
              <label htmlFor={`${trackIndex}-${beatIndex}`} className="square-button" />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default AudioMixer;