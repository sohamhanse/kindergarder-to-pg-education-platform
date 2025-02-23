import React, { useState } from 'react';
import ModuleForm from '../../components/teacher/ModuleForm';
import VideoUploadForm from '../../components/teacher/VideoUploadForm';
import QuizForm from '../../components/teacher/QuizForm';

const UploadVideo = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleModuleSubmit = (moduleData) => {
    // Here you would typically make an API call to save the module
    const newModule = {
      id: Date.now(), // temporary ID, should come from backend
      ...moduleData,
      videos: []
    };
    setModules([...modules, newModule]);
  };

  const handleVideoSubmit = (videoData) => {
    // Here you would typically make an API call to upload the video
    // After successful upload, update the modules state
    const updatedModules = modules.map(module => {
      if (module.id === selectedModule) {
        return {
          ...module,
          videos: [...module.videos, {
            id: Date.now(), // temporary ID, should come from backend
            ...videoData
          }]
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  const handleQuizSubmit = (quizData) => {
    // Here you would typically make an API call to save the quiz
    console.log('Quiz submitted:', quizData);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">Course Content Management</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <ModuleForm onModuleSubmit={handleModuleSubmit} />

          {modules.length > 0 && (
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-blue-500">
              <h2 className="text-xl font-semibold mb-4 text-white">Select Module</h2>
              <select
                value={selectedModule || ''}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a module</option>
                {modules.map(module => (
                  <option key={module.id} value={module.id}>
                    {module.moduleName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedModule && (
            <VideoUploadForm
              moduleId={selectedModule}
              onVideoSubmit={handleVideoSubmit}
            />
          )}

          {selectedModule && modules.find(m => m.id === selectedModule)?.videos?.length > 0 && (
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-blue-500">
              <h2 className="text-xl font-semibold mb-4 text-white">Select Video for Quiz</h2>
              <select
                value={selectedVideo || ''}
                onChange={(e) => setSelectedVideo(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a video</option>
                {modules
                  .find(m => m.id === selectedModule)
                  ?.videos.map(video => (
                    <option key={video.id} value={video.id}>
                      {video.title}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {selectedVideo && (
            <QuizForm
              videoId={selectedVideo}
              onQuizSubmit={handleQuizSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;