import { Link } from 'react-router-dom';

const Homepage = ({ isAuth }) => {
  return (
    <div className="homepage">
      {isAuth ? (
        <p>
          Welcome to Circle Animation! Please go to <Link to="/menu">Menu</Link>{' '}
          to play the game.{' '}
        </p>
      ) : (
        <div style={{ margin: 'auto' }}>
          <p>Please login or register.</p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
