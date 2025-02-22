import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useState, useRef } from "react";

const VideoPlayer = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden border border-blue-900/30">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={togglePlay}
            className="text-white hover:text-blue-400 transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <button className="text-white hover:text-blue-400 transition-colors">
              <Maximize2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;