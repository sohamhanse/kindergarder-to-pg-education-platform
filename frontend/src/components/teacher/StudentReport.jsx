import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Award, 
  Activity,
  Clock,
  FileText,
  Users
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const StudentReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Dummy student data
  const [student] = useState({
    id: 1,
    name: 'John Doe',
    profilePic: 'https://ui-avatars.com/api/?name=John+Doe',
    course: 'Web Development',
    attendance: 85,
    lecturesWatched: 24,
    totalLectures: 30,
    assignmentsCompleted: 12,
    totalAssignments: 15,
    projectsSubmitted: 4,
    totalProjects: 5,
    activities: [
      { name: 'Coding Club', role: 'Member' },
      { name: 'Hackathon', role: 'Participant' }
    ],
    exams: [
      {
        subject: 'JavaScript',
        score: 85,
        total: 100,
        grade: 'A',
        status: 'pass'
      },
      {
        subject: 'React',
        score: 92,
        total: 100,
        grade: 'A+',
        status: 'pass'
      },
      // Add more exams...
    ],
    performanceTrend: [
      { month: 'Jan', score: 75 },
      { month: 'Feb', score: 82 },
      { month: 'Mar', score: 85 },
      { month: 'Apr', score: 92 }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Students
        </button>

        <div className="flex items-center gap-6">
          <img
            src={student.profilePic}
            alt={student.name}
            className="w-20 h-20 rounded-full border-2 border-blue-500"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{student.name}</h1>
            <p className="text-blue-400">{student.course}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Attendance"
          value={`${student.attendance}%`}
          icon={Calendar}
          progress={student.attendance}
        />
        <StatCard
          title="Lectures Watched"
          value={`${student.lecturesWatched}/${student.totalLectures}`}
          icon={Clock}
          progress={(student.lecturesWatched / student.totalLectures) * 100}
        />
        <StatCard
          title="Assignments"
          value={`${student.assignmentsCompleted}/${student.totalAssignments}`}
          icon={FileText}
          progress={(student.assignmentsCompleted / student.totalAssignments) * 100}
        />
        <StatCard
          title="Projects"
          value={`${student.projectsSubmitted}/${student.totalProjects}`}
          icon={BookOpen}
          progress={(student.projectsSubmitted / student.totalProjects) * 100}
        />
      </div>

      {/* Performance Chart */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Performance Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={student.performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
              <XAxis dataKey="month" stroke="#60a5fa" />
              <YAxis stroke="#60a5fa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(37, 99, 235, 0.3)',
                  borderRadius: '0.5rem'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Exam Scores */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Exam Scores</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-900/30">
                <th className="text-left py-3 px-4 text-blue-400">Subject</th>
                <th className="text-left py-3 px-4 text-blue-400">Score</th>
                <th className="text-left py-3 px-4 text-blue-400">Grade</th>
                <th className="text-left py-3 px-4 text-blue-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {student.exams.map((exam, index) => (
                <tr key={index} className="border-b border-blue-900/30">
                  <td className="py-3 px-4 text-white">{exam.subject}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-blue-900/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(exam.score / exam.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-blue-400">
                        {exam.score}/{exam.total}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-900/20 text-blue-400 rounded">
                      {exam.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded ${
                      exam.status === 'pass'
                        ? 'bg-green-900/20 text-green-400'
                        : 'bg-red-900/20 text-red-400'
                    }`}>
                      {exam.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activities */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Extracurricular Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.activities.map((activity, index) => (
            <div
              key={index}
              className="p-4 bg-blue-900/20 rounded-lg flex items-center justify-between"
            >
              <div>
                <h3 className="text-white font-medium">{activity.name}</h3>
                <p className="text-blue-400 text-sm">{activity.role}</p>
              </div>
              <Award className="text-blue-400" size={24} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, progress }) => (
  <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-blue-400">{title}</h3>
      <Icon className="text-blue-400" size={20} />
    </div>
    <p className="text-2xl font-bold text-white mb-2">{value}</p>
    <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default StudentReport;