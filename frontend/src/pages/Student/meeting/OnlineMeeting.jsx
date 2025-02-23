import { useState, useRef } from 'react';
import MeetingControls from '../../../components/student/meeting/MeetingControls';
import ParticipantsList from '../../../components/student/meeting/ParticipantsList';
import ChatPanel from '../../../components/student/meeting/ChatPanel';
import { Video, Mic, MicOff, VideoOff, Users } from 'lucide-react';

const OnlineMeeting = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const videoRef = useRef(null);

  const participants = [
    { id: 1, name: "John Doe", role: "Teacher", isMuted: false, isVideoOn: true },
    { id: 2, name: "Jane Smith", role: "Student", isMuted: true, isVideoOn: true },
    // Add more participants
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      <div className="flex-1 flex flex-col relative">
        {/* Main Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Main Video */}
          <div className="col-span-full lg:col-span-2 bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 overflow-hidden transform transition-transform hover:scale-105">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">You</span>
                <div className="flex space-x-2">
                  {isMuted && <MicOff size={16} className="text-red-500" />}
                  {!isVideoOn && <VideoOff size={16} className="text-red-500" />}
                </div>
              </div>
            </div>
          </div>

          {/* Participants Videos */}
          {participants.map(participant => (
            <div 
              key={participant.id}
              className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 overflow-hidden relative transform transition-transform hover:scale-105"
            >
              <video className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{participant.name}</span>
                  <div className="flex space-x-2">
                    {participant.isMuted && <MicOff size={16} className="text-red-500" />}
                    {!participant.isVideoOn && <VideoOff size={16} className="text-red-500" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Meeting Controls */}
        <MeetingControls 
          isMuted={isMuted}
          isVideoOn={isVideoOn}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleVideo={() => setIsVideoOn(!isVideoOn)}
          onToggleParticipants={() => setShowParticipants(!showParticipants)}
          onToggleChat={() => setShowChat(!showChat)}
        />
      </div>

      {/* Side Panels */}
      {showParticipants && (
        <ParticipantsList 
          participants={participants}
          onClose={() => setShowParticipants(false)}
        />
      )}
      
      {showChat && (
        <ChatPanel 
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default OnlineMeeting;