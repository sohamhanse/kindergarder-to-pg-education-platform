const Message = ({ message, searchQuery, id }) => {
    const { sender, text, timestamp } = message;
    const isStudent = sender === 'student';
  
    // Function to highlight matching text
    const highlightText = (text, query) => {
      if (!query.trim()) return text;
  
      const regex = new RegExp(`(${query})`, 'gi');
      const parts = text.split(regex);
  
      return parts.map((part, index) => {
        if (part.toLowerCase() === query.toLowerCase()) {
          return (
            <span key={index} className="bg-yellow-500/50 text-white px-1 rounded">
              {part}
            </span>
          );
        }
        return part;
      });
    };
  
    return (
      <div 
        id={id}
        className={`flex ${isStudent ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            isStudent
              ? 'bg-blue-600 text-white'
              : 'bg-black/40 backdrop-blur-lg text-white'
          }`}
        >
          <p>{highlightText(text, searchQuery)}</p>
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