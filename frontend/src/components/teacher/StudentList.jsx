import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight, BookOpen, Users, Award } from 'lucide-react';

const StudentList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy student data
  const [students] = useState([
    {
      id: 1,
      name: 'John Doe',
      profilePic: 'https://ui-avatars.com/api/?name=John+Doe',
      course: 'Web Development',
      attendance: 85,
      assignmentsCompleted: 12,
      totalAssignments: 15,
      examScore: 78,
      status: 'active'
    },
    // Add more students...
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 text-white placeholder-blue-400"
        />
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <div
            key={student.id}
            onClick={() => navigate(`/student/${student.id}`)}
            className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6 hover:border-blue-500 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={student.profilePic}
                  alt={student.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{student.name}</h3>
                  <p className="text-blue-400">{student.course}</p>
                </div>
              </div>
              <ArrowUpRight 
                className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" 
                size={20} 
              />
            </div>

            <div className="space-y-4">
              {/* Attendance Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-400">Attendance</span>
                  <span className="text-white">{student.attendance}%</span>
                </div>
                <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${student.attendance}%` }}
                  />
                </div>
              </div>

              {/* Assignments Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-400">Assignments</span>
                  <span className="text-white">
                    {student.assignmentsCompleted}/{student.totalAssignments}
                  </span>
                </div>
                <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ 
                      width: `${(student.assignmentsCompleted / student.totalAssignments) * 100}%` 
                    }}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center p-2 bg-blue-900/20 rounded-lg">
                  <BookOpen size={16} className="text-blue-400 mx-auto mb-1" />
                  <span className="text-xs text-white">{student.examScore}%</span>
                </div>
                <div className="text-center p-2 bg-blue-900/20 rounded-lg">
                  <Users size={16} className="text-blue-400 mx-auto mb-1" />
                  <span className="text-xs text-white">Active</span>
                </div>
                <div className="text-center p-2 bg-blue-900/20 rounded-lg">
                  <Award size={16} className="text-blue-400 mx-auto mb-1" />
                  <span className="text-xs text-white">Good</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;