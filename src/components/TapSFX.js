import React from 'react';

function TapSFX({ refArr, src }) {
  return (
    <div>
      {refArr.map((ref, index) => {
        return (
          <audio src={src} preload="auto" ref={ref} key={index}>
            Audio format is not supported
          </audio>
        );
      })}
    </div>
  );
}

export default TapSFX;
