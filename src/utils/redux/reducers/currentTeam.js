import axios from 'axios';
import { TEAM } from '../actionTypes';
import { getCurrentTeam } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';

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
  const PORT = 3001;
  const localhost = `http://localhost:${PORT}/api/`;

  try {
    await axios.get(`${localhost}teams/${id}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        console.log(data);
        dispatch(getCurrentTeam(data.data));
      });
  } catch (e) {
    console.log(e);
    // TODO ОШИБКИ
  }
};
