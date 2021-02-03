// eslint-disable-next-line no-unused-vars
import React, { useCallback } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

function fullSchreen() {
  const handle = useFullScreenHandle();

  return (
    <div>
      <button onClick={handle.enter}>
        Enter fullscreen
      </button>

      <FullScreen handle={handle} />
    </div>
  );
}

export default fullSchreen;
