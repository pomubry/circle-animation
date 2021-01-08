export const gameState = {
  animationPlayState: 'paused',
  notesArray: [],
  currentNotes: [],
  index: 0,
  combo: 0,
  isLateShown: false,
  highestCombo: 0,
  playing: false,
  time: 0,
  intervalValue: null,
  fontSize: '0rem',
  randomImgIndex: 0,
  isBurgerShown: false,
  isLoading: false,
  vw: null,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        animationPlayState: 'running',
        playing: true,
        intervalValue: action.payload.intervalValue,
      };

    case 'PAUSE_GAME':
      return {
        ...state,
        animationPlayState: 'paused',
        playing: false,
        intervalValue: null,
      };

    case 'TIMER':
      return {
        ...state,
        time: action.payload.time,
        currentTime: action.payload.currentTime,
      };

    case 'NOTES_UPDATE':
      return {
        ...state,
        notesArray: [...state.notesArray, action.payload.currentNote],
        currentNotes: [...state.currentNotes, action.payload.currentNote],
        index: state.index + 1,
      };

    case 'ANIMATION_END':
      return {
        ...state,
        combo: action.payload.isAutoPlay ? state.combo + 1 : 0,
        currentNotes: state.currentNotes.slice(1),
      };

    case 'SET_FONT_SIZE':
      return {
        ...state,
        fontSize: action.payload.fontSize,
        isLateShown: action.payload.isLateShown,
      };

    case 'HANDLE_TAP':
      return {
        ...state,
        combo: action.payload.combo,
        currentNotes: action.payload.currentNotesCopy,
      };

    case 'BURGER':
      return {
        ...state,
        isBurgerShown: !state.isBurgerShown,
      };

    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case 'HIGHEST_COMBO':
      return {
        ...state,
        highestCombo: state.combo,
      };

    case 'RANDOM_IMG_INDEX':
      return {
        ...state,
        randomImgIndex: action.payload.randomImgIndex,
      };

    case 'SONG_END':
      return {
        ...state,
        animationPlayState: 'paused',
        notesArray: [],
        currentNotes: [],
        index: 0,
        combo: 0,
        playing: false,
        currentTime: 0,
        time: 0,
        intervalValue: 0,
      };

    case 'VW':
      return {
        ...state,
        vw: action.payload.vw,
      };

    default:
      return state;
  }
};
