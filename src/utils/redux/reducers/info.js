import { INFO } from '../actionTypes';

const initialState = {
  info: 'hello',
  isError: false,
};

export default function getInfoReducer(state = initialState, action) {
  switch (action.type) {
    case INFO:
      return {
        info: action.info,
        isError: action.isError,
      };
    default:
      return state;
  }
}
