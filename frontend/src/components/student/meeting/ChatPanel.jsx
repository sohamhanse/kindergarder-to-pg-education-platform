import { useState } from 'react';
import { X, Send } from 'lucide-react';

const ChatPanel = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', text: 'Hello everyone!', time: '10:30 AM' },
    { id: 2, sender: 'Jane Smith', text: 'Hi John!', time: '10:31 AM' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'You',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
  };

  return (
    <div className="w-80 bg-black/40 backdrop-blur-lg border-l border-blue-900/30 flex flex-col">
      <div className="p-4 border-b border-blue-900/30 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Chat</h2>
        <button onClick={onClose} className="text-blue-400 hover:text-blue-300">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
          >
            <div className="max-w-[80%] bg-blue-900/20 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-400">{msg.sender}</p>
              <p className="text-white">{msg.text}</p>
              <p className="text-xs text-blue-400 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-blue-900/30">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-blue-900/20 text-white placeholder-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel; 