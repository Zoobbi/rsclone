import axios from 'axios';
import { TEAM } from '../actionTypes';
import { getCurrentTeam, info } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { config } from '../../../config/config';

const initialState = {
  currentTeam: null,
};

export default function getTeamReducer(state = initialState, action) {
  switch (action.type) {
    case TEAM:
      return {
        currentTeam: action.currentTeam,
      };
    default:
      return state;
  }
}

export const loadTeamFromDB = (id) => async (dispatch) => {
  try {
    await axios.get(`${config.HOST}teams/${id}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getCurrentTeam(data.data));
      });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, true));
    throw new Error('failed to load current team');
  }
};
