import axios from 'axios';
import { HISTORIES } from '../actionTypes';
import { getHistories, info } from '../actions';
// eslint-disable-next-line import/no-cycle
import { store } from '../store';
import { config } from '../../../config/config';

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
  try {
    axios.get(`${config.HOST}histories/`,
      { headers: { Authorization: ` ${store.getState().token.token}` } })
      .then((data) => {
        dispatch(getHistories(data.data));
      });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, true));
    throw new Error('failed to load histories');
  }
};
