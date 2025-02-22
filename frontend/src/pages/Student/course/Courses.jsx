import { useState, useMemo } from "react";
import CourseSidebar from "../../../components/student/basiccomponents/CourseSidebar";
import CourseCard from "../../../components/student/courses/CourseCard";
import CourseFilters from "../../../components/student/courses/CourseFilters";
import { Search, Menu } from "lucide-react";

const Courses = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    duration: "all",
    level: "all"
  });

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      category: "Programming",
      image: "https://www.shutterstock.com/image-vector/programming-software-development-web-page-260nw-1682028748.jpg",
      enrolledCount: 156,
      duration: "8 weeks",
      level: "Beginner"
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      category: "Design",
      image: "https://www.shutterstock.com/image-vector/programming-software-development-web-page-260nw-1682028748.jpg",
      enrolledCount: 234,
      duration: "6 weeks",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Business Analytics",
      category: "Business",
      image: "https://www.shutterstock.com/image-vector/programming-software-development-web-page-260nw-1682028748.jpg  ",
      enrolledCount: 189,
      duration: "10 weeks",
      level: "Advanced"
    },
    {
      id: 4,
      title: "Advanced Calculus",
      category: "Mathematics",
      image: "https://www.shutterstock.com/image-vector/mathematics-education-subject-matter-icon-260nw-1892490175.jpg",
      enrolledCount: 124,
      duration: "12 weeks",
      level: "Advanced"
    },
    {
      id: 5,
      title: "Mobile App Development",
      category: "Programming",
      image: "https://www.shutterstock.com/image-vector/mobile-app-development-concept-vector-260nw-1894191736.jpg",
      enrolledCount: 278,
      duration: "10 weeks",
      level: "Intermediate"
    },
    {
      id: 6,
      title: "Digital Marketing Essentials",
      category: "Business",
      image: "https://www.shutterstock.com/image-vector/digital-marketing-concept-vector-illustration-260nw-1892384751.jpg",
      enrolledCount: 312,
      duration: "6 weeks",
      level: "Beginner"
    },
    {
      id: 7,
      title: "Graphic Design Fundamentals",
      category: "Design",
      image: "https://www.shutterstock.com/image-vector/graphic-design-concept-vector-illustration-260nw-1893772747.jpg",
      enrolledCount: 198,
      duration: "8 weeks",
      level: "Beginner"
    },
    {
      id: 8,
      title: "Data Structures & Algorithms",
      category: "Programming",
      image: "https://www.shutterstock.com/image-vector/algorithms-data-structures-concept-vector-260nw-1892384755.jpg",
      enrolledCount: 167,
      duration: "12 weeks",
      level: "Advanced"
    },
    {
      id: 9,
      title: "Linear Algebra",
      category: "Mathematics",
      image: "https://www.shutterstock.com/image-vector/mathematics-education-subject-matter-icon-260nw-1892490178.jpg",
      enrolledCount: 145,
      duration: "8 weeks",
      level: "Intermediate"
    },
    {
      id: 10,
      title: "Project Management",
      category: "Business",
      image: "https://www.shutterstock.com/image-vector/project-management-concept-vector-illustration-260nw-1893772750.jpg",
      enrolledCount: 289,
      duration: "10 weeks",
      level: "Intermediate"
    },
    {
      id: 11,
      title: "Python Programming",
      category: "Programming",
      image: "https://www.shutterstock.com/image-vector/programming-code-icon-260nw-1892384758.jpg",
      enrolledCount: 423,
      duration: "8 weeks",
      level: "Beginner"
    }
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filters.category === "all" || course.category === filters.category;
      const matchesDuration = filters.duration === "all" || course.duration === filters.duration;
      const matchesLevel = filters.level === "all" || course.level === filters.level;
      
      return matchesSearch && matchesCategory && matchesDuration && matchesLevel;
    });
  }, [courses, searchQuery, filters]);

  const handleEnroll = (courseId) => {
    // Implement enrollment logic
    console.log(`Enrolling in course ${courseId}`);
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

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        sm:translate-x-0 fixed sm:relative z-40
        transition-transform duration-300 ease-in-out
      `}>
        <CourseSidebar 
          onCategorySelect={setActiveCategory} 
          activeCategory={activeCategory} 
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <h1 className="text-3xl font-bold text-blue-400">
              {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Courses
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-blue-900/20 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <CourseFilters onFilterChange={setFilters} />
            </div>
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;