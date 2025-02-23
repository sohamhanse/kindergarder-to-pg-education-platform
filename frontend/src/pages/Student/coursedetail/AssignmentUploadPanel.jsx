import React, { useState } from 'react';

const AssignmentUploadPanel = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => 
      file.type === 'application/pdf' || file.type.startsWith('image/')
    );

    if (validFiles.length !== selectedFiles.length) {
      setMessage('Only PDF and image files are allowed');
      setTimeout(() => setMessage(''), 3000);
    }

    setFiles(validFiles);
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      setMessage('Please select at least one file');
      return;
    }
    // Handle upload logic here
    setMessage('Files uploaded successfully!');
    setFiles([]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="max-w-[500px] mx-auto my-5 p-5 bg-[#1a1a1a] rounded-lg text-white items-center justify-center">
      <h2 className="mb-5 text-2xl font-bold">Upload Assignment</h2>

      <div className="border-2 border-dashed border-[#666] p-5 text-center mb-5 rounded">
        <input
          type="file"
          multiple
          accept=".pdf,image/*"
          onChange={handleFileChange}
          className="mb-3"
        />
        <p className="text-sm text-[#666]">
          Accepted files: PDF, Images
        </p>
      </div>

      {files.length > 0 && (
        <div className="mb-5">
          <h3 className="mb-3 text-lg font-semibold">Selected Files:</h3>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-[#333] mb-2 rounded"
            >
              <span>{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="bg-transparent border-none text-[#ff4444] cursor-pointer p-1 hover:text-[#ff6666]"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {message && (
        <div
          className={`p-3 mb-5 rounded ${
            message.includes('successfully')
              ? 'bg-[#1a472a]'
              : 'bg-[#4a1a1a]'
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-[#2563eb] text-white border-none rounded cursor-pointer hover:bg-[#1e4bb5]"
      >
        Submit Assignment
      </button>
    </div>
  );
};

export default AssignmentUploadPanel;