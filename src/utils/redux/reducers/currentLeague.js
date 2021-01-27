import axios from 'axios';
import { LEAGUE, REMOVELEAGUE } from '../actionTypes';
import { getCurrentLeague } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { saveCurrentLeague } from '../../Cookie/cookie';

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
  const PORT = 3001;
  const localhost = `http://localhost:${PORT}/api/`;
  try {
    axios.get(`${localhost}leagues/${id}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getCurrentLeague(data.data));
        JSON.stringify(saveCurrentLeague(data.data));
      });
  } catch (e) {
    console.log(e);
    // TODO ОШИБКИ
  }
};
