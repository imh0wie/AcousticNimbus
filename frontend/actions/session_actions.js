import * as SessionAPIUtil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const signup = (userToServer) => {
  return (dispatch) => {
    return SessionAPIUtil.signup(userToServer).then(
      (userFromServer) => {
        return dispatch(receiveCurrentUser(userFromServer));
      },
      (errors) => {
        return dispatch(receiveSessionErrors(errors.responseJSON));
      },
    );
  };
};

export const login = (userToServer) => {
  return (dispatch) => {
    return SessionAPIUtil.login(userToServer).then(
      (userFromServer) => {
        return dispatch(receiveCurrentUser(userFromServer));
      },
      (errors) => {
        return dispatch(receiveSessionErrors(errors.responseJSON));
      }
    );
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionAPIUtil.logout().then(
      () => {
        return dispatch(logoutCurrentUser());
      },
      (errors) => {
        return dispatch(receiveSessionErrors(errors.responseJSON));
      }
    );
  };
};

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser,
  };
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER,
  };
};

export const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors,
  };
};
