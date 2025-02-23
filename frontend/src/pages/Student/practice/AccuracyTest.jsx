import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, RefreshCcw, CheckCircle, XCircle, BarChart, Clock, Keyboard, Volume2 } from 'lucide-react';

const AccuracyTest = () => {
  const [mode, setMode] = useState('typing');
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [results, setResults] = useState(null);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  const sampleTexts = {
    words: [
      "The quick brown fox jumps over the lazy dog.",
      "Programming is the art of telling another human what one wants the computer to do.",
    ],
    sentences: [
      "Please speak clearly and slowly for better recognition.",
      "Voice and typing accuracy tests help improve communication skills.",
    ]
  };

  useEffect(() => {
    if (mode === 'voice' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setUserInput(transcript.toLowerCase());
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        calculateAccuracy();
      };
    }

    startNewTest();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [mode]);

  const startNewTest = () => {
    const texts = mode === 'typing' ? sampleTexts.words : sampleTexts.sentences;
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setText(randomText.toLowerCase());
    setUserInput('');
    setIsStarted(false);
    setTimeElapsed(0);
    setAccuracy(100);
    setWpm(0);
    setMistakes([]);
    setResults(null);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const calculateAccuracy = () => {
    const targetUnits = mode === 'typing' ? text.split('') : text.split(' ');
    const inputUnits = mode === 'typing' ? userInput.split('') : userInput.split(' ');
    const newMistakes = [];
    let correct = 0;

    targetUnits.forEach((unit, index) => {
      if (inputUnits[index]?.toLowerCase() === unit.toLowerCase()) {
        correct++;
      } else {
        newMistakes.push({
          index,
          expected: unit,
          received: inputUnits[index] || '[missing]'
        });
      }
    });

    const accuracyScore = (correct / targetUnits.length) * 100;
    setAccuracy(Math.round(accuracyScore));
    setMistakes(newMistakes);
    
    if (mode === 'voice' || userInput.length >= text.length) {
      setResults({
        totalUnits: targetUnits.length,
        correctUnits: correct,
        accuracy: accuracyScore,
        timeElapsed,
        wpm: mode === 'typing' ? wpm : null
      });
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setUserInput(input);

    if (!isStarted && input.length === 1) {
      setIsStarted(true);
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    calculateAccuracy();

    if (mode === 'typing' && input.length > 0) {
      const words = input.trim().split(' ').length;
      const minutes = timeElapsed / 60;
      setWpm(Math.round(words / (minutes || 1)));
    }

    if (input.length >= text.length) {
      clearInterval(timerRef.current);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setUserInput('');
      setIsStarted(true);
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Accuracy Test</h1>
            <div className="flex items-center space-x-4">
              <div className="flex rounded-lg overflow-hidden">
                <button
                  onClick={() => setMode('typing')}
                  className={`px-4 py-2 flex items-center ${
                    mode === 'typing' ? 'bg-blue-600 text-white' : 'bg-blue-900/20 text-blue-400'
                  }`}
                >
                  <Keyboard size={18} className="mr-2" />
                  Typing
                </button>
                <button
                  onClick={() => setMode('voice')}
                  className={`px-4 py-2 flex items-center ${
                    mode === 'voice' ? 'bg-blue-600 text-white' : 'bg-blue-900/20 text-blue-400'
                  }`}
                >
                  <Volume2 size={18} className="mr-2" />
                  Voice
                </button>
              </div>
              <button
                onClick={startNewTest}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCcw size={18} className="mr-2" />
                New Test
              </button>
            </div>
          </div>

          {/* Text Display */}
          <div className="mb-6">
            <p className="text-lg text-gray-400 mb-2">Text to {mode === 'typing' ? 'type' : 'speak'}:</p>
            <p className="text-xl text-white bg-blue-900/20 p-4 rounded-lg">{text}</p>
          </div>

          {/* Input Section */}
          {mode === 'typing' ? (
            <div className="mb-6">
              <textarea
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                className="w-full h-32 bg-blue-900/10 text-white border border-blue-900/30 rounded-lg p-4 focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            <div className="mb-6 flex justify-center">
              <button
                onClick={toggleListening}
                className={`p-6 rounded-full ${
                  isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isListening ? (
                  <MicOff size={32} className="text-white animate-pulse" />
                ) : (
                  <Mic size={32} className="text-white" />
                )}
              </button>
            </div>
          )}

          {/* Stats Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center text-blue-400 mb-2">
                <Clock size={18} className="mr-2" />
                Time
              </div>
              <p className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</p>
            </div>
            <div className="bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center text-blue-400 mb-2">
                <CheckCircle size={18} className="mr-2" />
                Accuracy
              </div>
              <p className="text-2xl font-bold text-white">{accuracy.toFixed(1)}%</p>
            </div>
            {mode === 'typing' && (
              <div className="bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center text-blue-400 mb-2">
                  <BarChart size={18} className="mr-2" />
                  WPM
                </div>
                <p className="text-2xl font-bold text-white">{wpm}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {results && (
            <div className="bg-blue-900/20 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/40 p-4 rounded-lg">
                  <p className="text-blue-400 text-sm">Total {mode === 'typing' ? 'Characters' : 'Words'}</p>
                  <p className="text-xl font-bold text-white">{results.totalUnits}</p>
                </div>
                <div className="bg-blue-900/40 p-4 rounded-lg">
                  <p className="text-blue-400 text-sm">Correct</p>
                  <p className="text-xl font-bold text-white">{results.correctUnits}</p>
                </div>
                <div className="bg-blue-900/40 p-4 rounded-lg">
                  <p className="text-blue-400 text-sm">Time</p>
                  <p className="text-xl font-bold text-white">{formatTime(results.timeElapsed)}</p>
                </div>
                <div className="bg-blue-900/40 p-4 rounded-lg">
                  <p className="text-blue-400 text-sm">Final Score</p>
                  <p className="text-xl font-bold text-white">{results.accuracy.toFixed(1)}%</p>
                </div>
              </div>

              {mistakes.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white mb-2">Mistakes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mistakes.map((mistake, index) => (
                      <div key={index} className="flex items-center bg-red-900/20 p-2 rounded-lg">
                        <XCircle size={16} className="text-red-400 mr-2" />
                        <span className="text-red-400">
                          Expected "{mistake.expected}" but received "{mistake.received}"
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccuracyTest;