import { useState, useRef } from "react";
import { Send, Paperclip, X } from "lucide-react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File size should be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="p-4 bg-black/40 backdrop-blur-lg border-t border-blue-900/30">
      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mb-2 p-2 bg-blue-900/20 rounded-lg flex items-center justify-between">
          <span className="text-sm text-blue-400 truncate">
            {selectedFile.name}
          </span>
          <button
            type="button"
            onClick={removeSelectedFile}
            className="text-blue-400 hover:text-blue-300 p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          {/* File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-blue-400 hover:text-blue-300 transition-colors p-2"
            title="Attach file"
          >
            <Paperclip size={20} />
          </button>

          {/* Message Input */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-blue-900/20 text-white placeholder-blue-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[50px] max-h-[120px] resize-y"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          {/* Send Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim() && !selectedFile}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;