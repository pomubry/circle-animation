import React, { Component } from 'react';
import musicYumeENoIppo from './music/m_191.ogg';
import musicParasol from './music/m_201.ogg';
import normalYumeENoIppo from './beatmap/m_191_normal';
import hardYumeENoIppo from './beatmap/m_191_hard.js';
import normalParasol from './beatmap/m_201_normal';
import hardParasol from './beatmap/m_201_hard.js';

import Game from './components/Game';
// import Buttons from './components/Buttons';
// import TapSFX from './components/TapSFX';

class App extends Component {
  state = {
    // animationPlayState: 'paused',
    // notesArray: [],
    // currentNotes: [],
    // index: 0,
    // combo: 0,
    // playing: false,
    // currentTime: 0,
    // time: 0,
    // interval: null,
    speed: 1,
    isAutoPlay: false,
    musicSrc: musicYumeENoIppo,
    beatmapSrc: normalYumeENoIppo,
    musicVolume: 0.1,
    tapVolume: 0.1,
  };

  // componentDidUpdate() {
  //   const {
  //     currentTime,
  //     time,
  //     index,
  //     notesArray,
  //     currentNotes,
  //     playing,
  //     speed,
  //     beatmapSrc,
  //   } = this.state;
  //   let currentNote = beatmapSrc.song_info[0].notes[index];
  //   if (
  //     currentNote.timing_sec - (0.25 + speed) < time &&
  //     index < beatmapSrc.song_info[0].notes.length - 1 &&
  //     playing
  //   ) {
  //     this.setState({
  //       notesArray: [...notesArray, currentNote],
  //       currentNotes: [...currentNotes, currentNote],
  //       index: index + 1,
  //     });
  //   }

  //   if (time - currentTime > 0.3) {
  //     this.audioRef.current.currentTime = time;
  //     console.log('Catchup!');
  //   }
  // }

  // handlePlayAudio = (e) => {
  //   let audio = this.audioRef.current;
  //   audio.volume = 0.12;
  //   const { playing, interval } = this.state;
  //   if (playing) {
  //     audio.pause();
  //     clearInterval(interval);
  //     this.setState({
  //       animationPlayState: 'paused',
  //       playing: false,
  //       interval: null,
  //     });
  //   } else {
  //     audio.play();
  //     this.setState({
  //       animationPlayState: 'running',
  //       playing: true,
  //       interval: this.intervalFunc(),
  //       duration: this.audioRef.current.duration,
  //     });
  //   }
  // };

  // intervalFunc = () => {
  //   let interval = setInterval(() => {
  //     this.setState((prevState) => ({
  //       time:
  //         this.state.time < this.state.currentTime
  //           ? this.state.currentTime
  //           : this.state.time + 0.01,
  //     }));
  //   }, 10);
  //   return interval;
  // };

  // timeUpdate = (e) => {
  //   let currentTime = this.audioRef.current.currentTime;
  //   this.setState((prevState) => {
  //     return { currentTime };
  //   });
  // };

  // animationEnd = (e) => {
  //   const { currentNotes, isAutoPlay, combo } = this.state;

  //   if (isAutoPlay) {
  //     let clone = this.perfectTapSFX.current.cloneNode(true);
  //     clone.volume = 0.3;
  //     clone.play();
  //   } else {
  //     let clone = this.badTapSFX.current.cloneNode(true);
  //     clone.volume = 0.3;
  //     clone.play();
  //   }

  //   this.setState({
  //     combo: isAutoPlay ? combo + 1 : 0,
  //     currentNotes: currentNotes.slice(1),
  //   });
  //   e.target.style.display = 'none';
  // };

  // handleTap = (e) => {
  //   const { combo, time, currentNotes } = this.state;
  //   let btnPosition = Number(e.target.getAttribute('data-position'));
  //   let isSecondNote =
  //     currentNotes.length > 1 &&
  //     currentNotes[1].position === btnPosition &&
  //     currentNotes[0].timing_sec === currentNotes[1].timing_sec;

  //   if (
  //     currentNotes.length > 0 &&
  //     (currentNotes[0].position === btnPosition || isSecondNote)
  //   ) {
  //     let accuracy = 0;
  //     let notesArray = [...this.notesContainer.current.children];
  //     let note = notesArray.filter(
  //       (note) => Number(note.dataset.timingSec) === currentNotes[0].timing_sec
  //     );

  //     if (note.length > 1) {
  //       let singledNote = note.filter(
  //         (note) => Number(note.dataset.position) === btnPosition
  //       );
  //       accuracy = singledNote[0].dataset.timingSec - time - 0.25;
  //       singledNote[0].style.display = 'none';
  //     } else {
  //       accuracy = note[0].dataset.timingSec - time - 0.25;
  //       note[0].style.display = 'none';
  //     }
  //     console.log(accuracy);
  //     let currentNotesCopy = [...currentNotes];
  //     isSecondNote
  //       ? currentNotesCopy.splice(1, 1)
  //       : (currentNotesCopy = currentNotesCopy.slice(1));

