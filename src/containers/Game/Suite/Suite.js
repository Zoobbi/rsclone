import React, { Component } from 'react';
import './Suite.scss';
import propTypes from 'prop-types';
import Timer from '../Timer/Timer';
import Playground from '../Playground/Playground';
import Button from '../../components/UI/Button/Button';
import { createGame } from '../../../utils/API/api';
import { getCurrentLeague } from '../../../utils/Cookie/cookie';
import { store } from '../../../utils/redux/store';
import { info } from '../../../utils/redux/actions';

const actions = [
  {
    text: 'FT Made',
    key: 'FTMade',
    title: 'штрафной забит',
  },
  {
    text: 'FT Miss',
    key: 'FTmiss',
    title: 'штрафной не забит',
  },
  {
    text: 'Off Rebound',
    key: 'OR',
    title: 'подбор в нападении',
  },
  {
    text: 'Def Rebound',
    key: 'DR',
    title: 'подбор в защите',
  },
  {
    text: 'Assist',
    key: 'AS',
    title: 'передача',
  },
  {
    text: 'Steal',
    key: 'ST',
    title: 'перехват',
  },
  {
    text: 'Block',
    key: 'BLK',
    title: 'блокшот',
  },
  {
    text: 'Turnover',
    key: 'TO',
    title: 'потеря',
  },
  {
    text: 'Foul give',
    key: 'PFG',
    title: 'фол получен',
  },
  {
    text: 'Foul take',
    key: 'PFT',
    title: 'фол заработан',
  },
];

