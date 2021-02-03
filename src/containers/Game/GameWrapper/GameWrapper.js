import React, { Component } from 'react';
import './GameWrapper.scss';
import ChoiseTeam from '../ChoiseTeams/ChoiseTeam';

class GameWrapper extends Component {
  render() {
    return (
      <div className="GameWrapper">
        <ChoiseTeam />
      </div>
    );
  }
}

export default GameWrapper;
