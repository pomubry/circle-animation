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
    attribute: 1,
    difficulty: 'easy',
    onMainMenu: false,
  };

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

  normalKimikoko = (e) => {
    let beatmapSrc = beatmap.aqours.normal[0];
    let attribute = beatmapSrc.song_info[0].notes[0].notes_attribute;
    this.setState({
      musicSrc: music[beatmapSrc.code],
      beatmapSrc,
      attribute,
    });
  };

  normalYume = (e) => {
    let beatmapSrc = beatmap.nijigasaki.normal[0];
    let attribute = beatmapSrc.song_info[0].notes[0].notes_attribute;
    this.setState({
      musicSrc: music[beatmapSrc.code],
      beatmapSrc,
      attribute,
    });
  };

  hardKimikoko = (e) => {
    let beatmapSrc = beatmap.aqours.hard[0];
    let attribute = beatmapSrc.song_info[0].notes[0].notes_attribute;
    this.setState({
      musicSrc: music[beatmapSrc.code],
      beatmapSrc,
      attribute,
    });
  };

  hardYume = (e) => {
    let beatmapSrc = beatmap.nijigasaki.hard[4];
    let attribute = beatmapSrc.song_info[0].notes[0].notes_attribute;
    this.setState({
      musicSrc: music[beatmapSrc.code],
      beatmapSrc,
      attribute,
    });
  };

  changeScreen = (e) => {
    this.setState({ onMainMenu: !this.state.onMainMenu });
  };

  checklog = (e) => {
    let pickedBeatmap = beatmap.nijigasaki.hard[0].code;
    let pickedSong = music[pickedBeatmap];
    console.log(pickedSong);
  };
  render() {
    const { onMainMenu } = this.state;
    return (
      <div className="App" tabIndex={-1}>
        {onMainMenu ? <MainMenu /> : <Game state={this.state} />}
        <div className="testers2">
          <button onClick={this.checklog}>Check Log</button>
          <button onClick={this.changeScreen}>Change Screen</button>
          <button onClick={this.fullScreen}>Set Fullscreen</button>
          <button onClick={this.toggleAutoPlay}>Autoplay</button>
          <button onClick={this.setSpeed}>+ Speed</button>
          <button onClick={this.setSpeed}>- Speed</button>
          <br />
          <button onClick={this.normalKimikoko}>normalKimikoko</button>
          <button onClick={this.normalYume}>normalYume</button>
          <br />
          <button onClick={this.hardKimikoko}>hardKimikoko</button>
          <button onClick={this.hardYume}>hardYume</button>
        </div>
      </div>
    );
  }
}

export default App;
