import { useContext } from 'react';
import { AppContext } from './Reducers/appReducer';
import { Helmet } from 'react-helmet-async';
import HowToPlay from './HowToPlay';

const Homepage = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="homepage">
      <Helmet>
        <title>Circle-Animation | Home</title>
      </Helmet>
      {state.isAuth ? (
        <>
          <HowToPlay />
        </>
      ) : (
        <div className="logged-out" style={{ margin: 'auto' }}>
          <p>Please login or register.</p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
