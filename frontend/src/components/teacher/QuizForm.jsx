import React, { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';

const QuizForm = ({ videoId, onQuizSubmit }) => {
  const [questions, setQuestions] = useState([{
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    timeLimit: 30, // default 30 seconds per question
  }]);

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      timeLimit: 30,
    }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'option') {
      newQuestions[index].options[value.index] = value.text;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuizSubmit({ videoId, questions });
    setQuestions([{
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      timeLimit: 30,
    }]);
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Create Quiz</h3>
      <form onSubmit={handleSubmit}>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-8 p-6 border border-blue-900/30 rounded-xl bg-black/40 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-blue-400">Question {qIndex + 1}</h4>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-blue-400 mb-2">Question Text</label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                className="w-full px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-blue-400 mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  Time Limit (seconds)
                </div>
              </label>
              <input
                type="number"
                min="10"
                max="300"
                value={q.timeLimit}
                onChange={(e) => handleQuestionChange(qIndex, 'timeLimit', parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-3">
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctAnswer === oIndex}
                    onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                    className="w-4 h-4 text-blue-600 bg-black/40 border-blue-900/30 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleQuestionChange(qIndex, 'option', {
                      index: oIndex,
                      text: e.target.value
                    })}
                    className="flex-1 px-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-black/40 text-blue-400 border border-blue-900/30 rounded-lg hover:bg-blue-900/20 transition-colors"
          >
            <Plus size={20} />
            Add Question
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;