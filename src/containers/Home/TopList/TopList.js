import React, { Component } from 'react';
import './TopList.scss';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import index from 'radium/es/plugins';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/UI/Loader/Loader';

class TopList extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      category: 'points',
    };
  }

  componentDidMount() {
    if (this.props.teams.teams.length > 0) {
      this.getAllPlayers();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.teams !== prevProps.teams && this.props.teams.teams.length) {
      this.getAllPlayers();
    }
    if (this.state.players !== prevState.players) {
      this.sortTopPlayers();
    }
  }

  getAllPlayers = () => {
    const players = [];
    this.props.teams.teams.forEach((team) => {
      players.push(...team.players);
    });
    this.setState({ players });
  };

  sortTopPlayers = () => {
    const { category } = this.state;
    let { players } = this.state;
    players = players.sort((a, b) => parseFloat(b.stats[category].per_game) - parseFloat(a.stats[category].per_game));
    return players;
  };

  showTopList = () => {
    const players = this.sortTopPlayers();
    const topPlayers = players.slice(0, 5);
    const { category } = this.state;
    const result = topPlayers.map((player) => (
      <tr
        key={player._id + index}
      >
        <td><Link to={`/players/detals?player_id=${player._id}`}>{player.name.full}</Link></td>
        <td>{player.stats[category].per_game}</td>
        <td>{player.stats[category].total}</td>
      </tr>
    ));
    return result;
  };

  changeTopCaterogy = (category) => {
    this.setState({ category });
  };

  render() {
    return (
      <div className="TopList">
        <h2>TOP</h2>
        <span>Категория:</span>
        <select className="TopList-select" name="selectTop" id="selectTop" onChange={(e) => this.changeTopCaterogy(e.target.value)}>
          <option value="points">очки</option>
          <option value="rebound">подборы</option>
          <option value="assists">передачи</option>
          <option value="steals">перехваты</option>
          <option value="blocks">блоки</option>
          <option value="turnover">потери</option>
        </select>
        {
          this.props.teams.teams
            ? (
              <table className="TopList-table">
                <thead>
                  <tr>
                    <td>Игрок</td>
                    <td>за игру</td>
                    <td>всего</td>
                  </tr>
                </thead>
                <tbody>
                  {this.showTopList()}
                </tbody>
              </table>
            )
            : <Loader />
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teams: state.teams,
});

TopList.defaultProps = {
  teams: [],
};

TopList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  teams: propTypes.any,
};

export default connect(mapStateToProps)(TopList);
