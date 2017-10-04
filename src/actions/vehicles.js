import CONFIG from '../constants/config'
import Store from '../store'
import request from 'superagent'
import vehicles from '../data/vehicles.json'

export const requestVehicles = () => {
  Store.dispatch({type:'REQUEST_VEHICLES_SUCCESS', data: vehicles})
  return {
    type: 'REQUEST_VEHICLES'
  }
}
