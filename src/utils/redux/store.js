import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// eslint-disable-next-line import/no-cycle
import rootReducer from './rootReducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
