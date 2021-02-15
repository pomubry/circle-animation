import { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiUserCheck, FiUnlock, FiLogIn } from 'react-icons/fi';
import { AppContext } from './Reducers/appReducer';
import { Helmet } from 'react-helmet-async';

import Loading from './Loading';

function UserAuth() {
  const { dispatch } = useContext(AppContext);
  let history = useHistory();
  let location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsername('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
  }, [location.pathname]);

  const submitAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let body = { username, password };
    fetch(
      `${
        process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : ''
      }/api${location.pathname}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          const { username, beatmap } = data.message;
          dispatch({ type: 'LOGIN', payload: { username, beatmap } });
          setIsLoading(false);
          history.push('/');
        } else {
          const { username, password } = data.error;
          setIsLoading(false);
          setUsernameError(username);
          setPasswordError(password);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert('Cannot connect to the server');
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div className="user-auth">
      <Helmet>
        <title>
          Circle-Animation |{' '}
          {location.pathname === '/login' ? 'Login' : 'Register'}
        </title>
      </Helmet>
      <Loading isLoading={isLoading} />
      <form onSubmit={submitAuth}>
        <p>{location.pathname === '/login' ? 'Login ' : 'Registration '}</p>
        <div className="user-cred">
          <div className="input-div">
            <FiUserCheck />
            <label htmlFor="username">Username:</label>
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
        {location.pathname === '/login' && (
          <div className="free">
            <p>
              If you don't want to create a new account, you can use a sample
              account.
            </p>
            <p>
              Just login with 'sample' without the quotes as both its username
              and password.
            </p>
          </div>
        )}
        <button>
          <FiLogIn />
          {location.pathname === '/login' ? 'Login ' : 'Register '}
        </button>
      </form>
    </div>
  );
}

export default UserAuth;
