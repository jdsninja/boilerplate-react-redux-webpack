import Store from '../store'
import { logoutAndRedirect } from '../actions/auth'

export const checkResponseAndContinue = (error, response, fn) => {
  if (error || !response.ok) {
    console.log(response)
    if (response.status === 401) {
      Store.dispatch(logoutAndRedirect())
    } else {
      Store.dispatch({ type: 'ADD_NOTIFICATION',  data: response.body.code || error })
    }
  } else {
    fn && fn(response)
  }
}

export const removeToken = () => {
  window.localStorage.removeItem('token')
}