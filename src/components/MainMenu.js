import { useContext } from 'react';
import { AppContext } from './Reducers/appReducer';

import Song from './Song';
import groupLogo from '../pictures/group-logo/groupLogo';
import attributeLogo from '../pictures/attribute/attributeLogo';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';

function MainMenu() {
  const { state, dispatch } = useContext(AppContext);
  const {
    group,
    difficulty,
    attribute,
    beatmapArr,
    speed,
    musicVolume,
    tapVolume,
    isAutoPlay,
    beatmap,
  } = state;

  let groupImgSrcObj = groupLogo.filter((obj) => obj.name === group);
  let attributeImgSrcObj = attributeLogo.filter(
    (obj) => obj.value === attribute
  );

  let filteredBeatmaps = [];
  let userBeatmap = [];

  if (beatmapArr.easy && beatmap.easy) {
    switch (difficulty) {
      case 3:
        filteredBeatmaps = [...beatmapArr.hard];
        userBeatmap = [...beatmap.hard];
        break;
      case 2:
        filteredBeatmaps = [...beatmapArr.normal];
        userBeatmap = [...beatmap.normal];
        break;
      default:
        filteredBeatmaps = [...beatmapArr.easy];
        userBeatmap = [...beatmap.easy];
        break;
    }
  }

  switch (group) {
    case 'nijigasaki':
      filteredBeatmaps = [
        ...filteredBeatmaps.filter(
          (song) => song.info.song_info[0].member_category === 3
        ),
      ];
      break;
    case 'aqours':
      filteredBeatmaps = [
        ...filteredBeatmaps.filter(
          (song) => song.info.song_info[0].member_category === 2
        ),
      ];
      break;
    default:
      filteredBeatmaps = [
        ...filteredBeatmaps.filter(
          (song) => song.info.song_info[0].member_category === 1
        ),
      ];
      break;
  }

  switch (attribute) {
    case 3:
      filteredBeatmaps = [
        ...filteredBeatmaps.filter(
          (song) =>
            song.info.song_info[0].notes[0].notes_attribute === attribute
        ),
      ];
      break;
    case 2:
      filteredBeatmaps = [
        ...filteredBeatmaps.filter(
          (song) =>
            song.info.song_info[0].notes[0].notes_attribute === attribute
        ),
      ];
      break;
    case 1:
      filteredBeatmaps = [
        ...filteredBeatmaps.filter(
          (song) =>
            song.info.song_info[0].notes[0].notes_attribute === attribute
        ),
      ];
      break;
    default:
      break;
  }

  const handleGroup = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'GROUPS',
      payload: { name, value: isNaN(Number(value)) ? value : Number(value) },
    });
  };

  const toggleAutoPlay = (e) => {
    let isAutoPlay = e.target.id === 'true';
    dispatch({ type: 'AUTOPLAY_TOGGLE', payload: { isAutoPlay } });
  };

  return (
    <div className="MainMenu">
      <Helmet>
        <title>Circle-Animation | Menu</title>
      </Helmet>
      <h1>Circle Animation!</h1>
      <form action="">
        <div className="group">
          <div className="indiv-select">
            <label htmlFor="group">Group: </label>
            <div className="select-div">
              <select
                name="group"
                id="group"
                value={group}
                onChange={handleGroup}
              >
                <option value="muse">Muse</option>
                <option value="aqours">Aqours</option>
                <option value="nijigasaki">Nijigasaki</option>
              </select>
              <RiArrowUpDownFill />
            </div>
          </div>
          <div className="indiv-select">
            <label htmlFor="difficulty">Difficulty: </label>
            <div className="select-div">
              <select
                name="difficulty"
                id="difficulty"
                value={difficulty}
                onChange={handleGroup}
              >
                <option value={1}>Easy</option>
                <option value={2}>Normal</option>
                <option value={3}>Hard</option>
              </select>
              <RiArrowUpDownFill />
            </div>
          </div>
          <div className="indiv-select">
            <label htmlFor="attribute">Attribute: </label>
            <div className="select-div">
              <select
                name="attribute"
                id="attribute"
                value={attribute}
                onChange={handleGroup}
              >
                <option value={0}>All</option>
                <option value={1}>Smile</option>
                <option value={2}>Pure</option>
                <option value={3}>Cool</option>
              </select>
              <RiArrowUpDownFill />
            </div>
          </div>
        </div>

        <div className="group half-group">
          <p>Autoplay:</p>
          <div className="auto-play-radio">
            <label
              htmlFor="true"
              className={`radio-label${isAutoPlay ? ' radio-selected' : ''}`}
            >
              On
            </label>
            <input
              type="radio"
              name="autoplay"
              id="true"
              onChange={toggleAutoPlay}
              checked={isAutoPlay}
            />
            <label
              htmlFor="false"
              className={`radio-label${!isAutoPlay ? ' radio-selected' : ''}`}
            >
              Off
            </label>
            <input
              type="radio"
              name="autoplay"
              id="false"
              onChange={toggleAutoPlay}
              checked={!isAutoPlay}
            />
          </div>
          <label htmlFor="note-speed">
            Note Speed <sub className="speed-tip">(Tip: Higher is slower)</sub>{' '}
            :
          </label>
          <input
            type="range"
            id="note-speed"
            min="0.6"
            max="2"
            step="0.1"
            name="speed"
            value={`${speed}`}
            onChange={handleGroup}
            className="slider"
          />
        </div>

        <div className="group half-group">
          <p>Set Volume</p>
          <label htmlFor="music-volume">Music: </label>
          <input
            type="range"
            name="musicVolume"
            id="music-volume"
            min="0"
            max="1"
            step="0.1"
            value={`${musicVolume}`}
            onChange={handleGroup}
            className="slider"
          />

          <label htmlFor="tap-volume">Tap SFX: </label>
          <input
            type="range"
            name="tapVolume"
            id="tap-volume"
            min="0"
            max="1"
            step="0.1"
            value={`${tapVolume}`}
            onChange={handleGroup}
            className="slider"
          />
        </div>
      </form>
      <div className="song-list">
        <div className="filter-logos">
          <img
            className="groupImg"
            src={groupImgSrcObj[0].logo}
            alt={groupImgSrcObj[0].name}
          />
          <img
            className="attrib-logo"
            src={attributeImgSrcObj[0].logo}
            alt={attributeImgSrcObj[0].name}
          />

          <div className="scroll-group-info">
            <span>Note Speed: {speed}</span>
            <span>Music Volume: {musicVolume}</span>
            <span>Tap Volume: {tapVolume}</span>
          </div>
        </div>
        <div className="song-arr">
          {filteredBeatmaps.length > 0 ? (
            filteredBeatmaps.map(({ info }) => (
              <Song
                song={info}
                key={info.code}
                userBeatmap={userBeatmap.filter(
                  (obj) => obj.code === info.code
                )}
              />
            ))
          ) : (
            <p className="loading-bm">Loading beatmaps...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
