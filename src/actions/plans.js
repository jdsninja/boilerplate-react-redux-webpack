import CONFIG from '../constants/config'
import Store from '../store'
import request from 'superagent'
import $ from 'jquery';
import drafts from '../data/drafts.json'
import * as AuthUtils from '../utils/authUtils'

export const setDrafts = () => {
  //TODO find better way to set apikey
  request
    .post(`${CONFIG.API.URL}be/motor/gap/drafts?apikey=${CONFIG.API.KEY}`)
    .set({
      'Content-Type': 'application/json',
      'Qover-Api-Version' : 1.0
    })
    .end((error, response) => AuthUtils.checkResponseAndContinue(error, response, () => {
      Store.dispatch({ type: 'REQUEST_PLANS_SUCCESS',  data: response.body })
    }))
    
  return {
    type: 'REQUEST_PLANS'
  }
}

export const requestPlans = () => {
  //TODO find better way to set apikey
  request
    .post(`${CONFIG.API.URL}be/motor/gap/drafts?apikey=${CONFIG.API.KEY}`)
    .set({
      'Content-Type': 'application/json',
      'Qover-Api-Version' : 1.0
    })
    .send(drafts)
    .end((error, response) => AuthUtils.checkResponseAndContinue(error, response, () => {
      Store.dispatch({ type: 'REQUEST_PLANS_SUCCESS',  data: response.body })
    }))
    
  return {
    type: 'REQUEST_PLANS'
  }
}

export const requestPrice = (id) => {
  //TODO find better way to set apikey
  request
    .post(`${CONFIG.API.URL}drafts/${id}/price-requests?apikey=${CONFIG.API.KEY}`)
    .set({
      'Content-Type': 'application/json',
      'Qover-Api-Version' : 1.0, 
    })
    .end((error, response) => {

    })
  return {
    type: 'REQUEST_PRICE'
  }
}