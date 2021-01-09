import { useEffect, createRef, useRef, useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { gameReducer, gameState } from './Reducers/gameReducer';
import { AppContext } from './Reducers/appReducer';
import { Helmet } from 'react-helmet-async';

import imgArr from '../pictures/backgrounds/Backgrounds';
import { GiMusicalNotes } from 'react-icons/gi';

import Buttons from './Buttons';
import TapSFX from './TapSFX';
import GameButtons from './GameButtons';
import Loading from './Loading';
import SmallScreen from './SmallScreen';

const Game = () => {
  const { state, dispatch: appDispatch } = useContext(AppContext);
  const audioRef = createRef();
  const notesContainer = createRef();
  const perfectTapSFX = createRef();
  const goodTapSFX = createRef();
  const badTapSFX = createRef();
  const initialTime = useRef(0);
  const tapRefs = [perfectTapSFX, goodTapSFX, badTapSFX];
  const history = useHistory();

  const {
    beatmapSrc,
    speed,
    musicVolume,
    musicSrc,
    songAttribute,
    isAutoPlay,
    tapVolume,
  } = state;

  const [localState, dispatch] = useReducer(gameReducer, gameState);
  const {
    animationPlayState,
    notesArray,
    currentNotes,
    index,
    combo,
    isLateShown,
    highestCombo,
    playing,
    time,
    intervalValue,
    fontSize,
    randomImgIndex,
    isBurgerShown,
    isLoading,
  } = localState;

  useEffect(() => {
    let randomImgIndex = Math.floor(Math.random() * imgArr.length);
    dispatch({ type: 'RANDOM_IMG_INDEX', payload: { randomImgIndex } });
    dispatch({ type: 'VW', payload: { vw: window.innerWidth } });
  }, []);

  useEffect(() => {
    let currentNote = beatmapSrc.song_info[0].notes[index];
    if (
      currentNote.timing_sec - (0.25 + speed) < time &&
      index < beatmapSrc.song_info[0].notes.length - 1 &&
      playing
    ) {
      // 0.2 used to be 0.25
      dispatch({ type: 'NOTES_UPDATE', payload: { currentNote } });
    }
  }, [beatmapSrc, time, index, playing, speed]);

  useEffect(() => {
    if (combo > highestCombo) {
      dispatch({ type: 'HIGHEST_COMBO' });
    }
  }, [combo, highestCombo]);

  useEffect(() => {
    if (isLateShown) {
      setTimeout(
        () =>
          dispatch({
            type: 'SET_FONT_SIZE',
            payload: { fontSize: '0rem', isLateShown: false },
          }),
        1500
      );
    }
  }, [isLateShown]);

  useEffect(() => {
    function windowResize() {
      dispatch({ type: 'VW', payload: { vw: window.innerWidth } });
    }
    window.addEventListener('resize', windowResize);

    return () => window.removeEventListener('resize', windowResize);
  });

  const startGame = () => {
    let audio = audioRef.current;
    audio.volume = musicVolume;
    audio.play();

    initialTime.current = Date.now();
    const value = setInterval(() => {
      let elapsedTime = Date.now() - initialTime.current;
      let totalTime = (elapsedTime + time) / 1000;
      let currentAudioTime = document.querySelector('#myaudio').currentTime;
      let diff = totalTime - currentAudioTime;
      if (diff < -0.3) {
        dispatch({
          type: 'TIMER',
          payload: { time: currentAudioTime, currentTime: currentAudioTime },
        });
      } else if (diff > 0.3) {
        dispatch({
          type: 'TIMER',
          payload: {
            time: totalTime - diff * 0.9,
            currentTime: currentAudioTime,
          },
        });
      } else {
        dispatch({
          type: 'TIMER',
          payload: {
            time: totalTime,
            currentTime: currentAudioTime,
          },
        });
      }
    }, 50);

    dispatch({
      type: 'START_GAME',
      payload: {
        initialTime,
        intervalValue: value,
      },
    });
  };

  const pauseGame = () => {
    let audio = audioRef.current;
    audio.volume = musicVolume;
    audio.pause();
    clearInterval(intervalValue);
    dispatch({ type: 'PAUSE_GAME' });
  };

  const animationEnd = (e) => {
    if (isAutoPlay) {
      let clone = perfectTapSFX.current.cloneNode(true);
      clone.volume = tapVolume;
      clone.play();
    } else {
      let clone = badTapSFX.current.cloneNode(true);
      clone.volume = tapVolume;
      clone.play();
    }
    dispatch({ type: 'ANIMATION_END', payload: { isAutoPlay } });
    if (!isLateShown && !isAutoPlay) {
      dispatch({
        type: 'SET_FONT_SIZE',
        payload: { fontSize: '1.3rem', isLateShown: true },
      });
    }
  };

  const handleTap = (e) => {
    let btnPosition = Number(e.target.getAttribute('data-position'));

    if (Number(e.target.getAttribute('data-position')) === 0 && !isAutoPlay) {
      for (let num = 49, index = 1; num < 58; num++, index++) {
        if (num === e.keyCode) btnPosition = index;
      }
    }

    let isSecondNote =
      currentNotes.length > 1 &&
      currentNotes[1].position === btnPosition &&
      currentNotes[0].timing_sec === currentNotes[1].timing_sec;

    if (
      currentNotes.length > 0 &&
      (currentNotes[0].position === btnPosition || isSecondNote)
    ) {
      let accuracy = 0;
      let notesArray = [...notesContainer.current.children];

      let note = notesArray.filter(
        (note) => Number(note.dataset.timingSec) === currentNotes[0].timing_sec
      );

      if (note.length > 1) {
        let singledNote = note.filter(
          (note) => Number(note.dataset.position) === btnPosition
        );
        accuracy = singledNote[0].dataset.timingSec - time - 0.2;
        singledNote[0].style.display = 'none';
      } else {
        accuracy = note[0].dataset.timingSec - time - 0.2;
        note[0].style.display = 'none';
      }
      let currentNotesCopy = [...currentNotes];
      isSecondNote
        ? currentNotesCopy.splice(1, 1)
        : (currentNotesCopy = currentNotesCopy.slice(1));

      let vh = window.innerHeight;
      let distance = 0.6 * vh;
      let goodAccuracy = ((distance - 70) * speed) / distance;

      if (accuracy < (speed - goodAccuracy) / 2) {
        let clone = perfectTapSFX.current.cloneNode(true);
        clone.volume = tapVolume;
        clone.play();
        dispatch({
          type: 'HANDLE_TAP',
          payload: { combo: combo + 1, currentNotesCopy },
        });
      } else if (accuracy < speed - goodAccuracy) {
        let clone = goodTapSFX.current.cloneNode(true);
        clone.volume = tapVolume;
        clone.play();
        dispatch({
          type: 'HANDLE_TAP',
          payload: { combo: combo + 1, currentNotesCopy },
        });
      } else {
        let clone = badTapSFX.current.cloneNode(true);
        clone.volume = tapVolume;
        clone.play();
        dispatch({
          type: 'HANDLE_TAP',
          payload: { combo: 0, currentNotesCopy },
        });
      }
    }
  };

  const handleBurger = (e) => {
    dispatch({ type: 'BURGER' });
  };

  const handleEnd = (e) => {
    clearInterval(intervalValue);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (e.target.nodeName === 'AUDIO' && !isAutoPlay) {
      dispatch({ type: 'IS_LOADING', payload: { isLoading: true } });
      let { code, difficulty } = beatmapSrc;

      fetch(
        `${
          process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : ''
        }/api/combo-update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            code,
            difficulty,
            highestCombo: highestCombo,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            appDispatch({
              type: 'UPDATE_BEATMAP',
              payload: { beatmap: data.message.beatmap },
            });
            dispatch({ type: 'IS_LOADING', payload: { isLoading: false } });
            history.push('/menu');
          } else {
            console.log('Something went wrong');
            dispatch({ type: 'IS_LOADING', payload: { isLoading: false } });
            history.push('/menu');
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: 'IS_LOADING', payload: { isLoading: false } });
          history.push('/menu');
        });
    }
    dispatch({ type: 'SONG_END' });
  };

  let colorArr = [
    '#b2fc1f',
    '#f18f3d',
    '#e94c53',
    '#ffe41c',
    '#ee879d',
    '#73c9f3',
    '#f18f3d',
    '#e94c53',
    '#ee879d',
  ];

  let color = { color: colorArr[Math.floor(combo / 100)] };
  let attribColor =
    songAttribute === 1 ? 'smile' : songAttribute === 2 ? 'pure' : 'cool';

  let notes = [];

  if (notesArray.length > 0) {
    let map = notesArray.map((obj) => {
      return (
        <div
          className={`top-btn active-note ${attribColor}`}
          data-timing-sec={obj.timing_sec}
          data-position={obj.position}
          style={{
            animation: `moving-${obj.position} ${speed}s linear ${animationPlayState}`,
          }}
          onAnimationEnd={animationEnd}
          key={obj.position * obj.timing_sec}
        ></div>
      );
    });
    notes = notes.concat(map);
    notes = notes.filter(
      (note) => !(note.props['data-timing-sec'] + 0.7 < time)
    );
    // 0 used to be 0.7
  }

  const isSmallWidth = () => {
    if (document.querySelector('.btn-1')) {
      let btn1 = document.querySelector('.btn-1').getBoundingClientRect();
      let btn9 = document.querySelector('.btn-9').getBoundingClientRect();
      let game = document.querySelector('.Game').getBoundingClientRect();
      let btnWidthTotal = btn9.right - btn1.x;
      return game.width < btnWidthTotal;
    }
  };

  return (
    <div
      className="Game"
      onKeyDown={!isAutoPlay ? handleTap : () => {}}
      style={{
        backgroundImage: `url(${imgArr[randomImgIndex]})`,
      }}
      tabIndex={-1}
    >
      <Helmet>
        <title>Circle-Animation | Game</title>
      </Helmet>
      {isSmallWidth() ? <SmallScreen /> : ''}
      <Loading isLoading={isLoading} />
      <audio
        id="myaudio"
        src={musicSrc}
        preload="auto"
        ref={audioRef}
        onEnded={handleEnd}
      >
        Audio format is not supported
      </audio>
      <TapSFX tapRefs={tapRefs} />
      <div className={`top-btn ${attribColor}`}>
        <GiMusicalNotes />
      </div>
      <div className="notesContainer" ref={notesContainer}>
        {notes}
      </div>
      <p className="combo" style={color}>
        {combo > 0 ? `${combo} COMBO` : ''}
      </p>
      <p className="lateNote" style={{ fontSize: fontSize }}>
        Bad Timing!
      </p>
      <Buttons
        handleTap={handleTap}
        isAutoPlay={isAutoPlay}
        attribColor={attribColor}
      />
      <GameButtons
        handlePlayGame={playing ? pauseGame : startGame}
        handleBurger={handleBurger}
        handleEnd={handleEnd}
        isBurgerShown={isBurgerShown}
        playing={playing}
        beatmapSrc={beatmapSrc}
      />
    </div>
  );
};

export default Game;
