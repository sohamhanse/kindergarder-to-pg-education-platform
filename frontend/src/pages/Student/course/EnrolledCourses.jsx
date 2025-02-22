import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../../components/student/courses/CourseCard";
import CourseFilters from "../../../components/student/courses/CourseFilters";
import { Search, BookOpen } from "lucide-react";

const EnrolledCourses = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("enrolled");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    duration: "all",
    level: "all",
    progress: "all"
  });

  // Sample enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      category: "Programming",
      image: "https://www.shutterstock.com/image-vector/programming-software-development-web-page-260nw-1682028748.jpg",
      enrolledCount: 156,
      duration: "8 weeks",
      level: "Beginner",
      progress: 45,
      nextLesson: "JavaScript Basics",
      lastAccessed: "2024-03-15"
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      category: "Programming",
      image: "https://www.shutterstock.com/image-vector/programming-software-development-web-page-260nw-1682028748.jpg",
      enrolledCount: 89,
      duration: "12 weeks",
      level: "Advanced",
      progress: 75,
      nextLesson: "Data Structures",
      lastAccessed: "2024-03-14"
    },
    // Add more enrolled courses...
  ];

  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filters.category === "all" || course.category === filters.category;
      const matchesDuration = filters.duration === "all" || course.duration === filters.duration;
      const matchesLevel = filters.level === "all" || course.level === filters.level;
      
      let matchesProgress = true;
      if (filters.progress !== "all") {
        switch (filters.progress) {
          case "notStarted":
            matchesProgress = course.progress === 0;
            break;
          case "inProgress":
            matchesProgress = course.progress > 0 && course.progress < 100;
            break;
          case "completed":
            matchesProgress = course.progress === 100;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesDuration && matchesLevel && matchesProgress;
    });
  }, [enrolledCourses, searchQuery, filters]);

  const handleContinueCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      {/* Main content - remove sidebar-related classes */}
      <div className="p-8 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-blue-400">My Enrolled Courses</h1>
              <p className="text-blue-300 mt-2">Continue your learning journey</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search enrolled courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-blue-900/20 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <CourseFilters 
                onFilterChange={setFilters}
                includeProgress={true} // Add progress filter for enrolled courses
              />
            </div>
          </div>

          {/* Course Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "In Progress", value: "12", icon: <BookOpen size={20} /> },
              { label: "Completed", value: "8", icon: <BookOpen size={20} /> },
              { label: "Hours Spent", value: "156", icon: <BookOpen size={20} /> },
              { label: "Certificates", value: "5", icon: <BookOpen size={20} /> }
            ].map((stat, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-blue-900/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  </div>
                  <div className="text-blue-400">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course}
                onContinue={() => handleContinueCourse(course.id)}
                enrolled={true}
                progress={course.progress}
                nextLesson={course.nextLesson}
                lastAccessed={course.lastAccessed}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;