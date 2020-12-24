import { Link } from 'react-router-dom';

import { FaArrowCircleUp, FaHome } from 'react-icons/fa';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';

function GameButtons({
  handlePlayAudio,
  handleBurger,
  returnMenu,
  handleEnd,
  isBurgerShown,
  playing,
  beatmapSrc,
}) {
  return (
    <div className="GameButtons">
      <button
        className="play"
        onClick={handlePlayAudio}
        disabled={beatmapSrc === null}
      >
        {playing ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
      </button>
      <button onClick={handleBurger} disabled={beatmapSrc === null}>
        <FaArrowCircleUp
          style={{
            transform: `rotate(${isBurgerShown ? '0deg' : '180deg'})`,
          }}
        />
      </button>
      <div
        className="otherBtn"
        style={{
          transform: isBurgerShown ? 'scaleY(1)' : 'scaleY(0)',
        }}
      >
        <Link onClick={returnMenu} to="/menu">
          <FaHome />
          <br /> Main Menu
        </Link>
        <button onClick={handleEnd}>
          <BsArrowRepeat />
          <br /> Reset
        </button>
      </div>
    </div>
  );
}

export default GameButtons;
