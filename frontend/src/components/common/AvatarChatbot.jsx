import { useState } from "react";
import { MessageCircle } from "lucide-react"; // Use MessageCircle instead of ChatBubble
import Chatbot from "./Chatbot"; // Import the Chatbot component

const AvatarChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <Chatbot onClose={toggleChat} />
          <button
            onClick={toggleChat}
            className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
          >
            <MessageCircle size={24} />
          </button>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shadow-lg transition-transform transform hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle size={24} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default AvatarChatbot;
