import { LOGIN, LOGOUT, SET_TOKEN } from '../types';

const authDefaultState = { user: {}, token: null, fqdn: '' };
const AuthReducer =  (state = authDefaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state,  user: action.user, token: action.token };
    case SET_TOKEN:
      return { ...state, token: action.token};
    case LOGOUT:
      return { user: {}, token: null, fqdn: '' };
    default:
      return state;
  }
};

export default AuthReducer;