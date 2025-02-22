import { useState } from "react";
import CourseSidebar from "../../../components/student/basiccomponents/CourseSidebar";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      {/* Mobile Menu Button */}
      <button 
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-lg text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">
          {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Courses
        </h1>
        {/* Add your course cards/content here */}
      </div>
    </div>
  );
};

export default Courses;