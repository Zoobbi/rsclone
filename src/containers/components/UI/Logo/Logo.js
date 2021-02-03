import React from 'react';
import './Logo.scss';
import { Link } from 'react-router-dom';

const Logo = () => (
  <div className="Logo">
    <Link
      to="/"
    >
      <img src="/logo.svg" alt="logo" />
    </Link>
  </div>
);

export default Logo;
