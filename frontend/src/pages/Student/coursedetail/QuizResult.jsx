import { CheckCircle, XCircle, PlayCircle } from "lucide-react";

const QuizResult = ({ results, recommendedVideos, onVideoSelect }) => {
  const score = (results.correctAnswers / results.totalQuestions) * 100;

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h2>
        <div className="text-6xl font-bold text-blue-400 mb-4">
          {Math.round(score)}%
        </div>
        <p className="text-blue-400">
          {results.correctAnswers} correct out of {results.totalQuestions} questions
        </p>
      </div>

      {/* Question Review */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Question Review</h3>
        <div className="space-y-4">
          {results.questions.map((question, index) => (
            <div 
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg bg-blue-900/20"
            >
              {question.isCorrect ? (
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
              ) : (
                <XCircle className="text-red-500 flex-shrink-0" size={24} />
              )}
              <div>
                <p className="text-white mb-2">{question.question}</p>
                <p className="text-sm text-blue-400">
                  Your answer: {question.userAnswer}
                </p>
                {!question.isCorrect && (
                  <p className="text-sm text-green-400 mt-1">
                    Correct answer: {question.correctAnswer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Recommendations */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Recommended Videos</h3>
        <div className="space-y-3">
          {recommendedVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => onVideoSelect(video.id)}
              className="w-full flex items-center p-4 rounded-lg bg-blue-900/20 hover:bg-blue-900/40 transition-colors"
            >
              <PlayCircle size={24} className="text-blue-400 mr-3" />
              <div className="text-left">
                <p className="text-white font-medium">{video.title}</p>
                <p className="text-sm text-blue-400 mt-1">{video.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;