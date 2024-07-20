import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import '../../styles/Contents/ContentsView.css';

const ContentsView = ({ subCategory, onBack }) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const playerRef = useRef(null);
  const seekingRef = useRef(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    if (!seekingRef.current) {
      setPlayed(state.played);
    }
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    seekingRef.current = false;
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = (e) => {
    seekingRef.current = true;
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleVolumeChange = (e) => { 
    setVolume(parseFloat(e.target.value));
  };

  const handleSkipForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleSkipBackward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="contents-view">
      <button onClick={onBack} className="back-button2">🔙</button>
      <h2>{subCategory.name}</h2>
      <div className="content">
        <div className="player-wrapper">
          <ReactPlayer
            ref={playerRef}
            url={subCategory.video}
            playing={playing}
            onProgress={handleProgress}
            onDuration={handleDuration}
            volume={volume}
            width="940px"
            height="650px"
            className="react-player"
            style={{
              pointerEvents: 'none',
            }}
          />
          <div className="overlay top"></div>
          <div className="overlay bottom"></div>
        </div>
        <div className="controls">
          <button onClick={handlePlayPause} className="play-pause-button">
            {playing ? '⏸️' : '⏯'}
          </button>
          <button onClick={handleSkipBackward} className="skip-button">⏪</button>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="seek-slider"
          />
          <button onClick={handleSkipForward} className="skip-button">⏩</button>
          <div className="time">
            {formatTime(played * duration)} / {formatTime(duration)}
          </div>
          <div className="volume-control">
            🔊<input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsView;
