import React from 'react';
import './MenuToggle.scss';
import propTypes from 'prop-types';

const MenuToggle = (props) => {
  const cls = [
    'fa',
    'MenuToggle',
  ];

  if (props.isOpen) {
    cls.push('fa-times', 'open ');
  } else {
    cls.push('fa-bars');
  }
  return (
    <i
      role="button"
      tabIndex={0}
      aria-label="toggle menu"
      className={cls.join(' ')}
      onClick={props.onToggle}
      onKeyPress={props.handleKeyPress}
    />

  );
};

MenuToggle.defaultProps = {
  isOpen: false,
  onToggle: null,
  handleKeyPress: null,
};

MenuToggle.propTypes = {
  isOpen: propTypes.bool,
  onToggle: propTypes.func,
  handleKeyPress: propTypes.func,
};

export default MenuToggle;
