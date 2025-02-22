import { Play, Pause, Volume2, VolumeX, Maximize2, Settings, Subtitles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import video from "../../../../public/12956927_1920_1080_25fps.mp4";

const VideoPlayer = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentCue, setCurrentCue] = useState(null);
  const videoRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load subtitles
    const track = video.addTextTrack("captions", "English", "en");
    trackRef.current = track;

    // Add cues manually
    const cues = [
      { start: 0, end: 5, text: "Welcome to the course" },
      { start: 5, end: 10, text: "In this video, we'll learn about..." },
      { start: 10, end: 15, text: "Let's get started!" },
      // Add more cues as needed
    ];

    cues.forEach(cue => {
      const vttCue = new VTTCue(cue.start, cue.end, cue.text);
      track.addCue(vttCue);
    });

    track.mode = showSubtitles ? "showing" : "hidden";

    const handleCueChange = () => {
      const activeCues = Array.from(track.activeCues || []);
      if (activeCues.length > 0) {
        setCurrentCue(activeCues[0].text);
      } else {
        setCurrentCue(null);
      }
    };

    track.addEventListener('cuechange', handleCueChange);

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      track.removeEventListener('cuechange', handleCueChange);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Update subtitle visibility when showSubtitles changes
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.mode = showSubtitles ? "showing" : "hidden";
    }
  }, [showSubtitles]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    videoRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };

  return (
    <div 
      className="w-fullrelative bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden border border-blue-900/30"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full aspect-video"
        src={video}
        controls={false}
        muted={isMuted}
      >
        {showSubtitles && (
          <track 
            kind="subtitles" 
            src="/path-to-your-subtitles.vtt" 
            srcLang="en" 
            label="English"
            default
          />
        )}
      </video>
      
      {/* Video Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Timeline */}
        <div 
          className="h-1 bg-gray-600 cursor-pointer"
          onClick={handleTimelineClick}
        >
          <div 
            className="h-full bg-blue-500"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="p-4">
          {/* Time and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-blue-500"
                />
              </div>

              {/* Time Display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Subtitles Toggle with active state */}
              <button 
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`transition-colors ${
                  showSubtitles ? 'text-blue-400' : 'text-white hover:text-blue-400'
                }`}
                title={showSubtitles ? "Disable Subtitles" : "Enable Subtitles"}
              >
                <Subtitles size={24} />
              </button>

              {/* Playback Speed */}
              <div className="relative">
                <button 
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Settings size={24} />
                </button>
                
                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 w-32">
                    {[0.5, 1, 1.25, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`w-full text-left px-3 py-1 rounded hover:bg-blue-900/40 ${
                          playbackSpeed === speed ? 'text-blue-400' : 'text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => videoRef.current.requestFullscreen()}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Maximize2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;