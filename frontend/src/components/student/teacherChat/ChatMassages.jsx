import { useEffect, useRef } from 'react';
import Message from "./Message";

const ChatMessages = ({ messages, searchQuery }) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim() && messagesContainerRef.current) {
      // Find the first message that matches the search query
      const firstMatch = messages.find(message => 
        message.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (firstMatch) {
        // Find the DOM element of the first matching message
        const messageElement = document.getElementById(`message-${firstMatch.id}`);
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [searchQuery, messages]);

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
    >
      {messages.map((message) => (
        <Message 
          key={message.id} 
          message={message} 
          searchQuery={searchQuery}
          id={`message-${message.id}`}  // Add ID for scrolling
        />
      ))}
    </div>
  );
};

export default ChatMessages;