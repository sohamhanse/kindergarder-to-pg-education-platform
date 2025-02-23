import React, { useState } from 'react';
import { ArrowRight, Award, BookOpen, Trophy, Users } from 'lucide-react';

const EducationPath = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const classes = [
    { level: 'LKG', color: 'bg-blue-500', achievements: ['Basic Reading', 'Number Recognition', 'Social Skills'] },
    { level: 'UKG', color: 'bg-blue-600', achievements: ['Writing Skills', 'Basic Math', 'Environmental Awareness'] },
    { level: 'Class 1', color: 'bg-blue-700', achievements: ['Reading Comprehension', 'Addition/Subtraction', 'Science Concepts'] },
    { level: 'Class 2', color: 'bg-blue-800', achievements: ['Grammar', 'Multiplication', 'History Basics'] },
    { level: 'Class 3', color: 'bg-blue-900', achievements: ['Creative Writing', 'Division', 'Geography'] },
    { level: 'Class 4', color: 'bg-indigo-600', achievements: ['Literature', 'Fractions', 'Environmental Science'] },
    { level: 'Class 5', color: 'bg-indigo-700', achievements: ['Essay Writing', 'Decimals', 'Basic Physics'] },
    { level: 'Class 6', color: 'bg-indigo-800', achievements: ['Advanced Grammar', 'Algebra Basics', 'Chemistry Intro'] },
    { level: 'Class 7', color: 'bg-indigo-900', achievements: ['Poetry Analysis', 'Geometry', 'Biology Fundamentals'] },
    { level: 'Class 8', color: 'bg-purple-600', achievements: ['Advanced Literature', 'Advanced Algebra', 'Physics Laws'] },
    { level: 'Class 9', color: 'bg-purple-700', achievements: ['World Literature', 'Trigonometry', 'Chemical Reactions'] },
    { level: 'Class 10', color: 'bg-purple-800', achievements: ['Critical Analysis', 'Statistics', 'Advanced Biology'] },
    { level: 'Class 11', color: 'bg-purple-900', achievements: ['Research Writing', 'Calculus', 'Lab Experiments'] },
    { level: 'Class 12', color: 'bg-pink-600', achievements: ['Thesis Writing', 'Advanced Math', 'Scientific Research'] },
  ];

  const currentClass = 8; // Assuming currently in Class 8
  const progressPercentage = (currentClass / classes.length) * 100;

  const handleClassClick = (index) => {
    setSelectedClass(index);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Educational Journey
          </h2>
          <div className="flex items-center space-x-2">
            <BookOpen className="text-blue-400" size={24} />
            <span className="text-blue-400 font-medium">Learning Path</span>
          </div>
        </div>

        {/* Class Levels */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {classes.map((classItem, index) => (
            <div key={classItem.level} className="flex items-center">
              <div
                onClick={() => handleClassClick(index)}
                className={`
                  ${classItem.color} rounded-lg p-4
                  transform hover:scale-110 transition-all duration-200
                  shadow-lg hover:shadow-2xl
                  min-w-[120px] text-center cursor-pointer
                  relative overflow-hidden group
                  ${index === selectedClass ? 'ring-2 ring-white' : ''}
                  ${index < currentClass ? 'opacity-100' : 'opacity-70'}
                `}
              >
                <p className="text-white font-medium z-10 relative">{classItem.level}</p>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>

              {index < classes.length - 1 && (
                <ArrowRight
                  size={24}
                  className="text-blue-400 mx-2 animate-pulse hover:animate-none hover:scale-110 transition-transform"
                />
              )}
            </div>
          ))}
        </div>

        {/* Selected Class Details */}
        {selectedClass !== null && (
          <div className={`bg-gray-800 rounded-lg p-6 transition-all duration-300 ${isAnimating ? 'scale-95' : 'scale-100'}`}>
            <h3 className="text-xl font-bold mb-4">{classes[selectedClass].level} Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {classes[selectedClass].achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg">
                  <Trophy className="text-yellow-400" size={20} />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="h-3 flex-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-blue-400 font-medium">{progressPercentage.toFixed(0)}% Complete</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="text-blue-400" size={20} />
                <p className="text-sm text-blue-400">Current Level</p>
              </div>
              <p className="text-xl font-bold">Class {currentClass}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="text-yellow-400" size={20} />
                <p className="text-sm text-blue-400">Completed</p>
              </div>
              <p className="text-xl font-bold">{currentClass} Classes</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="text-purple-400" size={20} />
                <p className="text-sm text-blue-400">Remaining</p>
              </div>
              <p className="text-xl font-bold">{classes.length - currentClass} Classes</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="text-green-400" size={20} />
                <p className="text-sm text-blue-400">Success Rate</p>
              </div>
              <p className="text-xl font-bold">92%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPath;