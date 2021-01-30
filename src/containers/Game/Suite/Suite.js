import React, { Component } from 'react';
import './Suite.scss';
import propTypes from 'prop-types';
import Timer from 'react-compound-timer';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ButtonUI from '../../components/UI/Button/Button';
import Playground from '../Playground/Playground';
import { getCurrentLeague } from '../../../utils/Cookie/cookie';
import { store } from '../../../utils/redux/store';
import { info } from '../../../utils/redux/actions';
import Substitution from '../Substitution/Substitution';
import Qarter from '../Quarter/Qarter';
import { InfoLine } from '../infoLine/InfoLine';
import { savePlayersFromGame } from '../GameSave/savePlayers';
import { getPlayersForGameData } from '../GameFunctions/getPlayersForGame';
import { createGame, updateTeam } from '../../../utils/API/api';
import { SuiteWrapper } from '../SuiteWrapper/SuiteWrapper';

const actions = [
  {
    text: 'FT Made',
    key: 'FTMade',
    title: 'штрафной забит',
    hotKey: 'Q',
  },
  {
    text: 'FT Miss',
    key: 'FTmiss',
    title: 'штрафной не забит',
    hotKey: 'W',
  },
  {
    text: 'Off Rebound',
    key: 'OR',
    title: 'подбор в нападении',
    hotKey: 'E',
  },
  {
    text: 'Def Rebound',
    key: 'DR',
    title: 'подбор в защите',
    hotKey: 'R',
  },
  {
    text: 'Assist',
    key: 'AS',
    title: 'передача',
    hotKey: 'T',
  },
  {
    text: 'Steal',
    key: 'ST',
    title: 'перехват',
    hotKey: 'Y',
  },
  {
    text: 'Block',
    key: 'BLK',
    title: 'блокшот',
    hotKey: 'U',
  },
  {
    text: 'Turnover',
    key: 'TO',
    title: 'потеря',
    hotKey: 'I',
  },
  {
    text: 'Foul give',
    key: 'PFG',
    title: 'фол получен',
    hotKey: 'O',
  },
  {
    text: 'Foul take',
    key: 'PFT',
    title: 'фол заработан',
    hotKey: 'P',
  },
];

