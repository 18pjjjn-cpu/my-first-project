import React, { useState } from 'react';

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const sampleQuestions = [
    {
      id: 1,
      question: 'What is the primary function of the mitochondria?',
      options: [
        'Protein synthesis',
        'ATP production',
        'DNA replication',
        'Photosynthesis'
      ],
      correct: 1
    },
    {
      id: 2,
      question: 'Which chamber of the heart pumps oxygenated blood to the body?',
      options: [
        'Right atrium',
        'Right ventricle',
        'Left atrium',
        'Left ventricle'
      ],
      correct: 3
    }
  ];

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (!quizStarted) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">✅ Quiz Mode</h1>
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-6">Test your knowledge on the topics you've studied</p>
          <button
            onClick={() => setQuizStarted(true)}
            className="btn-primary text-lg px-8 py-3"
          >
            🚀 Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / sampleQuestions.length) * 100;
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">📊 Quiz Results</h1>
        <div className="card text-center py-12">
          <div className="text-6xl font-bold text-blue-600 mb-4">{percentage.toFixed(0)}%</div>
          <p className="text-2xl text-gray-900 mb-6">
            You got {score} out of {sampleQuestions.length} correct!
          </p>
          <div className="mb-8">
            {percentage >= 80 && <p className="text-lg text-green-600">🎉 Excellent work!</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-lg text-yellow-600">👍 Good job! Keep practicing.</p>}
            {percentage < 60 && <p className="text-lg text-red-600">📚 Review these topics more carefully.</p>}
          </div>
          <button
            onClick={resetQuiz}
            className="btn-primary text-lg px-8 py-3"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">✅ Quiz Mode</h1>
        <p className="text-gray-600 mt-2">Question {currentQuestion + 1} / {sampleQuestions.length}</p>
      </div>

      <div className="card">
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-8">{question.question}</h2>

        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-left hover:border-blue-600 hover:bg-blue-50 transition font-medium"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
