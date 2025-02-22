import { useState } from "react";
import { BookOpen, MessageCircle, ThumbsUp } from "lucide-react";

const VideoContent = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Video Title</h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-blue-900/30">
        {["overview", "notes", "discussion"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 text-sm font-medium capitalize transition-colors
              ${activeTab === tab 
                ? "text-blue-400 border-b-2 border-blue-400" 
                : "text-blue-400/60 hover:text-blue-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-blue-400">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <p>Video description and overview content goes here...</p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 hover:text-blue-300">
                <ThumbsUp size={20} />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-300">
                <BookOpen size={20} />
                <span>Resources</span>
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "notes" && (
          <div>Notes content...</div>
        )}
        
        {activeTab === "discussion" && (
          <div>Discussion content...</div>
        )}
      </div>
    </div>
  );
};

export default VideoContent;