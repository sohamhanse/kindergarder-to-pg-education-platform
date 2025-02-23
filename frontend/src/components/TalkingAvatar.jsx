import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TalkingAvatar = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [isContinuousTalking, setIsContinuousTalking] = useState(true);
  const [blink, setBlink] = useState(false);
  const [mouthShape, setMouthShape] = useState("scale-y-50");
  const [transcript, setTranscript] = useState("");

  // Handle blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Handle talking animation
  useEffect(() => {
    if (isTalking || isContinuousTalking) {
      const talkInterval = setInterval(() => {
        const shapes = ["scale-y-150", "scale-y-100", "scale-y-75", "scale-y-125"];
        setMouthShape(shapes[Math.floor(Math.random() * shapes.length)]);
      }, 150);
      return () => clearInterval(talkInterval);
    } else {
      setMouthShape("scale-y-50");
    }
  }, [isTalking, isContinuousTalking]);

  // Handle speech recognition
  const handleStartListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Listening...");
    };

    recognition.onresult = (event) => {
      const transcriptText = event.results[0][0].transcript;
      setTranscript(transcriptText);
      console.log("Recognized:", transcriptText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  // Handle text-to-speech
  const handleSpeak = () => {
    if (transcript) {
      const speech = new SpeechSynthesisUtterance(transcript);
      speech.lang = "en-US";
      speech.rate = 1; // Adjust speed (1 is normal)
      speech.pitch = 1; // Adjust pitch
      window.speechSynthesis.speak(speech);
      setTranscript("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <motion.div
        className="relative w-64 h-64 bg-yellow-300 rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-400"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* Eyes */}
        <div className="absolute left-1/4 top-1/3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <motion.div
            className="w-4 h-4 bg-black rounded-full"
            animate={{ scaleY: blink ? 0.1 : 1 }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="absolute right-1/4 top-1/3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <motion.div
            className="w-4 h-4 bg-black rounded-full"
            animate={{ scaleY: blink ? 0.1 : 1 }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Mouth */}
        <motion.div
          className={`absolute left-1/3 bottom-1/4 w-1/3 h-8 bg-red-500 rounded-full shadow-md ${mouthShape}`}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Controls */}
      <div className="mt-8 flex flex-col space-y-4">
        <motion.button
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:scale-95 shadow-lg transition-transform"
          onClick={handleStartListening}
        >
          Start Listening
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 active:scale-95 shadow-lg transition-transform"
          onClick={handleSpeak}
        >
          Speak
        </motion.button>

        <motion.button
          className={`px-6 py-3 rounded-full shadow-lg transition-all active:scale-95 text-white ${
            isContinuousTalking
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => setIsContinuousTalking((prev) => !prev)}
        >
          {isContinuousTalking ? "Stop Talking" : "Start Continuous Talking"}
        </motion.button>
      </div>

      {/* Display Transcript */}
      {transcript && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg text-center text-lg">
          <p className="text-gray-800 font-semibold">You said: {transcript}</p>
        </div>
      )}
    </div>
  );
};

export default TalkingAvatar;
