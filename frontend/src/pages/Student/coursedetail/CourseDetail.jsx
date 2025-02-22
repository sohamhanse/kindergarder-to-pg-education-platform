import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();

  // Mock course data - replace with actual data fetching
  const response = axios.get("https://localhost:5000/api/courses")

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
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
    </div>
  );
};

export default CourseDetail;