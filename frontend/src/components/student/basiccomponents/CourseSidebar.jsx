import { useState } from "react";
import { Search, BookOpen, Users, Calendar, Clock, Star, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const CourseSidebar = ({ onCategorySelect, activeCategory }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { id: 'all', label: 'All Courses', icon: <BookOpen size={20} />, path: '/courses' },
    { id: 'enrolled', label: 'Enrolled', icon: <Users size={20} />, path: '/courses/enrolled' },
    { id: 'upcoming', label: 'Upcoming', icon: <Calendar size={20} />, path: '/courses/upcoming' },
    { id: 'recent', label: 'Recent', icon: <Clock size={20} />, path: '/courses/recent' },
    { id: 'favorites', label: 'Favorites', icon: <Star size={20} />, path: '/courses/favorites' },
    { id: 'teacherChat', label: 'Teacher Chat', icon: <MessageCircle size={20} />, path: '/teacherChat' },
  ];

  const handleCategoryClick = (category) => {
    onCategorySelect(category.id);
    navigate(category.path);
  };

  return (
    <aside className="w-64 h-full bg-black/40 backdrop-blur-lg border-r border-blue-900/30">
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-400 mb-6">Courses</h2>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-blue-900/20 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <nav className="space-y-2">
          {categories.map((category) => {
            const isActive = location.pathname === category.path;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`
                  flex items-center w-full px-4 py-3 rounded-lg 
                  transition-all duration-200 transform hover:scale-[1.02]
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-blue-400 hover:bg-blue-900/40"
                  }
                `}
              >
                {category.icon}
                <span className="ml-3 font-medium">{category.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default CourseSidebar;