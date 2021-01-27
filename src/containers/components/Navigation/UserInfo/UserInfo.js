import React, { Component } from 'react';
import './UserInfo.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCurrentLeague, getUser } from '../../../../utils/Cookie/cookie';

class UserInfo extends Component {
  getLeagueName = () => {
    if (this.props.currentLeague.currentLeague.name) {
      return this.props.currentLeague.currentLeague.name;
    } if (getCurrentLeague()) {
      return getCurrentLeague().name;
    }
    return 'лига не выбрана';
  };

  render() {
    const userName = getUser() ? getUser().name : 'имя';
    const leagueName = this.getLeagueName();
    return (
      <div className="UserInfo">
        <div className="">
          <div className="UserInfo-name">
            {userName}
          </div>
          <div className="UserInfo-league">
            {leagueName}
          </div>
        </div>
        <div className="UserInfo-avatar">
          <Link to="/user">
            <img src="/assets/avatars/avatar1.svg" alt="avatar" />
          </Link>
        </div>
      </div>
    );
  }
}

UserInfo.defaultProps = {
  currentLeague: undefined,
};

UserInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentLeague: propTypes.object,
};

const mapStateToProps = (state) => ({
  currentLeague: state.currentLeague,
});

export default connect(mapStateToProps, null)(UserInfo);
