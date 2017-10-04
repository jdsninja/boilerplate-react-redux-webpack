import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store';

import {
  App,
  Home,
  Login
} from './containers'

const requireAuth = (nextState, location) => {
  const { auth } = store.getState()
  if (!auth.isAuthenticated) {
    location({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home}/>
        <Route path="login" component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
