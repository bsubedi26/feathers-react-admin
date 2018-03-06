import initialState from "./state";
import { promisePendings, promiseRejects } from "./helpers";
import { createAction, handleActions } from "redux-actions";
import feathers, { services } from 'util/feathers';
const userService = feathers.service('users');

const types = {
  AUTHENTICATE: 'AUTH/AUTHENTICATE',
  RESET: 'AUTH/RESET',
  SIGNUP: 'AUTH/SIGNUP',
  VERIFY_JWT: 'AUTH/VERIFY_JWT',
  USER_GET: 'AUTH/USER_GET',
  LOGOUT: 'AUTH/LOGOUT'
}

// ACTION CREATORS
export const signup = createAction(types.SIGNUP, p => ({ promise: userService.create(p) }));
export const authenticate = createAction(types.AUTHENTICATE, p => ({ promise: feathers.authenticate(p) }));
export const verifyJwt = createAction(types.VERIFY_JWT, p => ({ promise: feathers.passport.verifyJWT(p) }));
export const userGet = createAction(types.USER_GET, p => ({ promise: userService.get(p) }));
// feathers.passport.verifyJWT(response.value.accessToken);
// const { id } = getState().auth;
// dispatch({ type: types.USER_GET, payload: user.get(id) });
export const reset = createAction(types.RESET);
export const logout = createAction(types.LOGOUT, p => ({ promise: feathers.logout() }));


// REDUCER
const reducers = handleActions({
  [`${types.SIGNUP}_FULFILLED`]: (state, { payload }) => {
    return {
      ...state
    }
  },

  [`${types.AUTHENTICATE}_FULFILLED`]: (state, { payload }) => {
    const { accessToken } = payload;
    return {
      ...state,
      isPending: false,
      error: null,
      accessToken
    }
  },

  [`${types.VERIFY_JWT}_FULFILLED`]: (state, { payload }) => {
    const { accessToken } = payload;
    return {
      ...state,
      error: null,
      decodedToken: payload,
      id: payload.userId
    }
  },

  [`${types.USER_GET}_FULFILLED`]: (state, { payload }) => {
    const { email, avatar } = payload;
    return {
      ...state,
      email,
      avatar
    }
  },

  [`${types.RESET}`]: (state, { payload }) => {
    return {
      ...initialState
    }
  },

  ...promiseRejects(types),
  ...promisePendings(types)
  
}, initialState);

export default reducers;