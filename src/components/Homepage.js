import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './Reducers/appReducer';
import { Helmet } from 'react-helmet-async';

const Homepage = () => {
  const { state } = useContext(AppContext);
  const [vw, setvw] = useState(0);
  const [vh, setvh] = useState(0);

  useEffect(() => {
    function windowResize() {
      setvw(window.innerWidth);
      setvh(window.innerHeight);
    }
    window.addEventListener('resize', windowResize);

    return () => window.removeEventListener('resize', windowResize);
  });

  const setDimensions = () => {
    setvw(window.innerWidth);
    setvh(window.innerHeight);
  };

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
          <p>Height: {vh}</p>
          <p>Width: {vw}</p>
          <button onClick={setDimensions}>Set Dimensions</button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
