import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './styles/main.css';
import App from './App';
import AppContextProvider from './components/Reducers/appReducer';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