class Suite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      saveOpen: false,
      visitTeamFoul: 0,
      homeTeamFoul: 0,
      visitTimeout: 0,
      homeTimeout: 0,
      visitScore: 0,
      homeScore: 0,
      selectedPlayer: undefined,
      isShiftMode: false,
      isVisitSubsShow: false,
      isHomeSubsShow: false,
      inGameVisit: [],
      inGameHome: [],
      quarter: 1,
      quartersScore: [[], [], [], []],
      actionMessage: '',
      isTimerPlay: false,
      isFullScreen: false,
    };
    this.playersGameProgress = [];
    this.startTimerFunc = null;
    this.stopTimerFunc = null;
    this.resetTimerFunc = null;
    this.quarters = [];
    this.fullScreenEnter = () => {};
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    window.addEventListener('resize', this.checkMinWidth);
    this.getPlayersForGame();
    this.checkMinWidth();
    this.setState({
      inGameVisit: this.props.startLineVisit,
      inGameHome: this.props.startLineHome,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
    window.removeEventListener('resize', this.checkMinWidth);
  }

  checkMinWidth = () => {
    if (window.innerWidth < 1024) {
      localStorage.setItem('info', 'Маленький размер экрана');
      store.dispatch(info('Маленький размер экрана', true));
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleSaveClose = () => {
    this.setState({ saveOpen: false });
  }

  handleSaveOpen = () => {
    this.setState({ saveOpen: true });
  }

  getActivePlayer = () => this.playersGameProgress.find((player) => player._id === this.state.selectedPlayer._id)

   isStartPlayer = (player) => {
     if (this.props.startLineHome.find((item) => item._id === player._id)) {
       return true;
     }
     return !!this.props.startLineVisit.find((item) => item._id === player._id);
   }

  getPlayersForGame = () => {
    this.playersGameProgress = this.props.homeTeam[0].players.map((player) => {
      const curPlayer = getPlayersForGameData(this.props.homeTeam[0], player);

      curPlayer.start = this.isStartPlayer(player);
      return curPlayer;
    });

    this.playersGameProgress = this.playersGameProgress.concat(this.props.visitTeam[0].players.map((player) => {
      const curPlayer = getPlayersForGameData(this.props.visitTeam[0], player);

      curPlayer.start = this.isStartPlayer(player);
      return curPlayer;
    }));
  };

  isPlayerSelected = () => this.state.selectedPlayer !== undefined;

  keyDownHandler = (e) => {
    if (e.keyCode === 16) {
      this.setState({
        isShiftMode: true,
      });
    }
    if (e.keyCode === 32) {
      e.preventDefault();
      this.setState({
        isTimerPlay: !this.state.isTimerPlay,
      });
      if (this.state.isTimerPlay) {
        this.startTimerFunc();
      } else {
        this.stopTimerFunc();
      }
    }
    if (e.keyCode === 49) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameVisit[0]);
    }
    if (e.keyCode === 50) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameVisit[1]);
    }
    if (e.keyCode === 51) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameVisit[2]);
    }
    if (e.keyCode === 52) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameVisit[3]);
    }
    if (e.keyCode === 53) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameVisit[4]);
    }
    if (e.keyCode === 54) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameHome[0]);
    }
    if (e.keyCode === 55) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameHome[1]);
    }
    if (e.keyCode === 56) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameHome[2]);
    }
    if (e.keyCode === 57) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameHome[3]);
    }
    if (e.keyCode === 48) {
      e.preventDefault();
      this.selectedPlayerHandler(this.state.inGameHome[4]);
    }
    if (e.keyCode === 81) {
      e.preventDefault();
      this.actionHandler('FTMade', 'штрафной забит');
    }
    if (e.keyCode === 87) {
      e.preventDefault();
      this.actionHandler('FTmiss', 'штрафной не забит');
    }
    if (e.keyCode === 69) {
      e.preventDefault();
      this.actionHandler('OR', 'подбор в нападении');
    }
    if (e.keyCode === 82) {
      e.preventDefault();
      this.actionHandler('DR', 'подбор в защите');
    }
    if (e.keyCode === 84) {
      e.preventDefault();
      this.actionHandler('AS', 'передача');
    }
    if (e.keyCode === 89) {
      e.preventDefault();
      this.actionHandler('ST', 'перехват');
    }
    if (e.keyCode === 85) {
      e.preventDefault();
      this.actionHandler('BLK', 'блокшот');
    }
    if (e.keyCode === 73) {
      e.preventDefault();
      this.actionHandler('TO', 'потеря');
    }
    if (e.keyCode === 79) {
      e.preventDefault();
      this.actionHandler('PFG', 'фол получен');
    }
    if (e.keyCode === 80) {
      e.preventDefault();
      this.actionHandler('PFT', 'фол заработан');
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

  getSubstitutionPlayers = (isHomeTeam) => {
    if (isHomeTeam) {
      const allPlayers = this.props.homeTeam[0].players;
      const inGamePlayers = this.state.inGameHome;

      return allPlayers.filter((player) => inGamePlayers.find((item) => item._id === player._id) === undefined);
    }
    return this.props.visitTeam[0].players.filter((player) => this.state.inGameVisit.find((item) => player._id === item._id) === undefined);
  }

  selectedPlayerHandler = (player) => this.setState({
    selectedPlayer: this.isPlayerSelected() && this.state.selectedPlayer._id === player._id ? undefined : player,
  });

  showStartLines = (isHomeTeam) => {
    const players = isHomeTeam ? this.state.inGameHome : this.state.inGameVisit;

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

      this.getInfoMessage(`${activePlayer.full}: ${this.state.isShiftMode ? 'не забил' : 'забил'} из ${sectorId}`);

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
            activePlayer.stats.zones.paint.isTouchedMade = true;
            activePlayer.stats.zones.paint.isTouched = true;
            activePlayer.stats.two_points.isTouchedMade = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.paint.total += 1;
            activePlayer.stats.zones.paint.isTouched = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 2:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.left_two.total += 1;
            activePlayer.stats.zones.left_two.made += 1;
            activePlayer.stats.zones.left_two.isTouchedMade = true;
            activePlayer.stats.zones.left_two.isTouched = true;
            activePlayer.stats.two_points.isTouchedMade = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.left_two.total += 1;
            activePlayer.stats.zones.left_two.isTouched = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 3:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.right_two.total += 1;
            activePlayer.stats.zones.right_two.made += 1;
            activePlayer.stats.zones.right_two.isTouchedMade = true;
            activePlayer.stats.zones.right_two.isTouched = true;
            activePlayer.stats.two_points.isTouchedMade = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.right_two.total += 1;
            activePlayer.stats.zones.right_two.isTouched = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 4:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.left_two_45deg.total += 1;
            activePlayer.stats.zones.left_two_45deg.made += 1;
            activePlayer.stats.zones.left_two_45deg.isTouchedMade = true;
            activePlayer.stats.zones.left_two_45deg.isTouched = true;
            activePlayer.stats.two_points.isTouchedMade = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.left_two_45deg.total += 1;
            activePlayer.stats.zones.left_two_45deg.isTouched = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 5:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.center_two.total += 1;
            activePlayer.stats.zones.center_two.made += 1;
            activePlayer.stats.zones.center_two.isTouchedMade = true;
            activePlayer.stats.zones.center_two.isTouched = true;
            activePlayer.stats.two_points.isTouchedMade = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.center_two.total += 1;
            activePlayer.stats.zones.center_two.isTouched = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 6:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.two_points.made += 1;
            activePlayer.stats.zones.right_two_45deg.total += 1;
            activePlayer.stats.zones.right_two_45deg.made += 1;
            activePlayer.stats.zones.right_two_45deg.isTouchedMade = true;
            activePlayer.stats.zones.right_two_45deg.isTouched = true;
            activePlayer.stats.two_points.isTouchedMade = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.two_points.total += 1;
            activePlayer.stats.zones.right_two_45deg.total += 1;
            activePlayer.stats.zones.right_two_45deg.isTouched = true;
            activePlayer.stats.two_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 7:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.left_three.total += 1;
            activePlayer.stats.zones.left_three.made += 1;
            activePlayer.stats.zones.left_three.isTouchedMade = true;
            activePlayer.stats.zones.left_three.isTouched = true;
            activePlayer.stats.three_points.isTouchedMade = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.left_three.total += 1;
            activePlayer.stats.zones.left_three.isTouched = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 8:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.left_three_45deg.total += 1;
            activePlayer.stats.zones.left_three_45deg.made += 1;
            activePlayer.stats.zones.left_three_45deg.isTouchedMade = true;
            activePlayer.stats.zones.left_three_45deg.isTouched = true;
            activePlayer.stats.three_points.isTouchedMade = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.left_three_45deg.total += 1;
            activePlayer.stats.zones.left_three_45deg.isTouched = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 9:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.center_three.total += 1;
            activePlayer.stats.zones.center_three.made += 1;
            activePlayer.stats.zones.center_three.isTouchedMade = true;
            activePlayer.stats.zones.center_three.isTouched = true;
            activePlayer.stats.three_points.isTouchedMade = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.center_three.total += 1;
            activePlayer.stats.zones.center_three.isTouched = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 10:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.right_three_45deg.total += 1;
            activePlayer.stats.zones.right_three_45deg.made += 1;
            activePlayer.stats.zones.right_three_45deg.isTouchedMade = true;
            activePlayer.stats.zones.right_three_45deg.isTouched = true;
            activePlayer.stats.three_points.isTouchedMade = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.right_three_45deg.total += 1;
            activePlayer.stats.zones.right_three_45deg.isTouched = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        case 11:
          if (!this.state.isShiftMode) {
            activePlayer.stats.points.total += 2;
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.three_points.made += 1;
            activePlayer.stats.zones.right_three.total += 1;
            activePlayer.stats.zones.right_three.made += 1;
            activePlayer.stats.zones.right_three.isTouchedMade = true;
            activePlayer.stats.zones.right_three.isTouched = true;
            activePlayer.stats.three_points.isTouchedMade = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          } else {
            activePlayer.stats.three_points.total += 1;
            activePlayer.stats.zones.right_three.total += 1;
            activePlayer.stats.zones.right_three.isTouched = true;
            activePlayer.stats.three_points.isTouched = true;
            activePlayer.stats.points.isTouched = true;
          }
          break;
        default:
          break;
      }
    } else {
      localStorage.setItem('info', 'Сначала выберите игрока');
      store.dispatch(info('Сначала выберите игрока', true));
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
        onClick={this.actionHandler.bind(this, action.key, action.title)}
      >
        {action.text}
      </div>
    ))
  );

  getInfoMessage= (actionMessage) => {
    this.setState({
      actionMessage,
    });
  };

  actionHandler = (actionKey, actionText) => {
    if (this.isPlayerSelected()) {
      const activePlayer = this.getActivePlayer();
      console.log(activePlayer);
      this.getInfoMessage(`${activePlayer.full}: ${actionText}`);

      switch (actionKey) {
        case 'FTMade':
          activePlayer.stats.FT.made += 1;
          activePlayer.stats.FT.total += 1;
          activePlayer.stats.points.total += 1;
          activePlayer.stats.FT.isTouchedMade = true;
          activePlayer.stats.points.isTouched = true;
          activePlayer.stats.FT.isTouched = true;

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
          activePlayer.stats.FT.isTouched = true;
          break;
        case 'OR':
          activePlayer.stats.rebound.offence.total += 1;
          activePlayer.stats.rebound.offence.isTouched = true;
          break;
        case 'DR':
          activePlayer.stats.rebound.defence.total += 1;
          activePlayer.stats.rebound.defence.isTouched = true;
          break;
        case 'AS':
          activePlayer.stats.assists.total += 1;
          activePlayer.stats.assists.isTouched = true;
          break;
        case 'ST':
          activePlayer.stats.steals.total += 1;
          activePlayer.stats.steals.isTouched = true;
          break;
        case 'BLK':
          activePlayer.stats.blocks.total += 1;
          activePlayer.stats.blocks.isTouched = true;
          break;
        case 'TO':
          activePlayer.stats.turnover.total += 1;
          activePlayer.stats.turnover.isTouched = true;
          break;
        case 'PFG':
          activePlayer.stats.fouls.give.total += 1;
          activePlayer.stats.fouls.give.isTouched = true;
          break;
        case 'PFT':
          activePlayer.stats.fouls.take.total += 1;
          activePlayer.stats.fouls.take.isTouched = true;
          break;
        default:
          break;
      }
    }
  };

  toggleSubstitution = (isHomeTeam) => {
    if (isHomeTeam) {
      this.setState({
        isHomeSubsShow: !this.state.isHomeSubsShow,
      });
    } else {
      this.setState({
        isVisitSubsShow: !this.state.isVisitSubsShow,
      });
    }
  };

  subsitutePlayer = (player) => {
    const inGamePlayer = this.state.selectedPlayer;

    if (!inGamePlayer) {
      localStorage.setItem('info', 'выберите игрока на площадке');
      store.dispatch(info('выберите игрока на площадке', true));
    } else if (player.team === this.props.homeTeam[0]._id) {
      const inGameLine = [...this.state.inGameHome];
      const inGamePlayerIndex = this.state.inGameHome.findIndex((item) => item._id === inGamePlayer._id);

      inGameLine.splice(inGamePlayerIndex, 1, player);
      this.setState({
        inGameHome: inGameLine,
      });
    } else {
      const inGameLine = [...this.state.inGameVisit];
      const inGamePlayerIndex = this.state.inGameVisit.findIndex((item) => item._id === inGamePlayer._id);

      inGameLine.splice(inGamePlayerIndex, 1, player);
      this.setState({
        inGameVisit: inGameLine,
      });
    }
  };

  changeQuarter = (curQuarter) => {
    const quarter = parseInt(curQuarter, 10);
    const { quartersScore } = this.state;

    if (quarter === 2) {
      quartersScore[0] = [this.state.visitScore, this.state.homeScore];
    }

    if (quarter === 3) {
      quartersScore[1] = [this.state.visitScore - quartersScore[0][0], this.state.homeScore - quartersScore[0][1]];
    }

    if (quarter === 4) {
      quartersScore[2] = [this.state.visitScore - (quartersScore[0][0] + quartersScore[1][0]),
        this.state.homeScore - (quartersScore[0][1] + quartersScore[1][1])];
    }

    this.setState({
      quarter,
      quartersScore,
    });
  }

  saveGameData = () => {
    const { quartersScore } = this.state;
    quartersScore[3] = [this.state.visitScore - (quartersScore[0][0] + quartersScore[1][0] + quartersScore[2][0]),
      this.state.homeScore - (quartersScore[0][1] + quartersScore[1][1] + quartersScore[2][1])];

    this.setState({
      quartersScore,
    });

    const gameData = {
      league: getCurrentLeague()._id,
      team_home: this.props.homeTeam[0]._id,
      team_home_name: this.props.homeTeam[0].name,
      team_visit: this.props.visitTeam[0]._id,
      team_visit_name: this.props.visitTeam[0].name,
      score_home: this.state.homeScore,
      score_visit: this.state.visitScore,
      quarters: this.state.quartersScore,
      players: this.playersGameProgress,
    };

    const teamDataHome = {
      game: {
        played: this.props.homeTeam[0].game.played + 1,
        win: gameData.score_home > gameData.score_visit ? this.props.homeTeam[0].game.win + 1 : this.props.homeTeam[0].game.win,
      },
    };
    const teamDataVisit = {
      game: {
        played: this.props.visitTeam[0].game.played + 1,
        win: gameData.score_visit > gameData.score_home ? this.props.visitTeam[0].game.win + 1 : this.props.visitTeam[0].game.win,
      },
    };
    try {
      createGame(gameData);

      updateTeam(this.props.homeTeam[0]._id, teamDataHome, true);
      updateTeam(this.props.visitTeam[0]._id, teamDataVisit, true);

      savePlayersFromGame(gameData.players);
    } catch (e) {
      localStorage.setItem('info', 'Ошибка сохранения');
      store.dispatch(info('Ошибка сохранения', true));
    }
  }

  fullscreenHandler = (handler) => {
    console.log(handler);
    if (handler) {
      this.fullScreenEnter = handler;
    }
  }

  onChangeFullScreen = (isFullScreen) => this.setState({ isFullScreen });

  render() {
    return (
      <SuiteWrapper
        fullscreenHandler={this.fullscreenHandler}
        fullscreenOnChange={this.onChangeFullScreen}
      >
        <div className="Suite">
          <button title="полноэкранный режим. ESC выход" className="fullscreen-btn" onClick={this.fullScreenEnter}>
            <i className="fas fa-expand" />
          </button>
          { this.state.open
        && (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Сброс</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Действительно хотите сбросить таймер&nbsp; ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleClose}
              >
                Отмена
              </Button>
              <Button
                color="primary"
                disabled={false}
                onClick={() => {
                  this.setState({
                    isTimerPlay: false,
                  });
                  this.resetTimerFunc();
                  this.handleClose();
                }}
                autoFocus
              >
                Сбросить
              </Button>
            </DialogActions>
          </Dialog>
        )}
          { this.state.saveOpen
        && (
          <Dialog
            open={this.state.saveOpen}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Сохранить</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Действительно хотите сохранить данную игру&nbsp; ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleSaveClose}
              >
                Отмена
              </Button>
              <Button
                color="primary"
                disabled={false}
                onClick={() => {
                  this.saveGameData();
                  this.handleSaveClose();
                }}
                autoFocus
              >
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>
        )}
          <Substitution
            location="left"
            isShow={this.state.isHomeSubsShow ? 'left-show' : ''}
            players={this.getSubstitutionPlayers(true)}
            onSubsPlayer={this.subsitutePlayer}
          />
          <Substitution
            location="right"
            isShow={this.state.isVisitSubsShow ? 'right-show' : ''}
            players={this.getSubstitutionPlayers(false)}
            onSubsPlayer={this.subsitutePlayer}
          />
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

            <div>
              <Qarter
                disabled={this.state.isTimerPlay}
                onQarterChange={this.changeQuarter}
              />
              <Timer
                initialTime={600000}
                direction="backward"
                startImmediately={false}
              >
                {({
                  start, stop, reset,
                }) => {
                  this.startTimerFunc = start;
                  this.stopTimerFunc = stop;
                  this.resetTimerFunc = reset;

                  return (
                    <>
                      <div className="timer-wrapper">
                        <div className="timer-control">
                          <button
                            className="timer-control-btn__start"
                            title={this.state.isTimerPlay ? 'СТОП' : 'СТАРТ'}
                            onClick={() => {
                              this.setState({
                                isTimerPlay: !this.state.isTimerPlay,
                              });
                              if (this.state.isTimerPlay) {
                                stop();
                              } else {
                                start();
                              }
                            }}
                          >
                            {this.state.isTimerPlay ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
                          </button>
                          <button
                            className="timer-control-btn__start"
                            onClick={() => {
                              this.handleOpen();
                            }}
                          >
                            <i className="fas fa-undo" />
                          </button>
                        </div>
                        <div className="timer-time">
                          <div className="timer timer-min">
                            <Timer.Minutes
                              formatValue={(text) => (text.toString().length > 1 ? text : `0${text}`)}
                            />
                            :
                          </div>
                          <div className="timer timer-sec">
                            <Timer.Seconds
                              formatValue={(text) => (text.toString().length > 1 ? text : `0${text}`)}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }}
              </Timer>
              {this.state.actionMessage ? <InfoLine message={this.state.actionMessage} /> : null}
            </div>

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
                <ButtonUI
                  type="Suite-player-substitution"
                  title="замена гостей"
                  disabled={this.state.isTimerPlay}
                  OnBtnclick={() => { this.toggleSubstitution(false); }}
                >
                  <i className="fas fa-exchange-alt" />
                </ButtonUI>
                {this.showStartLines(false)}
              </div>
              <div className="start-line">
                {this.showStartLines(true)}
                <ButtonUI
                  type="Suite-player-substitution"
                  title="замена гостей"
                  disabled={this.state.isTimerPlay}
                  OnBtnclick={() => { this.toggleSubstitution(true); }}
                >
                  <i className="fas fa-exchange-alt" />
                </ButtonUI>
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
          <div className="save-btn-wrapper">
            <ButtonUI
              type="primary"
              disabled={this.state.isTimerPlay}
              OnBtnclick={this.handleSaveOpen}
            >
              Save
            </ButtonUI>
          </div>
        </div>
      </SuiteWrapper>
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
