import { useState } from "react";
import { Filter, X } from "lucide-react";

const CourseFilters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    duration: "all",
    level: "all"
  });

  const categories = ["All", "Programming", "Design", "Business", "Mathematics"];
  const durations = ["All", "Short", "Medium", "Long"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
      >
        <Filter size={20} />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-black/40 backdrop-blur-lg border border-blue-900/30 rounded-xl p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Filters</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-blue-400 hover:text-blue-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Filter sections */}
          {/* ... filter options implementation ... */}
        </div>
      )}
    </div>
  );
};

export default CourseFilters;