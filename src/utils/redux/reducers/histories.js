import axios from 'axios';
import { HISTORIES } from '../actionTypes';
import { getHistories } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';

const initialState = {
  histories: [],
};

export default function getHistoriesReducer(state = initialState, action) {
  switch (action.type) {
    case HISTORIES:
      return {
        histories: action.histories,
      };
    default:
      return state;
  }
}

export const loadHistoriesFromDB = () => (dispatch) => {
  const PORT = 3001;
  const localhost = `http://localhost:${PORT}/api/`;

  try {
    axios.get(`${localhost}histories/`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getHistories(data.data));
      });
  } catch (e) {
    console.log(e);
  }
};
