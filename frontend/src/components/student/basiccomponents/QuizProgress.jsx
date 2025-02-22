const QuizProgress = ({ totalQuestions, currentQuestion, answeredQuestions }) => {
    const progress = (answeredQuestions / totalQuestions) * 100;
  
    return (
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-4 mb-6">
        <div className="flex justify-between text-sm text-blue-400 mb-2">
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span>{answeredQuestions} Answered</span>
        </div>
        <div className="w-full h-2 bg-blue-900/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };
  
  export default QuizProgress;