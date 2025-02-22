import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Student/course/Courses';
import CreateCourse from './pages/Student/course/CreateCourse';
import TeacherChat from './pages/Student/teacher_chat/TeacherChat';
import EnrolledCourses from './pages/Student/course/EnrolledCourses';
import CourseDetail from './pages/Student/coursedetail/CourseDetail';
import VideoPanel from './pages/Student/coursedetail/VideoPanel';
import Sidebar from './components/common/Sidebar';
import { useState } from 'react';

function App() {
  const [userName] = useState("John Doe"); // Replace with actual user data
  const [userRole] = useState("student"); // Replace with actual user role

  return (
    <Router>
      <div className="flex">
        {/* Only show sidebar if not on login page */}
        <Routes>
          <Route path="/login" element={null} />
          <Route
            path="*"
            element={<Sidebar role={userRole} userName={userName} />}
          />
        </Routes>

        {/* Main content */}
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/teacherChat" element={<TeacherChat />} />
            <Route path="/courses/enrolled" element={<EnrolledCourses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />}>
              <Route index element={<Navigate to="videos" replace />} />
              <Route path="videos" element={<VideoPanel />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
