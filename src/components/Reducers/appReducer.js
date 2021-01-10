import { createContext, useReducer } from 'react';
import music from '../../music/music';

const appState = {
  speed: 1.5,
  isAutoPlay: false,
  musicSrc: {},
  beatmapSrc: {},
  musicVolume: 0.1,
  tapVolume: 0.1,
  group: 'muse',
  songAttribute: 1,
  attribute: 0,
  difficulty: 1,
  beatmapArr: {},
  username: '',
  beatmap: {},
  isAuth: false,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOCAL_STORAGE':
      return JSON.parse(action.payload.state);

    case 'FETCH_BEATMAP':
      return {
        ...state,
        beatmapArr: action.payload.beatmapArr,
      };

    case 'AUTOPLAY_TOGGLE':
      return {
        ...state,
        isAutoPlay: action.payload.isAutoPlay,
      };

    case 'GROUPS':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case 'SONG':
      return {
        ...state,
        musicSrc: music[action.payload.musicSrc],
        beatmapSrc: action.payload.beatmapSrc,
        songAttribute: action.payload.songAttribute,
      };

    case 'UPDATE_BEATMAP':
      return {
        ...state,
        beatmap: action.payload.beatmap,
      };

    case 'LOGIN':
      return {
        ...state,
        username: action.payload.username,
        beatmap: action.payload.beatmap,
        isAuth: true,
      };

    case 'LOGOUT':
      return {
        ...appState,
        beatmapArr: state.beatmapArr,
      };

    default:
      return state;
  }
};

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
