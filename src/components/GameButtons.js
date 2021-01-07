import { useContext } from 'react';
import { AppContext } from './Reducers/appReducer';
import { Link } from 'react-router-dom';

import { FaArrowCircleUp, FaHome } from 'react-icons/fa';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';

function GameButtons({
  handlePlayGame,
  handleBurger,
  handleEnd,
  isBurgerShown,
  playing,
  beatmapSrc,
}) {
  const { dispatch } = useContext(AppContext);
  return (
    <div className="GameButtons">
      <button
        className="play"
        onClick={handlePlayGame}
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
        <Link
          to="/menu"
          onClick={() =>
            dispatch({ type: 'ON_GAME', payload: { onGame: false } })
          }
        >
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
