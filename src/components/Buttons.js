import React from 'react';

function Buttons({ handleTap, handleKeyPress, isAutoPlay }) {
  let color = [
    '#8ec225',
    '#b44e8f',
    '#565ea9',
    '#ffe41c',
    '#ee879d',
    '#73c9f3',
    '#f18f3d',
    '#e94c53',
    '#9aa3aa',
  ];
  let arr = color.map((color, index) => {
    return (
      <button
        className={`indiv-button btn-${9 - index}`}
        style={{ backgroundColor: color }}
        key={9 - index}
        data-position={9 - index}
        onMouseDown={handleTap}
        onKeyDown={handleKeyPress}
        disabled={isAutoPlay}
      >
        {9 - index}
      </button>
    );
  });
  arr.reverse();

  return <div className="Buttons">{arr}</div>;
}

export default Buttons;
