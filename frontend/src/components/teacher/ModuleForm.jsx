import React, { useState } from 'react';

const ModuleForm = ({ onModuleSubmit }) => {
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onModuleSubmit({ moduleName, moduleDescription });
    setModuleName('');
    setModuleDescription('');
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-blue-500">
      <h3 className="text-xl font-semibold mb-4 text-white">Add New Module</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-blue-400 mb-2">Module Name</label>
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-400 mb-2">Module Description</label>
          <textarea
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-blue-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Module
        </button>
      </form>
    </div>
  );
};

export default ModuleForm;