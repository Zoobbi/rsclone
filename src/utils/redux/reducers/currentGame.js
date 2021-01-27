import axios from 'axios';
import { GAME } from '../actionTypes';
import { getCurrentGame } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';

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
  const PORT = 3001;
  const localhost = `http://localhost:${PORT}/api/`;

  try {
    await axios.get(`${localhost}games/${id}`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getCurrentGame(data.data));
      });
  } catch (e) {
    console.log(e);
    // TODO ОШИБКИ
  }
};
