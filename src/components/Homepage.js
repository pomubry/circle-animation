import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Homepage extends Component {
  tryFetch = () => {
    const body = {
      username: 'ayumu',
      password: 'uehara',
    };

    axios
      .post(`/api/login`, body, {
        // withCredentials: true,
      })
      .then((res) => console.log(res))
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
