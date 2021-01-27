import React, { Component } from 'react';
import './Layount.scss';
import propTypes from 'prop-types';
/* import Button from '../../containers/components/UI/Button/Button'; */
import { connect } from 'react-redux';
import Header from '../../containers/Header/Header';
/* import Drawer from '../../containers/components/Navigation/Drawer/Drawer'; */

class Layout extends Component {
  render() {
    // console.log((store.getState().token.token));
    return (
      <div className="Layout">
        {/*  {store.getState().token ? <Header /> : null} */}
        {/* eslint-disable-next-line react/prop-types */}
        {Boolean(this.props.token.token) && <Header />}
        <main>
          { this.props.children }
        </main>

      </div>
    );
  }
}

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: propTypes.element,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(Layout);

/*
<Drawer
    isOpen={this.state.menu}
    onClose={this.menuCloseHandler}
/>
<MenuToggle
onToggle={this.toggleMenuHandler}
isOpen={this.state.menu}
/> */
