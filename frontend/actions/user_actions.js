export const RECEIVE_USER = 'RECEIVE_USER';
import * as UserAPIUtil from '../util/user_api_util';

export const fetchUser = (userId) => {
    return (dispatch) => {
        return UserAPIUtil.fetchUser(userId).then(
            (userFromServer) => {
                return dispatch(receiveUser(response);
            }
        );
    }
};

export const editUser = (userToServer, userId) => {
    return (dispatch) => {
        return UserAPIUtil.editUser(userToServer, userId).then(
            (userFromServer) => {
                return dispatch(receiveUser(userFromServer));
            }
        )
    };
};

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user: user,
  };
};

