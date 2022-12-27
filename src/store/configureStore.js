import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

// const enhancers = applyMiddleware(thunk);
const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true
  });
  middlewares.push(logger);
}

export const configureStore = initialState => {
  // const store = createStore(rootReducer, initialState, enhancers);
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
};
