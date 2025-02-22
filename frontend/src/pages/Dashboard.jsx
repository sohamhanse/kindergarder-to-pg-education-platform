import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ClipboardList, Calendar, User, Bell, Search, Settings } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Students", value: "256", icon: "👥" },
    { label: "Active Courses", value: "12", icon: "📚" },
    { label: "Assignments", value: "5", icon: "✍️" },
    { label: "Average Grade", value: "B+", icon: "📊" },
  ];

  const recentActivities = [
    { id: 1, type: "Assignment", title: "Math Quiz 3", date: "2024-01-15", status: "Completed" },
    { id: 2, type: "Class", title: "Physics Lab", date: "2024-01-14", status: "Attended" },
    { id: 3, type: "Assignment", title: "History Essay", date: "2024-01-13", status: "Pending" },
  ];

  const upcomingClasses = [
    { id: 1, subject: "Mathematics", time: "09:00 AM", teacher: "Dr. Smith" },
    { id: 2, subject: "Physics", time: "11:00 AM", teacher: "Prof. Johnson" },
    { id: 3, subject: "History", time: "02:00 PM", teacher: "Ms. Williams" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen w-full bg-gradient-to-br from-black to-blue-950 transition-all duration-300">
      {/* Mobile Menu Button with Smooth Animation */}
      <button 
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        <svg 
          className="w-6 h-6 transition-transform duration-300" 
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

      {/* Responsive Sidebar with Backdrop Blur */}
      <aside 
        className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          sm:translate-x-0 fixed sm:relative w-64 h-full 
          bg-black/40 backdrop-blur-lg border-r border-blue-900/30 
          transition-all duration-300 ease-in-out z-40
          overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600
        `}
      >
        <div className="sticky top-0 p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-8 select-none">EduDash</h2>
          <nav className="space-y-2">
            {[
              { icon: <Home size={20} />, label: "Overview", id: "overview" },
              { icon: <ClipboardList size={20} />, label: "Activities", id: "activities" },
              { icon: <Calendar size={20} />, label: "Courses", id: "courses" },
              { icon: <User size={20} />, label: "Profile", id: "profile" },
            ].map((item) => (
              <button
                key={item.id}
                className={`
                  flex items-center w-full px-4 py-3 rounded-lg 
                  transition-all duration-200 transform hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${selectedTab === item.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-blue-400 hover:bg-blue-900/40"
                  }
                `}
                onClick={() => {
                  setSelectedTab(item.id);
                  if (item.id === "courses") {
                    navigate('/courses');
                  } else if (item.id === "activities") {
                    navigate('/activities');
                  } else {
                    navigate(`/${item.id}`);
                  }
                }}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden w-full bg-opacity-50">
        {/* Responsive Top Bar */}
        <div className="sticky top-0 bg-black/40 backdrop-blur-lg border-b border-blue-900/30 p-4 z-30">
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4 sm:gap-0">
            <div className="flex items-center bg-blue-900/20 rounded-lg px-4 py-2 w-full sm:w-auto focus-within:ring-2 focus-within:ring-blue-500">
              <Search size={20} className="text-blue-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-blue-300 ml-2 w-full sm:w-64 placeholder-blue-500"
                aria-label="Search"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-lg hover:bg-blue-900/40 text-blue-400 transition-colors duration-200 relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                className="p-2 rounded-lg hover:bg-blue-900/40 text-blue-400 transition-colors duration-200"
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <span className="text-sm font-medium text-white select-none">JD</span>
                </div>
                <span className="text-blue-300 hidden sm:inline font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content with Responsive Grid */}
        <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
          {/* Animated Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-blue-900/30 
                  hover:border-blue-600/50 transition-all duration-300 transform hover:scale-[1.02]
                  hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl sm:text-2xl animate-pulse">{stat.icon}</span>
                  <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <h3 className="text-sm text-blue-400 uppercase tracking-wider font-medium">{stat.label}</h3>
              </div>
            ))}
          </div>

          {/* Responsive Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Recent Activities Card */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold text-blue-400 mb-4 sm:mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg 
                      hover:bg-blue-900/20 transition-all duration-200 transform hover:scale-[1.01]"
                  >
                    <div>
                      <p className="font-medium text-white">{activity.title}</p>
                      <p className="text-sm text-blue-400">{activity.type}</p>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <p className="text-sm text-blue-300">{activity.date}</p>
                      <p className={`text-sm font-semibold ${
                        activity.status === "Completed" ? "text-green-400" :
                        activity.status === "Pending" ? "text-yellow-400" : "text-blue-400"
                      }`}>
                        {activity.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Classes Card */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold text-blue-400 mb-4 sm:mb-6">Upcoming Courses</h2>
              <div className="space-y-4">
                {upcomingClasses.map((class_) => (
                  <div
                    key={class_.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg 
                      hover:bg-blue-900/20 transition-all duration-200 transform hover:scale-[1.01]"
                  >
                    <div>
                      <p className="font-medium text-white">{class_.subject}</p>
                      <p className="text-sm text-blue-400">Teacher: {class_.teacher}</p>
                    </div>
                    <p className="text-sm font-medium text-blue-300 mt-2 sm:mt-0">{class_.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;