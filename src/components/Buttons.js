import { useContext } from 'react';
import { AppContext } from './Reducers/appReducer';

function Buttons({ handleTap, isAutoPlay, attribColor }) {
  const { state } = useContext(AppContext);

  let color = [
    'radial-gradient(rgba(255,255,255,0.6), rgba(154,163,170,1))',
    'radial-gradient(rgba(255,255,255,0.6), rgba(233,76,83,1))',
    'radial-gradient(rgba(255,255,255,0.6), rgba(241,143,61,1))',
    'radial-gradient(rgba(255,255,255,0.6), rgba(115,201,243,1))',
    'radial-gradient(rgba(255,255,255,0.6), rgba(238,135,157,1))',
    'radial-gradient(rgba(255,255,255,0.6), rgba(255,228,28,1))',
    'radial-gradient(rgba(255,255,255,0.6), rgba(86,94,169,1))',
    'radial-gradient(rgba(255,255,255,0.6), rgba(180,78,143,1))',
    'radial-gradient(rgba(255,255,255,0.6), rgba(142,194,37,1))',
  ];
  let arr = color.map((color, index) => {
    return (
      <button
        className={`indiv-button btn-${9 - index} ${attribColor}`}
        key={9 - index}
        data-position={9 - index}
        onTouchStart={handleTap}
        disabled={isAutoPlay}
      >
        {state.isLabeled && 9 - index}
      </button>
    );
  });
  arr.reverse();

  return <div className="Buttons">{arr}</div>;
}

export default Buttons;
