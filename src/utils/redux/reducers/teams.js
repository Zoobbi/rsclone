import axios from 'axios';
import { TEAMS } from '../actionTypes';
import { getTeams, info } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { config } from '../../../config/config';

const initialState = {
  teams: [],
};

export default function getTeamsReducer(state = initialState, action) {
  switch (action.type) {
    case TEAMS:
      return {
        teams: action.teams,
      };
    default:
      return state;
  }
}

export const loadTeamsFromDB = (leagueId) => (dispatch) => {
  try {
    axios.get(`${config.HOST}teams/all/${leagueId}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getTeams(data.data));
      });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, true));
    throw new Error('failed to load teams');
  }
};
