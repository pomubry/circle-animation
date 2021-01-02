import { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
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
          <p>Please login or register.</p>
        )}
      </div>
    );
  }
}

export default Homepage;
