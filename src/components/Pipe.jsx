import React from 'react';

const Pipe = ({ pipe, PHYSICS_CONFIG }) => {
  return (
    <>
      {/* Top Pipe */}
      <div
        className="pipe-top"
        style={{
          left: `${pipe.x}px`,
          top: '0px',
          width: `${PHYSICS_CONFIG.pipeWidth}px`,
          height: `${pipe.height}px`
        }}
      />
      
      {/* Bottom Pipe */}
      <div
        className="pipe-bottom"
        style={{
          left: `${pipe.x}px`,
          top: `${pipe.height + PHYSICS_CONFIG.pipeGap}px`,
          width: `${PHYSICS_CONFIG.pipeWidth}px`,
          height: `${window.innerHeight - pipe.height - PHYSICS_CONFIG.pipeGap}px`
        }}
      />
    </>
  );
};

export default Pipe;
