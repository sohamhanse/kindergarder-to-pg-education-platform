import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, 
  Video, 
  FileText, 
  BarChart, 
  Clock,
  Calendar,
  BookOpen
} from 'lucide-react';
import TeacherCourseDetailSidebar from '../../../components/teacher/TeacherCourseDetailSidebar';

const TeacherCourseDetail = () => {
  const { courseId } = useParams();
  const [courseData] = useState({
    title: 'Advanced Web Development',
    description: 'Learn modern web development techniques and best practices',
    totalStudents: 45,
    totalVideos: 24,
    completionRate: 75,
    totalHours: 36,
    nextClass: 'Tomorrow, 10:00 AM'
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      <TeacherCourseDetailSidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">{courseData.title}</h1>
            <p className="text-blue-400">{courseData.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={courseData.totalStudents}
              icon={Users}
            />
            <StatCard
              title="Total Videos"
              value={courseData.totalVideos}
              icon={Video}
            />
            <StatCard
              title="Completion Rate"
              value={`${courseData.completionRate}%`}
              icon={BarChart}
            />
            <StatCard
              title="Total Hours"
              value={`${courseData.totalHours}h`}
              icon={Clock}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activities</h2>
              <div className="space-y-4">
                <ActivityItem
                  icon={FileText}
                  title="New Assignment Submitted"
                  description="5 students submitted JavaScript Basics"
                  time="2 hours ago"
                />
                <ActivityItem
                  icon={Video}
                  title="New Video Published"
                  description="React Hooks Introduction"
                  time="5 hours ago"
                />
                <ActivityItem
                  icon={Users}
                  title="Class Attendance"
                  description="32 students attended CSS Layout class"
                  time="1 day ago"
                />
              </div>
            </div>

            {/* Course Progress */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Course Progress</h2>
              <div className="space-y-4">
                <ProgressItem
                  title="HTML & CSS Basics"
                  progress={100}
                  students={45}
                />
                <ProgressItem
                  title="JavaScript Fundamentals"
                  progress={85}
                  students={42}
                />
                <ProgressItem
                  title="React Components"
                  progress={60}
                  students={38}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
    <div className="flex items-center justify-between mb-4">
      <Icon className="text-blue-400" size={24} />
    </div>
    <h3 className="text-blue-400 font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-2">{value}</p>
  </div>
);

const ActivityItem = ({ icon: Icon, title, description, time }) => (
  <div className="flex items-start space-x-4">
    <div className="p-2 bg-blue-900/20 rounded-lg">
      <Icon className="text-blue-400" size={20} />
    </div>
    <div>
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-blue-400 text-sm">{description}</p>
      <span className="text-blue-400/60 text-xs">{time}</span>
    </div>
  </div>
);

const ProgressItem = ({ title, progress, students }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <h4 className="text-white font-medium">{title}</h4>
      <span className="text-blue-400 text-sm">{students} students</span>
    </div>
    <div className="h-2 bg-blue-900/20 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default TeacherCourseDetail; 