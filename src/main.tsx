// Microland TR-808 App
import './main.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import {audioDir, audioFiles, SampleConfig } from "./config";
import Select from './components/Select';
import AudioMixer from './components/Mixer';

function App() {
  // Sound file update handlers
  const getSample = (sampleType:string, sampleName:string): HTMLAudioElement => {
    return new Audio(`${audioDir}/${sampleType}/${sampleName}`);
  };
  
  const updateSample = (sampleType:string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const sampleName = `${event.target.value}.WAV`
    switch(sampleType.toLowerCase()){
      case "bass drum":
        setActiveSamples({...activeSamples, bassDrum: getSample("BD", sampleName) })
        return;

      case "snare drum":
        setActiveSamples({...activeSamples, snareDrum: getSample("SD", sampleName) })
        return;

      case "open hat":
        setActiveSamples({...activeSamples, openHat: getSample("OH", sampleName) })
        return;

      case "closed hat":
        setActiveSamples({...activeSamples, closedHat: getSample("CH", sampleName) })
        return;

      case "cymbal hit":
        setActiveSamples({...activeSamples, cymbal: getSample("CY", sampleName) })
        return;
          
      default:
        return;
    }
  }

  // Sound file option arrays
  const bdOptions = audioFiles["BD"].map((v) => v.split(".")[0]);
  const sdOptions = audioFiles["SD"].map((v) => v.split(".")[0]);
  const ohOptions = audioFiles["OH"].map((v) => v.split(".")[0]);
  const chOptions = audioFiles["CH"].map((v) => v.split(".")[0]);
  const cyOptions = audioFiles["CY"].map((v) => v.split(".")[0]);

  // Active sound file container
  const [activeSamples, setActiveSamples] = useState<SampleConfig>({
    bassDrum: getSample("BD", audioFiles["BD"][0]),
    snareDrum: getSample("SD", audioFiles["SD"][0]),
    openHat: getSample("OH", audioFiles["OH"][0]),
    closedHat: getSample("CH", audioFiles["CH"][0]),
    cymbal: getSample("CY", audioFiles["CY"][0]),

  });

  return (
    <>
      <div className='select-options'>
        <Select 
          keyName='bass drum' 
          value={activeSamples.bassDrum.src.split("/").reverse()[0].split(".")[0]} 
          onChange={(e) => updateSample("bass drum", e)} 
          selectOptions={bdOptions} 
        />

        <Select 
          keyName='snare drum' 
          value={activeSamples.snareDrum.src.split("/").reverse()[0].split(".")[0]} 
          onChange={(e) => updateSample("snare drum", e)} 
          selectOptions={sdOptions} 
        />

        <Select 
          keyName='open hat' 
          value={activeSamples.openHat.src.split("/").reverse()[0].split(".")[0]} 
          onChange={(e) => updateSample("open hat", e)} 
          selectOptions={ohOptions} 
        />

        <Select 
          keyName='closed hat' 
          value={activeSamples.closedHat.src.split("/").reverse()[0].split(".")[0]} 
          onChange={(e) => updateSample("closed hat", e)} 
          selectOptions={chOptions} 
        />

        <Select 
          keyName='cymbal' 
          value={activeSamples.cymbal.src.split("/").reverse()[0].split(".")[0]} 
          onChange={(e) => updateSample("cymbal hit", e)} 
          selectOptions={cyOptions} 
        />
      </div>

      <AudioMixer 
        trackNames={["BD", "SD", "OH", "CH", "CY",]} 
        audioTracks={Object.values(activeSamples)}
      />
      
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
