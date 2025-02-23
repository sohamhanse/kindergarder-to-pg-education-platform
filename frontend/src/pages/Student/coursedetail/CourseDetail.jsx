import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios here
import { useEffect } from "react";

const CourseDetail = () => {
  const { courseId } = useParams();

  // Mock course data - replace with actual data fetching
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`https://localhost:5000/api/courses/${courseId}`);
      // Handle the response data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  // Call the fetch function when the component mounts
  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 mb-8 border border-blue-900/30">
            <h1 className="text-3xl font-bold text-white mb-2">Course Title</h1>
            <p className="text-blue-400">Instructor: Instructor Name</p>
            {/* Additional course details */}
          </div>
          {/* Course Description */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-blue-900/30">
            <h2 className="text-xl font-bold text-white mb-4">About This Course</h2>
            <p className="text-blue-400">Course description goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;