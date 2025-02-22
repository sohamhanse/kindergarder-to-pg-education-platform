import { useState, useEffect } from "react";
import QuizTimer from "../../../components/student/basiccomponents/QuizTimer";
import QuizQuestion from "../../../components/student/basiccomponents/QuizQuestion";
import QuizProgress from "../../../components/student/basiccomponents/QuizProgress";
import QuizResult from "./QuizResult";

const QuizPanel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  // Mock quiz data with recommended videos
  const quizData = {
    title: "JavaScript Fundamentals Quiz",
    totalTime: 1800, // 30 minutes in seconds
    questions: [
      {
        id: 1,
        question: "What is the output of typeof null?",
        options: ["object", "null", "undefined", "number"],
        correctAnswer: 0,
        relatedVideoId: 1
      },
      // Add more questions...
    ]
  };

  // Mock recommended videos based on performance
  const recommendedVideos = [
    {
      id: 1,
      title: "Understanding JavaScript Types in Depth",
      duration: "15:30",
      topic: "types"
    },
    {
      id: 2,
      title: "JavaScript Null vs Undefined",
      duration: "12:45",
      topic: "types"
    }
  ];

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const results = {
      correctAnswers: 0,
      totalQuestions: quizData.questions.length,
      questions: quizData.questions.map((q, index) => ({
        question: q.question,
        userAnswer: q.options[selectedAnswers[q.id]],
        correctAnswer: q.options[q.correctAnswer],
        isCorrect: selectedAnswers[q.id] === q.correctAnswer
      }))
    };

    results.correctAnswers = results.questions.filter(q => q.isCorrect).length;
    setQuizResults(results);
    setIsQuizComplete(true);
  };

  if (isQuizComplete) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <QuizResult 
              results={quizResults}
              recommendedVideos={recommendedVideos}
              onVideoSelect={(videoId) => {
                // Handle video selection
                console.log("Selected video:", videoId);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-950">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Header */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">{quizData.title}</h1>
              <QuizTimer 
                timeRemaining={timeRemaining} 
                setTimeRemaining={setTimeRemaining}
                onTimeUp={handleSubmitQuiz}
              />
            </div>
          </div>

          {/* Quiz Progress */}
          <QuizProgress 
            totalQuestions={quizData.questions.length}
            currentQuestion={currentQuestionIndex + 1}
            answeredQuestions={Object.keys(selectedAnswers).length}
          />

          {/* Current Question */}
          <QuizQuestion
            question={quizData.questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswers[quizData.questions[currentQuestionIndex].id]}
            onAnswerSelect={handleAnswerSelect}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestionIndex === quizData.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPanel;
