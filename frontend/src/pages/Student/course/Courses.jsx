import { useState, useMemo } from "react";
import CourseCard from "../../../components/student/courses/CourseCard";
import CourseFilters from "../../../components/student/courses/CourseFilters";
import { Search } from "lucide-react";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    duration: "all",
    level: "all"
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://kindergarden-to-pg-education-platform.onrender.com/api/courses', {
          params: {
            category: filters.category !== 'all' ? filters.category : undefined,
            duration: filters.duration !== 'all' ? filters.duration : undefined,
            level: filters.level !== 'all' ? filters.level : undefined,
            search: searchQuery || undefined
          }
        });
        setCoursesData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters, searchQuery]);


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