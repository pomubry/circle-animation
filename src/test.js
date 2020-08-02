import React, { useState } from 'react';

function Test() {
  const [pos, setPos] = useState('');
  const [bg, setbg] = useState('rgb(250, 182, 54)');

  let handleStyle = (e) => {
    bg === 'rgb(250, 182, 54)' ? setbg('pink') : setbg('rgb(250, 182, 54)');
  };

  let handleStart = (e) => {
    pos === '' ? setPos('div-move 1s linear infinite') : setPos('');
  };

  let buttonStyle = {
    marginTop: '50vh',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'orchid',
    marginBottom: '20px',
  };

  let noteStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    animation: pos,
    backgroundColor: 'red',
  };

  let divbg = {
    backgroundColor: bg,
  };
  return (
    <div className="test" style={divbg}>
      <div style={noteStyle} onClick={handleStyle} className="note"></div>
      <div style={buttonStyle} onClick={handleStyle}></div>
      <button onClick={handleStart}>start</button>
    </div>
  );
}

export default Test;
