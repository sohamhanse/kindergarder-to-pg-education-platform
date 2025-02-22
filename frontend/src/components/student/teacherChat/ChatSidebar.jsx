import { useState } from "react";
import { Search, Plus, Users } from "lucide-react";

const ChatSidebar = ({ onChatSelect, activeChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const chats = [
    { id: 1, name: "Dr. Smith", type: "individual", unread: 2, lastMessage: "See you tomorrow!" },
    { id: 2, name: "Mathematics Group", type: "group", unread: 0, lastMessage: "Quiz postponed" },
    { id: 3, name: "Prof. Johnson", type: "individual", unread: 1, lastMessage: "Great work!" },
  ];

  return (
    <div className="w-80 border-r border-blue-900/30 bg-black/40 backdrop-blur-lg">
      <div className="p-4">
        {/* Search and Create Group Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-400">Chats</h2>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="p-2 text-blue-400 hover:bg-blue-900/40 rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-blue-900/20 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeChat?.id === chat.id
                  ? "bg-blue-600"
                  : "hover:bg-blue-900/40"
              }`}
            >
              <div className="relative">
                {chat.type === "group" ? (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {chat.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                )}
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                    {chat.unread}
                  </span>
                )}
              </div>
              <div className="ml-3 text-left flex-1 truncate">
                <p className={`font-medium ${activeChat?.id === chat.id ? "text-white" : "text-blue-300"}`}>
                  {chat.name}
                </p>
                <p className={`text-sm truncate ${activeChat?.id === chat.id ? "text-blue-100" : "text-blue-400"}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;