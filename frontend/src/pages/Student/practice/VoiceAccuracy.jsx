import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, RefreshCcw, CheckCircle, XCircle, BarChart, Volume2 } from 'lucide-react';

const VoiceAccuracy = () => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState([]);
  const [results, setResults] = useState(null);
  const recognitionRef = useRef(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog",
    "How are you doing today",
    "Please speak clearly and slowly",
    "Voice recognition is an amazing technology"
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setSpokenText(transcript.toLowerCase());
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        calculateAccuracy();
      };
    }

    startNewTest();
  }, []);

  const startNewTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setTargetText(randomText.toLowerCase());
    setSpokenText('');
    setAccuracy(100);
    setMistakes([]);
    setResults(null);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setSpokenText('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const calculateAccuracy = () => {
    const targetWords = targetText.split(' ');
    const spokenWords = spokenText.split(' ');
    const newMistakes = [];
    let correctWords = 0;

    targetWords.forEach((word, index) => {
      if (spokenWords[index]?.toLowerCase() === word.toLowerCase()) {
        correctWords++;
      } else {
        newMistakes.push({
          index,
          expected: word,
          received: spokenWords[index] || '[missing]'
        });
      }
    });

    const accuracyScore = (correctWords / targetWords.length) * 100;
    setAccuracy(accuracyScore);
    setMistakes(newMistakes);
    setResults({
      totalWords: targetWords.length,
      correctWords,
      accuracy: accuracyScore
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Voice Accuracy Test</h1>
            <button
              onClick={startNewTest}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCcw size={18} className="mr-2" />
              New Test
            </button>
          </div>

          <div className="mb-8 p-4 bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-medium text-blue-400 mb-2">Please read:</h3>
            <p className="text-xl text-white">{targetText}</p>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={toggleListening}
              className={`p-6 rounded-full ${
                isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
              } hover:opacity-90 transition-all`}
            >
              {isListening ? 
                <Mic size={32} className="text-white" /> : 
                <MicOff size={32} className="text-white" />
              }
            </button>
          </div>

          {spokenText && (
            <div className="mb-8 p-4 bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-medium text-blue-400 mb-2">Your speech:</h3>
              <p className="text-xl text-white">{spokenText}</p>
            </div>
          )}

          {results && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-900/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-400 mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(results.accuracy)}%
                  </p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-400 mb-1">Correct Words</p>
                  <p className="text-2xl font-bold text-white">{results.correctWords}</p>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-400 mb-1">Total Words</p>
                  <p className="text-2xl font-bold text-white">{results.totalWords}</p>
                </div>
              </div>

              {mistakes.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white mb-3">Mistakes</h3>
                  {mistakes.map((mistake, index) => (
                    <div key={index} className="flex items-center text-sm bg-blue-900/20 p-3 rounded-lg">
                      <XCircle size={16} className="text-red-500 mr-2" />
                      <span className="text-white">
                        Expected "{mistake.expected}" but got "{mistake.received}"
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAccuracy; 