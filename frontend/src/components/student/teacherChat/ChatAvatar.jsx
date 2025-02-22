const ChatAvatar = ({ initials }) => {
    return (
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
        <span className="text-white font-medium">{initials}</span>
      </div>
    );
  };
  
  export default ChatAvatar;