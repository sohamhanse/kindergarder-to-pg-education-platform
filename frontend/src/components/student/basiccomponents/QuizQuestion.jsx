const QuizQuestion = ({ question, selectedAnswer, onAnswerSelect }) => {
    return (
      <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
        <h2 className="text-xl text-white mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(question.id, index)}
              className={`
                w-full text-left p-4 rounded-lg transition-all duration-200
                ${selectedAnswer === index 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-900/20 text-blue-400 hover:bg-blue-900/40"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default QuizQuestion;