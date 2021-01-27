import axios from 'axios';
import { PLAYER } from '../actionTypes';
import { getCurrentPlayer } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';

const initialState = {
  currentPlayer: null,
};

export default function getPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER:
      return {
        currentPlayer: action.currentPlayer,
      };
    default:
      return state;
  }
}

export const loadPlayerFromDB = (id) => (dispatch) => {
  const PORT = 3001;
  const localhost = `http://localhost:${PORT}/api/`;

  try {
    axios.get(`${localhost}players/${id}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        console.log(data);
        dispatch(getCurrentPlayer(data.data));
      });
  } catch (e) {
    console.log(e);
    // TODO ОШИБКИ
  }
};
