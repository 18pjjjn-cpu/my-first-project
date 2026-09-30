import React, { useState } from 'react';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      front: 'What is the main function of mitochondria?',
      back: 'ATP production through cellular respiration',
      notesId: 1
    },
    {
      id: 2,
      front: 'What are the four chambers of the heart?',
      back: 'Right atrium, right ventricle, left atrium, left ventricle',
      notesId: 1
    }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (flashcards.length === 0) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">🎴 Flashcards</h1>
        <div className="card text-center py-12">
          <p className="text-gray-600">No flashcards yet. Upload notes to generate flashcards!</p>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🎴 Flashcards</h1>
        <p className="text-gray-600 mt-2">Study mode: {currentIndex + 1} / {flashcards.length}</p>
      </div>

      {/* Large Flashcard */}
      <div className="card">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-12 cursor-pointer transform transition hover:scale-105 min-h-96 flex flex-col justify-center items-center text-center shadow-lg"
        >
          <p className="text-sm text-blue-100 mb-4">{isFlipped ? 'Answer' : 'Question'}</p>
          <p className="text-3xl font-semibold mb-4">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          <p className="text-sm text-blue-100">Click to flip</p>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex gap-4 mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="btn-secondary disabled:opacity-50"
          >
            ← Previous
          </button>
          <button
            onClick={handleShuffle}
            className="btn-secondary"
          >
            🔀 Shuffle
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="btn-primary disabled:opacity-50"
          >
            Next →
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Study Mode Button */}
      <div className="card text-center">
        <button className="btn-primary w-full py-3 text-lg">
          ✅ Start Quiz Mode
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
