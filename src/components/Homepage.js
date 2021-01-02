import { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  tryFetch = () => {
    const body = {
      username: 'ayumu',
      password: 'uehara',
    };

    fetch(
      `${
        process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : ''
      }/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };
  render() {
    const { isAuth } = this.props;
    return (
      <div className="homepage">
        {isAuth ? (
          <p>
            Welcome to Circle Animation! Please go to{' '}
            <Link to="/menu">Menu</Link> to play the game.{' '}
          </p>
        ) : (
          <p>
            Please login or register.
            <button onClick={this.tryFetch}>Try Fetch</button>
          </p>
        )}
      </div>
    );
  }
}

export default Homepage;
