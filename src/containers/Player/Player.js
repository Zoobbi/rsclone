import React, { Component } from 'react';
import './Player.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { parseAddresse } from '../../utils/makeAdress/makeAdress';
import { loadPlayerFromDB } from '../../utils/redux/reducers/currentPlayer';

class Player extends Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: undefined,
    };
  }

  componentDidMount() {
    const queries = parseAddresse(this.props);
    const playerId = this.setKeyIfExist(queries, 'player_id');
    this.props.fetchPlayerFromDB(playerId);
  }

  setKeyIfExist = (queries, keyName, asName) => {
    if (queries[keyName] !== undefined) {
      this.setState({ [asName !== undefined ? asName : keyName]: queries[keyName] });
      return queries[keyName];
    } return undefined;
  };

  isCurrentPlayer = () => !!this.props.currentPlayer.currentPlayer;

  render() {
    const player = this.isCurrentPlayer() ? this.props.currentPlayer.currentPlayer : null;
    return (
      <section className="Player">
        <div className="Player-team">
          <h2>{player ? player.name.full : 'Игрок'}</h2>
          <div className="Player-team-img-wrap">
            <div className="Player-number">
              {player ? player.number : '№'}
            </div>
            <img src="/basketball-jersey.svg" alt="jersey" />
          </div>
          <p>
            &quot;
            {player ? player.team.name : 'Команда'}
            &quot;
          </p>
        </div>

        <div className="Player-stats-container">
          <table className="Player-stats-metric">
            <thead>
              <tr>
                <td title="Очки">pts</td>
                <td title="Подборы в защите">dr</td>
                <td title="Подборы в нападении">or</td>
                <td title="Подборы">reb</td>
                <td title="Передачи">ast</td>
                <td title="Перехваты">stl</td>
                <td title="Блокшоты">blk</td>
                <td title="Потери">to</td>
                <td title="Получено фолов игроком">gpf</td>
                <td title="Получено фолов на игроке">tpf</td>
                <td title="Соотношение передач к потерям">ast/to</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{player ? player.stats.points.total : '-'}</td>
                <td>{player ? player.stats.rebound.defence.total : '-'}</td>
                <td>{player ? player.stats.rebound.offence.total : '-'}</td>
                <td>{player ? player.stats.rebound.total : '-'}</td>
                <td>{player ? player.stats.assists.total : '-'}</td>
                <td>{player ? player.stats.steals.total : '-'}</td>
                <td>{player ? player.stats.blocks.total : '-'}</td>
                <td>{player ? player.stats.turnover.total : '-'}</td>
                <td>{player ? player.stats.fouls.take.total : '-'}</td>
                <td>{player ? player.stats.fouls.give.total : '-'}</td>
                <td>{player ? player.stats.assists.ast_to_to : '-'}</td>
              </tr>
              <tr>
                <td>{player ? player.stats.points.per_game : '-'}</td>
                <td>{player ? player.stats.rebound.defence.per_game : '-'}</td>
                <td>{player ? player.stats.rebound.offence.per_game : '-'}</td>
                <td>{player ? player.stats.rebound.per_game : '-'}</td>
                <td>{player ? player.stats.assists.per_game : '-'}</td>
                <td>{player ? player.stats.steals.per_game : '-'}</td>
                <td>{player ? player.stats.blocks.per_game : '-'}</td>
                <td>{player ? player.stats.turnover.per_game : '-'}</td>
                <td>{player ? player.stats.fouls.take.per_game : '-'}</td>
                <td>{player ? player.stats.fouls.give.per_game : '-'}</td>
                <td>{player ? player.stats.assists.ast_to_to : '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="Player-stats-shoot">
          <thead>
            <tr>
              <td colSpan="4">2 pts</td>
              <td colSpan="4">3 pts</td>
              <td colSpan="4">ft</td>
            </tr>
            <tr>
              <td>total</td>
              <td>made</td>
              <td>miss</td>
              <td>percent</td>
              <td>total</td>
              <td>made</td>
              <td>miss</td>
              <td>percent</td>
              <td>total</td>
              <td>made</td>
              <td>miss</td>
              <td>percent</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{player ? player.stats.two_points.total : '-'}</td>
              <td>{player ? player.stats.two_points.made : '-'}</td>
              <td>{player ? player.stats.two_points.missed : '-'}</td>
              <td>{player ? player.stats.two_points.percent : '-'}</td>
              <td>{player ? player.stats.three_points.total : '-'}</td>
              <td>{player ? player.stats.three_points.made : '-'}</td>
              <td>{player ? player.stats.three_points.missed : '-'}</td>
              <td>{player ? player.stats.three_points.percent : '-'}</td>
              <td>{player ? player.stats.FT.total : '-'}</td>
              <td>{player ? player.stats.FT.made : '-'}</td>
              <td>{player ? player.stats.FT.missed : '-'}</td>
              <td>{player ? player.stats.FT.percent : '-'}</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

Player.defaultProps = {
  fetchPlayerFromDB: null,
  currentPlayer: null,
};

Player.propTypes = {
  fetchPlayerFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  currentPlayer: propTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  fetchPlayerFromDB: (id) => {
    dispatch(loadPlayerFromDB(id));
  },
});

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
