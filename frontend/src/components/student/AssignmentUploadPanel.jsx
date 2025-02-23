import React, { useState } from 'react';

const AssignmentUploadPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('File:', file);
    // Reset the form
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-black/40 backdrop-blur-lg border-blue-900/30">
      <h2 className="text-lg font-bold mb-4 text-blue-400">Upload Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2 bg-black/20 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full p-2 bg-black/20 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="file">Upload File</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="border rounded w-full p-2 bg-black/20 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition-colors">
          Submit Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentUploadPanel; 