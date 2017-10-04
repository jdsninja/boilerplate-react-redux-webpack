import CONFIG from '../constants/config'
import Store from '../store'
import request from 'superagent'
import $ from 'jquery';
import drafts from '../data/drafts.json'
import * as AuthUtils from '../utils/authUtils'
import { push } from 'react-router-redux';

export const setDraft = (draft) => {
  request
    .post(`${CONFIG.API.URL}be/motor/gap/drafts?apikey=${CONFIG.API.KEY}`)
    .send(draft)
    .set({
      'Qover-Api-Version' : '1.0',
      'Content-Type': 'application/json'
    })
    .end((error, response) => AuthUtils.checkResponseAndContinue(error, response, () => {
      Store.dispatch({ type: 'SET_DRAFT_SUCCESS',  data: response.body })
    }))
    
  return {
    type: 'SET_DRAFTS'
  }
}

export const requestDraftPrices = (draftId) => {
  //TODO find better way to set apikey
  Store.dispatch({ type: 'ADD_NOTIFICATION',  data: {message:'Waiting for plans'} })
  request
    .post(`${CONFIG.API.URL}be/motor/gap/drafts/${draftId}/price-requests?apikey=${CONFIG.API.KEY}`)
    .set({
      'Qover-Api-Version' : '1.0',
      'Content-Type': 'application/json'
    })
    .end((error, response) => AuthUtils.checkResponseAndContinue(error, response, () => {
      Store.dispatch({ type: 'REQUEST_DRAFT_PRICES_SUCCESS',  data: response.body })      
      Store.dispatch({ type: 'ADD_NOTIFICATION',  data: {message:'Plans loaded with success'} })
    }))
    
  return {
    type: 'REQUEST_DRAFT_PRICES'
  }
}

export function addNotification(data = {}) {
  return {
    type: 'ADD_NOTIFICATION',
    data
  }
}

export function removeNotification(index = 0) {
  return {
    type: 'REMOVE_NOTIFICATION',
    index
  }
}

export function sendEmail(index = 0) {
  // TODO: MANDRIL INTEGRATION
  // docs: https://mandrillapp.com/docs/
  return {
    type: 'SEND_EMAIL',
    index
  }
}