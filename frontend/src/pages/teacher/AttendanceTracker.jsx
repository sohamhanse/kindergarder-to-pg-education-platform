import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AttendanceRegister = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('daily'); // daily, monthly, student

  const [attendanceData] = useState({
    // Mock data - replace with API call
    '2024-02-20': {
      present: ['1', '2', '3'],
      absent: ['4', '5']
    },
    '2024-02-21': {
      present: ['1', '2', '4'],
      absent: ['3', '5']
    }
  });

  const [students] = useState([
    { id: '1', name: 'John Doe', rollNo: '001' },
    { id: '2', name: 'Jane Smith', rollNo: '002' },
    { id: '3', name: 'Alice Johnson', rollNo: '003' },
    { id: '4', name: 'Bob Wilson', rollNo: '004' },
    { id: '5', name: 'Emma Davis', rollNo: '005' }
  ]);

  const getAttendanceForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return attendanceData[dateStr] || { present: [], absent: [] };
  };

  const getStudentAttendanceStats = (studentId) => {
    let present = 0;
    let absent = 0;
    Object.values(attendanceData).forEach(day => {
      if (day.present.includes(studentId)) present++;
      if (day.absent.includes(studentId)) absent++;
    });
    return { present, absent, total: present + absent };
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-4">
        <div className="flex gap-4">
          <button
            onClick={() => setView('daily')}
            className={`px-4 py-2 rounded-lg ${
              view === 'daily' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-900/20'
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setView('monthly')}
            className={`px-4 py-2 rounded-lg ${
              view === 'monthly' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-900/20'
            }`}
          >
            Monthly View
          </button>
          <button
            onClick={() => setView('student')}
            className={`px-4 py-2 rounded-lg ${
              view === 'student' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-900/20'
            }`}
          >
            Student View
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="!bg-transparent !border-0 w-full"
            tileClassName={({ date }) => {
              const attendance = getAttendanceForDate(date);
              return `!bg-black/40 !text-white hover:!bg-blue-900/20 ${
                attendance.present.length > 0 ? 'border-l-4 !border-green-500' : ''
              }`;
            }}
          />
        </div>

        {/* Attendance Details */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          {view === 'daily' && (
            <>
              <h3 className="text-xl font-bold text-white mb-4">
                Attendance for {selectedDate.toLocaleDateString()}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-900/20 rounded-lg">
                    <h4 className="text-green-400 font-medium mb-2">Present</h4>
                    {students
                      .filter(s => getAttendanceForDate(selectedDate).present.includes(s.id))
                      .map(student => (
                        <div key={student.id} className="text-white">
                          {student.name} ({student.rollNo})
                        </div>
                      ))}
                  </div>
                  <div className="p-4 bg-red-900/20 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-2">Absent</h4>
                    {students
                      .filter(s => getAttendanceForDate(selectedDate).absent.includes(s.id))
                      .map(student => (
                        <div key={student.id} className="text-white">
                          {student.name} ({student.rollNo})
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {view === 'student' && (
            <>
              <h3 className="text-xl font-bold text-white mb-4">Student Attendance Report</h3>
              <div className="space-y-4">
                {students.map(student => {
                  const stats = getStudentAttendanceStats(student.id);
                  const attendancePercentage = ((stats.present / stats.total) * 100).toFixed(1);
                  
                  return (
                    <div key={student.id} className="p-4 bg-blue-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">{student.name}</h4>
                        <span className="text-blue-400">Roll No: {student.rollNo}</span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-400">Present: {stats.present}</span>
                        <span className="text-red-400">Absent: {stats.absent}</span>
                        <span className="text-blue-400">Attendance: {attendancePercentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceRegister;