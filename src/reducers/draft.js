//TODO: Get default state from store.js or vise versa
const defaultState = {
  data: {},
  is_fetching: false
}

export default (state = defaultState, action) => {
  if (action.type === 'SET_DRAFT') {
    return {
      ...state,
      is_fetching: true
    }
  }

  if (action.type === 'SET_DRAFT_SUCCESS') {
    return {
      ...state,
      data: action.data,
      is_fetching: false
    }
  }

  if (action.type === 'REQUEST_DRAFT_PRICES') {
    return {
      ...state,
      is_fetching: true
    }
  }

  if (action.type === 'REQUEST_DRAFT_PRICES_SUCCESS') {
    return {
      ...state,
      prices: action.data, // maybe this sould be in its own reducer...
      is_fetching: false
    }
  }

  if (action.type === 'ADD_NOTIFICATION') {
    return {
      ...state,
      notification: action.data // TODO create a store for ui stuff
    }
  }

  if (action.type === 'REMOVE_NOTIFICATION') {
    return {
      ...state,
      notification: undefined
    }
  }

  return state
}
