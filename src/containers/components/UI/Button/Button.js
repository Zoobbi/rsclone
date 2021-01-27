import React from 'react';
import './Button.scss';
import propTypes from 'prop-types';

const Button = (props) => {
  const cls = ['button', props.type];

  return (
    <button
      type={props.buttonType}
      className={cls.join(' ')}
      onClick={props.OnBtnclick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  type: '',
  OnBtnclick: null,
  disabled: true,
  buttonType: 'button',
  children: null,
};

Button.propTypes = {
  type: propTypes.string,
  disabled: propTypes.bool,
  buttonType: propTypes.string,
  OnBtnclick: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: propTypes.any,
};

export default Button;
