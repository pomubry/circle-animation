import React from 'react';

function Buttons({ handleTap }) {
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
  let letters = 'POPODROME'.split('');
  let arr = color.map((color, index) => {
    return (
      <div
        className={`indiv-button btn-${index}`}
        style={{ backgroundColor: color }}
        key={9 - index}
        data-position={9 - index}
        onMouseDown={handleTap}
      >
        {letters[index]}
      </div>
    );
  });

  return <div className="Buttons">{arr}</div>;
}

export default Buttons;
