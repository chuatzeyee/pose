import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Layout from './Layout';

export default function Quiz({ quiz, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);

  const handleAnswer = (type, text) => {
    if (locked) return;
    setLocked(true);
    const newAnswers = { ...answers, [currentQuestion]: { type, text } };
    setAnswers(newAnswers);
    setTimeout(() => {
      setLocked(false);
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(
          quiz.map((question, i) => ({
            type: newAnswers[i].type,
            text: newAnswers[i].text,
            options: question.options
          }))
        );
      }
    }, 300);
  };

  const progress = (Object.keys(answers).length / quiz.length) * 100;
  const current = answers[currentQuestion];

  return (
    <Layout>
      <div className="text-center mb-8 mt-8">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          POSE Test
        </h1>
      </div>

      <div className="bg-white shadow-2xl p-8 mb-6" style={{ borderRadius: '3rem' }}>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">Progress</span>
            <span className="text-sm font-semibold text-purple-600">
              {Object.keys(answers).length} / {quiz.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Question {currentQuestion + 1}
          </h2>
          <p className="text-xl text-gray-600 text-center mb-8">Which option best describes you?</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quiz[currentQuestion].options.map((option) => {
              const isSelected = current?.text === option.text;
              return (
                <button
                  key={option.text}
                  onClick={() => handleAnswer(option.type, option.text)}
                  disabled={locked}
                  className={`p-6 rounded-full border border-gray-300 font-semibold text-lg transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white text-gray-700 hover:border-purple-400'
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
            <button
              onClick={() => handleAnswer('N/A', 'N/A')}
              disabled={locked}
              className={`p-6 rounded-full border border-gray-300 font-semibold text-lg transition-all duration-300 sm:col-span-2 ${
                current?.type === 'N/A'
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                  : 'bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              N/A
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0 || locked}
            className={`flex-1 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400 hover:shadow-lg'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
        </div>
      </div>
    </Layout>
  );
}
