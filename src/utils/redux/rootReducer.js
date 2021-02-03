import { combineReducers } from 'redux';
import token from './reducers/token';
import info from './reducers/info';
// eslint-disable-next-line import/no-cycle
import leagues from './reducers/leagues';
// eslint-disable-next-line import/no-cycle
import currentLeague from './reducers/currentLeague';
// eslint-disable-next-line import/no-cycle
import teams from './reducers/teams';
// eslint-disable-next-line import/no-cycle
import currentTeam from './reducers/currentTeam';
// eslint-disable-next-line import/no-cycle
import currentPlayer from './reducers/currentPlayer';
// eslint-disable-next-line import/no-cycle
import games from './reducers/games';
// eslint-disable-next-line import/no-cycle
import currentGame from './reducers/currentGame';
// eslint-disable-next-line import/no-cycle
import histories from './reducers/histories';

export default combineReducers({
  token,
  info,
  leagues,
  currentLeague,
  teams,
  currentTeam,
  currentPlayer,
  games,
  currentGame,
  histories,
});
