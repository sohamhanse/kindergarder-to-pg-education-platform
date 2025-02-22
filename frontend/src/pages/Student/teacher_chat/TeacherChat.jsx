import { useState } from "react";
import ChatHeader from "../../../components/student/teacherChat/ChatHeader";
import ChatMessages from "../../../components/student/teacherChat/ChatMassages";
import MessageInput from "../../../components/student/teacherChat/MessageInput";

const TeacherChat = () => {
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

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: messages.length + 1,
      sender: "student",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950">
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        <ChatHeader teacher={teacher} />
        <ChatMessages messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default TeacherChat;