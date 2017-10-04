
//TODO: Get default state from store.js or vise versa
const defaultState = {
  data: {},
  is_fetching: false
}

export default (state = defaultState, action) => {
  if (action.type === 'REQUEST_VEHICLES') {
    return {
      ...state,
      is_fetching: true
    }
  }

  if (action.type === 'REQUEST_VEHICLES_SUCCESS') {
    let data = Object.keys(action.data).map((x, i) => {
      return {
        name: x,
        ...action.data[x]
      }
    })  
    return {
      ...state,
      data,
      is_fetching: false
    }
  }

  if (action.type === 'REQUEST_VEHICLES_FAILED') {
    return {
      ...state,
      is_fetching: false
    }
  }

  return state
}
