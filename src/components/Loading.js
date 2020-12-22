import React from 'react';
import { FiLoader } from 'react-icons/fi';

function Loading({ isLoading }) {
  return (
    <div
      className="loading-div"
      style={{ display: isLoading ? 'flex' : 'none' }}
    >
      <FiLoader />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
