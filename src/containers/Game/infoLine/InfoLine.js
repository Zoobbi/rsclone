import React from 'react';
import './infoLine.scss';
import propTypes from 'prop-types';

export const InfoLine = (props) => (
  <div className="InfoLine">
    <span>{props.message}</span>
  </div>
);

InfoLine.defaultProps = {
  message: '',
};

InfoLine.propTypes = {
  message: propTypes.string,
};
