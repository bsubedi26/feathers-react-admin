import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import freeze from "redux-freeze";

import rootReducer from "store";

const middlewares = [ReduxThunk, promiseMiddleware(), freeze];
const enhancers = [
  applyMiddleware(...middlewares)
  // other store enhancers if any
];

export default function configureStore(initialState = {}) {

  const composeEnhancers = composeWithDevTools({
    // other compose enhancers if any
    // Specify here other options if needed
  });
  let store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("store", () => {
      /* eslint-disable global-require */
      const nextReducer = require("store").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}