import React from 'react';
import './Edit.scss';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Edit = (props) => (
  <div
    className="edit-btn"
    role="button"
    tabIndex={0}
    aria-label="edit"
    onKeyPress={() => {}}
  >
    <Link
      to={props.path}
    >
      <img src="/edit.svg" alt="edit" />
    </Link>
  </div>
);

Edit.defaultProps = {
  path: '/',
};

Edit.propTypes = {
  path: propTypes.string,
};
export default Edit;
