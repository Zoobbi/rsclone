import axios from 'axios';
import { LEAGUES } from '../actionTypes';
import { getLeague, info } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { config } from '../../../config/config';

const initialState = {
  leagues: null,
};

export default function getLeaguesReducer(state = initialState, action) {
  switch (action.type) {
    case LEAGUES:
      return {
        leagues: action.leagues,
      };
    default:
      return state;
  }
}

export const loadLeaguesFromDB = () => (dispatch) => {
  try {
    axios.get(`${config.HOST}leagues`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getLeague(data.data));
      });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, true));
    throw new Error('failed to load leagues');
  }
};
