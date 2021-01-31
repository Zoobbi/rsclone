import React, { Component } from 'react';
import './Layount.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../containers/Header/Header';
import { getUser } from '../../utils/Cookie/cookie';

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        {/* eslint-disable-next-line react/prop-types */}
        {Boolean(this.props.token.token) && <Header />}
        <main style={getUser() ? null : { minHeight: '100vh' }}>
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
