import perfectTapSFX from '../tap-sfx/SE_306.ogg';
import goodTapSFX from '../tap-sfx/SE_308.ogg';
import badTapSFX from '../tap-sfx/SE_326.ogg';

function TapSFX({ tapRefs }) {
  let src = [perfectTapSFX, goodTapSFX, badTapSFX];
  return (
    <div className="TapSFX">
      {src.map((sfx, index) => (
        <audio src={sfx} preload="auto" ref={tapRefs[index]} key={index}>
          Audio format is not supported
        </audio>
      ))}
    </div>
  );
}

export default TapSFX;
