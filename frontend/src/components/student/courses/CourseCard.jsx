import { BookOpen, Users, Clock } from "lucide-react";

const CourseCard = ({ course, onEnroll, onContinue, enrolled = false, progress = 0, nextLesson = "", lastAccessed = "" }) => {
  return (
    <div 
      className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
      onClick={() => enrolled ? onContinue(course.id) : onEnroll(course.id)}
    >
      <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{course.title}</h3>
          <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
            {course.category}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-blue-400">
            <Users size={16} className="mr-2" />
            <span>{course.enrolledCount} students</span>
          </div>
          <div className="flex items-center text-blue-400">
            <Clock size={16} className="mr-2" />
            <span>{course.duration}</span>
          </div>
        </div>

        <button
          onClick={() => onEnroll(course.id)}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;