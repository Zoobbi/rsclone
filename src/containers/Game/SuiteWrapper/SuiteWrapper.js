import React from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import propTypes from 'prop-types';

export const SuiteWrapper = ({ children, fullscreenHandler, fullscreenOnChange }) => {
  const handle = useFullScreenHandle();

  fullscreenHandler(handle.enter);
  return (
    <div>
      <FullScreen
        onChange={fullscreenOnChange}
        handle={handle}
      >
        {children}
      </FullScreen>
    </div>
  );
};

SuiteWrapper.defaultProps = {
  children: undefined,
  fullscreenHandler: undefined,
  fullscreenOnChange: undefined,
};

SuiteWrapper.propTypes = {
  children: propTypes.element,
  // eslint-disable-next-line react/no-unused-prop-types
  fullscreenHandler: propTypes.func,
  fullscreenOnChange: propTypes.func,
};
