import { useContext } from 'react';
import { AppContext } from './Reducers/appReducer';
import { Link } from 'react-router-dom';

import attributeLogo from '../pictures/attribute/attributeLogo';

function Song({ song, userBeatmap }) {
  const { dispatch } = useContext(AppContext);

  let attribute = song.song_info[0].notes[0].notes_attribute;
  let logo = attributeLogo.filter((attrib) => attrib.value === attribute);
  let diff = ['Placeholder', 'Easy', 'Normal', 'Hard'];
  let backgroundColor =
    attribute === 1 ? 'smileBG' : attribute === 2 ? 'pureBG' : 'coolBG';

  const setSong = () => {
    let songAttribute = song.song_info[0].notes[0].notes_attribute;
    dispatch({
      type: 'SONG',
      payload: {
        musicSrc: song.code,
        beatmapSrc: song,
        songAttribute,
      },
    });
    dispatch({ type: 'ON_GAME', payload: { onGame: true } });
  };

  return (
    <div className={`indiv-song ${backgroundColor}`}>
      <img src={logo[0].logo} alt={logo[0].name} />
      <h2>{song.song_name}</h2>
      <div className="small-info">
        <h5>Difficulty: {diff[song.difficulty]}</h5>
        <h5>Max Combo: {song.song_info[0].notes.length}</h5>
        {userBeatmap ? (
          <h5>Highest Combo: {userBeatmap[0].highestCombo}</h5>
        ) : (
          ''
        )}
      </div>
      <Link to="/game" onClick={() => setSong()}>
        Play!
      </Link>
    </div>
  );
}

export default Song;
