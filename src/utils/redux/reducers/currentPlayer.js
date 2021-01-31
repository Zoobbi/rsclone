import axios from 'axios';
import { PLAYER } from '../actionTypes';
import { getCurrentPlayer, info } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { config } from '../../../config/config';

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
  try {
    axios.get(`${config.HOST}players/${id}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getCurrentPlayer(data.data));
      });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, true));
    throw new Error('failed to load current player');
  }
};
