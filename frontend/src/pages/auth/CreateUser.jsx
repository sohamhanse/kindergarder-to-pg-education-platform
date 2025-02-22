import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-blue-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                  text-white placeholder-blue-500 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-blue-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                  text-white placeholder-blue-500 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                text-white placeholder-blue-500 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                text-white placeholder-blue-500 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-blue-300 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                text-white placeholder-blue-500 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-blue-900/30 
                text-white placeholder-blue-500 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
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
              Create Account
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
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

export default CreateUser; 