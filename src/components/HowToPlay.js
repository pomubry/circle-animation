import { BsArrowReturnRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import filter from "../pictures/filter.PNG";
import scroll from "../pictures/scroll.PNG";
import songList from "../pictures/song-list.PNG";
import game from "../pictures/game.png";

const HowToPlay = () => {
  return (
    <div className="h2p">
      <h2>HOW TO PLAY THE GAME:</h2>
      <section>
        <img src={filter} alt="filter-group" />
        <p>
          <BsArrowReturnRight /> FILTER THE SONG BY GROUP, DIFFICULTY, AND
          ATTRIBUTE.
        </p>
      </section>
      <section>
        <p>
          <BsArrowReturnRight /> SET THE DESIRED NOTE SPEED AND VOLUME SETTINGS
          FOR THE GAME.
        </p>
        <img src={scroll} alt="filter-group" />
      </section>
      <section>
        <img src={songList} alt="filter-group" />
        <p>
          <BsArrowReturnRight /> PICK THE DESIRED SONG AND PRESS PLAY!
        </p>
      </section>
      <div className="game">
        <img src={game} alt="game" />
        <p>
          <BsArrowReturnRight />
          ON KEYBOARD, PRESS THE CORRESPONDING NUMBERS WHERE THE NOTES ARE
          HEADING ACCORDING TO THE RHYTHM. PRESS THE SPACEBAR TO TOGGLE
          PLAY/PAUSE. IF YOU ARE ON MOBILE, SIMPLY TAP THE NOTES!
        </p>
      </div>

      <button>
        <Link to="/menu">GO TO THE MAIN MENU</Link>
      </button>
    </div>
  );
};

export default HowToPlay;
