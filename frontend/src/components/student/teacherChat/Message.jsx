const Message = ({ message }) => {
    const { sender, text, timestamp } = message;
    const isStudent = sender === 'student';
  
    return (
      <div className={`flex ${isStudent ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            isStudent
              ? 'bg-blue-600 text-white'
              : 'bg-black/40 backdrop-blur-lg text-white'
          }`}
        >
          <p>{text}</p>
          <p className={`text-xs mt-1 ${
            isStudent ? 'text-blue-200' : 'text-blue-400'
          }`}>
            {timestamp}
          </p>
        </div>
      </div>
    );
  };
  
  export default Message;