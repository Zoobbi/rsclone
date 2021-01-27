import axios from 'axios';
import { GAMES } from '../actionTypes';
import { getGames } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';

const initialState = {
  games: [],
};

export default function getGamesReducer(state = initialState, action) {
  switch (action.type) {
    case GAMES:
      return {
        games: action.games,
      };
    default:
      return state;
  }
}

export const loadGamesFromDB = (leagueId) => (dispatch) => {
  const PORT = 3001;
  const localhost = `http://localhost:${PORT}/api/`;

  try {
    axios.get(`${localhost}games/all/${leagueId}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getGames(data.data));
      });
  } catch (e) {
    console.log(e);
  }
};
