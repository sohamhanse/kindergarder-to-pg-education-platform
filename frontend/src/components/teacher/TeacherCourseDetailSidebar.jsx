import { useState } from "react";
import { 
  PlayCircle, 
  FileQuestion, 
  Upload, 
  LineChart, 
  ClipboardList, 
  UserCheck, 
  Video, 
  Users,
  Settings 
} from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const TeacherCourseDetailSidebar = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'videos', label: 'Course Videos', icon: <PlayCircle size={20} />, path: `/teacher-courses/${courseId}/videos` },
    { id: 'upload', label: 'Upload Video', icon: <Upload size={20} />, path: `/teacher-courses/${courseId}/upload-video` },
    { id: 'quiz', label: 'Manage Quiz', icon: <FileQuestion size={20} />, path: `/teacher-courses/${courseId}/quiz` },
    { id: 'assignments', label: 'Assignments', icon: <ClipboardList size={20} />, path: `/teacher-courses/${courseId}/assignments` },
    { id: 'attendance', label: 'Attendance', icon: <UserCheck size={20} />, path: `/teacher-courses/${courseId}/attendance` },
    { id: 'progress', label: 'Student Progress', icon: <LineChart size={20} />, path: `/teacher-courses/${courseId}/progress` },
    { id: 'livemeet', label: 'Live Session', icon: <Video size={20} />, path: `/teacher-courses/${courseId}/live` },
    { id: 'students', label: 'Students', icon: <Users size={20} />, path: `/teacher-courses/${courseId}/students` },
    { id: 'settings', label: 'Course Settings', icon: <Settings size={20} />, path: `/teacher-courses/${courseId}/settings` },
  ];

  return (
    <aside className="w-64 h-screen bg-black/40 backdrop-blur-lg border-r border-blue-900/30 p-6">
      <div className="space-y-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
              ${location.pathname === item.path 
                ? 'bg-blue-900/20 text-blue-400' 
                : 'text-blue-400/60 hover:text-blue-400 hover:bg-blue-900/10'}`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default TeacherCourseDetailSidebar; 