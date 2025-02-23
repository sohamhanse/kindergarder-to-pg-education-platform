import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// Student Course Related
import Courses from './pages/Student/course/Courses';
import CreateCourse from './pages/Student/course/CreateCourse';
import EnrolledCourses from './pages/Student/course/EnrolledCourses';
import CourseDetail from './pages/Student/coursedetail/CourseDetail';
// Student Practice
import WordAccuracy from './pages/Student/practice/WordAccuracy';
import VoiceAccuracy from './pages/Student/practice/VoiceAccuracy';
import AccuracyTest from './pages/Student/practice/AccuracyTest';
// Student Quiz
import QuizPanel from './pages/Student/coursedetail/QuizPanel';
import QuizResult from './pages/Student/coursedetail/QuizResult';
// Student Meeting
import OnlineMeeting from './pages/Student/meeting/OnlineMeeting';
import ScheduleMeet from './pages/Student/meeting/SheduleMeet';
import JoinMeeting from './pages/Student/meeting/JoinMeeting';
// Student Components
import TeacherChat from './pages/Student/teacher_chat/TeacherChat';
import VideoPanel from './pages/Student/coursedetail/VideoPanel';
import EducationPath from './components/student/basiccomponents/EducationPath';
import Sidebar from './components/common/Sidebar';
import { useState } from 'react';
import TeacherUploadVideo from './pages/teacher/UploadVideo';
import AssignmentUploadPanel from './pages/Student/coursedetail/AssignmentUploadPanel';
import AvatarChatbot from './components/common/AvatarChatbot';


// Teacher Routes
import TeacherDashboard from './pages/teacher/Dashboard';
import UploadVideo from './pages/teacher/UploadVideo';
import ScheduleMeetingForm from './pages/teacher/ScheduleMeetingForm';
import AttendanceTracker from './pages/teacher/AttendanceTracker';

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
        <AvatarChatbot />

        {/* Main content */}
        <div className="flex-1 bg-black ">
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Course Routes */}
            <Route path="/courses">
              <Route index element={<Navigate to="all" />} />
              <Route path="all" element={<Courses />} />
              <Route path="create" element={<CreateCourse />} />
              <Route path="enrolled" element={<EnrolledCourses />} />
              <Route path=":courseId" element={<CourseDetail />} />
              <Route path=":courseId/video" element={<VideoPanel />} />
              <Route path=":courseId/upload-video" element={<UploadVideo />} />
            </Route>

            {/* Quiz Routes */}
            <Route path="/quiz">
              <Route index element={<QuizPanel />} />
              <Route path="result" element={<QuizResult />} />
            </Route>

            {/* Meeting Routes */}
            <Route path="/meeting">
              <Route index element={<ScheduleMeet />} />
              <Route path="go" element={<OnlineMeeting />} />
              <Route path="join" element={<JoinMeeting />} />
            </Route>

            {/* Practice Routes */}
            <Route path="/practice">
              <Route index element={<Navigate to="accuracy" />} />
              <Route path="accuracy" element={<AccuracyTest />} />
              <Route path="word" element={<WordAccuracy />} />
              <Route path="voice" element={<VoiceAccuracy />} />
              <Route path="assignment" element={<AssignmentUploadPanel />} />
            </Route>

            {/* Other Routes */}
            <Route path="/teacher-chat" element={<TeacherChat />} />
            <Route path="/education-path" element={<EducationPath />} />

            {/* Default Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

            <Route path="/Teacher">
              <Route index element={<Navigate to="Dashboard" />} />
              <Route path="all" element={<TeacherDashboard />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="UploadVideo" element={<TeacherUploadVideo />} />
              <Route path="ScheduleMeeting" element={<ScheduleMeetingForm />} />
              <Route path="AttendanceTracker" element={<AttendanceTracker />} />
            </Route>

            {/* <Route path="/teacher-courses"> */}
                {/* <Route index element={<Navigate to="all" />} /> */}
                {/* <Route path="/all" element={<TeacherCourses />} /> */}
                {/* <Route path="/create" element={<CreateCourse />} /> */}
                {/* <Route path="/:courseId"> */}
                  {/* <Route index element={<TeacherCourseDetail />} /> */}
                  {/* <Route path="/upload-video" element={<UploadVideo />} /> */}
                  {/* <Route path="/quiz" element={<TeacherQuizPanel />} />
                  <Route path="/assignments" element={<TeacherAssignments />} />
                  <Route path="/attendance" element={<TeacherAttendance />} /> */}
                  {/* <Route path="/progress" element={<TeacherProgress />} /> */}
                {/* </Route>
              </Route> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
