import React, { Component } from 'react';
import './HomeWrapper.scss';
import { Redirect } from 'react-router-dom';
import { getCurrentLeague } from '../../../utils/Cookie/cookie';
import LeagueContent from '../LeagueContent/LeagueContent';

class HomeWrapper extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="HomeWrapper center">
        {getCurrentLeague()
          ? <Redirect to={`/leagues/detals?league_id=${getCurrentLeague()._id}`} />
          : <LeagueContent />}
      </div>
    );
  }
}

export default HomeWrapper;
