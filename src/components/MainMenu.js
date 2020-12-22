import React from 'react';
import groupLogo from '../pictures/group-logo/groupLogo';
import attributeLogo from '../pictures/attribute/attributeLogo';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { RiArrowUpDownFill } from 'react-icons/ri';

import Song from './Song';

function MainMenu({ state, handleGroup, toggleAutoPlay, setSong, fullScreen }) {
  const {
    group,
    difficulty,
    attribute,
    beatmapArr,
    speed,
    musicVolume,
    tapVolume,
    isAutoPlay,
  } = state;
  let groupImgSrcObj = groupLogo.filter((obj) => obj.name === group);
  let attributeImgSrcObj = attributeLogo.filter(
    (obj) => obj.value === attribute
  );
  let filteredBeatmaps = [];
  for (let groupName in beatmapArr) {
    if (groupName === group) {
      switch (difficulty) {
        case 1:
          filteredBeatmaps = filteredBeatmaps.concat([
            beatmapArr[groupName].easy,
          ]);
          break;
        case 2:
          filteredBeatmaps = filteredBeatmaps.concat([
            beatmapArr[groupName].normal,
          ]);
          break;
        default:
          filteredBeatmaps = filteredBeatmaps.concat([
            beatmapArr[groupName].hard,
          ]);
          break;
      }
    }

    if (filteredBeatmaps.length > 0) {
      filteredBeatmaps = [
        filteredBeatmaps[0].filter((obj) => {
          return attribute !== 0
            ? obj.song_info[0].notes[0].notes_attribute === attribute
            : obj;
        }),
      ];
    }
  }

  return (
    <div className="MainMenu">
      <h1>Circle Animation!</h1>
      <button className="fullscreen" onClick={fullScreen}>
        <BsArrowsFullscreen /> <span>Set Full Screen</span>
      </button>
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
          {filteredBeatmaps.length > 0
            ? filteredBeatmaps[0].map((song) => (
                <Song song={song} key={song.code} setSong={setSong} />
              ))
            : 'Loading'}
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
