import React, { Component } from 'react';
import Buttons from './components/Buttons';
import music from './beatmap/m_191.ogg';
import tapsfx from './tap-sfx/SE_306.ogg';
import beatmap from './beatmap/m_191_expert.js';

class App extends Component {
  state = {
    moveStyle: { animationPlayState: 'paused' },
    currentTime: 0,
    time: 0,
    interval: null,
    notesArray: [],
    index: 0,
    playing: false,
    duration: 0,
  };

  componentDidUpdate() {
    const { time, index, notesArray } = this.state;
    let currentNote = beatmap.song_info[0].notes[index];
    if (
      currentNote.timing_sec - 1 < time &&
      index < beatmap.song_info[0].notes.length - 1
    ) {
      this.setState({
        notesArray: [...notesArray, currentNote],
        index: index + 1,
      });
    }
  }

  handlePlayAudio = (e) => {
    let audio = this.audioRef.current;
    const { playing, interval } = this.state;
    audio.volume = 0.08;
    if (playing) {
      audio.pause();
      clearInterval(interval);
      this.setState({
        playing: false,
        moveStyle: { animationPlayState: 'paused' },
        // interval: null,
      });
    } else {
      audio.play();
      this.setState({
        playing: true,
        moveStyle: { animationPlayState: 'running' },
        // interval: this.intervalFunc(),
        duration: this.audioRef.current.duration,
      });
    }
  };

  intervalFunc = () => {
    let interval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time + 0.01,
      }));
    }, 10);
    return interval;
  };

  timeUpdate = (e) => {
    let currentTime = this.audioRef.current.currentTime;
    this.setState({ time: currentTime, currentTime });
  };

  animationEnd = (e) => {
    switch (e.target.innerHTML) {
      case '1':
        this.tapsfxRef1.current.currentTime = 0;
        this.tapsfxRef1.current.play();
        break;

      case '2':
        this.tapsfxRef2.current.currentTime = 0;
        this.tapsfxRef2.current.play();
        break;

      case '3':
        this.tapsfxRef3.current.currentTime = 0;
        this.tapsfxRef3.current.play();
        break;

      case '4':
        this.tapsfxRef4.current.currentTime = 0;
        this.tapsfxRef4.current.play();
        break;

      case '5':
        this.tapsfxRef5.current.currentTime = 0;
        this.tapsfxRef5.current.play();
        break;

      case '6':
        this.tapsfxRef6.current.currentTime = 0;
        this.tapsfxRef6.current.play();
        break;

      case '7':
        this.tapsfxRef7.current.currentTime = 0;
        this.tapsfxRef7.current.play();
        break;

      case '8':
        this.tapsfxRef8.current.currentTime = 0;
        this.tapsfxRef8.current.play();
        break;

      case '9':
        this.tapsfxRef9.current.currentTime = 0;
        this.tapsfxRef9.current.play();
        break;
      default:
        this.tapsfxRef1.current.currentTime = 0;
        this.tapsfxRef1.current.play();
        break;
    }

    console.log(e.target.style.animation);
    e.target.remove();
  };

  handleEnd = (e) => {
    // clearInterval(this.state.interval);
    // this.setState({
    //   moveStyle: { animationPlayState: 'paused' },
    //   currentTime: 0,
    //   notesArray: [],
    //   index: 0,
    //   playing: false,
    // });
    console.log('Song ended');
  };

  setSong = (e) => {
    this.tapsfxRef.current.currentTime = 0;
    this.tapsfxRef.current.play();
  };

  audioRef = React.createRef();
  tapsfxRef1 = React.createRef();
  tapsfxRef2 = React.createRef();
  tapsfxRef3 = React.createRef();
  tapsfxRef4 = React.createRef();
  tapsfxRef5 = React.createRef();
  tapsfxRef6 = React.createRef();
  tapsfxRef7 = React.createRef();
  tapsfxRef8 = React.createRef();
  tapsfxRef9 = React.createRef();

  render() {
    const { moveStyle, currentTime, time, notesArray } = this.state;
    // Object.assign(moveStyle, {
    //   animation: `moving-${obj.position} ${
    //     obj.timing_sec - this.audioRef.current.currentTime
    //   } linear`,
    // })
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
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef1}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef2}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef3}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef4}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef5}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef6}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef7}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef8}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <audio
            src={tapsfx}
            preload="auto"
            ref={this.tapsfxRef9}
            onTimeUpdate={this.timeUpdate}
          >
            Audio format is not supported
          </audio>
          <div className="top-btn" style={moveStyle}>
            01
          </div>
          {notesArray.length > 0 ? (
            notesArray.map((obj) => (
              <div
                className={`top-btn btn-${obj.position}`}
                style={moveStyle}
                style={{
                  animation: `moving-${obj.position} ${
                    obj.timing_sec - this.audioRef.current.currentTime
                  } linear`,
                }}
                onAnimationEnd={this.animationEnd}
              >
                {obj.position}
              </div>
            ))
          ) : (
            <></>
          )}
          <Buttons />
          <button onClick={this.setSong}>Set song</button>
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
