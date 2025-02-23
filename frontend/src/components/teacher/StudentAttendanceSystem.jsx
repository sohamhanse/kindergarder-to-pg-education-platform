import React, { useState, useEffect } from 'react';
import { Calendar, Download, Filter, Check, X, BarChart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const StudentAttendanceSystem = () => {
  // Dummy students data
  const [students] = useState([
    { id: 1, name: 'John Doe', rollNo: '001', course: 'Web Development' },
    { id: 2, name: 'Jane Smith', rollNo: '002', course: 'Web Development' },
    { id: 3, name: 'Alice Johnson', rollNo: '003', course: 'Web Development' },
    { id: 4, name: 'Bob Wilson', rollNo: '004', course: 'Web Development' },
    { id: 5, name: 'Emma Davis', rollNo: '005', course: 'Web Development' },
  ]);

  // Generate dummy attendance data for the past month
  const generateDummyAttendance = () => {
    const dummyData = {};
    const currentDate = new Date();
    
    // Generate data for the past 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      dummyData[dateKey] = {};
      students.forEach(student => {
        // Randomly mark students as present or absent
        dummyData[dateKey][student.id] = Math.random() > 0.2 ? 'present' : 'absent';
      });
    }
    return dummyData;
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState(generateDummyAttendance());
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [view, setView] = useState('daily');

  const getMonthlyAttendance = (month, year) => {
    const records = Object.entries(attendanceRecords).filter(([date]) => {
      const recordDate = new Date(date);
      return recordDate.getMonth() === month && recordDate.getFullYear() === year;
    });

    return records.reduce((acc, [date, attendance]) => {
      acc[date] = attendance;
      return acc;
    }, {});
  };

  const getStudentMonthlyStats = (studentId, month, year) => {
    const monthlyRecords = getMonthlyAttendance(month, year);
    const total = Object.keys(monthlyRecords).length;
    const present = Object.values(monthlyRecords)
      .filter(day => day[studentId] === 'present').length;
    
    return {
      total,
      present,
      absent: total - present,
      percentage: total ? ((present / total) * 100).toFixed(1) : 0
    };
  };

  const markAttendance = (studentId, status) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setAttendanceRecords(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [studentId]: status
      }
    }));
  };

  const saveAttendance = () => {
    toast.success('Attendance saved successfully!');
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Attendance Management</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setView('daily')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'daily' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-900/20'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setView('monthly')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'monthly' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:bg-blue-900/20'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Daily Attendance View */}
      {view === 'daily' && (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-blue-400">
              <Calendar size={20} />
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="bg-transparent border border-blue-900/30 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <button
              onClick={saveAttendance}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Attendance
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-900/30">
                  <th className="text-left py-3 px-4 text-blue-400">Roll No</th>
                  <th className="text-left py-3 px-4 text-blue-400">Name</th>
                  <th className="text-left py-3 px-4 text-blue-400">Course</th>
                  <th className="text-left py-3 px-4 text-blue-400">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} className="border-b border-blue-900/30">
                    <td className="py-3 px-4 text-white">{student.rollNo}</td>
                    <td className="py-3 px-4 text-white">{student.name}</td>
                    <td className="py-3 px-4 text-blue-400">{student.course}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => markAttendance(student.id, 'present')}
                          className={`p-2 rounded-lg transition-colors ${
                            attendanceRecords[selectedDate.toISOString().split('T')[0]]?.[student.id] === 'present'
                              ? 'bg-green-600 text-white'
                              : 'text-green-400 hover:bg-green-900/20'
                          }`}
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => markAttendance(student.id, 'absent')}
                          className={`p-2 rounded-lg transition-colors ${
                            attendanceRecords[selectedDate.toISOString().split('T')[0]]?.[student.id] === 'absent'
                              ? 'bg-red-600 text-white'
                              : 'text-red-400 hover:bg-red-900/20'
                          }`}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly View */}
      {view === 'monthly' && (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(Number(e.target.value))}
                className="bg-black/40 border border-blue-900/30 rounded-lg px-3 py-2 text-white"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(Number(e.target.value))}
                className="bg-black/40 border border-blue-900/30 rounded-lg px-3 py-2 text-white"
              >
                {[2023, 2024].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8," + 
                  students.map(student => {
                    const stats = getStudentMonthlyStats(student.id, filterMonth, filterYear);
                    return `${student.name},${stats.present},${stats.absent},${stats.percentage}%`;
                  }).join("\n");
                const link = document.createElement("a");
                link.href = encodeURI(csvContent);
                link.download = `attendance_${months[filterMonth]}_${filterYear}.csv`;
                link.click();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-900/30">
                  <th className="text-left py-3 px-4 text-blue-400">Student</th>
                  <th className="text-left py-3 px-4 text-blue-400">Present Days</th>
                  <th className="text-left py-3 px-4 text-blue-400">Absent Days</th>
                  <th className="text-left py-3 px-4 text-blue-400">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => {
                  const stats = getStudentMonthlyStats(student.id, filterMonth, filterYear);
                  return (
                    <tr key={student.id} className="border-b border-blue-900/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                            <span className="text-blue-400">{student.name[0]}</span>
                          </div>
                          <span className="text-white">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-green-400">{stats.present} days</td>
                      <td className="py-3 px-4 text-red-400">{stats.absent} days</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-blue-900/30 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${stats.percentage}%` }}
                            />
                          </div>
                          <span className="text-blue-400">{stats.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendanceSystem;