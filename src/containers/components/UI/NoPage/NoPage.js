import React from 'react';
import './NoPage.scss';
import { Link } from 'react-router-dom';
import Background from '../../../../assets/404.jpg';

export const NoPage = () => (
  <div className="NoPage" style={{ backgroundImage: `url(${Background})` }}>
    <div className="NoPage-content">
      <div className="err404">404</div>
      <div className="description">Страница недоступна</div>
      <div>
        <Link to="/">на главную</Link>
      </div>
    </div>
  </div>
);
