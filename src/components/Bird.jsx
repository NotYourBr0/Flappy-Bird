import React from 'react';

const Bird = ({ bird }) => {
  return (
    <div
      className="bird"
      style={{
        left: '100px',
        top: `${bird.y}px`,
        transform: `rotate(${bird.rotation}deg)`
      }}
    />
  );
};

export default Bird;
