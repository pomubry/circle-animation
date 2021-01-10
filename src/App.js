import { useContext, useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { AppContext } from './components/Reducers/appReducer';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/Header';
import Homepage from './components/Homepage';
import UserAuth from './components/UserAuth';
import Game from './components/Game';
import MainMenu from './components/MainMenu';
import ErrorPage from './components/ErrorPage';

const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    let state = localStorage.getItem('state');
    if (state) {
      dispatch({ type: 'LOCAL_STORAGE', payload: { state } });
    } else {
      fetch(
        `${
          process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : ''
        }/api/beatmaps`
      )
        .then((res) => res.json())
        .then((beatmapArr) =>
          dispatch({ type: 'FETCH_BEATMAP', payload: { beatmapArr } })
        )
        .catch((e) => console.log(e));
    }
  }, [dispatch]);

  useEffect(() => {
    let myState = JSON.stringify(state);
    localStorage.setItem('state', myState);
    const { isAuth, username } = state;
    if (!isAuth && !username) {
      localStorage.removeItem('state');
    }
  });

  return (
    <HelmetProvider>
      <div className="App" tabIndex={-1}>
        {location.pathname !== '/game' ? <Header /> : ''}
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/login">
            <UserAuth />
          </Route>
          <Route path="/register">
            <UserAuth />
          </Route>
          <Route path="/menu">
            {state.isAuth ? <MainMenu /> : <Redirect to="/login" />}
          </Route>
          <Route path="/game">
            {state.isAuth ? <Game /> : <Redirect to="/login" />}
          </Route>
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    </HelmetProvider>
  );
};

export default App;
