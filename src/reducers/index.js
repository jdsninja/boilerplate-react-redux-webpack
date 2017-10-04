import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import vehicles from './vehicles'
import draft from './draft'

const rootReducer = combineReducers({ auth, vehicles, draft, routing: routerReducer})

export default rootReducer
