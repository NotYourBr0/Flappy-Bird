import React, { useEffect, useRef, useCallback } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import GameOverlay from './GameOverlay';
import ScoreDisplay from './ScoreDisplay';
import { useGameState } from '../hooks/useGameState';
import { useGamePhysics } from '../hooks/useGamePhysics';
import { useInput } from '../hooks/useInput';

const FlappyBird = () => {
  const gameContainerRef = useRef(null);
  const animationRef = useRef();
  const lastTimeRef = useRef(0);

  const {
    gameState,
    score,
    highScore,
    startGame,
    endGame,
    resetGame,
    incrementScore
  } = useGameState();

  const {
    bird,
    pipes,
    updateBirdPhysics,
    jump,
    generatePipe,
    updatePipes,
    checkCollisions,
    checkScore,
    resetPhysics,
    PHYSICS_CONFIG
  } = useGamePhysics();

  const handleJump = useCallback(() => {
    if (gameState === 'WAITING') {
      startGame();
    }
    if (gameState === 'PLAYING' || gameState === 'WAITING') {
      jump();
    }
  }, [gameState, startGame, jump]);

  useInput(handleJump, gameState);

  const gameLoop = useCallback((currentTime) => {
    if (gameState === 'PLAYING') {
      const deltaTime = currentTime - lastTimeRef.current;
      
      if (deltaTime >= 16) { // ~60 FPS
        updateBirdPhysics();
        generatePipe(currentTime);
        updatePipes();
        
        const gameHeight = gameContainerRef.current?.offsetHeight || window.innerHeight;
        
        // Check collisions
        if (checkCollisions(gameHeight)) {
          endGame();
          return;
        }
        
        // Check score
        checkScore(incrementScore);
        
        lastTimeRef.current = currentTime;
      }
    }
    
    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, updateBirdPhysics, generatePipe, updatePipes, checkCollisions, checkScore, endGame, incrementScore]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop]);

  const handleStart = useCallback(() => {
    resetPhysics();
    startGame();
  }, [resetPhysics, startGame]);

  const handleRestart = useCallback(() => {
    resetPhysics();
    resetGame();
  }, [resetPhysics, resetGame]);

  return (
    <div 
      ref={gameContainerRef}
      id="game-container"
      className="game-container"
    >
      {/* Background elements could go here */}
      
      {/* Bird */}
      <Bird bird={bird} />
      
      {/* Pipes */}
      {pipes.map(pipe => (
        <Pipe 
          key={pipe.id} 
          pipe={pipe} 
          PHYSICS_CONFIG={PHYSICS_CONFIG}
        />
      ))}
      
      {/* Score Display */}
      <ScoreDisplay score={score} gameState={gameState} />
      
      {/* Game Overlays */}
      <GameOverlay
        gameState={gameState}
        score={score}
        highScore={highScore}
        onStart={handleStart}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default FlappyBird;
