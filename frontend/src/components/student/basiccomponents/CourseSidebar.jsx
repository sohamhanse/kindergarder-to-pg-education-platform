import { useState } from "react";
import { Search, BookOpen, Plus, Users, Calendar, Clock, Star } from "lucide-react";

const CourseSidebar = ({ onCategorySelect, activeCategory }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: 'all', label: 'All Courses', icon: <BookOpen size={20} /> },
    { id: 'enrolled', label: 'Enrolled', icon: <Users size={20} /> },
    { id: 'upcoming', label: 'Upcoming', icon: <Calendar size={20} /> },
    { id: 'recent', label: 'Recent', icon: <Clock size={20} /> },
    { id: 'favorites', label: 'Favorites', icon: <Star size={20} /> },
  ];

  return (
    <aside className="w-64 h-full bg-black/40 backdrop-blur-lg border-r border-blue-900/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-blue-400">Courses</h2>
          <button
            className="p-2 text-blue-400 hover:bg-blue-900/40 rounded-lg transition-colors"
            title="Create Course"
          >
            <Plus size={20} />
          </button>
        </div>

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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`
                flex items-center w-full px-4 py-3 rounded-lg 
                transition-all duration-200 transform hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-blue-400 hover:bg-blue-900/40"
                }
              `}
            >
              {category.icon}
              <span className="ml-3 font-medium">{category.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default CourseSidebar;