import { useState, useEffect } from "react";
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
  Video,
  MessageSquare,
  GraduationCap,
  Keyboard,
  Volume2,
  ChevronDown
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ role = "student", userName = "" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Define menus with additional metadata for better organization
  const menus = {
    student: [
      { name: "Dashboard", icon: Home, link: "/dashboard", category: "main" },
      { 
        name: "Courses", 
        icon: Book,
        category: "learning",
        subMenu: [
          { name: "All Courses", link: "/courses/all" },
          { name: "Enrolled", link: "/courses/enrolled" },
          { name: "Create Course", link: "/courses/create" },
        ]
      },
      {
        name: "Practice",
        icon: Keyboard,
        category: "learning",
        subMenu: [
          { name: "Accuracy Test", link: "/practice/accuracy" },
          { name: "Word Practice", link: "/practice/word" },
          { name: "Voice Practice", link: "/practice/voice" },
        ]
      },
      {
        name: "Meetings",
        icon: Video,
        category: "communication",
        subMenu: [
          { name: "Schedule", link: "/meeting" },
          { name: "Join Meeting", link: "/meeting/join" },
        ]
      },
      { name: "Teacher Chat", icon: MessageSquare, link: "/teacher-chat", category: "communication" },
      { name: "Education Path", icon: GraduationCap, link: "/education-path", category: "learning" },
    ],
    teacher: [
      { name: "Dashboard", icon: Home, link: "/dashboard", category: "main" },
      { 
        name: "Courses", 
        icon: Book,
        category: "teaching",
        subMenu: [
          { name: "All Courses", link: "/courses/all" },
          { name: "Create Course", link: "/courses/create" },
        ]
      },
      {
        name: "Meetings",
        icon: Video,
        category: "communication",
        subMenu: [
          { name: "Scheduled Meetings", link: "/meeting" },
          { name: "Join Meeting", link: "/meeting/join" },
        ]
      },
      { name: "Student Chat", icon: MessageSquare, link: "/teacher-chat", category: "communication" },
    ],
    admin: [
      { name: "Dashboard", icon: Home, link: "/dashboard", category: "main" },
      { name: "Users", icon: Users, link: "/users", category: "management" },
      { name: "Settings", icon: Settings, link: "/settings", category: "management" },
    ],
  };

  // Check if current path matches any submenu items
  useEffect(() => {
    menus[role]?.forEach((menu, index) => {
      if (menu.subMenu?.some(item => location.pathname === item.link)) {
        setActiveSubmenu(index);
      }
    });
  }, [location.pathname, role]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } duration-300 h-screen bg-black backdrop-blur-lg border-r border-blue-900 pt-8 relative flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 border-2 border-blue-900/30 
          bg-black/40 backdrop-blur-lg rounded-full flex items-center justify-center
          hover:bg-blue-900/20 transition-colors duration-200 ${!isOpen && "rotate-180"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronLeft className="text-blue-400 w-5 h-5" />
      </button>

      {/* User Profile Section */}
      <div className="px-5 mb-8">
        <div className="flex items-center gap-x-4 p-2 rounded-lg hover:bg-blue-900/20 transition-colors duration-200">
          <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
            <UserCheck
              className={`text-blue-400 transition-all duration-500 ${isOpen && "rotate-[360deg]"}`}
              size={24}
            />
          </div>
          <div className={`transition-all duration-200 ${!isOpen && "opacity-0 w-0"}`}>
            <h1 className="text-white font-medium text-lg truncate">{userName}</h1>
            <p className="text-blue-400 text-sm capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-2">
          {menus[role]?.map((menu, i) => (
            <div key={i}>
              {menu.subMenu ? (
                <div className="group">
                  <button
                    onClick={() => toggleSubmenu(i)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg
                      hover:bg-blue-900/20 transition-colors duration-200
                      ${activeSubmenu === i ? "bg-blue-900/20" : ""}`}
                  >
                    <div className="flex items-center gap-x-4">
                      <menu.icon className="text-blue-400" size={20} />
                      <span className={`text-white transition-all duration-200 ${!isOpen && "opacity-0 w-0"}`}>
                        {menu.name}
                      </span>
                    </div>
                    {isOpen && (
                      <ChevronDown
                        className={`text-blue-400 transition-transform duration-200
                        ${activeSubmenu === i ? "rotate-180" : ""}`}
                        size={16}
                      />
                    )}
                  </button>
                  <div
                    className={`mt-2 space-y-1 transition-all duration-200 overflow-hidden
                      ${activeSubmenu === i ? "max-h-48" : "max-h-0"}
                      ${!isOpen && "hidden"}`}
                  >
                    {menu.subMenu.map((subItem, j) => (
                      <Link
                        key={j}
                        to={subItem.link}
                        className={`flex items-center pl-12 pr-4 py-2 rounded-lg
                          hover:bg-blue-900/20 transition-colors duration-200
                          ${location.pathname === subItem.link ? "bg-blue-900/20" : ""}`}
                      >
                        <span className="text-blue-400 text-sm">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={menu.link}
                  className={`flex items-center gap-x-4 p-3 rounded-lg
                    hover:bg-blue-900/20 transition-colors duration-200
                    ${location.pathname === menu.link ? "bg-blue-900/20" : ""}`}
                >
                  <menu.icon className="text-blue-400" size={20} />
                  <span className={`text-white transition-all duration-200 ${!isOpen && "opacity-0 w-0"}`}>
                    {menu.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-blue-900/30 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-x-4 p-3 rounded-lg
            hover:bg-blue-900/20 transition-colors duration-200 group"
        >
          <LogOut className="text-blue-400 group-hover:rotate-12 transition-transform duration-200" size={20} />
          <span className={`text-white transition-all duration-200 ${!isOpen && "opacity-0 w-0"}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;