import React, { Component } from 'react';

import beatmap from './beatmap/beatmap';
import music from './music/music';

import Game from './components/Game';
import MainMenu from './components/MainMenu';

class App extends Component {
  state = {
    speed: 1,
    isAutoPlay: false,
    musicSrc: null,
    beatmapSrc: null,
    musicVolume: 0.1,
    tapVolume: 0.1,
    group: 'muse',
    songAttribute: 1,
    attribute: 0,
    difficulty: 1,
    onMainMenu: true,
    beatmapArr: {},
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ beatmapArr: beatmap });
    }, 1000);
  }

  fullScreen = (e) => {
    let app = document.querySelector('.App');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      app.requestFullscreen();
    }
  };

  toggleAutoPlay = (e) => {
    let isAutoPlay = e.target.id === 'true';
    this.setState({ isAutoPlay });
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

  returnMenu = (e) => {
    this.setState({ onMainMenu: !this.state.onMainMenu });
  };

  handleGroup = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: isNaN(Number(value)) ? value : Number(value),
    });
  };

  setSong = (e, song) => {
    e.preventDefault();
    let beatmapSrc = song;
    let songAttribute = beatmapSrc.song_info[0].notes[0].notes_attribute;
    this.setState({
      musicSrc: music[beatmapSrc.code],
      beatmapSrc,
      songAttribute,
      onMainMenu: !this.state.onMainMenu,
    });
  };

  checklog = (e) => {
    console.log(typeof beatmap.aqours.easy[0]);
  };
  render() {
    const { onMainMenu } = this.state;
    return (
      <div className="App" tabIndex={-1}>
        {onMainMenu ? (
          <MainMenu
            state={this.state}
            handleGroup={this.handleGroup}
            toggleAutoPlay={this.toggleAutoPlay}
            setSong={this.setSong}
          />
        ) : (
          <Game state={this.state} returnMenu={this.returnMenu} />
        )}
        <div className="testers2">
          <button onClick={this.checklog}>Check Log</button>
          <button onClick={this.fullScreen}>Set Fullscreen</button>
        </div>
      </div>
    );
  }
}

export default App;
