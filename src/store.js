import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import { createLogger } from 'redux-logger'

/*
  Store
  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - similar to React's getInitialState
*/

const defaultState = {
  auth: {
    user: null,
    isAuthenticated: !!localStorage.getItem('token')
  },
  draft:{
    data: {}
  },
  vehicles: {
    data: []
  }
}

// The middleware allow us to dispatch push('/tarace') in /actions
// For an example look for Store.dispatch(push('/login')) in /actions/auth.js
const middleware = applyMiddleware(
  createLogger(),
  routerMiddleware(hashHistory),
  thunk
)

const store = createStore(
  rootReducer,
  defaultState,
  middleware
)


// we export history because we need it in `index.js` to feed into <Router>
export const history = syncHistoryWithStore(hashHistory, store);

/*
  Enable Hot Reloading for the reducers
  We re-require() the reducers whenever any new code has been written.
  Webpack will handle the rest
*/

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
