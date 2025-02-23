import { useState, useEffect, useRef } from 'react';
import { RefreshCcw, Clock, CheckCircle, XCircle, BarChart } from 'lucide-react';

const WordAccuracy = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const timerRef = useRef(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
  ];

  const startNewTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput('');
    setIsStarted(false);
    setTimeElapsed(0);
    setAccuracy(100);
    setWpm(0);
    setMistakes([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const calculateAccuracy = (input, target) => {
    let correct = 0;
    const newMistakes = [];
    
    input.split('').forEach((char, index) => {
      if (char === target[index]) {
        correct++;
      } else {
        newMistakes.push({
          index,
          expected: target[index],
          received: char
        });
      }
    });

    setMistakes(newMistakes);
    return (correct / target.length) * 100;
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (!isStarted && input.length === 1) {
      setIsStarted(true);
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    const currentAccuracy = calculateAccuracy(input, text);
    setAccuracy(currentAccuracy);

    if (input.length > 0) {
      const words = input.trim().split(' ').length;
      const minutes = timeElapsed / 60;
      setWpm(Math.round(words / (minutes || 1)));
    }

    if (input.length === text.length) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startNewTest();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Word Accuracy Test</h1>
            <button
              onClick={startNewTest}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCcw size={18} className="mr-2" />
              New Test
            </button>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Clock size={20} className="text-blue-400 mr-2" />
                <span className="text-white">{timeElapsed}s</span>
              </div>
              <div className="flex items-center">
                <BarChart size={20} className="text-blue-400 mr-2" />
                <span className="text-white">{wpm} WPM</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={20} className="text-blue-400 mr-2" />
                <span className="text-white">{Math.round(accuracy)}% Accuracy</span>
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-900/20 rounded-lg">
            <p className="text-lg text-white font-medium leading-relaxed">
              {text.split('').map((char, index) => {
                const mistake = mistakes.find(m => m.index === index);
                return (
                  <span
                    key={index}
                    className={`${
                      userInput[index] === char
                        ? 'text-green-400'
                        : mistake
                        ? 'text-red-400'
                        : 'text-white'
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </p>
          </div>

          <textarea
            value={userInput}
            onChange={handleInputChange}
            className="w-full bg-blue-900/20 text-white placeholder-blue-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start typing here..."
            rows="3"
          />

          {mistakes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-3">Mistakes</h3>
              <div className="space-y-2">
                {mistakes.map((mistake, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <XCircle size={16} className="text-red-500 mr-2" />
                    <span className="text-white">
                      Expected "{mistake.expected || 'space'}" but got "
                      {mistake.received || 'space'}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordAccuracy; 