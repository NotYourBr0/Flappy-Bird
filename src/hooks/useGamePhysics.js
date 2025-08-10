import { useState, useCallback, useRef } from 'react';

const PHYSICS_CONFIG = {
  gravity: 0.6,
  jumpVelocity: -10,
  terminalVelocity: 10,
  birdSize: 40,
  pipeWidth: 60,
  pipeGap: 200,
  gameSpeed: 4
};

export const useGamePhysics = () => {
  const [bird, setBird] = useState({
    y: 250,
    velocity: 0,
    rotation: 0
  });
  
  const [pipes, setPipes] = useState([]);
  const lastPipeTime = useRef(0);

  const updateBirdPhysics = useCallback(() => {
    setBird(prev => {
      const newVelocity = Math.min(
        prev.velocity + PHYSICS_CONFIG.gravity,
        PHYSICS_CONFIG.terminalVelocity
      );
      
      const newY = prev.y + newVelocity;
      const rotation = Math.min(newVelocity * 3, 90);

      return {
        y: newY,
        velocity: newVelocity,
        rotation: rotation
      };
    });
  }, []);

  const jump = useCallback(() => {
    setBird(prev => ({
      ...prev,
      velocity: PHYSICS_CONFIG.jumpVelocity,
      rotation: -20
    }));
  }, []);

  const generatePipe = useCallback((currentTime) => {
    if (currentTime - lastPipeTime.current > 1500) { // Generate pipe every 1.5 seconds
      const pipeHeight = Math.random() * 200 + 100;
      const newPipe = {
        id: Date.now(),
        x: window.innerWidth,
        height: pipeHeight,
        passed: false
      };
      
      setPipes(prev => [...prev, newPipe]);
      lastPipeTime.current = currentTime;
    }
  }, []);

  const updatePipes = useCallback(() => {
    setPipes(prev => 
      prev
        .map(pipe => ({ ...pipe, x: pipe.x - PHYSICS_CONFIG.gameSpeed }))
        .filter(pipe => pipe.x > -PHYSICS_CONFIG.pipeWidth)
    );
  }, []);

  const checkCollisions = useCallback((gameHeight) => {
    // Check ground and ceiling collision
    if (bird.y <= 0 || bird.y >= gameHeight - PHYSICS_CONFIG.birdSize) {
      return true;
    }

    // Check pipe collision
    for (const pipe of pipes) {
      const birdLeft = 100;
      const birdRight = birdLeft + PHYSICS_CONFIG.birdSize;
      const birdTop = bird.y;
      const birdBottom = bird.y + PHYSICS_CONFIG.birdSize;

      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + PHYSICS_CONFIG.pipeWidth;

      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // Bird is horizontally aligned with pipe
        if (birdTop < pipe.height || birdBottom > pipe.height + PHYSICS_CONFIG.pipeGap) {
          return true;
        }
      }
    }

    return false;
  }, [bird.y, pipes]);

  const checkScore = useCallback((onScore) => {
    setPipes(prev => 
      prev.map(pipe => {
        if (!pipe.passed && pipe.x + PHYSICS_CONFIG.pipeWidth < 100) {
          onScore();
          return { ...pipe, passed: true };
        }
        return pipe;
      })
    );
  }, []);

  const resetPhysics = useCallback(() => {
    setBird({
      y: 250,
      velocity: 0,
      rotation: 0
    });
    setPipes([]);
    lastPipeTime.current = 0;
  }, []);

  return {
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
  };
};
