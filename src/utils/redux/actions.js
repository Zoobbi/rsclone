import {
  INFO, LEAGUES, LEAGUE, TOKEN, TEAMS, TEAM, PLAYER, GAMES, GAME,
} from './actionTypes';

export function token(data) {
  return {
    type: TOKEN,
    data,
  };
}

export function info(message, isError) {
  return {
    type: INFO,
    info: message,
    isError,
  };
}

export function getLeague(leagues) {
  return {
    type: LEAGUES,
    leagues,
  };
}

export function getCurrentLeague(currentLeague) {
  return {
    type: LEAGUE,
    currentLeague,
  };
}

export function getTeams(teams) {
  return {
    type: TEAMS,
    teams,
  };
}

export function getCurrentTeam(currentTeam) {
  return {
    type: TEAM,
    currentTeam,
  };
}

export function getCurrentPlayer(currentPlayer) {
  return {
    type: PLAYER,
    currentPlayer,
  };
}

export function getGames(games) {
  return {
    type: GAMES,
    games,
  };
}

export function getCurrentGame(currentGame) {
  return {
    type: GAME,
    currentGame,
  };
}
