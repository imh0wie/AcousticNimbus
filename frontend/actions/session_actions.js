import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const signup = (userToServer) => {
  return (dispatch) => {
    // debugger
    return SessionAPIUtil.signup(userToServer).then(
      (userFromServer) => (dispatch(receiveCurrentUser(userFromServer))),
      (error) => (dispatch(receiveSessionErrors(error.responseJSON)))
    );
  };
};

export const login = (userToServer) => {
  return (dispatch) => {
    return SessionAPIUtil.login(userToServer).then(
      (userFromServer) => {
        return dispatch(receiveCurrentUser(userFromServer));
      },
      (error) => {
        return dispatch(receiveSessionErrors(error.responseJSON));
      }
    );
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionAPIUtil.logout().then(
      (user) => (dispatch(logoutCurrentUser(user.id)))
      // solution: (user) => dispatch(logoutCurrentUser())
      // if we are passing the "user" argument,
      // why is logoutCurrentUser() not using it
      // to log out that user?
    );
  };
};

// What does it do? ==> reducer
const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
  };
}

const logoutCurrentUser = (id) => {
  return {
    type: LOGOUT_CURRENT_USER,
    userId: id
  }
}

const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  };
}
