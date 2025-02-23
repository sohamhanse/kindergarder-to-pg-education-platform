import StudentAttendanceSystem from '../../components/teacher/StudentAttendanceSystem';
import { Toaster } from 'react-hot-toast';

function AttendancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-7xl mx-auto">
        <Toaster position="top-right" />
        <StudentAttendanceSystem />
      </div>
    </div>
  );
}

export default AttendancePage;