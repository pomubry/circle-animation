import React from 'react';

function Buttons() {
  let btns = [];
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
  let index = [8, 6, 4, 2, 1, 3, 5, 7, 9];
  for (let i = 1; i <= 9; i++) {
    let element = (
      <div
        className="indiv-button"
        style={{ backgroundColor: color[i - 1] }}
        key={index[i - 1]}
      >
        {index[i - 1]}
      </div>
    );
    btns.push(element);
  }
  return <div className="Buttons">{btns}</div>;
}

export default Buttons;
