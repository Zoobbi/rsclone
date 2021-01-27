import axios from 'axios';
import { LEAGUES } from '../actionTypes';
import { getLeague } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';

const initialState = {
  leagues: null,
};

export default function getLeaguesReducer(state = initialState, action) {
  switch (action.type) {
    case LEAGUES:
      console.log(action);
      return {
        leagues: action.leagues,
      };
    default:
      return state;
  }
}

export const loadLeaguesFromDB = () => (dispatch) => {
  const PORT = 3001;
  const localhost = `http://localhost:${PORT}/api/`;
  try {
    axios.get(`${localhost}leagues`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getLeague(data.data));
      });
  } catch (e) {
    console.log(e);
  }
};
