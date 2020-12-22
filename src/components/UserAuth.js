import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiUserCheck, FiUnlock, FiLogIn } from 'react-icons/fi';
import Loading from './Loading';

function UserAuth({ login }) {
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

    fetch(`/api${location.pathname}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          login(data.message);
          setIsLoading(false);
          history.push('/menu');
        } else {
          const { username, password } = data.error;
          setIsLoading(false);
          setUsernameError(username);
          setPasswordError(password);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Something went wrong');
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
      <Loading isLoading={isLoading} />
      <form onSubmit={submitAuth}>
        <p>{location.pathname === '/login' ? 'Login ' : 'Registration '}Form</p>
        <div className="user-cred">
          <div className="input-div">
            <FiUserCheck />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
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
              type="text"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="error-Auth">{passwordError}</div>
        </div>
        <button>
          <FiLogIn />
          {location.pathname === '/login' ? 'Login ' : 'Register '}
        </button>
      </form>
    </div>
  );
}

export default UserAuth;