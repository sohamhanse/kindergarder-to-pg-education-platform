import { Search, MoreVertical } from "lucide-react";
import ChatAvatar from "./ChatAvatar";

const ChatHeader = ({ teacher }) => {
  return (
    <div className="bg-black/40 backdrop-blur-lg p-4 border-b border-blue-900/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ChatAvatar initials="TS" />
          <div>
            <h2 className="text-white font-medium">{teacher.name}</h2>
            <p className="text-blue-400 text-sm">{teacher.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-blue-400 hover:text-blue-300">
            <Search size={20} />
          </button>
          <button className="text-blue-400 hover:text-blue-300">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;