  //     if (accuracy < 0.03) {
  //       let clone = this.perfectTapSFX.current.cloneNode(true);
  //       clone.play();
  //       this.setState({
  //         combo: combo + 1,
  //         currentNotes: currentNotesCopy,
  //       });
  //     } else if (accuracy < 0.06) {
  //       let clone = this.goodTapSFX.current.cloneNode(true);
  //       clone.play();
  //       this.setState({
  //         combo: combo + 1,
  //         currentNotes: currentNotesCopy,
  //       });
  //     } else {
  //       let clone = this.badTapSFX.current.cloneNode(true);
  //       clone.play();
  //       this.setState({ combo: 0, currentNotes: currentNotesCopy });
  //     }

  //     // console.log(
  //     //   (this.notesContainer.current.childNodes[0].style.display = 'none')
  //     // );
  //   }
  // };

  // handleEnd = (e) => {
  //   clearInterval(this.state.interval);
  //   this.setState({
  //     animationPlayState: 'paused',
  //     playing: false,
  //     notesArray: [],
  //     currentTime: 0,
  //     time: 0,
  //     interval: null,
  //     index: 0,
  //     combo: 0,
  //   });
  //   console.log('Song ended');
  // };

  fullScreen = (e) => {
    let app = document.querySelector('.App');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      app.requestFullscreen();
    }
  };

  toggleAutoPlay = (e) => {
    this.setState({ isAutoPlay: !this.state.isAutoPlay });
  };

  setSpeed = (e) => {
    if (e.target.innerHTML === '+ Speed') {
      this.setState((prevState) => ({
        speed: Number((prevState.speed + 0.1).toFixed(2)),
      }));
    } else {
      this.setState((prevState) => ({
        speed: Number((prevState.speed - 0.1).toFixed(2)),
      }));
    }
  };

  normalParasol = (e) => {
    this.setState({ musicSrc: musicParasol, beatmapSrc: normalParasol });
  };

  normalYume = (e) => {
    this.setState({
      musicSrc: musicYumeENoIppo,
      beatmapSrc: normalYumeENoIppo,
    });
  };

  hardParasol = (e) => {
    this.setState({ musicSrc: musicParasol, beatmapSrc: hardParasol });
  };

  hardYume = (e) => {
    this.setState({
      musicSrc: musicYumeENoIppo,
      beatmapSrc: hardYumeENoIppo,
    });
  };

  // audioRef = React.createRef();
  // notesContainer = React.createRef();
  // perfectTapSFX = React.createRef();
  // goodTapSFX = React.createRef();
  // badTapSFX = React.createRef();

  render() {
    // const {
    //   animationPlayState,
    //   notesArray,
    //   speed,
    //   currentTime,
    //   time,
    //   // musicSrc,
    //   // isAutoPlay,
    //   // combo,
    // } = this.state;

    // let tapRefs = [this.perfectTapSFX, this.goodTapSFX, this.badTapSFX];
    // let mainRefs = [this.audioRef, this.notesContainer];
    // let methods = [this.timeUpdate, this.handleEnd, this.handleTap];

    // let notes = [];

    // if (notesArray.length > 0) {
    //   let map = notesArray.map((obj) => {
    //     return (
    //       <div
    //         className="top-btn active-note"
    //         data-timing-sec={obj.timing_sec}
    //         data-position={obj.position}
    //         style={{
    //           animation: `moving-${obj.position} ${speed}s linear ${animationPlayState}`,
    //         }}
    //         onAnimationEnd={this.animationEnd}
    //         key={obj.position * obj.timing_sec}
    //       >
    //         {obj.position}
    //       </div>
    //     );
    //   });
    //   notes = notes.concat(map);
    //   // console.log(notes.length);
    //   notes = notes.filter(
    //     (note) => !(note.props['data-timing-sec'] + 0.7 < time)
    //   );
    // }
    return (
      <div className="App" tabIndex={-1}>
        <Game state={this.state} />
        <div className="testers2">
          <button onClick={this.fullScreen}>Set Fullscreen</button>
          <button onClick={this.toggleAutoPlay}>Autoplay</button>
          <button onClick={this.setSpeed}>+ Speed</button>
          <button onClick={this.setSpeed}>- Speed</button>
          <br />
          <button onClick={this.normalParasol}>normalParasol</button>
          <button onClick={this.normalYume}>normalYume</button>
          <br />
          <button onClick={this.hardParasol}>hardParasol</button>
          <button onClick={this.hardYume}>hardYume</button>
        </div>
        {/* <Game
          state={this.state}
          notes={notes}
          tapRefs={tapRefs}
          mainRefs={mainRefs}
          methods={methods}
        /> */}
        {/* <div className="screen">
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
          <div className="top-btn" style={{ animationPlayState }}>
            D
          </div>
          <div className="notesContainer" ref={this.notesContainer}>
            {notes}
          </div>
          <Buttons handleTap={this.handleTap} isAutoPlay={isAutoPlay} />
          {combo}
        </div> */}
        {/* <div className="testers">
          <button onClick={this.fullScreen}>Set Fullscreen</button>
          <button className="play" onClick={this.handlePlayAudio}>
            Play Audio
          </button>
          <button onClick={this.toggleAutoPlay}>Autoplay</button>
          <br />
          <button onClick={this.parasol}>Marine Border Parasol</button>
          <button onClick={this.yume}>Yume e no Ippo</button>
          <p>{currentTime}</p>
          <p>{time}</p>
        </div> */}
      </div>
    );
  }
}

export default App;
