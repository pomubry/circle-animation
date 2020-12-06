import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function UserAuth({ login }) {
  let history = useHistory();
  let location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    setUsername('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
  }, [location.pathname]);

  const submitAuth = (e) => {
    e.preventDefault();
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
          history.push('/menu');
        } else {
          const { username, password } = data.error;
          setUsernameError(username);
          setPasswordError(password);
        }
      })
      .catch((error) => console.log(error));
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
      <form onSubmit={submitAuth}>
        <p>{location.pathname === '/login' ? 'Login ' : 'Registration '}Form</p>
        <div className="user-cred">
          <div>
            <label htmlFor="username">Username: </label>
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
          <div>
            <label htmlFor="password">Password: </label>
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
          {location.pathname === '/login' ? 'Login ' : 'Register '}
        </button>
      </form>
    </div>
  );
}

export default UserAuth;
