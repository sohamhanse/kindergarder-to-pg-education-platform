import { useState } from "react";
import { Home, ClipboardList, Calendar, User, Bell, Search, Settings } from "lucide-react";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const stats = [
    { label: "Total Students", value: "256", icon: "👥" },
    { label: "Active Classes", value: "12", icon: "📚" },
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

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-blue-950">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-lg border-r border-blue-900/30">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-8">EduDash</h2>
          <nav className="space-y-2">
            {[
              { icon: <Home size={20} />, label: "Overview", id: "overview" },
              { icon: <ClipboardList size={20} />, label: "Activities", id: "activities" },
              { icon: <Calendar size={20} />, label: "Classes", id: "classes" },
              { icon: <User size={20} />, label: "Profile", id: "profile" },
            ].map((item) => (
              <button
                key={item.id}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedTab === item.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-blue-400 hover:bg-blue-900/40"
                }`}
                onClick={() => setSelectedTab(item.id)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-black/40 backdrop-blur-lg border-b border-blue-900/30 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center bg-blue-900/20 rounded-lg px-4 py-2">
              <Search size={20} className="text-blue-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-blue-300 ml-2 w-64"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-blue-900/40 text-blue-400">
                <Bell size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-blue-900/40 text-blue-400">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">JD</span>
                </div>
                <span className="text-blue-300">John Doe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-blue-900/30 hover:border-blue-600/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <h3 className="text-sm text-blue-400 uppercase tracking-wider">{stat.label}</h3>
              </div>
            ))}
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
              <h2 className="text-xl font-bold text-blue-400 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-blue-900/20 transition-colors duration-200"
                  >
                    <div>
                      <p className="font-medium text-white">{activity.title}</p>
                      <p className="text-sm text-blue-400">{activity.type}</p>
                    </div>
                    <div className="text-right">
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

            {/* Upcoming Classes */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
              <h2 className="text-xl font-bold text-blue-400 mb-6">Upcoming Classes</h2>
              <div className="space-y-4">
                {upcomingClasses.map((class_) => (
                  <div
                    key={class_.id}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-blue-900/20 transition-colors duration-200"
                  >
                    <div>
                      <p className="font-medium text-white">{class_.subject}</p>
                      <p className="text-sm text-blue-400">Teacher: {class_.teacher}</p>
                    </div>
                    <p className="text-sm font-medium text-blue-300">{class_.time}</p>
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