import { useState } from "react";
import { useParams } from "react-router-dom";
import SubjectSidebar from "../../../components/student/basiccomponents/CourseDetailSidebar";
import { Menu } from "lucide-react";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock course data - replace with actual data fetching
  const courseData = {
    id: courseId,
    title: "Web Development Fundamentals",
    instructor: "Dr. John Doe",
    progress: 45,
    currentModule: "JavaScript Basics",
    lastAccessed: "2024-03-15",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript."
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      {/* Mobile menu button */}
      <button 
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-lg text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Subject Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        sm:translate-x-0 fixed sm:relative z-40
        transition-transform duration-300 ease-in-out
      `}>
        <SubjectSidebar courseId={courseId} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 mb-8 border border-blue-900/30">
            <h1 className="text-3xl font-bold text-white mb-2">{courseData.title}</h1>
            <p className="text-blue-400">Instructor: {courseData.instructor}</p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-blue-400 mb-2">
                <span>Course Progress</span>
                <span>{courseData.progress}%</span>
              </div>
              <div className="w-full h-2 bg-blue-900/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${courseData.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Current Module Section */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 mb-8 border border-blue-900/30">
            <h2 className="text-xl font-bold text-white mb-4">Current Module</h2>
            <p className="text-blue-400">{courseData.currentModule}</p>
            <p className="text-sm text-blue-400/70 mt-2">
              Last accessed: {new Date(courseData.lastAccessed).toLocaleDateString()}
            </p>
          </div>

          {/* Course Description */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-blue-900/30">
            <h2 className="text-xl font-bold text-white mb-4">About This Course</h2>
            <p className="text-blue-400">{courseData.description}</p>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CourseDetail;