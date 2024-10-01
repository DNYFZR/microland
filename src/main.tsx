import './main.css'

import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import logo from "/logo.png"
import { audioDir, audioFiles } from './schemas/audio';
import Select from './components/Select';
import AudioMixer from './components/AudioMixer';
import { AudioConfig } from "./types/General"

function App() {
  const bdOptions = audioFiles["BD"].map((v) => v.split(".")[0]);
  const sdOptions = audioFiles["SD"].map((v) => v.split(".")[0]);
  const ohOptions = audioFiles["OH"].map((v) => v.split(".")[0]);
  const chOptions = audioFiles["CH"].map((v) => v.split(".")[0]);
  const cyOptions = audioFiles["CY"].map((v) => v.split(".")[0]);

  const [bassDrum, setBassDrum] = useState<string>(audioFiles["BD"][0]);
  const [snareDrum, setSnareDrum] = useState<string>(`${audioFiles["SD"][0]}`);
  const [openHat, setOpenHat] = useState<string>(`${audioFiles["OH"][0]}`);
  const [closedHat, setClosedHat] = useState<string>(`${audioFiles["CH"][0]}`);
  const [cymbalHit, setCymbalHit] = useState<string>(`${audioFiles["CY"][0]}`);

  const activeSamples:AudioConfig = {
    bassDrum: new Audio(`${audioDir}/BD/${bassDrum}`),
    snareDrum: new Audio(`${audioDir}/SD/${snareDrum}`),
    openHat: new Audio(`${audioDir}/OH/${openHat}`),
    closedHat: new Audio(`${audioDir}/CH/${closedHat}`),
    cymbalHit: new Audio(`${audioDir}/CY/${cymbalHit}`),
  };

  const updateSample = (sampleName:string, e: React.ChangeEvent<HTMLSelectElement>) => {
    switch(sampleName.toLowerCase()){
      case "bass drum":
        setBassDrum(`${e.target.value}.WAV`);
        return;

      case "snare drum":
        setSnareDrum(`${e.target.value}.WAV`);
        return;

      case "open hat":
        setOpenHat(`${e.target.value}.WAV`);
        return;

      case "closed hat":
        setClosedHat(`${e.target.value}.WAV`);
        return;

      case "cymbal hit":
        setCymbalHit(`${e.target.value}.WAV`);
        return;
          
      default:
        return;
    }
    
  }

  return (
    <>
      <img src={logo} className="logo" />
      
      <div className='main-container'>
        <div className='select-options'>
          <h3>Audio Controller</h3>
          <Select 
            displayName='Bass Drum' 
            keyName='bass drum' 
            value={bassDrum.split(".")[0]} 
            onChange={(e) => updateSample("bass drum", e)} 
            selectOptions={bdOptions} 
          />

          <Select 
            displayName='Snare Drum' 
            keyName='snare drum' 
            value={snareDrum.split(".")[0]} 
            onChange={(e) => updateSample("snare drum", e)} 
            selectOptions={sdOptions} 
          />

          <Select 
            displayName='Open Hat' 
            keyName='open hat' 
            value={openHat.split(".")[0]} 
            onChange={(e) => updateSample("open hat", e)} 
            selectOptions={ohOptions} 
          />

          <Select 
            displayName='Closed Hat' 
            keyName='closed hat' 
            value={closedHat.split(".")[0]} 
            onChange={(e) => updateSample("closed hat", e)} 
            selectOptions={chOptions} 
          />

          <Select 
            displayName='Cymbal' 
            keyName='cymbal hit' 
            value={cymbalHit.split(".")[0]} 
            onChange={(e) => updateSample("cymbal hit", e)} 
            selectOptions={cyOptions} 
          />
        </div>
        
        <div className='audio-mixer'>
          <AudioMixer 
            trackNames={["BD", "SD", "OH", "CH", "CY"]}
            audioTracks={[
              activeSamples.bassDrum, 
              activeSamples.snareDrum, 
              activeSamples.openHat, 
              activeSamples.closedHat,
              activeSamples.cymbalHit,
            ]}
          />
        </div>     
      </div> 
    </>
  )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
