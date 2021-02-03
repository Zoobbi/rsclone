import React from 'react';
import './Input.scss';
import propTypes from 'prop-types';

function isInvalid({ valid, touched, shoudValidate }) {
  return !valid && shoudValidate && touched;
}

const Input = (props) => {
  const inputType = props.type || 'text';
  const cls = ['input'];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push('invalid');
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {isInvalid(props)
        ? <span>{props.errorMessage || 'введите верное значение'}</span>
        : null}

    </div>
  );
};

Input.defaultProps = {
  type: '',
  label: '',
  value: '',
  errorMessage: '',
  onChange: null,
};

Input.propTypes = {
  type: propTypes.string,
  label: propTypes.string,
  value: propTypes.string,
  errorMessage: propTypes.string,
  onChange: propTypes.func,
};

export default Input;
