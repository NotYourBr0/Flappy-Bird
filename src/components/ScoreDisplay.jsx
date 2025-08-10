import React from 'react';

const ScoreDisplay = ({ score, gameState }) => {
  if (gameState !== 'PLAYING') return null;

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="score-display">
        {score}
      </div>
    </div>
  );
};

export default ScoreDisplay;