class Suite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitTeamFoul: 0,
      homeTeamFoul: 0,
      visitTimeout: 0,
      homeTimeout: 0,
      visitScore: 0,
      homeScore: 0,
      selectedPlayer: undefined,
      isShiftMode: false,
    };
    this.playersGameProgress = [];
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    window.addEventListener('resize', this.checkMinWidth);
    this.getPlayersForGame();
    this.checkMinWidth();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
    window.removeEventListener('resize', this.checkMinWidth);
  }

  checkMinWidth = () => {
    if (window.innerWidth < 1024) {
      localStorage.setItem('info', 'Маленький размер экрана');
      store.dispatch(info('Маленький размер экрана', false));
    }
  }

  getActivePlayer = () => this.playersGameProgress.find((player) => player._id === this.state.selectedPlayer._id)

   isStartPlayer = (player) => {
     if (this.props.startLineHome.find((item) => item._id === player._id)) {
       return true;
     }
     return !!this.props.startLineVisit.find((item) => item._id === player._id);
   }

  getPlayersForGame = () => {
    this.playersGameProgress = this.props.homeTeam[0].players.map((player) => ({
      _id: player._id,
      full: player.name.full,
      time_in_game: '21:12',
      team: this.props.homeTeam[0]._id,
      start: this.isStartPlayer(player),
      number: player.number,
      stats: {
        points: {
          total: 0,
        },
        rebound: {
          defence: {
            total: 0,
          },
          offence: {
            total: 0,
          },
        },
        assists: {
          total: 0,
        },
        steals: {
          total: 0,
        },
        blocks: {
          total: 0,
        },
        turnover: {
          total: 0,
        },
        fouls: {
          take: {
            total: 0,
          },
          give: {
            total: 0,
          },
        },
        FT: {
          total: 0,
          made: 0,
        },
        two_points: {
          total: 0,
          made: 0,
        },
        three_points: {
          total: 0,
          made: 0,
        },
        zones: {
          paint: {
            total: 0,
            made: 0,
          },
          left_two: {
            total: 0,
            made: 0,
          },
          right_two: {
            total: 0,
            made: 0,
          },
          left_two_45deg: {
            total: 0,
            made: 0,
          },
          right_two_45deg: {
            total: 0,
            made: 0,
          },
          center_two: {
            total: 0,
            made: 0,
          },
          left_three: {
            total: 0,
            made: 0,
          },
          right_three: {
            total: 0,
            made: 0,
          },
          left_three_45deg: {
            total: 0,
            made: 0,
          },
          right_three_45deg: {
            total: 0,
            made: 0,
          },
          center_three: {
            total: 0,
            made: 0,
          },
        },
      },
    }));
    this.playersGameProgress = this.playersGameProgress.concat(this.props.visitTeam[0].players.map((player) => ({
      _id: player._id,
      full: player.name.full,
      time_in_game: '21:12',
      team: this.props.visitTeam[0]._id,
      start: this.isStartPlayer(player),
      number: player.number,
      stats: {
        points: {
          total: 0,
        },
        rebound: {
          defence: {
            total: 0,
          },
          offence: {
            total: 0,
          },
        },
        assists: {
          total: 0,
        },
        steals: {
          total: 0,
        },
        blocks: {
          total: 0,
        },
        turnover: {
          total: 0,
        },
        fouls: {
          take: {
            total: 0,
          },
          give: {
            total: 0,
          },
        },
        FT: {
          total: 0,
          made: 0,
        },
        two_points: {
          total: 0,
          made: 0,
        },
        three_points: {
          total: 0,
          made: 0,
        },
        zones: {
          paint: {
            total: 0,
            made: 0,
          },
          left_two: {
            total: 0,
            made: 0,
          },
          right_two: {
            total: 0,
            made: 0,
          },
          left_two_45deg: {
            total: 0,
            made: 0,
          },
          right_two_45deg: {
            total: 0,
            made: 0,
          },
          center_two: {
            total: 0,
            made: 0,
          },
          left_three: {
            total: 0,
            made: 0,
          },
          right_three: {
            total: 0,
            made: 0,
          },
          left_three_45deg: {
            total: 0,
            made: 0,
          },
          right_three_45deg: {
            total: 0,
            made: 0,
          },
          center_three: {
            total: 0,
            made: 0,
          },
        },
      },
    })));
  }

  isPlayerSelected = () => this.state.selectedPlayer !== undefined;

  keyDownHandler = (e) => {
    if (e.keyCode === 16) {
      this.setState({
        isShiftMode: true,
      });
    }
  }

  keyUpHandler = (e) => {
    if (e.keyCode === 16) {
      this.setState({
        isShiftMode: false,
      });
    }
  }

  showTeamFouls = (isHomeTeam) => {
    const fouls = [1, 2, 3, 4, 5];
    let iterator = isHomeTeam ? this.state.homeTeamFoul : this.state.visitTeamFoul;

    return fouls.map((foul, index) => {
      iterator--;
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          key={index * Math.random()}
          className={`Suite-team-fouls-item ${iterator >= 0 ? 'active' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="toggle menu"
          title="командные фолы"
          onClick={this.setTeamFouls.bind(this, isHomeTeam, index + 1)}
        >
          {foul}
        </div>
      );
    });
  }

  showTimeouts = (isHomeTeam) => {
    const timeouts = [1, 2, 3];
    let iterator = isHomeTeam ? this.state.homeTimeout : this.state.visitTimeout;

    return timeouts.map((foul, index) => {
      iterator--;
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          key={index * Math.random()}
          className={`Suite-team-timeouts-item ${iterator >= 0 ? 'active' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="team timeouts"
          onClick={this.setTimeouts.bind(this, isHomeTeam, index + 1)}
          title="таймаут"
        />
      );
    });
  }

  setTeamFouls = (isHomeTeam, foulCount) => {
    if (isHomeTeam) {
      this.setState({
        homeTeamFoul: foulCount,
      });
    } else {
      this.setState({
        visitTeamFoul: foulCount,
      });
    }
  }

  setTimeouts = (isHomeTeam, timeoutCount) => {
    if (isHomeTeam) {
      this.setState({
        homeTimeout: timeoutCount,
      });
    } else {
      this.setState({
        visitTimeout: timeoutCount,
      });
    }
  }

  resetTimeouts = (isHomeTeam) => {
    if (isHomeTeam) {
      this.setState({
        homeTimeout: 0,
      });
    } else {
      this.setState({
        visitTimeout: 0,
      });
    }
  }

  resetTeamFouls = (isHomeTeam) => {
    if (isHomeTeam) {
      this.setState({
        homeTeamFoul: 0,
      });
    } else {
      this.setState({
        visitTeamFoul: 0,
      });
    }
  }

  selectedPlayerHandler = (player) => this.setState({
    selectedPlayer: this.isPlayerSelected() && this.state.selectedPlayer._id === player._id ? undefined : player,
  });

  showStartLines = (isHomeTeam) => {
    const players = isHomeTeam ? this.props.startLineHome : this.props.startLineVisit;

    return players.map((player, index) => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        key={player._id + Math.random()}
        role="button"
        tabIndex={0}
        aria-label="player"
        className={`Suite-player-ingame ${(this.isPlayerSelected() && this.state.selectedPlayer._id === player._id) ? 'active' : ''}`}
        title={`клавиша: ${index + 1}`}
        onClick={this.selectedPlayerHandler.bind(this, player)}
      >
        <div>
          {player.name.last_name}
        </div>
        <div>
          {player.number}
        </div>
      </div>
    ));
  };

  shootSectorHandler = (sectorId) => {
    if (this.isPlayerSelected()) {
      const isHomeTeam = this.props.homeTeam[0].players.find((player) => this.state.selectedPlayer._id === player._id) !== undefined;
      const pointsDiff = sectorId < 7 ? 2 : 3;
      const activePlayer = this.getActivePlayer();

      if (!this.state.isShiftMode) {
        if (isHomeTeam) {
          const points = this.state.homeScore + pointsDiff;

          this.setState({
            homeScore: points,
          });
        } else {
          const points = this.state.visitScore + pointsDiff;

          this.setState({
            visitScore: points,
          });
        }
      }

      switch (sectorId) {
        case 1:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.paint.total += 1;
            activePlayer.stats.zones.paint.made += 1;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.paint.total += 1;
          }
          break;
        case 2:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.left_two.total += 1;
            activePlayer.stats.zones.left_two.made += 1;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.left_two.total += 1;
          }
          break;
        case 3:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.right_two.total += 1;
            activePlayer.stats.zones.right_two.made += 1;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.right_two.total += 1;
          }
          break;
        case 4:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.left_two_45deg.total += 1;
            activePlayer.stats.zones.left_two_45deg.made += 1;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.left_two_45deg.total += 1;
          }
          break;
        case 5:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.center_two.total += 1;
            activePlayer.stats.zones.center_two.made += 1;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.center_two.total += 1;
          }
          break;
        case 6:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.right_two_45deg.total += 1;
            activePlayer.stats.zones.right_two_45deg.made += 1;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.right_two_45deg.total += 1;
          }
          break;
        case 7:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.left_three.total += 1;
            activePlayer.stats.zones.left_three.made += 1;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.left_three.total += 1;
          }
          break;
        case 8:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.left_three_45deg.total += 1;
            activePlayer.stats.zones.left_three_45deg.made += 1;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.left_three_45deg.total += 1;
          }
          break;
        case 9:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.center_three.total += 1;
            activePlayer.stats.zones.center_three.made += 1;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.center_three.total += 1;
          }
          break;
        case 10:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.right_three_45deg.total += 1;
            activePlayer.stats.zones.right_three_45deg.made += 1;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.right_three_45deg.total += 1;
          }
          break;
        case 11:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.right_three.total += 1;
            activePlayer.stats.zones.right_three.made += 1;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.right_three.total += 1;
          }
          break;
        default:
          break;
      }
    }
  };

  showActions = () => (
    actions.map((action, index) => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        className="Suite-actions-item"
        key={action.text + index}
        role="button"
        tabIndex={0}
        title={action.title}
        aria-label="action"
        onClick={this.actionHandler.bind(this, action.key)}
      >
        {action.text}
      </div>
    ))
  );

  actionHandler = (action) => {
    if (this.isPlayerSelected()) {
      const activePlayer = this.getActivePlayer();

      switch (action) {
        case 'FTMade':
          activePlayer.stats.FT.made += 1;
          activePlayer.stats.FT.total += 1;
          activePlayer.stats.points.total += 1;

          if (activePlayer.team === this.props.homeTeam[0]._id) {
            this.setState({
              homeScore: this.state.homeScore + 1,
            });
          } else {
            this.setState({
              visitScore: this.state.visitScore + 1,
            });
          }
          break;
        case 'FTmiss':
          activePlayer.stats.FT.total += 1;
          break;
        case 'OR':
          activePlayer.stats.rebound.offence.total += 1;
          break;
        case 'DR':
          activePlayer.stats.rebound.defence.total += 1;
          break;
        case 'AS':
          activePlayer.stats.assists.total += 1;
          break;
        case 'ST':
          activePlayer.stats.steals.total += 1;
          break;
        case 'BLK':
          activePlayer.stats.blocks.total += 1;
          break;
        case 'TO':
          activePlayer.stats.turnover.total += 1;
          break;
        case 'PFG':
          activePlayer.stats.fouls.give.total += 1;
          break;
        case 'PFT':
          activePlayer.stats.fouls.take.total += 1;
          break;
        default:
          break;
      }
    }
  }

  saveGameData = () => {
    const data = {
      league: getCurrentLeague()._id,
      team_home: this.props.homeTeam[0]._id,
      team_home_name: this.props.homeTeam[0].name,
      team_visit: this.props.visitTeam[0]._id,
      team_visit_name: this.props.visitTeam[0].name,
      score_home: this.state.homeScore,
      score_visit: this.state.visitScore,
      players: this.playersGameProgress,
    };

    createGame(data);
  }

  render() {
    return (
      <div className="Suite">
        <div className="Suite-top-line">
          <div className="Suite-team">
            <div>
              <div className="Suite-team-name">
                {this.props.visitTeam[0].name}
              </div>
              <div className="Suite-team-fouls">
                <div className="Suite-team-null">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <i
                    role="button"
                    tabIndex={0}
                    aria-label="reset"
                    className="fas fa-angle-double-down"
                    onClick={this.resetTeamFouls.bind(this, false)}
                  />
                </div>
                {this.showTeamFouls(false)}
              </div>
              <div className="Suite-team-timeouts">
                <div className="Suite-team-null">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <i
                    role="button"
                    tabIndex={0}
                    aria-label="reset"
                    className="fas fa-angle-double-down"
                    onClick={this.resetTimeouts.bind(this, false)}
                  />
                </div>
                {this.showTimeouts(false)}
              </div>
            </div>
            <div className="Suite-team-score">{this.state.visitScore}</div>
          </div>
          <Timer />
          <div className="Suite-team">
            <div className="Suite-team-score">{this.state.homeScore}</div>
            <div>
              <div className="Suite-team-name text-right">
                {this.props.homeTeam[0].name}
              </div>
              <div className="Suite-team-fouls">
                {this.showTeamFouls(true)}
                <div className="Suite-team-null">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <i
                    role="button"
                    tabIndex={0}
                    aria-label="reset"
                    className="fas fa-angle-double-down"
                    onClick={this.resetTeamFouls.bind(this, true)}
                  />
                </div>
              </div>
              <div className="Suite-team-timeouts">
                {this.showTimeouts(true)}
                <div className="Suite-team-null">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <i
                    role="button"
                    tabIndex={0}
                    aria-label="reset"
                    className="fas fa-angle-double-down"
                    onClick={this.resetTimeouts.bind(this, true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Suite-main">
          <div className="Suite-player-wrap">
            <div className="start-line">
              <div className="Suite-player-substitution" title="замена гостей">
                <i className="fas fa-exchange-alt" />
              </div>
              {this.showStartLines(false)}
            </div>
            <div className="start-line">
              {this.showStartLines(true)}
              <div className="Suite-player-substitution" title="замена хозяев">
                <i className="fas fa-exchange-alt" />
              </div>
            </div>
          </div>
          <div className="Suite-actions">
            {this.showActions()}
          </div>
        </div>
        <div className="Suite-playground">
          <Playground
            isPlayerSelected={!!this.state.selectedPlayer}
            sectorClick={this.shootSectorHandler}
          />
        </div>
        <Button
          type="primary"
          disabled={false}
          OnBtnclick={this.saveGameData}
        >
          Save
        </Button>
      </div>
    );
  }
}

Suite.defaultProps = {
  startLineHome: [],
  startLineVisit: [],
  homeTeam: [],
  visitTeam: [],
};

Suite.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  startLineHome: propTypes.array,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  startLineVisit: propTypes.array,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  homeTeam: propTypes.array,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  visitTeam: propTypes.array,
};

export default Suite;
