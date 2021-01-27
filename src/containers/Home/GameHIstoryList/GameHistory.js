import React, { Component } from 'react';
import './GameHistory.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { loadGamesFromDB } from '../../../utils/redux/reducers/games';

class GameHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      league_id: undefined,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.league_id !== prevProps.league_id) {
      this.props.fetchGamesFromDB(this.props.league_id);
    }
  }

  showGamesList = () => this.props.games.games.map((game) => {
    const date = new Date(game.date);
    return (
      <li key={game._id + Math.random()} className="GameHistoryAll-item">
        <Link to={`/games/detals?game_id=${game._id}`}>
          <span className="GameHistoryAll-teams">
            {game.team_visit_name}
            {' '}
            -
            {' '}
            {game.team_home_name}
          </span>
          <span className="GameHistoryAll-date">{`${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`}</span>
        </Link>
      </li>
    );
  })

  render() {
    return (
      <div className="GameHistoryAll">
        <h2>Game History</h2>
        <ul className="GameHistory-list">
          {this.props.games.games ? this.showGamesList() : null}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchGamesFromDB: (leagueID) => {
    dispatch(loadGamesFromDB(leagueID));
  },
});

const mapStateToProps = (state) => ({
  teams: state.teams,
  games: state.games,
  currentLeague: state.currentLeague,
});

GameHistory.defaultProps = {
  league_id: undefined,
  fetchGamesFromDB: 'null',
  games: [],
};

GameHistory.propTypes = {
  league_id: propTypes.string,
  fetchGamesFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  games: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameHistory);
