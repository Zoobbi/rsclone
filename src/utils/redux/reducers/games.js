import axios from 'axios';
import { GAMES } from '../actionTypes';
import { getGames, info } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { config } from '../../../config/config';

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
  try {
    axios.get(`${config.HOST}games/all/${leagueId}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getGames(data.data));
      });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, true));
    throw new Error('failed to load games');
  }
};
