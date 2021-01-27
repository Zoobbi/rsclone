import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Drawer.scss';
import propTypes from 'prop-types';
import Backdrop from '../../UI/Backdrop/Backdrop';
import RSschool from '../../UI/RSschool/RSschool';
import Zoobbi from '../../UI/Zoobbi/Zoobbi';
import { getUser } from '../../../../utils/Cookie/cookie';

const links = [
  { to: '/', label: 'Главная', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/user', label: 'Пользователь', exact: false },
];

if (getUser().isAdmin) {
  links.push({ to: '/game', label: 'Игра', exact: false });
}

class Drawer extends Component {
    clickHandler = () => {
      this.props.onClose();
    }

    renderLinks = () => links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName="active"
          onClick={this.clickHandler}
        >
          {link.label}
        </NavLink>
      </li>
    ))

    render() {
      const cls = ['Drawer'];

      if (!this.props.isOpen) {
        cls.push('close');
      }

      return (
        <>
          <nav className={cls.join(' ')}>
            <ul>
              { this.renderLinks()}
            </ul>
            <div>
              <Zoobbi />
              <RSschool />
            </div>
          </nav>
          {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
        </>

      );
    }
}

Drawer.defaultProps = {
  onClose: null,
  isOpen: false,
};

Drawer.propTypes = {
  onClose: propTypes.func,
  isOpen: propTypes.bool,
};

export default Drawer;
