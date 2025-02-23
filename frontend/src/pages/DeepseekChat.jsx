import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import Ollama from "ollama";

const DeepseekChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ageGroup, setAgeGroup] = useState('adult'); // Default age group
  const messagesEndRef = useRef(null);

  const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to modify the input message based on the selected age group
  const generatePromptForAgeGroup = (input, ageGroup) => {
    switch (ageGroup) {
      case "child":
        return `You are a friendly AI for kids. Use simple words, short sentences, and a fun tone. Avoid complex words and keep it engaging. Question: ${input}`;
      case "teen":
        return `You are a relatable AI assistant for teenagers. Use a casual and friendly tone while providing useful insights. Keep it engaging but not too childish. Question: ${input}`;
      case "adult":
      default:
        return `You are a professional AI assistant. Provide clear, detailed, and insightful responses. Question: ${input}`;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const ageAdjustedPrompt = generatePromptForAgeGroup(inputMessage, ageGroup);

    try {
      const response = await ollama.call('deepseek-coder:6.7b', { 
        input: ageAdjustedPrompt,
        temperature: 0.7,
        top_p: 0.9
      });

      const botMessage = {
        type: 'bot',
        content: response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 h-[80vh] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-blue-900/30 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white flex items-center">
              <Bot className="text-blue-400 mr-2" />
              Deepseek Chat
            </h1>
            {/* Age Group Selector */}
            <div>
              <label className="text-white mr-2">Age Group:</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="bg-blue-900/20 rounded-lg px-2 py-1 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="child">Child (Below 13)</option>
                <option value="teen">Teen (13-17)</option>
                <option value="adult">Adult (18+)</option>
              </select>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
              >
                {message.type === 'bot' && (
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <Bot size={20} className="text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-black/40 text-blue-400'
                  } ${message.error ? 'border border-red-500/50' : ''}`}
                >
                  {message.content}
                </div>
                {message.type === 'user' && (
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <User size={20} className="text-blue-400" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-900/20 rounded-lg">
                  <Bot size={20} className="text-blue-400" />
                </div>
                <div className="bg-black/40 rounded-lg p-3">
                  <Loader className="w-5 h-5 text-blue-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-blue-900/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-blue-900/20 rounded-lg px-4 py-2 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeepseekChat;
