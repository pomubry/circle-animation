import React from 'react';
import { Link } from 'react-router-dom';

import attributeLogo from '../pictures/attribute/attributeLogo';

function Song({ song, setSong }) {
  let attribute = song.song_info[0].notes[0].notes_attribute;
  let logo = attributeLogo.filter((attrib) => attrib.value === attribute);
  let diff = ['Placeholder', 'Easy', 'Normal', 'Hard'];
  let backgroundColor =
    attribute === 1 ? 'smileBG' : attribute === 2 ? 'pureBG' : 'coolBG';

  return (
    <div className={`indiv-song ${backgroundColor}`}>
      <img src={logo[0].logo} alt={logo[0].name} />
      <h2>{song.song_name}</h2>
      <div className="small-info">
        <h5>Difficulty: {diff[song.difficulty]}</h5>
        <h5>Max Combo: {song.song_info[0].notes.length}</h5>
      </div>
      <Link to="/game" onClick={(e) => setSong(e, song)}>
        Play!
      </Link>
    </div>
  );
}

export default Song;
