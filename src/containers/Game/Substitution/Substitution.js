import React, { Component } from 'react';
import './Substitution.scss';
import propTypes from 'prop-types';

class Substitution extends Component {
  componentDidMount() {
    this.showPlayers();
  }

  getSubsClasses = () => {
    const cls = ['Substitution', this.props.location, this.props.isShow];

    return cls;
  }

  showPlayers = () => this.props.players.map((player) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      key={player._id + Math.random()}
      role="button"
      className="Substitution-players"
      tabIndex={0}
      aria-label="player"
      onClick={() => { this.props.onSubsPlayer(player); }}
    >
      {player.name.full}
    </div>
  ))

  render() {
    return (
      // eslint-disable-next-line react/prop-types
      <div className={this.getSubsClasses().join(' ')}>
        {this.showPlayers()}
      </div>
    );
  }
}

Substitution.defaultProps = {
  location: 'left',
  players: [],
  isShow: '',
  onSubsPlayer: null,
};

Substitution.propTypes = {
  location: propTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  players: propTypes.array,
  isShow: propTypes.string,
  onSubsPlayer: propTypes.func,
};

export default Substitution;
