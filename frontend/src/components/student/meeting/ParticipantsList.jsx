import { X, Mic, MicOff, Video, VideoOff } from 'lucide-react';

const ParticipantsList = ({ participants, onClose }) => {
  return (
    <div className="w-80 bg-black/40 backdrop-blur-lg border-l border-blue-900/30">
      <div className="p-4 border-b border-blue-900/30 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Participants</h2>
        <button onClick={onClose} className="text-blue-400 hover:text-blue-300">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {participants.map(participant => (
          <div 
            key={participant.id}
            className="flex items-center justify-between p-3 rounded-lg bg-blue-900/20 hover:bg-blue-900/30 transition-colors"
          >
            <div>
              <p className="text-white font-medium">{participant.name}</p>
              <p className="text-sm text-blue-400">{participant.role}</p>
            </div>
            <div className="flex space-x-2">
              {participant.isMuted ? 
                <MicOff size={16} className="text-red-500" /> : 
                <Mic size={16} className="text-green-500" />
              }
              {participant.isVideoOn ? 
                <Video size={16} className="text-green-500" /> : 
                <VideoOff size={16} className="text-red-500" />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList; 