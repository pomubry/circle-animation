import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Loading from './Loading';

function Header({ isAuth, logout, username }) {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    fetch(`/api/logout`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          logout();
          setIsLoading(false);
          history.push('/');
        } else {
          setIsLoading(false);
          console.log(data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert('Cannot connect to the server');
        console.log(error);
      });
  };

  let loggedIn = (
    <>
      <ul>
        <li>{usernameUp()}</li>
        <li>
          <Link
            to="/menu"
            className={pathname === '/menu' ? 'active-link' : ''}
          >
            Menu
          </Link>
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
    <>
      <Loading isLoading={isLoading} />
      <header className="app-header">
        <Link to="/" className={pathname === '/' ? 'active-link' : ''}>
          Circle Animation
        </Link>
        <nav>{isAuth ? loggedIn : loggedOut}</nav>
      </header>
    </>
  );
}

export default Header;
