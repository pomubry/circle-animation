import React, { Component } from 'react';
import Buttons from './components/Buttons';
import music from './beatmap/m_191.ogg';
import beatmap from './beatmap/m_191_expert.js';
import tapsfx from './tap-sfx/SE_306.ogg';

class App extends Component {
  state = {
    animationPlayState: 'paused',
    notesArray: [],
    currentNotes: [],
    index: 0,
    speed: 0.7,
    combo: 0,
    playing: false,
    currentTime: 0,
    time: 0,
    interval: null,
    duration: 0,
  };

  componentDidUpdate() {
    const {
      currentTime,
      time,
      index,
      notesArray,
      currentNotes,
      playing,
      speed,
    } = this.state;
    let currentNote = beatmap.song_info[0].notes[index];
    if (
      currentNote.timing_sec - (0.25 + speed) < time &&
      index < beatmap.song_info[0].notes.length - 1 &&
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
    audio.volume = 0.08;
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
        duration: this.audioRef.current.duration,
      });
    }
  };

  intervalFunc = () => {
    let interval = setInterval(() => {
      this.setState((prevState) => ({
        time:
          prevState.time < this.state.currentTime
            ? this.state.currentTime
            : prevState.time + 0.01,
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
    let clone = this.tapsfxRef1.current.cloneNode(true);
    clone.volume = 0.3;
    clone.play();
    console.log(
      Number(e.target.getAttribute('data-timing-sec') - this.state.time - 0.25)
    );
    const { currentNotes } = this.state;
    this.setState({
      combo: this.state.combo + 1,
      currentNotes: currentNotes.slice(1),
    });
    // console.log(currentNotes[0]);
    e.target.style.display = 'none';
  };

  handleTap = (e) => {
    const { combo, time, currentNotes } = this.state;
    let btnPosition = Number(e.target.getAttribute('data-position'));
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
        accuracy = singledNote[0].dataset.timingSec - time - 0.25;
        singledNote[0].style.display = 'none';
      } else {
        accuracy = note[0].dataset.timingSec - time - 0.25;
        note[0].style.display = 'none';
      }
      console.log(accuracy);
      let currentNotesCopy = [...currentNotes];
      isSecondNote
        ? currentNotesCopy.splice(1, 1)
        : (currentNotesCopy = currentNotesCopy.slice(1));

      if (accuracy < 0.03) {
        // console.log(accuracy);
        this.setState({
          combo: combo + 1,
          currentNotes: currentNotesCopy,
        });
      } else if (accuracy < 0.06) {
        // console.log(accuracy);
        this.setState({
          combo: combo + 1,
          currentNotes: currentNotesCopy,
        });
      } else {
        // console.log(accuracy);
        this.setState({ combo: 0, currentNotes: currentNotesCopy });
      }

      // console.log(
      //   (this.notesContainer.current.childNodes[0].style.display = 'none')
      // );
    }
  };

  handleEnd = (e) => {
    clearInterval(this.state.interval);
    this.setState({
      animationPlayState: 'paused',
      playing: false,
      notesArray: [],
      currentTime: 0,
      time: 0,
      interval: null,
      index: 0,
      combo: 0,
    });
    console.log('Song ended');
  };

  fullScreen = (e) => {
    let app = document.querySelector('.App');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      app.requestFullscreen();
    }
  };

  audioRef = React.createRef();
  tapsfxRef1 = React.createRef();
  notesContainer = React.createRef();

  render() {
    const {
      animationPlayState,
      notesArray,
      speed,
      currentTime,
      time,
      combo,
    } = this.state;

    let notes = [];

    if (notesArray.length > 0) {
      let map = notesArray.map((obj) => {
        return (
          <div
            className="top-btn active-note"
            data-timing-sec={obj.timing_sec}
            data-position={obj.position}
            style={{
              animation: `moving-${obj.position} ${speed}s linear ${animationPlayState}`,
            }}
            onAnimationEnd={this.animationEnd}
          >
            {obj.position}
          </div>
        );
      });
      notes = notes.concat(map);
    }
    return (
      <div className="App">
        <div className="screen">
          <audio
            src={music}
            preload="auto"
            ref={this.audioRef}
            onTimeUpdate={this.timeUpdate}
            onEnded={this.handleEnd}
          >
            Audio format is not supported
          </audio>
          <audio src={tapsfx} preload="auto" ref={this.tapsfxRef1}>
            Audio format is not supported
          </audio>
          <div className="top-btn" style={{ animationPlayState }}>
            D
          </div>
          <div className="notesContainer" ref={this.notesContainer}>
            {notes}
          </div>
          <Buttons handleTap={this.handleTap} />
          {combo}
          <button onClick={this.fullScreen}>Set Fullscreen</button>
          <button className="play" onClick={this.handlePlayAudio}>
            Play Audio
          </button>
          <p>{currentTime}</p>
          <p>{time}</p>
        </div>
      </div>
    );
  }
}

export default App;
