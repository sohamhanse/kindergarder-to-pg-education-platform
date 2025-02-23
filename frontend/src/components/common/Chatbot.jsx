import { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = "http://localhost:5000/chat/student/kindergarten";

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      message: "You are talking to a kindergarten student. Answer in a playful and simple manner.",
      role: "user",
      prompt: input,
    };

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(apiUrl, userMessage);
      const botMessage = response.data; // Assuming the response contains the bot's message
      setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching the chatbot response:", error);
      setMessages((prev) => [...prev, { text: "Oops! Something went wrong.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b bg-blue-500 text-white font-bold flex justify-between items-center">
        <span>Chatbot</span>
        <button onClick={onClose} className="text-white hover:text-gray-200" aria-label="Close chatbot">
          &times;
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-500">Typing...</div>}
      </div>
      <form onSubmit={handleSendMessage} className="flex p-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white rounded-lg px-4">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;