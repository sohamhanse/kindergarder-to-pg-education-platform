import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Student/course/Courses';
import CreateCourse from './pages/Student/course/CreateCourse';
import TeacherChat from './pages/Student/teacher_chat/TeacherChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/teacherChat" element={<TeacherChat />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
