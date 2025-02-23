import React, { useState } from 'react';
import { Calendar, Clock, Users, Info } from 'lucide-react';

const ScheduleMeetingForm = ({ onSubmit }) => {
  const [meetingData, setMeetingData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    participants: [],
    participantEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (meetingData.participantEmail && !meetingData.participants.includes(meetingData.participantEmail)) {
      setMeetingData(prev => ({
        ...prev,
        participants: [...prev.participants, prev.participantEmail],
        participantEmail: ''
      }));
    }
  };

  const removeParticipant = (email) => {
    setMeetingData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p !== email)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...meetingData,
      status: 'scheduled'
    });
    // Reset form
    setMeetingData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '60',
      participants: [],
      participantEmail: ''
    });
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Schedule New Meeting</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-blue-400 mb-2">Meeting Title</label>
          <input
            type="text"
            name="title"
            value={meetingData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meeting title"
            required
          />
        </div>

        <div>
          <label className="block text-blue-400 mb-2">Description</label>
          <textarea
            name="description"
            value={meetingData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meeting description"
            rows="3"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-400 mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                Date
              </div>
            </label>
            <input
              type="date"
              name="date"
              value={meetingData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-blue-400 mb-2">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                Time
              </div>
            </label>
            <input
              type="time"
              name="time"
              value={meetingData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-blue-400 mb-2">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              Duration (minutes)
            </div>
          </label>
          <select
            name="duration"
            value={meetingData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-blue-400 mb-2">
            <div className="flex items-center gap-2">
              <Users size={16} />
              Add Participants
            </div>
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              name="participantEmail"
              value={meetingData.participantEmail}
              onChange={handleChange}
              className="flex-1 px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter participant email"
            />
            <button
              onClick={handleAddParticipant}
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {meetingData.participants.length > 0 && (
          <div className="bg-black/20 rounded-lg p-4">
            <h3 className="text-blue-400 mb-2">Participants:</h3>
            <div className="flex flex-wrap gap-2">
              {meetingData.participants.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-blue-900/20 text-blue-400 px-3 py-1 rounded-full"
                >
                  <span>{email}</span>
                  <button
                    type="button"
                    onClick={() => removeParticipant(email)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Schedule Meeting
        </button>
      </form>
    </div>
  );
};

export default ScheduleMeetingForm;