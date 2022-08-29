import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import App from "./App";
import AppContextProvider from "./components/Reducers/appReducer";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
