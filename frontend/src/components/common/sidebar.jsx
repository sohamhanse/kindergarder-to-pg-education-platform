import { useState } from "react";
import {
  Home,
  Users,
  Settings,
  Book,
  ClipboardList,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ role = "student", userName = "" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menus = {
    student: [
      { name: "Home", icon: Home, link: "/dashboard" },
      { name: "Courses", icon: Book, link: "/courses" },
      { name: "Enrolled", icon: ClipboardList, link: "/courses/enrolled" },
      { name: "Chat", icon: Users, link: "/teacherChat" },
    ],
    teacher: [
      { name: "Home", icon: Home, link: "/dashboard" },
      { name: "Courses", icon: Book, link: "/courses" },
      { name: "Chat", icon: ClipboardList, link: "/teacherChat" },
    ],
    admin: [
      { name: "Dashboard", icon: Home, link: "/dashboard" },
      { name: "Users", icon: Users, link: "/users" },
      { name: "Settings", icon: Settings, link: "/settings" },
    ],
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <aside
      className={`w-${isOpen ? "64" : "20"} h-screen bg-black backdrop-blur-lg border-r border-blue-900/30 p-5 transition-all duration-300 flex flex-col shadow-lg`}
    >
      {/* Profile */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
          {userName.charAt(0).toUpperCase()}
        </div>
        {isOpen && (
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate text-white">{userName || role}</p>
            <p className="text-xs text-blue-400 capitalize">{role}</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 flex items-center justify-center rounded-md bg-blue-900/20 hover:bg-blue-900/30 transition-colors"
      >
        {isOpen ? <ChevronLeft className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
      </button>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menus[role]?.map((menu, index) => (
          <Link
            key={index}
            to={menu.link}
            className="flex items-center gap-3 p-3 rounded-md text-blue-300 hover:bg-blue-900/40 transition-colors"
          >
            <menu.icon className="w-6 h-6" />
            {isOpen && <span className="text-white">{menu.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 rounded-md text-red-400 hover:bg-red-900/30 transition-colors"
      >
        <LogOut className="w-6 h-6" />
        {isOpen && <span className="text-white">Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;