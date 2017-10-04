export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      const newUser = {
        [action.data.name]: action.data.value
      }
      return {
        ...state,
        user: Object.assign(state.user, newUser)
      };
    case 'LOGIN_USER_WAITING':
    return state;
    case 'LOGIN_USER_FAILED':
      return {
        ...state,
        error: action.data
      }
    case 'LOGIN_USER_SUCCESS':
      if (action.data.token) {
        localStorage.setItem('token', action.data.token)
      }
      return {
        ...state,
        ...action.data,
        error: '',
        isAuthenticated: true
      }
    case 'LOGOUT_USER':
      return state
    case 'LOGOUT_USER_SUCCESS':
      return {
        ...state,
        isAuthenticated: false
      }
      return state
    case 'TOGGLE_WARNING_OVERLAY':
      const isWarningOverlay = !state.isWarningOverlay;
      return {
        ...state,
        isWarningOverlay
      };
    default: return state;
  }
}
