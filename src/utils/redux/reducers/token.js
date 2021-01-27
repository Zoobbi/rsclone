import { TOKEN } from '../actionTypes';

const initialState = {
  token: '',
};

export default function getTokenReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN:
      return {
        token: action.data,
      };
    default:
      return state;
  }
}
