import React from 'react';

const GameOverlay = ({ gameState, score, highScore, onStart, onRestart }) => {
  if (gameState === 'WAITING') {
    return (
      <div className="game-overlay">
        <div className="overlay-content">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Fly?</h2>
          <p className="text-gray-600 mb-6">
            Tap the screen or press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">SPACEBAR</kbd> to make the bird jump.<br />
            Avoid the pipes and try to get the highest score!
          </p>
          <button 
            className="btn btn--primary btn--lg"
            onClick={onStart}
          >
            Start Game
          </button>
          <div className="mt-4 text-sm text-gray-500">
            <div className="flex justify-center items-center space-x-4">
              <span>📱 Mobile: Tap screen</span>
              <span>🖥️ Desktop: Press Space</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'GAME_OVER') {
    return (
      <div className="game-overlay">
        <div className="overlay-content">
          <h2 className="text-3xl font-bold mb-4 text-red-600">Game Over!</h2>
          <div className="mb-6">
            <div className="text-2xl font-bold text-gray-800">Score: {score}</div>
            <div className="text-lg text-gray-600">Best: {highScore}</div>
            {score === highScore && score > 0 && (
              <div className="text-yellow-600 font-semibold mt-2">🎉 New High Score!</div>
            )}
          </div>
          <button 
            className="btn btn--primary btn--lg"
            onClick={onRestart}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GameOverlay;
