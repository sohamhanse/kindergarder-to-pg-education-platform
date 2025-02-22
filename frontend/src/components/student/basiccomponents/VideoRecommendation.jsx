import { PlayCircle, Clock } from "lucide-react";

const VideoRecommendation = ({ video, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(video.id)}
      className="w-full flex items-center p-4 rounded-lg bg-blue-900/20 hover:bg-blue-900/40 transition-all duration-200 group"
    >
      <div className="flex-shrink-0 mr-4 text-blue-400 group-hover:text-blue-300">
        <PlayCircle size={32} />
      </div>
      
      <div className="flex-1 text-left">
        <h4 className="text-white font-medium group-hover:text-blue-300">
          {video.title}
        </h4>
        <div className="flex items-center text-sm text-blue-400 mt-1">
          <Clock size={14} className="mr-1" />
          <span>{video.duration}</span>
        </div>
      </div>
    </button>
  );
};

export default VideoRecommendation;