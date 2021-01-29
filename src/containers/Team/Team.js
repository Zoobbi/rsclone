/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import './Team.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { parseAddresse } from '../../utils/makeAdress/makeAdress';
import { loadTeamFromDB } from '../../utils/redux/reducers/currentTeam';
import { getUser } from '../../utils/Cookie/cookie';
import Button from '../components/UI/Button/Button';
import Edit from '../components/UI/Edit/Edit';
import Delete from '../components/UI/Delete/Delete';
import { removePlayer } from '../../utils/API/api';

class Team extends Component {
  constructor() {
    super();
    this.state = {
      players: undefined,
    };
  }

  componentDidMount() {
    const queries = parseAddresse(this.props);
    const teamId = this.setKeyIfExist(queries, 'team_id');
    this.props.fetchTeamFromDB(teamId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentTeam !== prevProps.currentTeam) {
      this.sortPlayer('NAME');
    }
  }

  removePlayer = (id) => {
    removePlayer(id);
  }

  setKeyIfExist = (queries, keyName, asName) => {
    if (queries[keyName] !== undefined) {
      this.setState({ [asName !== undefined ? asName : keyName]: queries[keyName] });
      return queries[keyName];
    } return undefined;
  };

  getPlayerTableItem = () => {
    const { players } = this.state;
    const list = players.map((player, index) => (
      <tr
        key={player._id + index}
      >
        <td>
          <Link to={`/players/detals?player_id=${player._id}`}>
            {player.name.full}
          </Link>
        </td>
        <td>{player.number}</td>
        <td>{player.stats.game_played}</td>
        <td>{player.stats.game_started}</td>
        <td>{player.stats.points.per_game}</td>
        <td>{player.stats.rebound.per_game}</td>
        <td>{player.stats.assists.per_game}</td>
        {
          getUser().isAdmin
            ? (
              <div className="flex">
                <Edit
                  path={`/player_patch/detals?player_id=${player._id}`}
                />
                <Delete
                  deleteItem={player.name.full}
                  onDelete={() => this.removePlayer(player._id)}
                />
              </div>
            )
            : null
        }
      </tr>
    ));
    return list;
  }

  sortPlayer = (category) => {
    const { players } = this.props.currentTeam.currentTeam;
    this.setState({ players });
    switch (category) {
      case 'NAME':
        players.sort((a, b) => {
          if (a.name.full < b.name.full) return -1;
          if (b.name.full < a.name.full) return 1;
          return 0;
        });
        break;
      case 'NUMBER':
        players.sort((a, b) => a.number - b.number);
        break;
      case 'GAMEPLAYED':
        players.sort((a, b) => b.stats.game_played - a.stats.game_played);
        break;
      case 'GAMESTARTED':
        players.sort((a, b) => b.stats.game_started - a.stats.game_started);
        break;
      case 'POINTS':
        players.sort((a, b) => parseFloat(b.stats.points.per_game) - parseFloat(a.stats.points.per_game));
        break;
      case 'REBOUNDS':
        players.sort((a, b) => parseFloat(b.stats.rebound.per_game) - parseFloat(a.stats.rebound.per_game));
        break;
      case 'ASSISTS':
        players.sort((a, b) => parseFloat(b.stats.assists.per_game) - parseFloat(a.stats.assists.per_game));
        break;
      default:
        return false;
    }
    this.setState({ players });
    return false;
  };

  render() {
    return (
      <section className="Team">
        <h2>{this.props.currentTeam.currentTeam ? this.props.currentTeam.currentTeam.name : 'Команда'}</h2>
        <div className="Team-game-store">
          <ul className="Team-game-store-list">
            <li className="Team-game-store-item">
              Всего:&nbsp;
              <span>{this.props.currentTeam.currentTeam ? this.props.currentTeam.currentTeam.game.played : 0}</span>
            </li>
            <li className="Team-game-store-item">
              Выиграно:&nbsp;
              <span>{this.props.currentTeam.currentTeam ? this.props.currentTeam.currentTeam.game.win : 0}</span>
            </li>
            <li className="Team-game-store-item">
              Проиграно:&nbsp;
              <span>{this.props.currentTeam.currentTeam ? this.props.currentTeam.currentTeam.game.loss : 0}</span>
            </li>
          </ul>
        </div>
        <div className="Team-table-wrapper">
          <table className="Team-players-table">
            <thead>
              <tr className="Team-players-head-tr">
                <td>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="edit"
                    onClick={this.sortPlayer.bind(this, 'NAME')}
                  >
                    Игрок
                  </span>
                </td>
                <td>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="edit"
                    onClick={this.sortPlayer.bind(this, 'NUMBER')}
                  >
                    Номер
                  </span>
                </td>
                <td>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="edit"
                    onClick={this.sortPlayer.bind(this, 'GAMEPLAYED')}
                  >
                    Игр сыграно
                  </span>
                </td>
                <td>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="edit"
                    onClick={this.sortPlayer.bind(this, 'GAMESTARTED')}
                  >
                    Игр в старте
                  </span>
                </td>
                <td>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="edit"
                    onClick={this.sortPlayer.bind(this, 'POINTS')}
                  >
                    Очки
                  </span>
                </td>
                <td>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="edit"
                    onClick={this.sortPlayer.bind(this, 'REBOUNDS')}
                  >
                    Подборы
                  </span>
                </td>
                <td>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="edit"
                    onClick={this.sortPlayer.bind(this, 'ASSISTS')}
                  >
                    Передачи
                  </span>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.players ? this.getPlayerTableItem() : null}
            </tbody>
          </table>
        </div>
        {getUser() && getUser().isAdmin
          ? (
            <Button
              type="register-black"
              disabled={false}
            >
              <NavLink
                className="newLeagueBtn"
                to="/player_create"
              >
                Добавить игрока
              </NavLink>
            </Button>
          )
          : null}
      </section>
    );
  }
}

Team.defaultProps = {
  fetchTeamFromDB: null,
  currentTeam: null,
};

Team.propTypes = {
  fetchTeamFromDB: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  currentTeam: propTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  fetchTeamFromDB: (id) => {
    dispatch(loadTeamFromDB(id));
  },
});

const mapStateToProps = (state) => ({
  currentTeam: state.currentTeam,
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
