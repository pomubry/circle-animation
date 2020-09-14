import React from 'react';
import playIcon from '../svg/playIcon.svg';
import pauseIcon from '../svg/pause.svg';
import upArrowIcon from '../svg/up-arrow.svg';
import homeIcon from '../svg/home.svg';
import returnIcon from '../svg/return.svg';

function GameButtons({
  handlePlayAudio,
  handleBurger,
  returnMenu,
  handleEnd,
  isBurgerShown,
  playing,
}) {
  return (
    <div className="GameButtons">
      <button className="play" onClick={handlePlayAudio}>
        {playing ? (
          <>
            <img src={pauseIcon} alt="pause icon" /> Pause
          </>
        ) : (
          <>
            <img src={playIcon} alt="play icon" /> Play
          </>
        )}
      </button>
      <button onClick={handleBurger}>
        <img
          src={upArrowIcon}
          alt="Arrow svg"
          style={{
            transform: isBurgerShown ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        ></img>
      </button>
      <div
        className="otherBtn"
        style={{
          transform: isBurgerShown ? 'scaleY(1)' : 'scaleY(0)',
        }}
      >
        <button onClick={returnMenu}>
          <img src={homeIcon} alt="home" />
          <br /> Main Menu
        </button>
        <button onClick={handleEnd}>
          <img src={returnIcon} alt="reset" />
          <br /> Reset
        </button>
      </div>
    </div>
  );
}

export default GameButtons;
