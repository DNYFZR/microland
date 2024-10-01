import "./AudioMixer.css";
import React, { useState, useEffect } from 'react';

interface Beat {
  on: boolean;
  audioTrack: HTMLAudioElement;
}

interface Track {
  trackNames: string[];
  audioTracks: HTMLAudioElement[];
}

const AudioMixer: React.FC<Track> = ({ trackNames, audioTracks }) => {
  const [beats, setBeats] = useState<Beat[][]>(audioTracks.map((track) => Array(16).fill(false).map(() => ({ on: false, audioTrack: track }))));
  const [playing, setPlaying] = useState(false);
  const [tempo, setTempo] = useState(120); // BPM
  const [currentBeat, setCurrentBeat] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (playing) {
      playBeats(currentBeat);

      const interval = 12000 / tempo; // Calculate interval based on tempo
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
        const newAudio = new Audio(track.src);
        newAudio.play();
      }
    });
  };

  const toggleBeat = (trackIndex: number, beatIndex: number) => {
    setBeats(beats.map((track, i) => i === trackIndex ? track.map((beat, j) => j === beatIndex ? { on: !beat.on, audioTrack: beat.audioTrack } : beat) : track));
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleStop = () => {
    setPlaying(false);
    setCurrentBeat(0);
  }

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(parseInt(e.target.value, 10));
  };

  return (
    <>
      <div>
        <h3>Audio Mixer</h3>

        {audioTracks.map((_, trackIndex) => (
          <div key={trackIndex} style={{ margin: '20px' }}>
            <div style={{ display: 'flex' }}>
              <label  style={{padding: "0.5vw", fontWeight: "bold", position: 'relative' }}>{trackNames[trackIndex]}</label>
              {beats[trackIndex].map((beat, beatIndex) => (
                <div key={beatIndex} style={{ margin: '10px', padding: "1vw", position: 'relative' }}>
                  <input
                    type="checkbox"
                    id={`beat-${trackIndex}-${beatIndex}`}
                    checked={beat.on}
                    onChange={() => toggleBeat(trackIndex, beatIndex)}
                  />
                  <label htmlFor={`beat-${trackIndex}-${beatIndex}`} className="square-button" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <span><b>Tempo (BPM) :</b> {tempo}</span>
      <div>
        <input type="range" min="16" max="400" value={tempo} onChange={handleTempoChange}/>
      </div>
      <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
};

export default AudioMixer;