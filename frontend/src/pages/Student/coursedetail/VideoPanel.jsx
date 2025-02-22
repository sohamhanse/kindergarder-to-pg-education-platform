import { useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../../../components/student/CourseDetail/VideoPlayer";

const VideoPanel = () => {
  const { courseId } = useParams();
  const [currentVideoId, setCurrentVideoId] = useState(1);

  // Mock video data
  const videos = [
    { id: 1, title: "Introduction to the Course", duration: "10:30", url: "video-url-1" },
    { id: 2, title: "Getting Started with Basics", duration: "15:45", url: "video-url-2" },
    { id: 3, title: "Advanced Concepts", duration: "20:15", url: "video-url-3" },
    // Add more videos...
  ];

  const currentVideo = videos.find(v => v.id === currentVideoId);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Video Player Section */}
            <div className="lg:col-span-3">
              <VideoPlayer 
                videoUrl={currentVideo.url}
                title={currentVideo.title}
              />
              
              <div className="mt-6 bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-blue-900/30">
                <h2 className="text-2xl font-bold text-blue-400 mb-2">{currentVideo.title}</h2>
                <p className="text-blue-400/80">
                  Description of the current video goes here. This can include details about
                  what will be covered in this lesson.
                </p>
              </div>
            </div>

            {/* Video List Section */}
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-4">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Course Videos</h3>
                <div className="space-y-2">
                  {videos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => setCurrentVideoId(video.id)}
                      className={`
                        w-full flex items-center p-3 rounded-lg transition-all duration-200
                        ${currentVideoId === video.id 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                          : "text-blue-400 hover:bg-blue-900/40"
                        }
                      `}
                    >
                      <div className="flex-1 text-left">
                        <p className="font-medium">{video.title}</p>
                        <p className="text-sm opacity-80 mt-1">{video.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;