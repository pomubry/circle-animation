import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './Reducers/appReducer';

const Homepage = () => {
  const { state } = useContext(AppContext);
  return (
    <div className="homepage">
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
