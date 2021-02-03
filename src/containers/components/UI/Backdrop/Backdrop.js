import React from 'react';
import './Backdrop.scss';
import propTypes from 'prop-types';

const Backdrop = (props) => (
  <div
    role="button"
    tabIndex={0}
    aria-label="toggle menu"
    className="Backdrop"
    onClick={props.onClick}
    onKeyPress={props.handleKeyPress}
  />
);

Backdrop.defaultProps = {
  onClick: null,
  handleKeyPress: null,
};

Backdrop.propTypes = {
  onClick: propTypes.func,
  handleKeyPress: propTypes.func,
};
export default Backdrop;
