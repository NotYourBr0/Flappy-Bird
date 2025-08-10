import { useState, useCallback } from 'react';

export const useGameState = () => {
  const [gameState, setGameState] = useState('WAITING'); // WAITING, PLAYING, GAME_OVER, PAUSED
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('flappy-bird-high-score') || '0');
  });

  const updateHighScore = useCallback((newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('flappy-bird-high-score', newScore.toString());
    }
  }, [highScore]);

  const resetGame = useCallback(() => {
    setScore(0);
    setGameState('WAITING');
  }, []);

  const startGame = useCallback(() => {
    setGameState('PLAYING');
  }, []);

  const endGame = useCallback(() => {
    setGameState('GAME_OVER');
    updateHighScore(score);
  }, [score, updateHighScore]);

  const pauseGame = useCallback(() => {
    setGameState('PAUSED');
  }, []);

  const resumeGame = useCallback(() => {
    setGameState('PLAYING');
  }, []);

  const incrementScore = useCallback(() => {
    setScore(prev => prev + 1);
  }, []);

  return {
    gameState,
    score,
    highScore,
    resetGame,
    startGame,
    endGame,
    pauseGame,
    resumeGame,
    incrementScore
  };
};
