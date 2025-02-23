import { useState } from 'react';
import { Users, Book, Video, Calendar, Clock, BarChart } from 'lucide-react';

const TeacherDashboard = () => {
  const [stats] = useState({
    totalStudents: 156,
    activeCourses: 4,
    upcomingMeetings: 2,
    totalHours: 24,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Teacher Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={Users}
            trend="+12%"
          />
          <StatCard
            title="Active Courses"
            value={stats.activeCourses}
            icon={Book}
            trend="+2"
          />
          <StatCard
            title="Upcoming Meetings"
            value={stats.upcomingMeetings}
            icon={Video}
          />
          <StatCard
            title="Teaching Hours"
            value={`${stats.totalHours}h`}
            icon={Clock}
            trend="+5h"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <ActivityItem
                title="New Assignment Submission"
                description="3 students submitted Python Basics assignment"
                time="2 hours ago"
              />
              <ActivityItem
                title="Course Progress"
                description="Web Development course completion at 75%"
                time="5 hours ago"
              />
              <ActivityItem
                title="Meeting Scheduled"
                description="JavaScript Advanced Q&A session"
                time="1 day ago"
              />
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Upcoming Schedule</h2>
            <div className="space-y-4">
              <ScheduleItem
                title="Data Structures Live Class"
                time="Today, 2:00 PM"
                duration="1h 30m"
              />
              <ScheduleItem
                title="Python Project Review"
                time="Tomorrow, 10:00 AM"
                duration="45m"
              />
              <ScheduleItem
                title="Web Development Workshop"
                time="Wed, 3:00 PM"
                duration="2h"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
    <div className="flex items-center justify-between mb-4">
      <Icon className="text-blue-400" size={24} />
      {trend && <span className="text-green-400 text-sm">{trend}</span>}
    </div>
    <h3 className="text-blue-400 font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-2">{value}</p>
  </div>
);

const ActivityItem = ({ title, description, time }) => (
  <div className="border-l-2 border-blue-900 pl-4">
    <h4 className="text-white font-medium">{title}</h4>
    <p className="text-blue-400 text-sm">{description}</p>
    <span className="text-blue-400/60 text-xs">{time}</span>
  </div>
);

const ScheduleItem = ({ title, time, duration }) => (
  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-900/20">
    <Calendar className="text-blue-400" size={20} />
    <div>
      <h4 className="text-white font-medium">{title}</h4>
      <div className="flex items-center text-blue-400/60 text-sm">
        <span>{time}</span>
        <span className="mx-2">•</span>
        <span>{duration}</span>
      </div>
    </div>
  </div>
);

export default TeacherDashboard; 