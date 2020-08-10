import React, { useState } from 'react';
import Buttons from './components/Buttons';

function App() {
  const [moveStyle, setMoveStyle] = useState({
    animationPlayState: 'paused',
  });
  let handleMove = (e) => {
    moveStyle.animationPlayState === 'paused'
      ? setMoveStyle({ animationPlayState: 'running' })
      : setMoveStyle({
          animationPlayState: 'paused',
        });
  };
  return (
    <div className="App">
      <div className="screen">
        <div className="top-btn" style={moveStyle}>
          0
        </div>
        <Buttons />
        <button onClick={handleMove}>Start</button>
      </div>
    </div>
  );
}

export default App;
