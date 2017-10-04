import CONFIG from '../constants/config'
import Store from '../store'
import request from 'superagent'
import * as AuthUtils from '../utils/authUtils'

export const loginUser = (data) => {
  Store.dispatch({type: 'LOGIN_USER_WAITING'})
  //TODO find better way to set apikey
  request
    .post(`${CONFIG.API.URL}authentication/authenticate?apikey=${CONFIG.API.KEY}`)
    .send(data)
    .set('Accept', 'application/json')
    .end((error, response) => {
      if (error || !response.ok) {
        Store.dispatch({type:'LOGIN_USER_FAILED', data: response.body.data})
      } else {
        Store.dispatch({type:'LOGIN_USER_SUCCESS', data: response.body.data})
      }
    })
  return {
    type: 'LOGIN_USER',
    data
  }
}

export function logoutAndRedirect() {
  request
    .post(`${CONFIG.API.URL}authentication/logout?apikey=${CONFIG.API.KEY}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      if (error || !response.ok) {
        Store.dispatch({type:'LOGOUT_USER_FAILED', data: response.body.data})
      } else {
        // AuthUtils.removeToken()
        // window.location = '#/login'
        // Store.dispatch({type:'LOGOUT_USER_SUCCESS', data: response.body.data})
      }
    })

  return {
    type: 'LOGOUT_USER'
  }
}

export const logoutUser = () => {
  Store.dispatch({type: 'LOGIN_USER_WAITING'})
  request
    .post(`${CONFIG.API.URL}authentication/logout?apikey=${CONFIG.API.KEY}`)
    .set('Accept', 'application/json')
    .end((error, response) => {
      if (error || !response.ok) {
        Store.dispatch({type:'LOGIN_USER_FAILED', data: response.body.data})
      } else {
        Store.dispatch({type:'LOGIN_USER_SUCCESS', data: response.body.data})
      }
    })

  return {
    type: 'LOGOUT_USER'
  }
}
