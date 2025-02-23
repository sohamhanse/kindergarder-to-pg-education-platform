import { useState, useRef } from 'react';
import { Upload, X, Video, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

const UploadVideo = () => {
  const { courseId } = useParams();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      // Get video duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      };
      video.src = URL.createObjectURL(selectedFile);
    } else {
      setError('Please select a valid video file');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) {
      setError('Please fill in all required fields');
      return;
    }

    setUploading(true);
    setError('');

    // Simulated upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // TODO: Implement actual video upload logic here
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 5000));
      clearInterval(interval);
      setUploadProgress(100);
      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setDuration('');
    } catch (err) {
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Upload Course Video</h1>

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Video Upload Area */}
            <div 
              className="border-2 border-dashed border-blue-900/30 rounded-xl p-8 text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                className="hidden"
              />
              
              {file ? (
                <div className="flex items-center justify-center space-x-4">
                  <Video className="text-blue-400" size={24} />
                  <span className="text-blue-400">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="text-blue-400">
                  <Upload size={48} className="mx-auto mb-4" />
                  <p>Drag and drop your video or click to browse</p>
                </div>
              )}
            </div>

            {/* Video Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-blue-400 mb-2">Video Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-blue-900/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block text-blue-400 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-blue-900/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter video description"
                />
              </div>

              {duration && (
                <div className="flex items-center text-blue-400">
                  <Clock size={20} className="mr-2" />
                  <span>Duration: {duration}</span>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center text-red-400 bg-red-900/20 p-4 rounded-lg">
                <AlertCircle size={20} className="mr-2" />
                {error}
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="h-2 bg-blue-900/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-blue-400 text-sm text-center">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
                uploading 
                  ? 'bg-blue-900/50 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {uploadProgress === 100 ? (
                <>
                  <CheckCircle size={20} />
                  <span>Upload Complete</span>
                </>
              ) : (
                <>
                  <Upload size={20} />
                  <span>Upload Video</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
