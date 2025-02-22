import { useState } from "react";
import { 
  PlayCircle, 
  FileQuestion, 
  GraduationCap, 
  Backpack, 
  Calendar, 
  Upload, 
  LineChart, 
  ClipboardList, 
  UserCheck, 
  Video, 
  MessageCircle, 
  Users 
} from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const CourseDetailSidebar = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'videos', label: 'Videos', icon: <PlayCircle size={20} />, path: `/courses/${courseId}/videos` },
    { id: 'quizzes', label: 'Quizzes', icon: <FileQuestion size={20} />, path: `/courses/${courseId}/quizzes` },
    { id: 'exams', label: 'Exams', icon: <GraduationCap size={20} />, path: `/courses/${courseId}/exams` },
    { id: 'whiteboard', label: 'Whiteboard', icon: <Backpack size={20} />, path: `/courses/${courseId}/whiteboard` },
    { id: 'activities', label: 'Daily Activities', icon: <Calendar size={20} />, path: `/courses/${courseId}/activities` },
    { id: 'upload', label: 'Assignment Upload', icon: <Upload size={20} />, path: `/courses/${courseId}/upload` },
    { id: 'progress', label: 'Total Progress', icon: <LineChart size={20} />, path: `/courses/${courseId}/progress` },
    { id: 'assignments', label: 'Assignments', icon: <ClipboardList size={20} />, path: `/courses/${courseId}/assignments` },
    { id: 'attendance', label: 'Attendance', icon: <UserCheck size={20} />, path: `/courses/${courseId}/attendance` },
    { id: 'livemeet', label: 'Live Meet', icon: <Video size={20} />, path: `/courses/${courseId}/livemeet` },
    { id: 'teacherchat', label: 'Teacher Chat', icon: <MessageCircle size={20} />, path: `/courses/${courseId}/teacherchat` },
    { id: 'discussion', label: 'Discussion Panel', icon: <Users size={20} />, path: `/courses/${courseId}/discussion` }
  ];

  return (
    <aside className="w-64 h-full bg-black/40 backdrop-blur-lg border-r border-blue-900/30">
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-400 mb-6">Course Content</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`
                  flex items-center w-full px-4 py-3 rounded-lg 
                  transition-all duration-200 transform hover:scale-[1.02]
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-blue-400 hover:bg-blue-900/40"
                  }
                `}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default CourseDetailSidebar;