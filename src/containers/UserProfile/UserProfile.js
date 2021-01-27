import React, { Component } from 'react';
import './UserProfile.scss';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentLeague, getUser, removeCurrentLeague, removeUser, removeUserToken,
} from '../../utils/Cookie/cookie';
import Button from '../components/UI/Button/Button';
import { store } from '../../utils/redux/store';
import { token } from '../../utils/redux/actions';
import { REMOVELEAGUE } from '../../utils/redux/actionTypes';

class UserProfile extends Component {
  logout = () => {
    removeUserToken();
    removeUser();
    store.dispatch(token(''));
    // eslint-disable-next-line react/prop-types
    this.props.history.push('/auth');
  };

  changeLeague = () => {
    removeCurrentLeague();
    this.props.removeCurrentLeague();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="UserProfile">
        <div className="UserProfile-content">
          <div>
            Имя:&nbsp;
            {getUser().name}
          </div>
          <div className="email">
            email:&nbsp;
            {getUser().email}
          </div>
          <div className="league">
            Лига:&nbsp;
            {this.props.currentLeague.currentLeague.name ? getCurrentLeague().name : 'Лига нет'}
          </div>
          <div className="avatar">
            <img src="/assets/avatars/avatar1.svg" alt="avatar" />
          </div>
          <Button
            type="register-black"
            OnBtnclick={this.changeLeague}
            disabled={false}
          >
            Сменить лигу
          </Button>
          <Button
            type="register-black"
            OnBtnclick={this.logout}
            disabled={false}
          >
            выйти
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeCurrentLeague: () => {
    dispatch({ type: REMOVELEAGUE });
  },
});

const mapStateToProps = (state) => ({
  currentLeague: state.currentLeague,
});

UserProfile.defaultProps = {
  history: null,
  removeCurrentLeague: null,
  currentLeague: {},
};

UserProfile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: propTypes.any,
  removeCurrentLeague: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  currentLeague: propTypes.object,
};
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(UserProfile);
