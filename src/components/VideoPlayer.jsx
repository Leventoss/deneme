// src/components/VideoPlayer.jsx
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { useHotkeys } from 'react-hotkeys-hook';

const VideoPlayer = ({ sources, thumbnail }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('720p');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const qualityOptions = ['480p', '720p', '1080p'];

  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported() && sources[quality]) {
      const hls = new Hls();
      hls.loadSource(sources[quality]);
      hls.attachMedia(video);
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [sources, quality]);

  // Keyboard shortcuts
  useHotkeys('space', () => togglePlay(), [isPlaying]);
  useHotkeys('left', () => seek(-10), []);
  useHotkeys('right', () => seek(10), []);
  useHotkeys('up', () => adjustVolume(0.1), [volume]);
  useHotkeys('down', () => adjustVolume(-0.1), [volume]);
  useHotkeys('f', () => toggleFullscreen(), []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seek = (seconds) => {
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
  };

  const adjustVolume = (delta) => {
    setVolume(Math.max(0, Math.min(1, volume + delta)));
    videoRef.current.volume = Math.max(0, Math.min(1, volume + delta));
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleQualityChange = (newQuality) => {
    const currentTime = videoRef.current.currentTime;
    setQuality(newQuality);
    setShowQualityMenu(false);
    videoRef.current.currentTime = currentTime;
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-black w-full aspect-video group"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={thumbnail}
        onClick={togglePlay}
      />

      {/* Video Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar */}
        <input
          type="range"
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          value={(currentTime / duration) * 100 || 0}
          onChange={(e) => {
            const time = (e.target.value / 100) * duration;
            videoRef.current.currentTime = time;
          }}
        />

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <button onClick={togglePlay} className="text-white">
              {isPlaying ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              )}
            </button>

            {/* Time Display */}
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <button onClick={() => adjustVolume(volume === 0 ? 1 : -1)} className="text-white">
                {volume === 0 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  videoRef.current.volume = parseFloat(e.target.value);
                }}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Playback Speed */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="text-white text-sm bg-gray-800 px-2 py-1 rounded"
              >
                {playbackSpeed}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded shadow-lg">
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className="block w-full text-white text-sm px-4 py-2 hover:bg-gray-700"
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Selection */}
            <div className="relative">
              <button
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="text-white text-sm bg-gray-800 px-2 py-1 rounded"
              >
                {quality}
              </button>
              {showQualityMenu && (
                <div className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded shadow-lg">
                  {qualityOptions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQualityChange(q)}
                      className="block w-full text-white text-sm px-4 py-2 hover:bg-gray-700"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button onClick={toggleFullscreen} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;