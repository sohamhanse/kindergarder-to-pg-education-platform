import React, { useState } from 'react';

const VideoUploadForm = ({ moduleId, onVideoSubmit }) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', videoTitle);
    formData.append('video', videoFile);
    formData.append('description', description);
    formData.append('moduleId', moduleId);
    
    onVideoSubmit(formData);
    
    // Reset form
    setVideoTitle('');
    setVideoFile(null);
    setDescription('');
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-blue-500 mt-4">
      <h3 className="text-xl font-semibold mb-4 text-white">Upload Video</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-blue-400 mb-2">Video Title</label>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-400 mb-2">Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="w-full text-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-400 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;