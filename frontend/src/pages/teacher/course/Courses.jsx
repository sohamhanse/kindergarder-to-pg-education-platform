import { useState } from 'react';
import { Search, Plus, Users, Clock, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses] = useState([
    {
      id: 1,
      title: 'Advanced Web Development',
      students: 45,
      progress: 75,
      hours: 24,
      thumbnail: 'path/to/thumbnail.jpg'
    },
    // Add more course data
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
          <Link
            to="/teacher/courses/create"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Create Course
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 text-white placeholder-blue-400"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => (
  <Link
    to={`/teacher/courses/${course.id}`}
    className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 overflow-hidden hover:border-blue-600 transition-colors"
  >
    <div className="aspect-video bg-blue-900/20">
      {/* Course thumbnail */}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-4">{course.title}</h3>
      <div className="space-y-3">
        <div className="flex items-center text-blue-400">
          <Users size={18} className="mr-2" />
          <span>{course.students} Students</span>
        </div>
        <div className="flex items-center text-blue-400">
          <Clock size={18} className="mr-2" />
          <span>{course.hours} Hours</span>
        </div>
        <div>
          <div className="flex items-center justify-between text-blue-400 mb-1">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="h-2 bg-blue-900/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default TeacherCourses; 