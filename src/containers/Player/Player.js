import React, { Component } from 'react';
import './Player.scss';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { parseAddresse } from '../../utils/makeAdress/makeAdress';
import { loadPlayerFromDB } from '../../utils/redux/reducers/currentPlayer';
import Playground from './Playground/Playground';

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

  getStat = (title, ABBR, total, perGame) => (
    <div className="Player-stats-item">
      <div title={title} className="ABBR">{ABBR}</div>
      <div title="Всего" className="total">{total}</div>
      <div title="За игру" className="per_game">{perGame}</div>
    </div>
  );

  getShootingStat = (title, ABBR, stat) => {
    let statPath = '-';
    if (this.isCurrentPlayer()) {
      statPath = this.props.currentPlayer.currentPlayer.stats[stat];
    }
    return (
      <div>
        <div className="Player-stats-shoot_item">
          <div title={title} className="ABBR">{ABBR}</div>
          <div className="content">
            <div className="item-wrapper">
              <div title="Всего" className="total">total</div>
              <div title="Всего" className="total">{statPath.total}</div>
            </div>
            <div className="item-wrapper">
              <div title="Забито" className="made">made</div>
              <div title="Забито" className="made">{statPath.made}</div>
            </div>
            <div className="item-wrapper">
              <div title="Промазано" className="miss">miss</div>
              <div title="Промазано" className="miss">{statPath.missed}</div>
            </div>
            <div className="item-wrapper">
              <div title="Процент попадания" className="percent">percent</div>
              <div title="Процент попадания" className="percent">{statPath.percent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          <div>
            Игр сыграно:&nbsp;
            {player ? player.stats.game_played : '-'}
          </div>
          <div>
            Игр в старте:&nbsp;
            {player ? player.stats.game_started : '-'}
          </div>
        </div>
        <div className="Player-stats-container">
          {this.getStat('Очки', 'pts', (player ? player.stats.points.total : '-'), (player ? player.stats.points.per_game : '-'))}
          {this.getStat('Подборы в защите', 'dr',
            (player ? player.stats.rebound.defence.total : '-'), (player ? player.stats.rebound.defence.per_game : '-'))}
          {this.getStat('Подборы в нападении', 'or',
            (player ? player.stats.rebound.offence.total : '-'), (player ? player.stats.rebound.offence.per_game : '-'))}
          {this.getStat('Подборы', 'reb', (player ? player.stats.rebound.total : '-'), (player ? player.stats.rebound.per_game : '-'))}
          {this.getStat('Передачи', 'ast', (player ? player.stats.assists.total : '-'), (player ? player.stats.assists.per_game : '-'))}
          {this.getStat('Перехваты', 'stl', (player ? player.stats.steals.total : '-'), (player ? player.stats.steals.per_game : '-'))}
          {this.getStat('Блокшоты', 'blk', (player ? player.stats.blocks.total : '-'), (player ? player.stats.blocks.per_game : '-'))}
          {this.getStat('Потери', 'to', (player ? player.stats.turnover.total : '-'), (player ? player.stats.turnover.per_game : '-'))}
          {this.getStat('Получено фолов игроком', 'gpf',
            (player ? player.stats.fouls.give.total : '-'), (player ? player.stats.fouls.give.per_game : '-'))}
          {this.getStat('Получено фолов на игроке', 'tpf',
            (player ? player.stats.fouls.take.total : '-'), (player ? player.stats.fouls.take.per_game : '-'))}
          {this.getStat('Соотношение передач к потерям', 'ast/to', (player ? player.stats.assists.ast_to_to : '-'),
            ('-'))}
          {this.getStat(
            '(Очки + Подборы + Передачи + Перехваты + Блоки + Фолы на себе) - (Промахи с игры + Промахи со штрафной + Потери +  Фолы свои)',
            'pir', (player ? player.stats.PIR : '-'),
            ('-'),
          )}
        </div>
        <div className="Player-stats-shoot-wrapper">
          {this.getShootingStat('2-x очковые', '2 pts', 'two_points')}
          {this.getShootingStat('3-x очковые', '3 pts', 'three_points')}
          {this.getShootingStat('штрафные', 'ft', 'FT')}
        </div>
        <Playground
          player={this.isCurrentPlayer() ? this.props.currentPlayer.currentPlayer : undefined}
        />
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
