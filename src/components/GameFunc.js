import { useState, useEffect, createRef, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import imgArr from '../pictures/backgrounds/Backgrounds';

import { GiMusicalNotes } from 'react-icons/gi';

import Buttons from './Buttons';
import TapSFX from './TapSFX';
import GameButtons from './GameButtons';
import Loading from './Loading';

const GameFunc = ({ state, returnMenu, updateBeatmap }) => {
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

  const [animationPlayState, setAnimationPlayState] = useState('paused');
  const [notesArray, setNotesArray] = useState([]);
  const [currentNotes, setCurrentNotes] = useState([]);
  const [index, setIndex] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highestCombo, setHighestCombo] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [time, setTime] = useState(0);
  const [intervalValue, setIntervalValue] = useState(null);
  const [fontSize, setFontSize] = useState('0rem');
  const [randomImgIndex, setRandomImgIndex] = useState(0);
  const [isBurgerShown, setIsBurgerShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let randomIndex = Math.floor(Math.random() * imgArr.length);
    setRandomImgIndex(randomIndex);
  }, []);

  useEffect(() => {
    let currentNote = beatmapSrc.song_info[0].notes[index];
    if (
      currentNote.timing_sec - (0.2 + speed) < time &&
      index < beatmapSrc.song_info[0].notes.length - 1 &&
      playing
    ) {
      // 0.2 used to be 0.25
      setNotesArray([...notesArray, currentNote]);
      setCurrentNotes([...currentNotes, currentNote]);
      setIndex(index + 1);
    }
  }, [beatmapSrc, index, speed, time, playing, notesArray, currentNotes]);

  useEffect(() => {
    if (combo > highestCombo) {
      setHighestCombo(combo);
    }
  }, [combo, highestCombo]);

  const startGame = () => {
    let audio = audioRef.current;
    audio.volume = musicVolume;
    audio.play();
    setAnimationPlayState('running');
    setPlaying(true);

    initialTime.current = Date.now();
    const value = setInterval(() => {
      let elapsedTime = Date.now() - initialTime.current;
      let totalTime = (elapsedTime + time) / 1000;
      let currentAudioTime = document.querySelector('#myaudio').currentTime;
      let diff = totalTime - currentAudioTime;
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
    setIntervalValue(value);
  };

  const pauseGame = () => {
    let audio = audioRef.current;
    audio.volume = musicVolume;
    audio.pause();
    clearInterval(intervalValue);
    setAnimationPlayState('paused');
    setPlaying(false);
    setIntervalValue(null);
  };

  const timeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
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
    setCombo(isAutoPlay ? combo + 1 : 0);
    setCurrentNotes(currentNotes.slice(1));
    setFontSize(isAutoPlay ? '0rem' : '1.3rem');
    setTimeout(() => setFontSize('0rem'), 2000);
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
        setCombo(combo + 1);
        setCurrentNotes(currentNotesCopy);
      } else if (accuracy < speed - goodAccuracy) {
        let clone = goodTapSFX.current.cloneNode(true);
        clone.volume = tapVolume;
        clone.play();
        setCombo(combo + 1);
        setCurrentNotes(currentNotesCopy);
      } else {
        let clone = badTapSFX.current.cloneNode(true);
        clone.volume = tapVolume;
        clone.play();
        setCombo(0);
        setCurrentNotes(currentNotesCopy);
      }
    }
  };

  const handleBurger = (e) => {
    setIsBurgerShown((prevState) => !prevState);
  };

  const handleEnd = (e) => {
    clearInterval(intervalValue);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (e.target.nodeName === 'AUDIO' && !isAutoPlay) {
      setIsLoading(true);
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
            highestCombo,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            updateBeatmap(data.message.beatmap);
            setIsLoading(false);
            history.push('/menu');
          } else {
            console.log('Something went wrong');
            setIsLoading(false);
            history.push('/menu');
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          history.push('/menu');
        });
    }

    setAnimationPlayState('paused');
    setNotesArray([]);
    setCurrentNotes([]);
    setIndex(0);
    setCombo(0);
    setPlaying(false);
    setCurrentTime(0);
    setTime(0);
    setIntervalValue(0);
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
    notes = notes.filter((note) => !(note.props['data-timing-sec'] + 0 < time));
    // 0 used to be 0.7
  }
  return (
    <div
      className="Game"
      onKeyDown={!isAutoPlay ? handleTap : () => {}}
      style={{
        backgroundImage: `url(${imgArr[randomImgIndex]})`,
      }}
      tabIndex={-1}
    >
      <Loading isLoading={isLoading} />
      <audio
        id="myaudio"
        src={musicSrc}
        preload="auto"
        ref={audioRef}
        onTimeUpdate={timeUpdate}
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
        <p style={{ background: 'white' }}>{time}</p>
        <p style={{ background: 'white' }}>{currentTime}</p>
        <p style={{ background: 'white' }}>{time - currentTime}</p>
      </div>
      <p className="combo" style={color}>
        {combo > 0 ? `${combo} COMBO` : ''}
      </p>
      <p className="lateNote" style={{ fontSize }}>
        Late!
      </p>
      <Buttons
        handleTap={handleTap}
        isAutoPlay={isAutoPlay}
        attribColor={attribColor}
      />
      <GameButtons
        handlePlayGame={playing ? pauseGame : startGame}
        handleBurger={handleBurger}
        returnMenu={returnMenu}
        handleEnd={handleEnd}
        isBurgerShown={isBurgerShown}
        playing={playing}
        beatmapSrc={beatmapSrc}
      />
    </div>
  );
};

export default GameFunc;
