import axios from 'axios';
import { LEAGUE, REMOVELEAGUE } from '../actionTypes';
import { getCurrentLeague, info } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { saveCurrentLeague } from '../../Cookie/cookie';
import { config } from '../../../config/config';

const initialState = {
  currentLeague: {},
};

export default function getLeaguesReducer(state = initialState, action) {
  switch (action.type) {
    case LEAGUE:
      return {
        currentLeague: action.currentLeague,
      };
    case REMOVELEAGUE:
      return {
        currentLeague: {},
      };
    default:
      return state;
  }
}

export const loadLeagueFromDB = (id) => (dispatch) => {
  try {
    axios.get(`${config.HOST}leagues/${id}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getCurrentLeague(data.data));
        JSON.stringify(saveCurrentLeague(data.data));
      });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, true));
    throw new Error('failed to load current league');
  }
};
