import axios from 'axios';
import { GAME } from '../actionTypes';
import { getCurrentGame, info } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { config } from '../../../config/config';

const initialState = {
  currentGame: null,
};

export default function getGameReducer(state = initialState, action) {
  switch (action.type) {
    case GAME:
      return {
        currentGame: action.currentGame,
      };
    default:
      return state;
  }
}

export const loadGameFromDB = (id) => async (dispatch) => {
  try {
    await axios.get(`${config.HOST}games/${id}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getCurrentGame(data.data));
      });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, true));
    throw new Error('failed to load current game');
  }
};
