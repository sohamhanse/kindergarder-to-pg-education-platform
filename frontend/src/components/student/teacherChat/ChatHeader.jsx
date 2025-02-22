import { Search, MoreVertical } from "lucide-react";
import ChatAvatar from "./ChatAvatar";

const ChatHeader = ({ teacher, onSearch }) => {
  return (
    <div className="bg-black/40 backdrop-blur-lg p-4 border-b border-blue-900/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ChatAvatar initials={teacher.name.split(" ").map(n => n[0]).join("")} />
          <div>
            <h2 className="text-white font-medium">{teacher.name}</h2>
            <p className="text-blue-400 text-sm">{teacher.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Search messages..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-48 pl-10 pr-4 py-2 bg-blue-900/20 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;