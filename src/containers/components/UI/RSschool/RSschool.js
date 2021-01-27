import React from 'react';
import './RSschool.scss';
import { Link } from 'react-router-dom';

const RSschool = () => (
  <div className="RSschool">
    <Link
      to="https://rs.school/js/"
    >
      <img src="/rs_school_js.svg" alt="logo" />
    </Link>
  </div>
);

export default RSschool;
