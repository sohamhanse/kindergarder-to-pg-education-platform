import { PlayCircle, Clock } from "lucide-react";

const VideoContentPanel = ({ videos, currentVideoId, onVideoSelect }) => {
  return (
    <div className="w-full bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-4">
      <h3 className="text-xl font-bold text-white mb-4">Course Content</h3>
      
      <div className="space-y-2">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => onVideoSelect(video.id)}
            className={`
              w-full flex items-center p-3 rounded-lg transition-all duration-200
              ${currentVideoId === video.id 
                ? "bg-blue-600 text-white" 
                : "text-blue-400 hover:bg-blue-900/40"
              }
            `}
          >
            <PlayCircle size={20} className="mr-3 flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="font-medium">{video.title}</p>
              <div className="flex items-center text-sm opacity-80 mt-1">
                <Clock size={14} className="mr-1" />
                <span>{video.duration}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoContentPanel;