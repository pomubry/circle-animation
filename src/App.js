import { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import beatmap from './beatmap/beatmap';
import music from './music/music';

import Header from './components/Header';
import Homepage from './components/Homepage';
import UserAuth from './components/UserAuth';
import Game from './components/Game';
import MainMenu from './components/MainMenu';
import ErrorPage from './components/ErrorPage';

class App extends Component {
  state = {
    speed: 1.5,
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
    username: '',
    isAuth: false,
  };

  componentDidMount() {
    let state = localStorage.getItem('state');
    if (state) {
      this.setState(JSON.parse(state));
    } else {
      setTimeout(() => {
        this.setState({ beatmapArr: beatmap });
      }, 1000);
    }
  }

  componentDidUpdate() {
    let state = JSON.stringify(this.state);
    localStorage.setItem('state', state);
    const { isAuth, username } = this.state;
    if (!isAuth && !username) {
      localStorage.removeItem('state');
    }
  }

  fullScreen = (e) => {
    e.preventDefault();
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
    let beatmapSrc = song;
    let songAttribute = beatmapSrc.song_info[0].notes[0].notes_attribute;
    this.setState({
      musicSrc: music[beatmapSrc.code],
      beatmapSrc,
      songAttribute,
      onMainMenu: !this.state.onMainMenu,
    });
  };

  login = (username) => {
    this.setState({ username, isAuth: true });
  };

  logout = () => {
    this.setState({ username: '', isAuth: false });
  };

  checkAuth = () => {
    let state = JSON.parse(localStorage.getItem('state'));
    return state ? state.isAuth : false;
  };

  render() {
    const { isAuth, username } = this.state;
    return (
      <div className="App" tabIndex={-1}>
        {this.props.location.pathname !== '/game' ? (
          <Header isAuth={isAuth} logout={this.logout} username={username} />
        ) : (
          <></>
        )}
        <Switch>
          <Route exact path="/">
            <Homepage isAuth={isAuth} />
          </Route>
          <Route path="/login">
            <UserAuth login={this.login} />
          </Route>
          <Route path="/register">
            <UserAuth login={this.login} />
          </Route>
          <Route path="/menu">
            <MainMenu
              state={this.state}
              handleGroup={this.handleGroup}
              toggleAutoPlay={this.toggleAutoPlay}
              setSong={this.setSong}
              fullScreen={this.fullScreen}
            />
          </Route>
          <Route path="/game">
            {this.checkAuth() ? (
              <Game state={this.state} returnMenu={this.returnMenu} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
