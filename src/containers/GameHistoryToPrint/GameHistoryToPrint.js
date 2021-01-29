import React, { Component } from 'react';
import './GameHistoryToPrint.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadGameFromDB } from '../../utils/redux/reducers/currentGame';
import getPercent from '../../utils/getPercent/getPercent';

class GameHistoryToPrint extends Component {
  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameId !== this.props.gameId) {
      const gameId = this.setKeyIfExist(this.props.gameId, 'game_id');
      this.props.fetchGameFromDB(gameId);
    }
  }

  setKeyIfExist = (queries, keyName, asName) => {
    if (queries[keyName] !== undefined) {
      this.setState({ [asName !== undefined ? asName : keyName]: queries[keyName] });
      return queries[keyName];
    } return undefined;
  };

  getTeamStats = (teamId) => this.props.currentGame.currentGame.players.map((player) => {
    if (teamId !== player.team) return null;

    return (
      <tr key={player._id + player.name}>
        <td className="text-center">
          {player.number}
        </td>
        <td className="name">
          {player.full}
          {player.start ? <i>*</i> : null}
        </td>
        <td className="text-center">
          {player.time_in_game}
        </td>
        <td className="text-center nowrap">
          {player.stats.total_shots.made}
          &nbsp; / &nbsp;
          {player.stats.total_shots.total}
        </td>
        <td className="text-center">
          {player.stats.total_shots.percent}
        </td>
        <td className="text-center nowrap">
          {player.stats.two_points.made}
          &nbsp; / &nbsp;
          {player.stats.two_points.total}
        </td>
        <td className="text-center">
          {player.stats.two_points.percent}
        </td>
        <td className="text-center nowrap">
          {player.stats.three_points.made}
          &nbsp; / &nbsp;
          {player.stats.three_points.total}
        </td>
        <td className="text-center">
          {player.stats.three_points.percent}
        </td>
        <td className="text-center nowrap">
          {player.stats.FT.made}
          &nbsp; / &nbsp;
          {player.stats.FT.total}
        </td>
        <td className="text-center">
          {player.stats.FT.percent}
        </td>
        <td className="text-center">
          {player.stats.rebound.offence.total}
        </td>
        <td className="text-center">
          {player.stats.rebound.defence.total}
        </td>
        <td className="text-center">
          {player.stats.rebound.total}
        </td>
        <td className="text-center">
          {player.stats.assists.total}
        </td>
        <td className="text-center">
          {player.stats.turnover.total}
        </td>
        <td className="text-center">
          {player.stats.steals.total}
        </td>
        <td className="text-center">
          {player.stats.blocks.total}
        </td>
        <td>
          {player.stats.fouls.take.total}
        </td>
        <td className="text-center">
          {player.stats.fouls.give.total}
        </td>
        <td className="text-center">
          {player.stats.points.total}
        </td>
      </tr>
    );
  })

  getTableHeaders = () => (
    <thead>
      <tr>
        <td rowSpan="2">№</td>
        <td rowSpan="2">Имя</td>
        <td rowSpan="2">Время</td>
        <td colSpan="2">С игры</td>
        <td colSpan="2">2</td>
        <td colSpan="2">3</td>
        <td colSpan="2">FT</td>
        <td colSpan="3">REB</td>
        <td rowSpan="2">AS</td>
        <td rowSpan="2">TO</td>
        <td rowSpan="2">ST</td>
        <td rowSpan="2">BS</td>
        <td colSpan="2">PF</td>
        <td rowSpan="2">PTS</td>
      </tr>
      <tr>
        <td>m/a</td>
        <td>%</td>
        <td>m/a</td>
        <td>%</td>
        <td>m/a</td>
        <td>%</td>
        <td>m/a</td>
        <td>%</td>
        <td>OR</td>
        <td>DR</td>
        <td>T</td>
        <td>T</td>
        <td>G</td>
      </tr>
    </thead>
  );

  showTeamStatsLine = (teamId) => {
    const isHomeTeam = this.props.currentGame.currentGame.team_home === teamId;
    const teamPlayers = this.props.currentGame.currentGame.players.filter((player) => teamId === player.team);
    const madeTotalShots = this.getTeamStatsLineItems(teamPlayers, 'total shots made')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const totalShots = this.getTeamStatsLineItems(teamPlayers, 'total shots total')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const madeTwoPointShots = this.getTeamStatsLineItems(teamPlayers, '2points shots made')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const totalTwoPointShots = this.getTeamStatsLineItems(teamPlayers, '2points shots total')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const madeThreePointShots = this.getTeamStatsLineItems(teamPlayers, '3points shots made')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const totalThreePointShots = this.getTeamStatsLineItems(teamPlayers, '3points shots total')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const madeFTShots = this.getTeamStatsLineItems(teamPlayers, 'FT shots made')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const totalFTShots = this.getTeamStatsLineItems(teamPlayers, 'FT shots total')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const offRebounds = this.getTeamStatsLineItems(teamPlayers, 'Off reb')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const defRebounds = this.getTeamStatsLineItems(teamPlayers, 'Off reb')
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const totalRebounds = offRebounds + defRebounds;

    return (
      <tr>
        <td colSpan="3">
          <strong>{isHomeTeam ? this.props.currentGame.currentGame.team_home_name : this.props.currentGame.currentGame.team_visit_name}</strong>
        </td>
        <td>
          {madeTotalShots}
          &nbsp;/&nbsp;
          {totalShots}
        </td>
        <td>
          {getPercent(madeTotalShots, totalShots)}
        </td>
        <td>
          {madeTwoPointShots}
          &nbsp;/&nbsp;
          {totalTwoPointShots}
        </td>
        <td>
          {getPercent(madeTwoPointShots, totalTwoPointShots)}
        </td>
        <td>
          {madeThreePointShots}
          &nbsp;/&nbsp;
          {totalThreePointShots}
        </td>
        <td>
          {getPercent(madeThreePointShots, totalThreePointShots)}
        </td>
        <td>
          {madeFTShots}
          &nbsp;/&nbsp;
          {totalFTShots}
        </td>
        <td>
          {getPercent(madeFTShots, totalFTShots)}
        </td>
        <td>{offRebounds}</td>
        <td>{defRebounds}</td>
        <td>{totalRebounds}</td>
        <td>{this.getTeamStatsLineItems(teamPlayers, 'assists').reduce((accumulator, currentValue) => accumulator + currentValue)}</td>
        <td>{this.getTeamStatsLineItems(teamPlayers, 'turnover').reduce((accumulator, currentValue) => accumulator + currentValue)}</td>
        <td>{this.getTeamStatsLineItems(teamPlayers, 'steals').reduce((accumulator, currentValue) => accumulator + currentValue)}</td>
        <td>{this.getTeamStatsLineItems(teamPlayers, 'blocks').reduce((accumulator, currentValue) => accumulator + currentValue)}</td>
        <td>{this.getTeamStatsLineItems(teamPlayers, 'fouls take').reduce((accumulator, currentValue) => accumulator + currentValue)}</td>
        <td>{this.getTeamStatsLineItems(teamPlayers, 'fouls give').reduce((accumulator, currentValue) => accumulator + currentValue)}</td>
        <td>{this.getTeamStatsLineItems(teamPlayers, 'points').reduce((accumulator, currentValue) => accumulator + currentValue)}</td>
      </tr>
    );
  }

  getTeamStatsLineItems = (teamPlayers, key) => {
    switch (key) {
      case 'total shots made':
        return teamPlayers.map((stat) => stat.stats.total_shots.made);
      case 'total shots total':
        return teamPlayers.map((stat) => stat.stats.total_shots.total);
      case '2points shots made':
        return teamPlayers.map((stat) => stat.stats.two_points.made);
      case '2points shots total':
        return teamPlayers.map((stat) => stat.stats.two_points.total);
      case '3points shots made':
        return teamPlayers.map((stat) => stat.stats.three_points.made);
      case '3points shots total':
        return teamPlayers.map((stat) => stat.stats.three_points.total);
      case 'FT shots made':
        return teamPlayers.map((stat) => stat.stats.FT.made);
      case 'FT shots total':
        return teamPlayers.map((stat) => stat.stats.FT.total);
      case 'Off reb':
        return teamPlayers.map((stat) => stat.stats.rebound.offence.total);
      case 'Def reb':
        return teamPlayers.map((stat) => stat.stats.rebound.defence.total);
      case 'assists':
        return teamPlayers.map((stat) => stat.stats.assists.total);
      case 'turnover':
        return teamPlayers.map((stat) => stat.stats.turnover.total);
      case 'steals':
        return teamPlayers.map((stat) => stat.stats.steals.total);
      case 'blocks':
        return teamPlayers.map((stat) => stat.stats.blocks.total);
      case 'fouls take':
        return teamPlayers.map((stat) => stat.stats.fouls.take.total);
      case 'fouls give':
        return teamPlayers.map((stat) => stat.stats.fouls.give.total);
      case 'points':
        return teamPlayers.map((stat) => stat.stats.points.total);
      default:
        break;
    }
    return 0;
  }

  render() {
    return (
        <section className="GameHistoryToPrint">
          <div className="GameHistoryToPrint-content">
            <h2>
              {this.props.currentGame.currentGame ? this.props.currentGame.currentGame.team_visit_name : 'Гости ' }
            &nbsp;
              {this.props.currentGame.currentGame ? this.props.currentGame.currentGame.score_visit : '0' }
            &nbsp;&nbsp;-&nbsp;&nbsp;
              {this.props.currentGame.currentGame ? this.props.currentGame.currentGame.score_home : '0' }
            &nbsp;
              {this.props.currentGame.currentGame ? this.props.currentGame.currentGame.team_home_name : 'Хозяева ' }
            </h2>
            <div className="GameHistoryToPrint-visit">
              <table>
                {this.getTableHeaders()}
                <tbody>
                  {this.props.currentGame.currentGame ? this.getTeamStats(this.props.currentGame.currentGame.team_visit) : null }
                  {this.props.currentGame.currentGame ? this.showTeamStatsLine(this.props.currentGame.currentGame.team_visit) : null }
                </tbody>
              </table>
            </div>
            <div className="GameHistoryToPrint-home" />
            <table>
              {this.getTableHeaders()}
              <tbody>
                {this.props.currentGame.currentGame ? this.getTeamStats(this.props.currentGame.currentGame.team_home) : null }
                {this.props.currentGame.currentGame ? this.showTeamStatsLine(this.props.currentGame.currentGame.team_home) : null }
              </tbody>
            </table>
          </div>
        </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchGameFromDB: (leagueID) => {
    dispatch(loadGameFromDB(leagueID));
  },
});

const mapStateToProps = (state) => ({
  currentLeague: state.currentLeague,
  currentGame: state.currentGame,
});

GameHistoryToPrint.defaultProps = {
  fetchGameFromDB: 'null',
  currentGame: [],
  gameId: undefined,
};

GameHistoryToPrint.propTypes = {
  fetchGameFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  currentGame: propTypes.object,
  gameId: propTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameHistoryToPrint);
