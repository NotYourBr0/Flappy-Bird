import { useEffect, useCallback } from 'react';

export const useInput = (onJump, gameState) => {
  const handleJump = useCallback((e) => {
    if (gameState === 'PLAYING' || gameState === 'WAITING') {
      e?.preventDefault();
      onJump();
    }
  }, [onJump, gameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleJump(e);
      }
    };

    const handleTouchStart = (e) => {
      handleJump(e);
    };

    // Desktop controls
    window.addEventListener('keydown', handleKeyDown);
    
    // Mobile controls
    const gameArea = document.getElementById('game-container');
    if (gameArea) {
      gameArea.addEventListener('touchstart', handleTouchStart, { passive: false });
      gameArea.addEventListener('click', handleJump);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameArea) {
        gameArea.removeEventListener('touchstart', handleTouchStart);
        gameArea.removeEventListener('click', handleJump);
      }
    };
  }, [handleJump]);
};
