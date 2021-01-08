import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './Reducers/appReducer';
import { Helmet } from 'react-helmet-async';

const Homepage = () => {
  const { state } = useContext(AppContext);
  return (
    <div className="homepage">
      <Helmet>
        <title>Circle-Animation | Home</title>
      </Helmet>
      {state.isAuth ? (
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
