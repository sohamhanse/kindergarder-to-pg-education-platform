import { useEffect } from "react";
import { Clock } from "lucide-react";

const QuizTimer = ({ timeRemaining, setTimeRemaining, onTimeUp }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 bg-blue-900/20 px-4 py-2 rounded-lg">
      <Clock size={20} className="text-blue-400" />
      <span className="text-xl font-mono text-blue-400">
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
};

export default QuizTimer;