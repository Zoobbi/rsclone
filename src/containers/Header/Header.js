import React, { Component } from 'react';
import './Header.scss';
import Logo from '../components/UI/Logo/Logo';
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../components/Navigation/Drawer/Drawer';
import UserInfo from '../components/Navigation/UserInfo/UserInfo';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menu: false,
    };
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  handleKeyPress = (event) => {
    if (event.key === 'o') {
      this.toggleMenuHandler();
    }
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <header className="Header">
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          onKeyPress={this.handleKeyPress}
          isOpen={this.state.menu}
        />
        <Logo />
        <UserInfo />
      </header>
    );
  }
}

export default Header;
