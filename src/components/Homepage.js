import { useState, useRef, createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ayumu from '../music/m_191.ogg';

const Homepage = ({ isAuth }) => {
  const audioRef = createRef();

  const [time, setTime] = useState(0);
  const [audioTime, setAudioTime] = useState(0);
  const [highestDifference, setHighestDifference] = useState(0);
  const [lag, setLag] = useState('');

  const [index, setIndex] = useState(null);
  const initialTime = useRef(0);

  const startTimer = () => {
    audioRef.current.play();
    audioRef.current.volume = 0;

    initialTime.current = Date.now();
    const index = setInterval(() => {
      let elapsedTime = Date.now() - initialTime.current;
      let totalTime = (elapsedTime + time) / 1000;
      let currentAudioTime = document.querySelector('#myaudio').currentTime;
      let diff = totalTime - currentAudioTime;
      console.log(`${totalTime} - ${currentAudioTime} = ${diff}`);
      if (diff < -0.3) {
        console.log(`Timer lagged`);
        setTime(currentAudioTime);
      } else if (diff > 0.3) {
        console.log(`Timer is ahead`);
        setTime(totalTime - diff * 0.9);
      } else {
        console.log('normal');
        setTime(totalTime);
      }
    }, 50);
    setIndex(index);
  };

  const stopTimer = () => {
    clearInterval(index);
    audioRef.current.pause();
    setIndex(null);
  };

  const resetTime = () => {
    audioRef.current.currentTime = 0;
    setTime(0);
    setAudioTime(0);
    setHighestDifference(0);
    setLag('');
  };

  const handleEnd = () => {
    stopTimer();
  };

  const musicTimeUpdate = (e) => {
    setAudioTime(e.target.currentTime);
  };

  useEffect(() => {
    let diff = time / 1000 - audioTime;
    // if (diff < -0.3) {
    //   setLag(`Timer lagged by ${diff} seconds.`);
    //   console.log('It lagged');
    //   // setTime(audioTime);
    // } else if (diff > 0.3) {
    //   console.log(`Timer is ahead by ${diff}. Adjusted Timer`);
    //   // setTime(time - diff);
    // }
    if (diff > highestDifference) {
      setHighestDifference(diff);
    }
  }, [time, audioTime, highestDifference]);

  return (
    <div
      className="homepage"
      // onClick={() => {
      //   setTime((time) => console.log(time));
      // }}
    >
      {/* {isAuth ? (
        <p>
          Welcome to Circle Animation! Please go to <Link to="/menu">Menu</Link>{' '}
          to play the game.{' '}
        </p>
      ) : ( */}
      <div style={{ margin: 'auto' }}>
        <p>Please login or register.</p>

        <button onClick={index === null ? startTimer : stopTimer}>
          {index === null ? 'Start' : 'Pause'}
        </button>
        <button onClick={resetTime}>Reset</button>

        <audio
          id="myaudio"
          src={ayumu}
          preload="auto"
          onTimeUpdate={musicTimeUpdate}
          onEnded={handleEnd}
          controls
          ref={audioRef}
        >
          Play
        </audio>
        <p>My Timer: {time}</p>
        <p>Audio Timer: {audioTime}</p>
        <p>Difference: {time - audioTime}</p>
        <p>Biggest Diff: {highestDifference}</p>
        <p>{lag}</p>
        <Link to="/menu">Go to menu</Link>
      </div>
      {/* ) */}
    </div>
  );
};

export default Homepage;
