import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    educationalStage: {
      level: 'primary'
    }
  });
  const [error, setError] = useState('');

  const educationalLevels = [
    'kindergarten', 
    'primary',
    'secondary',
    'undergrad',
    'postgrad'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'level') {
      setFormData(prev => ({
        ...prev,
        educationalStage: { level: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('/api/courses', {
        title: formData.title,
        educationalStage: formData.educationalStage,
        description: formData.description
      });
      if (response.status === 201) {
        navigate('/courses');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Create New Course</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-blue-300 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                text-white placeholder-blue-500 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-blue-300 mb-2">
              Educational Level *
            </label>
            <select
              id="level"
              name="level"
              required
              value={formData.educationalStage.level}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent"
            >
              {educationalLevels.map(level => (
                <option key={level} value={level} className="bg-gray-900">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-blue-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                text-white placeholder-blue-500 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter course description"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition-colors duration-200 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                focus:ring-offset-gray-900"
            >
              Create Course
            </button>
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg 
                hover:bg-gray-700 transition-colors duration-200 focus:outline-none 
                focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 
                focus:ring-offset-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;