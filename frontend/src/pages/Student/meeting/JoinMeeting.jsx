import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, VideoOff, Mic, MicOff, Users } from 'lucide-react';

const JoinMeeting = () => {
  const [meetingCode, setMeetingCode] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    if (meetingCode && userName) {
      navigate(`/meeting/go?code=${meetingCode}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Video Preview */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
              <div className="aspect-video bg-blue-900/20 rounded-lg overflow-hidden mb-4">
                {isVideoEnabled ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users size={64} className="text-blue-400" />
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`p-4 rounded-full ${
                    isAudioEnabled ? 'bg-blue-600' : 'bg-red-500'
                  } hover:opacity-90 transition-opacity`}
                >
                  {isAudioEnabled ? (
                    <Mic size={24} className="text-white" />
                  ) : (
                    <MicOff size={24} className="text-white" />
                  )}
                </button>

                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`p-4 rounded-full ${
                    isVideoEnabled ? 'bg-blue-600' : 'bg-red-500'
                  } hover:opacity-90 transition-opacity`}
                >
                  {isVideoEnabled ? (
                    <Video size={24} className="text-white" />
                  ) : (
                    <VideoOff size={24} className="text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Right Side - Join Form */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
              <h1 className="text-2xl font-bold text-white mb-6">Join Meeting</h1>
              
              <form onSubmit={handleJoinMeeting} className="space-y-6">
                <div>
                  <label className="block text-blue-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-blue-900/20 text-white placeholder-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-blue-400 mb-2">Meeting Code</label>
                  <input
                    type="text"
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    placeholder="Enter meeting code"
                    className="w-full bg-blue-900/20 text-white placeholder-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Join Meeting
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-blue-400">Don't have a code? </span>
                <button
                  onClick={() => navigate('/meeting/create')}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Create a meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinMeeting; 