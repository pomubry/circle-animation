import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header({ isAuth, logout, username }) {
  const history = useHistory();
  const { pathname } = history.location;

  const usernameUp = () => {
    if (username) {
      let arr = username.split('');
      arr[0] = arr[0].toUpperCase();
      return arr.join('');
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();

    fetch('/api/logout')
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          logout();
          history.push('/');
        } else {
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  let loggedIn = (
    <>
      <ul>
        <li>{usernameUp()}</li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <button onClick={logoutHandler}>Log out</button>
        </li>
      </ul>
    </>
  );

  let loggedOut = (
    <>
      <ul>
        <li>
          <Link
            to="/login"
            className={pathname === '/login' ? 'active-link' : ''}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className={pathname === '/register' ? 'active-link' : ''}
          >
            Register
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <header className="app-header">
      <Link to="/">Circle Animation</Link>
      <nav>{isAuth ? loggedIn : loggedOut}</nav>
    </header>
  );
}

export default Header;
