import { useState, useMemo } from "react";
import ChatHeader from "../../../components/student/teacherChat/ChatHeader";
import ChatMessages from "../../../components/student/teacherChat/ChatMassages";
import MessageInput from "../../../components/student/teacherChat/MessageInput";
import CourseSidebar from "../../../components/student/basiccomponents/CourseSidebar";
import { Menu } from "lucide-react";

const TeacherChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "teacher", 
      text: "Hello! How can I help you today?",
      timestamp: "09:30 AM"
    },
    {
      id: 2,
      sender: "student",
      text: "Hi, I have a question about the last assignment",
      timestamp: "09:31 AM"
    },
    {
      id: 3,
      sender: "teacher",
      text: "Sure, what would you like to know?", 
      timestamp: "09:32 AM"
    }
  ]);

  const teacher = {
    name: "Dr. Smith",
    role: "Mathematics Professor"
  };

  // Filter messages based on search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    
    return messages.filter(message => 
      message.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "student",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    setMessages([...messages, newMessage]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950">
      {/* Mobile Menu Button */}
      <button 
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-lg text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          sm:translate-x-0 fixed sm:relative z-40
          transition-transform duration-300 ease-in-out
        `}>
          <CourseSidebar 
            onCategorySelect={setActiveCategory} 
            activeCategory={activeCategory}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col w-full">
          <ChatHeader 
            teacher={teacher} 
            onSearch={handleSearch}
          />
          <ChatMessages 
            messages={messages} 
            searchQuery={searchQuery} 
          />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 sm:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherChat;