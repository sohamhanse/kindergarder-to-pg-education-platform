import { Mic, MicOff, Video, VideoOff, Users, MessageSquare, PhoneOff, Share, Settings } from 'lucide-react';

const MeetingControls = ({ 
  isMuted, 
  isVideoOn, 
  onToggleMute, 
  onToggleVideo,
  onToggleParticipants,
  onToggleChat,
  onEndCall,
}) => {
  return (
    <div className="bg-black/40 backdrop-blur-lg border-t border-blue-900/30 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-center space-x-4">
        <button
          onClick={onToggleMute}
          className={`p-4 rounded-full ${
            isMuted ? 'bg-red-500' : 'bg-blue-600'
          } hover:opacity-90 transition-opacity`}
        >
          {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
        </button>

        <button
          onClick={onToggleVideo}
          className={`p-4 rounded-full ${
            !isVideoOn ? 'bg-red-500' : 'bg-blue-600'
          } hover:opacity-90 transition-opacity`}
        >
          {!isVideoOn ? <VideoOff size={24} className="text-white" /> : <Video size={24} className="text-white" />}
        </button>

        <button
          onClick={onToggleParticipants}
          className="p-4 rounded-full bg-blue-600 hover:opacity-90 transition-opacity"
        >
          <Users size={24} className="text-white" />
        </button>

        <button
          onClick={onToggleChat}
          className="p-4 rounded-full bg-blue-600 hover:opacity-90 transition-opacity"
        >
          <MessageSquare size={24} className="text-white" />
        </button>

        <button
          onClick={onEndCall}
          className="p-4 rounded-full bg-red-500 hover:opacity-90 transition-opacity"
        >
          <PhoneOff size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MeetingControls; 