import React, { Component } from 'react';
import imgArr from '../pictures/backgrounds/Backgrounds';
import musicNote from '../svg/musicNote.svg';

import Buttons from './Buttons';
import TapSFX from './TapSFX';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationPlayState: 'paused',
      notesArray: [],
      currentNotes: [],
      index: 0,
      combo: 0,
      playing: false,
      currentTime: 0,
      time: 0,
      interval: null,
      fontSize: '0rem',
      randomImgIndex: 0,
    };
  }

  componentDidMount() {
    let randomIndex = Math.floor(Math.random() * imgArr.length);
    this.setState({ randomImgIndex: randomIndex });
  }

  componentDidUpdate() {
    const {
      currentTime,
      time,
      index,
      notesArray,
      currentNotes,
      playing,
    } = this.state;
    const { beatmapSrc, speed } = this.props.state;
    // let currentNote = beatmapSrc.song_info[0].notes[index];
    let currentNote = null;
    if (beatmapSrc !== null) {
      currentNote = beatmapSrc.song_info[0].notes[index];
    }
    if (
      beatmapSrc !== null &&
      currentNote.timing_sec - (0.25 + speed) < time &&
      index < beatmapSrc.song_info[0].notes.length - 1 &&
      playing
    ) {
      this.setState({
        notesArray: [...notesArray, currentNote],
        currentNotes: [...currentNotes, currentNote],
        index: index + 1,
      });
    }

    if (time - currentTime > 0.3) {
      this.audioRef.current.currentTime = time;
      console.log('Catchup!');
    }
  }

  handlePlayAudio = (e) => {
    let audio = this.audioRef.current;
    audio.volume = this.props.state.musicVolume;
    const { playing, interval } = this.state;
    if (playing) {
      audio.pause();
      clearInterval(interval);
      this.setState({
        animationPlayState: 'paused',
        playing: false,
        interval: null,
      });
    } else {
      audio.play();
      this.setState({
        animationPlayState: 'running',
        playing: true,
        interval: this.intervalFunc(),
      });
    }
  };

  intervalFunc = () => {
    let interval = setInterval(() => {
      this.setState((prevState) => ({
        time:
          this.state.time < this.state.currentTime
            ? this.state.currentTime
            : this.state.time + 0.01,
      }));
    }, 10);
    return interval;
  };

  timeUpdate = (e) => {
    let currentTime = this.audioRef.current.currentTime;
    this.setState((prevState) => {
      return { currentTime };
    });
  };

  animationEnd = (e) => {
    const { currentNotes, combo } = this.state;
    const { isAutoPlay, tapVolume } = this.props.state;

    if (isAutoPlay) {
      let clone = this.perfectTapSFX.current.cloneNode(true);
      clone.volume = tapVolume;
      clone.play();
    } else {
      let clone = this.badTapSFX.current.cloneNode(true);
      clone.volume = tapVolume;
      clone.play();
    }

    this.setState(
      {
        combo: isAutoPlay ? combo + 1 : 0,
        currentNotes: currentNotes.slice(1),
        fontSize: isAutoPlay ? '0rem' : '1.3rem',
      },
      () => {
        setTimeout(() => this.setState({ fontSize: '0rem' }), 2000);
      }
    );
  };

  handleTap = (e) => {
    const { combo, time, currentNotes } = this.state;
    let btnPosition = Number(e.target.getAttribute('data-position'));

    if (
      Number(e.target.getAttribute('data-position')) === 0 &&
      !this.props.state.isAutoPlay
    ) {
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
      let notesArray = [...this.notesContainer.current.children];

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

      const { tapVolume, speed } = this.props.state;
      let vh = window.innerHeight;
      let distance = 0.6 * vh;
      let goodAccuracy = ((distance - 95) * speed) / distance;

      if (accuracy < (speed - goodAccuracy) / 2) {
        let clone = this.perfectTapSFX.current.cloneNode(true);
        clone.volume = tapVolume;
        clone.play();
        this.setState({
          combo: combo + 1,
          currentNotes: currentNotesCopy,
        });
      } else if (accuracy < speed - goodAccuracy) {
        let clone = this.goodTapSFX.current.cloneNode(true);
        clone.volume = tapVolume;
        clone.play();
        this.setState({
          combo: combo + 1,
          currentNotes: currentNotesCopy,
        });
      } else {
        let clone = this.badTapSFX.current.cloneNode(true);
        clone.volume = tapVolume;
        clone.play();
        this.setState({ combo: 0, currentNotes: currentNotesCopy });
      }
    }
  };

  handleEnd = (e) => {
    clearInterval(this.state.interval);
    this.setState({
      animationPlayState: 'paused',
      notesArray: [],
      currentNotes: [],
      index: 0,
      combo: 0,
      playing: false,
      currentTime: 0,
      time: 0,
      interval: null,
    });
    console.log('Song ended');
  };

  audioRef = React.createRef();
  notesContainer = React.createRef();
  perfectTapSFX = React.createRef();
  goodTapSFX = React.createRef();
  badTapSFX = React.createRef();

  render() {
    const {
      animationPlayState,
      notesArray,
      time,
      combo,
      fontSize,
      randomImgIndex,
    } = this.state;

    const { speed, isAutoPlay, musicSrc, attribute } = this.props.state;

    let tapRefs = [this.perfectTapSFX, this.goodTapSFX, this.badTapSFX];

    let notes = [];

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

    let attrib = '';

    switch (attribute) {
      case 1:
        attrib = 'radial-gradient(rgba(255,255,255,0.9), rgba(238,135,157,1))';
        break;
      case 2:
        attrib = 'radial-gradient(rgba(255,255,255,0.9), rgba(142,194,37,1))';
        break;
      default:
        attrib = 'radial-gradient(rgba(255,255,255,0.9), rgba(115,201,243,1))';
        break;
    }
    if (notesArray.length > 0) {
      let map = notesArray.map((obj) => {
        return (
          <div
            className="top-btn active-note"
            data-timing-sec={obj.timing_sec}
            data-position={obj.position}
            style={{
              animation: `moving-${obj.position} ${speed}s linear ${animationPlayState}`,
              backgroundImage: attrib,
            }}
            onAnimationEnd={this.animationEnd}
            key={obj.position * obj.timing_sec}
          ></div>
        );
      });
      notes = notes.concat(map);
      notes = notes.filter(
        (note) => !(note.props['data-timing-sec'] + 0.7 < time)
      );
    }

    return (
      <div
        className="Game"
        onTouchStart={this.handleTap}
        onKeyDown={this.handleTap}
        style={{
          backgroundImage: `url(${imgArr[randomImgIndex]})`,
        }}
        tabIndex={-1}
      >
        <audio
          src={musicSrc}
          preload="auto"
          ref={this.audioRef}
          onTimeUpdate={this.timeUpdate}
          onEnded={this.handleEnd}
        >
          Audio format is not supported
        </audio>
        <TapSFX tapRefs={tapRefs} />

        <div className="top-btn" style={{}}>
          <img src={musicNote} alt="Music Note Icon" />
        </div>

        <div className="notesContainer" ref={this.notesContainer}>
          {notes}
        </div>

        <p className="combo" style={color}>
          {combo > 0 ? `${combo} COMBO` : ''}
        </p>
        <p className="lateNote" style={{ fontSize }}>
          Late!
        </p>

        <Buttons handleTap={this.handleTap} isAutoPlay={isAutoPlay} />

        <div className="testers">
          <button className="play" onClick={this.handlePlayAudio}>
            Play Audio
          </button>
        </div>
      </div>
    );
  }
}
