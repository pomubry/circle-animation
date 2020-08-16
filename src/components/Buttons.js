import React from 'react';

function Buttons() {
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
      <div
        className={`indiv-button btn-${index}`}
        style={{ backgroundColor: color }}
        key={9 - index}
      >
        {9 - index}
      </div>
    );
  });

  return <div className="Buttons">{arr}</div>;
}

export default Buttons;
