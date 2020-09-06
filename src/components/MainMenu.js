import React from 'react';

function MainMenu() {
  return (
    <div className="MainMenu">
      <h1>Circle Animation!</h1>
      <label>Select a group:</label>
      <select name="group" id="group">
        <option value="muse">Muse</option>
        <option value="aqours">Aqours</option>
        <option value="nijigasaki">Nijigasaki</option>
      </select>
    </div>
  );
}

export default MainMenu;
