import React, { useState } from 'react';
import { Check, X, Search, Clock, UserCheck, Calendar, Users } from 'lucide-react';

const AttendanceTracker = ({ students = [], date = new Date() }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceData, setAttendanceData] = useState(
    students.map(student => ({
      ...student,
      status: 'pending', // pending, present, absent
      checkInTime: null
    }))
  );

  // Mock data for testing - remove this when you have real data
  const defaultStudents = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'Bob Wilson', email: 'bob@example.com' },
    { id: 5, name: 'Emma Davis', email: 'emma@example.com' },
  ];

  // Use defaultStudents if no students are provided
  const initialAttendanceData = useState(
    (students.length ? students : defaultStudents).map(student => ({
      ...student,
      status: 'pending',
      checkInTime: null
    }))
  )[0];

  const [attendanceList, setAttendanceList] = useState(initialAttendanceData);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceList(prev => prev.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          status,
          checkInTime: status === 'present' ? new Date().toLocaleTimeString() : null
        };
      }
      return student;
    }));
  };

  const filteredStudents = attendanceList.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: attendanceList.length,
    present: attendanceList.filter(s => s.status === 'present').length,
    absent: attendanceList.filter(s => s.status === 'absent').length,
    pending: attendanceList.filter(s => s.status === 'pending').length
  };

  // Rest of the component remains the same
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Attendance Tracker</h2>
        <div className="flex items-center gap-2 text-blue-400">
          <Calendar size={20} />
          <span>{date.toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/40 backdrop-blur-lg rounded-lg border border-blue-900/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-400">Total</span>
            <Users size={20} className="text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-black/40 backdrop-blur-lg rounded-lg border border-blue-900/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-green-400">Present</span>
            <UserCheck size={20} className="text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.present}</p>
        </div>
        <div className="bg-black/40 backdrop-blur-lg rounded-lg border border-blue-900/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-red-400">Absent</span>
            <X size={20} className="text-red-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.absent}</p>
        </div>
        <div className="bg-black/40 backdrop-blur-lg rounded-lg border border-blue-900/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-yellow-400">Pending</span>
            <Clock size={20} className="text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.pending}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search students..."
          className="w-full px-4 py-2 pl-10 bg-black/40 border border-blue-900/30 rounded-lg text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-blue-400" size={20} />
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-900/30">
              <th className="text-left py-3 px-4 text-blue-400 font-medium">Student</th>
              <th className="text-left py-3 px-4 text-blue-400 font-medium">Email</th>
              <th className="text-left py-3 px-4 text-blue-400 font-medium">Check-in Time</th>
              <th className="text-left py-3 px-4 text-blue-400 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-blue-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-blue-900/30">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                      <span className="text-blue-400">{student.name[0]}</span>
                    </div>
                    <span className="text-white">{student.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-blue-400">{student.email}</td>
                <td className="py-3 px-4 text-gray-300">
                  {student.checkInTime || '-'}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    student.status === 'present' ? 'bg-green-900/20 text-green-400' :
                    student.status === 'absent' ? 'bg-red-900/20 text-red-400' :
                    'bg-yellow-900/20 text-yellow-400'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                      className="p-1 rounded-lg hover:bg-green-900/20 text-green-400"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                      className="p-1 rounded-lg hover:bg-red-900/20 text-red-400"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTracker; 