import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FiUserCheck, FiUnlock, FiLogIn } from "react-icons/fi";
import { AppContext } from "./Reducers/appReducer";
import { Helmet } from "react-helmet-async";

import Loading from "./Loading";
import { BsPen } from "react-icons/bs";

function UserAuth() {
  const { dispatch } = useContext(AppContext);
  let history = useHistory();
  let location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setUsernameError("");
    setPasswordError("");
  }, [location.pathname]);

  const submitAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let body = { username, password };
    fetch(
      `${
        process.env.NODE_ENV === "production" ? process.env.REACT_APP_API : ""
      }/api${location.pathname}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          const { username, beatmap } = data.message;
          dispatch({ type: "LOGIN", payload: { username, beatmap } });
          setIsLoading(false);
          history.push("/");
        } else {
          const { username, password } = data.error;
          setIsLoading(false);
          setUsernameError(username);
          setPasswordError(password);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Cannot connect to the server");
        console.log(error);
      });
  };

  const fillForm = (e) => {
    e.preventDefault();
    setUsername("sample");
    setPassword("sample");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Circle-Animation |{" "}
          {location.pathname === "/login" ? "Login" : "Register"}
        </title>
      </Helmet>
      <div className="user-auth">
        <Loading isLoading={isLoading} />
        <form onSubmit={submitAuth}>
          <p>{location.pathname === "/login" ? "Login " : "Registration "}</p>
          <div className="user-cred">
            <div className="input-div">
              <FiUserCheck />
              <label htmlFor="username">Username:</label>
            </div>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Enter your Username"
                value={username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="error-Auth">{usernameError}</div>
          </div>
          <div className="user-cred">
            <div className="input-div">
              <FiUnlock />
              <label htmlFor="password">Password:</label>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="error-Auth">{passwordError}</div>
          </div>

          <div className="btnContainer">
            <button type="submit">
              <FiLogIn />
              {location.pathname === "/login" ? "Login " : "Register "}
            </button>
            {location.pathname === "/login" && (
              <button onClick={fillForm}>
                <BsPen /> Free Account
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default UserAuth;
