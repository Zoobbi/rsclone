import axios from 'axios';
import { TEAMS } from '../actionTypes';
import { getTeams } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';

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
  const PORT = 3001;
  const localhost = `http://localhost:${PORT}/api/`;

  try {
    axios.get(`${localhost}teams/all/${leagueId}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        console.log(data);
        dispatch(getTeams(data.data));
      });
  } catch (e) {
    console.log(e);
  }
};
